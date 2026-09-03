'use client';

import React from 'react';
import Link from 'next/link';
import {
  Trophy,
  Flame,
  Heart,
  Sparkles,
  Shirt,
  Calendar,
  Clock,
  MapPin,
  Shield,
  ArrowRight,
  CloudRain,
  Award,
  Users,
} from 'lucide-react';

export default function FinalNightBanner() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      {/* Grand Container */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#121c2e] via-[#0b1320] to-[#151324] border-2 border-amber-500/40 shadow-2xl shadow-amber-950/30">
        {/* Glow ambient background elements */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full hero-pattern opacity-15 pointer-events-none" />

        {/* Top Announcement Bar */}
        <div className="relative z-10 px-4 sm:px-8 pt-6 sm:pt-8 pb-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs sm:text-sm font-extrabold tracking-wide mb-4 shadow-sm animate-pulse">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>საქველმოქმედო ტურნირის კულმინაცია მოახლოვდა!</span>
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white uppercase mb-3">
            <span className="bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-500 bg-clip-text text-transparent">
              🔥 საფინალო საღამო • 5 სექტემბერი
            </span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed">
            უამინდობის გამო გადადებული გრანდიოზული საფინალო საღამო გაიმართება შაბათს, <strong>5 სექტემბერს</strong> შილდის ცენტრალურ სტადიონზე!
          </p>

          {/* 3rd Place Match Recap Pill */}
          <div className="mt-4 inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-slate-900/90 border border-slate-700/80 text-xs sm:text-sm shadow-md flex-wrap justify-center">
            <span className="flex items-center gap-1.5 text-amber-400 font-bold">
              <Award className="w-4 h-4" />
              <span>III ადგილი (დასრულდა):</span>
            </span>
            <span className="text-slate-200 font-semibold">გავაზი 0 : 4 კალაური</span>
            <span className="text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-500/30">
              🥉 ბრინჯაოს პრიზიორი: კალაური 👏
            </span>
          </div>
        </div>

        {/* Schedule & Event Cards Grid */}
        <div className="relative z-10 px-4 sm:px-8 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
            {/* Event 1: Friendly Match & Spectator Challenge */}
            <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-5 sm:p-6 flex flex-col justify-between hover:border-slate-700 transition-all">
              <div>
                <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-800">
                  <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-cyan-400 bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-500/30">
                    <Users className="w-3.5 h-3.5" />
                    ამხანაგური მატჩი
                  </span>
                  <span className="flex items-center gap-1.5 text-xs sm:text-sm font-black text-amber-400 font-mono">
                    <Clock className="w-4 h-4 text-amber-400" />
                    20:00 • 5 სექტემბერი
                  </span>
                </div>

                {/* Match Details */}
                <div className="space-y-3 mb-5">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center">
                        <Shield className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div>
                        <div className="font-black text-base text-white">შილდა 2</div>
                        <div className="text-[11px] text-slate-400 font-medium">წინა წლის ჩემპიონი</div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-slate-400">VS</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center">
                        <Shield className="w-5 h-5 text-cyan-400" />
                      </div>
                      <div>
                        <div className="font-black text-base text-white">ტურნირის ნაკრები</div>
                        <div className="text-[11px] text-slate-400 font-medium">სხვადასხვა გუნდის მოთამაშეები 💪</div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-slate-400">გუნდი</span>
                  </div>
                </div>

                {/* Special Challenge Highlight Box */}
                <div className="p-3.5 sm:p-4 rounded-xl bg-gradient-to-r from-amber-500/10 via-yellow-500/10 to-amber-500/5 border border-amber-500/30 text-left">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 shrink-0 mt-0.5">
                      <Trophy className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-extrabold text-amber-300 flex items-center gap-1.5 flex-wrap">
                        <span>🎯 მაყურებლების საფეხბურთო ჩელენჯი!</span>
                        <span className="text-[10px] bg-amber-400/20 text-amber-200 px-2 py-0.5 rounded-full uppercase">
                          მატჩის შემდეგ
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                        გამარჯვებულები დაჯილდოვდებიან <strong>საქართველოს ეროვნული ნაკრების ოფიციალური მაისურებით!</strong> 🇬🇪👕🔥
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">სტატუსი: დაგეგმილი</span>
                <Link
                  href="/match/m-friendly"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  <span>მატჩის ბარათი</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Event 2: Grand Final Match */}
            <div className="rounded-2xl bg-gradient-to-b from-amber-950/30 via-slate-900/90 to-slate-950 border-2 border-amber-500/50 p-5 sm:p-6 flex flex-col justify-between shadow-xl shadow-amber-950/30 hover:border-amber-400/70 transition-all">
              <div>
                <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-amber-500/30">
                  <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-amber-400 bg-amber-500/20 px-3.5 py-1 rounded-full border border-amber-500/40 shadow-sm animate-pulse">
                    <Trophy className="w-4 h-4 text-amber-400" />
                    ტურნირის დიდი ფინალი
                  </span>
                  <span className="flex items-center gap-1.5 text-xs sm:text-sm font-black text-amber-300 font-mono">
                    <Clock className="w-4 h-4 text-amber-400" />
                    21:00 • 5 სექტემბერი
                  </span>
                </div>

                {/* Finalist Teams Display */}
                <div className="grid grid-cols-3 items-center text-center gap-2 sm:gap-4 py-2 mb-5">
                  {/* Team Shilda */}
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-slate-800 border-2 border-amber-500/40 flex items-center justify-center mb-2 shadow-lg group hover:scale-105 transition-transform">
                      <Shield className="w-8 h-8 text-emerald-400" />
                    </div>
                    <div className="text-base sm:text-lg font-black text-white">შილდა</div>
                    <div className="text-[11px] text-emerald-400 font-bold">ფინალისტი</div>
                  </div>

                  {/* VS Emblem */}
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 font-black text-xs shadow-inner">
                      VS
                    </div>
                    <span className="mt-1 text-[11px] font-black text-amber-400 uppercase tracking-widest">
                      თასი 🏆
                    </span>
                  </div>

                  {/* Team Telavi */}
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-slate-800 border-2 border-amber-500/40 flex items-center justify-center mb-2 shadow-lg group hover:scale-105 transition-transform">
                      <Shield className="w-8 h-8 text-cyan-400" />
                    </div>
                    <div className="text-base sm:text-lg font-black text-white">თელავი</div>
                    <div className="text-[11px] text-cyan-400 font-bold">ფინალისტი</div>
                  </div>
                </div>

                {/* Grand Prize & Stakes Bar */}
                <div className="p-3.5 rounded-xl bg-slate-800/80 border border-amber-500/30 text-left">
                  <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-slate-200">
                    <span className="flex items-center gap-1.5 text-amber-300 font-black">
                      <Trophy className="w-4 h-4 text-amber-400" />
                      გამარჯვებული გუნდი:
                    </span>
                    <span className="text-emerald-400 font-extrabold">I ადგილი & ჩემპიონის თასი</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs font-semibold text-amber-400/90">🏆 საღამოს მთავარი დაპირისპირება</span>
                <Link
                  href="/match/m-final"
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black text-xs shadow-md transition-all"
                >
                  <span>ფინალის ბარათი</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Fan Support & Weather Appeal Notice */}
          <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-rose-950/40 via-slate-900/90 to-amber-950/40 border border-rose-500/40 shadow-lg">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
              <div className="p-3 rounded-2xl bg-rose-600/20 border border-rose-500/40 text-rose-400 shrink-0">
                <Heart className="w-6 h-6 fill-rose-500/30 text-rose-400 animate-pulse" />
              </div>

              <div className="space-y-1 text-left flex-1">
                <div className="text-sm sm:text-base font-extrabold text-white flex items-center gap-2 flex-wrap">
                  <span>მიმართვა გულშემატკივრებს! ❤️⚽️</span>
                  <span className="text-xs font-normal text-rose-300">თქვენი მხარდაჭერა გუნდებისთვის უმნიშვნელოვანესია!</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  გთხოვთ, მცირე წვიმის გამო ნუ დატოვებთ სტადიონს <CloudRain className="w-4 h-4 text-cyan-400 inline mx-0.5" /> — 
                  ნებისმიერ შემთხვევაში, <strong>შაბათს აუცილებლად გაირკვევა ტურნირის გამარჯვებულის ვინაობა! 🏆🔥</strong> 
                  ერთად შევქმნათ ნამდვილი საფეხბურთო დღესასწაული! <strong>გელოდებით სტადიონზე! 🙌</strong>
                </p>
              </div>

              <div className="shrink-0 pt-2 sm:pt-0 w-full sm:w-auto">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 text-xs font-bold text-slate-300 border border-slate-700 w-full sm:w-auto justify-center">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  <span>შილდის სტადიონი</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
