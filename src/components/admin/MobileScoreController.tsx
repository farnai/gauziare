import React, { useState } from 'react';
import { useTournament } from '@/lib/store';
import {
  Flame,
  Plus,
  Minus,
  RotateCcw,
  CheckCircle2,
  Play,
  Shield,
  Clock,
  AlertTriangle,
  Ban,
  Zap,
} from 'lucide-react';

export default function MobileScoreController() {
  const {
    liveMatch,
    upcomingMatches,
    teamMap,
    updateScore,
    updatePenaltyScore,
    undoScore,
    startMatch,
    setMatchPeriod,
    cancelLiveMatch,
    finishMatch,
  } = useTournament();

  const [confirmFinishOpen, setConfirmFinishOpen] = useState(false);
  const [confirmCancelLiveOpen, setConfirmCancelLiveOpen] = useState(false);
  const [confirmStartAnother, setConfirmStartAnother] = useState<string | null>(null);

  const homeTeam = liveMatch ? teamMap.get(liveMatch.homeTeamId) : null;
  const awayTeam = liveMatch ? teamMap.get(liveMatch.awayTeamId) : null;

  const nextMatches = upcomingMatches;

  const handleStartNext = (matchId: string) => {
    if (liveMatch) {
      setConfirmStartAnother(matchId);
    } else {
      startMatch(matchId, '1st_half');
    }
  };

  const currentPeriod = liveMatch?.matchPeriod || '1st_half';

  // Penalty shootout calculation
  const homePenScore = liveMatch?.homePenaltyScore ?? 0;
  const awayPenScore = liveMatch?.awayPenaltyScore ?? 0;
  const isKnockout = liveMatch ? liveMatch.roundType !== 'group' : false;
  const isPenaltyPeriod = currentPeriod === 'penalties' || Boolean(liveMatch?.hasPenalties);

  // Sudden death logic: 3-3 base kicks. If tie after 3-3 or higher, sudden death activates.
  const isSuddenDeath =
    isPenaltyPeriod &&
    ((homePenScore >= 3 && awayPenScore >= 3 && homePenScore === awayPenScore) ||
      homePenScore > 3 ||
      awayPenScore > 3);

  return (
    <div className="space-y-6">
      {/* 1. CURRENT LIVE MATCH CONTROLLER */}
      {liveMatch ? (
        <div className="rounded-3xl bg-gradient-to-b from-rose-950/70 via-slate-900 to-slate-950 border-2 border-rose-600 p-5 sm:p-8 shadow-2xl shadow-rose-950/60">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-rose-900/50 mb-6">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-rose-600 text-white text-xs font-black uppercase tracking-wider animate-pulse flex items-center gap-1.5">
                <Flame className="w-4 h-4" />
                მიმდინარე LIVE მატჩი
              </span>
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {liveMatch.scheduledAt}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Cancel / Reset LIVE button */}
              <button
                onClick={() => setConfirmCancelLiveOpen(true)}
                className="px-3 py-1.5 rounded-xl bg-rose-950/80 hover:bg-rose-900 active:bg-rose-800 text-rose-300 text-xs font-bold flex items-center gap-1.5 border border-rose-800 transition-all"
                title="ლაივის გაუქმება და 0-0-ზე განულება"
              >
                <Ban className="w-3.5 h-3.5 text-rose-400" />
                <span>LIVE გაუქმება</span>
              </button>

              <button
                onClick={() => undoScore(liveMatch.id)}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 active:bg-slate-600 text-slate-200 text-xs font-bold flex items-center gap-1.5 border border-slate-700 transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                <span>UNDO</span>
              </button>
            </div>
          </div>

          {/* Match Period Switcher (1st Half, Half Time, 2nd Half, Penalty Shootout) */}
          <div className="mb-6 p-2 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-wrap sm:flex-nowrap gap-2">
            <button
              onClick={() => setMatchPeriod(liveMatch.id, '1st_half')}
              className={`flex-1 py-3 px-3 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 ${
                currentPeriod === '1st_half'
                  ? 'bg-rose-600 text-white shadow-lg shadow-rose-950'
                  : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${currentPeriod === '1st_half' ? 'bg-white animate-pulse' : 'bg-slate-500'}`} />
              <span>I ტაიმი</span>
            </button>

            <button
              onClick={() => setMatchPeriod(liveMatch.id, 'half_time')}
              className={`flex-1 py-3 px-3 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 ${
                currentPeriod === 'half_time'
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-950'
                  : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>⏸ შესვენება</span>
            </button>

            <button
              onClick={() => setMatchPeriod(liveMatch.id, '2nd_half')}
              className={`flex-1 py-3 px-3 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 ${
                currentPeriod === '2nd_half'
                  ? 'bg-rose-600 text-white shadow-lg shadow-rose-950'
                  : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${currentPeriod === '2nd_half' ? 'bg-white animate-pulse' : 'bg-slate-500'}`} />
              <span>II ტაიმი</span>
            </button>

            {(isKnockout || liveMatch.homeScore === liveMatch.awayScore || isPenaltyPeriod) && (
              <button
                onClick={() => setMatchPeriod(liveMatch.id, 'penalties')}
                className={`flex-1 py-3 px-3 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 ${
                  currentPeriod === 'penalties'
                    ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-950 animate-pulse'
                    : 'bg-amber-950/40 text-amber-300 hover:bg-amber-900/60 border border-amber-500/30'
                }`}
              >
                <span>⚽ პენალტები</span>
              </button>
            )}
          </div>

          {/* Main Game Scores Controller */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Home Controller */}
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-emerald-500/40 text-center flex flex-col items-center justify-between shadow-lg">
              <div className="flex items-center gap-2 mb-1">
                <Shield className="w-5 h-5 text-emerald-400" />
                <h3 className="text-lg sm:text-xl font-black text-white truncate">
                  {homeTeam?.name || 'მასპინძელი'}
                </h3>
              </div>

              <div className="text-[11px] font-bold text-slate-400">ძირითადი დრო</div>
              <div className="my-2 font-mono text-6xl sm:text-7xl font-black text-emerald-400">
                {liveMatch.homeScore}
              </div>

              {/* Big touch buttons */}
              <div className="grid grid-cols-2 gap-3 w-full mt-2">
                <button
                  onClick={() => updateScore(liveMatch.id, -1, 0)}
                  disabled={liveMatch.homeScore <= 0}
                  className="py-4 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 disabled:opacity-30 disabled:pointer-events-none text-slate-200 font-black text-xl border border-slate-700 flex items-center justify-center gap-1"
                >
                  <Minus className="w-5 h-5" />
                  <span>1</span>
                </button>

                <button
                  onClick={() => updateScore(liveMatch.id, 1, 0)}
                  className="py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-black text-xl shadow-lg shadow-emerald-950/80 flex items-center justify-center gap-1"
                >
                  <Plus className="w-5 h-5" />
                  <span>1 გოლი</span>
                </button>
              </div>
            </div>

            {/* Away Controller */}
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-cyan-500/40 text-center flex flex-col items-center justify-between shadow-lg">
              <div className="flex items-center gap-2 mb-1">
                <Shield className="w-5 h-5 text-cyan-400" />
                <h3 className="text-lg sm:text-xl font-black text-white truncate">
                  {awayTeam?.name || 'სტუმარი'}
                </h3>
              </div>

              <div className="text-[11px] font-bold text-slate-400">ძირითადი დრო</div>
              <div className="my-2 font-mono text-6xl sm:text-7xl font-black text-cyan-400">
                {liveMatch.awayScore}
              </div>

              {/* Big touch buttons */}
              <div className="grid grid-cols-2 gap-3 w-full mt-2">
                <button
                  onClick={() => updateScore(liveMatch.id, 0, -1)}
                  disabled={liveMatch.awayScore <= 0}
                  className="py-4 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 disabled:opacity-30 disabled:pointer-events-none text-slate-200 font-black text-xl border border-slate-700 flex items-center justify-center gap-1"
                >
                  <Minus className="w-5 h-5" />
                  <span>1</span>
                </button>

                <button
                  onClick={() => updateScore(liveMatch.id, 0, 1)}
                  className="py-4 rounded-xl bg-cyan-600 hover:bg-cyan-500 active:scale-95 text-white font-black text-xl shadow-lg shadow-cyan-950/80 flex items-center justify-center gap-1"
                >
                  <Plus className="w-5 h-5" />
                  <span>1 გოლი</span>
                </button>
              </div>
            </div>
          </div>

          {/* Penalty Shootout Controller Section (3-3 rule + Sudden Death) */}
          {(isPenaltyPeriod || isKnockout) && (
            <div className="mb-6 p-5 rounded-3xl bg-amber-950/30 border-2 border-amber-500/50 space-y-4 shadow-xl">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-amber-500/30">
                <div className="flex items-center gap-2">
                  <span className="text-xl">⚽</span>
                  <div>
                    <h4 className="text-base font-black text-amber-300">
                      პენალტების სერია (Penalty Shootout)
                    </h4>
                    <p className="text-xs text-amber-400/80 font-medium">
                      წესი: 3-3 დარტყმა. თანაბარი ანგარიშის შემთხვევაში ⚡ გადამწყვეტი პენალტი (Sudden Death)
                    </p>
                  </div>
                </div>

                {isSuddenDeath ? (
                  <span className="px-3 py-1 rounded-full bg-amber-500 text-slate-950 font-black text-xs animate-bounce flex items-center gap-1 shadow-lg shadow-amber-950">
                    <Zap className="w-4 h-4 fill-slate-950" />
                    ⚡ გადამწყვეტი პენალტები (SUDDEN DEATH)!
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full bg-slate-900 border border-amber-500/40 text-amber-300 font-bold text-xs">
                    3-3 ძირითადი სერია
                  </span>
                )}
              </div>

              {/* Penalty Scores & Controls */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Home Penalty */}
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-amber-500/40 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-300 truncate max-w-[120px] sm:max-w-[160px]">
                      {homeTeam?.name}
                    </div>
                    <div className="text-xs font-bold text-amber-400 mt-0.5">პენალტების გოლი</div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updatePenaltyScore(liveMatch.id, -1, 0)}
                      disabled={homePenScore <= 0}
                      className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 disabled:opacity-30 disabled:pointer-events-none text-white font-black text-lg border border-slate-700 flex items-center justify-center"
                    >
                      <Minus className="w-4 h-4" />
                    </button>

                    <div className="font-mono text-3xl font-black text-amber-300 min-w-[36px] text-center">
                      {homePenScore}
                    </div>

                    <button
                      onClick={() => updatePenaltyScore(liveMatch.id, 1, 0)}
                      className="w-12 h-10 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 font-black text-base shadow-md flex items-center justify-center gap-1"
                    >
                      <Plus className="w-4 h-4" />
                      <span>1</span>
                    </button>
                  </div>
                </div>

                {/* Away Penalty */}
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-amber-500/40 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-300 truncate max-w-[120px] sm:max-w-[160px]">
                      {awayTeam?.name}
                    </div>
                    <div className="text-xs font-bold text-amber-400 mt-0.5">პენალტების გოლი</div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updatePenaltyScore(liveMatch.id, 0, -1)}
                      disabled={awayPenScore <= 0}
                      className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 disabled:opacity-30 disabled:pointer-events-none text-white font-black text-lg border border-slate-700 flex items-center justify-center"
                    >
                      <Minus className="w-4 h-4" />
                    </button>

                    <div className="font-mono text-3xl font-black text-amber-300 min-w-[36px] text-center">
                      {awayPenScore}
                    </div>

                    <button
                      onClick={() => updatePenaltyScore(liveMatch.id, 0, 1)}
                      className="w-12 h-10 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 font-black text-base shadow-md flex items-center justify-center gap-1"
                    >
                      <Plus className="w-4 h-4" />
                      <span>1</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Finish Match Button */}
          <div className="pt-2">
            <button
              onClick={() => setConfirmFinishOpen(true)}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-rose-700 hover:from-red-500 hover:to-rose-600 active:scale-[0.98] text-white font-black text-base tracking-wide shadow-xl shadow-rose-950/80 flex items-center justify-center gap-2 transition-all"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>მატჩის დასრულება (FINISH MATCH)</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="p-8 rounded-3xl glass-panel border border-slate-800 text-center">
          <div className="w-14 h-14 rounded-2xl bg-slate-800 flex items-center justify-center mx-auto mb-3 text-slate-400">
            <Clock className="w-7 h-7 text-emerald-400" />
          </div>
          <h3 className="text-xl font-bold text-white mb-1">
            ამჟამად LIVE მატჩი არ არის დაწყებული
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto mb-6">
            აირჩიეთ მომდევნო მატჩი სიიდან და დააჭირეთ „მატჩის დაწყებას“.
          </p>
        </div>
      )}

      {/* 2. UPCOMING MATCHES QUEUE (START NEXT MATCH) */}
      <div className="space-y-4">
        <h3 className="text-lg font-black text-white flex items-center gap-2">
          <Play className="w-5 h-5 text-amber-400 fill-amber-400" />
          <span>მომდევნო მატჩების რიგი ({upcomingMatches.length})</span>
        </h3>

        {nextMatches.length === 0 ? (
          <div className="p-6 rounded-2xl glass-panel text-center text-slate-400 text-xs sm:text-sm">
            დაგეგმილი მატჩები არ არის
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {nextMatches.map((m, idx) => {
              const h = teamMap.get(m.homeTeamId);
              const a = teamMap.get(m.awayTeamId);

              return (
                <div
                  key={m.id}
                  className={`p-5 rounded-2xl border flex flex-col justify-between transition-all ${
                    idx === 0
                      ? 'bg-slate-900/90 border-amber-500/50 shadow-lg'
                      : 'glass-panel border-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800">
                    <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {m.scheduledAt}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400">
                      {m.groupId === 'group-a' ? 'A ჯგუფი' : m.groupId === 'group-b' ? 'B ჯგუფი' : 'პლეი-ოფი'}
                    </span>
                  </div>

                  <div className="space-y-1.5 mb-4">
                    <div className="text-sm sm:text-base font-extrabold text-white">
                      {h?.name || 'გუნდი 1'}
                    </div>
                    <div className="text-xs text-slate-500 font-bold">VS</div>
                    <div className="text-sm sm:text-base font-extrabold text-white">
                      {a?.name || 'გუნდი 2'}
                    </div>
                  </div>

                  <button
                    onClick={() => handleStartNext(m.id)}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 active:scale-95 text-white font-extrabold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>მატჩის დაწყება (START)</span>
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Confirmation Dialog: FINISH MATCH */}
      {confirmFinishOpen && liveMatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md p-6 rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-amber-400">
              <AlertTriangle className="w-7 h-7 shrink-0" />
              <h3 className="text-lg font-black text-white">მატჩის დასრულების დადასტურება</h3>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              ნამდვილად გსურთ მატჩის დასრულება ანგარიშით{' '}
              <strong className="text-white font-mono text-base">
                {homeTeam?.name} ({liveMatch.homeScore}) : ({liveMatch.awayScore}) {awayTeam?.name}
              </strong>
              ? შედეგი გახდება ოფიციალური და სატურნირო ცხრილები გადაითვლება.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setConfirmFinishOpen(false)}
                className="py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs"
              >
                გაუქმება
              </button>
              <button
                onClick={() => {
                  finishMatch(liveMatch.id);
                  setConfirmFinishOpen(false);
                }}
                className="py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs shadow-lg shadow-rose-950/60"
              >
                დიახ, დასრულება
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Dialog: CANCEL LIVE / RESET MATCH */}
      {confirmCancelLiveOpen && liveMatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md p-6 rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-rose-400">
              <Ban className="w-7 h-7 shrink-0" />
              <h3 className="text-lg font-black text-white">LIVE მატჩის გაუქმება / განულება</h3>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              ნამდვილად გსურთ LIVE მატჩის გაუქმება? მატჩი დაუბრუნდება დაგეგმილ მდგომარეობას, ხოლო ანგარიში განულდება (<strong className="text-white font-mono">0 - 0</strong>).
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setConfirmCancelLiveOpen(false)}
                className="py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs"
              >
                უკან დაბრუნება
              </button>
              <button
                onClick={() => {
                  cancelLiveMatch(liveMatch.id);
                  setConfirmCancelLiveOpen(false);
                }}
                className="py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs shadow-lg shadow-rose-950/60"
              >
                დიახ, გაუქმება
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Dialog: START ANOTHER WHEN LIVE ACTIVE */}
      {confirmStartAnother && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md p-6 rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-rose-400">
              <AlertTriangle className="w-7 h-7 shrink-0" />
              <h3 className="text-lg font-black text-white">LIVE მატჩი უკვე მიმდინარეობს</h3>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              ამჟამად უკვე მიმდინარეობს მატჩი. გსურთ ახალი მატჩის დაწყება და წინა მატჩის შენარჩუნება?
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setConfirmStartAnother(null)}
                className="py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs"
              >
                გაუქმება
              </button>
              <button
                onClick={() => {
                  startMatch(confirmStartAnother);
                  setConfirmStartAnother(null);
                }}
                className="py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-lg"
              >
                დიახ, დაწყება
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
