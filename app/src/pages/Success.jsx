import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Ticket from '../components/Ticket'
import { Button } from '../components/ui'
import { useBooking } from '../context/BookingContext'
import { getLastBooking } from '../lib/bookingService'

export default function Success() {
  const navigate = useNavigate()
  const { booking, reset } = useBooking()

  // Восстановление последней брони после перезагрузки
  const data = booking || getLastBooking()

  if (!data) {
    navigate('/', { replace: true })
    return null
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
        Дорогие зрители, спасибо за бронирование.
        <br />
        Ждём вас в «Персонажах»!
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        className="mt-auto pt-8"
      >
        <Button onClick={goHome}>На главную</Button>
      </motion.div>
    </div>
  )
}
