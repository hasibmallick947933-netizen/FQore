'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Sparkles, ChevronDown } from 'lucide-react';
import { ChromeCrystalCanvas } from './ChromeCrystalCanvas';

export const HeroVideoSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll-driven parallax progress for the Hero Section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Parallax transformations triggered by scrolling
  const titleScale = useTransform(scrollYProgress, [0, 0.8], [1, 1.2]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0.15]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -90]);

  const subtitleY = useTransform(scrollYProgress, [0, 0.6], [0, -50]);
  const subtitleOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const buttonsY = useTransform(scrollYProgress, [0, 0.7], [0, -40]);
  const buttonsOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <div
      ref={containerRef}
      className="relative min-h-[96vh] flex flex-col items-center justify-center overflow-hidden bg-black text-white px-4 sm:px-6 lg:px-8 border-b border-cyan-500/20 select-none"
    >
      {/* Interactive WebGL 3D Chrome Crystal Wave (Animates while scrolling & mouse hover) */}
      <ChromeCrystalCanvas />

      {/* Cyber Grid & Ambient Radial Vignettes */}
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.12)_0%,rgba(0,0,0,0.7)_60%,#000000_100%)]" />
      <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-black to-transparent pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-black to-transparent pointer-events-none" />

      {/* Subtitle Pill at the Top with Scroll Parallax */}
      <motion.div
        style={{ y: subtitleY, opacity: subtitleOpacity }}
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-2xl text-center mb-8 sm:mb-12 mt-6 pointer-events-auto"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/40 bg-black/70 backdrop-blur-md text-[11px] sm:text-xs font-mono text-cyan-300 shadow-[0_0_25px_rgba(34,211,238,0.35)] mb-4">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>INSTITUTIONAL BUSINESS & MARKET INTELLIGENCE</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light tracking-wide drop-shadow-md">
          Discover the future of education with FQore. Dive into verified business models, real-world stock market mechanics, and hedge fund-grade financial blueprints.
        </p>
      </motion.div>

      {/* Giant Architectural Background Typography with Scroll Scale & Parallax */}
      <div className="relative z-10 w-full text-center pointer-events-none my-auto">
        <motion.h1
          style={{ scale: titleScale, opacity: titleOpacity, y: titleY, letterSpacing: '-0.04em' }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl sm:text-8xl md:text-9xl lg:text-[11.5rem] font-black uppercase tracking-tight text-white leading-none drop-shadow-[0_20px_50px_rgba(0,0,0,0.95)]"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-slate-100 to-slate-400">
            GROW YOURSELF
          </span>
        </motion.h1>
      </div>

      {/* Bottom CTA Actions with Scroll Fade */}
      <motion.div
        style={{ y: buttonsY, opacity: buttonsOpacity }}
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex flex-wrap items-center justify-center gap-4 mb-14 mt-8 pointer-events-auto"
      >
        <Link href="/pricing">
          <button className="btn-chrome px-8 py-3.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center gap-2 shadow-[0_0_30px_rgba(255,255,255,0.25)] hover:scale-105 transition-transform cursor-pointer">
            <span>Explore Plans (from ₹59)</span>
            <ArrowUpRight className="w-4 h-4 text-slate-900" />
          </button>
        </Link>
        <Link href="/business">
          <button className="px-7 py-3.5 rounded-xl text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-200 bg-black/75 hover:bg-black/95 border border-cyan-500/40 hover:border-cyan-400 transition-all flex items-center gap-2 backdrop-blur-md shadow-[0_0_20px_rgba(34,211,238,0.2)] cursor-pointer hover:scale-105">
            <span>Explore Blueprints</span>
            <ArrowUpRight className="w-4 h-4 text-cyan-400" />
          </button>
        </Link>
      </motion.div>

      {/* Interactive Scroll Down Indicator */}
      <Link
        href="#how-it-works"
        className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 opacity-70 hover:opacity-100 transition-opacity cursor-pointer group"
      >
        <span className="text-[9px] font-mono uppercase tracking-widest text-cyan-300 group-hover:text-cyan-200">
          Scroll to Explore
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-8 rounded-full border border-cyan-500/40 flex items-start justify-center p-1 bg-black/40 backdrop-blur-sm"
        >
          <div className="w-1 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
        </motion.div>
      </Link>
    </div>
  );
};
