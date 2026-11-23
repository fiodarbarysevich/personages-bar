import { useState } from 'react'

// План зала по plan.png (1152×648): бар со 4 стульями сверху,
// секретный зал справа с длинным столом на 8, вход снизу.
// Пол — ковёр «Оверлук» (pattern.jpg), проглядывающий через бордовый фон.
const GOLD = 'rgba(215, 204, 143, 0.75)'

function Walls() {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 1152 648"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
    >
      {/* Главный зал: верхняя стена с выступом бара, левая и нижняя стены, вход снизу */}
      <path
        d="M145 172 H285 V95 H585 V172 H831 V300 M831 430 V555 H775 M640 555 H145 V172"
        stroke={GOLD}
        strokeWidth="4"
      />
      {/* Секретный зал: примыкает справа, скруглённая правая стена, дверь в левой стене */}
      <path
        d="M831 170 H975 Q1015 170 1015 225 V375 Q1015 430 975 430 H831"
        stroke={GOLD}
        strokeWidth="4"
      />
      {/* Стойка бара (скруглённый верх) */}
      <path
        d="M285 172 V112 Q285 95 302 95 H568 Q585 95 585 112 V172"
        stroke="rgba(215, 204, 143, 0.4)"
        strokeWidth="3"
      />
    </svg>
  )
}

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
        style={{ aspectRatio: '1152 / 648' }}
      >
        {/* Пол — ковёр из «Сияния», проглядывает через бордовое наложение */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/assets/pattern.jpg)' }}
        />
        <div className="absolute inset-0 bg-bg-primary/85" />

        <Walls />

        {/* Подписи */}
        <span
          className="absolute text-[8px] uppercase tracking-label text-accent/80"
          style={{ left: '37.8%', top: '6%', transform: 'translateX(-50%)' }}
        >
          Bar
        </span>
        <span
          className="absolute text-[7px] uppercase tracking-label text-accent-dim"
          style={{ left: '61.4%', top: '89%', transform: 'translateX(-50%)' }}
        >
          Вход
        </span>

        {/* Столы и барные стулья */}
        {tables.map((t) => {
          const selected = selectedId === t.id
          const disabled = t.taken || t.seats < guests
          const isStool = t.shape === 'stool'
          const radius =
            t.shape === 'circle' || isStool
              ? 'rounded-full'
              : t.shape === 'long'
                ? 'rounded-full'
                : 'rounded-[50%]'
          const state = selected
            ? 'bg-gold-bright text-bg-primary border-gold-bright table-selected'
            : disabled
              ? 'bg-cinema-red-deep/40 border-cinema-red/60 text-accent/40 cursor-not-allowed'
              : 'bg-accent/20 border-accent text-accent cursor-pointer hover:bg-gold-bright hover:text-bg-primary hover:border-gold-bright hover:scale-110 hover:shadow-glow hover:z-10'
          return (
            <button
              key={t.id}
              onClick={() => handleTap(t)}
              aria-label={`${t.label}, ${t.seats} ${
                t.seats === 1 ? 'место' : 'мест'
              }${t.taken ? ', занят' : ''}`}
              className={`absolute -translate-x-1/2 -translate-y-1/2 border flex items-center justify-center transition-all duration-200 ${radius} ${state} ${
                shakingId === t.id ? 'table-shake' : ''
              }`}
              style={{
                left: `${t.x}%`,
                top: `${t.y}%`,
                width: `${t.w}%`,
                height: `${t.h}%`,
              }}
            >
              {t.id.startsWith('T') && (
                <span className={`font-display text-[11px] ${t.taken ? 'line-through' : ''}`}>
                  {t.id.slice(1)}
                </span>
              )}
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
