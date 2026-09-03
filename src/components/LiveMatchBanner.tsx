'use client';

import React from 'react';
import Link from 'next/link';
import { useTournament } from '@/lib/store';
import { Flame, Clock, Calendar, Shield, ArrowRight } from 'lucide-react';

export default function LiveMatchBanner() {
  const { liveMatch, teamMap } = useTournament();

  if (!liveMatch) return null;

  const homeTeamLive = teamMap.get(liveMatch.homeTeamId);
  const awayTeamLive = teamMap.get(liveMatch.awayTeamId);

  return (
    <section id="live-section" className="scroll-mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-950/80 via-slate-900/95 to-red-950/70 border-2 border-rose-600/60 shadow-2xl shadow-rose-950/60 backdrop-blur-xl">
          {/* Animated red ambient blur */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-rose-600/20 rounded-full blur-3xl pointer-events-none" />

          {/* Top header row */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-rose-800/40 bg-rose-950/50">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-rose-600 text-white text-xs font-black tracking-wider uppercase shadow-md">
                <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
                LIVE
              </span>

              {/* Match Period Status Badge */}
              {liveMatch.matchPeriod === 'penalties' ? (
                <span className="px-3 py-1 rounded-full bg-amber-500 text-slate-950 text-xs font-extrabold shadow-md flex items-center gap-1.5 animate-pulse">
                  <span>⚽ პენალტების სერია</span>
                </span>
              ) : liveMatch.matchPeriod === 'half_time' ? (
                <span className="px-3 py-1 rounded-full bg-amber-500 text-slate-950 text-xs font-extrabold shadow-md flex items-center gap-1.5">
                  <span>⏸ შესვენება (I ტაიმი დასრულდა)</span>
                </span>
              ) : liveMatch.matchPeriod === '2nd_half' ? (
                <span className="px-3 py-1 rounded-full bg-rose-500/30 text-rose-200 border border-rose-400/50 text-xs font-extrabold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping" />
                  <span>II ტაიმი</span>
                </span>
              ) : (
                <span className="px-3 py-1 rounded-full bg-rose-500/30 text-rose-200 border border-rose-400/50 text-xs font-extrabold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping" />
                  <span>I ტაიმი</span>
                </span>
              )}

              <span className="text-xs font-semibold text-rose-200/80 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {liveMatch.scheduledAt}
              </span>
            </div>

            <div className="text-xs font-bold text-slate-300">
              {liveMatch.roundType === 'group'
                ? liveMatch.groupId === 'group-a'
                  ? 'A ჯგუფი'
                  : 'B ჯგუფი'
                : 'პლეი-ოფი'}
            </div>
          </div>

          {/* Scoreboard Arena */}
          <div className="p-6 sm:p-10">
            <div className="grid grid-cols-3 items-center text-center gap-2 sm:gap-6">
              {/* Home Team */}
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-2xl bg-slate-800/90 border border-slate-700/80 flex items-center justify-center mb-2 sm:mb-3 shadow-lg group hover:scale-105 transition-transform">
                  <Shield className="w-7 h-7 sm:w-10 sm:h-10 text-emerald-400" />
                </div>
                <h3 className="text-base sm:text-2xl font-black text-white tracking-tight leading-snug">
                  {homeTeamLive?.name || 'გუნდი 1'}
                </h3>
              </div>

              {/* Score Display */}
              <div className="flex flex-col items-center justify-center">
                <div className="flex items-center gap-2 sm:gap-4 px-4 py-2 sm:px-6 sm:py-3 rounded-2xl bg-black/60 border border-rose-500/40 shadow-inner">
                  <span className="text-4xl sm:text-6xl font-black text-rose-400 font-mono tracking-tighter">
                    {liveMatch.homeScore}
                  </span>
                  <span className="text-2xl sm:text-4xl font-bold text-slate-500">:</span>
                  <span className="text-4xl sm:text-6xl font-black text-rose-400 font-mono tracking-tighter">
                    {liveMatch.awayScore}
                  </span>
                </div>

                {liveMatch.homePenaltyScore !== undefined && liveMatch.awayPenaltyScore !== undefined ? (
                  <div className="mt-2 px-3 py-1 rounded-xl bg-amber-950/80 border border-amber-500/40 text-amber-300 font-mono text-xs font-black">
                    ⚽ პენალტები: {liveMatch.homePenaltyScore} - {liveMatch.awayPenaltyScore}
                  </div>
                ) : (
                  <span className="mt-2 text-xs font-extrabold uppercase text-rose-400/90 tracking-widest animate-pulse">
                    პირდაპირი ეთერი
                  </span>
                )}
              </div>

              {/* Away Team */}
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-2xl bg-slate-800/90 border border-slate-700/80 flex items-center justify-center mb-2 sm:mb-3 shadow-lg group hover:scale-105 transition-transform">
                  <Shield className="w-7 h-7 sm:w-10 sm:h-10 text-cyan-400" />
                </div>
                <h3 className="text-base sm:text-2xl font-black text-white tracking-tight leading-snug">
                  {awayTeamLive?.name || 'გუნდი 2'}
                </h3>
              </div>
            </div>

            {/* Bottom action */}
            <div className="mt-6 pt-4 border-t border-slate-800/60 flex justify-center">
              <Link
                href={`/match/${liveMatch.id}`}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-rose-300 hover:text-white bg-rose-950/60 hover:bg-rose-900/60 px-4 py-2 rounded-xl border border-rose-800/50 transition-colors"
              >
                <span>მატჩის დეტალური გვერდი</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
