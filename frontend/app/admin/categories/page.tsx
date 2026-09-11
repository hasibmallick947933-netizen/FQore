'use client';

import React, { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { Category } from '@/lib/types';
import { Button } from '@/components/ui/Button';
import { FolderTree, Plus, Trash2, Edit2, Check, X, AlertCircle } from 'lucide-react';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [newCat, setNewCat] = useState({
    name: '',
    description: '',
    icon: 'BookOpen',
  });

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editDesc, setEditDesc] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await api.get<{ success: boolean; categories: Category[] }>('/categories');
      setCategories(res.categories || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCat.name.trim()) return;

    setCreating(true);
    setErrorMsg('');
    try {
      await api.post('/categories', newCat);
      setNewCat({ name: '', description: '', icon: 'BookOpen' });
      fetchCategories();
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to create category');
    } finally {
      setCreating(false);
    }
  };

  const startEdit = (cat: Category) => {
    setEditingId(cat._id);
    setEditName(cat.name);
    setEditDesc(cat.description);
  };

  const saveEdit = async (id: string) => {
    try {
      await api.put(`/categories/${id}`, { name: editName, description: editDesc });
      setEditingId(null);
      fetchCategories();
    } catch (err: any) {
      alert(err.message || 'Failed to update category');
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete category "${name}"?`)) return;
    try {
      await api.delete(`/categories/${id}`);
      fetchCategories();
    } catch (err: any) {
      alert(err.message || 'Failed to delete category');
    }
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-2xl font-black uppercase text-white font-mono flex items-center gap-2">
          <FolderTree className="w-5 h-5 text-cyan-400" /> Taxonomy & Category Manager
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Organize knowledge pillars, manage slugs, and monitor active module distributions.
        </p>
      </div>

      {errorMsg && (
        <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/40 text-xs text-red-300 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Create Category Card */}
      <div className="glass-panel p-6 rounded-2xl border border-cyan-500/30">
        <h3 className="text-xs font-mono uppercase text-cyan-400 font-bold mb-4">
          + Deploy New Educational Category
        </h3>
        <form onSubmit={handleCreate} className="grid grid-cols-1 sm:grid-cols-12 gap-4">
          <div className="sm:col-span-4">
            <input
              type="text"
              required
              value={newCat.name}
              onChange={(e) => setNewCat({ ...newCat, name: e.target.value })}
              placeholder="Category Name (e.g. Quantitative Macro)"
              className="w-full px-3.5 py-2 text-xs bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-400"
            />
          </div>
          <div className="sm:col-span-6">
            <input
              type="text"
              value={newCat.description}
              onChange={(e) => setNewCat({ ...newCat, description: e.target.value })}
              placeholder="Short Description of subject matter..."
              className="w-full px-3.5 py-2 text-xs bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-400"
            />
          </div>
          <div className="sm:col-span-2">
            <Button type="submit" variant="chrome" size="sm" loading={creating} className="w-full">
              Add Category
            </Button>
          </div>
        </form>
      </div>

      {/* Categories Table */}
      <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-900/90 border-b border-slate-800 text-[11px] font-mono text-slate-400 uppercase">
            <tr>
              <th className="px-5 py-3.5">Category Name</th>
              <th className="px-4 py-3.5">Slug</th>
              <th className="px-4 py-3.5">Description</th>
              <th className="px-4 py-3.5">Linked Modules</th>
              <th className="px-5 py-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-sans">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-5 py-10 text-center font-mono text-slate-500">
                  Loading Categories...
                </td>
              </tr>
            ) : categories.map((cat) => (
              <tr key={cat._id} className="hover:bg-slate-900/40">
                <td className="px-5 py-3.5 font-bold text-white">
                  {editingId === cat._id ? (
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="px-2 py-1 text-xs bg-slate-900 border border-cyan-400 rounded text-white"
                    />
                  ) : (
                    cat.name
                  )}
                </td>

                <td className="px-4 py-3.5 font-mono text-[11px] text-cyan-400">
                  /{cat.slug}
                </td>

                <td className="px-4 py-3.5 text-slate-400 text-xs max-w-xs">
                  {editingId === cat._id ? (
                    <input
                      type="text"
                      value={editDesc}
                      onChange={(e) => setEditDesc(e.target.value)}
                      className="w-full px-2 py-1 text-xs bg-slate-900 border border-cyan-400 rounded text-white"
                    />
                  ) : (
                    cat.description
                  )}
                </td>

                <td className="px-4 py-3.5 font-mono text-slate-300">
                  <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                    {cat.contentCount || 0} modules
                  </span>
                </td>

                <td className="px-5 py-3.5 text-right">
                  {editingId === cat._id ? (
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => saveEdit(cat._id)}
                        className="p-1.5 text-emerald-400 hover:bg-slate-900 rounded"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="p-1.5 text-slate-400 hover:bg-slate-900 rounded"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => startEdit(cat)}
                        className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-900 rounded"
                        title="Edit category"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(cat._id, cat.name)}
                        className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-900 rounded"
                        title="Delete category"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
