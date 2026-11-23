export const EVENTS = [
  {
    id: 'ev1',
    title: 'TARANTINO NIGHT',
    subtitle: 'Киновечер',
    date: '22 ноября',
    time: '22:00',
    theme: 'dark',
    accentColor: '#B91C1C',
  },
  {
    id: 'ev2',
    title: 'SUSPIRIA',
    subtitle: 'Cinema & Perfume',
    date: '1 ноября',
    time: '17:00',
    theme: 'light',
    accentColor: '#D7CC8F',
  },
  {
    id: 'ev3',
    title: 'LA LA LAND',
    subtitle: 'Cinema Club',
    date: '26 сентября',
    time: '19:00',
    theme: 'dark',
    accentColor: '#D7CC8F',
  },
]

// Координаты — центр стола и размеры в процентах от плана зала (plan.png, 1152×648)
export const TABLES = [
  { id: 'T1', label: 'Стол 1', shape: 'circle', seats: 4, x: 20.7, y: 39.0, w: 9.5, h: 17.0, note: 'Круглый, у левой стены' },
  { id: 'T2', label: 'Стол 2', shape: 'circle', seats: 4, x: 60.0, y: 37.0, w: 9.5, h: 17.0, note: 'Круглый, справа от бара' },
  { id: 'T3', label: 'Стол 3', shape: 'circle', seats: 4, x: 20.2, y: 70.2, w: 9.5, h: 17.0, note: 'В глубине зала' },
  { id: 'T4', label: 'Стол 4', shape: 'oval-h', seats: 4, x: 41.2, y: 74.1, w: 9.5, h: 11.6, note: 'В центре зала' },
  { id: 'B1', label: 'Барный стул 1', shape: 'stool', seats: 1, x: 28.6, y: 21.6, w: 3.8, h: 6.8, note: 'У барной стойки' },
  { id: 'B2', label: 'Барный стул 2', shape: 'stool', seats: 1, x: 33.9, y: 21.6, w: 3.8, h: 6.8, note: 'У барной стойки' },
  { id: 'B3', label: 'Барный стул 3', shape: 'stool', seats: 1, x: 39.5, y: 21.6, w: 3.8, h: 6.8, note: 'У барной стойки' },
  { id: 'B4', label: 'Барный стул 4', shape: 'stool', seats: 1, x: 45.6, y: 21.6, w: 3.8, h: 6.8, note: 'У барной стойки' },
  { id: 'S1', label: 'Секретный зал', shape: 'long', seats: 8, x: 80.1, y: 56.3, w: 13.0, h: 12.3, note: 'Отдельный зал для своей компании' },
]

export const WORKING_HOURS = {
  weekdays: 'вс–чт 16:00–01:00',
  weekends: 'пт–сб 16:00–03:00',
  slotStart: 16 * 60, // 16:00 в минутах
  slotEnd: 23 * 60 + 30, // последний слот 23:30
  slotStep: 30,
  maxDurationHours: 2,
}

export const TIME_SLOTS = (() => {
  const slots = []
  for (let m = WORKING_HOURS.slotStart; m <= WORKING_HOURS.slotEnd; m += WORKING_HOURS.slotStep) {
    const hh = String(Math.floor(m / 60)).padStart(2, '0')
    const mm = String(m % 60).padStart(2, '0')
    slots.push(`${hh}:${mm}`)
  }
  return slots
})()

export const BAR_RULES = [
  'Бронь стола ограничена 2 часами.',
  'Если по истечении 20 минут гости не сообщили о задержке — бронь аннулируется.',
]
