'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Plan } from '@/lib/types';
import { DEFAULT_PLANS } from '@/lib/constants';
import { PaywallModal } from '@/components/ui/PaywallModal';
import {
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Zap,
  ArrowRight,
  Lock,
} from 'lucide-react';

interface HomePricingSectionProps {
  initialPlans?: Plan[];
}

export const HomePricingSection: React.FC<HomePricingSectionProps> = ({ initialPlans }) => {
  const plans = initialPlans && initialPlans.length > 0 ? initialPlans : DEFAULT_PLANS;
  const [paywallOpen, setPaywallOpen] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState<string>('6aa3c900e4017433da625f4f');

  const handleSelectPlan = (planId: string) => {
    setSelectedPlanId(planId);
    setPaywallOpen(true);
  };

  return (
    <section className="py-20 lg:py-28 border-b border-cyan-500/15 relative overflow-hidden" id="pricing">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/50 border border-indigo-500/30 text-xs font-mono uppercase text-indigo-300 mb-4 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            Simple Transparent Pricing
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mb-4">
            Unlock Financial Intelligence
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Zero recurring subscription lock-ins. Pay once per tier and get immediate, permanent access to downloadable business PDFs and Excel financial models.
          </p>
        </div>

        {/* 3 Pricing Cards (Starter ₹59, Growth ₹99, Premium ₹149) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-14">
          {plans.map((plan, idx) => {
            const isPopular = plan.popular || idx === 1;

            return (
              <div
                key={plan._id || idx}
                className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                  isPopular
                    ? 'border-2 border-cyan-400 bg-gradient-to-b from-cyan-950/40 via-slate-950/80 to-[#070c1e] shadow-[0_0_40px_rgba(34,211,238,0.25)] md:-translate-y-2'
                    : 'border border-slate-800/90 bg-slate-950/70 hover:border-slate-700'
                }`}
              >
                {/* Most Popular Badge */}
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-mono font-black uppercase bg-gradient-to-r from-cyan-400 to-indigo-400 text-slate-950 shadow-[0_0_15px_rgba(34,211,238,0.6)] tracking-wider">
                    {plan.badge || 'Most Popular'}
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">
                      Tier 0{idx + 1}
                    </span>
                    <span className="text-[10px] font-mono uppercase text-slate-400 px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                      Lifetime Access
                    </span>
                  </div>

                  <h3 className="text-2xl font-black uppercase text-white mb-2">{plan.name}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-6">
                    {plan.description}
                  </p>

                  <div className="flex items-baseline gap-2 mb-8 pb-6 border-b border-slate-800/80">
                    <span className="text-5xl font-black text-white font-mono">₹{plan.price}</span>
                    <span className="text-xs text-slate-400 font-mono">/ one-time</span>
                  </div>

                  {/* Feature Checkmarks */}
                  <div className="space-y-3 mb-8">
                    <span className="text-[11px] font-mono uppercase text-slate-400 font-semibold block mb-1">
                      Included With This Tier:
                    </span>
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-800/80">
                  <button
                    onClick={() => handleSelectPlan(plan._id)}
                    className={`w-full py-3.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                      isPopular
                        ? 'btn-gradient-primary shadow-[0_0_20px_rgba(99,102,241,0.5)]'
                        : 'bg-slate-900 hover:bg-slate-850 text-white border border-slate-700/80 hover:border-cyan-400/50'
                    }`}
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Get {plan.name} (₹{plan.price})</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Razorpay Trust Indicator Footer */}
        <div className="p-6 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex flex-wrap items-center justify-around gap-6 text-center text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Razorpay 256-Bit SSL Encrypted Checkout</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-cyan-400" />
            <span>Instant Access Unlocked Upon Payment</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>Macro-Free Clean Excel & PDF Files</span>
          </div>
        </div>
      </div>

      {/* Paywall Checkout Modal */}
      <PaywallModal
        isOpen={paywallOpen}
        onClose={() => setPaywallOpen(false)}
        onSuccess={() => {
          alert('Access confirmed! Your plan is now unlocked.');
        }}
      />
    </section>
  );
};
