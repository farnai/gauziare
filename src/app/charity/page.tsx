'use client';

import React from 'react';
import CharitySection from '@/components/CharitySection';
import ContactsSection from '@/components/ContactsSection';
import { Heart, Sparkles, ShieldCheck, Users, GraduationCap, Gift } from 'lucide-react';

export default function CharityPage() {
  const pillars = [
    {
      title: 'მრავალშვილიანი ოჯახები',
      desc: 'სოფელ შილდასა და მეზობელ სოფლებში მცხოვრები მრავალშვილიანი ოჯახების ყოველდღიურობის შემსუბუქება.',
      icon: Users,
    },
    {
      title: 'სასკოლო მზადება ბავშვებისთვის',
      desc: 'ახალი სასწავლო წლის წინ საჭირო სასკოლო ნივთებით, ჩანთებითა და რვეულებით ბავშვების უზრუნველყოფა.',
      icon: GraduationCap,
    },
    {
      title: 'სოციალურად დაუცველი ოჯახები',
      desc: 'პირველადი საჭიროების მატერიალური დახმარება და თანადგომა გაჭირვებაში მყოფი თანასოფლელებისთვის.',
      icon: Gift,
    },
  ];

  return (
    <div className="py-8">
      {/* Top Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl mb-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-xs sm:text-sm font-bold text-rose-400 mb-4">
          <Heart className="w-4 h-4 fill-rose-500" />
          <span>სიკეთის ინიციატივა</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
          გავერთიანდეთ სიკეთისთვის და ერთად დავეხმაროთ ბავშვებს! ❤️
        </h1>

        <p className="text-slate-300 text-sm sm:text-lg leading-relaxed">
          ტურნირი „გაუზიარე მომავალს“ შექმნილია იმისათვის, რათა სპორტული აზარტი და ჯანსაღი ცხოვრების წესი
          გავაერთიანოთ უმთავრეს ფასეულობასთან — <strong>სიკეთესა და ურთიერთთანადგომასთან</strong>.
        </p>
      </div>

      {/* 3 Pillars */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="glass-panel p-6 rounded-3xl border border-slate-800 flex flex-col items-start"
              >
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-white mb-2">{p.title}</h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{p.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Transparency Guarantee */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 bg-slate-900/60 flex items-center gap-4">
          <ShieldCheck className="w-8 h-8 text-emerald-400 shrink-0" />
          <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            <strong className="text-white block font-bold mb-0.5">სრული გამჭვირვალობის გარანტია:</strong>
            ყველა შემოწირულობა, საწევრო შენატანი და ხარჯთაღრიცხვა ღიად გასაჯაროვდება საინიციატივო ჯგუფის მიერ
            ტურნირის დასრულებისთანავე.
          </div>
        </div>
      </div>

      {/* Interactive Accounts & Copy */}
      <CharitySection />

      {/* Direct Contact */}
      <ContactsSection />
    </div>
  );
}
