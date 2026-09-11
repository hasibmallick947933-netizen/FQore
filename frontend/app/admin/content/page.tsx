'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';
import { Content, Category } from '@/lib/types';
import { Button } from '@/components/ui/Button';
import {
  Search,
  PlusCircle,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  ExternalLink,
  Filter,
} from 'lucide-react';

export default function AdminContentListPage() {
  const [content, setContent] = useState<Content[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [publishedFilter, setPublishedFilter] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    // Load categories
    api.get<{ success: boolean; categories: Category[] }>('/categories')
      .then((res) => setCategories(res.categories || []))
      .catch(console.error);
  }, []);

  useEffect(() => {
    fetchContent();
  }, [selectedCategory, selectedType, publishedFilter, page]);

  const fetchContent = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search.trim()) params.append('search', search.trim());
      if (selectedCategory) params.append('category', selectedCategory);
      if (selectedType) params.append('contentType', selectedType);
      if (publishedFilter) params.append('published', publishedFilter);
      params.append('page', page.toString());
      params.append('limit', '10');

      const res = await api.get<{
        success: boolean;
        content: Content[];
        total: number;
        pages: number;
      }>(`/content?${params.toString()}`);

      setContent(res.content || []);
      setTotalPages(res.pages || 1);
      setTotalCount(res.total || 0);
    } catch (err) {
      console.error('Failed to load admin content:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchContent();
  };

  const handleTogglePublish = async (id: string) => {
    try {
      const res = await api.patch<{ success: boolean; published: boolean }>(
        `/content/id/${id}/publish`
      );
      setContent((prev) =>
        prev.map((c) => (c._id === id ? { ...c, published: res.published } : c))
      );
    } catch (err: any) {
      alert(err.message || 'Failed to toggle status');
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to permanently delete "${title}"?`)) return;

    try {
      await api.delete(`/content/id/${id}`);
      setContent((prev) => prev.filter((c) => c._id !== id));
      setTotalCount((c) => c - 1);
    } catch (err: any) {
      alert(err.message || 'Delete failed');
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header & New Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black uppercase text-white font-mono">
            Content Repository Table
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Total of {totalCount} educational modules deployed in MongoDB.
          </p>
        </div>

        <Link href="/admin/content/create">
          <Button variant="chrome" size="sm" showArrow>
            <PlusCircle className="w-4 h-4 mr-1" /> New Educational Material
          </Button>
        </Link>
      </div>

      {/* Filter Bar */}
      <div className="bg-[#080d1c] p-4 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <form onSubmit={handleSearch} className="relative w-64">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-cyan-400"
            />
          </form>

          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setPage(1);
            }}
            className="bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-300 px-3 py-1.5 focus:outline-none focus:border-cyan-400"
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c._id} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>

          <select
            value={selectedType}
            onChange={(e) => {
              setSelectedType(e.target.value);
              setPage(1);
            }}
            className="bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-300 px-3 py-1.5 focus:outline-none focus:border-cyan-400"
          >
            <option value="">All Formats</option>
            <option value="article">Article</option>
            <option value="company_analysis">Company Analysis</option>
            <option value="case_study">Case Study</option>
            <option value="video">Video</option>
            <option value="excel">Excel</option>
            <option value="pdf">PDF</option>
            <option value="educational_note">Educational Note</option>
          </select>

          <select
            value={publishedFilter}
            onChange={(e) => {
              setPublishedFilter(e.target.value);
              setPage(1);
            }}
            className="bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-300 px-3 py-1.5 focus:outline-none focus:border-cyan-400"
          >
            <option value="">All Statuses</option>
            <option value="true">Published Only</option>
            <option value="false">Drafts Only</option>
          </select>
        </div>

        <button
          onClick={() => {
            setSearch('');
            setSelectedCategory('');
            setSelectedType('');
            setPublishedFilter('');
            setPage(1);
          }}
          className="text-xs font-mono text-cyan-400 hover:underline"
        >
          Reset Filters
        </button>
      </div>

      {/* Table */}
      <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/90 border-b border-slate-800 text-[11px] font-mono text-slate-400 uppercase">
              <tr>
                <th className="px-5 py-3.5">Title & Subcategory</th>
                <th className="px-4 py-3.5">Format</th>
                <th className="px-4 py-3.5">Category</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-4 py-3.5">Views</th>
                <th className="px-4 py-3.5">Published Date</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-slate-500 font-mono">
                    Querying Content Records...
                  </td>
                </tr>
              ) : content.length > 0 ? (
                content.map((item) => (
                  <tr key={item._id} className="hover:bg-slate-900/40 transition-colors">
                    <td className="px-5 py-3.5 max-w-sm">
                      <div className="font-bold text-white line-clamp-1">{item.title}</div>
                      <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                        /{item.slug} {item.featured && '• ★ Featured'}
                      </div>
                    </td>

                    <td className="px-4 py-3.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-slate-900 border border-slate-800 text-cyan-300 font-semibold">
                        {item.contentType.replace('_', ' ')}
                      </span>
                    </td>

                    <td className="px-4 py-3.5 text-slate-300 font-mono text-[11px]">
                      {item.category?.name}
                    </td>

                    <td className="px-4 py-3.5">
                      <button
                        onClick={() => handleTogglePublish(item._id)}
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold transition-colors ${
                          item.published
                            ? 'bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30'
                            : 'bg-amber-500/20 text-amber-300 hover:bg-amber-500/30'
                        }`}
                        title="Click to toggle publish status"
                      >
                        {item.published ? (
                          <CheckCircle className="w-3 h-3" />
                        ) : (
                          <XCircle className="w-3 h-3" />
                        )}
                        {item.published ? 'Published' : 'Draft'}
                      </button>
                    </td>

                    <td className="px-4 py-3.5 font-mono text-slate-400">
                      {item.views}
                    </td>

                    <td className="px-4 py-3.5 font-mono text-[11px] text-slate-500">
                      {new Date(item.publishedAt || item.createdAt).toLocaleDateString()}
                    </td>

                    <td className="px-5 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/content/${item.slug}`}
                          target="_blank"
                          className="p-1.5 text-slate-400 hover:text-cyan-300 hover:bg-slate-900 rounded"
                          title="View live publication"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                        <Link
                          href={`/admin/content/${item._id}/edit`}
                          className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-900 rounded"
                          title="Edit content"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => handleDelete(item._id, item.title)}
                          className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-900 rounded"
                          title="Delete content"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-slate-500 font-mono">
                    No content entries match your filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-500">
              Page {page} of {totalPages}
            </span>
            <div className="flex gap-2">
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
                className="px-3 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300 disabled:opacity-40"
              >
                Prev
              </button>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="px-3 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300 disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
