'use client';

import React from 'react';
import Link from 'next/link';
import { useTournament } from '@/lib/store';
import { Flame, Heart, Info, MapPin, Calendar, Users, Trophy } from 'lucide-react';

export default function Hero() {
  const { liveMatch, matches } = useTournament();

  const finishedCount = matches.filter((m) => m.status === 'finished').length;
  const totalTeams = 14;

  return (
    <section className="relative overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-20 border-b border-slate-800/80 bg-gradient-to-b from-[#0e1726] via-[#090e17] to-[#090e17]">
      {/* Background visual accents */}
      <div className="absolute inset-0 hero-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute -top-10 right-0 w-[400px] h-[300px] bg-rose-600/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Live / Status Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/90 border border-slate-700/80 text-xs sm:text-sm font-semibold mb-6 shadow-inner">
            {liveMatch ? (
              <span className="flex items-center gap-2 text-rose-400 font-bold">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
                </span>
                LIVE მატჩი მიმდინარეობს
              </span>
            ) : (
              <span className="flex items-center gap-2 text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                საქველმოქმედო ტურნირი • სოფელი შილდა
              </span>
            )}
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white mb-4 sm:mb-6 uppercase">
            <span className="bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
              გაუზიარე მომავალს
            </span>
          </h1>

          {/* Heart Slogan */}
          <div className="inline-block p-1 rounded-2xl bg-gradient-to-r from-rose-500/20 via-emerald-500/20 to-teal-500/20 mb-6">
            <div className="px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
              <p className="text-base sm:text-xl font-bold text-slate-100 flex items-center justify-center gap-2 flex-wrap">
                <span>გავერთიანდეთ სიკეთისთვის და ერთად დავეხმაროთ ბავშვებს!</span>
                <Heart className="w-5 h-5 text-rose-500 fill-rose-500 inline shrink-0 animate-pulse" />
              </p>
            </div>
          </div>

          {/* Subtitle */}
          <p className="text-slate-300 text-sm sm:text-lg max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed">
            სამოყვარულო მინი-ფეხბურთის ჩემპიონატი მრავალშვილიანი და სოციალურად დაუცველი ოჯახების, ასევე სასკოლოდ ბავშვების მხარდასაჭერად.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 mb-10">
            <Link
              href="/#live-section"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-rose-600 to-red-700 hover:from-rose-500 hover:to-red-600 text-white font-extrabold text-base shadow-xl shadow-rose-950/60 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Flame className="w-5 h-5 fill-white" />
              <span>🔴 LIVE ანგარიშები</span>
            </Link>

            <Link
              href="/charity"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-extrabold text-base shadow-xl shadow-emerald-950/60 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Heart className="w-5 h-5 fill-white" />
              <span>❤️ მხარი დაუჭირე</span>
            </Link>

            <Link
              href="/about"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-slate-200 hover:text-white font-bold text-base transition-all"
            >
              <Info className="w-4 h-4 text-emerald-400" />
              <span>⚽ ტურნირის შესახებ</span>
            </Link>
          </div>

          {/* Tournament Quick Facts Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto pt-4">
            <div className="glass-panel p-3 sm:p-4 rounded-2xl flex items-center gap-3 text-left">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">სტარტი</div>
                <div className="text-sm sm:text-base font-extrabold text-white">22 აგვისტო</div>
              </div>
            </div>

            <div className="glass-panel p-3 sm:p-4 rounded-2xl flex items-center gap-3 text-left">
              <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">ლოკაცია</div>
                <div className="text-sm sm:text-base font-extrabold text-white">შილდის სტადიონი</div>
              </div>
            </div>

            <div className="glass-panel p-3 sm:p-4 rounded-2xl flex items-center gap-3 text-left">
              <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">გუნდები</div>
                <div className="text-sm sm:text-base font-extrabold text-white">{totalTeams} გუნდი (2 ჯგუფი)</div>
              </div>
            </div>

            <div className="glass-panel p-3 sm:p-4 rounded-2xl flex items-center gap-3 text-left">
              <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">ჩატარებული</div>
                <div className="text-sm sm:text-base font-extrabold text-white">{finishedCount} მატჩი</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
