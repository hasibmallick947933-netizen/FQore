'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';
import { useAuth } from '@/lib/authContext';
import { BookmarkItem, ProgressItem } from '@/lib/types';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Bookmark, CheckCircle2, Clock, Trash2, ArrowRight } from 'lucide-react';

export default function BookmarksPage() {
  const { user } = useAuth();
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);
  const [progress, setProgress] = useState<ProgressItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'bookmarks' | 'progress'>('bookmarks');

  useEffect(() => {
    if (user) {
      loadData();
    } else {
      setLoading(false);
    }
  }, [user]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [bmRes, progRes] = await Promise.all([
        api.get<{ success: boolean; bookmarks: BookmarkItem[] }>('/bookmarks'),
        api.get<{ success: boolean; progress: ProgressItem[] }>('/progress'),
      ]);
      setBookmarks(bmRes.bookmarks || []);
      setProgress(progRes.progress || []);
    } catch (err) {
      console.error('Error loading bookmarks/progress:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveBookmark = async (contentId: string) => {
    try {
      await api.post(`/bookmarks/${contentId}`, {});
      setBookmarks(prev => prev.filter(b => b.content?._id !== contentId));
    } catch (err) {
      console.error('Failed to remove bookmark:', err);
    }
  };

  if (!user && !loading) {
    return (
      <div className="max-w-md mx-auto px-4 py-28 text-center">
        <Bookmark className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Sign In Required</h2>
        <p className="text-xs text-slate-400 mb-6">
          You need an active learner account to save bookmarks and track learning progress.
        </p>
        <Link href="/login">
          <Button variant="chrome">Log In Now</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12 sm:py-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono uppercase text-cyan-300 mb-4">
            <Bookmark className="w-3.5 h-3.5 text-cyan-400" />
            Personal Dashboard
          </div>
          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white mb-2">
            Saved Content & Learning Progress
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Revisit your bookmarked case studies, valuation worksheets, and track module completions.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex gap-3 mb-8 border-b border-slate-800 pb-4">
          <button
            onClick={() => setActiveTab('bookmarks')}
            className={`px-4 py-2 rounded-xl text-xs font-medium tracking-wide flex items-center gap-2 transition-all ${
              activeTab === 'bookmarks'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50'
                : 'text-slate-400 hover:text-white bg-slate-900'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            Saved Bookmarks ({bookmarks.length})
          </button>
          <button
            onClick={() => setActiveTab('progress')}
            className={`px-4 py-2 rounded-xl text-xs font-medium tracking-wide flex items-center gap-2 transition-all ${
              activeTab === 'progress'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50'
                : 'text-slate-400 hover:text-white bg-slate-900'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            Module Progress ({progress.length})
          </button>
        </div>

        {/* Content list */}
        {activeTab === 'bookmarks' ? (
          bookmarks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookmarks.map((bm) => (
                <Card key={bm.bookmarkId} className="w-full">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/30 text-cyan-300 font-bold">
                        {bm.content?.contentType?.replace('_', ' ')}
                      </span>
                      <button
                        onClick={() => handleRemoveBookmark(bm.content?._id)}
                        className="p-1 text-slate-500 hover:text-red-400 transition-colors"
                        title="Remove bookmark"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <h3 className="text-base font-bold text-white line-clamp-2 mb-2">
                      {bm.content?.title}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 mb-4">
                      {bm.content?.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-slate-500">
                      Saved {new Date(bm.savedAt).toLocaleDateString()}
                    </span>
                    <Link
                      href={`/content/${bm.content?.slug}`}
                      className="text-xs font-mono text-cyan-400 hover:underline flex items-center gap-1"
                    >
                      Read <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 rounded-2xl border border-dashed border-slate-800 bg-slate-950/40">
              <Bookmark className="w-8 h-8 text-slate-600 mx-auto mb-2" />
              <p className="text-sm text-slate-400">You haven't bookmarked any educational content yet.</p>
              <Link href="/search" className="inline-block mt-4 text-xs font-mono text-cyan-400 hover:underline">
                Explore Curriculum ↗
              </Link>
            </div>
          )
        ) : (
          progress.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {progress.map((prog) => (
                <Card key={prog._id} className="w-full">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-900 text-slate-400">
                        {prog.contentId?.contentType?.replace('_', ' ')}
                      </span>
                      <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {prog.progressPercent}% Complete
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white line-clamp-2 mb-2">
                      {prog.contentId?.title}
                    </h3>
                  </div>

                  <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-slate-500">
                      Last accessed {new Date(prog.lastAccessed).toLocaleDateString()}
                    </span>
                    <Link
                      href={`/content/${prog.contentId?.slug}`}
                      className="text-xs font-mono text-cyan-400 hover:underline flex items-center gap-1"
                    >
                      Resume <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 rounded-2xl border border-dashed border-slate-800 bg-slate-950/40">
              <CheckCircle2 className="w-8 h-8 text-slate-600 mx-auto mb-2" />
              <p className="text-sm text-slate-400">No course progress records recorded yet.</p>
            </div>
          )
        )}
      </div>
    </div>
  );
}
