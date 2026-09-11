'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export const VisionSection: React.FC = () => {
  const visionCards = [
    {
      number: '01.',
      title: 'Institutional Financial Intelligence',
      description:
        'Say goodbye to unverifiable advice and academic theory. FQore delivers hedge fund-grade financial models and audited business autopsies.',
      href: '/business',
    },
    {
      number: '02.',
      title: 'Real-World Market Microstructure',
      description:
        'Understand order books, dark pools, bid-ask spread liquidity, and clearing mechanics through institutional frameworks.',
      href: '/stock-market',
    },
    {
      number: '03.',
      title: 'Downloadable DCF Excel Models',
      description:
        'Raw dynamic workbooks with three-statement mechanics, sensitivity tables, and unlocked capital structure schedules.',
      href: '/investing',
    },
    {
      number: '04.',
      title: 'Forensic Ratio & Accounting Autopsies',
      description:
        'Step-by-step forensic checklists for spotting revenue inflation, channel stuffing, and inventory manipulation.',
      href: '/case-studies',
    },
  ];

  return (
    <section id="how-it-works" className="py-28 bg-black border-b border-cyan-500/20 relative overflow-hidden scroll-mt-20">
      {/* Cyber Wireframe Grid Background (matching frame_040.jpg) */}
      <div className="absolute inset-0 cyber-grid opacity-70 pointer-events-none" />

      {/* Animated Circuit Connectors (Draws on scroll) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
        <motion.path
          d="M 150 260 L 380 260 L 380 180 L 720 180 L 720 340 L 1050 340 L 1300 340"
          stroke="#22d3ee"
          strokeWidth="1.5"
          fill="none"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1.6, ease: 'easeInOut' }}
        />
      </svg>

      {/* Pulsing Cyan Node Dots at Grid Intersections */}
      <motion.div
        animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-20 left-1/4 w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_15px_#22d3ee] pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2.4, repeat: Infinity, delay: 0.5, ease: 'easeInOut' }}
        className="absolute top-1/2 right-1/3 w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_15px_#ffffff] pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.6, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 1.8, repeat: Infinity, delay: 1, ease: 'easeInOut' }}
        className="absolute bottom-20 left-1/3 w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_15px_#22d3ee] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Scroll InView Animation */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col lg:flex-row lg:items-start justify-between mb-16 gap-8"
        >
          <div className="lg:max-w-xl">
            <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-tight">
              OUR VISION FOR <br />
              <span className="text-slate-400">THE FUTURE</span>
            </h2>
          </div>
          <div className="lg:max-w-md lg:text-right pt-2">
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
              No more unverifiable certificates or outdated textbooks. All curriculum modules, financial models, and business autopsies on FQore are securely accessible and actionable.
            </p>
          </div>
        </motion.div>

        {/* Numbered Cards Grid with Staggered Scroll Animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {visionCards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.25 }}
              transition={{
                duration: 0.6,
                delay: idx * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -8, transition: { duration: 0.25 } }}
            >
              <Link
                href={card.href}
                className="group relative rounded-2xl bg-[#070b16]/90 border border-cyan-500/25 p-7 flex flex-col justify-between backdrop-blur-xl hover:border-cyan-400 hover:shadow-[0_0_35px_rgba(34,211,238,0.25)] transition-all duration-300 h-full block"
              >
                {/* Cyan Accent Top Line */}
                <div className="absolute top-0 inset-x-8 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-70 group-hover:opacity-100 transition-opacity" />

                <div>
                  <span className="text-2xl sm:text-3xl font-mono font-black text-white/90 block mb-4 group-hover:text-cyan-300 transition-colors">
                    {card.number}
                  </span>
                  <h3 className="text-base font-bold text-white mb-2 leading-snug group-hover:text-cyan-200 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-light">
                    {card.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-cyan-400">
                  <span>Explore Track</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
