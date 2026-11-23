import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export function Logo({ size = 'text-xl' }) {
  return (
    <div className={`font-display ${size} tracking-logo text-accent select-none`}>
      ПЕРСОНАЖИ
    </div>
  )
}

export function Ornament({ className = '' }) {
  return (
    <div className={`flex items-center gap-3 ${className}`} aria-hidden="true">
      <span className="h-px flex-1 bg-accent/20" />
      <span className="text-accent-dim text-[10px]">✦</span>
      <span className="h-px flex-1 bg-accent/20" />
    </div>
  )
}

export function Button({ children, onClick, disabled, variant = 'primary', className = '', type = 'button' }) {
  const base =
    'w-full rounded-xl uppercase tracking-btn text-sm font-medium transition-all duration-200 active:scale-[0.98] min-h-[48px] flex items-center justify-center'
  const styles =
    variant === 'primary'
      ? disabled
        ? 'border border-accent/30 text-accent/30 cursor-not-allowed'
        : 'border border-accent text-accent hover:bg-accent hover:text-bg-primary'
      : 'text-accent-dim underline-offset-4 hover:underline min-h-[40px]'
  return (
    <motion.button
      type={type}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${styles} ${className}`}
    >
      {children}
    </motion.button>
  )
}

export function ScreenHeader({ title, subtitle, backTo = -1 }) {
  const navigate = useNavigate()
  return (
    <div className="px-5 pt-5 pb-4">
      <button
        onClick={() => navigate(backTo)}
        className="flex items-center gap-1.5 text-accent-dim text-sm mb-4 min-h-[32px] -ml-1 px-1"
        aria-label="Назад"
      >
        <ArrowLeft size={16} strokeWidth={1.5} />
        Назад
      </button>
      <h1 className="font-display text-[26px] leading-tight text-accent">{title}</h1>
      {subtitle && <p className="text-accent-dim text-[13px] mt-1.5">{subtitle}</p>}
    </div>
  )
}
