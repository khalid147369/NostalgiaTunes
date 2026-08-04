"use client";

import { useEffect, useState } from "react";

export default function Loading() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Simula la carga de forma ultra rápida y desmonta el loader suavemente
    const timer = setTimeout(() => {
      setVisible(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden transition-opacity duration-300 pointer-events-none"
      style={{
        background: "linear-gradient(135deg, #0a0c1a 0%, #0f1126 40%, #12102a 70%, #0a0c1a 100%)",
        willChange: "opacity",
      }}
    >
      {/* Ambient glow blobs */}
      <div
        className="absolute top-1/4 left-1/4 rounded-full blur-3xl opacity-60"
        style={{
          width: "35vw",
          height: "35vw",
          background: "radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 rounded-full blur-3xl opacity-50"
        style={{
          width: "25vw",
          height: "25vw",
          background: "radial-gradient(circle, rgba(34,211,238,0.1) 0%, transparent 70%)",
        }}
      />

      {/* Main card */}
      <div className="relative flex flex-col items-center gap-8 px-8">
        {/* Logo mark */}
        <div className="relative flex items-center justify-center">
          <div
            className="absolute rounded-full"
            style={{
              width: "100px",
              height: "100px",
              background: "radial-gradient(circle, rgba(139,92,246,0.35) 0%, transparent 70%)",
              animation: "ping-fast 1.5s ease-out infinite",
            }}
          />
          <div
            className="relative flex items-center justify-center rounded-full border"
            style={{
              width: "72px",
              height: "72px",
              background: "linear-gradient(135deg, #6d28d9 0%, #7c3aed 50%, #4f46e5 100%)",
              borderColor: "rgba(167,139,250,0.4)",
              boxShadow: "0 0 24px rgba(139,92,246,0.4)",
              animation: "spin-logo 6s linear infinite",
              willChange: "transform",
            }}
          >
            {/* Music disc icon */}
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
              <circle cx="12" cy="12" r="4" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" />
              <circle cx="12" cy="12" r="1.5" fill="white" />
              <path d="M12 2C6.48 2 2 6.48 2 12" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M12 22C17.52 22 22 17.52 22 12" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Brand name */}
        <div className="flex flex-col items-center gap-1.5 text-center">
          <h1 className="text-3xl font-bold tracking-tight">
            <span className="text-white">Nostalgia</span>
            <span
              style={{
                background: "linear-gradient(90deg, #a78bfa 0%, #22d3ee 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Songs
            </span>
          </h1>
          <p
            className="text-xs tracking-widest uppercase"
            style={{
              color: "rgba(167,139,250,0.7)",
              letterSpacing: "0.2em",
            }}
          >
            Reliving your memories
          </p>
        </div>

        {/* Dynamic Sound wave loader (Pure CSS) */}
        <div className="flex items-end gap-1" style={{ height: "18px" }}>
          {[0.6, 1, 0.75, 1, 0.5, 0.85, 0.65, 1].map((h, i) => (
            <div
              key={i}
              className="rounded-full"
              style={{
                width: "3px",
                height: `${h * 100}%`,
                background: "linear-gradient(to top, #7c3aed, #22d3ee)",
                opacity: 0.8,
                animation: `wave-bar 0.8s ease-in-out ${i * 0.08}s infinite alternate`,
                transformOrigin: "bottom",
                willChange: "transform",
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes ping-fast {
          0% { transform: scale(0.9); opacity: 0.6; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        @keyframes spin-logo {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes wave-bar {
          from { transform: scaleY(0.2); }
          to { transform: scaleY(1); }
        }
      `}</style>
    </div>
  );
}