'use client';

import React from 'react';

export const BrandMarquee: React.FC = () => {
  const brands = [
    'Google',
    'Microsoft',
    'Amazon',
    'Deloitte.',
    'Goldman Sachs',
    'McKinsey & Co',
    'IBM',
    'Airbnb',
    'J.P. Morgan',
    'Morgan Stanley',
  ];

  return (
    <section className="py-12 border-b border-cyan-500/15 bg-[#030611] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-6">
        <span className="text-[11px] font-mono uppercase tracking-widest text-slate-500">
          Trusted by ambitious analysts, founders, and students from top institutions
        </span>
      </div>

      <div className="flex w-max animate-marquee space-x-12 opacity-60 hover:opacity-100 transition-opacity">
        {[...brands, ...brands].map((brand, idx) => (
          <div
            key={idx}
            className="text-lg sm:text-xl font-bold font-sans text-slate-400 tracking-wider hover:text-cyan-300 transition-colors cursor-default whitespace-nowrap"
          >
            {brand}
          </div>
        ))}
      </div>
    </section>
  );
};
