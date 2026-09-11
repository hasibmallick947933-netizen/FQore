'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';
import { Content } from '@/lib/types';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import {
  DownloadCloud,
  FileSpreadsheet,
  FileText,
  Video,
  Search,
  ExternalLink,
  Download,
  Filter,
  Eye,
  Calendar,
  HardDrive,
} from 'lucide-react';

export default function ResourcesPage() {
  const [resources, setResources] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    fetchResources();
  }, [typeFilter, sortBy]);

  const fetchResources = async () => {
    setLoading(true);
    try {
      let url = `/content/resources/all?type=${typeFilter}&sort=${sortBy}`;
      if (search) url += `&search=${encodeURIComponent(search)}`;
      const data = await api.get<{ success: boolean; resources: Content[] }>(url);
      setResources(data.resources || []);
    } catch (err) {
      console.error('Failed to fetch resources:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchResources();
  };

  const formatBytes = (bytes?: number) => {
    if (!bytes || bytes === 0) return 'Standard Model';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const typePills = [
    { label: 'All Resources', value: 'all' },
    { label: 'Excel (.xlsx)', value: 'excel', icon: FileSpreadsheet },
    { label: 'CSV Datasets', value: 'csv', icon: FileSpreadsheet },
    { label: 'PDF Guides', value: 'pdf', icon: FileText },
    { label: 'Modeling Videos', value: 'video', icon: Video },
  ];

  return (
    <div className="py-12 sm:py-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono uppercase text-cyan-300 mb-4">
            <DownloadCloud className="w-3.5 h-3.5 text-cyan-400" />
            Institutional Library
          </div>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mb-4">
            Financial Models & Resource Center
          </h1>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Download verified dynamic three-statement financial models, forensic accounting checklists, valuation worksheets, and macroeconomic datasets.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="bg-[#080d1c] p-4 sm:p-5 rounded-2xl border border-slate-800 mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto scrollbar-none">
            {typePills.map((pill) => (
              <button
                key={pill.value}
                onClick={() => setTypeFilter(pill.value)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium tracking-wide transition-all shrink-0 flex items-center gap-1.5 ${
                  typeFilter === pill.value
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_12px_rgba(34,211,238,0.2)]'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {pill.icon && <pill.icon className="w-3.5 h-3.5" />}
                {pill.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <form onSubmit={handleSearch} className="relative w-full md:w-60">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search resources..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-400"
              />
            </form>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-300 px-3 py-1.5 focus:outline-none focus:border-cyan-400"
            >
              <option value="newest">Newest First</option>
              <option value="popular">Most Downloaded</option>
              <option value="title">Alphabetical</option>
            </select>
          </div>
        </div>

        {/* Resources Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="h-64 rounded-2xl bg-slate-900/40 animate-pulse border border-slate-800" />
            ))}
          </div>
        ) : resources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((item, idx) => (
              <Card key={item._id} stepNumber={`0${idx + 1}.`} className="w-full">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] font-mono uppercase font-bold bg-cyan-950/60 border border-cyan-500/30 text-cyan-300">
                      {item.contentType === 'excel' || item.contentType === 'csv' ? (
                        <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
                      ) : item.contentType === 'video' ? (
                        <Video className="w-3.5 h-3.5 text-cyan-400" />
                      ) : (
                        <FileText className="w-3.5 h-3.5 text-blue-400" />
                      )}
                      {item.contentType}
                    </span>

                    <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1">
                      <HardDrive className="w-3 h-3" />
                      {formatBytes(item.mediaDetails?.size)}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2 leading-snug line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(item.publishedAt || item.createdAt).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {item.views} views
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <Link href={`/content/${item.slug}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">
                        Inspect Details
                      </Button>
                    </Link>
                    {item.mediaUrl && (
                      <a
                        href={item.mediaUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        download
                        className="btn-chrome px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 shrink-0"
                      >
                        <Download className="w-3.5 h-3.5" /> Download
                      </a>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 rounded-2xl border border-dashed border-slate-800 bg-slate-950/40">
            <DownloadCloud className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <p className="text-sm text-slate-400 font-medium">No resources match your selected filter.</p>
            <button
              onClick={() => {
                setTypeFilter('all');
                setSearch('');
              }}
              className="mt-3 text-xs text-cyan-400 hover:underline"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
