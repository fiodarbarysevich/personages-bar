import { motion } from 'framer-motion'
import { Check, Copy } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Ticket, { formatDateRu } from '../components/Ticket'
import { Button } from '../components/ui'
import { useBooking } from '../context/BookingContext'
import { getLastBooking } from '../lib/bookingService'

export default function Success() {
  const navigate = useNavigate()
  const { booking, reset } = useBooking()
  const [copied, setCopied] = useState(false)

  // Восстановление последней брони после перезагрузки
  const data = booking || getLastBooking()

  if (!data) {
    navigate('/', { replace: true })
    return null
  }

  const share = async () => {
    const text = `PERSONAGES · билет ${data.id}\n${formatDateRu(data.date)}, ${data.time}\nСтол ${data.tableId.replace('T', '')}, ${data.guests} гост. · ${data.name}`
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      // буфер обмена может быть недоступен — просто показываем тост
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  const goHome = () => {
    reset()
    navigate('/')
  }

  return (
    <div className="h-full overflow-y-auto no-scrollbar flex flex-col px-5 pt-14 pb-7">
      <motion.div
        initial={{ y: 120, opacity: 0, scale: 0.96 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 220, damping: 24 }}
      >
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: [0, -0.7, 0.7, 0] }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          <Ticket booking={data} />
        </motion.div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45, duration: 0.4 }}
        className="text-center text-accent/85 text-[14px] leading-relaxed mt-7 px-2"
      >
        Дорогие зрители, спасибо, что выбрали PERSONAGES.
        <br />
        Показ начнётся вовремя — до встречи в кино!
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        className="mt-auto pt-8 space-y-2"
      >
        <Button onClick={goHome}>На главную</Button>
        <Button variant="ghost" onClick={share}>
          {copied ? 'Скопировано' : 'Поделиться билетом'}
        </Button>
      </motion.div>

      {/* Тост */}
      <motion.div
        initial={false}
        animate={{ opacity: copied ? 1 : 0, y: copied ? 0 : 12 }}
        transition={{ duration: 0.25 }}
        className="pointer-events-none fixed bottom-24 left-1/2 -translate-x-1/2 bg-accent text-bg-primary text-[13px] px-4 py-2 rounded-full flex items-center gap-1.5"
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
        Детали брони скопированы
      </motion.div>
    </div>
  )
}
