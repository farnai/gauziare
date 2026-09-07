'use client';

import React from 'react';
import { Trophy, Medal, Sparkles, Award } from 'lucide-react';

export default function PrizeFundSection() {
  const prizes = [
    {
      place: 'I ადგილი',
      winner: 'თელავი',
      amount: '500 ₾',
      sponsor: 'აფთიაქი „ევროფარმისგან“',
      color: 'from-amber-500/20 via-amber-500/10 to-transparent border-amber-500/50 text-amber-400',
      badge: 'bg-amber-500 text-black',
      icon: Trophy,
    },
    {
      place: 'II ადგილი',
      winner: 'შილდა',
      amount: '300 ₾',
      sponsor: 'საორგანიზაციო ფონდი',
      color: 'from-slate-400/20 via-slate-400/10 to-transparent border-slate-400/40 text-slate-300',
      badge: 'bg-slate-300 text-black',
      icon: Medal,
    },
    {
      place: 'III ადგილი',
      winner: 'კალაური',
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
          <span>სპორტული აღიარება & ჯილდოები</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center justify-center gap-2">
          🏆 საპრიზო ფონდი და გამარჯვებულები
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          გამარჯვებული გუნდების დამსახურებული ჯილდოები და ტურნირის პრიზები
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6">
        {prizes.map((p) => {
          const Icon = p.icon;
          return (
            <div
              key={p.place}
              className={`p-6 rounded-3xl glass-panel bg-gradient-to-b ${p.color} border text-center flex flex-col items-center justify-between shadow-xl transition-all hover:scale-[1.02]`}
            >
              <div className="flex flex-col items-center w-full">
                <span className={`px-3 py-1 rounded-full text-xs font-black mb-3 ${p.badge}`}>
                  {p.place}
                </span>

                <div className="w-16 h-16 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-center mb-3">
                  <Icon className="w-8 h-8" />
                </div>

                <div className="text-xl sm:text-2xl font-black text-white mb-1">
                  {p.winner}
                </div>

                <div className="text-2xl sm:text-3xl font-black text-amber-300 tracking-tight font-mono mb-1">
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

      {/* MVP Special Card */}
      <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-amber-500/15 via-slate-900 to-amber-500/15 border-2 border-amber-500/40 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 text-2xl shrink-0">
            ⭐️
          </div>
          <div>
            <span className="text-[11px] font-black uppercase tracking-wider text-amber-400 bg-amber-500/20 px-2.5 py-0.5 rounded-full">
              ტურნირის საუკეთესო მოთამაშე
            </span>
            <h3 className="text-xl font-black text-white mt-1">
              გიორგი კიკნაძე — <span className="text-emerald-400">შილდის მეკარე</span> 🧤🔥
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              საუკეთესო მეკარის ტიტული და განსაკუთრებული წვლილი შილდის ფინალში გასვლაში!
            </p>
          </div>
        </div>

        <div className="shrink-0">
          <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-black text-xs sm:text-sm shadow-md">
            <Award className="w-4 h-4" />
            <span>MVP 2026</span>
          </span>
        </div>
      </div>
    </section>
  );
}
