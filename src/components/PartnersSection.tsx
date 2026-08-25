'use client';

import React from 'react';
import { PARTNER_EUROPHARM } from '@/lib/initialData';
import { Handshake, ShieldCheck } from 'lucide-react';

export default function PartnersSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
            <Handshake className="w-7 h-7" />
          </div>
          <div>
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
              ტურნირის მხარდამჭერი
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              {PARTNER_EUROPHARM.name}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              {PARTNER_EUROPHARM.description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 bg-slate-800/80 px-4 py-2.5 rounded-xl border border-slate-700">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>ტრადიციული პარტნიორობა</span>
        </div>
      </div>
    </section>
  );
}
