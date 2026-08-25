'use client';

import React from 'react';
import { REGISTRATION_FORM_URL } from '@/lib/initialData';
import { UserPlus, ExternalLink, ShieldAlert } from 'lucide-react';

export default function ParticipationCTA() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-950/60 via-slate-900 to-indigo-950/60 border border-blue-500/30 p-6 sm:p-10 shadow-xl text-center">
        <div className="max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold mb-3 border border-blue-500/30">
            <UserPlus className="w-3.5 h-3.5" />
            <span>მონაწილეობის მიღება</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-3">
            გინდა მონაწილეობა?
          </h2>

          <p className="text-sm sm:text-base text-slate-300 mb-6 leading-relaxed">
            შეავსე გუნდის რეგისტრაციის ოფიციალური ფორმა. ტურნირის სიმბოლური საწევრო შეადგენს{' '}
            <strong className="text-white font-extrabold">100 ლარს</strong> გუნდზე, რაც სრულად
            მიემართება ქველმოქმედებასა და ორგანიზაციულ ხარჯებს.
          </p>

          <a
            href={REGISTRATION_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-sm sm:text-base shadow-xl shadow-blue-950/60 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <span>გუნდის რეგისტრაცია</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
