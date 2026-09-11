'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { GlowingGrid } from '@/components/ui/GlowingGrid';
import { Button } from '@/components/ui/Button';
import {
  Sparkles,
  TrendingUp,
  FileText,
  FileSpreadsheet,
  Award,
  Play,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Zap,
  Layers,
  ArrowRight,
  X,
  Star,
  Users,
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  return (
    <GlowingGrid className="pt-12 pb-16 md:pt-20 md:pb-28 border-b border-cyan-500/15 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline, Description & CTAs (Learnova Layout) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 text-left space-y-6"
          >
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-950/40 backdrop-blur-md text-xs font-mono text-indigo-300 shadow-[0_0_20px_rgba(99,102,241,0.25)]">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span className="font-semibold tracking-wide">#1 Platform for Business & Financial Intelligence</span>
            </div>

            {/* Main Headline with dual-color gradient */}
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black uppercase tracking-tight text-white leading-[1.08]">
              Master Business<span className="text-cyan-400">.</span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-cyan-300 to-white">
                Advance Your Edge<span className="text-indigo-400">.</span>
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
              Access 100+ verified business revenue engines, institutional equity research, stock market mechanics, and downloadable Excel & PDF blueprints. Study at your own pace, anytime, anywhere.
            </p>

            {/* CTA Buttons (Learnova Style) */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link href="/pricing">
                <button className="btn-gradient-primary px-7 py-3.5 rounded-xl text-sm font-bold inline-flex items-center gap-2 shadow-[0_0_25px_rgba(99,102,241,0.45)]">
                  <span>Explore Plans</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <button
                onClick={() => setVideoModalOpen(true)}
                className="px-6 py-3.5 rounded-xl text-sm font-semibold text-slate-200 bg-slate-900/80 hover:bg-slate-850 border border-slate-700/80 hover:border-cyan-400/50 transition-all inline-flex items-center gap-2.5 shadow-lg group"
              >
                <div className="w-7 h-7 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="w-3.5 h-3.5 fill-cyan-400" />
                </div>
                <span>How It Works</span>
              </button>
            </div>

            {/* Social Proof Row (Learnova Avatars & Stars) */}
            <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center gap-4">
              <div className="flex -space-x-2.5 overflow-hidden">
                <img
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-[#040711] object-cover"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                  alt="Learner"
                />
                <img
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-[#040711] object-cover"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                  alt="Learner"
                />
                <img
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-[#040711] object-cover"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
                  alt="Learner"
                />
                <img
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-[#040711] object-cover"
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80"
                  alt="Learner"
                />
              </div>
              <div>
                <div className="flex items-center gap-1 text-amber-400 text-xs">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span className="text-white font-bold font-mono ml-1">4.9 / 5.0</span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Trusted by <span className="text-slate-200 font-semibold">10,000+</span> ambitious analysts & founders
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Hero Visual with Animated Floating Glass Badges */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            {/* Ambient Background Glow behind hero card */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-cyan-500/20 via-indigo-500/20 to-purple-500/20 rounded-3xl blur-2xl pointer-events-none" />

            {/* Central Terminal / Intelligence Workstation */}
            <div className="relative rounded-2xl border border-cyan-500/30 bg-[#080d1c]/90 backdrop-blur-xl p-5 shadow-[0_0_50px_rgba(34,211,238,0.15)] overflow-hidden">
              {/* Terminal Window Bar */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="text-[10px] font-mono text-slate-400 ml-2">FQore Financial Intelligence Terminal</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                  LIVE STREAM
                </span>
              </div>

              {/* Main Visual: Workstation Graphic & Mock Chart */}
              <div className="relative rounded-xl overflow-hidden bg-slate-950/80 border border-slate-800/80 p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase">Featured Valuation</span>
                    <h4 className="text-sm font-bold text-white">SaaS Rule of 40 & DCF Model</h4>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-500/30">
                    +38.4% Alpha
                  </span>
                </div>

                {/* Simulated Chart Bars */}
                <div className="h-32 flex items-end gap-2 pt-4 px-2">
                  <div className="flex-1 bg-slate-800/60 rounded-t h-[35%] transition-all hover:bg-cyan-500/40" />
                  <div className="flex-1 bg-slate-800/60 rounded-t h-[55%] transition-all hover:bg-cyan-500/40" />
                  <div className="flex-1 bg-indigo-500/40 rounded-t h-[45%] transition-all hover:bg-cyan-500/50" />
                  <div className="flex-1 bg-indigo-500/60 rounded-t h-[70%] transition-all hover:bg-cyan-500/60" />
                  <div className="flex-1 bg-cyan-500/70 rounded-t h-[60%] transition-all hover:bg-cyan-400" />
                  <div className="flex-1 bg-cyan-400 rounded-t h-[85%] shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
                  <div className="flex-1 bg-cyan-300 rounded-t h-[95%] shadow-[0_0_20px_rgba(34,211,238,0.7)]" />
                </div>

                <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 pt-2 border-t border-slate-900 mt-2">
                  <span>Q1 Forecast</span>
                  <span>Q2 Execution</span>
                  <span>Q3 Scaling</span>
                  <span className="text-cyan-400 font-bold">Terminal Value</span>
                </div>
              </div>

              {/* Bottom Mini Metrics inside terminal */}
              <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-slate-800/80 text-center">
                <div className="p-2 rounded-lg bg-slate-900/60">
                  <div className="text-[10px] text-slate-400 font-mono">PDF Guides</div>
                  <div className="text-xs font-bold text-white font-mono">100+ Docs</div>
                </div>
                <div className="p-2 rounded-lg bg-slate-900/60">
                  <div className="text-[10px] text-slate-400 font-mono">Excel Models</div>
                  <div className="text-xs font-bold text-cyan-400 font-mono">50+ .XLSX</div>
                </div>
                <div className="p-2 rounded-lg bg-slate-900/60">
                  <div className="text-[10px] text-slate-400 font-mono">Pricing</div>
                  <div className="text-xs font-bold text-emerald-400 font-mono">From ₹59</div>
                </div>
              </div>
            </div>

            {/* Floating Glass Badge 1: Expert Instructors (Top-Right) */}
            <div className="absolute -top-6 -right-4 sm:-right-6 glass-floating-card px-3.5 py-2.5 rounded-2xl flex items-center gap-3 animate-float pointer-events-none z-20">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                <Award className="w-5 h-5" />
              </div>
              <div className="text-left">
                <span className="text-xs font-bold text-white block leading-none">Expert Analysts</span>
                <span className="text-[10px] text-slate-400 font-mono">Wall Street & Equity Pros</span>
              </div>
            </div>

            {/* Floating Glass Badge 2: Flexible Learning (Middle-Right) */}
            <div className="absolute top-1/2 -right-3 sm:-right-8 -translate-y-1/2 glass-floating-card px-3.5 py-2.5 rounded-2xl flex items-center gap-3 animate-float-delayed pointer-events-none z-20">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                <Clock className="w-5 h-5" />
              </div>
              <div className="text-left">
                <span className="text-xs font-bold text-white block leading-none">Flexible Learning</span>
                <span className="text-[10px] text-slate-400 font-mono">Study on your schedule</span>
              </div>
            </div>

            {/* Floating Glass Badge 3: Downloadable PDFs & Models (Bottom-Right) */}
            <div className="absolute -bottom-6 -right-2 sm:-right-4 glass-floating-card px-3.5 py-2.5 rounded-2xl flex items-center gap-3 animate-float-reverse pointer-events-none z-20">
              <div className="w-9 h-9 rounded-xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.3)]">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <div className="text-left">
                <span className="text-xs font-bold text-white block leading-none">Excel & PDF Blueprints</span>
                <span className="text-[10px] text-slate-400 font-mono">Instant download offline</span>
              </div>
            </div>

            {/* Floating Glass Badge 4: Lifetime Access (Bottom-Left) */}
            <div className="absolute -bottom-4 -left-3 sm:-left-6 glass-floating-card px-3.5 py-2.5 rounded-2xl flex items-center gap-3 animate-float pointer-events-none z-20">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-left">
                <span className="text-xs font-bold text-white block leading-none">Lifetime Access</span>
                <span className="text-[10px] text-slate-400 font-mono">Continuous revisions</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Video Modal ("How It Works") */}
      <AnimatePresence>
        {videoModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-3xl rounded-2xl bg-[#090e1d] border border-cyan-500/30 p-6 shadow-2xl"
            >
              <button
                onClick={() => setVideoModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg bg-slate-900 border border-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                How FQore Intelligence Works
              </h3>
              <p className="text-xs text-slate-400 mb-4">
                Watch our 90-second orientation on accessing verified business models, stock market mechanics, and downloadable Excel DCF models.
              </p>
              <div className="aspect-video w-full rounded-xl overflow-hidden bg-black flex items-center justify-center border border-slate-800">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=0"
                  title="FQore Platform Walkthrough"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </GlowingGrid>
  );
};
