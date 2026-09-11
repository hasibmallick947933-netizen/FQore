'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { GlowingGrid } from '@/components/ui/GlowingGrid';
import { Button } from '@/components/ui/Button';
import { TrendingUp, Briefcase, Sparkles, Database } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <GlowingGrid className="pt-20 pb-24 md:pt-28 md:pb-32 border-b border-cyan-500/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Top Floating Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/20 backdrop-blur-md text-xs font-mono text-cyan-300 mb-8 shadow-[0_0_15px_rgba(34,211,238,0.2)]"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>INSTITUTIONAL BUSINESS & MARKET INTELLIGENCE</span>
        </motion.div>

        {/* Hero Title Matching Video Large Typography */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white leading-tight max-w-5xl mx-auto"
        >
          Learn Business<span className="text-cyan-400">.</span>
          <br className="hidden sm:inline" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-100 to-cyan-400">
            Understand Markets
          </span>
          <span className="text-blue-500">.</span>
          <br />
          <span className="text-slate-300 font-extrabold tracking-widest text-3xl sm:text-5xl lg:text-6xl">
            Think Smarter<span className="text-cyan-400">.</span>
          </span>
        </motion.h1>

        {/* Supporting Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed"
        >
          A dynamic, database-driven educational repository for entrepreneurs, investors, and analysts.
          Explore verified revenue models, equity valuations, price action strategies, and institutional templates.
        </motion.p>

        {/* Video Styled Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Link href="/business">
            <Button variant="chrome" size="lg" showArrow>
              Explore Business
            </Button>
          </Link>
          <Link href="/stock-market">
            <Button variant="outline" size="lg" showArrow>
              Learn Stock Market
            </Button>
          </Link>
        </motion.div>

        {/* Metric Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto pt-10 border-t border-slate-900"
        >
          <div className="p-4 rounded-xl border border-slate-800/80 bg-slate-950/40">
            <div className="text-xl sm:text-2xl font-mono font-bold text-cyan-400">100%</div>
            <div className="text-xs text-slate-400 uppercase tracking-wider mt-1">Free Education</div>
          </div>
          <div className="p-4 rounded-xl border border-slate-800/80 bg-slate-950/40">
            <div className="text-xl sm:text-2xl font-mono font-bold text-white">8+</div>
            <div className="text-xs text-slate-400 uppercase tracking-wider mt-1">Core Disciplines</div>
          </div>
          <div className="p-4 rounded-xl border border-slate-800/80 bg-slate-950/40">
            <div className="text-xl sm:text-2xl font-mono font-bold text-cyan-400">Excel / PDF</div>
            <div className="text-xs text-slate-400 uppercase tracking-wider mt-1">Direct Downloads</div>
          </div>
          <div className="p-4 rounded-xl border border-slate-800/80 bg-slate-950/40">
            <div className="text-xl sm:text-2xl font-mono font-bold text-white">Zero Code</div>
            <div className="text-xs text-slate-400 uppercase tracking-wider mt-1">Dynamic CMS</div>
          </div>
        </motion.div>
      </div>
    </GlowingGrid>
  );
};
