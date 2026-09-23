import Hero from '@/components/Hero';
import FinalNightBanner from '@/components/FinalNightBanner';
import LiveMatchBanner from '@/components/LiveMatchBanner';
import TournamentTimeline from '@/components/TournamentTimeline';
import TodaysMatches from '@/components/TodaysMatches';
import RecentResults from '@/components/RecentResults';
import StandingsTable from '@/components/StandingsTable';
import KnockoutBracket from '@/components/KnockoutBracket';
import CharityDistributionReport from '@/components/CharityDistributionReport';
import PrizeFundSection from '@/components/PrizeFundSection';
import PartnersSection from '@/components/PartnersSection';
import ParticipationCTA from '@/components/ParticipationCTA';
import ContactsSection from '@/components/ContactsSection';

export default function HomePage() {
  return (
    <div className="space-y-4">
      {/* 1. Hero & Identity */}
      <Hero />

      {/* 2. LIVE Scoreboard Banner */}
      <LiveMatchBanner />

      {/* 3. Final Night Grand Announcement & Schedule */}
      <FinalNightBanner />

      {/* 4. Tournament Progress Timeline */}
      <TournamentTimeline />

      {/* 5. Official Charity Funds Distribution Report (4 600 ₾) */}
      <CharityDistributionReport />

      {/* 6. Today's Matches */}
      <TodaysMatches />

      {/* 7. Recent Match Results */}
      <RecentResults />

      {/* 8. Knockout Playoff Bracket */}
      <KnockoutBracket />

      {/* 9. Group Standings Tables */}
      <StandingsTable />

      {/* 10. Prize Fund */}
      <PrizeFundSection />

      {/* 10. Tournament Partner */}
      <PartnersSection />

      {/* 11. Participation Registration Form */}
      <ParticipationCTA />

      {/* 12. Contacts & Social Media */}
      <ContactsSection />
    </div>
  );
}
