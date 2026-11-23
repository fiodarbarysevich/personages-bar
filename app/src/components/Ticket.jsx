import { QRCodeSVG } from 'qrcode.react'
import { Logo, Ornament } from './ui'

const WEEKDAYS = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота']
const MONTHS = [
  'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
  'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря',
]

export function formatDateRu(iso) {
  if (!iso) return ''
  const d = new Date(`${iso}T00:00:00`)
  const weekday = WEEKDAYS[d.getDay()]
  return `${weekday[0].toUpperCase()}${weekday.slice(1)}, ${d.getDate()} ${MONTHS[d.getMonth()]}`
}

export default function Ticket({ booking }) {
  return (
    <div className="ticket-perforation bg-bg-card rounded-2xl border border-accent/25 overflow-hidden">
      {/* Верхняя часть */}
      <div className="px-6 pt-7 pb-6 text-center">
        <Logo size="text-lg" />
        <p className="text-[10px] uppercase tracking-label text-accent-dim mt-2">
          Кинобар · Минск
        </p>
        <Ornament className="my-5" />
        <p className="font-display text-3xl text-gold-bright tracking-wider">№ {booking.id}</p>
        <p className="text-accent text-sm mt-3">{formatDateRu(booking.date)}</p>
        <p className="font-display text-xl text-accent mt-1">{booking.time}</p>
      </div>

      {/* Линия отрыва */}
      <div className="ticket-notch border-t border-dashed border-accent/40 mx-1" />

      {/* Нижняя часть */}
      <div className="px-6 py-6 flex items-center justify-between gap-4">
        <div className="text-sm space-y-1.5">
          <p className="text-accent-dim text-[11px] uppercase tracking-label">Гость</p>
          <p className="text-accent">{booking.name}</p>
          <p className="text-accent-dim text-[11px] uppercase tracking-label pt-2">Место</p>
          <p className="text-accent">
            Ряд {booking.tableId.replace('T', '')} · {booking.guests}{' '}
            {booking.guests === 1 ? 'гость' : booking.guests < 5 ? 'гостя' : 'гостей'}
          </p>
        </div>
        <div className="bg-accent p-2 rounded-lg shrink-0">
          <QRCodeSVG value={`PERSONAGES:${booking.id}`} size={72} bgColor="#D7CC8F" fgColor="#2C0404" />
        </div>
      </div>
    </div>
  )
}
