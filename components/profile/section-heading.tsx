export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
}: {
  id: string
  eyebrow: string
  title: string
  description?: string
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <p style={{ color: 'oklch(0.85 0.13 200)' }} className="text-xs font-semibold uppercase tracking-[0.25em] ">{eyebrow}</p>
      <h2 id={id} className="text-2xl font-bold tracking-tight text-foreground md:text-3xl text-balance">
        {title}
      </h2>
      {description ? <p className="text-sm leading-relaxed text-muted-foreground">{description}</p> : null}
    </div>
  )
}
