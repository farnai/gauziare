'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useTournament } from '@/lib/store';
import { CheckCircle2, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';

export default function RecentResults() {
  const { finishedMatches, teamMap } = useTournament();
  const [selectedGroup, setSelectedGroup] = useState<'all' | 'group-a' | 'group-b'>('all');
  const [isOpen, setIsOpen] = useState(false);

  const filtered = finishedMatches.filter((m) => {
    if (selectedGroup === 'all') return true;
    return m.groupId === selectedGroup;
  });

  const displayList = [...filtered].reverse(); // newest first

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="glass-panel rounded-2xl border border-slate-800/80 p-4 sm:p-5 transition-all">
        {/* Header (Clickable Accordion) */}
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between cursor-pointer select-none group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="text-lg sm:text-xl font-black text-white tracking-tight group-hover:text-emerald-400 transition-colors">
                  ბოლო შედეგები
                </h2>
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-slate-800 text-slate-300 border border-slate-700">
                  {finishedMatches.length} მატჩი
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                დასრულებული მატჩების ოფიციალური ანგარიშები (ჯგუფი)
              </p>
            </div>
          </div>

          <button
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 text-xs font-bold text-slate-300 border border-slate-700 hover:bg-slate-700/80 hover:text-white transition-all shrink-0"
          >
            <span>{isOpen ? 'ჩაკეცვა' : 'ნახვა / გაშლა'}</span>
            {isOpen ? <ChevronUp className="w-4 h-4 text-emerald-400" /> : <ChevronDown className="w-4 h-4 text-emerald-400" />}
          </button>
        </div>

        {/* Collapsible Content */}
        {isOpen && (
          <div className="mt-6 pt-5 border-t border-slate-800/80 space-y-5 animate-fadeIn">
            {/* Group Filter Tabs */}
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="inline-flex p-1 rounded-xl bg-slate-900 border border-slate-800">
                <button
                  onClick={() => setSelectedGroup('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                    selectedGroup === 'all'
                      ? 'bg-emerald-600 text-white shadow'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  ყველა ({finishedMatches.length})
                </button>
                <button
                  onClick={() => setSelectedGroup('group-a')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                    selectedGroup === 'group-a'
                      ? 'bg-emerald-600 text-white shadow'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  A ჯგუფი
                </button>
                <button
                  onClick={() => setSelectedGroup('group-b')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                    selectedGroup === 'group-b'
                      ? 'bg-emerald-600 text-white shadow'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  B ჯგუფი
                </button>
              </div>
            </div>

            {displayList.length === 0 ? (
              <div className="p-8 text-center glass-panel rounded-2xl text-slate-400 text-sm">
                არჩეულ ჯგუფში დასრულებული მატჩები არ არის
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {displayList.map((match) => {
                  const home = teamMap.get(match.homeTeamId);
                  const away = teamMap.get(match.awayTeamId);

                  const isHomeWinner =
                    match.homeScore > match.awayScore ||
                    (match.homeScore === match.awayScore &&
                      match.homePenaltyScore !== undefined &&
                      match.awayPenaltyScore !== undefined &&
                      match.homePenaltyScore > match.awayPenaltyScore);

                  const isAwayWinner =
                    match.awayScore > match.homeScore ||
                    (match.homeScore === match.awayScore &&
                      match.homePenaltyScore !== undefined &&
                      match.awayPenaltyScore !== undefined &&
                      match.awayPenaltyScore > match.homePenaltyScore);

                  return (
                    <Link
                      key={match.id}
                      href={`/match/${match.id}`}
                      className="block p-4 rounded-2xl glass-panel hover:border-emerald-500/50 hover:bg-slate-800/70 border border-slate-800/80 transition-all duration-200 group"
                    >
                      <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 mb-2.5 pb-2 border-b border-slate-800/80">
                        <span>
                          {match.matchDay ? `დღე ${match.matchDay} • ` : ''}
                          {match.scheduledAt}
                        </span>
                        {match.homePenaltyScore !== undefined && match.awayPenaltyScore !== undefined ? (
                          <span className="px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 font-extrabold text-[10px] border border-amber-500/30">
                            პენ. {match.homePenaltyScore}:{match.awayPenaltyScore}
                          </span>
                        ) : (
                          <span className="px-1.5 py-0.5 rounded bg-slate-800 text-emerald-400 font-extrabold text-[10px]">
                            FT (დასრ.)
                          </span>
                        )}
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span
                            className={`text-sm font-bold truncate pr-2 ${
                              isHomeWinner ? 'text-white font-extrabold' : 'text-slate-400'
                            }`}
                          >
                            {home?.name || 'გუნდი 1'}
                          </span>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <span
                              className={`font-mono text-base font-black px-2 py-0.5 rounded ${
                                isHomeWinner ? 'bg-emerald-950/80 text-emerald-400' : 'text-slate-300'
                              }`}
                            >
                              {match.homeScore}
                            </span>
                            {match.homePenaltyScore !== undefined && (
                              <span className="font-mono text-xs font-bold text-amber-400 bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-500/30">
                                ({match.homePenaltyScore})
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <span
                            className={`text-sm font-bold truncate pr-2 ${
                              isAwayWinner ? 'text-white font-extrabold' : 'text-slate-400'
                            }`}
                          >
                            {away?.name || 'გუნდი 2'}
                          </span>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <span
                              className={`font-mono text-base font-black px-2 py-0.5 rounded ${
                                isAwayWinner ? 'bg-emerald-950/80 text-emerald-400' : 'text-slate-300'
                              }`}
                            >
                              {match.awayScore}
                            </span>
                            {match.awayPenaltyScore !== undefined && (
                              <span className="font-mono text-xs font-bold text-amber-400 bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-500/30">
                                ({match.awayPenaltyScore})
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="mt-2.5 pt-2 flex items-center justify-between text-[11px] font-bold text-slate-500 group-hover:text-emerald-400 transition-colors">
                        <span>სრული ანგარიში</span>
                        <ChevronRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
