'use client';

import React, { useState } from 'react';
import { BANK_ACCOUNTS } from '@/lib/initialData';
import { useTournament } from '@/lib/store';
import {
  Heart,
  CheckCircle2,
  Users,
  Sparkles,
  Building2,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Coins,
  Smile,
  Home,
  HandHeart,
  Calendar,
  Share2,
  Download,
} from 'lucide-react';

export default function CharityDistributionReport() {
  const { addToast } = useTournament();
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);
  const [showBankAccounts, setShowBankAccounts] = useState(false);

  const handleCopy = (accountNumber: string, bankName: string) => {
    navigator.clipboard.writeText(accountNumber);
    setCopiedAccount(accountNumber);
    addToast('success', 'ანგარიშის ნომერი დაკოპირდა!', `${bankName}: ${accountNumber}`);
    setTimeout(() => setCopiedAccount(null), 2500);
  };

  const families = [
    { name: 'ბეგაშვილების ოჯახი', amount: '400 ₾', tag: 'მრავალშვილიანი ოჯახი' },
    { name: 'ხუციშვილების ოჯახი', amount: '400 ₾', tag: 'მრავალშვილიანი ოჯახი' },
    { name: 'მამადაშვილების ოჯახი', amount: '400 ₾', tag: 'მრავალშვილიანი ოჯახი' },
    { name: 'კიკოლაშვილ-ფერიაშვილების ოჯახი', amount: '400 ₾', tag: 'მრავალშვილიანი ოჯახი' },
  ];

  return (
    <section id="charity-report" className="scroll-mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Outer Glow Wrapper */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0c1815] via-[#091118] to-[#121c16] border-2 border-emerald-500/60 p-6 sm:p-10 lg:p-12 shadow-2xl shadow-emerald-950/50">
        {/* Glow ambient background elements */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full hero-pattern opacity-10 pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto">
          {/* Header Badge */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm font-extrabold tracking-wide mb-4 shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>ოფიციალური ანგარიში • თანხები სრულად გადანაწილდა</span>
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
              დაპირებისამებრ — შეგროვილი თანხები გადანაწილდა! ❤️
            </h2>

            <p className="text-sm sm:text-lg text-slate-200 max-w-3xl mx-auto leading-relaxed">
              საინიციატივო ჯგუფის — <strong>„გაუზიარე მომავალს“</strong> — ორგანიზებით გამართულ საქველმოქმედო
              ტურნირზე შეგროვილი თანხები სრულად გადანაწილდა საჭიროებისამებრ, მათთვის, ვისაც ეს ყველაზე მეტად სჭირდებოდა.
            </p>
          </div>

          {/* Quick Metrics Bar (4 Columns) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
            <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-emerald-500/40 bg-emerald-950/30 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-black uppercase tracking-wider text-emerald-400">სულ შეგროვდა</span>
                <Coins className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl sm:text-4xl font-black text-white font-mono tracking-tight">
                4 600 <span className="text-emerald-400 text-lg sm:text-2xl">₾</span>
              </div>
              <div className="text-[11px] font-semibold text-emerald-300/80 mt-1">
                100% მიზნობრივად გადანაწილებული
              </div>
            </div>

            <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-rose-500/40 bg-rose-950/20 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-black uppercase tracking-wider text-rose-300">მარიამ მამულაშვილს</span>
                <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
              </div>
              <div className="text-2xl sm:text-4xl font-black text-white font-mono tracking-tight">
                3 000 <span className="text-rose-400 text-lg sm:text-2xl">₾</span>
              </div>
              <div className="text-[11px] font-semibold text-rose-300/80 mt-1">
                6 წლის მარიამის რეაბილიტაციას
              </div>
            </div>

            <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-cyan-500/40 bg-cyan-950/20 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-black uppercase tracking-wider text-cyan-300">მრავალშვილიან ოჯახებს</span>
                <Users className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="text-2xl sm:text-4xl font-black text-white font-mono tracking-tight">
                1 600 <span className="text-cyan-400 text-lg sm:text-2xl">₾</span>
              </div>
              <div className="text-[11px] font-semibold text-cyan-300/80 mt-1">
                4 ოჯახი • 400 ₾ თითოეულს
              </div>
            </div>

            <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-amber-500/40 bg-amber-950/20 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-black uppercase tracking-wider text-amber-300">ტრადიცია</span>
                <Sparkles className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                4 <span className="text-amber-400 text-lg sm:text-2xl font-black">წელი</span>
              </div>
              <div className="text-[11px] font-semibold text-amber-300/80 mt-1">
                სიკეთის კეთების უწყვეტი ისტორია
              </div>
            </div>
          </div>

          {/* Detailed Section 1: Mariam Mamulashvili (Primary Beneficiary) */}
          <div className="mb-8 rounded-3xl bg-gradient-to-br from-rose-950/40 via-slate-900/90 to-slate-950 border-2 border-rose-500/50 p-6 sm:p-8 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-4 border-b border-rose-500/30">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 shrink-0">
                    <Heart className="w-6 h-6 fill-rose-500 text-rose-500" />
                  </div>
                  <div>
                    <span className="text-xs font-black uppercase tracking-wider text-rose-400 block">
                      მთავარი მიზნობრივი დახმარება • ორგანიზატორების გადაწყვეტილება
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-white">
                      6 წლის მარიამ მამულაშვილის სარეაბილიტაციო კურსი
                    </h3>
                  </div>
                </div>

                <div className="px-4 py-2 rounded-2xl bg-rose-500/20 border border-rose-500/40 text-rose-300 font-mono font-black text-lg sm:text-xl">
                  3 000 ₾
                </div>
              </div>

              {/* Story Content */}
              <div className="space-y-3.5 text-sm sm:text-base text-slate-200 leading-relaxed">
                <div className="p-4 rounded-2xl bg-black/40 border border-rose-500/20">
                  <p>
                    ჩვენი, ორგანიზატორების, ერთსულოვანი გადაწყვეტილებით, შეგროვილი თანხის დიდი ნაწილი —{' '}
                    <strong className="text-white text-base">3 000 ლარი</strong> — მოხმარდება 6 წლის{' '}
                    <strong className="text-white">მარიამ მამულაშვილის</strong> სარეაბილიტაციო კურსს.
                  </p>
                  <p className="mt-2 text-rose-200 font-semibold">
                    🩺 მარიამის დიაგნოზია: <span className="underline decoration-rose-400">აუტოიმუნური ენცეფალიტი</span>.
                  </p>
                </div>

                <p className="text-slate-300">
                  🙏 რამდენიმე ძვირადღირებული გადასხმის შემდეგ მარიამის მდგომარეობა მნიშვნელოვნად გაუმჯობესდა,
                  თუმცა რეაბილიტაციის პროცესი კვლავ დიდ ფინანსურ ხარჯებთან არის დაკავშირებული.
                </p>

                <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-extrabold text-emerald-300">
                      მარიამს ვუსურვებთ ჯანმრთელობას, ბედნიერებასა და მალე სრულ გამოჯანმრთელებას! ❤️🙏
                    </p>
                    <p className="text-xs sm:text-sm text-slate-300 mt-1">
                      ასევე, გულწრფელ მადლობას ვუხდით თითოეულ თქვენგანს, ვინც ამ კეთილ საქმეში საკუთარი წვლილი
                      შეიტანა. თქვენი მხარდაჭერა მარიამის ოჯახისთვის ძალიან მნიშვნელოვანია. ❤️
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Section 2: 4 Large Families */}
          <div className="mb-8 rounded-3xl bg-slate-900/90 border-2 border-slate-700/80 p-6 sm:p-8 shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0">
                  <Home className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-cyan-400 block">
                    დაპირებისამებრ • თანადგომა
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    ოთხი მრავალშვილიანი ოჯახის დახმარება
                  </h3>
                </div>
              </div>

              <div className="px-4 py-2 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 font-mono font-black text-lg sm:text-xl">
                1 600 ₾ (4 × 400 ₾)
              </div>
            </div>

            <p className="text-sm sm:text-base text-slate-300 mb-6 leading-relaxed">
              დაპირებისამებრ, ჩვენი მცირე წვლილი ასევე შევიტანეთ ოთხი მრავალშვილიანი ოჯახის დასახმარებლად და
              დარჩენილი <strong>1 600 ლარი</strong> თანაბრად გადავანაწილეთ:
            </p>

            {/* Families Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {families.map((fam, idx) => (
                <div
                  key={fam.name}
                  className="p-5 rounded-2xl bg-slate-800/70 border border-slate-700/80 hover:border-cyan-500/50 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="w-7 h-7 rounded-xl bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 font-black text-xs flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 bg-slate-900 px-2 py-0.5 rounded-full">
                        {fam.tag}
                      </span>
                    </div>

                    <h4 className="font-extrabold text-base text-white mb-2 leading-snug">
                      {fam.name}
                    </h4>
                  </div>

                  <div className="pt-3 border-t border-slate-700/60 flex items-center justify-between mt-2">
                    <span className="text-xs text-slate-400 font-medium">გადაცემული თანხა:</span>
                    <span className="text-base font-black text-cyan-300 font-mono">{fam.amount}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Official Social Media Share Poster Showcase */}
          <div className="mb-8 rounded-3xl bg-slate-900/90 border-2 border-amber-500/40 p-5 sm:p-7 shadow-2xl relative overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                  <Share2 className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-amber-400 block">
                    სოციალური ქსელები • Facebook Poster
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-white">
                    გასაზიარებელი ოფიციალური პოსტერი
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href="/og-charity.jpg"
                  download="gauziare-momavals-charity-poster.jpg"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 text-xs font-bold transition-all"
                >
                  <Download className="w-3.5 h-3.5 text-emerald-400" />
                  <span>ჩამოტვირთვა</span>
                </a>

                <a
                  href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fgauziare.ge%2F%3Fv%3Dcharity-report-2026"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-extrabold shadow-md transition-all"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Facebook-ზე გაზიარება</span>
                </a>
              </div>
            </div>

            {/* Poster Preview Frame */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl group">
              <img
                src="/og-charity.jpg"
                alt="საქველმოქმედო თანხების განაწილების ოფიციალური პოსტერი — 4 600 ლარი"
                className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-300"
              />
              <div className="absolute bottom-3 right-3 px-3 py-1 rounded-lg bg-black/75 backdrop-blur-md text-[11px] font-mono font-bold text-slate-300 border border-white/10">
                1200 × 675 HD
              </div>
            </div>

            <p className="text-xs text-slate-400 mt-3 text-center">
              გააზიარეთ ეს პოსტერი Facebook-ზე, რათა ყველამ გაიგოს გაკეთებული სიკეთისა და საერთო ძალისხმევის შესახებ! ❤️
            </p>
          </div>

          {/* Gratitude & Final Promise Banner */}
          <div className="mb-6 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-teal-950/60 border border-emerald-500/40 p-6 sm:p-8 text-center shadow-lg">
            <div className="max-w-2xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-2 text-rose-400 font-extrabold text-sm sm:text-base">
                <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                <span>კიდევ ერთხელ, დიდი მადლობა ყველა თქვენგანს!</span>
                <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
              </div>

              <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                მადლობა ყველას, ვინც თუნდაც მცირე წვლილი შეიტანა ამ კეთილი საქმის გასაკეთებლად.
              </p>

              <div className="p-3 sm:p-4 rounded-xl bg-slate-950/60 border border-emerald-500/30 text-base sm:text-lg font-black text-emerald-300 flex items-center justify-center gap-2">
                <HandHeart className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>ერთად, თითოეული ჩვენგანის მცირე დახმარებით, შეგვიძლია დიდი სიკეთის გაკეთება. 🤝❤️</span>
              </div>

              <div className="pt-3">
                <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500/20 via-yellow-500/10 to-amber-500/20 border border-amber-500/40 text-amber-300 text-sm sm:text-base font-black shadow-md">
                  <span>⚽️❤️ ჩვენ კვლავ შევხვდებით — მომდევნო წელს! ❤️⚽️</span>
                </span>
              </div>
            </div>
          </div>

          {/* Toggleable Bank Accounts for Continued Direct Support */}
          <div className="text-center pt-2">
            <button
              onClick={() => setShowBankAccounts(!showBankAccounts)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-xs sm:text-sm font-bold text-slate-300 hover:text-white transition-all"
            >
              <Building2 className="w-4 h-4 text-emerald-400" />
              <span>საბანკო რეკვიზიტები (მუდმივი მხარდაჭერისთვის)</span>
              {showBankAccounts ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showBankAccounts && (
              <div className="mt-4 pt-4 border-t border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-4 text-left animate-in fade-in-50 duration-200">
                {BANK_ACCOUNTS.map((acc) => {
                  const isCopied = copiedAccount === acc.accountNumber;
                  return (
                    <div
                      key={acc.accountNumber}
                      className="glass-panel p-5 rounded-2xl border border-slate-700/80 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-black uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                            <Building2 className="w-4 h-4" />
                            {acc.bankName}
                          </span>
                          <span className="text-[11px] font-semibold text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                            GEL
                          </span>
                        </div>
                        <div className="text-xs text-slate-400 font-medium mb-2">
                          მიმღები: <strong className="text-slate-200">{acc.recipient}</strong>
                        </div>
                        <div className="p-2.5 rounded-xl bg-black/50 border border-slate-700/90 font-mono text-xs sm:text-sm font-bold text-white tracking-wider break-all select-all">
                          {acc.accountNumber}
                        </div>
                      </div>

                      <button
                        onClick={() => handleCopy(acc.accountNumber, acc.bankName)}
                        className={`mt-3 w-full py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                          isCopied
                            ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/40'
                            : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                        }`}
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                            <span>დაკოპირდა!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>კოპირება</span>
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
