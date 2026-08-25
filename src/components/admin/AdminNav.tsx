'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTournament } from '@/lib/store';
import { Flame, Calendar, Trophy, LogOut, RotateCcw, ShieldCheck } from 'lucide-react';

export default function AdminNav() {
  const pathname = usePathname();
  const { logoutAdmin, resetAllData, liveMatch } = useTournament();

  const links = [
    { href: '/admin', label: '🔴 LIVE მართვა', icon: Flame, isLive: true },
    { href: '/admin/matches', label: 'მატჩების მართვა', icon: Calendar },
    { href: '/admin/standings', label: 'ცხრილები და ქულები', icon: Trophy },
  ];

  return (
    <div className="mb-6 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/90 border border-amber-500/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              ადმინისტრატორის მართვის პანელი
            </div>
            <div className="text-sm font-extrabold text-white">
              გაუზიარე მომავალს • შილდა 2026
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (confirm('ნამდვილად გსურთ საწყისი სათამაშო მონაცემების აღდგენა?')) {
                resetAllData();
              }
            }}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition-colors"
            title="საწყისი მონაცემების აღდგენა"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">მონაცემების გადატვირთვა</span>
          </button>

          <button
            onClick={logoutAdmin}
            className="px-3 py-1.5 rounded-xl bg-rose-950/60 hover:bg-rose-900/60 border border-rose-800/60 text-rose-300 text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>გამოსვლა</span>
          </button>
        </div>
      </div>

      {/* Navigation tabs */}
      <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pb-1">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold flex items-center gap-2 shrink-0 transition-all ${
                isActive
                  ? 'bg-amber-500 text-black shadow-lg shadow-amber-950/40'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
              }`}
            >
              <link.icon className={`w-4 h-4 ${isActive ? 'text-black' : 'text-amber-400'}`} />
              <span>{link.label}</span>
              {link.isLive && liveMatch && (
                <span className="h-2 w-2 rounded-full bg-rose-600 animate-ping ml-0.5" />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
