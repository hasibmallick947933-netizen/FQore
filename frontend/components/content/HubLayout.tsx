'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Content } from '@/lib/types';
import { Card } from '@/components/ui/Card';
import { Search, Clock, Eye, Sparkles, BookOpen, Video, FileSpreadsheet, FileText, ArrowUpRight } from 'lucide-react';

interface HubLayoutProps {
  title: string;
  badge: string;
  description: string;
  subcategories: string[];
  initialContent: Content[];
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

export const HubLayout: React.FC<HubLayoutProps> = ({
  title,
  badge,
  description,
  subcategories,
  initialContent,
}) => {
  const [selectedSubcat, setSelectedSubcat] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = initialContent.filter((item) => {
    const matchesSubcat =
      selectedSubcat === 'all' ||
      (item.subcategory && item.subcategory.toLowerCase() === selectedSubcat.toLowerCase());
    const matchesSearch =
      searchQuery === '' ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSubcat && matchesSearch;
  });

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hub Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono uppercase text-cyan-300 mb-4">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            {badge}
          </div>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mb-4">
            {title}
          </h1>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pb-8 mb-10 border-b border-slate-800">
          {/* Subcategory Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            <button
              onClick={() => setSelectedSubcat('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all shrink-0 ${
                selectedSubcat === 'all'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_12px_rgba(34,211,238,0.2)]'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              All Topics
            </button>
            {subcategories.map((subcat) => (
              <button
                key={subcat}
                onClick={() => setSelectedSubcat(subcat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all shrink-0 ${
                  selectedSubcat.toLowerCase() === subcat.toLowerCase()
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_12px_rgba(34,211,238,0.2)]'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {subcat}
              </button>
            ))}
          </div>

          {/* Quick Search */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search track..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>
        </div>

        {/* Content Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item, idx) => {
              const Icon = typeIconMap[item.contentType] || BookOpen;
              return (
                <Link key={item._id} href={`/content/${item.slug}`} className="group flex">
                  <Card stepNumber={`0${idx + 1}.`} className="w-full">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-mono uppercase font-semibold bg-cyan-950/60 border border-cyan-500/30 text-cyan-300">
                          <Icon className="w-3 h-3" />
                          {item.contentType.replace('_', ' ')}
                        </span>
                        <span className="text-[11px] font-mono text-slate-500">
                          {item.difficulty || 'Beginner'}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug mb-2">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed mb-4">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-cyan-400/80" />
                        <span>{item.readTimeMinutes} min</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Eye className="w-3 h-3 text-slate-500" />
                        <span>{item.views} views</span>
                      </div>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 rounded-2xl border border-dashed border-slate-800 bg-slate-950/40">
            <p className="text-sm text-slate-400">No educational modules match your current filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};
