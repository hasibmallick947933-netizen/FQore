'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/authContext';
import { Button } from '@/components/ui/Button';
import { Shield, Mail, Lock, ArrowRight, Sparkles } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      await login(email, password);
      router.push('/');
      router.refresh();
    } catch (err: any) {
      setErrorMsg(err.message || 'Invalid credentials. Please verify your email and password.');
    } finally {
      setLoading(false);
    }
  };

  const fillCredentials = (role: 'admin' | 'student') => {
    if (role === 'admin') {
      setEmail('fqorein@gmail.com');
      setPassword('sunny005');
    } else {
      setEmail('student@eduxchain.com');
      setPassword('Student@123456');
    }
  };

  return (
    <div className="py-16 sm:py-24 min-h-[80vh] flex items-center justify-center relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-md w-full mx-auto px-4 relative z-10">
        <div className="glass-panel p-8 sm:p-10 rounded-2xl border border-cyan-500/30 shadow-[0_0_40px_rgba(34,211,238,0.15)]">
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(34,211,238,0.3)]">
              <Shield className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-black uppercase tracking-tight text-white">
              Learner & Admin Portal
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Sign in to manage curriculum or access your saved research repository.
            </p>
          </div>

          {errorMsg && (
            <div className="p-3 mb-6 rounded-lg bg-red-950/40 border border-red-500/40 text-xs text-red-300">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="fqorein@gmail.com"
                  className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-900/90 border border-slate-800 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-900/90 border border-slate-800 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="chrome"
              size="md"
              loading={loading}
              className="w-full mt-2"
              showArrow
            >
              Sign In to Platform
            </Button>
          </form>

          {/* Quick Demo Fill Buttons */}
          <div className="mt-6 pt-6 border-t border-slate-800">
            <span className="text-[10px] font-mono uppercase text-slate-400 block mb-2 text-center">
              Quick One-Click Demo Credentials:
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => fillCredentials('admin')}
                className="px-2.5 py-1.5 text-[11px] font-mono rounded bg-slate-900 hover:bg-slate-800 border border-cyan-500/30 text-cyan-300 transition-colors flex items-center justify-center gap-1"
              >
                <Sparkles className="w-3 h-3" /> Admin Mode
              </button>
              <button
                type="button"
                onClick={() => fillCredentials('student')}
                className="px-2.5 py-1.5 text-[11px] font-mono rounded bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 transition-colors flex items-center justify-center gap-1"
              >
                Student Mode
              </button>
            </div>
          </div>

          <p className="text-center text-xs text-slate-500 mt-6">
            Don't have an account yet?{' '}
            <Link href="/register" className="text-cyan-400 hover:underline">
              Create student profile
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
