'use client';

import React, { useState } from 'react';
import AdminAuthGuard from '@/components/admin/AdminAuthGuard';
import AdminNav from '@/components/admin/AdminNav';
import MatchEditModal from '@/components/admin/MatchEditModal';
import MatchCreateModal from '@/components/admin/MatchCreateModal';
import { useTournament } from '@/lib/store';
import { Match, MatchStatus } from '@/lib/types';
import {
  Plus,
  Search,
  Filter,
  Edit2,
  Play,
  CheckCircle2,
  Clock,
  Shield,
  Trash2,
} from 'lucide-react';

export default function AdminMatchesPage() {
  const { matches, teamMap, startMatch, finishMatch, deleteMatch } = useTournament();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedGroup, setSelectedGroup] = useState<string>('all');
  const [selectedDay, setSelectedDay] = useState<string>('all');

  const [editingMatch, setEditingMatch] = useState<Match | null>(null);
  const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);

  const filteredMatches = matches.filter((m) => {
    const home = teamMap.get(m.homeTeamId)?.name.toLowerCase() || '';
    const away = teamMap.get(m.awayTeamId)?.name.toLowerCase() || '';
    const q = searchQuery.toLowerCase().trim();

    if (q && !home.includes(q) && !away.includes(q)) return false;
    if (selectedStatus !== 'all' && m.status !== selectedStatus) return false;
    if (selectedGroup !== 'all' && m.groupId !== selectedGroup) return false;
    if (selectedDay !== 'all' && String(m.matchDay) !== selectedDay) return false;

    return true;
  });

  return (
    <AdminAuthGuard>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <AdminNav />

        {/* Top Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-black text-white">მატჩების მართვა</h2>
            <p className="text-xs text-slate-400">
              სრული კალენდარი, ანგარიშების კორექტირება და ახალი თამაშების დამატება
            </p>
          </div>

          <button
            onClick={() => setCreateModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-emerald-950/60 transition-all self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>ახალი მატჩის დამატება</span>
          </button>
        </div>

        {/* Filter Controls */}
        <div className="glass-panel p-4 rounded-2xl border border-slate-800 space-y-3 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            {/* Search */}
            <div className="relative sm:col-span-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="ძებნა გუნდით..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs"
              />
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full py-2 px-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs"
              >
                <option value="all">ყველა სტატუსი</option>
                <option value="scheduled">დაგეგმილი</option>
                <option value="live">LIVE</option>
                <option value="finished">დასრულებული</option>
                <option value="postponed">გადადებული</option>
              </select>
            </div>

            {/* Group Filter */}
            <div>
              <select
                value={selectedGroup}
                onChange={(e) => setSelectedGroup(e.target.value)}
                className="w-full py-2 px-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs"
              >
                <option value="all">ყველა ჯგუფი</option>
                <option value="group-a">A ჯგუფი</option>
                <option value="group-b">B ჯგუფი</option>
              </select>
            </div>

            {/* Day Filter */}
            <div>
              <select
                value={selectedDay}
                onChange={(e) => setSelectedDay(e.target.value)}
                className="w-full py-2 px-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs"
              >
                <option value="all">ყველა სათამაშო დღე</option>
                <option value="1">დღე 1</option>
                <option value="2">დღე 2</option>
                <option value="3">დღე 3</option>
              </select>
            </div>
          </div>
        </div>

        {/* Matches List */}
        <div className="space-y-3">
          {filteredMatches.length === 0 ? (
            <div className="p-8 text-center glass-panel rounded-2xl text-slate-400 text-sm">
              მატჩები ვერ მოიძებნა
            </div>
          ) : (
            filteredMatches.map((m) => {
              const home = teamMap.get(m.homeTeamId);
              const away = teamMap.get(m.awayTeamId);
              const isLive = m.status === 'live';
              const isFinished = m.status === 'finished';

              return (
                <div
                  key={m.id}
                  className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all ${
                    isLive
                      ? 'bg-rose-950/40 border-rose-600/70'
                      : isFinished
                      ? 'bg-slate-900/60 border-slate-800'
                      : 'glass-panel border-slate-800'
                  }`}
                >
                  {/* Left: Details */}
                  <div className="flex items-center gap-3">
                    <div className="text-center w-14 py-1.5 px-2 rounded-xl bg-slate-950 border border-slate-800 shrink-0">
                      <div className="text-xs font-bold text-white font-mono">{m.scheduledAt}</div>
                      <div className="text-[10px] text-slate-500 font-semibold">
                        {m.matchDay ? `დღე ${m.matchDay}` : ''}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 text-sm font-extrabold text-white">
                        <span className="text-emerald-400">{home?.name || 'გუნდი 1'}</span>
                        <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 font-mono text-sm">
                          {isLive || isFinished ? `${m.homeScore} : ${m.awayScore}` : 'vs'}
                        </span>
                        <span className="text-cyan-400">{away?.name || 'გუნდი 2'}</span>
                      </div>

                      <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400">
                        <span>
                          {m.groupId === 'group-a' ? 'A ჯგუფი' : m.groupId === 'group-b' ? 'B ჯგუფი' : 'პლეი-ოფი'}
                        </span>
                        <span>•</span>
                        {isLive && (
                          <span className="text-rose-400 font-bold uppercase animate-pulse">
                            🔴 LIVE
                          </span>
                        )}
                        {isFinished && (
                          <span className="text-emerald-400 font-bold">დასრულებული (FT)</span>
                        )}
                        {m.status === 'scheduled' && <span>დაგეგმილი</span>}
                        {m.status === 'postponed' && (
                          <span className="text-amber-400">გადადებული</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right: Action Buttons */}
                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    {m.status === 'scheduled' && (
                      <button
                        onClick={() => startMatch(m.id)}
                        className="py-1.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1 shadow"
                      >
                        <Play className="w-3.5 h-3.5 fill-white" />
                        <span>დაწყება</span>
                      </button>
                    )}

                    {isLive && (
                      <button
                        onClick={() => finishMatch(m.id)}
                        className="py-1.5 px-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-1 shadow"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>დასრულება</span>
                      </button>
                    )}

                    <button
                      onClick={() => setEditingMatch(m)}
                      className="py-1.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1 border border-slate-700"
                    >
                      <Edit2 className="w-3.5 h-3.5 text-amber-400" />
                      <span>რედაქტირება</span>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Modals */}
        {editingMatch && (
          <MatchEditModal match={editingMatch} onClose={() => setEditingMatch(null)} />
        )}

        {createModalOpen && <MatchCreateModal onClose={() => setCreateModalOpen(false)} />}
      </div>
    </AdminAuthGuard>
  );
}
