'use client';

import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Content } from '@/lib/types';
import { Eye, Clock, ArrowUpRight, Sparkles, BookOpen, Video, FileSpreadsheet, FileText } from 'lucide-react';

interface FeaturedGridProps {
  items: Content[];
}

const typeIconMap: Record<string, any> = {
  article: BookOpen,
  video: Video,
  excel: FileSpreadsheet,
  csv: FileSpreadsheet,
  pdf: FileText,
  case_study: FileText,
  company_analysis: Sparkles,
};

export const FeaturedGrid: React.FC<FeaturedGridProps> = ({ items }) => {
  if (!items || items.length === 0) return null;

  return (
    <section className="py-20 lg:py-24 border-b border-cyan-500/15 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Flagship Curations
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
              Featured Deep Dives
            </h2>
          </div>
          <Link
            href="/search"
            className="text-xs font-mono text-cyan-300 hover:text-cyan-200 inline-flex items-center gap-1 group"
          >
            Browse All Releases
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Numbered Cards matching video style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.slice(0, 4).map((item, index) => {
            const stepNumber = `0${index + 1}.`;
            const Icon = typeIconMap[item.contentType] || BookOpen;

            return (
              <Link key={item._id} href={`/content/${item.slug}`} className="group flex">
                <Card stepNumber={stepNumber} className="w-full">
                  <div>
                    {/* Content Type Badge */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-mono uppercase font-semibold bg-cyan-950/60 border border-cyan-500/30 text-cyan-300">
                        <Icon className="w-3 h-3" />
                        {item.contentType.replace('_', ' ')}
                      </span>
                      <span className="text-[11px] font-mono text-slate-500">
                        {item.category?.name || 'Education'}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed mb-4">
                      {item.description}
                    </p>
                  </div>

                  {/* Card Footer Info */}
                  <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3 h-3 text-cyan-400/80" />
                      <span>{item.readTimeMinutes} min</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Eye className="w-3 h-3 text-slate-500" />
                      <span>{item.views}</span>
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
