'use client';

import React from 'react';
import Link from 'next/link';
import { CheckCircle2, ArrowRight, Laptop, Smartphone, Tablet, Sparkles, FileText, FileSpreadsheet } from 'lucide-react';

export const DeviceShowcase: React.FC = () => {
  const perks = [
    'Universal access on laptop, tablet, and mobile devices',
    'Download offline PDFs and editable 3-statement Excel spreadsheets',
    'Zero monthly subscription traps — pay once per tier',
    'Continuous updates & post-earnings corporate autopsies',
  ];

  return (
    <section className="py-20 lg:py-28 border-b border-cyan-500/15 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Text & Benefits (Learnova Layout) */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-xs font-mono text-cyan-300">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>LEARN ANYTIME, ANYWHERE</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white leading-tight">
              Learn On <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-indigo-300 to-white">
                Your Own Terms.
              </span>
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-lg">
              Whether you're on your laptop conducting DCF sensitivity sweeps, on a tablet reviewing forensic checklists, or on your phone reading business model breakdowns on the go—FQore adapts seamlessly.
            </p>

            <div className="space-y-3.5 pt-2">
              {perks.map((perk, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center shrink-0 mt-0.5 shadow-[0_0_10px_rgba(34,211,238,0.3)]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs sm:text-sm text-slate-200">{perk}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Link href="/pricing">
                <button className="btn-gradient-primary px-7 py-3 rounded-xl text-xs sm:text-sm font-bold inline-flex items-center gap-2 shadow-[0_0_25px_rgba(99,102,241,0.4)]">
                  <span>Start Learning Today</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </div>

          {/* Right Column: Multi-Device Visual Mockup (Learnova Style) */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg rounded-3xl border border-cyan-500/30 bg-slate-950/80 backdrop-blur-xl p-6 shadow-[0_0_50px_rgba(34,211,238,0.15)]">
              {/* Device Icons Bar */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800 text-xs font-mono text-slate-400">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1.5 text-cyan-300">
                    <Laptop className="w-4 h-4" /> Desktop Web
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Tablet className="w-4 h-4" /> Tablet Reader
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Smartphone className="w-4 h-4" /> Mobile
                  </span>
                </div>
                <span className="text-[10px] text-emerald-400 font-bold">100% RESPONSIVE</span>
              </div>

              {/* Mock Screen Content */}
              <div className="space-y-3">
                {/* Mock Card 1 */}
                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-rose-500/20 text-rose-300 flex items-center justify-center">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">SaaS Unit Economics PDF</h4>
                      <span className="text-[10px] font-mono text-slate-400">Rule of 40 & CAC Payback</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-cyan-500/10 text-cyan-300 px-2.5 py-1 rounded border border-cyan-500/30">
                    75% Read
                  </span>
                </div>

                {/* Mock Card 2 */}
                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center">
                      <FileSpreadsheet className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">3-Statement DCF Model (.xlsx)</h4>
                      <span className="text-[10px] font-mono text-slate-400">Dynamic Sensitivity Tables</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-300 px-2.5 py-1 rounded border border-emerald-500/30">
                    Downloaded
                  </span>
                </div>

                {/* Mock Card 3 */}
                <div className="p-3.5 rounded-xl bg-gradient-to-r from-indigo-950/50 to-slate-900/90 border border-indigo-500/30 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-indigo-300 uppercase block mb-0.5">
                      Certification & Verified Progress
                    </span>
                    <h4 className="text-xs font-bold text-white">Institutional Financial Research</h4>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-300 flex items-center justify-center font-mono text-xs font-bold">
                    ✓
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
