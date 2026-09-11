'use client';

import React from 'react';
import Link from 'next/link';
import { Category } from '@/lib/types';
import {
  Briefcase,
  TrendingUp,
  Building2,
  Coins,
  LineChart,
  FileText,
  BarChart3,
  DownloadCloud,
  Layers,
} from 'lucide-react';

interface CategoryExplorerProps {
  categories: Category[];
}

const iconMap: Record<string, any> = {
  Briefcase,
  TrendingUp,
  Building2,
  Coins,
  LineChart,
  FileText,
  BarChart3,
  DownloadCloud,
};

export const CategoryExplorer: React.FC<CategoryExplorerProps> = ({ categories }) => {
  return (
    <section className="py-20 lg:py-24 border-b border-cyan-500/15 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-3">
            <Layers className="w-3.5 h-3.5" />
            Knowledge Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
            Taxonomy of Learning
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-400">
            Select a specialized knowledge domain to browse research articles, interactive spreadsheets, and video lessons.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((category) => {
            const IconComponent = iconMap[category.icon] || Briefcase;
            return (
              <Link
                key={category._id}
                href={`/${category.slug === 'business-models' ? 'business' : category.slug}`}
                className="group glass-panel rounded-xl p-5 sm:p-6 transition-all duration-300 hover:border-cyan-400/50 hover:bg-slate-900/40 relative overflow-hidden"
              >
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 flex items-center justify-center mb-4 group-hover:bg-cyan-500/20 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all">
                  <IconComponent className="w-5 h-5" />
                </div>

                <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {category.name}
                </h3>
                <p className="text-[11px] text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                  {category.description}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-cyan-400">
                  <span>{category.contentCount || 0} Modules</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
