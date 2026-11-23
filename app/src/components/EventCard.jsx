import { Ornament } from './ui'

// Карточка-постер в стиле афиш бара (color-scheme.jpg)
export default function EventCard({ event }) {
  const dark = event.theme === 'dark'
  const bg = dark ? 'bg-bg-card' : 'bg-accent'
  const text = dark ? 'text-accent' : 'text-bg-primary'
  const sub = dark ? 'text-accent-dim' : 'text-bg-primary/60'
  const accent = dark ? 'text-cinema-red' : 'text-cinema-red-deep'

  return (
    <article
      className={`relative shrink-0 w-[270px] h-[340px] rounded-2xl overflow-hidden ${bg} ${text} ticket-perforation snap-center flex flex-col items-center justify-between px-7 py-8 border ${dark ? 'border-accent/20' : 'border-bg-primary/15'}`}
    >
      <div className="text-center">
        <p className={`text-[11px] uppercase tracking-label ${sub}`}>{event.subtitle}</p>
        <Ornament className="mt-3 opacity-60" />
      </div>
      <h3 className="font-display text-[26px] leading-snug text-center uppercase tracking-poster px-1">
        {event.title}
      </h3>
      <div className="text-center">
        <p className={`font-display text-lg ${accent}`}>{event.date}</p>
        <p className={`text-sm mt-1 tracking-label ${sub}`}>{event.time}</p>
      </div>
    </article>
  )
}
