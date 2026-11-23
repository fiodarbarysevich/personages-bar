export default function PhoneFrame({ children }) {
  return (
    <div className="min-h-full bg-bg-outer flex items-center justify-center sm:py-6">
      {/* Виньетка вокруг рамки на десктопе */}
      <div
        className="pointer-events-none fixed inset-0 hidden sm:block"
        style={{ background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.6) 100%)' }}
        aria-hidden="true"
      />
      <div className="relative w-full max-w-[390px] h-[100dvh] sm:h-[844px] sm:max-h-[calc(100vh-48px)] bg-bg-primary sm:rounded-[40px] sm:border sm:border-accent/30 overflow-hidden shadow-warm">
        {children}
      </div>
    </div>
  )
}
