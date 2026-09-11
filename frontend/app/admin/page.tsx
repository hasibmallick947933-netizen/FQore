'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';
import { AdminStats } from '@/lib/types';
import { Button } from '@/components/ui/Button';
import {
  Users,
  FileText,
  Eye,
  FolderTree,
  PlusCircle,
  TrendingUp,
  FileSpreadsheet,
  Video,
  Sparkles,
  ArrowUpRight,
  HardDrive,
  Edit,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const data = await api.get<{ success: boolean; stats: AdminStats }>('/stats');
      setStats(data.stats);
    } catch (err) {
      console.error('Failed to load stats:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-28 rounded-2xl bg-slate-900" />
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => <div key={i} className="h-28 rounded-2xl bg-slate-900" />)}
        </div>
      </div>
    );
  }

  if (!stats) return null;

  const statCards = [
    {
      title: 'Total Learners',
      value: stats.totalUsers,
      sub: 'Registered Accounts',
      icon: Users,
      color: 'text-cyan-400',
    },
    {
      title: 'Published Content',
      value: stats.publishedContent,
      sub: `${stats.draftContent} drafts in queue`,
      icon: FileText,
      color: 'text-emerald-400',
    },
    {
      title: 'Cumulative Views',
      value: stats.totalViews.toLocaleString(),
      sub: 'Platform Engagement',
      icon: Eye,
      color: 'text-blue-400',
    },
    {
      title: 'Media & Models',
      value: stats.totalMedia,
      sub: `${stats.categoriesCount} Taxonomy Categories`,
      icon: HardDrive,
      color: 'text-amber-400',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome & Quick Action Bar */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-cyan-500/30 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-mono uppercase text-cyan-400 tracking-wider block mb-1">
            Control Center
          </span>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
            Administrative Intelligence
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage educational tracks, deploy financial models, and monitor student engagement.
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <Link href="/admin/content/create">
            <Button variant="chrome" size="sm" showArrow>
              + Create Article / Case Study
            </Button>
          </Link>
          <Link href="/admin/media">
            <Button variant="outline" size="sm">
              Upload Files (Cloudinary)
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-center justify-between"
            >
              <div>
                <span className="text-xs font-mono text-slate-400 uppercase block mb-1">
                  {card.title}
                </span>
                <div className="text-2xl sm:text-3xl font-black text-white font-mono">
                  {card.value}
                </div>
                <span className="text-[11px] text-slate-500 mt-1 block">{card.sub}</span>
              </div>
              <div className={`p-3 rounded-xl bg-slate-900 border border-slate-800 ${card.color}`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Content Formats Breakdown */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800">
        <h3 className="text-sm font-bold uppercase font-mono text-white mb-4">
          Content Format Distribution
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {Object.entries(stats.contentTypeCounts || {}).map(([type, count]) => (
            <div key={type} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
              <span className="text-[10px] font-mono uppercase text-cyan-400 block truncate">
                {type.replace('_', ' ')}
              </span>
              <span className="text-lg font-mono font-bold text-white mt-0.5 block">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Dual Tables: Recent Publications & Popular Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Uploads */}
        <div className="lg:col-span-7 glass-panel p-6 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold uppercase font-mono text-white">
              Recently Uploaded Material
            </h3>
            <Link href="/admin/content" className="text-xs font-mono text-cyan-400 hover:underline">
              View All ↗
            </Link>
          </div>

          <div className="divide-y divide-slate-800/80">
            {stats.recentContent.map((item) => (
              <div key={item._id} className="py-3 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-900 text-cyan-300 border border-slate-800">
                      {item.contentType.replace('_', ' ')}
                    </span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                        item.published
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-amber-500/20 text-amber-300'
                      }`}
                    >
                      {item.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  <h4 className="text-xs font-semibold text-white truncate max-w-sm">
                    {item.title}
                  </h4>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    href={`/admin/content/${item._id}/edit`}
                    className="p-1.5 rounded bg-slate-900 text-slate-400 hover:text-cyan-300 border border-slate-800"
                    title="Edit content"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Content */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold uppercase font-mono text-white">
              Most Engaged Materials
            </h3>
            <TrendingUp className="w-4 h-4 text-cyan-400" />
          </div>

          <div className="space-y-3">
            {stats.popularContent.map((item, idx) => (
              <Link
                key={item._id}
                href={`/content/${item.slug}`}
                className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center justify-between gap-3 hover:border-cyan-500/40 transition-colors block"
              >
                <div className="min-w-0">
                  <span className="text-[10px] font-mono text-cyan-400 block mb-0.5">
                    #0{idx + 1} • {item.contentType.replace('_', ' ')}
                  </span>
                  <h4 className="text-xs font-semibold text-white truncate max-w-xs">
                    {item.title}
                  </h4>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs font-mono font-bold text-white block">
                    {item.views}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">views</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
