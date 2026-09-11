'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';
import { Content, Category } from '@/lib/types';
import { Card } from '@/components/ui/Card';
import {
  Search as SearchIcon,
  Filter,
  Clock,
  Eye,
  BookOpen,
  Video,
  FileSpreadsheet,
  FileText,
  Sparkles,
  X,
} from 'lucide-react';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [contentType, setContentType] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [page, setPage] = useState(1);

  const [results, setResults] = useState<Content[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load categories for filter dropdown
    api.get<{ success: boolean; categories: Category[] }>('/categories')
      .then((data) => setCategories(data.categories || []))
      .catch(console.error);
  }, []);

  useEffect(() => {
    executeSearch();
  }, [category, contentType, sortBy, page]);

  const executeSearch = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (query.trim()) params.append('search', query.trim());
      if (category) params.append('category', category);
      if (contentType) params.append('contentType', contentType);
      if (sortBy) params.append('sortBy', sortBy);
      params.append('page', page.toString());
      params.append('limit', '9');

      const data = await api.get<{
        success: boolean;
        content: Content[];
        total: number;
        pages: number;
      }>(`/content?${params.toString()}`);

      setResults(data.content || []);
      setTotal(data.total || 0);
      setTotalPages(data.pages || 1);
    } catch (err) {
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    executeSearch();
  };

  const clearFilters = () => {
    setQuery('');
    setCategory('');
    setContentType('');
    setSortBy('popular');
    setPage(1);
  };

  return (
    <div className="py-12 sm:py-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono uppercase text-cyan-300 mb-4">
            <SearchIcon className="w-3.5 h-3.5" />
            Global Repository
          </div>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mb-4">
            Search The Ecosystem
          </h1>
          <p className="text-sm text-slate-400">
            Query across business models, company equity analyses, candlestick mechanics, and quantitative datasets.
          </p>
        </div>

        {/* Global Search Bar */}
        <form onSubmit={handleSearchSubmit} className="mb-8">
          <div className="relative">
            <SearchIcon className="w-5 h-5 text-cyan-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by keywords (e.g. 'SaaS', 'NVIDIA', 'DCF', 'Candlestick')..."
              className="w-full pl-12 pr-28 py-3.5 bg-slate-900/90 border border-cyan-500/30 rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(34,211,238,0.25)] transition-all"
            />
            <button
              type="submit"
              className="btn-chrome absolute right-2.5 top-1/2 -translate-y-1/2 px-4 py-2 rounded-lg text-xs font-semibold"
            >
              Search
            </button>
          </div>
        </form>

        {/* Faceted Filter Bar */}
        <div className="bg-[#080d1c] p-4 rounded-xl border border-slate-800 mb-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            {/* Category select */}
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setPage(1);
              }}
              className="bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-300 px-3 py-2 focus:outline-none focus:border-cyan-400"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat.slug}>
                  {cat.name}
                </option>
              ))}
            </select>

            {/* Content Type select */}
            <select
              value={contentType}
              onChange={(e) => {
                setContentType(e.target.value);
                setPage(1);
              }}
              className="bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-300 px-3 py-2 focus:outline-none focus:border-cyan-400"
            >
              <option value="">All Content Formats</option>
              <option value="article">Written Article</option>
              <option value="company_analysis">Company Analysis</option>
              <option value="case_study">Business Case Study</option>
              <option value="educational_note">Educational Note</option>
              <option value="video">Video Masterclass</option>
              <option value="excel">Excel Model</option>
              <option value="pdf">PDF Guide</option>
            </select>

            {/* Sort select */}
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                setPage(1);
              }}
              className="bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-300 px-3 py-2 focus:outline-none focus:border-cyan-400"
            >
              <option value="popular">Most Popular</option>
              <option value="newest">Recently Published</option>
              <option value="title">Title (A-Z)</option>
            </select>

            {(query || category || contentType) && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 px-2 py-1"
              >
                <X className="w-3.5 h-3.5" /> Clear filters
              </button>
            )}
          </div>

          <div className="text-xs font-mono text-slate-400">
            Found <span className="text-cyan-300 font-bold">{total}</span> matching items
          </div>
        </div>

        {/* Search Results */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-60 rounded-xl bg-slate-900/40 animate-pulse border border-slate-800" />
            ))}
          </div>
        ) : results.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((item, idx) => (
                <Link key={item._id} href={`/content/${item.slug}`} className="group flex">
                  <Card stepNumber={`0${idx + 1}.`} className="w-full">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-mono uppercase font-semibold bg-cyan-950/60 border border-cyan-500/30 text-cyan-300">
                          {item.contentType.replace('_', ' ')}
                        </span>
                        <span className="text-[11px] font-mono text-slate-500">
                          {item.category?.name}
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
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12">
                <button
                  disabled={page <= 1}
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  className="px-4 py-2 rounded-lg text-xs bg-slate-900 border border-slate-800 text-slate-300 disabled:opacity-40"
                >
                  Previous
                </button>
                <span className="text-xs font-mono text-slate-400 px-3">
                  Page {page} of {totalPages}
                </span>
                <button
                  disabled={page >= totalPages}
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  className="px-4 py-2 rounded-lg text-xs bg-slate-900 border border-slate-800 text-slate-300 disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-24 rounded-2xl border border-dashed border-slate-800 bg-slate-950/40">
            <SearchIcon className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <p className="text-sm font-medium text-slate-300">No content matches your search query</p>
            <p className="text-xs text-slate-500 mt-1">Try broadening your keywords or resetting filters.</p>
            <button
              onClick={clearFilters}
              className="mt-4 px-4 py-2 rounded-lg text-xs font-mono text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/10"
            >
              Reset Search Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
