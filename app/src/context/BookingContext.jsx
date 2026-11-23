import { createContext, useContext, useMemo, useState } from 'react'

const BookingContext = createContext(null)

function toISO(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function BookingProvider({ children }) {
  const [date, setDate] = useState(toISO(new Date()))
  const [time, setTime] = useState(null)
  const [guests, setGuests] = useState(2)
  const [tableId, setTableId] = useState(null)
  const [booking, setBooking] = useState(null)

  const value = useMemo(
    () => ({
      date,
      setDate,
      time,
      setTime,
      guests,
      setGuests,
      tableId,
      setTableId,
      booking,
      setBooking,
      reset() {
        setTime(null)
        setGuests(2)
        setTableId(null)
        setBooking(null)
      },
    }),
    [date, time, guests, tableId, booking]
  )

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
}

export function useBooking() {
  const ctx = useContext(BookingContext)
  if (!ctx) throw new Error('useBooking must be used within BookingProvider')
  return ctx
}

export { toISO }
