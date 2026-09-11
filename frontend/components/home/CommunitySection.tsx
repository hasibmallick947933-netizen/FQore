'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Briefcase, Code, CheckCircle, BookOpen, ArrowUpRight } from 'lucide-react';

export const CommunitySection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll rotation on the perspective concentric arc rings
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const ringRotate1 = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const ringRotate2 = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const ringRotate3 = useTransform(scrollYProgress, [0, 1], [0, 110]);

  const communityPillars = [
    {
      title: 'Institutions : Ensure Client Trust',
      desc: 'Institutional-grade research and financial models that withstand peer review and board oversight.',
      icon: CheckCircle,
    },
    {
      title: 'Students : Master Your Edge',
      desc: 'Embrace your learning path with verified blueprints and models that empower you across industries.',
      icon: Briefcase,
    },
    {
      title: 'Developers : Innovate Modeling',
      desc: 'Build programmatic algorithmic screens, API wrappers, and quantitative pricing engines.',
      icon: Code,
    },
    {
      title: 'Educators : Make Knowledge Matter',
      desc: 'Deploy real-world case studies and Excel models into the classroom to teach practical finance.',
      icon: BookOpen,
    },
  ];

  return (
    <section
      ref={containerRef}
      className="py-28 bg-black border-b border-cyan-500/20 relative overflow-hidden text-center"
    >
      {/* Perspective Concentric Arc Rings with Scroll Rotation */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          style={{ rotate: ringRotate1 }}
          className="w-[850px] h-[850px] rounded-full border border-dashed border-cyan-500/20 -translate-y-1/4"
        />
        <motion.div
          style={{ rotate: ringRotate2 }}
          className="w-[1100px] h-[1100px] rounded-full border border-cyan-500/15 -translate-y-1/4"
        />
        <motion.div
          style={{ rotate: ringRotate3 }}
          className="w-[1400px] h-[1400px] rounded-full border border-dashed border-cyan-500/10 -translate-y-1/4"
        />
      </div>

      {/* Floating Glowing Nodes along the Arc */}
      <motion.div
        animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 left-1/5 w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_15px_#22d3ee] pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2.6, repeat: Infinity, delay: 0.7, ease: 'easeInOut' }}
        className="absolute top-1/3 right-1/4 w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_15px_#ffffff] pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 1.9, repeat: Infinity, delay: 1.2, ease: 'easeInOut' }}
        className="absolute top-1/6 right-1/5 w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_10px_#22d3ee] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* 4 Floating Glass Cards with Staggered Scroll-In & Hover Float */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {communityPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{
                  duration: 0.7,
                  delay: idx * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -8, transition: { duration: 0.25 } }}
                className="glass-panel p-6 rounded-2xl text-left border border-cyan-500/30 hover:border-cyan-400 transition-all duration-300 shadow-xl group"
              >
                <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-white mb-2 leading-snug group-hover:text-cyan-300 transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-xs text-slate-400 font-light leading-relaxed">
                  {pillar.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Section Headline with Scroll InView */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto space-y-6"
        >
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white leading-none">
            OUR COMMUNITY
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-light max-w-xl mx-auto leading-relaxed">
            Join thousands of analysts, founders, and investors using FQore to master market microstructure and unit economics.
          </p>

          <div className="pt-4 flex justify-center">
            <Link href="/pricing">
              <button className="btn-chrome px-8 py-3.5 rounded-lg text-xs font-mono uppercase tracking-wider flex items-center gap-2 shadow-[0_0_25px_rgba(255,255,255,0.2)] hover:scale-105 transition-transform">
                <span>Join Our Community</span>
                <ArrowUpRight className="w-4 h-4 text-slate-900" />
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
