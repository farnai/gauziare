'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, Trophy, ShieldAlert } from 'lucide-react';
import { FACEBOOK_EVENT_URL, FACEBOOK_PAGE_URL } from '@/lib/initialData';

export default function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-[#060a10] pt-12 pb-16 text-slate-400 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Col 1: Identity */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-black text-base shadow">
                ⚽
              </div>
              <span className="font-extrabold text-white text-lg tracking-tight">
                გაუზიარე მომავალს
              </span>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-md">
              სამოყვარულო მინი-ფეხბურთის ყოველწლიური საქველმოქმედო ტურნირი სოფელ შილდაში.
              სპორტი + თანადგომა + სიკეთე + ბავშვების მხარდაჭერა.
            </p>
            <div className="text-emerald-400 font-bold text-xs flex items-center gap-1.5 pt-1">
              <span>გავერთიანდეთ სიკეთისთვის და ერთად დავეხმაროთ ბავშვებს!</span>
              <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 inline" />
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-2.5">
            <h4 className="font-black text-white text-xs uppercase tracking-wider">ნავიგაცია</h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  მთავარი გვერდი
                </Link>
              </li>
              <li>
                <Link href="/#live-section" className="text-rose-400 hover:text-rose-300 font-bold">
                  🔴 LIVE ანგარიშები
                </Link>
              </li>
              <li>
                <Link href="/#standings-section" className="hover:text-white transition-colors">
                  სატურნირო ცხრილები
                </Link>
              </li>
              <li>
                <Link href="/#playoff-section" className="hover:text-white transition-colors">
                  პლეი-ოფის ბადე
                </Link>
              </li>
              <li>
                <Link href="/charity" className="text-emerald-400 hover:text-emerald-300 font-bold">
                  ❤️ დაეხმარე მომავალს
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  ტურნირის შესახებ
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Social & Admin */}
          <div className="space-y-2.5">
            <h4 className="font-black text-white text-xs uppercase tracking-wider">რესურსები</h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <a
                  href={FACEBOOK_PAGE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Facebook გვერდი
                </a>
              </li>
              <li>
                <a
                  href={FACEBOOK_EVENT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Facebook ღონისძიება
                </a>
              </li>
              <li>
                <Link
                  href="/admin"
                  className="text-amber-400/90 hover:text-amber-300 flex items-center gap-1 font-semibold"
                >
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>ადმინ პანელი (LIVE მართვა)</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 საინიციატივო ჯგუფი „გაუზიარე მომავალს“ • სოფელი შილდა, საქართველო
          </div>
          <div className="flex items-center gap-1">
            <span>შექმნილია სიყვარულითა და თანადგომით</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </div>
        </div>
      </div>
    </footer>
  );
}
