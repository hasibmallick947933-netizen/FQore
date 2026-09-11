'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const GlowingGrid: React.FC<{ children?: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Background Matrix Grid */}
      <div className="absolute inset-0 cyber-grid pointer-events-none opacity-40 z-0" />

      {/* Top Ambient Glow Orb */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="absolute top-1/3 -right-40 w-[600px] h-[400px] bg-blue-600/10 blur-[130px] rounded-full pointer-events-none z-0" />

      {/* Animated Intersection Light Nodes */}
      <motion.div
        animate={{
          opacity: [0.3, 0.9, 0.3],
          scale: [0.9, 1.2, 0.9],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[180px] left-[20%] w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_12px_#22d3ee] pointer-events-none z-0 hidden md:block"
      />
      <motion.div
        animate={{
          opacity: [0.2, 0.8, 0.2],
          scale: [1, 1.3, 1],
        }}
        transition={{ duration: 5, delay: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[240px] right-[25%] w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_12px_#22d3ee] pointer-events-none z-0 hidden md:block"
      />
      <motion.div
        animate={{
          opacity: [0.3, 1, 0.3],
          scale: [0.8, 1.2, 0.8],
        }}
        transition={{ duration: 6, delay: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[480px] left-[45%] w-2.5 h-2.5 rounded-full bg-blue-400 shadow-[0_0_15px_#38bdf8] pointer-events-none z-0 hidden md:block"
      />

      <div className="relative z-10">{children}</div>
    </div>
  );
};
