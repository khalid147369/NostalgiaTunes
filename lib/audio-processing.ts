const TARGET_PEAK = 0.89125;
const TARGET_CHANNELS = 2;
const TARGET_SAMPLE_RATE = 44100;

function writeString(view: DataView, offset: number, value: string) {
  for (let index = 0; index < value.length; index += 1) {
    view.setUint8(offset + index, value.charCodeAt(index));
  }
}

function encodeWav(buffer: AudioBuffer): ArrayBuffer {
  const frameCount = buffer.length;
  const channelCount = buffer.numberOfChannels;
  const dataSize = frameCount * channelCount * 2;
  const wav = new ArrayBuffer(44 + dataSize);
  const view = new DataView(wav);

  writeString(view, 0, "RIFF");
  view.setUint32(4, 36 + dataSize, true);
  writeString(view, 8, "WAVE");
  writeString(view, 12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, channelCount, true);
  view.setUint32(24, buffer.sampleRate, true);
  view.setUint32(28, buffer.sampleRate * channelCount * 2, true);
  view.setUint16(32, channelCount * 2, true);
  view.setUint16(34, 16, true);
  writeString(view, 36, "data");
  view.setUint32(40, dataSize, true);

  const channels = Array.from({ length: channelCount }, (_, channel) =>
    buffer.getChannelData(channel),
  );
  let offset = 44;

  for (let frame = 0; frame < frameCount; frame += 1) {
    for (const channel of channels) {
      const sample = Math.max(-1, Math.min(1, channel[frame]));
      view.setInt16(
        offset,
        sample < 0 ? sample * 0x8000 : sample * 0x7fff,
        true,
      );
      offset += 2;
    }
  }

  return wav;
}

export async function prepareSongAudio(audioFile: File): Promise<File> {
  const introResponse = await fetch("/sonidoCasete.mp3");
  if (!introResponse.ok) {
    throw new Error("Could not load the cassette intro sound.");
  }

  const [songData, introData] = await Promise.all([
    audioFile.arrayBuffer(),
    introResponse.arrayBuffer(),
  ]);
  const audioContext = new AudioContext();

  try {
    const [songBuffer, introBuffer] = await Promise.all([
      audioContext.decodeAudioData(songData),
      audioContext.decodeAudioData(introData),
    ]);
    const sampleRate = TARGET_SAMPLE_RATE;
    const frameCount = Math.ceil(
      (introBuffer.duration + songBuffer.duration) * sampleRate,
    );
    const offlineContext = new OfflineAudioContext(
      TARGET_CHANNELS,
      frameCount,
      sampleRate,
    );
    const introSource = offlineContext.createBufferSource();
    const songSource = offlineContext.createBufferSource();

    introSource.buffer = introBuffer;
    songSource.buffer = songBuffer;
    introSource.connect(offlineContext.destination);
    songSource.connect(offlineContext.destination);
    introSource.start(0);
    songSource.start(introBuffer.duration);

    const renderedAudio = await offlineContext.startRendering();
    let peak = 0;
    for (
      let channel = 0;
      channel < renderedAudio.numberOfChannels;
      channel += 1
    ) {
      const channelData = renderedAudio.getChannelData(channel);
      for (const sample of channelData) {
        peak = Math.max(peak, Math.abs(sample));
      }
    }

    if (peak > 0) {
      const gain = TARGET_PEAK / peak;
      for (
        let channel = 0;
        channel < renderedAudio.numberOfChannels;
        channel += 1
      ) {
        const channelData = renderedAudio.getChannelData(channel);
        for (let index = 0; index < channelData.length; index += 1) {
          channelData[index] *= gain;
        }
      }
    }

    const fileName = `${audioFile.name.replace(/\.[^/.]+$/, "")}-processed.wav`;
    return new File([encodeWav(renderedAudio)], fileName, {
      type: "audio/wav",
    });
  } finally {
    await audioContext.close();
  }
}
