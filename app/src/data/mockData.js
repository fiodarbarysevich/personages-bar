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

// Координаты — центр стола и размеры в процентах от плана зала (plan.png)
export const TABLES = [
  { id: 'T1', label: 'Стол 1', shape: 'square', seats: 2, x: 12, y: 16, w: 10, h: 12, note: 'Уютный, для двоих' },
  { id: 'T2', label: 'Стол 2', shape: 'oval-v', seats: 4, x: 86, y: 22, w: 12, h: 18, note: 'У окна' },
  { id: 'T3', label: 'Стол 3', shape: 'oval-v', seats: 4, x: 11, y: 47, w: 12, h: 20, note: 'Вдоль стены' },
  { id: 'T4', label: 'Стол 4', shape: 'oval-h', seats: 6, x: 50, y: 52, w: 26, h: 16, note: 'Центр зала, лучший вид на экран' },
  { id: 'T5', label: 'Стол 5', shape: 'oval-v', seats: 4, x: 87, y: 50, w: 12, h: 18, note: 'У стены' },
  { id: 'T6', label: 'Стол 6', shape: 'square', seats: 4, x: 12, y: 82, w: 11, h: 13, note: 'У входа' },
  { id: 'T7', label: 'Стол 7', shape: 'oval-h', seats: 4, x: 42, y: 85, w: 20, h: 12, note: 'У самого бара' },
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
  'На пятницу и субботу рекомендуем бронировать за 2–3 дня.',
  'Если по истечении 20 минут гости не сообщили о задержке — бронь аннулируется.',
]
