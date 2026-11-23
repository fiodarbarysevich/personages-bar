import { motion } from 'framer-motion'
import { AtSign, ChevronDown, Clock, MapPin } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import EventCard from '../components/EventCard'
import { Button, Logo, Ornament } from '../components/ui'
import { EVENTS, WORKING_HOURS } from '../data/mockData'

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.45, ease: 'easeOut' },
}

// Заглушка «фото» — тёплый градиент с зерном плёнки; заменяется на реальные фото
function PhotoStub({ className = '', label }) {
  return (
    <div
      className={`film-grain relative overflow-hidden bg-gradient-to-br from-bg-elevated via-bg-card to-bg-primary border border-accent/20 ${className}`}
    >
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            'radial-gradient(circle at 30% 25%, rgba(185,28,28,0.35), transparent 55%), radial-gradient(circle at 75% 80%, rgba(215,204,143,0.14), transparent 50%)',
        }}
      />
      {label && (
        <span className="absolute bottom-2 left-3 text-[9px] uppercase tracking-label text-accent/40">
          {label}
        </span>
      )}
    </div>
  )
}

// Горизонтальная лента с автопрокруткой (контент дублируется для бесшовного цикла)
function AutoScrollRow({ children, className = '' }) {
  const ref = useRef(null)
  const paused = useRef(false)
  const resumeTimer = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => {
      if (paused.current) return
      const items = el.children
      const step = items.length > 1 ? items[1].offsetLeft - items[0].offsetLeft : el.clientWidth
      const half = el.scrollWidth / 2
      if (half > 0 && el.scrollLeft + step >= half) el.scrollLeft -= half
      el.scrollBy({ left: step, behavior: 'smooth' })
    }, 2600)
    return () => clearInterval(id)
  }, [])

  const pause = () => {
    paused.current = true
    clearTimeout(resumeTimer.current)
    resumeTimer.current = setTimeout(() => {
      paused.current = false
    }, 2500)
  }

  return (
    <div
      ref={ref}
      onPointerDown={pause}
      onTouchStart={pause}
      className={`flex overflow-x-auto no-scrollbar ${className}`}
    >
      {children}
      {children}
    </div>
  )
}

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="h-full overflow-y-auto no-scrollbar">
      {/* Hero — занимает весь экран, остальное открывается только скроллом */}
      <section className="relative h-full flex flex-col">
        <PhotoStub className="absolute inset-0 border-0" />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(44,4,4,0.35) 0%, rgba(44,4,4,0.92) 100%)',
          }}
        />
        <div className="relative flex-1 flex flex-col items-center justify-center px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <Logo size="text-[26px]" />
            <Ornament className="my-5 w-48 mx-auto" />
            <p className="text-accent-dim text-sm">Атмосферный кинобар в центре Минска</p>
            <p className="flex items-center justify-center gap-1.5 text-accent-dim text-[13px] mt-2">
              <MapPin size={13} strokeWidth={1.5} />
              ул. Карла Маркса, 33
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
            className="w-full mt-10"
          >
            <Button onClick={() => navigate('/booking')}>Забронировать стол</Button>
          </motion.div>
        </div>
        <div className="relative pb-6 flex justify-center text-accent-dim">
          <ChevronDown size={20} strokeWidth={1.5} className="soft-bounce" />
        </div>
      </section>

      {/* О баре */}
      <motion.section {...fadeUp} className="px-6 pt-10 pb-8">
        <h2 className="font-display text-2xl text-accent mb-4">О баре</h2>
        <p className="text-[15px] leading-relaxed text-accent/85">
          «Персонажи» — кинобар, где каждая деталь — отсылка к любимым фильмам. Кинотеатральные
          кресла и проектор, витраж со сценой из «Форреста Гампа», ковёр в духе отеля «Оверлук»,
          винил с саундтреками и коктейли, названные в честь героев кино. Классический Голливуд,
          нуар и берлинский стиль — в центре Минска.
        </p>
        <AutoScrollRow className="gap-3 mt-6 -mx-6 px-6">
          <PhotoStub className="w-[220px] h-[150px] rounded-xl shrink-0" label="Зал" />
          <PhotoStub className="w-[220px] h-[150px] rounded-xl shrink-0" label="Витраж «Форрест Гамп»" />
          <PhotoStub className="w-[220px] h-[150px] rounded-xl shrink-0" label="Барная стойка" />
        </AutoScrollRow>
        <div className="mt-6 space-y-2.5 text-[13px] text-accent-dim">
          <p className="flex items-center gap-2">
            <Clock size={14} strokeWidth={1.5} />
            {WORKING_HOURS.weekdays} · {WORKING_HOURS.weekends}
          </p>
          <p className="flex items-center gap-2">
            <AtSign size={14} strokeWidth={1.5} />
            @personages.bar
          </p>
        </div>
      </motion.section>

      <Ornament className="px-6" />

      {/* Афиша */}
      <motion.section {...fadeUp} className="pt-8 pb-8">
        <h2 className="font-display text-2xl text-accent px-6 mb-5">Афиша</h2>
        <AutoScrollRow className="gap-4 px-6 pb-1">
          {EVENTS.map((ev) => (
            <EventCard key={ev.id} event={ev} />
          ))}
        </AutoScrollRow>
        <p className="text-accent-dim text-[12px] text-center mt-4">
          Подробности — в нашем Instagram
        </p>
      </motion.section>

      <Ornament className="px-6" />

      {/* Финальный CTA */}
      <motion.section {...fadeUp} className="px-6 py-10">
        <Button onClick={() => navigate('/booking')}>Забронировать стол</Button>
        <p className="text-center text-accent-dim text-[12px] mt-4 italic">
          Выберите дату и время — остальное мы сделаем сами.
        </p>
      </motion.section>
    </div>
  )
}
