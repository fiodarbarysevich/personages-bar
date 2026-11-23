import { AnimatePresence, motion } from 'framer-motion'
import { Users } from 'lucide-react'
import { Button } from './ui'

export default function BottomSheet({ table, onConfirm, onClose }) {
  return (
    <AnimatePresence>
      {table && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 z-20"
          />
          <motion.div
            key="sheet"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.6 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 80) onClose()
            }}
            className="absolute bottom-0 left-0 right-0 z-30 bg-bg-card border-t border-accent/25 rounded-t-3xl px-6 pt-3 pb-8"
          >
            <div className="w-10 h-1 rounded-full bg-accent/25 mx-auto mb-5" />
            <div className="text-center mb-6">
              <h3 className="font-display text-2xl text-accent">
                {table.label.replace('Стол', 'Стол №')}
              </h3>
              <p className="flex items-center justify-center gap-1.5 text-accent-dim text-sm mt-2">
                <Users size={14} strokeWidth={1.5} />
                До {table.seats} мест
              </p>
              {table.note && <p className="text-accent-dim text-[13px] italic mt-2">«{table.note}»</p>}
            </div>
            <Button onClick={onConfirm}>Подтвердить выбор</Button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
