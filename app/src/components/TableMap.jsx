import { useState } from 'react'

// План зала по plan.png: пол — приглушённый ковёр «Оверлук» (pattern.jpg),
// BAR внизу справа, PROJECTOR сверху, вход слева внизу, окно на верхней стене.
export default function TableMap({ tables, selectedId, guests, onSelect }) {
  const [shakingId, setShakingId] = useState(null)

  const handleTap = (table) => {
    if (table.taken || table.seats < guests) {
      setShakingId(table.id)
      setTimeout(() => setShakingId(null), 250)
      return
    }
    onSelect(selectedId === table.id ? null : table.id)
  }

  return (
    <div className="px-4">
      <div
        className="relative w-full rounded-lg overflow-hidden"
        style={{ aspectRatio: '16 / 9' }}
      >
        {/* Пол — ковёр из «Сияния», приглушённый бордовым наложением */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/assets/pattern.jpg)' }}
        />
        <div className="absolute inset-0 bg-bg-primary/65" />

        {/* Стены: внешний и внутренний контур */}
        <div className="absolute inset-[2%] border-2 border-accent/50 rounded-sm" />
        <div className="absolute inset-[3.5%] border border-accent/25 rounded-sm" />

        {/* Окно на верхней стене справа */}
        <div className="absolute top-[2%] h-[1.5%] border-y border-accent/60" style={{ left: '72%', right: '12%' }} />

        {/* PROJECTOR */}
        <span className="absolute left-[58%] top-[6%] -translate-x-1/2 text-[7px] uppercase tracking-label text-accent-dim">
          Projector
        </span>

        {/* ВХОД — дуга у левой стены */}
        <svg className="absolute left-[2%] bottom-[22%] w-[9%]" viewBox="0 0 40 40" aria-hidden="true">
          <path d="M 4 36 A 32 32 0 0 1 36 4" fill="none" stroke="rgba(215,204,143,0.5)" strokeWidth="1.5" strokeDasharray="3 3" />
        </svg>
        <span className="absolute left-[7%] bottom-[17%] text-[7px] uppercase tracking-label text-accent-dim">
          Вход
        </span>

        {/* BAR — зона стойки */}
        <div className="absolute left-[62%] right-[4%] top-[76%] bottom-[6%] border border-accent/40 bg-bg-elevated/60 rounded-sm flex items-center justify-center">
          <span className="text-[9px] uppercase tracking-label text-accent/80">Bar</span>
        </div>

        {/* Столы */}
        {tables.map((t) => {
          const selected = selectedId === t.id
          const disabled = t.taken || t.seats < guests
          const radius = t.shape === 'square' ? 'rounded-[3px]' : 'rounded-[50%]'
          const state = selected
            ? 'bg-gold-bright text-bg-primary border-gold-bright table-selected'
            : disabled
              ? 'bg-cinema-red-deep/25 border-cinema-red/40 text-accent/30 cursor-not-allowed'
              : 'bg-accent/10 border-accent/70 text-accent cursor-pointer hover:bg-accent/25'
          return (
            <button
              key={t.id}
              onClick={() => handleTap(t)}
              aria-label={`${t.label}, ${t.seats} мест${t.taken ? ', занят' : ''}`}
              className={`absolute -translate-x-1/2 -translate-y-1/2 border flex items-center justify-center transition-all duration-200 ${radius} ${state} ${shakingId === t.id ? 'table-shake' : ''}`}
              style={{
                left: `${t.x}%`,
                top: `${t.y}%`,
                width: `${t.w}%`,
                height: `${t.h}%`,
              }}
            >
              <span className={`font-display text-[11px] ${t.taken ? 'line-through' : ''}`}>
                {t.id.replace('T', '')}
              </span>
            </button>
          )
        })}
      </div>

      {/* Легенда */}
      <div className="flex items-center justify-center gap-5 mt-3 text-[11px] text-accent-dim">
        <span className="flex items-center gap-1.5">
          <i className="w-3 h-3 rounded-full border border-accent/70 bg-accent/10 inline-block" />
          свободен
        </span>
        <span className="flex items-center gap-1.5">
          <i className="w-3 h-3 rounded-full bg-gold-bright inline-block" />
          выбран
        </span>
        <span className="flex items-center gap-1.5">
          <i className="w-3 h-3 rounded-full border border-cinema-red/40 bg-cinema-red-deep/25 inline-block" />
          занят
        </span>
      </div>
    </div>
  )
}
