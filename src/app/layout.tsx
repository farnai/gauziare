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
  metadataBase: new URL('https://gauziare.ge'),
  title: 'გაუზიარე მომავალს — საფინალო საღამო (5 სექტემბერი)',
  description:
    'საქველმოქმედო ტურნირის კულმინაცია! 5 სექტემბერს შილდის სტადიონზე: 20:00 ამხანაგური მატჩი & მაყურებელთა ჩელენჯი, 21:00 დიდი ფინალი: შილდა 🆚 თელავი. LIVE ანგარიშები და განრიგი ❤️⚽️',
  keywords: [
    'გაუზიარე მომავალს',
    'შილდა',
    'მინი ფეხბურთი',
    'ქველმოქმედება',
    'შილდის სტადიონი',
    'ფეხბურთის ჩემპიონატი',
    'live ანგარიშები',
    'საფინალო საღამო',
    'შილდა თელავი ფინალი',
  ],
  authors: [{ name: 'საინიციატივო ჯგუფი გაუზიარე მომავალს' }],
  openGraph: {
    title: '🔥 საფინალო საღამო • 5 სექტემბერი | გაუზიარე მომავალს',
    description:
      'საქველმოქმედო ტურნირის კულმინაცია! 5 სექტემბერს შილდის სტადიონზე: 20:00 ამხანაგური მატჩი & მაყურებელთა ჩელენჯი, 21:00 დიდი ფინალი: შილდა 🆚 თელავი. LIVE ანგარიშები და განრიგი ❤️⚽️',
    url: 'https://gauziare.ge',
    siteName: 'გაუზიარე მომავალს',
    images: [
      {
        url: 'https://gauziare.ge/og-final-night.jpg',
        width: 1024,
        height: 537,
        alt: 'საფინალო საღამო • 5 სექტემბერი — გაუზიარე მომავალს',
      },
    ],
    locale: 'ka_GE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '🔥 საფინალო საღამო • 5 სექტემბერი | გაუზიარე მომავალს',
    description:
      'საქველმოქმედო ტურნირის კულმინაცია! 5 სექტემბერს შილდის სტადიონზე: 20:00 ამხანაგური მატჩი & მაყურებელთა ჩელენჯი, 21:00 დიდი ფინალი: შილდა 🆚 თელავი. LIVE ანგარიშები და განრიგი ❤️⚽️',
    images: ['https://gauziare.ge/og-final-night.jpg'],
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
        <meta property="og:title" content="🔥 საფინალო საღამო • 5 სექტემბერი | გაუზიარე მომავალს" />
        <meta property="og:description" content="საქველმოქმედო ტურნირის კულმინაცია! 5 სექტემბერს შილდის სტადიონზე: 20:00 ამხანაგური მატჩი & მაყურებელთა ჩელენჯი, 21:00 დიდი ფინალი: შილდა 🆚 თელავი. LIVE ანგარიშები და განრიგი ❤️⚽️" />
        <meta property="og:image" content="https://gauziare.ge/og-final-night.jpg" />
        <meta property="og:image:secure_url" content="https://gauziare.ge/og-final-night.jpg" />
        <meta property="og:image:width" content="1024" />
        <meta property="og:image:height" content="537" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta name="twitter:image" content="https://gauziare.ge/og-final-night.jpg" />
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
