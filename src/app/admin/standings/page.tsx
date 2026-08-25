'use client';

import React from 'react';
import AdminAuthGuard from '@/components/admin/AdminAuthGuard';
import AdminNav from '@/components/admin/AdminNav';
import { useTournament } from '@/lib/store';
import { StandingsRow } from '@/lib/types';
import { Trophy, HelpCircle, CheckCircle2, Shield } from 'lucide-react';

export default function AdminStandingsPage() {
  const { groupAStandings, groupBStandings, tournament } = useTournament();

  const renderAdminTable = (rows: StandingsRow[], title: string) => {
    return (
      <div className="glass-panel rounded-3xl border border-slate-800 overflow-hidden mb-6">
        <div className="px-5 py-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Trophy className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base sm:text-lg font-black text-white">{title}</h3>
          </div>
          <span className="text-xs font-semibold text-slate-400">
            კვალიფიკაცია: ტოპ {tournament.qualificationCount}
          </span>
        </div>

        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[550px]">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/40 text-slate-400 font-bold uppercase text-[10px]">
                <th className="py-3 px-3 text-center w-10">ადგილი</th>
                <th className="py-3 px-3">გუნდი</th>
                <th className="py-3 px-2 text-center">თ</th>
                <th className="py-3 px-2 text-center">მ</th>
                <th className="py-3 px-2 text-center">ფ</th>
                <th className="py-3 px-2 text-center">წ</th>
                <th className="py-3 px-3 text-center">გატ/გაშ</th>
                <th className="py-3 px-2 text-center">სხვაობა</th>
                <th className="py-3 px-3 text-center font-extrabold text-white">ქულა</th>
                <th className="py-3 px-3 text-center">სტატუსი</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {rows.map((row) => (
                <tr
                  key={row.team.id}
                  className={row.isQualified ? 'bg-emerald-950/20' : 'bg-slate-900/20'}
                >
                  <td className="py-3 px-3 text-center font-bold font-mono">
                    {row.position}
                  </td>
                  <td className="py-3 px-3 font-extrabold text-white">
                    {row.team.name}
                  </td>
                  <td className="py-3 px-2 text-center text-slate-300">{row.played}</td>
                  <td className="py-3 px-2 text-center text-emerald-400 font-bold">{row.wins}</td>
                  <td className="py-3 px-2 text-center text-amber-400 font-bold">{row.draws}</td>
                  <td className="py-3 px-2 text-center text-rose-400 font-bold">{row.losses}</td>
                  <td className="py-3 px-3 text-center font-mono text-slate-300">
                    {row.goalsFor} : {row.goalsAgainst}
                  </td>
                  <td className="py-3 px-2 text-center font-mono font-bold">
                    {row.goalDifference > 0 ? `+${row.goalDifference}` : row.goalDifference}
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className="px-2 py-1 rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono font-black text-sm">
                      {row.points}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center">
                    {row.isQualified ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                        1/4 ფინალისტი
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-500 font-medium">გარეთ</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <AdminAuthGuard>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <AdminNav />

        <div className="mb-6">
          <h2 className="text-xl font-black text-white">სატურნირო ცხრილების აუდიტი</h2>
          <p className="text-xs text-slate-400">
            ცხრილის დათვლის წესები: მოგება = 3ქ, ფრე = 1ქ, წაგება = 0ქ.
            თანაბარი ქულებისას პრიორიტეტი ენიჭება: ბურთების სხვაობას, გატანილ ბურთებს და ურთიერთშეხვედრას.
          </p>
        </div>

        {renderAdminTable(groupAStandings, 'A ჯგუფის დეტალური ცხრილი')}
        {renderAdminTable(groupBStandings, 'B ჯგუფის დეტალური ცხრილი')}
      </div>
    </AdminAuthGuard>
  );
}
