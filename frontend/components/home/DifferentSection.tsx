'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Box, Shield, Zap, RefreshCw } from 'lucide-react';

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
    <section className="py-24 bg-black border-b border-cyan-500/20 relative overflow-hidden">
      {/* Circuit Trace Line Background (matching frame_060.jpg) */}
      <div className="absolute inset-0 cyber-grid opacity-50 pointer-events-none" />

      {/* SVG Neon Circuit Line connecting nodes */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
        <path
          d="M 100 200 L 300 200 L 300 120 L 600 120 L 600 250 L 900 250 L 1200 250"
          stroke="#22d3ee"
          strokeWidth="1.5"
          fill="none"
        />
        <circle cx="300" cy="120" r="4" fill="#22d3ee" className="animate-pulse" />
        <circle cx="600" cy="250" r="4" fill="#ffffff" className="animate-pulse" />
        <circle cx="900" cy="250" r="4" fill="#22d3ee" className="animate-pulse" />
      </svg>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header (matching frame_080.jpg) */}
        <div className="mb-16">
          <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white">
            HOW WE’RE <br />
            <span className="text-slate-400">DIFFERENT</span>
          </h2>
        </div>

        {/* Feature Cards Grid (matching frame_080.jpg) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {diffItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="rounded-2xl p-8 bg-[#050813]/80 border border-slate-800/80 hover:border-cyan-500/40 transition-all duration-300 backdrop-blur-md flex flex-col justify-between group"
              >
                {/* Wireframe Rotating / Glowing Icon (matching frame_080.jpg) */}
                <div className="w-14 h-14 rounded-full border border-cyan-500/40 bg-cyan-950/20 flex items-center justify-center text-cyan-300 mb-6 shadow-[0_0_20px_rgba(34,211,238,0.25)] group-hover:scale-110 transition-transform">
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
              </div>
            );
          })}
        </div>

        {/* Bottom Callout & Metallic "Learn More ↗" Button (matching frame_080.jpg) */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <p className="text-xs sm:text-sm text-slate-400 max-w-lg font-light leading-relaxed">
            Education is often restricted by expensive paywalls and complex credentialing. FQore aims to change this by creating high-leverage, accessible business and market intelligence for everyone.
          </p>

          <Link href="/about">
            <button className="btn-chrome px-7 py-3 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-105 transition-transform shrink-0">
              <span>Learn More</span>
              <ArrowUpRight className="w-4 h-4 text-slate-900" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};
