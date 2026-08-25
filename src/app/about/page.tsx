'use client';

import React from 'react';
import Link from 'next/link';
import PrizeFundSection from '@/components/PrizeFundSection';
import PartnersSection from '@/components/PartnersSection';
import ParticipationCTA from '@/components/ParticipationCTA';
import ContactsSection from '@/components/ContactsSection';
import { Trophy, Calendar, MapPin, Target, Users, Heart, Sparkles } from 'lucide-react';

export default function AboutPage() {
  const highlights = [
    {
      title: '⚽ საფეხბურთო მატჩები',
      desc: 'დაძაბული, ემოციური და სამართლიანი თამაშები რეგიონის 14 საუკეთესო სამოყვარულო გუნდს შორის.',
    },
    {
      title: '🎯 გასართობი გამოწვევები',
      desc: 'საფეხბურთო კონკურსები, პენალტების სერიები და სახალისო აქტივობები გულშემატკივრებისთვის და ბავშვებისთვის.',
    },
    {
      title: '🤝 მონაწილეობა და მხარდაჭერა',
      desc: 'სოფლისა და რეგიონის გაერთიანება საერთო კეთილი მიზნის ირგვლივ — ბავშვებისა და ოჯახების დასახმარებლად.',
    },
  ];

  return (
    <div className="py-8 space-y-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs sm:text-sm font-bold text-emerald-400 mb-4">
          <Trophy className="w-4 h-4" />
          <span>ტურნირის ისტორია და მიზანი</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
          გაუზიარე მომავალს
        </h1>

        <p className="text-slate-300 text-sm sm:text-lg leading-relaxed mb-6">
          <strong>22 აგვისტოს, სოფელ შილდის სტადიონზე</strong>, ყოველწლიური საქველმოქმედო
          მინი-ფეხბურთის ტურნირი აიღებს სტარტს. სამოყვარულო შეჯიბრებას საინიციატივო ჯგუფი{' '}
          <strong>„გაუზიარე მომავალს“</strong> უძღვება.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm font-semibold text-slate-300">
          <span className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-emerald-400" />
            22 აგვისტო
          </span>
          <span className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-emerald-400" />
            შილდის სტადიონი
          </span>
          <span className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2">
            <Users className="w-4 h-4 text-emerald-400" />
            14 გუნდი
          </span>
        </div>
      </div>

      {/* 3 Core pillars */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {highlights.map((h) => (
            <div
              key={h.title}
              className="glass-panel p-6 rounded-3xl border border-slate-800 hover:border-slate-700 transition-all"
            >
              <h3 className="text-lg font-black text-white mb-2">{h.title}</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{h.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Prize Fund */}
      <PrizeFundSection />

      {/* Partner */}
      <PartnersSection />

      {/* Participation */}
      <ParticipationCTA />

      {/* Contacts */}
      <ContactsSection />
    </div>
  );
}
