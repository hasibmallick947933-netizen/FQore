'use client';

import React from 'react';
import Link from 'next/link';
import { Content } from '@/lib/types';
import {
  Sparkles,
  ArrowRight,
  Star,
  FileText,
  FileSpreadsheet,
  Video,
  Lock,
  Download,
  BookOpen,
} from 'lucide-react';

interface FeaturedGridProps {
  items?: Content[];
  onOpenPaywall?: () => void;
}

const fallbackPublications: Partial<Content>[] = [
  {
    _id: 'featured_1',
    title: 'SaaS Unit Economics & Rule of 40 Valuation Model',
    slug: 'saas-unit-economics-dcf-model',
    description: 'Deconstruction of CAC payback periods, net dollar retention (NDR), and valuation multiples across public SaaS companies.',
    contentType: 'pdf',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80',
    tags: ['SaaS', 'Unit Economics', 'PDF Blueprint'],
    isPaywalled: true,
  },
  {
    _id: 'featured_2',
    title: '3-Statement Institutional DCF Model (.xlsx)',
    slug: '3-statement-institutional-dcf-model',
    description: 'Complete downloadable Excel financial model with dynamic sensitivity tables, WACC calculations, and debt sweeps.',
    contentType: 'excel',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80',
    tags: ['Valuation', 'Excel', 'DCF'],
    isPaywalled: true,
  },
  {
    _id: 'featured_3',
    title: 'Financial Statement Forensics Checklist & Ratio Guide',
    slug: 'financial-statement-forensics-checklist-pdf',
    description: 'Auditor checklist for spotting accounting manipulations, revenue recognition anomalies, and inventory channel stuffing.',
    contentType: 'pdf',
    thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&auto=format&fit=crop&q=80',
    tags: ['Forensics', 'Accounting', 'Checklist'],
    isPaywalled: true,
  },
  {
    _id: 'featured_4',
    title: 'Technical Price Action Candlestick Masterclass',
    slug: 'price-action-candlestick-anatomy-playbook',
    description: 'Institutional order-flow analysis, liquidity pool hunting, rejection wicks, and high-probability reversal patterns.',
    contentType: 'video',
    thumbnail: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?w=600&auto=format&fit=crop&q=80',
    tags: ['Trading', 'Candlesticks', 'Price Action'],
    isPaywalled: false,
  },
];

export const FeaturedGrid: React.FC<FeaturedGridProps> = ({ items = [], onOpenPaywall }) => {
  const displayItems = items && items.length > 0 ? items : (fallbackPublications as Content[]);

  return (
    <section className="py-16 sm:py-24 border-b border-cyan-500/15 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header (Learnova Style) */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-slate-800/80 gap-4">
          <div>
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-cyan-400 block mb-1">
              FLAGSHIP BLUEPRINTS
            </span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
              Most Popular Modules & PDFs
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Handpicked institutional research and financial models loved by ambitious learners worldwide.
            </p>
          </div>
          <Link
            href="/resources"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group shrink-0"
          >
            <span>View All Blueprints</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Course Cards Grid (Learnova Layout) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayItems.slice(0, 4).map((item, idx) => {
            const formatBadge =
              item.contentType === 'pdf'
                ? { label: 'PDF Guide', icon: FileText, color: 'bg-rose-950/70 border-rose-500/40 text-rose-300' }
                : item.contentType === 'excel'
                ? { label: 'Excel Model', icon: FileSpreadsheet, color: 'bg-emerald-950/70 border-emerald-500/40 text-emerald-300' }
                : item.contentType === 'video'
                ? { label: 'Video Class', icon: Video, color: 'bg-purple-950/70 border-purple-500/40 text-purple-300' }
                : { label: 'Deep Dive', icon: BookOpen, color: 'bg-blue-950/70 border-blue-500/40 text-blue-300' };

            const Icon = formatBadge.icon;

            return (
              <div
                key={item._id || idx}
                className="group rounded-2xl bg-slate-950/80 border border-slate-800/80 overflow-hidden hover:border-cyan-400/50 hover:bg-[#080d1c] transition-all duration-300 flex flex-col justify-between shadow-xl hover:-translate-y-1.5"
              >
                {/* Thumbnail Banner */}
                <div className="relative h-44 w-full overflow-hidden bg-slate-900">
                  <img
                    src={item.thumbnail || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80'}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                  {/* Format Badge */}
                  <div className="absolute top-3 left-3">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold uppercase border backdrop-blur-md ${formatBadge.color}`}
                    >
                      <Icon className="w-3 h-3" />
                      {formatBadge.label}
                    </span>
                  </div>

                  {/* Step Number in Monospace */}
                  <div className="absolute top-3 right-3 text-xs font-mono font-bold text-slate-400">
                    0{idx + 1}.
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Title */}
                    <Link href={`/content/${item.slug}`}>
                      <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug">
                        {item.title}
                      </h3>
                    </Link>

                    {/* Description */}
                    <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-800/80">
                    {/* Author & Rating Row (Learnova Style) */}
                    <div className="flex items-center justify-between text-xs mb-3">
                      <div className="flex items-center gap-2">
                        <img
                          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&auto=format&fit=crop&q=80"
                          alt="Analyst"
                          className="w-5 h-5 rounded-full object-cover ring-1 ring-cyan-400/40"
                        />
                        <span className="text-[11px] text-slate-300 font-medium">FQore Research</span>
                      </div>
                      <div className="flex items-center gap-1 text-amber-400 text-[11px] font-mono">
                        <Star className="w-3 h-3 fill-amber-400" />
                        <span>4.9</span>
                        <span className="text-slate-500">(1.2k)</span>
                      </div>
                    </div>

                    {/* Pricing & CTA Button */}
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <div className="flex items-baseline gap-1">
                          <span className="text-base font-black text-white font-mono">₹59</span>
                          <span className="text-[10px] text-slate-500 line-through font-mono">₹499</span>
                        </div>
                        <span className="text-[9px] font-mono text-cyan-400 uppercase">One-Time Access</span>
                      </div>

                      <Link href={`/content/${item.slug}`}>
                        <button className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:border-cyan-400 transition-all flex items-center gap-1.5 shadow-sm">
                          <span>Read</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
