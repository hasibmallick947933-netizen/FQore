'use client';

import React from 'react';
import { Users, FileText, Award, ShieldCheck, Sparkles, TrendingUp } from 'lucide-react';

export const StatsBanner: React.FC = () => {
  const stats = [
    {
      value: '10,000+',
      label: 'Active Analysts & Learners',
      icon: Users,
      color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30',
    },
    {
      value: '100+',
      label: 'Verified Business PDFs & Guides',
      icon: FileText,
      color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
    },
    {
      value: '50+',
      label: 'Dynamic 3-Statement Excel Models',
      icon: TrendingUp,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    },
    {
      value: '100%',
      label: 'Practical Institutional Intelligence',
      icon: Award,
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
    },
  ];

  return (
    <section className="py-10 bg-[#060b19] border-y border-cyan-500/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex flex-col items-center justify-center hover:border-cyan-400/40 transition-colors group"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 border ${stat.color} group-hover:scale-110 transition-transform`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs text-slate-400 font-mono uppercase mt-1">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
