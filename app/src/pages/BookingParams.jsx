import { motion } from 'framer-motion'
import { Clock, Minus, Plus } from 'lucide-react'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, ScreenHeader } from '../components/ui'
import { toISO, useBooking } from '../context/BookingContext'
import { getSlots } from '../lib/bookingService'

const WD_SHORT = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ']
const MONTH_SHORT = ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек']

function nextDays(count) {
  const days = []
  const today = new Date()
  for (let i = 0; i < count; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() + i)
    days.push(d)
  }
  return days
}

export default function BookingParams() {
  const navigate = useNavigate()
  const { date, setDate, time, setTime, guests, setGuests, setTableId } = useBooking()
  const days = useMemo(() => nextDays(7), [])
  const slots = useMemo(() => getSlots(date), [date])

  const ready = Boolean(date && time)

  const pickDate = (iso) => {
    setDate(iso)
    setTime(null)
    setTableId(null)
  }

  return (
    <div className="h-full overflow-y-auto no-scrollbar flex flex-col">
      <ScreenHeader
        title="Выберите сеанс"
        subtitle="Стол будет ждать вас 2 часа"
        backTo="/"
      />

      {/* Дата */}
      <div className="mb-7">
        <p className="px-5 text-[11px] uppercase tracking-label text-accent-dim mb-3">Дата</p>
        <div className="flex gap-2.5 overflow-x-auto no-scrollbar px-5">
          {days.map((d) => {
            const iso = toISO(d)
            const active = iso === date
            return (
              <motion.button
                key={iso}
                whileTap={{ scale: 0.96 }}
                onClick={() => pickDate(iso)}
                className={`shrink-0 w-[62px] rounded-xl border py-3 flex flex-col items-center gap-0.5 transition-colors duration-200 ${
                  active
                    ? 'bg-accent text-bg-primary border-accent'
                    : 'border-accent/30 text-accent hover:border-accent/60'
                }`}
              >
                <span className={`text-[10px] tracking-label ${active ? 'text-bg-primary/70' : 'text-accent-dim'}`}>
                  {WD_SHORT[d.getDay()]}
                </span>
                <span className="font-display text-xl leading-none">{d.getDate()}</span>
                <span className={`text-[10px] ${active ? 'text-bg-primary/70' : 'text-accent-dim'}`}>
                  {MONTH_SHORT[d.getMonth()]}
                </span>
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Время */}
      <div className="mb-7 px-5">
        <p className="text-[11px] uppercase tracking-label text-accent-dim mb-3">Время</p>
        <div className="grid grid-cols-4 gap-2.5">
          {slots.map(({ time: t, taken }) => {
            const active = t === time
            return (
              <motion.button
                key={t}
                whileTap={taken ? undefined : { scale: 0.96 }}
                onClick={() => {
                  if (taken) return
                  setTime(t)
                  setTableId(null)
                }}
                disabled={taken}
                className={`rounded-lg border py-2.5 text-sm transition-colors duration-200 min-h-[44px] ${
                  active
                    ? 'bg-accent text-bg-primary border-accent'
                    : taken
                      ? 'border-accent/10 text-accent/25 line-through cursor-not-allowed'
                      : 'border-accent/30 text-accent hover:border-accent/60'
                }`}
              >
                {t}
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Гости */}
      <div className="mb-6 px-5">
        <p className="text-[11px] uppercase tracking-label text-accent-dim mb-3">Гости</p>
        <div className="flex items-center justify-center gap-6">
          <button
            onClick={() => setGuests(Math.max(1, guests - 1))}
            disabled={guests <= 1}
            aria-label="Меньше гостей"
            className="w-11 h-11 rounded-full border border-accent/40 text-accent flex items-center justify-center disabled:opacity-25 transition-colors hover:border-accent"
          >
            <Minus size={16} strokeWidth={1.5} />
          </button>
          <span className="font-display text-3xl text-accent w-10 text-center">{guests}</span>
          <button
            onClick={() => setGuests(Math.min(8, guests + 1))}
            disabled={guests >= 8}
            aria-label="Больше гостей"
            className="w-11 h-11 rounded-full border border-accent/40 text-accent flex items-center justify-center disabled:opacity-25 transition-colors hover:border-accent"
          >
            <Plus size={16} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Лимит */}
      <div className="px-5 mb-8">
        <p className="flex items-start gap-2 text-[13px] text-accent-dim bg-bg-card border border-accent/15 rounded-xl px-4 py-3.5">
          <Clock size={15} strokeWidth={1.5} className="shrink-0 mt-0.5" />
          Дорогие зрители, бронь стола ограничена 2 часами
        </p>
      </div>

      <div className="mt-auto px-5 pb-7">
        <Button disabled={!ready} onClick={() => navigate('/booking/table')}>
          Выбрать место
        </Button>
      </div>
    </div>
  )
}
