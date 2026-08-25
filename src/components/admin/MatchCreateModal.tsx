'use client';

import React, { useState } from 'react';
import { useTournament } from '@/lib/store';
import { MatchStatus, RoundType } from '@/lib/types';
import { X, Plus, Shield } from 'lucide-react';

interface MatchCreateModalProps {
  onClose: () => void;
}

export default function MatchCreateModal({ onClose }: MatchCreateModalProps) {
  const { teams, groups, tournament, createMatch } = useTournament();

  const [groupId, setGroupId] = useState<string>('group-a');
  const [homeTeamId, setHomeTeamId] = useState<string>(teams[0]?.id || '');
  const [awayTeamId, setAwayTeamId] = useState<string>(teams[1]?.id || '');
  const [scheduledAt, setScheduledAt] = useState<string>('19:00');
  const [matchDay, setMatchDay] = useState<number>(3);
  const [roundType, setRoundType] = useState<RoundType>('group');

  const filteredTeams = roundType === 'group'
    ? teams.filter((t) => t.groupId === groupId)
    : teams;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (homeTeamId === awayTeamId) {
      alert('გთხოვთ აირჩიოთ ორი განსხვავებული გუნდი');
      return;
    }

    createMatch({
      tournamentId: tournament.id,
      groupId: roundType === 'group' ? groupId : undefined,
      homeTeamId,
      awayTeamId,
      scheduledAt,
      status: 'scheduled',
      homeScore: 0,
      awayScore: 0,
      roundType,
      matchDay: Number(matchDay),
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg p-6 rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Plus className="w-5 h-5 text-emerald-400" />
            <h3 className="text-lg font-black text-white">ახალი მატჩის დამატება</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Round & Group */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1.5">
                ეტაპი / რაუნდი
              </label>
              <select
                value={roundType}
                onChange={(e) => setRoundType(e.target.value as RoundType)}
                className="w-full py-2.5 px-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-bold"
              >
                <option value="group">ჯგუფური ეტაპი</option>
                <option value="quarter_final">1/4 ფინალი</option>
                <option value="semi_final">1/2 ფინალი</option>
                <option value="final">ფინალი</option>
                <option value="third_place">III ადგილი</option>
              </select>
            </div>

            {roundType === 'group' && (
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1.5">
                  ჯგუფი
                </label>
                <select
                  value={groupId}
                  onChange={(e) => {
                    setGroupId(e.target.value);
                    const newFiltered = teams.filter((t) => t.groupId === e.target.value);
                    if (newFiltered.length >= 2) {
                      setHomeTeamId(newFiltered[0].id);
                      setAwayTeamId(newFiltered[1].id);
                    }
                  }}
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-bold"
                >
                  {groups.map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Teams Selection */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1.5">
                მასპინძელი გუნდი
              </label>
              <select
                value={homeTeamId}
                onChange={(e) => setHomeTeamId(e.target.value)}
                className="w-full py-2.5 px-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-bold"
              >
                {filteredTeams.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1.5">
                სტუმარი გუნდი
              </label>
              <select
                value={awayTeamId}
                onChange={(e) => setAwayTeamId(e.target.value)}
                className="w-full py-2.5 px-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-bold"
              >
                {filteredTeams.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Time & Day */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1.5">
                დაწყების დრო
              </label>
              <input
                type="text"
                value={scheduledAt}
                onChange={(e) => setScheduledAt(e.target.value)}
                placeholder="მაგ: 19:30"
                className="w-full py-2.5 px-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-bold"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1.5">
                სათამაშო დღე (Day)
              </label>
              <input
                type="number"
                min="1"
                max="10"
                value={matchDay}
                onChange={(e) => setMatchDay(parseInt(e.target.value) || 1)}
                className="w-full py-2.5 px-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-bold"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold"
            >
              გაუქმება
            </button>
            <button
              type="submit"
              className="py-2.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black shadow-lg shadow-emerald-950/60"
            >
              მატჩის დამატება
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
