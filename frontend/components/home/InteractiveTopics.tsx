'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, CheckCircle2, TrendingUp, Building2, Coins, LineChart, FileText } from 'lucide-react';

interface Pillar {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  href: string;
  stats: string;
  points: string[];
  icon: any;
  color: string;
}

const pillars: Pillar[] = [
  {
    id: 'business',
    title: 'Business Models & Scaling Dynamics',
    subtitle: 'From Unit Economics to Monopolistic Moats',
    description:
      'Analyze how high-performing companies structure gross margins, achieve negative churn, and navigate product-market fit transitions.',
    href: '/business',
    stats: '82% Top SaaS Margins',
    points: ['Rule of 40 & Magic Number', 'CAC Payback & LTV Ratios', 'Subscription vs Marketplace Dynamics'],
    icon: Building2,
    color: 'from-cyan-500/20 to-blue-600/30',
  },
  {
    id: 'equities',
    title: 'Institutional Stock Market Architecture',
    subtitle: 'Market Microstructure, Order Books & Liquidity',
    description:
      'Demystify primary IPO issuances, secondary market exchanges, clearing houses, and the mechanics of bid-ask spread auction matching.',
    href: '/stock-market',
    stats: 'Depth of Market (DOM)',
    points: ['Exchange Clearing & Settlement', 'Limit Order Books vs Market Orders', 'Dark Pools & Institutional Volume'],
    icon: TrendingUp,
    color: 'from-blue-600/20 to-cyan-500/30',
  },
  {
    id: 'valuation',
    title: 'Corporate Valuation & DCF Modeling',
    subtitle: 'Discounted Cash Flows, WACC & Multiple Multiples',
    description:
      'Learn how hedge funds and investment banks value enterprise assets using intrinsic cash generation capabilities and terminal risk premiums.',
    href: '/investing',
    stats: 'Intrinsic vs Market Value',
    points: ['Unlevered Free Cash Flow (UFCF)', 'Gordon Growth vs Exit Multiples', 'CapEx Depreciation Schedules'],
    icon: Coins,
    color: 'from-indigo-600/20 to-cyan-500/30',
  },
  {
    id: 'trading',
    title: 'Price Action & Candlestick Forensics',
    subtitle: 'Reading Buyer/Seller Imbalances & Liquidity Sweeps',
    description:
      'Master multi-timeframe chart anatomy, support/resistance liquidity pools, and the neurological discipline required for capital preservation.',
    href: '/trading',
    stats: 'Risk/Reward Asymmetry',
    points: ['Pin Bars, Hammers & Engulfing Formations', 'Supply & Demand Order Blocks', 'Stop-Loss Sizing & Probability'],
    icon: LineChart,
    color: 'from-cyan-600/20 to-teal-500/30',
  },
  {
    id: 'case_studies',
    title: 'Empirical Corporate Case Studies',
    subtitle: 'Historical Autopsies of Pivots and Failures',
    description:
      'Study historic corporate battles: Netflix vs Blockbuster, Apple’s Services Flywheel, and how modern tech giants defend their ecosystems.',
    href: '/case-studies',
    stats: 'Real-World Playbooks',
    points: ['Strategic Cannibalization', 'Network Effects & Switching Costs', 'Turnaround Leadership Tactics'],
    icon: FileText,
    color: 'from-blue-500/20 to-violet-600/30',
  },
];

export const InteractiveTopics: React.FC = () => {
  const [activePillar, setActivePillar] = useState<Pillar>(pillars[0]);

  return (
    <section className="py-20 lg:py-28 relative border-b border-cyan-500/15 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-3">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            Curriculum Pillars
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white">
            Architected For Practical Mastery
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400 max-w-2xl">
            Hover or select an educational track below to preview its conceptual framework and analytical tools.
          </p>
        </div>

        {/* Interactive Rows + Preview Split (Matching Video Frame 120) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Interactive Rows */}
          <div className="lg:col-span-7 space-y-2">
            {pillars.map((pillar, idx) => {
              const isActive = activePillar.id === pillar.id;
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.id}
                  onMouseEnter={() => setActivePillar(pillar)}
                  onClick={() => setActivePillar(pillar)}
                  className={`group relative p-5 sm:p-6 rounded-xl border transition-all duration-300 cursor-pointer overflow-hidden ${
                    isActive
                      ? 'border-cyan-400/50 bg-gradient-to-r from-cyan-950/40 via-blue-950/20 to-transparent shadow-[0_0_25px_rgba(34,211,238,0.15)]'
                      : 'border-slate-800/80 bg-slate-950/30 hover:border-slate-700 hover:bg-slate-900/40'
                  }`}
                >
                  {/* Glowing active indicator bar */}
                  {isActive && (
                    <motion.div
                      layoutId="activeRowIndicator"
                      className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-cyan-400 to-blue-500 shadow-[0_0_12px_#22d3ee]"
                    />
                  )}

                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3.5">
                      <div
                        className={`p-2.5 rounded-lg border transition-colors ${
                          isActive
                            ? 'border-cyan-400/40 bg-cyan-500/10 text-cyan-300'
                            : 'border-slate-800 bg-slate-900 text-slate-400 group-hover:text-slate-200'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-mono text-cyan-400/80">0{idx + 1}.</span>
                          <h3
                            className={`text-base sm:text-lg font-bold transition-colors ${
                              isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'
                            }`}
                          >
                            {pillar.title}
                          </h3>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">{pillar.subtitle}</p>
                      </div>
                    </div>

                    <ArrowUpRight
                      className={`w-5 h-5 shrink-0 transition-transform ${
                        isActive
                          ? 'text-cyan-400 translate-x-0.5 -translate-y-0.5'
                          : 'text-slate-600 group-hover:text-slate-400'
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Dynamic Preview Container */}
          <div className="lg:col-span-5 flex">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePillar.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full glass-panel rounded-2xl p-7 sm:p-8 flex flex-col justify-between relative overflow-hidden border border-cyan-500/30"
              >
                {/* Ambient glow in preview card */}
                <div
                  className={`absolute -top-24 -right-24 w-60 h-60 rounded-full bg-gradient-to-br ${activePillar.color} blur-[70px] pointer-events-none`}
                />

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-mono uppercase tracking-wider text-cyan-300 bg-cyan-950/60 border border-cyan-500/30 px-3 py-1 rounded-full">
                      {activePillar.stats}
                    </span>
                    <activePillar.icon className="w-6 h-6 text-cyan-400" />
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3">{activePillar.title}</h3>
                  <p className="text-sm text-slate-300 leading-relaxed mb-6">
                    {activePillar.description}
                  </p>

                  <div className="space-y-2.5 pt-4 border-t border-slate-800">
                    <span className="text-xs font-mono uppercase text-slate-400 block mb-2">
                      Key Competencies:
                    </span>
                    {activePillar.points.map((point, i) => (
                      <div key={i} className="flex items-center gap-2.5 text-xs text-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8 mt-6 border-t border-slate-800/80">
                  <Link href={activePillar.href}>
                    <button className="btn-chrome w-full py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2">
                      Explore Track ↗
                    </button>
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
