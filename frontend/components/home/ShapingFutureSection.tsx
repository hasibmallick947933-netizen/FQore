'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Link as LinkIcon, Box } from 'lucide-react';

export const ShapingFutureSection: React.FC = () => {
  return (
    <section className="py-28 bg-black border-b border-cyan-500/20 relative overflow-hidden text-center">
      <div className="max-w-5xl mx-auto px-4 relative">
        {/* Animated Capsule with Scroll InView */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl p-10 sm:p-16 border border-cyan-500/35 bg-gradient-to-b from-[#08152c]/90 via-[#040a17]/80 to-black overflow-hidden shadow-[0_0_60px_rgba(34,211,238,0.2)]"
        >
          {/* Subtle Ambient Glow Orb */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/15 blur-[120px] rounded-full pointer-events-none" />

          {/* Glowing Connecting Line & Floating Icons with Animated Light Beam */}
          <div className="flex items-center justify-between max-w-md mx-auto mb-8 relative z-10">
            <div className="w-10 h-10 rounded-full bg-cyan-950/80 border border-cyan-500/50 flex items-center justify-center text-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.4)]">
              <LinkIcon className="w-4 h-4" />
            </div>
            <div className="flex-1 h-[1px] bg-gradient-to-r from-cyan-500/60 via-cyan-400 to-cyan-500/60 mx-4 relative overflow-hidden">
              <motion.div
                animate={{ x: [-100, 300] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                className="w-12 h-full bg-white shadow-[0_0_12px_#ffffff]"
              />
            </div>
            <div className="w-10 h-10 rounded-full bg-cyan-950/80 border border-cyan-500/50 flex items-center justify-center text-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.4)]">
              <Box className="w-4 h-4" />
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mb-4 relative z-10">
            JOIN US IN SHAPING THE FUTURE
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mb-8 font-light leading-relaxed relative z-10">
            Whether you're a student, educator, analyst, or institution—there's a place for you in the FQore ecosystem. Let's build a financial intelligence economy that belongs to everyone.
          </p>

          <div className="relative z-10 flex flex-wrap items-center justify-center gap-4">
            <Link href="/pricing">
              <button className="btn-chrome px-8 py-3.5 rounded-lg text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 shadow-[0_0_25px_rgba(255,255,255,0.25)] hover:scale-105 transition-transform">
                <span>Explore Plans (from ₹59)</span>
                <ArrowUpRight className="w-4 h-4 text-slate-900" />
              </button>
            </Link>
            <Link href="/contact">
              <button className="px-7 py-3.5 rounded-lg text-xs font-semibold uppercase tracking-wider text-slate-200 bg-black/60 border border-slate-700 hover:border-cyan-400 transition-all hover:scale-105">
                <span>Partner with Us</span>
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
