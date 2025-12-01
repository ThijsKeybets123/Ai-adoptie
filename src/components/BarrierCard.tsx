import React from 'react'

type ColorType = 'default' | 'red' | 'blue' | 'orange' | 'purple' | 'emerald' | 'amber' | 'pink' | 'cyan';

type Props = {
  title: string
  icon: any
  description?: string
  stats?: string
  example?: string
  onClick?: () => void
  color?: ColorType
}

const colorStyles: Record<ColorType, {
  iconBg: string;
  iconText: string;
  iconHoverBg: string;
  iconHoverText: string;
  blur: string;
  borderHover: string;
  statsBorder: string;
  statsBg: string;
  statsText: string;
  linkText: string;
  cardBorder: string;
  cardBg: string;
  cardHoverBg: string;
}> = {
  default: {
    iconBg: "bg-primary/10",
    iconText: "text-primary",
    iconHoverBg: "group-hover:bg-primary",
    iconHoverText: "group-hover:text-primary-foreground",
    blur: "bg-primary/30",
    borderHover: "hover:border-primary/50",
    statsBorder: "border-primary/30",
    statsBg: "bg-primary/5",
    statsText: "text-primary",
    linkText: "text-primary",
    cardBorder: "border-white/10",
    cardBg: "from-card to-card/80",
    cardHoverBg: ""
  },
  red: {
    iconBg: "bg-red-500/20",
    iconText: "text-red-600",
    iconHoverBg: "group-hover:bg-red-600",
    iconHoverText: "group-hover:text-white",
    blur: "bg-red-500/50",
    borderHover: "hover:border-red-500",
    statsBorder: "border-red-500/30",
    statsBg: "bg-red-500/10",
    statsText: "text-red-700",
    linkText: "text-red-600",
    cardBorder: "border-red-500/40",
    cardBg: "from-red-500/20 to-red-500/5",
    cardHoverBg: "hover:from-red-500/30 hover:to-red-500/10"
  },
  blue: {
    iconBg: "bg-blue-500/20",
    iconText: "text-blue-600",
    iconHoverBg: "group-hover:bg-blue-600",
    iconHoverText: "group-hover:text-white",
    blur: "bg-blue-500/50",
    borderHover: "hover:border-blue-500",
    statsBorder: "border-blue-500/30",
    statsBg: "bg-blue-500/10",
    statsText: "text-blue-700",
    linkText: "text-blue-600",
    cardBorder: "border-blue-500/40",
    cardBg: "from-blue-500/20 to-blue-500/5",
    cardHoverBg: "hover:from-blue-500/30 hover:to-blue-500/10"
  },
  orange: {
    iconBg: "bg-orange-500/20",
    iconText: "text-orange-600",
    iconHoverBg: "group-hover:bg-orange-600",
    iconHoverText: "group-hover:text-white",
    blur: "bg-orange-500/50",
    borderHover: "hover:border-orange-500",
    statsBorder: "border-orange-500/30",
    statsBg: "bg-orange-500/10",
    statsText: "text-orange-700",
    linkText: "text-orange-600",
    cardBorder: "border-orange-500/40",
    cardBg: "from-orange-500/20 to-orange-500/5",
    cardHoverBg: "hover:from-orange-500/30 hover:to-orange-500/10"
  },
  purple: {
    iconBg: "bg-purple-500/20",
    iconText: "text-purple-600",
    iconHoverBg: "group-hover:bg-purple-600",
    iconHoverText: "group-hover:text-white",
    blur: "bg-purple-500/50",
    borderHover: "hover:border-purple-500",
    statsBorder: "border-purple-500/30",
    statsBg: "bg-purple-500/10",
    statsText: "text-purple-700",
    linkText: "text-purple-600",
    cardBorder: "border-purple-500/40",
    cardBg: "from-purple-500/20 to-purple-500/5",
    cardHoverBg: "hover:from-purple-500/30 hover:to-purple-500/10"
  },
  emerald: {
    iconBg: "bg-emerald-500/20",
    iconText: "text-emerald-600",
    iconHoverBg: "group-hover:bg-emerald-600",
    iconHoverText: "group-hover:text-white",
    blur: "bg-emerald-500/50",
    borderHover: "hover:border-emerald-500",
    statsBorder: "border-emerald-500/30",
    statsBg: "bg-emerald-500/10",
    statsText: "text-emerald-700",
    linkText: "text-emerald-600",
    cardBorder: "border-emerald-500/40",
    cardBg: "from-emerald-500/20 to-emerald-500/5",
    cardHoverBg: "hover:from-emerald-500/30 hover:to-emerald-500/10"
  },
  amber: {
    iconBg: "bg-amber-500/20",
    iconText: "text-amber-600",
    iconHoverBg: "group-hover:bg-amber-600",
    iconHoverText: "group-hover:text-white",
    blur: "bg-amber-500/50",
    borderHover: "hover:border-amber-500",
    statsBorder: "border-amber-500/30",
    statsBg: "bg-amber-500/10",
    statsText: "text-amber-700",
    linkText: "text-amber-600",
    cardBorder: "border-amber-500/40",
    cardBg: "from-amber-500/20 to-amber-500/5",
    cardHoverBg: "hover:from-amber-500/30 hover:to-amber-500/10"
  },
  pink: {
    iconBg: "bg-pink-500/20",
    iconText: "text-pink-600",
    iconHoverBg: "group-hover:bg-pink-600",
    iconHoverText: "group-hover:text-white",
    blur: "bg-pink-500/50",
    borderHover: "hover:border-pink-500",
    statsBorder: "border-pink-500/30",
    statsBg: "bg-pink-500/10",
    statsText: "text-pink-700",
    linkText: "text-pink-600",
    cardBorder: "border-pink-500/40",
    cardBg: "from-pink-500/20 to-pink-500/5",
    cardHoverBg: "hover:from-pink-500/30 hover:to-pink-500/10"
  },
  cyan: {
    iconBg: "bg-cyan-500/20",
    iconText: "text-cyan-600",
    iconHoverBg: "group-hover:bg-cyan-600",
    iconHoverText: "group-hover:text-white",
    blur: "bg-cyan-500/50",
    borderHover: "hover:border-cyan-500",
    statsBorder: "border-cyan-500/30",
    statsBg: "bg-cyan-500/10",
    statsText: "text-cyan-700",
    linkText: "text-cyan-600",
    cardBorder: "border-cyan-500/40",
    cardBg: "from-cyan-500/20 to-cyan-500/5",
    cardHoverBg: "hover:from-cyan-500/30 hover:to-cyan-500/10"
  }
};

