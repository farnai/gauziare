'use client';

import React from 'react';
import Link from 'next/link';
import { useTournament } from '@/lib/store';
import { Clock, Shield, ChevronRight } from 'lucide-react';

export default function TodaysMatches() {
  const { matches, teamMap } = useTournament();

  // Show only upcoming or live matches (playoff / knockout stage)
  const activeOrUpcoming = matches.filter((m) => m.status !== 'finished');

  const getRoundLabel = (m: (typeof matches)[0]) => {
    if (m.roundType === 'quarter_final') {
      const qfNum = m.bracketPosition ? m.bracketPosition.replace('QF', '#') : '';
      return `1/4 ფინალი ${qfNum}`;
    }
    if (m.roundType === 'semi_final') {
      const sfNum = m.bracketPosition ? m.bracketPosition.replace('SF', '#') : '';
      return `1/2 ფინალი ${sfNum}`;
    }
    if (m.roundType === 'friendly') return '⚽ ამხანაგური მატჩი';
    if (m.roundType === 'final') return '🏆 დიდი ფინალი';
    if (m.roundType === 'third_place') return '🥉 III ადგილი';
    if (m.groupId === 'group-a') return 'A ჯგუფი';
    if (m.groupId === 'group-b') return 'B ჯგუფი';
    return 'პლეი-ოფი';
  };

  if (activeOrUpcoming.length === 0) return null;

  return (
    <section id="matches-section" className="scroll-mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
            საფინალო საღამოს განრიგი
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            შაბათი, 5 სექტემბერი • საფინალო საღამოს მატჩები შილდის სტადიონზე
          </p>
        </div>

        <span className="text-xs font-semibold text-slate-400 bg-slate-800/80 px-3 py-1 rounded-full border border-slate-700">
          {activeOrUpcoming.length} მატჩი
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {activeOrUpcoming.map((match) => {
          const home = teamMap.get(match.homeTeamId);
          const away = teamMap.get(match.awayTeamId);
          const isLive = match.status === 'live';
          const isFinished = match.status === 'finished';

          return (
            <Link
              key={match.id}
              href={`/match/${match.id}`}
              className={`block p-4 sm:p-5 rounded-2xl border transition-all duration-200 group ${
                isLive
                  ? 'bg-rose-950/40 border-rose-600/70 shadow-lg shadow-rose-950/40 hover:bg-rose-950/60'
                  : isFinished
                  ? 'glass-panel border-emerald-900/40 hover:border-emerald-700/60 hover:bg-slate-800/60'
                  : 'glass-panel hover:border-slate-600 hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center justify-between text-xs text-slate-400 mb-3 pb-2.5 border-b border-slate-800">
                <div className="flex items-center gap-1.5 font-bold">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{match.scheduledAt}</span>
                </div>

                {isLive ? (
                  <div className="flex items-center gap-1.5">
                    {match.matchPeriod === 'half_time' ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-500 text-slate-950 uppercase tracking-wider">
                        ⏸ შესვენება
                      </span>
                    ) : match.matchPeriod === '2nd_half' ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-rose-600 text-white uppercase tracking-wider animate-pulse flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-white" />
                        LIVE • II ტაიმი
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-rose-600 text-white uppercase tracking-wider animate-pulse flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-white" />
                        LIVE • I ტაიმი
                      </span>
                    )}
                  </div>
                ) : (
                  <span className="text-[11px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                    {getRoundLabel(match)}
                  </span>
                )}
              </div>

              {/* Match Teams Row */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-xs text-slate-300">
                      <Shield className="w-4 h-4 text-emerald-400" />
                    </div>
                    <span className="font-bold text-sm sm:text-base text-slate-100 group-hover:text-white transition-colors">
                      {home?.name || 'გუნდი 1'}
                    </span>
                  </div>
                  <span className={`font-mono text-base font-extrabold ${isFinished ? 'text-emerald-400' : isLive ? 'text-rose-400' : 'text-slate-200'}`}>
                    {isLive || isFinished ? match.homeScore : '-'}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-xs text-slate-300">
                      <Shield className="w-4 h-4 text-cyan-400" />
                    </div>
                    <span className="font-bold text-sm sm:text-base text-slate-100 group-hover:text-white transition-colors">
                      {away?.name || 'გუნდი 2'}
                    </span>
                  </div>
                  <span className={`font-mono text-base font-extrabold ${isFinished ? 'text-emerald-400' : isLive ? 'text-rose-400' : 'text-slate-200'}`}>
                    {isLive || isFinished ? match.awayScore : '-'}
                  </span>
                </div>
              </div>

              <div className="mt-3 pt-2 flex items-center justify-between text-[11px] font-bold text-slate-400 group-hover:text-emerald-400 transition-colors">
                <span>დეტალები</span>
                <ChevronRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
