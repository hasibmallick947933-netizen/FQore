'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface TeamTrack {
  id: string;
  title: string;
  desc: string;
  person: string;
  role: string;
  visualImage: string;
}

export const MeetPeopleSection: React.FC = () => {
  const [activeId, setActiveId] = useState<string>('track_1');

  const tracks: TeamTrack[] = [
    {
      id: 'track_1',
      title: 'Business Model & Scaling Architecture',
      desc: 'We deconstruct high-margin revenue engines, unit economics, SaaS magic numbers, and operational moats, ensuring clarity at every layer.',
      person: 'Omar Aminoff',
      role: 'Head of Business Research',
      visualImage: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&auto=format&fit=crop&q=80',
    },
    {
      id: 'track_2',
      title: 'Corporate Valuation & Institutional DCF',
      desc: 'Our team designs institutional 3-statement models, sensitivity matrices, and WACC frameworks accessible to all ambitious analysts.',
      person: 'Tatiana Dias',
      role: 'Valuation & DCF Lead',
      visualImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
    },
    {
      id: 'track_3',
      title: 'Macro Liquidity & Derivatives Analysis',
      desc: 'We analyze central bank sovereign balance sheets, yield curve inversions, and order-book auction dynamics to decipher institutional flow.',
      person: 'Phillip Mango',
      role: 'Macro Strategist',
      visualImage: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=600&auto=format&fit=crop&q=80',
    },
    {
      id: 'track_4',
      title: 'Global Learner Community & Ecosystem',
      desc: 'We connect ambitious analysts, founders, and learners worldwide, fostering relentless inquiry and shared market intelligence.',
      person: 'Allison Bator',
      role: 'Director of Education',
      visualImage: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=600&auto=format&fit=crop&q=80',
    },
  ];

  return (
    <section className="py-28 bg-black border-b border-cyan-500/20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Scroll InView Animation */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white mb-3">
            MEET PEOPLE BEHIND
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-light">
            We’re financial analysts, macro researchers, and practitioners committed to making education actionable for all.
          </p>
        </motion.div>

        {/* 4 Interactive Rows with Staggered Scroll InView */}
        <div className="space-y-3">
          {tracks.map((track, idx) => {
            const isActive = track.id === activeId;

            return (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.25 }}
                transition={{
                  duration: 0.65,
                  delay: idx * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onMouseEnter={() => setActiveId(track.id)}
                onClick={() => setActiveId(track.id)}
                className={`relative rounded-xl transition-all duration-300 cursor-pointer overflow-hidden border ${
                  isActive
                    ? 'border-cyan-500/50 bg-gradient-to-r from-cyan-950/40 via-blue-950/50 to-[#060c20] shadow-[0_0_35px_rgba(34,211,238,0.2)]'
                    : 'border-slate-900 bg-[#040711]/60 hover:bg-[#070d1e] hover:border-slate-800'
                }`}
              >
                <div className="p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  {/* Left Title */}
                  <div className="lg:w-1/3">
                    <h3
                      className={`text-xl sm:text-2xl font-black tracking-tight transition-colors ${
                        isActive ? 'text-white' : 'text-slate-400'
                      }`}
                    >
                      {track.title}
                    </h3>
                  </div>

                  {/* Middle Description */}
                  <div className="lg:w-2/5">
                    <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                      {track.desc}
                    </p>
                  </div>

                  {/* Right Dynamic 3D Graphic & Person (matching frame_120.jpg) */}
                  <div className="lg:w-1/4 flex items-center justify-between lg:justify-end gap-5">
                    {/* Visual Preview on active row */}
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="hidden sm:block w-20 h-16 rounded-lg overflow-hidden border border-cyan-500/40 shadow-[0_0_15px_rgba(34,211,238,0.3)] shrink-0"
                      >
                        <img
                          src={track.visualImage}
                          alt={track.title}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                    )}

                    <div className="text-right">
                      <span className="text-sm font-bold text-white block">
                        {track.person}
                      </span>
                      <span className="text-[11px] font-mono text-cyan-400 font-light">
                        {track.role}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
