'use client';

import React from 'react';
import { useTournament } from '@/lib/store';
import { KnockoutMatchView } from '@/lib/types';
import { Trophy, Shield, Award, Sparkles, CheckCircle2 } from 'lucide-react';

export default function KnockoutBracket() {
  const { knockoutBracket } = useTournament();
  const { quarterFinals, semiFinals, final, thirdPlace } = knockoutBracket;

  const renderMatchCard = (m: KnockoutMatchView, isFinal = false) => {
    const isFinished = m.status === 'finished';
    const isLive = m.status === 'live';
    const hasWinner = Boolean(m.winnerTeamId);

    return (
      <div
        key={m.id}
        className={`w-full rounded-2xl border transition-all duration-200 overflow-hidden ${
          isFinal
            ? 'bg-gradient-to-b from-amber-950/40 via-slate-900 to-slate-950 border-amber-500/50 shadow-xl shadow-amber-950/40'
            : isLive
            ? 'bg-rose-950/30 border-rose-500/70 shadow-lg shadow-rose-950/40'
            : 'glass-panel border-slate-800/90 hover:border-slate-700'
        }`}
      >
        {/* Match Header */}
        <div
          className={`px-3 py-1.5 text-[11px] font-bold flex items-center justify-between border-b ${
            isFinal
              ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
              : isLive
              ? 'bg-rose-600 text-white animate-pulse'
              : 'bg-slate-900/80 text-slate-400 border-slate-800'
          }`}
        >
          <span className="flex items-center gap-1.5">
            {isFinal ? <Trophy className="w-3.5 h-3.5 text-amber-400" /> : null}
            {m.title}
          </span>
          <div className="flex items-center gap-2">
            {m.homePenaltyScore !== undefined && m.awayPenaltyScore !== undefined ? (
              <span className="text-[10px] font-extrabold text-amber-400 bg-amber-500/20 px-1.5 py-0.5 rounded border border-amber-500/30">
                პენ. {m.homePenaltyScore}:{m.awayPenaltyScore}
              </span>
            ) : null}
            <span>
              {isLive ? 'LIVE' : isFinished ? 'FT' : m.scheduledAt || 'TBD'}
            </span>
          </div>
        </div>

        {/* Teams & Scores */}
        <div className="p-3 space-y-2">
          {/* Home Team */}
          <div
            className={`flex items-center justify-between p-2 rounded-xl transition-colors ${
              m.winnerTeamId === m.homeTeam?.id
                ? 'bg-emerald-950/60 border border-emerald-500/40'
                : 'bg-slate-900/40'
            }`}
          >
            <div className="flex items-center gap-2 truncate pr-2">
              <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
              <span
                className={`text-xs sm:text-sm font-bold truncate ${
                  m.homeTeam ? 'text-white' : 'text-slate-500 italic'
                }`}
              >
                {m.homeTeam?.name || m.homePlaceholder}
              </span>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <span
                className={`font-mono text-sm font-black px-2 py-0.5 rounded ${
                  m.winnerTeamId === m.homeTeam?.id
                    ? 'bg-emerald-500 text-black'
                    : 'text-slate-300'
                }`}
              >
                {m.homeScore !== undefined ? m.homeScore : '-'}
              </span>
              {m.homePenaltyScore !== undefined && (
                <span className="font-mono text-xs font-bold text-amber-400 bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-500/30">
                  ({m.homePenaltyScore})
                </span>
              )}
            </div>
          </div>

          {/* Away Team */}
          <div
            className={`flex items-center justify-between p-2 rounded-xl transition-colors ${
              m.winnerTeamId === m.awayTeam?.id
                ? 'bg-emerald-950/60 border border-emerald-500/40'
                : 'bg-slate-900/40'
            }`}
          >
            <div className="flex items-center gap-2 truncate pr-2">
              <Shield className="w-4 h-4 text-cyan-400 shrink-0" />
              <span
                className={`text-xs sm:text-sm font-bold truncate ${
                  m.awayTeam ? 'text-white' : 'text-slate-500 italic'
                }`}
              >
                {m.awayTeam?.name || m.awayPlaceholder}
              </span>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <span
                className={`font-mono text-sm font-black px-2 py-0.5 rounded ${
                  m.winnerTeamId === m.awayTeam?.id
                    ? 'bg-emerald-500 text-black'
                    : 'text-slate-300'
                }`}
              >
                {m.awayScore !== undefined ? m.awayScore : '-'}
              </span>
              {m.awayPenaltyScore !== undefined && (
                <span className="font-mono text-xs font-bold text-amber-400 bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-500/30">
                  ({m.awayPenaltyScore})
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="playoff-section" className="scroll-mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-semibold text-amber-400 mb-2">
          <Award className="w-3.5 h-3.5" />
          <span>პლეი-ოფის ეტაპი (ოლიმპიური სისტემა)</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          პლეი-ოფის ბადე (Knockout Bracket)
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 mt-1.5 leading-relaxed">
          ტურნირის პლეი-ოფში გადის თითოეული ჯგუფიდან 4 საუკეთესო გუნდი (<strong>A1 vs B4</strong>, <strong>A2 vs B3</strong>, <strong>A3 vs B2</strong>, <strong>A4 vs B1</strong>).
          ყველა ეტაპი ტარდება <strong>1 მატჩიანი ფორმატით</strong>.
        </p>
      </div>

      {/* Horizontally scrollable on small mobile, structured grid on desktop */}
      <div className="overflow-x-auto custom-scrollbar pb-6">
        <div className="min-w-[860px] grid grid-cols-3 gap-6 items-center">
          {/* Column 1: Quarter Finals (4 matches) */}
          <div className="space-y-4">
            <div className="text-center pb-2 border-b border-slate-800">
              <span className="text-xs font-extrabold text-slate-300 uppercase tracking-wider">
                1/4 ფინალი (4 მატჩი)
              </span>
            </div>
            <div className="space-y-3.5">
              {quarterFinals.map((qf) => renderMatchCard(qf))}
            </div>
          </div>

          {/* Column 2: Semi Finals (2 matches) */}
          <div className="space-y-6">
            <div className="text-center pb-2 border-b border-slate-800">
              <span className="text-xs font-extrabold text-slate-300 uppercase tracking-wider">
                1/2 ფინალი (2 მატჩი)
              </span>
            </div>
            <div className="space-y-8 pt-4">
              {semiFinals.map((sf) => renderMatchCard(sf))}
            </div>
          </div>

          {/* Column 3: Final & Third Place */}
          <div className="space-y-6">
            <div className="text-center pb-2 border-b border-amber-500/40">
              <span className="text-xs font-black text-amber-400 uppercase tracking-wider flex items-center justify-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                ფინალური ეტაპი
              </span>
            </div>
            <div className="space-y-6 pt-2">
              {/* Grand Final */}
              <div>
                {renderMatchCard(final, true)}
              </div>

              {/* 3rd Place Match */}
              <div>
                {renderMatchCard(thirdPlace)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
