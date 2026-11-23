import { TABLES, TIME_SLOTS } from '../data/mockData'

const STORAGE_KEY = 'personages_bookings'

// Детерминированный хеш — занятость воспроизводима между перезагрузками
function hash(str) {
  let h = 0
  for (let i = 0; i < str.length; i++) {
    h = (h * 31 + str.charCodeAt(i)) | 0
  }
  return Math.abs(h)
}

function isPeak(time) {
  return time >= '19:00' && time <= '22:00'
}

export function isSlotTaken(date, time) {
  const r = hash(`${date}|${time}`) % 100
  return r < (isPeak(time) ? 35 : 12)
}

export function getSlots(date) {
  return TIME_SLOTS.map((time) => ({ time, taken: isSlotTaken(date, time) }))
}

export function isTableTaken(date, time, tableId) {
  const r = hash(`${date}|${time}|${tableId}`) % 100
  return r < (isPeak(time) ? 38 : 15)
}

export function getTablesWithStatus(date, time) {
  return TABLES.map((t) => ({
    ...t,
    taken: date && time ? isTableTaken(date, time, t.id) : false,
  }))
}

function generateId() {
  const chars = 'ABCDEFGHJKMNPQRSTUVWXYZ0123456789'
  let code = ''
  for (let i = 0; i < 4; i++) {
    code += chars[Math.floor(Math.random() * chars.length)]
  }
  return `PRS-${code}`
}

export function getBookings() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
  } catch {
    return []
  }
}

export function getLastBooking() {
  const bookings = getBookings()
  return bookings.length ? bookings[bookings.length - 1] : null
}

export function createBooking({ name, phone, comment, date, time, guests, tableId }) {
  if (!name?.trim()) throw new Error('Укажите имя')
  if (!/^\+375\d{9}$/.test(phone.replace(/[\s()\-]/g, ''))) {
    throw new Error('Укажите телефон в формате +375 (XX) XXX-XX-XX')
  }
  const table = TABLES.find((t) => t.id === tableId)
  if (!table) throw new Error('Стол не выбран')

  const booking = {
    id: generateId(),
    name: name.trim(),
    phone: phone.replace(/[\s()\-]/g, ''),
    comment: comment?.trim() || '',
    date,
    time,
    guests,
    tableId,
    createdAt: new Date().toISOString(),
  }
  const bookings = getBookings()
  bookings.push(booking)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings))
  return booking
}