export const BarrierCard: React.FC<Props> = ({ title, icon: Icon, description, stats, example, onClick, color = 'default' }) => {
  const styles = colorStyles[color] || colorStyles.default;

  return (
    <div
      onClick={onClick}
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border ${styles.cardBorder} bg-gradient-to-br ${styles.cardBg} ${styles.cardHoverBg} p-6 shadow-xl transition-all hover:-translate-y-1 ${styles.borderHover} hover:shadow-2xl ${onClick ? 'cursor-pointer' : ''}`}
    >
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className={`absolute inset-0 rounded-2xl ${styles.blur} blur-xl`} />
          <div className={`relative flex h-12 w-12 items-center justify-center rounded-2xl ${styles.iconBg} ${styles.iconText} transition-all ${styles.iconHoverBg} ${styles.iconHoverText}`}>
            {Icon ? <Icon className="h-6 w-6" /> : null}
          </div>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Barrière</p>
          <h3 className="text-lg font-semibold leading-tight text-foreground">{title}</h3>
        </div>
      </div>

      {description && (
        <p className="mt-4 flex-grow text-sm text-muted-foreground">
          {description}
        </p>
      )}

      {(stats || example) && (
        <div className={`mt-6 rounded-xl border border-dashed ${styles.statsBorder} ${styles.statsBg} p-4 text-sm`}>
          {stats && <p className={`font-semibold ${styles.statsText}`}>{stats}</p>}
          {example && <p className="mt-1 text-muted-foreground">{example}</p>}
        </div>
      )}

      <div className={`mt-6 flex items-center gap-2 text-sm font-medium ${styles.linkText}`}>
        <span>Lees meer</span>
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  )
}

export default BarrierCard
