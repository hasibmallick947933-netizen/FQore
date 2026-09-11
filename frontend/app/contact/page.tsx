'use client';

import React, { useState } from 'react';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { Mail, Send, CheckCircle2, MessageSquare, Building, Clock } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      await api.post('/public/contact', formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to deliver message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-16 sm:py-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono uppercase text-cyan-300 mb-4">
            <Mail className="w-3.5 h-3.5" />
            Advisory Desk
          </div>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mb-4">
            Contact & Institutional Inquiries
          </h1>
          <p className="text-sm text-slate-400">
            Reach out to our curriculum editorial board regarding corporate case study collaborations, technical questions, or curriculum suggestions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact form */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-8 sm:p-10 rounded-2xl border border-cyan-500/30">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4 border border-emerald-500/40">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Message Dispatched</h3>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto mb-6">
                    Our analytical team has received your communication and will reply within one business day.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs font-mono text-cyan-400 hover:underline"
                  >
                    Send another communication
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {errorMsg && (
                    <div className="p-3 rounded-lg bg-red-950/40 border border-red-500/40 text-xs text-red-300">
                      {errorMsg}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Johnathan Doe"
                        className="w-full px-3.5 py-2.5 text-xs bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                        Institutional Email
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@organization.com"
                        className="w-full px-3.5 py-2.5 text-xs bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                      Subject
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Valuation Model Clarification or Case Study Proposal"
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                      Message Body
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Detail your inquiry or feedback..."
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-400 leading-relaxed"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="chrome"
                    size="md"
                    loading={loading}
                    className="w-full"
                    showArrow
                  >
                    Submit Communication
                  </Button>
                </form>
              )}
            </div>
          </div>

          {/* Info cards */}
          <div className="lg:col-span-5 space-y-4">
            <div className="glass-panel p-6 rounded-2xl border border-slate-800">
              <div className="flex items-center gap-3 mb-2 text-cyan-400">
                <Building className="w-5 h-5" />
                <h3 className="text-sm font-bold text-white uppercase font-mono">Operations Base</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Global Distributed Research Team • Institutional Analytics & Education Division.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-slate-800">
              <div className="flex items-center gap-3 mb-2 text-cyan-400">
                <Clock className="w-5 h-5" />
                <h3 className="text-sm font-bold text-white uppercase font-mono">Response SLA</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                We review submissions daily. All educational and analytical queries are answered within 24–48 hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
