'use client';

import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Shield, Sparkles, CheckCircle2, Target, Globe, BookOpen, Layers } from 'lucide-react';

export default function AboutPage() {
  const principles = [
    {
      num: '01.',
      title: 'Decentralized & Open Knowledge',
      description:
        'Eliminating predatory paywalls and closed credentialing. Financial intelligence should be transparent, verifiable, and freely accessible to operators worldwide.',
    },
    {
      num: '02.',
      title: 'Forensic Rigor Over Marketing Hype',
      description:
        'Every valuation model, company deep-dive, and price action case study is grounded in verifiable SEC filings, audited balance sheets, and empirical order flow data.',
    },
    {
      num: '03.',
      title: 'Actionable Artifacts',
      description:
        'We believe in providing the actual raw tooling—dynamic three-statement financial models, Excel DCFs, and sensitivity tables—not just high-level theoretical prose.',
    },
    {
      num: '04.',
      title: 'Dynamic Continuous Evolution',
      description:
        'Powered by a modern database-driven architecture enabling ongoing expansion into new macro regimes, geopolitical cycles, and technology paradigms.',
    },
  ];

  return (
    <div className="py-16 sm:py-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header matching video "OUR VISION FOR THE FUTURE" */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono uppercase text-cyan-300 mb-4 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            Strategic Mandate
          </div>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white mb-6">
            Our Vision For The Future
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light">
            EduX Intel was founded to bridge the vast information asymmetry between institutional Wall Street trading desks and independent analysts, entrepreneurs, and students.
          </p>
        </div>

        {/* 4 Core Pillars with 01., 02. styling matching video */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {principles.map((item) => (
            <Card key={item.num} stepNumber={item.num} className="p-8">
              <div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Vision banner */}
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-cyan-500/30 text-center max-w-4xl mx-auto relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-cyan-500/10 blur-[80px] pointer-events-none" />
          <h2 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-white mb-4">
            Discover Our Educational Movement
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto mb-8">
            Access institutional models, company scorecards, and macroeconomic frameworks built with precision.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/business">
              <Button variant="chrome" size="md" showArrow>
                Explore Business Tracks
              </Button>
            </Link>
            <Link href="/resources">
              <Button variant="outline" size="md" showArrow>
                Download Financial Models
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
