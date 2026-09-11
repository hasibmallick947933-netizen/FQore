'use client';

import React, { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { Plan } from '@/lib/types';
import { Button } from '@/components/ui/Button';
import {
  CreditCard,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Save,
  X,
  Sparkles,
} from 'lucide-react';

export default function AdminPlansPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Form State
  const [formState, setFormState] = useState({
    name: '',
    price: 59,
    currency: 'INR',
    description: '',
    features: '',
    badge: '',
    popular: false,
    active: true,
    order: 0,
  });

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    setLoading(true);
    try {
      const res = await api.get<{ success: boolean; plans: Plan[] }>('/plans/admin');
      setPlans(res.plans || []);
    } catch (err: any) {
      setErrorMsg('Failed to load subscription plans');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCreate = () => {
    setEditingPlan(null);
    setFormState({
      name: '',
      price: 59,
      currency: 'INR',
      description: '',
      features: '',
      badge: '',
      popular: false,
      active: true,
      order: plans.length + 1,
    });
    setShowCreateModal(true);
  };

  const handleOpenEdit = (plan: Plan) => {
    setEditingPlan(plan);
    setFormState({
      name: plan.name,
      price: plan.price,
      currency: plan.currency || 'INR',
      description: plan.description || '',
      features: plan.features ? plan.features.join('\n') : '',
      badge: plan.badge || '',
      popular: plan.popular || false,
      active: plan.active !== undefined ? plan.active : true,
      order: plan.order || 0,
    });
    setShowCreateModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const payload = {
      name: formState.name,
      price: Number(formState.price),
      currency: formState.currency,
      description: formState.description,
      features: formState.features.split('\n').map((f) => f.trim()).filter(Boolean),
      badge: formState.badge,
      popular: formState.popular,
      active: formState.active,
      order: Number(formState.order),
    };

    try {
      if (editingPlan) {
        await api.put(`/plans/${editingPlan._id}`, payload);
        setSuccessMsg(`Plan "${payload.name}" updated successfully in MongoDB Atlas.`);
      } else {
        await api.post('/plans', payload);
        setSuccessMsg(`New plan "${payload.name}" created successfully in MongoDB Atlas.`);
      }
      setShowCreateModal(false);
      fetchPlans();
    } catch (err: any) {
      setErrorMsg(err.message || 'Operation failed');
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to permanently delete plan "${name}"?`)) return;

    try {
      await api.delete(`/plans/${id}`);
      setPlans((prev) => prev.filter((p) => p._id !== id));
      setSuccessMsg(`Plan "${name}" removed.`);
    } catch (err: any) {
      alert(err.message || 'Failed to delete plan');
    }
  };

  const handleToggleActive = async (plan: Plan) => {
    try {
      await api.put(`/plans/${plan._id}`, { active: !plan.active });
      setPlans((prev) =>
        prev.map((p) => (p._id === plan._id ? { ...p, active: !p.active } : p))
      );
    } catch (err: any) {
      alert('Failed to toggle status');
    }
  };

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black uppercase text-white font-mono flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-cyan-400" /> Razorpay Paywall Plans CMS
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Configure dynamic pricing tiers for Business PDFs and financial model downloads.
          </p>
        </div>

        <Button variant="chrome" size="sm" onClick={handleOpenCreate} showArrow>
          <Plus className="w-4 h-4 mr-1" /> Add New Plan
        </Button>
      </div>

      {errorMsg && (
        <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/40 text-xs text-red-300 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {successMsg && (
        <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-xs text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Plans Table */}
      <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-900/90 border-b border-slate-800 text-[11px] font-mono text-slate-400 uppercase">
            <tr>
              <th className="px-5 py-3.5">Plan Name</th>
              <th className="px-4 py-3.5">Price (INR)</th>
              <th className="px-4 py-3.5">Description</th>
              <th className="px-4 py-3.5">Features Included</th>
              <th className="px-4 py-3.5">Status</th>
              <th className="px-5 py-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-sans">
            {loading ? (
              <tr>
                <td colSpan={6} className="px-5 py-12 text-center font-mono text-slate-500">
                  Loading Pricing Plans from Atlas...
                </td>
              </tr>
            ) : plans.length > 0 ? (
              plans.map((plan) => (
                <tr key={plan._id} className="hover:bg-slate-900/40">
                  <td className="px-5 py-3.5 font-bold text-white">
                    <div className="flex items-center gap-2">
                      <span>{plan.name}</span>
                      {plan.popular && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-mono uppercase bg-cyan-400 text-slate-950 font-bold">
                          {plan.badge || 'Popular'}
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="px-4 py-3.5 font-mono text-cyan-300 font-bold text-sm">
                    ₹{plan.price}
                  </td>

                  <td className="px-4 py-3.5 text-slate-400 max-w-xs text-xs">
                    {plan.description}
                  </td>

                  <td className="px-4 py-3.5 font-mono text-slate-300 text-[11px]">
                    {plan.features?.length || 0} features
                  </td>

                  <td className="px-4 py-3.5">
                    <button
                      onClick={() => handleToggleActive(plan)}
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                        plan.active
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {plan.active ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                      {plan.active ? 'Active' : 'Inactive'}
                    </button>
                  </td>

                  <td className="px-5 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleOpenEdit(plan)}
                        className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-900 rounded"
                        title="Edit Plan"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(plan._id, plan.name)}
                        className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-900 rounded"
                        title="Delete Plan"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-5 py-12 text-center font-mono text-slate-500">
                  No plans configured. Click "+ Add New Plan" to create your first tier.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Create / Edit Plan Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-xl glass-panel rounded-3xl border border-cyan-500/40 p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-black uppercase text-white font-mono flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                {editingPlan ? `Edit Plan: ${editingPlan.name}` : 'Create New Pricing Plan'}
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-900 border border-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                    Plan Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="e.g. Starter Plan, Growth Plan"
                    className="w-full px-3.5 py-2 text-xs bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                    Price in INR (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={formState.price}
                    onChange={(e) => setFormState({ ...formState, price: Number(e.target.value) })}
                    placeholder="59"
                    className="w-full px-3.5 py-2 text-xs bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-400 font-mono font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                  Plan Description
                </label>
                <input
                  type="text"
                  value={formState.description}
                  onChange={(e) => setFormState({ ...formState, description: e.target.value })}
                  placeholder="Essential access to foundational business PDFs..."
                  className="w-full px-3.5 py-2 text-xs bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                  Features Included (1 per line)
                </label>
                <textarea
                  rows={4}
                  value={formState.features}
                  onChange={(e) => setFormState({ ...formState, features: e.target.value })}
                  placeholder="Access to Essential Business PDFs&#10;Downloadable Financial Models&#10;Lifetime Revisions"
                  className="w-full px-3.5 py-2 text-xs bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-400 font-mono text-[11px]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                    Badge Label (Optional)
                  </label>
                  <input
                    type="text"
                    value={formState.badge}
                    onChange={(e) => setFormState({ ...formState, badge: e.target.value })}
                    placeholder="e.g. Most Popular, Best Value"
                    className="w-full px-3.5 py-2 text-xs bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={formState.order}
                    onChange={(e) => setFormState({ ...formState, order: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 text-xs bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-400 font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-mono text-slate-300">
                  <input
                    type="checkbox"
                    checked={formState.popular}
                    onChange={(e) => setFormState({ ...formState, popular: e.target.checked })}
                    className="w-4 h-4 rounded text-cyan-500 focus:ring-0 bg-slate-900 border-slate-800"
                  />
                  <span>Mark as Most Popular Tier</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-mono text-slate-300">
                  <input
                    type="checkbox"
                    checked={formState.active}
                    onChange={(e) => setFormState({ ...formState, active: e.target.checked })}
                    className="w-4 h-4 rounded text-cyan-500 focus:ring-0 bg-slate-900 border-slate-800"
                  />
                  <span>Active on Public Checkout</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-mono text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <Button type="submit" variant="chrome" size="sm" showArrow>
                  <Save className="w-3.5 h-3.5 mr-1" />
                  {editingPlan ? 'Update Plan' : 'Save New Plan'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
