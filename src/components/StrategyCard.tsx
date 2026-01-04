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
  // Define professional color palettes based on the strategy number
  const colorMap: Record<number, { bg: string, text: string, border: string, iconBg: string }> = {
    1: { bg: "from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30", text: "text-blue-700 dark:text-blue-300", border: "hover:border-blue-200 dark:hover:border-blue-800", iconBg: "bg-blue-600" },
    2: { bg: "from-purple-50 to-fuchsia-50 dark:from-purple-950/30 dark:to-fuchsia-950/30", text: "text-purple-700 dark:text-purple-300", border: "hover:border-purple-200 dark:hover:border-purple-800", iconBg: "bg-purple-600" },
    3: { bg: "from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30", text: "text-emerald-700 dark:text-emerald-300", border: "hover:border-emerald-200 dark:hover:border-emerald-800", iconBg: "bg-emerald-600" },
    4: { bg: "from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30", text: "text-amber-700 dark:text-amber-300", border: "hover:border-amber-200 dark:hover:border-amber-800", iconBg: "bg-amber-600" },
    5: { bg: "from-rose-50 to-pink-50 dark:from-rose-950/30 dark:to-pink-950/30", text: "text-rose-700 dark:text-rose-300", border: "hover:border-rose-200 dark:hover:border-rose-800", iconBg: "bg-rose-600" },
  };

  const colors = colorMap[number] || colorMap[1];

  return (
    <div
      onClick={onClick}
      className={`group h-full flex flex-col gap-6 rounded-3xl border border-slate-100 dark:border-slate-800 bg-gradient-to-br ${colors.bg} p-8 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer ${colors.border}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="relative">
          <div className={`absolute inset-0 rounded-2xl ${colors.iconBg} blur-lg opacity-20 group-hover:opacity-40 transition-opacity`} />
          <div className={`relative flex h-14 w-14 items-center justify-center rounded-2xl ${colors.iconBg} text-white shadow-lg shadow-black/5 ring-1 ring-white/20`}>
            {Icon ? <Icon className="h-7 w-7" /> : number}
          </div>
        </div>
        <span className="text-4xl font-black text-slate-200 dark:text-slate-800/80 font-mono tracking-tighter opacity-50 group-hover:opacity-100 transition-opacity">
          0{number}
        </span>
      </div>

      <div className="flex-1 space-y-3">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-tight group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          {description}
        </p>

        {actions && actions.length > 0 && (
          <div className="mt-4 space-y-2 pt-2">
            {actions.slice(0, 3).map((action, idx) => (
              <div key={idx} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                <span className={`mt-1.5 h-1.5 w-1.5 rounded-full ${colors.iconBg} shrink-0`}></span>
                <span>{action}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className={`mt-auto flex items-center gap-2 text-sm font-bold ${colors.text} group-hover:translate-x-1 transition-transform`}>
        <span>Ontdek aanpak</span>
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M5 12h14" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  )
}

export default StrategyCard
