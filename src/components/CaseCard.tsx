import React from 'react'
import { ArrowUpRight } from 'lucide-react'

export const CaseCard: React.FC<{ company: string; title: string; description: string; impact: string; url?: string }> = ({ company, title, description, impact, url }) => {
  const Component = url ? 'a' : 'div'
  const props = url ? { href: url, target: '_blank', rel: 'noopener noreferrer' } : {}

  return (
    <Component
      {...props}
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-6 text-white shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-indigo-500/20 ${url ? 'cursor-pointer' : ''}`}
    >
      <div className="absolute inset-0 opacity-20 transition-opacity duration-500 group-hover:opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 0% 0%, rgba(99, 102, 241, 0.4), transparent 50%)' }} />

      <div className="relative z-10 flex-1">
        <div className="flex justify-between items-start">
          <div className="text-xs uppercase tracking-[0.3em] text-indigo-300 font-bold mb-3">{company}</div>
          {url && <ArrowUpRight className="h-4 w-4 text-indigo-300 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-2 group-hover:translate-y-0" />}
        </div>
        <h3 className="mb-4 text-2xl font-bold leading-tight text-white">{title}</h3>
        <p className="text-sm text-slate-300 leading-relaxed mb-6">{description}</p>
      </div>

      <div className="relative z-10 mt-auto">
        <div className="rounded-xl border border-indigo-500/30 bg-indigo-500/10 p-4 text-sm font-medium text-indigo-100 backdrop-blur-sm">
          <span className="block text-xs uppercase text-indigo-400 mb-1">Impact</span>
          {impact}
        </div>
      </div>
    </Component>
  )
}

export default CaseCard
