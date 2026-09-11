'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Box, Shield, Zap } from 'lucide-react';

export const DifferentSection: React.FC = () => {
  const diffItems = [
    {
      title: 'Institutional Financial Blueprints',
      desc: 'Say goodbye to unverified opinions. FQore provides audited, research-backed financial models and corporate case studies.',
      icon: Box,
    },
    {
      title: 'Downloadable Dynamic Models',
      desc: 'Get full Excel workbooks with uninhibited formulas, sensitivity tables, and debt sweep mechanics.',
      icon: Zap,
    },
    {
      title: 'Zero Subscription Traps',
      desc: 'Pay once for your chosen tier—no recurring monthly credit card drains or hidden locked chapters.',
      icon: Shield,
    },
  ];

  return (
    <section className="py-28 bg-black border-b border-cyan-500/20 relative overflow-hidden">
      {/* Circuit Trace Line Background (matching frame_060.jpg) */}
      <div className="absolute inset-0 cyber-grid opacity-50 pointer-events-none" />

      {/* SVG Neon Circuit Line connecting nodes with scroll-triggered drawing */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
        <motion.path
          d="M 80 220 L 320 220 L 320 110 L 640 110 L 640 260 L 960 260 L 1320 260"
          stroke="#22d3ee"
          strokeWidth="1.5"
          fill="none"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1.8, ease: 'easeInOut' }}
        />
        <circle cx="320" cy="110" r="4" fill="#22d3ee" className="animate-pulse" />
        <circle cx="640" cy="260" r="4" fill="#ffffff" className="animate-pulse" />
        <circle cx="960" cy="260" r="4" fill="#22d3ee" className="animate-pulse" />
      </svg>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Scroll InView Animation */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white">
            HOW WE’RE <br />
            <span className="text-slate-400">DIFFERENT</span>
          </h2>
        </motion.div>

        {/* Feature Cards Grid with Staggered Scroll Animations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {diffItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{
                  duration: 0.7,
                  delay: idx * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -8, transition: { duration: 0.25 } }}
                className="rounded-2xl p-8 bg-[#050813]/85 border border-slate-800/80 hover:border-cyan-500/50 transition-all duration-300 backdrop-blur-md flex flex-col justify-between group shadow-xl hover:shadow-[0_0_30px_rgba(34,211,238,0.2)]"
              >
                {/* Wireframe Rotating / Glowing Icon (matching frame_080.jpg) */}
                <div className="w-14 h-14 rounded-full border border-cyan-500/40 bg-cyan-950/30 flex items-center justify-center text-cyan-300 mb-6 shadow-[0_0_20px_rgba(34,211,238,0.25)] group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Brushed Metallic Button (matching frame_080.jpg "Learn More ↗") */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.6 }}
        >
          <Link href="/about">
            <button className="btn-chrome px-7 py-3 rounded-lg text-xs font-mono uppercase tracking-wider flex items-center gap-2 hover:scale-105 transition-transform">
              <span>Learn More</span>
              <ArrowUpRight className="w-4 h-4 text-slate-900" />
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
