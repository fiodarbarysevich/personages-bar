import { motion } from 'framer-motion'
import { AtSign, ChevronDown, Clock, MapPin } from 'lucide-react'
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

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="h-full overflow-y-auto no-scrollbar">
      {/* Hero */}
      <section className="relative h-[78%] min-h-[540px] flex flex-col">
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
            <Logo size="text-[28px]" />
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
        <div className="relative pb-5 flex justify-center text-accent-dim">
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
        <div className="flex gap-3 mt-6 overflow-x-auto no-scrollbar -mx-6 px-6 snap-x">
          <PhotoStub className="w-[220px] h-[150px] rounded-xl shrink-0 snap-center" label="Зал" />
          <PhotoStub className="w-[220px] h-[150px] rounded-xl shrink-0 snap-center" label="Витраж «Форрест Гамп»" />
          <PhotoStub className="w-[220px] h-[150px] rounded-xl shrink-0 snap-center" label="Барная стойка" />
        </div>
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
        <div className="flex gap-4 overflow-x-auto no-scrollbar px-6 snap-x pb-1">
          {EVENTS.map((ev, i) => (
            <motion.div
              key={ev.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: 'easeOut', delay: i * 0.1 }}
            >
              <EventCard event={ev} />
            </motion.div>
          ))}
        </div>
        <p className="text-accent-dim text-[12px] text-center mt-4">
          Подробности — в нашем Instagram
        </p>
      </motion.section>

      <Ornament className="px-6" />

      {/* Финальный CTA */}
      <motion.section {...fadeUp} className="px-6 py-10">
        <Button onClick={() => navigate('/booking')}>Забронировать стол</Button>
        <p className="text-center text-accent-dim text-[12px] mt-4 italic">
          Дорогие зрители, показ начнётся вовремя.
        </p>
      </motion.section>
    </div>
  )
}
