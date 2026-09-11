'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';

export const HeroVideoSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.9;
    }
  }, []);

  return (
    <div className="relative min-h-[92vh] flex flex-col items-center justify-center overflow-hidden bg-black text-white px-4 sm:px-6 lg:px-8 border-b border-cyan-500/20">
      {/* Background 3D Video Loop from the Original Video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        <video
          ref={videoRef}
          src="/hero-video.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-80 scale-105 filter brightness-110 contrast-110"
        />
        {/* Radial Ambient Backlight & Dark Vignettes */}
        <div className="absolute inset-0 bg-radial-gradient pointer-events-none bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.12)_0%,rgba(0,0,0,0.6)_60%,#000000_100%)]" />
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-black to-transparent pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-black to-transparent pointer-events-none" />
      </div>

      {/* Subtitle Pill at the Top (matching frame_020.jpg) */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-2xl text-center mb-8 sm:mb-12 mt-4"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/40 bg-black/60 backdrop-blur-md text-[11px] sm:text-xs font-mono text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.3)] mb-4">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>INSTITUTIONAL BUSINESS & MARKET INTELLIGENCE</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light tracking-wide drop-shadow-md">
          Discover the future of education with FQore. Dive into engaging business models, stock market mechanics, and institutional financial blueprints.
        </p>
      </motion.div>

      {/* Giant Architectural Background Typography (matching frame_020.jpg) */}
      <div className="relative z-10 w-full text-center select-none pointer-events-none my-auto">
        <motion.h1
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] font-black uppercase tracking-tight text-white leading-none drop-shadow-[0_15px_40px_rgba(0,0,0,0.9)]"
          style={{ letterSpacing: '-0.04em' }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-slate-100 to-slate-400">
            GROW YOURSELF
          </span>
        </motion.h1>
      </div>

      {/* Bottom CTA Actions matching video styling */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="relative z-10 flex flex-wrap items-center justify-center gap-4 mb-12 mt-8"
      >
        <Link href="/pricing">
          <button className="btn-chrome px-8 py-3.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center gap-2 shadow-[0_0_30px_rgba(255,255,255,0.25)] hover:scale-105 transition-transform">
            <span>Explore Plans (from ₹59)</span>
            <ArrowUpRight className="w-4 h-4 text-slate-900" />
          </button>
        </Link>
        <Link href="/business">
          <button className="px-7 py-3.5 rounded-xl text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-200 bg-black/70 hover:bg-black/90 border border-cyan-500/40 hover:border-cyan-400 transition-all flex items-center gap-2 backdrop-blur-md shadow-[0_0_20px_rgba(34,211,238,0.2)]">
            <span>Explore Blueprints</span>
            <ArrowUpRight className="w-4 h-4 text-cyan-400" />
          </button>
        </Link>
      </motion.div>

      {/* Bottom Animated Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 opacity-60">
        <span className="text-[9px] font-mono uppercase tracking-widest text-slate-400">Scroll Down</span>
        <div className="w-1 h-6 rounded-full bg-slate-800 overflow-hidden">
          <div className="w-full h-full bg-cyan-400 animate-pulse" />
        </div>
      </div>
    </div>
  );
};
