export type MatchStatus = 'scheduled' | 'live' | 'finished' | 'postponed' | 'cancelled';
export type RoundType = 'group' | 'quarter_final' | 'semi_final' | 'final' | 'third_place';

export interface Tournament {
  id: string;
  name: string;
  year: number;
  location: string;
  description: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'completed' | 'upcoming';
  pointsForWin: number;
  pointsForDraw: number;
  pointsForLoss: number;
  qualificationCount: number;
}

export interface Group {
  id: string;
  tournamentId: string;
  name: string;
  code: 'A' | 'B';
  displayOrder: number;
}

export interface Team {
  id: string;
  groupId: string;
  name: string;
  logoUrl?: string;
  displayOrder: number;
}

export interface MatchEvent {
  id: string;
  matchId: string;
  eventType: 'goal' | 'yellow_card' | 'red_card';
  teamId: string;
  minute: number;
  description?: string;
  createdAt: string;
}

export interface Match {
  id: string;
  tournamentId: string;
  groupId?: string; // for group stage
  homeTeamId: string;
  awayTeamId: string;
  scheduledAt: string; // e.g. "18:30" or ISO
  status: MatchStatus;
  homeScore: number;
  awayScore: number;
  homePenaltyScore?: number;
  awayPenaltyScore?: number;
  hasPenalties?: boolean;
  startedAt?: string;
  finishedAt?: string;
  roundType: RoundType;
  roundOrder?: number;
  bracketPosition?: string; // e.g. "QF1", "QF2", "SF1", "FINAL"
  matchDay?: number;
  matchPeriod?: '1st_half' | 'half_time' | '2nd_half';
  notes?: string;
}

export interface StandingsRow {
  team: Team;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  position: number;
  isQualified: boolean;
}

export interface KnockoutMatchView {
  id: string;
  bracketPosition: string; // QF1, QF2, QF3, QF4, SF1, SF2, FINAL, THIRD_PLACE
  title: string; // "1/4 ფინალი #1", "1/2 ფინალი #1", "ფინალი"
  roundType: RoundType;
  homeTeam?: Team;
  awayTeam?: Team;
  homePlaceholder: string; // e.g. "A1 (გრემი)", "Winner QF1"
  awayPlaceholder: string; // e.g. "B4 (კალაური)", "Winner QF4"
  homeScore?: number;
  awayScore?: number;
  homePenaltyScore?: number;
  awayPenaltyScore?: number;
  hasPenalties?: boolean;
  status: MatchStatus;
  scheduledAt?: string;
  match?: Match;
  winnerTeamId?: string;
  isLocked: boolean; // locked if already started or finished
}

export interface BankAccount {
  bankName: string;
  accountNumber: string;
  recipient: string;
  purpose: string;
  icon?: string;
}

export interface Sponsor {
  name: string;
  role: string;
  description?: string;
  logoText?: string;
}
