'use client';

import React from 'react';
import { TrendingUp, ArrowUpRight, Zap, ShieldAlert, Sparkles, Activity } from 'lucide-react';

export const MarketTicker: React.FC = () => {
  const tickerItems = [
    { label: 'SAAS RULE OF 40', value: '44.8%', status: 'optimal', icon: TrendingUp },
    { label: 'DCF SENSITIVITY', value: 'WACC 9.2%', status: 'model', icon: Activity },
    { label: 'NVIDIA CUDA MOAT', value: '92% SHARE', status: 'moat', icon: Sparkles },
    { label: 'FORENSIC BENFORD', value: '0.04% RISK', status: 'audit', icon: ShieldAlert },
    { label: 'BTC LIQUIDITY DEPTH', value: '+$142M', status: 'optimal', icon: Zap },
    { label: 'CAC PAYBACK PERIOD', value: '6.4 MONTHS', status: 'optimal', icon: TrendingUp },
    { label: 'NET DOLLAR RETENTION', value: '128% NDR', status: 'optimal', icon: Sparkles },
    { label: 'YIELD CURVE SPREAD', value: '10Y-2Y +14BPS', status: 'macro', icon: Activity },
  ];

  return (
    <div className="w-full bg-[#050915] border-y border-cyan-500/20 py-2.5 overflow-hidden relative select-none">
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#040711] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#040711] to-transparent z-10 pointer-events-none" />

      <div className="flex w-max animate-marquee space-x-8">
        {[...tickerItems, ...tickerItems].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="flex items-center gap-2.5 px-3 py-1 rounded-lg bg-slate-900/50 border border-slate-800/80 text-xs font-mono"
            >
              <Icon className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-slate-400 uppercase tracking-wider text-[11px] font-medium">
                {item.label}:
              </span>
              <span className="text-cyan-300 font-bold text-[11px] flex items-center gap-0.5">
                {item.value}
                <ArrowUpRight className="w-3 h-3 text-emerald-400" />
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
