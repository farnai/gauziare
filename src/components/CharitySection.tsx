'use client';

import React, { useState } from 'react';
import { BANK_ACCOUNTS } from '@/lib/initialData';
import { useTournament } from '@/lib/store';
import { Heart, Copy, Check, ShieldCheck, Sparkles, Building2 } from 'lucide-react';

export default function CharitySection() {
  const { addToast } = useTournament();
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  const handleCopy = (accountNumber: string, bankName: string) => {
    navigator.clipboard.writeText(accountNumber);
    setCopiedAccount(accountNumber);
    addToast('success', 'ანგარიშის ნომერი დაკოპირდა!', `${bankName}: ${accountNumber}`);
    setTimeout(() => setCopiedAccount(null), 2500);
  };

  return (
    <section id="charity-section" className="scroll-mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950/80 via-slate-900 to-teal-950/70 border-2 border-emerald-500/50 p-6 sm:p-12 shadow-2xl shadow-emerald-950/40">
        {/* Glow effect */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-xs sm:text-sm font-bold text-emerald-300 mb-4 shadow-inner">
            <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
            <span>საქველმოქმედო მისია</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            დაეხმარე მომავალს ❤️
          </h2>

          <p className="text-base sm:text-xl font-bold text-emerald-300 max-w-2xl mx-auto mb-3">
            გავერთიანდეთ სიკეთისთვის და ერთად დავეხმაროთ ბავშვებს!
          </p>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mb-8 leading-relaxed">
            ნებისმიერი ოდენობის თანხის ჩარიცხვით შეგიძლია მხარი დაუჭირო საქველმოქმედო ინიციატივას.
            შეგროვებული თანხა მოხმარდება <strong>მრავალშვილიან და სოციალურად დაუცველ ოჯახებს</strong>,
            რათა ბავშვებს შეუმსუბუქდეთ ყოველდღიურობა და მოემზადონ ახალი სასწავლო წლისთვის.
          </p>

          {/* Donation Purpose Alert */}
          <div className="max-w-xl mx-auto p-4 rounded-2xl bg-slate-900/90 border border-emerald-500/30 text-xs sm:text-sm text-slate-300 mb-8 text-left flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-extrabold text-white block mb-0.5">
                გადარიცხვის დანიშნულება:
              </span>
              მიუთითეთ სასურველი <strong>გუნდის სახელი</strong> ან <strong>„ქველმოქმედება“</strong>.
              ორგანიზატორები უზრუნველყოფენ ხარჯებისა და დახმარების სრულ, გამჭვირვალე ანგარიშგებას.
            </div>
          </div>

          {/* Bank Accounts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 text-left">
            {BANK_ACCOUNTS.map((acc) => {
              const isCopied = copiedAccount === acc.accountNumber;

              return (
                <div
                  key={acc.accountNumber}
                  className="glass-panel p-5 sm:p-6 rounded-2xl border border-slate-700/80 hover:border-emerald-500/60 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-black uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                        <Building2 className="w-4 h-4" />
                        {acc.bankName}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                        GEL
                      </span>
                    </div>

                    <div className="text-xs text-slate-400 font-medium mb-1">
                      მიმღები: <strong className="text-slate-200">{acc.recipient}</strong>
                    </div>

                    {/* Account Number Box */}
                    <div className="p-3 rounded-xl bg-black/50 border border-slate-700/90 font-mono text-sm sm:text-base font-bold text-white tracking-wider break-all select-all flex items-center justify-between gap-2 mt-2">
                      <span>{acc.accountNumber}</span>
                    </div>
                  </div>

                  {/* Copy CTA Button */}
                  <button
                    onClick={() => handleCopy(acc.accountNumber, acc.bankName)}
                    className={`mt-4 w-full py-3 px-4 rounded-xl font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${
                      isCopied
                        ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/40'
                        : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-950/60'
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-4 h-4 stroke-[3]" />
                        <span>ანგარიში დაკოპირდა!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>ანგარიშის ნომრის კოპირება</span>
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
