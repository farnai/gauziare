'use client';

import React, { useState } from 'react';
import { useTournament } from '@/lib/store';
import { Lock, ShieldCheck, KeyRound, Sparkles } from 'lucide-react';

export default function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const { isAdmin, loginAdmin } = useTournament();
  const [pin, setPin] = useState('');

  if (isAdmin) {
    return <>{children}</>;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginAdmin(pin);
  };

  const handleQuickPin = (digit: string) => {
    if (pin.length < 6) {
      const nextPin = pin + digit;
      setPin(nextPin);
      if (nextPin.length === 4 && (nextPin === '7776')) {
        loginAdmin(nextPin);
      }
    }
  };

  const handleBackspace = () => {
    setPin(pin.slice(0, -1));
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md p-6 sm:p-8 rounded-3xl glass-panel border border-slate-800 shadow-2xl text-center">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto mb-4">
          <Lock className="w-8 h-8" />
        </div>

        <h2 className="text-2xl font-black text-white tracking-tight mb-1">
          ადმინისტრატორის პანელი
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mb-6">
          შეიყვანეთ ადმინისტრატორის PIN კოდი
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="••••"
              className="w-full py-3.5 px-4 rounded-2xl bg-black/60 border border-slate-700 text-center font-mono text-2xl font-extrabold text-white tracking-widest focus:outline-none focus:border-amber-500 transition-colors"
              autoFocus
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-black text-sm tracking-wide shadow-lg shadow-amber-950/60 transition-all active:scale-[0.98]"
          >
            შესვლა
          </button>
        </form>

        {/* Quick NumPad for mobile referees */}
        <div className="mt-6 pt-6 border-t border-slate-800/80">
          <div className="text-[11px] font-bold text-slate-500 mb-3 uppercase tracking-wider">
            სწრაფი ციფრული კლავიატურა
          </div>
          <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', '⌫'].map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => {
                  if (k === 'C') setPin('');
                  else if (k === '⌫') handleBackspace();
                  else handleQuickPin(k);
                }}
                className="py-3 rounded-xl bg-slate-800/90 hover:bg-slate-700 active:bg-slate-600 text-slate-200 font-mono font-bold text-lg border border-slate-700/60 transition-colors"
              >
                {k}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
