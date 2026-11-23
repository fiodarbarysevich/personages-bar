import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import BottomSheet from '../components/BottomSheet'
import TableMap from '../components/TableMap'
import { ScreenHeader } from '../components/ui'
import { formatDateRu } from '../components/Ticket'
import { useBooking } from '../context/BookingContext'
import { getTablesWithStatus } from '../lib/bookingService'

export default function TableSelect() {
  const navigate = useNavigate()
  const { date, time, guests, tableId, setTableId } = useBooking()

  const tables = useMemo(() => getTablesWithStatus(date, time), [date, time])
  const selected = tables.find((t) => t.id === tableId) || null

  // Если дата/время потерялись (прямой заход по ссылке) — вернуться к параметрам
  if (!date || !time) {
    navigate('/booking', { replace: true })
    return null
  }

  return (
    <div className="h-full flex flex-col relative">
      <ScreenHeader
        title="Выберите стол"
        subtitle={`${formatDateRu(date)} · ${time} · ${guests} ${
          guests === 1 ? 'гость' : guests < 5 ? 'гостя' : 'гостей'
        }`}
        backTo="/booking"
      />

      <p className="px-5 text-accent-dim text-[13px] mb-3">Нажмите на свободный стол</p>

      <div className="flex-1 flex flex-col justify-center pb-6">
        <TableMap tables={tables} selectedId={tableId} guests={guests} onSelect={setTableId} />

        {guests > 4 && (
          <p className="px-5 text-accent-dim text-[12px] mt-4 text-center">
            Вас {guests} — доступны только столы от {guests} мест
          </p>
        )}
      </div>

      <BottomSheet
        table={selected}
        onConfirm={() => navigate('/booking/confirm')}
        onClose={() => setTableId(null)}
      />
    </div>
  )
}
