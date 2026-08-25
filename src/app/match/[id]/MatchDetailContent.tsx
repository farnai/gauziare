'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTournament } from '@/lib/store';
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Shield,
  Trophy,
  Share2,
  CheckCircle2,
  Flame,
} from 'lucide-react';

export default function MatchDetailContent({ id }: { id?: string }) {
  const params = useParams();
  const router = useRouter();
  const { matches, teamMap, tournament, addToast } = useTournament();

  const matchId = (id || params?.id) as string;
  const match = matches.find((m) => m.id === matchId);

  if (!match) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="p-8 rounded-3xl glass-panel border border-slate-800">
          <h2 className="text-xl font-bold text-white mb-2">მატჩი ვერ მოიძებნა</h2>
          <p className="text-slate-400 text-sm mb-6">
            მითითებული იდენტიფიკატორით მატჩი არ არსებობს ან წაშლილია.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>მთავარ გვერდზე დაბრუნება</span>
          </Link>
        </div>
      </div>
    );
  }

  const home = teamMap.get(match.homeTeamId);
  const away = teamMap.get(match.awayTeamId);
  const isLive = match.status === 'live';
  const isFinished = match.status === 'finished';

  const handleShare = () => {
    if (typeof window !== 'undefined' && navigator.share) {
      navigator
        .share({
          title: `${home?.name || 'გუნდი 1'} vs ${away?.name || 'გუნდი 2'} — გაუზიარე მომავალს`,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      addToast('success', 'ბმული დაკოპირდა', 'გაუზიარეთ მატჩის შედეგი მეგობრებს');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>უკან დაბრუნება</span>
        </button>

        <button
          onClick={handleShare}
          className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors border border-slate-700"
          title="გაზიარება"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      {/* Main Scoreboard Card */}
      <div className="relative rounded-3xl glass-panel border border-slate-800 overflow-hidden shadow-2xl p-6 sm:p-10 mb-8 text-center">
        {/* Match Stage & Badge */}
        <div className="flex items-center justify-center gap-2 mb-6 flex-wrap">
          <span className="text-xs font-bold text-slate-400 bg-slate-900/80 border border-slate-800 px-3 py-1 rounded-full uppercase tracking-wider">
            {match.matchDay ? `ტური ${match.matchDay}` : 'ფლეი-ოფი'} • {match.groupId ? (match.groupId === 'group-a' ? 'A ჯგუფი' : 'B ჯგუფი') : 'პლეიოფი'}
          </span>

          {isLive && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 font-extrabold text-xs border border-rose-500/40 animate-pulse">
              <Flame className="w-3.5 h-3.5 text-rose-400" />
              <span>LIVE</span>
              {match.matchPeriod === '1st_half' && '• I ტაიმი'}
              {match.matchPeriod === 'half_time' && '• ⏸ შესვენება'}
              {match.matchPeriod === '2nd_half' && '• II ტაიმი'}
            </span>
          )}

          {isFinished && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-800 text-slate-300 font-bold text-xs border border-slate-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>დასრულებული</span>
            </span>
          )}
        </div>

        {/* Score Display */}
        <div className="grid grid-cols-3 items-center gap-4 my-6">
          {/* Home Team */}
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 flex items-center justify-center mb-3 shadow-lg">
              <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-400" />
            </div>
            <h3 className="font-black text-white text-base sm:text-xl tracking-tight">
              {home?.name || 'გუნდი 1'}
            </h3>
            {match.groupId && (
              <span className="text-xs text-slate-400 mt-0.5">
                {match.groupId === 'group-a' ? 'A ჯგუფი' : 'B ჯგუფი'}
              </span>
            )}
          </div>

          {/* Score / Time */}
          <div className="flex flex-col items-center justify-center">
            {match.status === 'scheduled' ? (
              <div className="flex flex-col items-center">
                <span className="text-2xl sm:text-4xl font-mono font-black text-slate-500">VS</span>
                <span className="mt-2 text-xs sm:text-sm font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-3 py-1 rounded-full">
                  {match.scheduledAt}
                </span>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-2 sm:gap-4 font-mono font-black text-4xl sm:text-6xl text-white">
                  <span className={match.homeScore > match.awayScore ? 'text-emerald-400' : ''}>
                    {match.homeScore}
                  </span>
                  <span className="text-slate-600">:</span>
                  <span className={match.awayScore > match.homeScore ? 'text-emerald-400' : ''}>
                    {match.awayScore}
                  </span>
                </div>
                {isLive && (
                  <span className="text-[11px] font-bold text-rose-400 mt-2 animate-pulse">
                    მიმდინარე ანგარიში
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Away Team */}
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 flex items-center justify-center mb-3 shadow-lg">
              <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-cyan-400" />
            </div>
            <h3 className="font-black text-white text-base sm:text-xl tracking-tight">
              {away?.name || 'გუნდი 2'}
            </h3>
            {match.groupId && (
              <span className="text-xs text-slate-400 mt-0.5">
                {match.groupId === 'group-a' ? 'A ჯგუფი' : 'B ჯგუფი'}
              </span>
            )}
          </div>
        </div>

        {/* Location & Details Info */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-center gap-6 text-xs sm:text-sm text-slate-400 flex-wrap">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-emerald-400" />
            <span>2026 წლის 25 აგვისტო</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-emerald-400" />
            <span>{match.scheduledAt}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-emerald-400" />
            <span>სოფელი შილდა, სტადიონი</span>
          </div>
        </div>
      </div>
    </div>
  );
}
