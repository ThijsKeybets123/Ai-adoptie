import React from 'react'

export const CaseCard: React.FC<{ company: string; title: string; description: string; impact: string }> = ({ company, title, description, impact }) => {
  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 p-6 text-white shadow-2xl">
      <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.3), transparent 40%)' }} />
      <div className="relative z-10">
        <div className="text-xs uppercase tracking-[0.3em] text-slate-300">{company}</div>
        <h3 className="mt-2 text-xl font-semibold leading-tight">{title}</h3>
      </div>
      <p className="relative z-10 mt-4 flex-grow text-sm text-slate-200">{description}</p>
      <div className="relative z-10 mt-6 rounded-xl border border-white/30 bg-white/10 p-4 text-sm font-medium text-white">
        {impact}
      </div>
    </div>
  )
}

export default CaseCard
