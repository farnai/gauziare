'use client';

import React from 'react';
import Link from 'next/link';
import {
  Trophy,
  Heart,
  Sparkles,
  Award,
  Shield,
  ArrowRight,
  MessageCircle,
  Medal,
} from 'lucide-react';
import { FACEBOOK_PAGE_URL } from '@/lib/initialData';

export default function FinalNightBanner() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      {/* Grand Celebratory Container */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#121c2e] via-[#0b1320] to-[#1a140f] border-2 border-amber-500/50 shadow-2xl shadow-amber-950/40">
        {/* Glow ambient background elements */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full hero-pattern opacity-15 pointer-events-none" />

        {/* Top Announcement Bar */}
        <div className="relative z-10 px-4 sm:px-8 pt-6 sm:pt-8 pb-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs sm:text-sm font-extrabold tracking-wide mb-4 shadow-sm">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>დასრულდა საქველმოქმედო ტურნირი მინი ფეხბურთში!</span>
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white uppercase mb-3">
            <span className="bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-500 bg-clip-text text-transparent">
              🏆 ჩემპიონია თელავის გუნდი! 🥇🔥
            </span>
          </h2>

          <p className="text-slate-200 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed">
            დაძაბული, ემოციებით სავსე და სანახაობრივი ფინალის შემდეგ ღირსეული გამარჯვება მოიპოვა <strong>თელავის გუნდმა</strong>!
            ვულოცავთ თელაველ ბიჭებს დამსახურებულ გამარჯვებას და ვუსურვებთ წარმატებებს! 👏🎉💪
          </p>

          {/* Grand Final Official Scorecard */}
          <div className="mt-6 max-w-2xl mx-auto rounded-3xl bg-slate-900/90 border-2 border-amber-500/40 p-4 sm:p-6 shadow-2xl backdrop-blur-md">
            <div className="flex items-center justify-between text-xs font-bold text-amber-400 mb-4 pb-2.5 border-b border-slate-800">
              <span className="flex items-center gap-1.5 uppercase tracking-wider">
                <Trophy className="w-4 h-4" />
                დიდი ფინალი • ოფიციალური შედეგი
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/30 text-[11px] font-black">
                FT • დასრულდა
              </span>
            </div>

            <div className="grid grid-cols-3 items-center text-center gap-2 sm:gap-4">
              {/* Shilda */}
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center mb-2 shadow-md">
                  <Shield className="w-8 h-8 text-emerald-400" />
                </div>
                <span className="text-base sm:text-xl font-black text-white">შილდა</span>
                <span className="text-xs text-slate-400 font-semibold mt-0.5">🥈 II ადგილი</span>
              </div>

              {/* Score Display */}
              <div className="flex flex-col items-center justify-center">
                <div className="flex items-center gap-2 sm:gap-3 px-4 py-2 sm:px-5 sm:py-2.5 rounded-2xl bg-black/60 border border-amber-500/40 shadow-inner">
                  <span className="text-3xl sm:text-5xl font-mono font-black text-white">2</span>
                  <span className="text-xl sm:text-3xl font-bold text-amber-400">:</span>
                  <span className="text-3xl sm:text-5xl font-mono font-black text-amber-300">4</span>
                </div>
                <span className="text-[11px] font-black text-amber-400 uppercase tracking-wider mt-2">
                  თელავის გამარჯვება 🏆
                </span>
              </div>

              {/* Telavi */}
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-amber-500/30 to-amber-900/30 border-2 border-amber-400 flex items-center justify-center mb-2 shadow-lg shadow-amber-500/20">
                  <Shield className="w-8 h-8 text-amber-400" />
                </div>
                <span className="text-base sm:text-xl font-black text-amber-300">თელავი</span>
                <span className="text-xs text-amber-400 font-extrabold mt-0.5">🥇 ჩემპიონი!</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 flex justify-center">
              <Link
                href="/match/m-final"
                className="inline-flex items-center gap-2 text-xs font-bold text-amber-300 hover:text-amber-200 transition-colors"
              >
                <span>ფინალის მატჩის სრული ბარათი</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Podium Rankings & MVP Grid */}
        <div className="relative z-10 px-4 sm:px-8 py-4">
          <div className="text-center mb-4">
            <h3 className="text-lg sm:text-2xl font-black text-white flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>საქველმოქმედო ტურნირის საბოლოო შედეგები</span>
              <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {/* 1st Place */}
            <div className="p-5 rounded-2xl bg-gradient-to-b from-amber-950/60 via-slate-900/90 to-slate-950 border-2 border-amber-400 shadow-xl text-center flex flex-col justify-between order-1 sm:order-2 scale-[1.02]">
              <div>
                <div className="w-12 h-12 rounded-full bg-amber-500 text-slate-950 font-black text-xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-amber-500/40">
                  🥇
                </div>
                <span className="text-xs font-black uppercase tracking-wider text-amber-300 bg-amber-500/20 px-3 py-1 rounded-full border border-amber-500/40">
                  I ადგილი — ჩემპიონი
                </span>
                <h4 className="text-2xl sm:text-3xl font-black text-white mt-3">თელავი</h4>
                <p className="text-xs text-amber-200/90 font-medium mt-1">
                  ახალი გუნდი, რომელმაც პირველად მიიღო მონაწილეობა და დამაჯერებლად მოიპოვა ოქროს თასი! 🏆🔥
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-amber-500/30 text-xs font-bold text-amber-300">
                საპრიზო: 500 ₾ (აფთიაქი „ევროფარმი“)
              </div>
            </div>

            {/* 2nd Place */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-700/80 text-center flex flex-col justify-between order-2 sm:order-1">
              <div>
                <div className="w-12 h-12 rounded-full bg-slate-700 text-white font-black text-xl flex items-center justify-center mx-auto mb-3 shadow">
                  🥈
                </div>
                <span className="text-xs font-black uppercase tracking-wider text-slate-300 bg-slate-800 px-3 py-1 rounded-full border border-slate-600">
                  II ადგილი — ვიცე-ჩემპიონი
                </span>
                <h4 className="text-xl sm:text-2xl font-black text-white mt-3">შილდა</h4>
                <p className="text-xs text-slate-300 font-medium mt-1">
                  ღირსეული, მებრძოლი და ემოციური ასპარეზობა ფინალამდე! 🥈💪
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 text-xs font-bold text-slate-300">
                საპრიზო: 300 ₾ (საორგანიზაციო ფონდი)
              </div>
            </div>

            {/* 3rd Place */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-700/80 text-center flex flex-col justify-between order-3">
              <div>
                <div className="w-12 h-12 rounded-full bg-amber-800 text-white font-black text-xl flex items-center justify-center mx-auto mb-3 shadow">
                  🥉
                </div>
                <span className="text-xs font-black uppercase tracking-wider text-amber-400 bg-amber-950/60 px-3 py-1 rounded-full border border-amber-700/40">
                  III ადგილი — ბრინჯაო
                </span>
                <h4 className="text-xl sm:text-2xl font-black text-white mt-3">კალაური</h4>
                <p className="text-xs text-slate-300 font-medium mt-1">
                  ბრწყინვალე გამარჯვება მესამე ადგილისთვის მატჩში (გავაზი 0 : 4 კალაური)! 🥉👏
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 text-xs font-bold text-amber-400">
                საპრიზო: 200 ₾ (საორგანიზაციო ფონდი)
              </div>
            </div>
          </div>

          {/* MVP Best Player Banner */}
          <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-slate-900 to-yellow-500/15 border-2 border-amber-500/40 shadow-lg">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 text-2xl shrink-0 shadow-inner">
                  ⭐️
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-amber-400 bg-amber-500/20 px-2.5 py-0.5 rounded-full mb-1">
                    <Award className="w-3.5 h-3.5" />
                    ტურნირის საუკეთესო მოთამაშე
                  </div>
                  <h4 className="text-lg sm:text-xl font-black text-white">
                    გიორგი კიკნაძე — <span className="text-emerald-400">შილდის მეკარე</span> 🧤🔥
                  </h4>
                  <p className="text-xs text-slate-300 mt-0.5">
                    განსაკუთრებული სეივები, საიმედო თამაში და უმაღლესი დონის ოსტატობა მთელი ტურნირის განმავლობაში!
                  </p>
                </div>
              </div>

              <div className="shrink-0">
                <span className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-black text-xs sm:text-sm shadow-md flex items-center gap-1.5">
                  <Medal className="w-4 h-4" />
                  MVP 2026 🏅
                </span>
              </div>
            </div>
          </div>

          {/* Gratitude & Story Panels */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">
            {/* Left: Gratitude to Teams & Fans */}
            <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-5 sm:p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3 pb-2.5 border-b border-slate-800">
                  <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
                  <h4 className="font-extrabold text-base text-white">მადლობა თითოეულ თქვენგანს! 🙏❤️</h4>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  ჩვენი, საინიციატივო ჯგუფის სახელით, უდიდეს მადლობას ვუხდით <strong>ყველა მონაწილე 14 გუნდს</strong> საქველმოქმედო ტურნირში მონაწილეობისთვის.
                  თქვენი წვლილი უმნიშვნელოვანესია ამ დიდი საქმის გასაკეთებლად.
                </p>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-2.5">
                  უკვე <strong>4 წელია</strong>, შილდელი ახალგაზრდები ტრადიციულად და დიდი ენთუზიაზმით ვაკეთებთ ამ კეთილ საქმეს და გვჯერა, რომ ეს ტრადიცია კიდევ მრავალი წელი გაგრძელდება! 🤝
                </p>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-2.5">
                  <strong>განსაკუთრებული მადლობა გულშემატკივარს!</strong> მადლობა თითოეულ ადამიანს, ვინც ყოველ სათამაშო საღამოს სტადიონზე მოდიოდა და ქმნიდა იმ ლამაზ საფეხბურთო ატმოსფეროს, რომელიც ამ ტურნირს განსაკუთრებულს ხდიდა! 🏟️🔥
                  ასევე, უდიდესი მადლობა ყველას, ვინც ფინანსურად შეიტანა წვლილი და თავისი მხარდაჭერით კარგი საქმის გავრცელებაში დაგვეხმარა. ❤️
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span>14 მონაწილე გუნდი</span>
                <span className="text-emerald-400 font-bold">4-წლიანი ტრადიცია 🤝</span>
              </div>
            </div>

            {/* Right: Completed Humanitarian Stage */}
            <div className="rounded-2xl bg-gradient-to-b from-emerald-950/40 via-slate-900/90 to-slate-950 border-2 border-emerald-500/50 p-5 sm:p-6 flex flex-col justify-between shadow-xl">
              <div>
                <div className="flex items-center gap-2 mb-3 pb-2.5 border-b border-emerald-500/30">
                  <span className="text-lg">🤲</span>
                  <h4 className="font-extrabold text-base text-emerald-300">
                    თანხები სრულად გადანაწილდა! • 4 600 ₾ ❤️
                  </h4>
                </div>

                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 mb-3 text-xs text-emerald-200 leading-relaxed">
                  დაპირებისამებრ, ტურნირზე შეგროვილი <strong>4 600 ლარი</strong> სრულად გადანაწილდა საჭიროებისამებრ, მათთვის, ვისაც ეს ყველაზე მეტად სჭირდებოდა!
                </div>

                <div className="space-y-2 text-xs sm:text-sm text-slate-300">
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/80">
                    <span className="font-bold text-white">👧 მარიამ მამულაშვილი (6 წლის):</span>
                    <span className="font-mono font-black text-rose-400">3 000 ₾</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/80">
                    <span className="font-bold text-white">👨‍👩‍👧‍👦 4 მრავალშვილიანი ოჯახი:</span>
                    <span className="font-mono font-black text-cyan-400">1 600 ₾ (4×400)</span>
                  </div>
                </div>

                <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                  ერთად, თითოეული ჩვენგანის მცირე დახმარებით, შეგვიძლია დიდი სიკეთის გაკეთება. 🤝❤️
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2">
                <a
                  href="#charity-report"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all"
                >
                  <Heart className="w-3.5 h-3.5 fill-white" />
                  <span>სრული ანგარიშის ნახვა</span>
                </a>

                <Link
                  href="/charity"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300"
                >
                  <span>ქველმოქმედების გვერდი</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Grand Finale Promise: See you in 2027 */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-950/60 via-slate-900 to-rose-950/60 border border-amber-500/40 text-center">
            <div className="text-sm sm:text-base font-black text-white flex items-center justify-center gap-2 flex-wrap">
              <span>⚽️ ჩვენ კვლავ შევხვდებით 2027 წელს! 🏆🔥</span>
              <span className="text-amber-400 font-extrabold">მანამდე კი — ერთად გავაგრძელოთ კეთილი საქმის კეთება! ❤️</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

