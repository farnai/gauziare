import Hero from '@/components/Hero';
import FinalNightBanner from '@/components/FinalNightBanner';
import LiveMatchBanner from '@/components/LiveMatchBanner';
import TournamentTimeline from '@/components/TournamentTimeline';
import TodaysMatches from '@/components/TodaysMatches';
import RecentResults from '@/components/RecentResults';
import StandingsTable from '@/components/StandingsTable';
import KnockoutBracket from '@/components/KnockoutBracket';
import CharitySection from '@/components/CharitySection';
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

      {/* 3. Tournament Progress Timeline */}
      <TournamentTimeline />

      {/* 4. Today's Matches */}
      <TodaysMatches />

      {/* 5. Recent Match Results */}
      <RecentResults />

      {/* 6. Knockout Playoff Bracket */}
      <KnockoutBracket />

      {/* 7. Group Standings Tables */}
      <StandingsTable />

      {/* 8. Charity & Donation Section */}
      <CharitySection />

      {/* 9. Prize Fund */}
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
