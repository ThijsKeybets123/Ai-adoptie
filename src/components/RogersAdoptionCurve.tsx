import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const stages = [
  { label: 'Innovators', percent: '2.5%', color: 'from-indigo-500 via-indigo-400 to-indigo-300' },
  { label: 'Early Adopters', percent: '13.5%', color: 'from-blue-500 via-blue-400 to-blue-300' },
  { label: 'Early Majority', percent: '34%', color: 'from-cyan-500 via-cyan-400 to-cyan-300' },
  { label: 'Late Majority', percent: '34%', color: 'from-emerald-500 via-emerald-400 to-emerald-300' },
  { label: 'Laggards', percent: '16%', color: 'from-orange-500 via-orange-400 to-orange-300' },
]

export const RogersAdoptionCurve: React.FC = () => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10; // Max 10 degrees
    const rotateY = ((x - centerX) / centerX) * 10; // Max 10 degrees

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <section className="relative overflow-hidden bg-slate-950 py-20 text-white">
      <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(59,130,246,0.25), transparent 60%)' }} />
      <div className="container relative mx-auto flex flex-col gap-10 px-4 lg:flex-row lg:items-center">
        <div className="max-w-xl space-y-4">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs uppercase tracking-[0.3em] text-slate-200">
            curve
            <span className="h-1 w-1 rounded-full bg-emerald-400" />
          </span>
          <h2 className="text-3xl font-semibold leading-tight">
            Rogers Adoption Curve voor AI binnen FMCG
          </h2>
          <p className="text-base text-slate-300">
            Begrijp hoe teams binnen verschillende adoptiefases vallen. De curve helpt om interventies te richten op de juiste mindset per groep.
          </p>
        </div>

        <div 
          ref={cardRef}
          onClick={() => navigate('/rogers-curve')}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="flex-1 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur transition-transform duration-100 ease-out cursor-pointer"
          style={{
            transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          }}
        >
          <div className="relative mb-8 h-48 w-full overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-500/30 via-purple-500/30 to-pink-500/30">
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 160" preserveAspectRatio="none">
              <path
                d="M0,120 C80,60 120,20 200,20 C280,20 320,60 400,120"
                stroke="url(#curveGradient)"
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="curveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="50%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#f97316" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-end justify-between px-6 pb-4 text-xs text-white/80">
              {stages.map((stage) => (
                <span key={stage.label}>{stage.label}</span>
              ))}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {stages.map((stage) => (
              <div key={stage.label} className="rounded-2xl border border-white/5 bg-white/10 p-3 text-center text-sm">
                <div className={`mx-auto mb-2 h-2 w-full rounded-full bg-gradient-to-r ${stage.color}`} />
                <p className="text-xs uppercase tracking-wide text-slate-300">{stage.label}</p>
                <p className="text-lg font-semibold">{stage.percent}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default RogersAdoptionCurve
