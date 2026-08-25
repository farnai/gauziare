'use client';

import React, { useState } from 'react';
import { Match, MatchStatus, RoundType } from '@/lib/types';
import { useTournament } from '@/lib/store';
import { X, Save, Trash2, Shield, Clock } from 'lucide-react';

interface MatchEditModalProps {
  match: Match;
  onClose: () => void;
}

export default function MatchEditModal({ match, onClose }: MatchEditModalProps) {
  const { teamMap, updateMatchDetails, deleteMatch } = useTournament();

  const [homeScore, setHomeScore] = useState(match.homeScore);
  const [awayScore, setAwayScore] = useState(match.awayScore);
  const [homePenaltyScore, setHomePenaltyScore] = useState<number | ''>(
    match.homePenaltyScore !== undefined ? match.homePenaltyScore : ''
  );
  const [awayPenaltyScore, setAwayPenaltyScore] = useState<number | ''>(
    match.awayPenaltyScore !== undefined ? match.awayPenaltyScore : ''
  );
  const [hasPenalties, setHasPenalties] = useState<boolean>(
    match.hasPenalties || Boolean(match.homePenaltyScore !== undefined && match.awayPenaltyScore !== undefined)
  );
  const [scheduledAt, setScheduledAt] = useState(match.scheduledAt);
  const [status, setStatus] = useState<MatchStatus>(match.status);
  const [roundType, setRoundType] = useState<RoundType>(match.roundType);
  const [matchDay, setMatchDay] = useState(match.matchDay || 1);

  const home = teamMap.get(match.homeTeamId);
  const away = teamMap.get(match.awayTeamId);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateMatchDetails({
      id: match.id,
      homeScore: Number(homeScore),
      awayScore: Number(awayScore),
      homePenaltyScore: hasPenalties && homePenaltyScore !== '' ? Number(homePenaltyScore) : undefined,
      awayPenaltyScore: hasPenalties && awayPenaltyScore !== '' ? Number(awayPenaltyScore) : undefined,
      hasPenalties,
      scheduledAt,
      status,
      roundType,
      matchDay: Number(matchDay),
    });
    onClose();
  };

  const handleDelete = () => {
    if (confirm('ნამდვილად გსურთ ამ მატჩის წაშლა?')) {
      deleteMatch(match.id);
      onClose();
    }
  };

  const isKnockout = roundType !== 'group';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg p-6 rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-black text-white">მატჩის რედაქტირება / კორექტირება</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          {/* Teams Header */}
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center justify-between text-sm font-bold text-white">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>{home?.name || 'გუნდი 1'}</span>
            </div>
            <span className="text-slate-500 font-normal">VS</span>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-cyan-400" />
              <span>{away?.name || 'გუნდი 2'}</span>
            </div>
          </div>

          {/* Main Scores input */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1.5">
                {home?.name || 'გუნდი 1'} (ძირითადი გოლი)
              </label>
              <input
                type="number"
                min="0"
                value={homeScore}
                onChange={(e) => setHomeScore(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full py-2.5 px-3 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-lg font-bold text-center"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1.5">
                {away?.name || 'გუნდი 2'} (ძირითადი გოლი)
              </label>
              <input
                type="number"
                min="0"
                value={awayScore}
                onChange={(e) => setAwayScore(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full py-2.5 px-3 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-lg font-bold text-center"
              />
            </div>
          </div>

          {/* Penalty Shootout Section */}
          {(isKnockout || homeScore === awayScore || hasPenalties) && (
            <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-black text-amber-300">
                  <input
                    type="checkbox"
                    checked={hasPenalties}
                    onChange={(e) => setHasPenalties(e.target.checked)}
                    className="w-4 h-4 rounded text-amber-500 focus:ring-amber-500 bg-slate-900 border-slate-700"
                  />
                  <span>⚽ პენალტების სერია (Penalty Shootout)</span>
                </label>
              </div>

              {hasPenalties && (
                <div className="grid grid-cols-2 gap-4 pt-1">
                  <div>
                    <label className="block text-[11px] font-bold text-amber-300 mb-1">
                      {home?.name} (პენალტები)
                    </label>
                    <input
                      type="number"
                      min="0"
                      placeholder="0"
                      value={homePenaltyScore}
                      onChange={(e) =>
                        setHomePenaltyScore(e.target.value === '' ? '' : Math.max(0, parseInt(e.target.value) || 0))
                      }
                      className="w-full py-2 px-3 rounded-xl bg-slate-950 border border-amber-500/50 text-amber-300 font-mono text-base font-bold text-center"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-amber-300 mb-1">
                      {away?.name} (პენალტები)
                    </label>
                    <input
                      type="number"
                      min="0"
                      placeholder="0"
                      value={awayPenaltyScore}
                      onChange={(e) =>
                        setAwayPenaltyScore(e.target.value === '' ? '' : Math.max(0, parseInt(e.target.value) || 0))
                      }
                      className="w-full py-2 px-3 rounded-xl bg-slate-950 border border-amber-500/50 text-amber-300 font-mono text-base font-bold text-center"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Status & Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1.5">
                სტატუსი
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as MatchStatus)}
                className="w-full py-2.5 px-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-bold"
              >
                <option value="scheduled">დაგეგმილი (scheduled)</option>
                <option value="live">🔴 LIVE</option>
                <option value="finished">დასრულებული (finished)</option>
                <option value="postponed">გადადებული (postponed)</option>
                <option value="cancelled">გაუქმებული (cancelled)</option>
              </select>
            </div>

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
              />
            </div>
          </div>

          {/* Round & Match Day */}
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

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={handleDelete}
              className="py-2.5 px-4 rounded-xl bg-rose-950/60 hover:bg-rose-900 text-rose-300 text-xs font-bold flex items-center gap-1.5 border border-rose-800"
            >
              <Trash2 className="w-4 h-4" />
              <span>წაშლა</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold"
              >
                გაუქმება
              </button>

              <button
                type="submit"
                className="py-2.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black flex items-center gap-1.5 shadow-lg shadow-emerald-950/60"
              >
                <Save className="w-4 h-4" />
                <span>შენახვა</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
