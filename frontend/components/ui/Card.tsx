'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  stepNumber?: string; // e.g. "01.", "02." matching video
  className?: string;
  onClick?: () => void;
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  stepNumber,
  className = '',
  onClick,
  hoverEffect = true,
}) => {
  return (
    <motion.div
      whileHover={hoverEffect ? { y: -4, borderColor: 'rgba(34, 211, 238, 0.45)' } : undefined}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className={`glass-panel rounded-2xl p-6 sm:p-7 relative overflow-hidden flex flex-col justify-between ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
    >
      {/* Subtle top card glow line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />

      {stepNumber && (
        <div className="text-xl sm:text-2xl font-mono font-bold text-cyan-400 tracking-wider mb-4 opacity-90">
          {stepNumber}
        </div>
      )}

      {children}
    </motion.div>
  );
};
