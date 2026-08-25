import type { Metadata, Viewport } from 'next';
import { Noto_Sans_Georgian } from 'next/font/google';
import './globals.css';
import { TournamentProvider } from '@/lib/store';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ToastContainer from '@/components/ToastContainer';

const notoSansGeorgian = Noto_Sans_Georgian({
  subsets: ['georgian', 'latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-noto-sans-georgian',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'გაუზიარე მომავალს — მინი ფეხბურთის საქველმოქმედო ტურნირი',
  description:
    'შილდაში გამართული ყოველწლიური საქველმოქმედო მინი-ფეხბურთის ტურნირი — LIVE ანგარიშები, მატჩები, ცხრილები, პლეი-ოფი და საქველმოქმედო ინიციატივა ბავშვებისა და მრავალშვილიანი ოჯახების დასახმარებლად.',
  keywords: [
    'გაუზიარე მომავალს',
    'შილდა',
    'მინი ფეხბურთი',
    'ქველმოქმედება',
    'შილდის სტადიონი',
    'ფეხბურთის ჩემპიონატი',
    'live ანგარიშები',
  ],
  authors: [{ name: 'საინიციატივო ჯგუფი გაუზიარე მომავალს' }],
  openGraph: {
    title: 'გაუზიარე მომავალს — საქველმოქმედო მინი ფეხბურთის ჩემპიონატი (შილდა)',
    description:
      'გავერთიანდეთ სიკეთისთვის და ერთად დავეხმაროთ ბავშვებს! ❤️ LIVE ანგარიშები და ცხრილები.',
    type: 'website',
    locale: 'ka_GE',
    siteName: 'გაუზიარე მომავალს',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#090e17',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ka" className={`dark scroll-smooth ${notoSansGeorgian.variable}`}>
      <head>
        {/* HTTP → HTTPS redirect */}
        <script
          dangerouslySetInnerHTML={{
            __html: `if(typeof window!=='undefined'&&window.location.protocol==='http:'&&!window.location.hostname.includes('localhost')&&!window.location.hostname.includes('127.0.0.1')){window.location.replace('https://'+window.location.host+window.location.pathname+window.location.search+window.location.hash);}`,
          }}
        />
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-E6TS2QL86W" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-E6TS2QL86W');`,
          }}
        />
      </head>
      <body className={`min-h-screen bg-[#090e17] text-slate-100 flex flex-col antialiased selection:bg-emerald-500 selection:text-white ${notoSansGeorgian.className}`}>
        <TournamentProvider>
          <Navbar />
          <main className="flex-1 pb-16">{children}</main>
          <Footer />
          <ToastContainer />
        </TournamentProvider>
      </body>
    </html>
  );
}
