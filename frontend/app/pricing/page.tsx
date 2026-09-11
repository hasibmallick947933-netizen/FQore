'use client';

import React, { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { Plan } from '@/lib/types';
import { PaywallModal } from '@/components/ui/PaywallModal';
import { Button } from '@/components/ui/Button';
import {
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Zap,
  DownloadCloud,
  FileSpreadsheet,
  Lock,
  ArrowUpRight,
} from 'lucide-react';

import { DEFAULT_PLANS } from '@/lib/constants';

export default function PricingPage() {
  const [plans, setPlans] = useState<Plan[]>(DEFAULT_PLANS);
  const [loading, setLoading] = useState(false);
  const [selectedPlanForModal, setSelectedPlanForModal] = useState<string | null>(null);
  const [paywallOpen, setPaywallOpen] = useState(false);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const res = await api.get<{ success: boolean; plans: Plan[] }>('/plans');
      if (res.plans && res.plans.length > 0) {
        setPlans(res.plans);
      }
    } catch (err) {
      console.warn('Using default pricing tiers:', err);
    }
  };

  const handleSelectPlan = (planId: string) => {
    setSelectedPlanForModal(planId);
    setPaywallOpen(true);
  };

  return (
    <div className="py-16 sm:py-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono uppercase text-cyan-300 mb-4 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            Direct Razorpay Access
          </div>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white mb-6">
            Institutional Intelligence Tiers
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light">
            Unlock verified business model breakdowns, downloadable forensic PDFs, and dynamic 3-statement Excel valuation sheets. Zero recurring subscription traps—pay once per tier.
          </p>
        </div>

        {/* Pricing Cards */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-96 rounded-3xl bg-slate-900/60 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-20">
            {plans.map((plan, idx) => (
              <div
                key={plan._id}
                className={`glass-panel rounded-3xl p-8 flex flex-col justify-between relative transition-all duration-300 hover:border-cyan-400/50 ${
                  plan.popular
                    ? 'border-cyan-400 bg-gradient-to-b from-cyan-950/30 via-slate-950/60 to-slate-950/80 shadow-[0_0_35px_rgba(34,211,238,0.2)]'
                    : 'border-slate-800'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase bg-cyan-400 text-slate-950 shadow-[0_0_15px_#22d3ee]">
                    {plan.badge || 'Most Popular'}
                  </div>
                )}

                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold block mb-2">
                    Tier 0{idx + 1}
                  </span>
                  <h3 className="text-2xl font-black uppercase text-white mb-2">{plan.name}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-6">
                    {plan.description}
                  </p>

                  <div className="flex items-baseline gap-2 mb-8 pb-6 border-b border-slate-800">
                    <span className="text-5xl font-black text-white font-mono">₹{plan.price}</span>
                    <span className="text-xs text-slate-400 font-mono">/ one-time access</span>
                  </div>

                  <div className="space-y-3 mb-8">
                    <span className="text-[11px] font-mono uppercase text-slate-400 font-semibold block mb-1">
                      Included Assets:
                    </span>
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-800">
                  <Button
                    variant={plan.popular ? 'chrome' : 'outline'}
                    size="md"
                    className="w-full"
                    onClick={() => handleSelectPlan(plan._id)}
                    showArrow
                  >
                    Unlock Plan for ₹{plan.price}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Razorpay Trust Badges */}
        <div className="glass-panel p-8 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-around gap-6 text-center text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span>Razorpay Secure 256-Bit SSL</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-cyan-400" />
            <span>Instant Digital Unlocking</span>
          </div>
          <div className="flex items-center gap-2">
            <DownloadCloud className="w-5 h-5 text-blue-400" />
            <span>Verified Macro-Free Downloads</span>
          </div>
        </div>
      </div>

      {/* Checkout Paywall Modal */}
      <PaywallModal
        isOpen={paywallOpen}
        onClose={() => setPaywallOpen(false)}
        onSuccess={() => {
          alert('Payment confirmed! Your plan access is now active.');
        }}
      />
    </div>
  );
}
