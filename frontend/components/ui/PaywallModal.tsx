'use client';

import React, { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { Plan } from '@/lib/types';
import { Button } from '@/components/ui/Button';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Lock,
  ArrowRight,
  AlertCircle,
  FileText,
  CreditCard,
} from 'lucide-react';

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (receiptToken: string) => void;
  targetTitle?: string;
  contentId?: string;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const PaywallModal: React.FC<PaywallModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  targetTitle,
  contentId,
}) => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [selectedPlanId, setSelectedPlanId] = useState<string>('');
  const [customerEmail, setCustomerEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [processing, setProcessing] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [successMsg, setSuccessMsg] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      loadPlans();
      loadRazorpayScript();
    }
  }, [isOpen]);

  const loadRazorpayScript = () => {
    if (document.getElementById('razorpay-checkout-script')) return;
    const script = document.createElement('script');
    script.id = 'razorpay-checkout-script';
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
  };

  const loadPlans = async () => {
    setLoading(true);
    try {
      const res = await api.get<{ success: boolean; plans: Plan[] }>('/plans');
      setPlans(res.plans || []);
      // Default select Growth or second plan or first
      const defaultPlan = res.plans.find((p) => p.popular) || res.plans[1] || res.plans[0];
      if (defaultPlan) {
        setSelectedPlanId(defaultPlan._id);
      }
    } catch (err: any) {
      setErrorMsg('Failed to load pricing tiers.');
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlanId) return;

    setProcessing(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      // 1. Create order on backend
      const orderData = await api.post<{
        success: boolean;
        orderId: string;
        amount: number;
        currency: string;
        displayPrice: number;
        planName: string;
        keyId: string;
        isSimulator: boolean;
      }>('/payments/create-order', {
        planId: selectedPlanId,
        contentId,
        customerEmail: customerEmail || 'guest@eduxchain.com',
      });

      // If simulated or test simulator
      if (orderData.isSimulator || !window.Razorpay) {
        // Instant simulated verification for frictionless preview
        const verifyRes = await api.post<{
          success: boolean;
          receiptToken: string;
          planName: string;
        }>('/payments/verify', {
          razorpay_order_id: orderData.orderId,
          razorpay_payment_id: `sim_pay_${Date.now()}`,
          razorpay_signature: 'simulated_test_signature',
          planId: selectedPlanId,
        });

        localStorage.setItem('edux_unlocked_token', verifyRes.receiptToken);
        localStorage.setItem('edux_unlocked_plan', verifyRes.planName);
        setSuccessMsg(`Payment Confirmed! You unlocked ${verifyRes.planName}.`);
        setTimeout(() => {
          onSuccess(verifyRes.receiptToken);
          onClose();
        }, 1200);
        return;
      }

      // 2. Open standard Razorpay Checkout modal
      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'EduX Intel Academy',
        description: `Unlock ${orderData.planName}`,
        order_id: orderData.orderId,
        prefill: {
          email: customerEmail,
        },
        theme: {
          color: '#06b6d4',
        },
        handler: async function (response: any) {
          try {
            const verifyRes = await api.post<{
              success: boolean;
              receiptToken: string;
              planName: string;
            }>('/payments/verify', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              planId: selectedPlanId,
            });

            localStorage.setItem('edux_unlocked_token', verifyRes.receiptToken);
            localStorage.setItem('edux_unlocked_plan', verifyRes.planName);
            setSuccessMsg(`Payment Successful! Access unlocked for ${verifyRes.planName}.`);
            setTimeout(() => {
              onSuccess(verifyRes.receiptToken);
              onClose();
            }, 1000);
          } catch (err: any) {
            setErrorMsg(err.message || 'Signature verification failed');
          }
        },
        modal: {
          ondismiss: function () {
            setProcessing(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err: any) {
      setErrorMsg(err.message || 'Payment initiation failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Dark backdrop with blur */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-2xl glass-panel rounded-3xl border border-cyan-500/40 p-6 sm:p-8 overflow-hidden z-10 shadow-[0_0_50px_rgba(34,211,238,0.2)]">
        {/* Background ambient glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 blur-[90px] pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900/60 hover:bg-slate-800 transition-colors border border-slate-800"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono uppercase text-cyan-300 mb-3">
            <Lock className="w-3.5 h-3.5 text-cyan-400" />
            Premium Financial Resource
          </div>
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
            Unlock Business PDFs & Models
          </h2>
          {targetTitle && (
            <p className="text-xs sm:text-sm text-cyan-300/90 font-mono mt-1 line-clamp-1">
              File: {targetTitle}
            </p>
          )}
          <p className="text-xs text-slate-400 mt-1">
            Choose an institutional access plan below to instantly download and view verified financial models via Razorpay.
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 mb-5 rounded-xl bg-red-950/40 border border-red-500/40 text-xs text-red-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-3 mb-5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-xs text-emerald-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Dynamic Plans Selector */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 py-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-44 rounded-2xl bg-slate-900/60 animate-pulse" />
            ))}
          </div>
        ) : (
          <form onSubmit={handleCheckout} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {plans.map((plan) => {
                const isSelected = selectedPlanId === plan._id;
                return (
                  <div
                    key={plan._id}
                    onClick={() => setSelectedPlanId(plan._id)}
                    className={`relative p-4 rounded-2xl border cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                      isSelected
                        ? 'bg-cyan-950/40 border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.25)]'
                        : 'bg-slate-950/50 border-slate-800/90 hover:border-slate-700'
                    }`}
                  >
                    {plan.popular && (
                      <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase bg-cyan-400 text-slate-950 shadow-[0_0_10px_#22d3ee]">
                        {plan.badge || 'Popular'}
                      </span>
                    )}

                    <div>
                      <h4 className="text-xs font-bold uppercase font-mono text-slate-300">
                        {plan.name}
                      </h4>
                      <div className="mt-2 flex items-baseline gap-1">
                        <span className="text-2xl font-black text-white font-mono">
                          ₹{plan.price}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">/ one-time</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-tight">
                        {plan.description}
                      </p>
                    </div>

                    <div className="pt-3 mt-3 border-t border-slate-800/80 space-y-1">
                      {plan.features.slice(0, 3).map((f, idx) => (
                        <div key={idx} className="flex items-start gap-1.5 text-[10px] text-slate-300">
                          <CheckCircle2 className="w-3 h-3 text-cyan-400 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Customer Email Input */}
            <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-center gap-3">
              <input
                type="email"
                required
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                placeholder="Enter email for payment receipt & download link..."
                className="w-full px-3.5 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-cyan-400"
              />
              <span className="text-[11px] font-mono text-slate-500 shrink-0">
                Secured by Razorpay
              </span>
            </div>

            {/* Action CTA */}
            <div className="flex items-center justify-between gap-4 pt-2">
              <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>256-Bit Encrypted Razorpay Gateway</span>
              </div>

              <Button
                type="submit"
                variant="chrome"
                size="md"
                loading={processing}
                showArrow
              >
                Pay & Unlock PDF
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
