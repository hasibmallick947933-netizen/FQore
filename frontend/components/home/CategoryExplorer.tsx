'use client';

import React from 'react';
import Link from 'next/link';
import { Category } from '@/lib/types';
import {
  Briefcase,
  TrendingUp,
  Building2,
  LineChart,
  FileText,
  BarChart3,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface CategoryExplorerProps {
  categories?: Category[];
}

export const CategoryExplorer: React.FC<CategoryExplorerProps> = ({ categories = [] }) => {
  // Curated list ensuring all 6 flagship domains display with colorful Learnova-style badge themes
  const defaultCategories = [
    {
      name: 'Business Models',
      slug: 'business',
      count: '15+ Guides & PDFs',
      icon: Briefcase,
      color: 'from-blue-500/20 to-cyan-500/20 text-cyan-300 border-cyan-500/30',
      desc: 'Unit economics, CAC payback, Rule of 40',
    },
    {
      name: 'Stock Market',
      slug: 'stock-market',
      count: '12+ Cheat Sheets',
      icon: TrendingUp,
      color: 'from-emerald-500/20 to-teal-500/20 text-emerald-300 border-emerald-500/30',
      desc: 'Order books, clearing auctions, liquidity',
    },
    {
      name: 'Company Deep Dives',
      slug: 'companies',
      count: '8+ Equity Scorecards',
      icon: Building2,
      color: 'from-purple-500/20 to-indigo-500/20 text-purple-300 border-purple-500/30',
      desc: 'Moat analysis, risks, institutional financials',
    },
    {
      name: 'Investing & DCF',
      slug: 'investing',
      count: '10+ Excel Models',
      icon: BarChart3,
      color: 'from-amber-500/20 to-yellow-500/20 text-amber-300 border-amber-500/30',
      desc: 'Discounted cash flows, WACC, valuation',
    },
    {
      name: 'Trading Concepts',
      slug: 'trading',
      count: '14+ Price Playbooks',
      icon: LineChart,
      color: 'from-rose-500/20 to-pink-500/20 text-rose-300 border-rose-500/30',
      desc: 'Candlestick anatomy, pin bars, risk sizing',
    },
    {
      name: 'Case Studies',
      slug: 'case-studies',
      count: '9+ Autopsies',
      icon: FileText,
      color: 'from-violet-500/20 to-blue-500/20 text-violet-300 border-violet-500/30',
      desc: 'Strategic pivots, lessons, disruption',
    },
  ];

  return (
    <section className="py-14 sm:py-20 border-b border-cyan-500/15 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header (Learnova Style: Left Title, Right "View All" link) */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-slate-800/80 gap-4">
          <div>
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-cyan-400 block mb-1">
              CURATED DISCIPLINES
            </span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
              Popular Categories
            </h2>
          </div>
          <Link
            href="/search"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 6 Category Cards Grid (Learnova Layout) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {defaultCategories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <Link
                key={idx}
                href={`/${cat.slug}`}
                className="group relative rounded-2xl bg-slate-950/70 border border-slate-800/80 p-5 hover:border-cyan-400/50 hover:bg-[#080e22] transition-all duration-300 flex flex-col items-center text-center shadow-lg hover:shadow-[0_10px_25px_rgba(34,211,238,0.15)] hover:-translate-y-1.5"
              >
                {/* Colorful Soft Container Icon */}
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.color} border flex items-center justify-center mb-3 shadow-inner group-hover:scale-110 transition-transform`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {cat.name}
                </h3>
                <span className="text-[11px] font-mono text-slate-400 mt-1">
                  {cat.count}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
