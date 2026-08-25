'use client';

import React from 'react';
import { Trophy, Medal, Sparkles } from 'lucide-react';

export default function PrizeFundSection() {
  const prizes = [
    {
      place: 'I ადგილი',
      amount: '500 ₾',
      sponsor: 'აფთიაქი „ევროფარმისგან“',
      color: 'from-amber-500/20 via-amber-500/10 to-transparent border-amber-500/50 text-amber-400',
      badge: 'bg-amber-500 text-black',
      icon: Trophy,
    },
    {
      place: 'II ადგილი',
      amount: '300 ₾',
      sponsor: 'საორგანიზაციო ფონდი',
      color: 'from-slate-400/20 via-slate-400/10 to-transparent border-slate-400/40 text-slate-300',
      badge: 'bg-slate-300 text-black',
      icon: Medal,
    },
    {
      place: 'III ადგილი',
      amount: '200 ₾',
      sponsor: 'საორგანიზაციო ფონდი',
      color: 'from-amber-700/20 via-amber-700/10 to-transparent border-amber-700/40 text-amber-500',
      badge: 'bg-amber-700 text-white',
      icon: Medal,
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-bold text-amber-400 mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>სპორტული მოტივაცია</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center justify-center gap-2">
          🏆 საპრიზო ფონდი
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          გამარჯვებული გუნდების წახალისება და ტურნირის ტრადიციული პრიზები
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        {prizes.map((p) => {
          const Icon = p.icon;
          return (
            <div
              key={p.place}
              className={`p-6 rounded-3xl glass-panel bg-gradient-to-b ${p.color} border text-center flex flex-col items-center justify-between shadow-xl transition-all hover:scale-[1.02]`}
            >
              <div className="flex flex-col items-center">
                <span className={`px-3 py-1 rounded-full text-xs font-black mb-4 ${p.badge}`}>
                  {p.place}
                </span>

                <div className="w-16 h-16 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-center mb-3">
                  <Icon className="w-8 h-8" />
                </div>

                <div className="text-3xl sm:text-4xl font-black text-white tracking-tight font-mono mb-1">
                  {p.amount}
                </div>
              </div>

              <div className="text-xs font-bold text-slate-300 mt-4 pt-3 border-t border-white/10 w-full">
                {p.sponsor}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
