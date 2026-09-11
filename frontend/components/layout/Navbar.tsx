'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/authContext';
import {
  Compass,
  Search,
  Bookmark,
  Shield,
  Menu,
  X,
  LogOut,
  User as UserIcon,
  Layers,
  ChevronDown,
  Sparkles,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { user, isAdmin, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navLinks = [
    { name: 'Business', href: '/business' },
    { name: 'Stock Market', href: '/stock-market' },
    { name: 'Companies', href: '/companies' },
    { name: 'Investing', href: '/investing' },
    { name: 'Trading', href: '/trading' },
    { name: 'Case Studies', href: '/case-studies' },
    { name: 'Resources', href: '/resources' },
    { name: 'Pricing', href: '/pricing' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#040711]/85 backdrop-blur-xl border-b border-cyan-500/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-400 flex items-center justify-center p-0.5 shadow-[0_0_20px_rgba(99,102,241,0.5)] group-hover:shadow-[0_0_25px_rgba(34,211,238,0.7)] transition-all">
              <div className="w-full h-full bg-[#050811] rounded-[10px] flex items-center justify-center">
                <span className="font-mono text-cyan-400 font-black text-base tracking-tighter">FQ</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                FQore<span className="text-cyan-400">.</span>
              </span>
              <span className="text-[9px] tracking-widest text-slate-400 uppercase -mt-1 font-mono font-semibold">
                Intelligence & Academy
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all ${
                    isActive
                      ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-400/40 shadow-[0_0_10px_rgba(34,211,238,0.2)]'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons & Auth */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/search"
              aria-label="Global Search"
              className="p-2 text-slate-400 hover:text-cyan-300 hover:bg-slate-900 rounded-lg border border-slate-800 transition-colors"
            >
              <Search className="w-4 h-4" />
            </Link>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-cyan-500/30 text-xs text-slate-200 hover:border-cyan-400 transition-all"
                >
                  <div className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold text-[10px]">
                    {user.name.charAt(0)}
                  </div>
                  <span className="max-w-[100px] truncate">{user.name.split(' ')[0]}</span>
                  {isAdmin && (
                    <span className="text-[9px] bg-cyan-500/20 text-cyan-300 px-1.5 py-0.5 rounded uppercase font-mono font-bold">
                      Admin
                    </span>
                  )}
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 rounded-xl bg-[#090e1d] border border-cyan-500/30 shadow-2xl py-2 z-50 backdrop-blur-xl">
                    <div className="px-4 py-2 border-b border-slate-800/60">
                      <p className="text-xs font-semibold text-white truncate">{user.name}</p>
                      <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                    </div>

                    {isAdmin && (
                      <Link
                        href="/admin"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-xs text-cyan-300 hover:bg-cyan-500/10 transition-colors"
                      >
                        <Shield className="w-3.5 h-3.5" />
                        Admin CMS Suite
                      </Link>
                    )}

                    <Link
                      href="/bookmarks"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-xs text-slate-300 hover:bg-slate-800/60 transition-colors"
                    >
                      <Bookmark className="w-3.5 h-3.5 text-cyan-400" />
                      Saved & Bookmarks
                    </Link>

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        logout();
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-xs text-red-400 hover:bg-red-500/10 transition-colors text-left"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white transition-colors"
                >
                  Log In
                </Link>
                <Link
                  href="/pricing"
                  className="btn-gradient-primary text-xs px-4 py-2 rounded-xl inline-flex items-center gap-1.5 font-semibold shadow-[0_0_20px_rgba(99,102,241,0.4)]"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex sm:hidden items-center gap-2">
            <Link href="/search" className="p-2 text-slate-400">
              <Search className="w-5 h-5" />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-800/80 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2 text-sm text-slate-200 hover:bg-slate-900 rounded-lg"
              >
                {link.name}
              </Link>
            ))}

            <div className="pt-4 border-t border-slate-800 flex flex-col gap-2 px-4">
              {user ? (
                <>
                  {isAdmin && (
                    <Link
                      href="/admin"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2 py-2 text-sm text-cyan-300 font-semibold"
                    >
                      <Shield className="w-4 h-4" /> Admin CMS
                    </Link>
                  )}
                  <Link
                    href="/bookmarks"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 py-2 text-sm text-slate-300"
                  >
                    <Bookmark className="w-4 h-4 text-cyan-400" /> Saved Content
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-2 py-2 text-sm text-red-400 text-left"
                  >
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </>
              ) : (
                <div className="flex gap-2">
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-1/2 text-center py-2 text-sm border border-slate-700 rounded-lg text-white"
                  >
                    Log In
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-1/2 text-center py-2 text-sm btn-chrome rounded-lg font-semibold"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
