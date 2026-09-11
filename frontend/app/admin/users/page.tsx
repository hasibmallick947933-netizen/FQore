'use client';

import React, { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { User, Role } from '@/lib/types';
import { useAuth } from '@/lib/authContext';
import { Users, Shield, Trash2, Search, CheckCircle } from 'lucide-react';

export default function AdminUsersPage() {
  const { user: currentAdmin } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      let url = '/users';
      if (search.trim()) url += `?search=${encodeURIComponent(search.trim())}`;
      const res = await api.get<{ success: boolean; users: User[]; total: number }>(url);
      setUsers(res.users || []);
      setTotal(res.total || 0);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchUsers();
  };

  const handleRoleChange = async (userId: string, newRole: Role) => {
    try {
      await api.put(`/users/${userId}`, { role: newRole });
      setUsers((prev) =>
        prev.map((u) => (u._id === userId ? { ...u, role: newRole } : u))
      );
    } catch (err: any) {
      alert(err.message || 'Failed to update role');
    }
  };

  const handleDelete = async (userId: string, name: string) => {
    if (userId === currentAdmin?._id) {
      alert('You cannot delete your own active admin account.');
      return;
    }
    if (!confirm(`Permanently delete account for "${name}"?`)) return;

    try {
      await api.delete(`/users/${userId}`);
      setUsers((prev) => prev.filter((u) => u._id !== userId));
      setTotal((t) => t - 1);
    } catch (err: any) {
      alert(err.message || 'Deletion failed');
    }
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black uppercase text-white font-mono flex items-center gap-2">
            <Users className="w-5 h-5 text-cyan-400" /> User Directory & Roles
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Total of {total} registered learners and administrators in MongoDB Atlas.
          </p>
        </div>

        <form onSubmit={handleSearch} className="relative w-64">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search learners..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-cyan-400"
          />
        </form>
      </div>

      <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-900/90 border-b border-slate-800 text-[11px] font-mono text-slate-400 uppercase">
            <tr>
              <th className="px-5 py-3.5">Learner / User</th>
              <th className="px-4 py-3.5">Email</th>
              <th className="px-4 py-3.5">Role Permission</th>
              <th className="px-4 py-3.5">Registered</th>
              <th className="px-5 py-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-sans">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-5 py-10 text-center font-mono text-slate-500">
                  Loading User Catalog...
                </td>
              </tr>
            ) : users.length > 0 ? (
              users.map((u) => (
                <tr key={u._id} className="hover:bg-slate-900/40">
                  <td className="px-5 py-3.5">
                    <div className="font-bold text-white flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center text-[10px] font-mono font-bold">
                        {u.name.charAt(0)}
                      </div>
                      <span>{u.name}</span>
                    </div>
                  </td>

                  <td className="px-4 py-3.5 font-mono text-slate-400 text-xs">
                    {u.email}
                  </td>

                  <td className="px-4 py-3.5">
                    <select
                      value={u.role}
                      disabled={u._id === currentAdmin?._id}
                      onChange={(e) => handleRoleChange(u._id, e.target.value as Role)}
                      className={`text-[11px] font-mono rounded px-2 py-1 bg-slate-900 border ${
                        u.role === 'admin'
                          ? 'border-cyan-500/40 text-cyan-300'
                          : 'border-slate-800 text-slate-400'
                      }`}
                    >
                      <option value="user">User / Student</option>
                      <option value="admin">Administrator</option>
                    </select>
                  </td>

                  <td className="px-4 py-3.5 font-mono text-slate-500 text-[11px]">
                    {new Date(u.createdAt).toLocaleDateString()}
                  </td>

                  <td className="px-5 py-3.5 text-right">
                    {u._id !== currentAdmin?._id && (
                      <button
                        onClick={() => handleDelete(u._id, u.name)}
                        className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-slate-900 rounded transition-colors"
                        title="Delete user"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-5 py-10 text-center font-mono text-slate-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
