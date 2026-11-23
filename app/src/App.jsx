import { AnimatePresence, motion } from 'framer-motion'
import { Route, Routes, useLocation } from 'react-router-dom'
import PhoneFrame from './components/PhoneFrame'
import { BookingProvider } from './context/BookingContext'
import BookingParams from './pages/BookingParams'
import Confirm from './pages/Confirm'
import Home from './pages/Home'
import Success from './pages/Success'
import TableSelect from './pages/TableSelect'

const pageMotion = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
  transition: { duration: 0.3, ease: 'easeOut' },
}

function Page({ children }) {
  return (
    <motion.div {...pageMotion} className="h-full">
      {children}
    </motion.div>
  )
}

function AdminStub() {
  return (
    <div className="h-full flex flex-col items-center justify-center px-8 text-center">
      <p className="font-display text-2xl text-accent mb-3">Админ-панель</p>
      <p className="text-accent-dim text-sm">Скоро. Управление столами, бронями и афишей.</p>
    </div>
  )
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Page><Home /></Page>} />
        <Route path="/booking" element={<Page><BookingParams /></Page>} />
        <Route path="/booking/table" element={<Page><TableSelect /></Page>} />
        <Route path="/booking/confirm" element={<Page><Confirm /></Page>} />
        <Route path="/booking/success" element={<Page><Success /></Page>} />
        <Route path="/admin" element={<Page><AdminStub /></Page>} />
        <Route path="*" element={<Page><Home /></Page>} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BookingProvider>
      <PhoneFrame>
        <AnimatedRoutes />
      </PhoneFrame>
    </BookingProvider>
  )
}
