import { motion } from 'framer-motion'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Ornament, ScreenHeader } from '../components/ui'
import { formatDateRu } from '../components/Ticket'
import { useBooking } from '../context/BookingContext'
import { BAR_RULES, TABLES } from '../data/mockData'
import { createBooking } from '../lib/bookingService'

function formatPhone(value) {
  const digits = value.replace(/\D/g, '').replace(/^(375|80)/, '375').slice(0, 12)
  const tail = digits.slice(3)
  let out = '+375'
  if (tail.length > 0) out += ` (${tail.slice(0, 2)}`
  if (tail.length >= 2) out += ')'
  if (tail.length > 2) out += ` ${tail.slice(2, 5)}`
  if (tail.length > 5) out += `-${tail.slice(5, 7)}`
  if (tail.length > 7) out += `-${tail.slice(7, 9)}`
  return out
}

const inputCls =
  'w-full bg-bg-card border border-accent/30 rounded-xl px-4 py-3.5 text-[15px] text-accent placeholder:text-accent/35 outline-none transition-all duration-200 focus:border-accent focus:shadow-glow min-h-[48px]'

export default function Confirm() {
  const navigate = useNavigate()
  const { date, time, guests, tableId, setBooking } = useBooking()

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('+375 ')
  const [comment, setComment] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  const table = TABLES.find((t) => t.id === tableId)

  if (!date || !time || !table) {
    navigate('/booking', { replace: true })
    return null
  }

  const validate = () => {
    const errs = {}
    if (!name.trim()) errs.name = 'Укажите имя'
    if (!/^\+375\d{9}$/.test(phone.replace(/[\s()\-]/g, ''))) {
      errs.phone = 'Формат: +375 (XX) XXX-XX-XX'
    }
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const submit = () => {
    if (!validate() || !agreed || submitting) return
    setSubmitting(true)
    // Имитация запроса к бэкенду
    setTimeout(() => {
      try {
        const booking = createBooking({ name, phone, comment, date, time, guests, tableId })
        setBooking(booking)
        navigate('/booking/success')
      } catch (e) {
        setErrors({ form: e.message })
        setSubmitting(false)
      }
    }, 750)
  }

  const canSubmit = agreed && !submitting

  return (
    <div className="h-full overflow-y-auto no-scrollbar flex flex-col">
      <ScreenHeader title="Ваш билет" subtitle="Осталось совсем немного" backTo="/booking/table" />

      {/* Сводка */}
      <div className="mx-5 mb-6 bg-bg-card border border-accent/25 rounded-2xl px-5 py-4">
        <div className="flex justify-between items-end">
          <div>
            <p className="text-[10px] uppercase tracking-label text-accent-dim">Сеанс</p>
            <p className="text-accent text-sm mt-1">
              {formatDateRu(date)} · {time}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-label text-accent-dim">Место</p>
            <p className="text-accent text-sm mt-1">
              {table.label} · {guests} {guests === 1 ? 'гость' : guests < 5 ? 'гостя' : 'гостей'}
            </p>
          </div>
        </div>
        <div className="border-t border-dashed border-accent/30 mt-4 -mx-1" />
        <p className="text-accent-dim text-[12px] mt-3 italic">«{table.note}»</p>
      </div>

      {/* Форма */}
      <div className="px-5 space-y-4 mb-6">
        <div>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Как к вам обращаться"
            className={`${inputCls} ${errors.name ? 'border-cinema-red' : ''}`}
          />
          {errors.name && <p className="text-cinema-red text-[12px] mt-1.5">{errors.name}</p>}
        </div>
        <div>
          <input
            value={phone}
            onChange={(e) => setPhone(formatPhone(e.target.value))}
            placeholder="+375 (__) ___-__-__"
            inputMode="tel"
            className={`${inputCls} ${errors.phone ? 'border-cinema-red' : ''}`}
          />
          {errors.phone && <p className="text-cinema-red text-[12px] mt-1.5">{errors.phone}</p>}
        </div>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Пожелания: стол у экрана, день рождения…"
          rows={2}
          className={`${inputCls} resize-none`}
        />
      </div>

      {/* Правила */}
      <div className="px-5 mb-6">
        <Ornament className="mb-5" />
        <p className="text-[11px] uppercase tracking-label text-accent-dim mb-3">
          Дорогие зрители, обратите внимание
        </p>
        <ol className="space-y-2.5">
          {BAR_RULES.map((rule, i) => (
            <li key={i} className="flex gap-3 text-[13px] text-accent/80 leading-relaxed">
              <span className="font-display text-accent-dim shrink-0">{i + 1}.</span>
              {rule}
            </li>
          ))}
        </ol>
        <label className="flex items-start gap-3 mt-5 cursor-pointer min-h-[44px]">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-1 w-4 h-4 shrink-0 accent-[#D7CC8F]"
          />
          <span className="text-[13px] text-accent-dim">
            Дорогие зрители, я ознакомлен с правилами
          </span>
        </label>
      </div>

      {errors.form && <p className="px-5 text-cinema-red text-[13px] mb-3">{errors.form}</p>}

      <div className="mt-auto px-5 pb-7">
        <Button disabled={!canSubmit} onClick={submit}>
          {submitting ? (
            <motion.span
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.1, repeat: Infinity }}
            >
              Печатаем билет…
            </motion.span>
          ) : (
            'Забронировать'
          )}
        </Button>
      </div>
    </div>
  )
}
