'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';
import { Send, CheckCircle2, ShieldAlert } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setErrorMsg('');
    try {
      await api.post('/public/newsletter/subscribe', { email });
      setSubscribed(true);
      setEmail('');
    } catch (err: any) {
      setErrorMsg(err.message || 'Subscription failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="border-t border-cyan-500/15 bg-[#03060f] relative overflow-hidden text-slate-400">
      {/* Ambient background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-48 bg-cyan-500/5 blur-[100px] pointer-events-none" />

      {/* Mandatory Regulatory Educational Disclaimer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6 border-b border-slate-900">
        <div className="rounded-xl border border-cyan-500/20 bg-slate-950/60 p-4 sm:p-5 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
          <div className="text-xs leading-relaxed text-slate-400">
            <span className="font-semibold text-cyan-300 uppercase tracking-wider block mb-0.5">
              Financial Education & Regulatory Disclaimer
            </span>
            Content on this platform is for educational and illustrative purposes only and should not be considered financial, investment, legal, or tax advice. We make no representations or warranties as to the accuracy or completeness of the materials. Investing in securities involves substantial risk of loss. Always consult a certified financial planner or registered investment advisor before making capital allocation decisions.
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Column 1: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center p-0.5 shadow-[0_0_15px_rgba(34,211,238,0.4)]">
                <div className="w-full h-full bg-[#050811] rounded-[6px] flex items-center justify-center">
                  <span className="font-mono text-cyan-400 font-bold text-xs">✕</span>
                </div>
              </div>
              <span className="text-base font-extrabold tracking-wider text-white uppercase">
                EduX<span className="text-cyan-400">.</span>Intel
              </span>
            </Link>
            <p className="text-xs leading-relaxed text-slate-400 max-w-sm">
              An institutional-grade educational ecosystem providing deep business models, equity research, macroeconomic frameworks, and downloadable financial models.
            </p>

            {/* Newsletter Input */}
            <form onSubmit={handleSubscribe} className="pt-2">
              <span className="text-xs font-semibold text-slate-200 block mb-2">
                Subscribe to Weekly Intelligence Briefing
              </span>
              <div className="flex gap-2 max-w-sm">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter institutional email..."
                  required
                  className="w-full px-3.5 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-cyan-400 transition-colors"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-chrome px-4 py-2 rounded-lg text-xs font-semibold shrink-0"
                >
                  {loading ? '...' : <Send className="w-3.5 h-3.5" />}
                </button>
              </div>
              {subscribed && (
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 mt-2 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Subscribed successfully!
                </div>
              )}
              {errorMsg && <p className="text-xs text-red-400 mt-2">{errorMsg}</p>}
            </form>
          </div>

          {/* Column 2: Hubs */}
          <div className="space-y-3 text-xs">
            <h4 className="font-mono uppercase font-semibold text-cyan-300 tracking-wider">
              Educational Hubs
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/business" className="hover:text-cyan-300 transition-colors">
                  Business Models & Scaling
                </Link>
              </li>
              <li>
                <Link href="/stock-market" className="hover:text-cyan-300 transition-colors">
                  Stock Market Fundamentals
                </Link>
              </li>
              <li>
                <Link href="/companies" className="hover:text-cyan-300 transition-colors">
                  Company Deep Dives
                </Link>
              </li>
              <li>
                <Link href="/investing" className="hover:text-cyan-300 transition-colors">
                  Valuation & DCF Models
                </Link>
              </li>
              <li>
                <Link href="/trading" className="hover:text-cyan-300 transition-colors">
                  Price Action & Candlesticks
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Analyses */}
          <div className="space-y-3 text-xs">
            <h4 className="font-mono uppercase font-semibold text-cyan-300 tracking-wider">
              Research & Models
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/case-studies" className="hover:text-cyan-300 transition-colors">
                  Business Case Studies
                </Link>
              </li>
              <li>
                <Link href="/market-analysis" className="hover:text-cyan-300 transition-colors">
                  Macro Trends & Liquidity
                </Link>
              </li>
              <li>
                <Link href="/resources?type=excel" className="hover:text-cyan-300 transition-colors">
                  Excel Financial Templates
                </Link>
              </li>
              <li>
                <Link href="/resources?type=pdf" className="hover:text-cyan-300 transition-colors">
                  Forensics & PDF Guides
                </Link>
              </li>
              <li>
                <Link href="/resources?type=video" className="hover:text-cyan-300 transition-colors">
                  Modeling Video Walkthroughs
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Platform & Support */}
          <div className="space-y-3 text-xs">
            <h4 className="font-mono uppercase font-semibold text-cyan-300 tracking-wider">
              Academy
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:text-cyan-300 transition-colors">
                  About the Platform
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-cyan-300 transition-colors">
                  Advisory & Contact
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-cyan-300 transition-colors">
                  Learner Portal Login
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-cyan-300 transition-colors">
                  Admin CMS Gateway
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} EduX Intel Platform. All rights reserved.</p>
          <div className="flex gap-6">
            <span>Security Protected</span>
            <span>REST API Verified</span>
            <span>MongoDB Atlas Powered</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
