'use client';

import React from 'react';
import { useTournament } from '@/lib/store';
import { CheckCircle2, Circle } from 'lucide-react';

export default function TournamentTimeline() {
  const { matches } = useTournament();

  const hasKnockoutStarted = matches.some(
    (m) => m.roundType !== 'group' && (m.status === 'live' || m.status === 'finished')
  );

  const hasSemifinalsStarted = matches.some(
    (m) => (m.roundType === 'semi_final' || m.roundType === 'final') && (m.status === 'live' || m.status === 'finished')
  );

  const hasFinalStarted = matches.some(
    (m) => m.roundType === 'final' && (m.status === 'live' || m.status === 'finished')
  );

  const stages = [
    { name: 'ჯგუფური ეტაპი', active: true, completed: hasKnockoutStarted },
    { name: '1/4 ფინალი', active: hasKnockoutStarted, completed: hasSemifinalsStarted },
    { name: '1/2 ფინალი', active: hasSemifinalsStarted, completed: hasFinalStarted },
    { name: 'ფინალი & III ადგილი', active: hasFinalStarted, completed: false },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex items-center justify-between overflow-x-auto custom-scrollbar gap-4">
        {stages.map((stage, idx) => (
          <div key={stage.name} className="flex items-center gap-2.5 shrink-0">
            <div
              className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-black transition-colors ${
                stage.completed
                  ? 'bg-emerald-500 text-black'
                  : stage.active
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 animate-pulse'
                  : 'bg-slate-800 text-slate-500 border border-slate-700'
              }`}
            >
              {stage.completed ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
            </div>
            <span
              className={`text-xs sm:text-sm font-bold ${
                stage.active ? 'text-white' : 'text-slate-500'
              }`}
            >
              {stage.name}
            </span>
            {idx < stages.length - 1 && (
              <span className="text-slate-600 font-bold ml-2 hidden sm:inline">➔</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
