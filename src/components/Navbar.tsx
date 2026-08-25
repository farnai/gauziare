'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTournament } from '@/lib/store';
import {
  Trophy,
  Heart,
  Calendar,
  Flame,
  Menu,
  X,
  ShieldAlert,
  Info,
  Layers,
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const { liveMatch, isAdmin } = useTournament();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'მთავარი', icon: Layers },
    { href: '/#live-section', label: 'LIVE', icon: Flame, isLive: true },
    { href: '/#matches-section', label: 'მატჩები', icon: Calendar },
    { href: '/#standings-section', label: 'ცხრილები', icon: Trophy },
    { href: '/#playoff-section', label: 'პლეი-ოფი', icon: Trophy },
    { href: '/charity', label: 'ქველმოქმედება', icon: Heart, isCharity: true },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#090e17]/95 backdrop-blur-md">
      {/* Subtle test mode announcement bar */}
      <div className="w-full bg-slate-950/90 border-b border-slate-800/60 py-1 px-4 text-center">
        <p className="text-[11px] font-medium text-slate-400 flex items-center justify-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse inline-block" />
          <span>პლატფორმა მუშაობს სატესტო რეჟიმში</span>
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo / Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shadow-lg shadow-emerald-950/40 text-white font-black text-xl tracking-tighter group-hover:scale-105 transition-transform">
              ⚽
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white group-hover:text-emerald-400 transition-colors leading-tight">
                გაუზიარე მომავალს
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-medium text-emerald-400/90 tracking-wide uppercase">
                  შილდის ტურნირი
                </span>
                <span className="hidden sm:inline-flex px-1.5 py-0.2 rounded bg-amber-500/10 border border-amber-500/30 text-[9px] text-amber-300 font-medium">
                  სატესტო რეჟიმი
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const isLiveActive = link.isLive && liveMatch;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                    link.isLive
                      ? 'text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 border border-rose-900/40'
                      : link.isCharity
                      ? 'text-emerald-400 hover:text-emerald-300 hover:bg-emerald-950/30'
                      : isActive
                      ? 'text-white bg-slate-800/80 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  {link.isLive && (
                    <span className="relative flex h-2 w-2">
                      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isLiveActive ? 'bg-rose-400 opacity-75' : 'bg-slate-500 opacity-30'}`}></span>
                      <span className={`relative inline-flex rounded-full h-2 w-2 ${isLiveActive ? 'bg-rose-500' : 'bg-slate-500'}`}></span>
                    </span>
                  )}
                  {link.label}
                  {link.isCharity && <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Button */}
          <div className="flex items-center gap-3">
            <Link
              href="/charity"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-bold rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-950/50 hover:shadow-emerald-900/50 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>შემოწირულობა</span>
            </Link>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-300 hover:text-white"
              aria-label="მენიუს გახსნა"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-[#0c1320] px-4 pt-3 pb-5 space-y-2 animate-in slide-in-from-top-4 duration-200">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between p-3 rounded-xl text-base font-semibold transition-colors ${
                  link.isLive
                    ? 'bg-rose-950/30 text-rose-300 border border-rose-900/40'
                    : link.isCharity
                    ? 'bg-emerald-950/30 text-emerald-300 border border-emerald-900/40'
                    : 'text-slate-200 hover:bg-slate-800/70'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 opacity-70" />
                  <span>{link.label}</span>
                </div>
                {link.isLive && liveMatch && (
                  <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-bold bg-rose-500 text-white">
                    <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                    LIVE
                  </span>
                )}
                {link.isCharity && <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />}
              </Link>
            );
          })}

          <div className="pt-2">
            <Link
              href="/charity"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 text-white font-bold shadow-lg shadow-emerald-950/60"
            >
              <Heart className="w-4 h-4 fill-white" />
              ❤️ დაეხმარე მომავალს
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
