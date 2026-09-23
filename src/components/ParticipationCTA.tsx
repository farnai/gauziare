'use client';

import React from 'react';
import { FACEBOOK_PAGE_URL, CONTACT_PHONES_FORMATTED } from '@/lib/initialData';
import { MessageCircle, Phone, Heart, Sparkles } from 'lucide-react';

export default function ParticipationCTA() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-950/70 via-slate-900 to-teal-950/70 border-2 border-emerald-500/40 p-6 sm:p-10 shadow-2xl text-center">
        {/* Ambient glow */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-2xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold mb-3 border border-emerald-500/30">
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            <span>ჰუმანიტარული ეტაპი • თანადგომა</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-3">
            იცნობთ ოჯახს, რომელსაც დახმარება სჭირდება?
          </h2>

          <p className="text-sm sm:text-base text-slate-300 mb-6 leading-relaxed">
            ტურნირის ფარგლებში შეგროვილი 4 600 ლარი სრულად გადანაწილდა.
            თუ თქვენს ირგვლივ არის ოჯახი ან ბავშვი, რომელსაც ჩვენი გვერდში დგომა და მხარდაჭერა სჭირდება — გთხოვთ მოგვწეროთ.
            ჩვენი საინიციატივო ჯგუფი მუდმივად მზადაა თანადგომისთვის! ❤️🤝
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <a
              href={FACEBOOK_PAGE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-sm sm:text-base shadow-xl shadow-blue-950/60 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>მოგვწერეთ პირად შეტყობინებაში</span>
            </a>

            <a
              href={`tel:${CONTACT_PHONES_FORMATTED[0].replace(/\s/g, '')}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-sm sm:text-base border border-slate-700 transition-all"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>{CONTACT_PHONES_FORMATTED[0]}</span>
            </a>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 text-xs font-semibold text-slate-400 flex items-center justify-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>⚽️ ჩვენ კვლავ შევხვდებით 2027 წელს! 🏆🔥</span>
          </div>
        </div>
      </div>
    </section>
  );
}
