'use client';

import React from 'react';
import {
  CONTACT_PHONES,
  CONTACT_PHONES_FORMATTED,
  FACEBOOK_EVENT_URL,
  FACEBOOK_PAGE_URL,
} from '@/lib/initialData';
import { Phone, MapPin, Calendar, ExternalLink, Share2 } from 'lucide-react';

export default function ContactsSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contact info */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-bold mb-3">
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>კონტაქტი</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
              ტურნირის საორგანიზაციო საკონტაქტო
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mb-6">
              ნებისმიერი კითხვისთვის ან ორგანიზაციული დეტალების დასაზუსტებლად დაგვიკავშირდით:
            </p>

            <div className="space-y-3 mb-6">
              {CONTACT_PHONES.map((phone, idx) => (
                <a
                  key={phone}
                  href={`tel:${phone}`}
                  className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-800/80 text-white font-mono text-base font-extrabold transition-all group"
                >
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 group-hover:scale-105 transition-transform">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[11px] text-slate-400 font-sans font-medium">
                      ორგანიზატორი #{idx + 1}
                    </span>
                    <span>📞 {CONTACT_PHONES_FORMATTED[idx]}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400 pt-4 border-t border-slate-800/80">
            <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>ლოკაცია: სოფელ შილდის სტადიონი, ყვარლის მუნიციპალიტეტი</span>
          </div>
        </div>

        {/* Social media & Events */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold mb-3 border border-blue-500/20">
              <Share2 className="w-3.5 h-3.5" />
              <span>სოციალური ქსელი</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
              გაიგე მეტი და შემოგვიერთდი
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mb-6">
              თვალი ადევნეთ ტურნირის მიმდინარეობას და გაუზიარეთ მეგობრებს ოფიციალურ Facebook გვერდზე:
            </p>

            <div className="space-y-3 mb-6">
              <a
                href={FACEBOOK_EVENT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-blue-950/40 border border-blue-800/40 hover:bg-blue-900/40 hover:border-blue-500/60 text-blue-200 font-bold text-sm transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-lg shrink-0">
                    f
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-white font-extrabold text-sm">Facebook Event</span>
                    <span className="text-[11px] text-blue-300/80">ტურნირის ოფიციალური ღონისძიება</span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-blue-400 group-hover:translate-x-0.5 transition-transform" />
              </a>

              <a
                href={FACEBOOK_PAGE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-blue-950/40 border border-blue-800/40 hover:bg-blue-900/40 hover:border-blue-500/60 text-blue-200 font-bold text-sm transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-700 flex items-center justify-center text-white font-black text-lg shrink-0">
                    f
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-white font-extrabold text-sm">ოფიციალური Facebook გვერდი</span>
                    <span className="text-[11px] text-blue-300/80">საინიციატივო ჯგუფი „გაუზიარე მომავალს“</span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-blue-400 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400 pt-4 border-t border-slate-800/80">
            <Calendar className="w-4 h-4 text-blue-400 shrink-0" />
            <span>სტარტი: 22 აგვისტო, 2026</span>
          </div>
        </div>
      </div>
    </section>
  );
}
