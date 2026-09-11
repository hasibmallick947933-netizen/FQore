'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/authContext';
import { Button } from '@/components/ui/Button';
import { UserPlus, Mail, Lock, User, ArrowRight } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      await register(name, email, password);
      router.push('/');
      router.refresh();
    } catch (err: any) {
      setErrorMsg(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-16 sm:py-24 min-h-[80vh] flex items-center justify-center relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-md w-full mx-auto px-4 relative z-10">
        <div className="glass-panel p-8 sm:p-10 rounded-2xl border border-cyan-500/30 shadow-[0_0_40px_rgba(34,211,238,0.15)]">
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(34,211,238,0.3)]">
              <UserPlus className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-black uppercase tracking-tight text-white">
              Create Student Profile
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Join thousands of analysts mastering business models & markets.
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
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Jordan Vance"
                  className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-900/90 border border-slate-800 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>
            </div>

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
                  placeholder="name@organization.com"
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
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
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
              Complete Registration
            </Button>
          </form>

          <p className="text-center text-xs text-slate-500 mt-6">
            Already registered?{' '}
            <Link href="/login" className="text-cyan-400 hover:underline">
              Sign in to account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
