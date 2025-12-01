import React from 'react'

type Props = {
  number: number
  title: string
  description: string
  icon?: any
  actions?: string[]
  onClick?: () => void
}

export const StrategyCard: React.FC<Props> = ({ number, title, description, icon: Icon, actions, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="group flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/70 p-6 shadow-lg backdrop-blur transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-2xl"
    >
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-primary/40 blur-lg" />
          <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
            {Icon ? <Icon className="h-5 w-5" /> : number}
          </div>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Strategie {number}</p>
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        </div>
      </div>

      <p className="text-sm text-muted-foreground">{description}</p>

      {actions && actions.length > 0 && (
        <div className="mt-2 space-y-2">
          {actions.slice(0, 3).map((action, idx) => (
            <div key={idx} className="flex items-center gap-2 text-sm text-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
              <span>{action}</span>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 flex items-center gap-2 text-sm font-medium text-primary">
        <span>Bekijk stappen</span>
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  )
}

export default StrategyCard
