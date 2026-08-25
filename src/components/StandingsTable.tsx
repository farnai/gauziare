'use client';

import React, { useState } from 'react';
import { useTournament } from '@/lib/store';
import { StandingsRow } from '@/lib/types';
import { Trophy, HelpCircle } from 'lucide-react';

export default function StandingsTable() {
  const { groupAStandings, groupBStandings, liveMatch } = useTournament();
  const [activeTab, setActiveTab] = useState<'A' | 'B'>('A');

  const renderTable = (rows: StandingsRow[], groupName: string) => {
    return (
      <div className="glass-panel rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="px-5 py-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center font-extrabold text-sm">
              {groupName.charAt(0)}
            </div>
            <div>
              <h3 className="font-extrabold text-white text-base sm:text-lg">{groupName}</h3>
              <span className="text-[11px] text-slate-400">ტოპ 4 გუნდი გადის 1/4 ფინალში</span>
            </div>
          </div>

          <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2.5 py-1 rounded-full">
            7 გუნდი
          </span>
        </div>

        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[540px]">
            <thead>
              <tr className="border-b border-slate-800/90 bg-slate-950/40 text-slate-400 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-3 w-10 text-center">#</th>
                <th className="py-3 px-3">გუნდი</th>
                <th className="py-3 px-2 text-center" title="ჩატარებული თამაშები">თ</th>
                <th className="py-3 px-2 text-center" title="მოგება">მ</th>
                <th className="py-3 px-2 text-center" title="ფრე">ფ</th>
                <th className="py-3 px-2 text-center" title="წაგება">წ</th>
                <th className="py-3 px-3 text-center" title="გატანილი : გაშვებული ბურთები">ბურთები</th>
                <th className="py-3 px-2 text-center" title="ბურთების სხვაობა">სხვ.</th>
                <th className="py-3 px-3 text-center font-extrabold text-white" title="ქულა (ლაივ რეჟიმში განახლებადი)">ქ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {rows.map((row) => {
                const isQual = row.isQualified;
                const diff = row.goalDifference;
                const isLivePlaying =
                  liveMatch &&
                  (liveMatch.homeTeamId === row.team.id || liveMatch.awayTeamId === row.team.id);

                return (
                  <tr
                    key={row.team.id}
                    className={`transition-colors ${
                      isLivePlaying
                        ? 'bg-rose-950/35 hover:bg-rose-950/50 border-l-4 border-rose-500'
                        : isQual
                        ? 'hover:bg-emerald-950/20 bg-slate-900/30'
                        : 'hover:bg-slate-800/30 opacity-80'
                    }`}
                  >
                    {/* Position */}
                    <td className="py-3 px-3 text-center font-mono">
                      <div className="flex items-center justify-center gap-1">
                        {isLivePlaying ? (
                          <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping shrink-0" />
                        ) : isQual ? (
                          <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                        ) : (
                          <span className="w-2 h-2 rounded-full bg-slate-600 shrink-0 opacity-40" />
                        )}
                        <span className={`font-bold ${isLivePlaying ? 'text-rose-300' : isQual ? 'text-white' : 'text-slate-400'}`}>
                          {row.position}
                        </span>
                      </div>
                    </td>

                    {/* Team Name with Live Dot */}
                    <td className="py-3 px-3 font-bold text-white">
                      <div className="flex items-center gap-2">
                        {isLivePlaying && (
                          <span className="relative flex h-2.5 w-2.5 shrink-0" title="გუნდი ამჟამად თამაშობს LIVE მატჩს">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
                          </span>
                        )}
                        <span className="text-sm tracking-tight">{row.team.name}</span>
                        {isLivePlaying && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-600 text-white font-black animate-pulse uppercase tracking-wider">
                            LIVE
                          </span>
                        )}
                        {row.position === 1 && !isLivePlaying && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                            ლიდერი
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Played */}
                    <td className="py-3 px-2 text-center font-medium text-slate-300">
                      {row.played}
                    </td>

                    {/* Wins */}
                    <td className="py-3 px-2 text-center font-semibold text-emerald-400">
                      {row.wins}
                    </td>

                    {/* Draws */}
                    <td className="py-3 px-2 text-center font-medium text-amber-400">
                      {row.draws}
                    </td>

                    {/* Losses */}
                    <td className="py-3 px-2 text-center font-medium text-rose-400">
                      {row.losses}
                    </td>

                    {/* Goals GF:GA */}
                    <td className="py-3 px-3 text-center font-mono text-slate-300 text-xs">
                      {row.goalsFor} : {row.goalsAgainst}
                    </td>

                    {/* Goal Difference */}
                    <td
                      className={`py-3 px-2 text-center font-mono font-bold text-xs ${
                        diff > 0
                          ? 'text-emerald-400'
                          : diff < 0
                          ? 'text-rose-400'
                          : 'text-slate-400'
                      }`}
                    >
                      {diff > 0 ? `+${diff}` : diff}
                    </td>

                    {/* Points */}
                    <td className="py-3 px-3 text-center">
                      <span className="inline-block px-2.5 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-black font-mono text-sm sm:text-base">
                        {row.points}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Table Footer / Qualification Info */}
        <div className="p-3 bg-slate-950/60 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>1-4 ადგილი: პლეი-ოფის საგზური (1/4 ფინალი)</span>
          </div>
          <div className="text-slate-500 font-mono">მოგება: 3ქ | ფრე: 1ქ | წაგება: 0ქ</div>
        </div>
      </div>
    );
  };

  return (
    <section id="standings-section" className="scroll-mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-semibold text-emerald-400 mb-2">
          <Trophy className="w-3.5 h-3.5" />
          <span>ჯგუფური ეტაპის ცხრილები</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          სატურნირო მდგომარეობა
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          ავტომატური გათვლა მატჩების შედეგებიდან. ტოპ 4 გუნდი კვალიფიცირდება პლეი-ოფში.
        </p>

        {/* Mobile Tab Switcher */}
        <div className="lg:hidden flex items-center justify-center gap-2 mt-4">
          <button
            onClick={() => setActiveTab('A')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
              activeTab === 'A'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/50'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            A ჯგუფი
          </button>
          <button
            onClick={() => setActiveTab('B')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
              activeTab === 'B'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/50'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            B ჯგუფი
          </button>
        </div>
      </div>

      {/* Desktop: 2 columns, Mobile: Tab views */}
      <div className="hidden lg:grid grid-cols-2 gap-6">
        <div>{renderTable(groupAStandings, 'A ჯგუფი')}</div>
        <div>{renderTable(groupBStandings, 'B ჯგუფი')}</div>
      </div>

      <div className="lg:hidden">
        {activeTab === 'A'
          ? renderTable(groupAStandings, 'A ჯგუფი')
          : renderTable(groupBStandings, 'B ჯგუფი')}
      </div>
    </section>
  );
}
