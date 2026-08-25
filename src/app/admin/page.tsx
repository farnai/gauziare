'use client';

import React from 'react';
import AdminAuthGuard from '@/components/admin/AdminAuthGuard';
import AdminNav from '@/components/admin/AdminNav';
import MobileScoreController from '@/components/admin/MobileScoreController';
import { useTournament } from '@/lib/store';
import { Users, Calendar, Trophy, Flame } from 'lucide-react';

export default function AdminPage() {
  const { matches, teams, liveMatch } = useTournament();

  const totalTeams = teams.length;
  const groupACount = teams.filter((t) => t.groupId === 'group-a').length;
  const groupBCount = teams.filter((t) => t.groupId === 'group-b').length;
  const playedCount = matches.filter((m) => m.status === 'finished').length;
  const upcomingCount = matches.filter((m) => m.status === 'scheduled').length;

  return (
    <AdminAuthGuard>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <AdminNav />

        {/* Tournament Summary KPI Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className="p-4 rounded-2xl glass-panel border border-slate-800 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase">გუნდები</div>
              <div className="text-base font-extrabold text-white">
                {totalTeams} (A:{groupACount} / B:{groupBCount})
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl glass-panel border border-slate-800 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase">ჩატარებული</div>
              <div className="text-base font-extrabold text-emerald-400 font-mono">
                {playedCount} მატჩი
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl glass-panel border border-slate-800 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase">დაგეგმილი</div>
              <div className="text-base font-extrabold text-amber-400 font-mono">
                {upcomingCount} მატჩი
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl glass-panel border border-slate-800 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase">LIVE სტატუსი</div>
              <div className="text-sm font-extrabold text-white">
                {liveMatch ? (
                  <span className="text-rose-400 animate-pulse font-bold">1 აქტიური</span>
                ) : (
                  <span className="text-slate-400 font-semibold">მოლოდინი</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Fast Match Referee Controller */}
        <MobileScoreController />
      </div>
    </AdminAuthGuard>
  );
}
