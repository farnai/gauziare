'use client';

import React from 'react';
import CharityDistributionReport from '@/components/CharityDistributionReport';
import ContactsSection from '@/components/ContactsSection';
import { Heart, Sparkles, ShieldCheck, Users, Gift, CheckCircle2 } from 'lucide-react';

export default function CharityPage() {
  const pillars = [
    {
      title: 'მარიამ მამულაშვილის რეაბილიტაცია',
      desc: '3 000 ₾ გადაეცა 6 წლის მარიამს (დიაგნოზი: აუტოიმუნური ენცეფალიტი) სასიცოცხლო სარეაბილიტაციო კურსის დასაფინანსებლად.',
      icon: Heart,
      amount: '3 000 ₾',
      color: 'text-rose-400 border-rose-500/30 bg-rose-500/10',
    },
    {
      title: '4 მრავალშვილიანი ოჯახი',
      desc: '1 600 ₾ თანაბრად (400-400 ₾) გადანაწილდა: ბეგაშვილების, ხუციშვილების, მამადაშვილების და კიკოლაშვილ-ფერიაშვილების ოჯახებზე.',
      icon: Users,
      amount: '1 600 ₾',
      color: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10',
    },
    {
      title: '100% გამჭვირვალე ანგარიშგება',
      desc: 'შეგროვილი 4 600 ლარი სრულად, თითოეული თეთრის სიზუსტით მოხმარდა მათ, ვისაც ეს ყველაზე მეტად სჭირდებოდა.',
      icon: ShieldCheck,
      amount: '4 600 ₾',
      color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
    },
  ];

  return (
    <div className="py-8 space-y-8">
      {/* Top Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/35 text-xs sm:text-sm font-bold text-emerald-300 mb-4 shadow-sm">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>შედეგი: თანხები სრულად გადანაწილდა</span>
          <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
          საქველმოქმედო თანხების განაწილება ❤️
        </h1>

        <p className="text-slate-300 text-sm sm:text-lg leading-relaxed max-w-2xl mx-auto">
          ტურნირის „გაუზიარე მომავალს“ ფარგლებში შეგროვილი <strong>4 600 ლარი</strong> დაპირებისამებრ
          სრულად გადანაწილდა 6 წლის მარიამ მამულაშვილის რეაბილიტაციასა და 4 მრავალშვილიან ოჯახზე.
        </p>
      </div>

      {/* 3 Pillars Summary */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="glass-panel p-6 rounded-3xl border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center ${p.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-mono font-black text-white text-lg px-3 py-1 rounded-xl bg-slate-900 border border-slate-800">
                      {p.amount}
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-white mb-2">{p.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Transparency Guarantee Note */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-emerald-500/30 bg-emerald-950/20 flex items-start sm:items-center gap-4">
          <ShieldCheck className="w-7 h-7 text-emerald-400 shrink-0 mt-0.5 sm:mt-0" />
          <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            <strong className="text-white font-bold block mb-0.5">სრული გამჭვირვალობის პირობა შესრულებულია:</strong>
            საინიციატივო ჯგუფის წევრებმა ერთსულოვნად მიიღეს გადაწყვეტილება და შეგროვილი თანხა უშუალოდ გადასცეს
            მარიამ მამულაშვილის ოჯახსა და ოთხ მრავალშვილიან ოჯახს. მადლობა თითოეულ თქვენგანს თანადგომისთვის!
          </div>
        </div>
      </div>

      {/* Official Full Report Component with Bank Accounts */}
      <CharityDistributionReport />

      {/* Direct Contact */}
      <ContactsSection />
    </div>
  );
}
