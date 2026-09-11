'use client';

import React from 'react';
import Link from 'next/link';
import { Briefcase, Code, CheckCircle, BookOpen, ArrowUpRight } from 'lucide-react';

export const CommunitySection: React.FC = () => {
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
    <section className="py-28 bg-black border-b border-cyan-500/20 relative overflow-hidden text-center">
      {/* Perspective Concentric Arc Rings (matching frame_140.jpg) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[850px] h-[850px] rounded-full border border-cyan-500/15 -translate-y-1/4" />
        <div className="w-[1100px] h-[1100px] rounded-full border border-cyan-500/20 -translate-y-1/4" />
        <div className="w-[1400px] h-[1400px] rounded-full border border-cyan-500/10 -translate-y-1/4" />
      </div>

      {/* Floating Glowing Nodes along the Arc */}
      <div className="absolute top-1/4 left-1/5 w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_15px_#22d3ee] animate-pulse pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_15px_#ffffff] animate-pulse pointer-events-none" />
      <div className="absolute top-1/6 right-1/5 w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_10px_#22d3ee] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* 4 Floating Glass Cards (matching frame_140.jpg arrangement) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {communityPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="glass-panel p-6 rounded-2xl text-left border border-cyan-500/30 hover:border-cyan-400 transition-all duration-300 shadow-xl hover:-translate-y-2 group"
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
              </div>
            );
          })}
        </div>

        {/* Section Heading & Subtitle (matching frame_140.jpg) */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white mb-4">
            OUR COMMUNITY
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-light max-w-xl mx-auto mb-8 leading-relaxed">
            At FQore, we proudly serve a diverse and vibrant global ecosystem, connecting ambitious individuals and practitioners from all corners of the world.
          </p>

          <Link href="/register">
            <button className="btn-chrome px-8 py-3.5 rounded-lg text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 shadow-[0_0_25px_rgba(255,255,255,0.2)] hover:scale-105 transition-transform">
              <span>Join Our Community</span>
              <ArrowUpRight className="w-4 h-4 text-slate-900" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};
