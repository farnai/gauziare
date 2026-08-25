import { Team, Match, StandingsRow, Tournament, KnockoutMatchView, RoundType } from './types';
import { INITIAL_TOURNAMENT } from './initialData';

/**
 * Calculates group standings dynamically from match results.
 * Single source of truth — never hardcodes values.
 */
export function calculateStandings(
  groupId: string,
  teams: Team[],
  matches: Match[],
  settings?: Partial<Tournament>
): StandingsRow[] {
  const pointsForWin = settings?.pointsForWin ?? 3;
  const pointsForDraw = settings?.pointsForDraw ?? 1;
  const pointsForLoss = settings?.pointsForLoss ?? 0;
  const qualificationCount = settings?.qualificationCount ?? 4;

  const groupTeams = teams.filter((t) => t.groupId === groupId);
  const activeGroupMatches = matches.filter(
    (m) => m.groupId === groupId && (m.status === 'finished' || m.status === 'live')
  );

  const statsMap: Record<
    string,
    {
      played: number;
      wins: number;
      draws: number;
      losses: number;
      goalsFor: number;
      goalsAgainst: number;
      points: number;
    }
  > = {};

  // Initialize
  for (const team of groupTeams) {
    statsMap[team.id] = {
      played: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      points: 0,
    };
  }

  // Accumulate finished and live matches
  for (const match of activeGroupMatches) {
    const home = statsMap[match.homeTeamId];
    const away = statsMap[match.awayTeamId];

    if (!home || !away) continue;

    home.played += 1;
    away.played += 1;
    home.goalsFor += match.homeScore;
    home.goalsAgainst += match.awayScore;
    away.goalsFor += match.awayScore;
    away.goalsAgainst += match.homeScore;

    if (match.homeScore > match.awayScore) {
      home.wins += 1;
      home.points += pointsForWin;
      away.losses += 1;
      away.points += pointsForLoss;
    } else if (match.homeScore < match.awayScore) {
      away.wins += 1;
      away.points += pointsForWin;
      home.losses += 1;
      home.points += pointsForLoss;
    } else {
      home.draws += 1;
      home.points += pointsForDraw;
      away.draws += 1;
      away.points += pointsForDraw;
    }
  }

  // Build rows
  const rows: StandingsRow[] = groupTeams.map((team) => {
    const st = statsMap[team.id] || {
      played: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      points: 0,
    };
    return {
      team,
      played: st.played,
      wins: st.wins,
      draws: st.draws,
      losses: st.losses,
      goalsFor: st.goalsFor,
      goalsAgainst: st.goalsAgainst,
      goalDifference: st.goalsFor - st.goalsAgainst,
      points: st.points,
      position: 0,
      isQualified: false,
    };
  });

  // Sort with head-to-head tiebreaker
  rows.sort((a, b) => {
    // 1. Points
    if (b.points !== a.points) return b.points - a.points;

    // 2. Goal Difference
    if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;

    // 3. Goals Scored
    if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;

    // 4. Head to Head check if 2 teams are tied
    const h2h = activeGroupMatches.find(
      (m) =>
        (m.homeTeamId === a.team.id && m.awayTeamId === b.team.id) ||
        (m.homeTeamId === b.team.id && m.awayTeamId === a.team.id)
    );
    if (h2h) {
      const aScore = h2h.homeTeamId === a.team.id ? h2h.homeScore : h2h.awayScore;
      const bScore = h2h.homeTeamId === b.team.id ? h2h.homeScore : h2h.awayScore;
      if (aScore !== bScore) return bScore - aScore;
    }

    // 5. Fallback display order
    return a.team.displayOrder - b.team.displayOrder;
  });

  // Set positions and qualification indicator
  return rows.map((row, idx) => ({
    ...row,
    position: idx + 1,
    isQualified: idx < qualificationCount,
  }));
}

/**
 * Returns the qualified teams from a group in order of position (1st to 4th).
 */
export function getQualifiedTeams(standings: StandingsRow[]): Team[] {
  return standings.filter((s) => s.isQualified).map((s) => s.team);
}

export function getWinnerTeamId(match?: Match): string | undefined {
  if (!match || match.status !== 'finished') return undefined;
  if (match.homeScore > match.awayScore) return match.homeTeamId;
  if (match.awayScore > match.homeScore) return match.awayTeamId;
  // Penalty shootout fallback if scores are equal
  if (match.homePenaltyScore !== undefined && match.awayPenaltyScore !== undefined) {
    if (match.homePenaltyScore > match.awayPenaltyScore) return match.homeTeamId;
    if (match.awayPenaltyScore > match.homePenaltyScore) return match.awayTeamId;
  }
  return undefined;
}

export function getLoserTeamId(match?: Match): string | undefined {
  if (!match || match.status !== 'finished') return undefined;
  if (match.homeScore > match.awayScore) return match.awayTeamId;
  if (match.awayScore > match.homeScore) return match.homeTeamId;
  if (match.homePenaltyScore !== undefined && match.awayPenaltyScore !== undefined) {
    if (match.homePenaltyScore > match.awayPenaltyScore) return match.awayTeamId;
    if (match.awayPenaltyScore > match.homePenaltyScore) return match.homeTeamId;
  }
  return undefined;
}

/**
 * Builds the dynamic playoff bracket tree and match views according to tournament rules:
 * QF1: A1 vs B4
 * QF2: A2 vs B3
 * QF3: A3 vs B2
 * QF4: A4 vs B1
 * SF1: Winner QF1 vs Winner QF4
 * SF2: Winner QF2 vs Winner QF3
 * Final: Winner SF1 vs Winner SF2
 * Third Place: Loser SF1 vs Loser SF2
 */
export function getKnockoutBracketView(
  groupAStandings: StandingsRow[],
  groupBStandings: StandingsRow[],
  allMatches: Match[],
  teams: Team[]
): {
  quarterFinals: KnockoutMatchView[];
  semiFinals: KnockoutMatchView[];
  final: KnockoutMatchView;
  thirdPlace: KnockoutMatchView;
} {
  const teamMap = new Map(teams.map((t) => [t.id, t]));

  const aQualified = getQualifiedTeams(groupAStandings);
  const bQualified = getQualifiedTeams(groupBStandings);

  // Helper to find existing match by bracketPosition
  const findMatch = (bracketPos: string) =>
    allMatches.find((m) => m.bracketPosition === bracketPos);

  // Check if all group stage matches have finished
  const groupMatches = allMatches.filter((m) => m.roundType === 'group');
  const isGroupStageFinished =
    groupMatches.length > 0 && groupMatches.every((m) => m.status === 'finished');

  // 1. Quarter Finals
  const qfConfigs = [
    {
      pos: 'QF1',
      title: '1/4 ფინალი #1',
      aRank: 0,
      bRank: 3,
      homePlaceholder: 'A ჯგუფის I ადგილი (A1)',
      awayPlaceholder: 'B ჯგუფის IV ადგილი (B4)',
    },
    {
      pos: 'QF2',
      title: '1/4 ფინალი #2',
      aRank: 1,
      bRank: 2,
      homePlaceholder: 'A ჯგუფის II ადგილი (A2)',
      awayPlaceholder: 'B ჯგუფის III ადგილი (B3)',
    },
    {
      pos: 'QF3',
      title: '1/4 ფინალი #3',
      aRank: 2,
      bRank: 1,
      homePlaceholder: 'A ჯგუფის III ადგილი (A3)',
      awayPlaceholder: 'B ჯგუფის II ადგილი (B2)',
    },
    {
      pos: 'QF4',
      title: '1/4 ფინალი #4',
      aRank: 3,
      bRank: 0,
      homePlaceholder: 'A ჯგუფის IV ადგილი (A4)',
      awayPlaceholder: 'B ჯგუფის I ადგილი (B1)',
    },
  ];

  const quarterFinals: KnockoutMatchView[] = qfConfigs.map((cfg) => {
    const existing = findMatch(cfg.pos);

    // Assign derived teams from group rankings if group stage is finished or explicitly set on match
    const derivedHome = isGroupStageFinished ? aQualified[cfg.aRank] : undefined;
    const derivedAway = isGroupStageFinished ? bQualified[cfg.bRank] : undefined;

    const homeTeam = existing?.homeTeamId ? teamMap.get(existing.homeTeamId) : derivedHome;
    const awayTeam = existing?.awayTeamId ? teamMap.get(existing.awayTeamId) : derivedAway;

    const isLocked = existing ? existing.status === 'live' || existing.status === 'finished' : false;

    return {
      id: existing?.id || `derived-${cfg.pos.toLowerCase()}`,
      bracketPosition: cfg.pos,
      title: cfg.title,
      roundType: 'quarter_final' as RoundType,
      homeTeam,
      awayTeam,
      homePlaceholder: homeTeam ? homeTeam.name : cfg.homePlaceholder,
      awayPlaceholder: awayTeam ? awayTeam.name : cfg.awayPlaceholder,
      homeScore: existing?.homeScore,
      awayScore: existing?.awayScore,
      homePenaltyScore: existing?.homePenaltyScore,
      awayPenaltyScore: existing?.awayPenaltyScore,
      hasPenalties: existing?.hasPenalties || (existing?.homePenaltyScore !== undefined && existing?.awayPenaltyScore !== undefined),
      status: existing?.status || 'scheduled',
      scheduledAt: existing?.scheduledAt || 'TBD',
      match: existing,
      winnerTeamId: getWinnerTeamId(existing),
      isLocked,
    };
  });

  // 2. Semi Finals (SF1 = Winner QF1 vs Winner QF2, SF2 = Winner QF3 vs Winner QF4)
  const qf1WinnerId = quarterFinals[0].winnerTeamId;
  const qf2WinnerId = quarterFinals[1].winnerTeamId;
  const qf3WinnerId = quarterFinals[2].winnerTeamId;
  const qf4WinnerId = quarterFinals[3].winnerTeamId;

  const sfConfigs = [
    {
      pos: 'SF1',
      title: '1/2 ფინალი #1',
      homeWinnerId: qf1WinnerId,
      awayWinnerId: qf2WinnerId,
      homeLabel: '1/4 #1 გამარჯვებული',
      awayLabel: '1/4 #2 გამარჯვებული',
    },
    {
      pos: 'SF2',
      title: '1/2 ფინალი #2',
      homeWinnerId: qf3WinnerId,
      awayWinnerId: qf4WinnerId,
      homeLabel: '1/4 #3 გამარჯვებული',
      awayLabel: '1/4 #4 გამარჯვებული',
    },
  ];

  const semiFinals: KnockoutMatchView[] = sfConfigs.map((cfg) => {
    const existing = findMatch(cfg.pos);
    const derivedHome = cfg.homeWinnerId ? teamMap.get(cfg.homeWinnerId) : undefined;
    const derivedAway = cfg.awayWinnerId ? teamMap.get(cfg.awayWinnerId) : undefined;

    const homeTeam = existing?.homeTeamId
      ? teamMap.get(existing.homeTeamId) || derivedHome
      : derivedHome;
    const awayTeam = existing?.awayTeamId
      ? teamMap.get(existing.awayTeamId) || derivedAway
      : derivedAway;

    const isLocked = existing ? existing.status === 'live' || existing.status === 'finished' : false;

    return {
      id: existing?.id || `derived-${cfg.pos.toLowerCase()}`,
      bracketPosition: cfg.pos,
      title: cfg.title,
      roundType: 'semi_final' as RoundType,
      homeTeam,
      awayTeam,
      homePlaceholder: cfg.homeLabel,
      awayPlaceholder: cfg.awayLabel,
      homeScore: existing?.homeScore,
      awayScore: existing?.awayScore,
      homePenaltyScore: existing?.homePenaltyScore,
      awayPenaltyScore: existing?.awayPenaltyScore,
      hasPenalties: existing?.hasPenalties || (existing?.homePenaltyScore !== undefined && existing?.awayPenaltyScore !== undefined),
      status: existing?.status || 'scheduled',
      scheduledAt: existing?.scheduledAt || 'TBD',
      match: existing,
      winnerTeamId: getWinnerTeamId(existing),
      isLocked,
    };
  });

  // 3. Final & Third Place
  const sf1WinnerId = semiFinals[0].winnerTeamId;
  const sf2WinnerId = semiFinals[1].winnerTeamId;
  const sf1LoserId = getLoserTeamId(semiFinals[0].match);
  const sf2LoserId = getLoserTeamId(semiFinals[1].match);

  const finalMatchRaw = findMatch('FINAL');
  const finalHome = finalMatchRaw?.homeTeamId
    ? teamMap.get(finalMatchRaw.homeTeamId)
    : sf1WinnerId
    ? teamMap.get(sf1WinnerId)
    : undefined;
  const finalAway = finalMatchRaw?.awayTeamId
    ? teamMap.get(finalMatchRaw.awayTeamId)
    : sf2WinnerId
    ? teamMap.get(sf2WinnerId)
    : undefined;

  const final: KnockoutMatchView = {
    id: finalMatchRaw?.id || 'derived-final',
    bracketPosition: 'FINAL',
    title: '🏆 დიდი ფინალი',
    roundType: 'final',
    homeTeam: finalHome,
    awayTeam: finalAway,
    homePlaceholder: '1/2 #1 გამარჯვებული',
    awayPlaceholder: '1/2 #2 გამარჯვებული',
    homeScore: finalMatchRaw?.homeScore,
    awayScore: finalMatchRaw?.awayScore,
    homePenaltyScore: finalMatchRaw?.homePenaltyScore,
    awayPenaltyScore: finalMatchRaw?.awayPenaltyScore,
    hasPenalties: finalMatchRaw?.hasPenalties || (finalMatchRaw?.homePenaltyScore !== undefined && finalMatchRaw?.awayPenaltyScore !== undefined),
    status: finalMatchRaw?.status || 'scheduled',
    scheduledAt: finalMatchRaw?.scheduledAt || 'TBD',
    match: finalMatchRaw,
    winnerTeamId: getWinnerTeamId(finalMatchRaw),
    isLocked: finalMatchRaw
      ? finalMatchRaw.status === 'live' || finalMatchRaw.status === 'finished'
      : false,
  };

  const thirdRaw = findMatch('THIRD_PLACE');
  const thirdHome = thirdRaw?.homeTeamId
    ? teamMap.get(thirdRaw.homeTeamId)
    : sf1LoserId
    ? teamMap.get(sf1LoserId)
    : undefined;
  const thirdAway = thirdRaw?.awayTeamId
    ? teamMap.get(thirdRaw.awayTeamId)
    : sf2LoserId
    ? teamMap.get(sf2LoserId)
    : undefined;

  const thirdPlace: KnockoutMatchView = {
    id: thirdRaw?.id || 'derived-third',
    bracketPosition: 'THIRD_PLACE',
    title: '🥉 III ადგილისთვის მატჩი',
    roundType: 'third_place',
    homeTeam: thirdHome,
    awayTeam: thirdAway,
    homePlaceholder: '1/2 #1 დამარცხებული',
    awayPlaceholder: '1/2 #2 დამარცხებული',
    homeScore: thirdRaw?.homeScore,
    awayScore: thirdRaw?.awayScore,
    homePenaltyScore: thirdRaw?.homePenaltyScore,
    awayPenaltyScore: thirdRaw?.awayPenaltyScore,
    hasPenalties: thirdRaw?.hasPenalties || (thirdRaw?.homePenaltyScore !== undefined && thirdRaw?.awayPenaltyScore !== undefined),
    status: thirdRaw?.status || 'scheduled',
    scheduledAt: thirdRaw?.scheduledAt || 'TBD',
    match: thirdRaw,
    winnerTeamId: getWinnerTeamId(thirdRaw),
    isLocked: thirdRaw ? thirdRaw.status === 'live' || thirdRaw.status === 'finished' : false,
  };

  return {
    quarterFinals,
    semiFinals,
    final,
    thirdPlace,
  };
}

/**
 * Updates match score ensuring score does not drop below 0.
 */
export function updateScore(
  match: Match,
  deltaHome: number,
  deltaAway: number
): Match {
  return {
    ...match,
    homeScore: Math.max(0, match.homeScore + deltaHome),
    awayScore: Math.max(0, match.awayScore + deltaAway),
  };
}

/**
 * Transitions match to LIVE state.
 */
export function startMatch(match: Match, period: '1st_half' | '2nd_half' = '1st_half'): Match {
  return {
    ...match,
    status: 'live',
    matchPeriod: period,
    startedAt: match.startedAt || new Date().toISOString(),
  };
}

/**
 * Sets match period (1st half, half time / break, 2nd half).
 */
export function setMatchPeriod(
  match: Match,
  period: '1st_half' | 'half_time' | '2nd_half'
): Match {
  return {
    ...match,
    matchPeriod: period,
  };
}

/**
 * Transitions match to FINISHED state.
 */
export function finishMatch(match: Match): Match {
  return {
    ...match,
    status: 'finished',
    matchPeriod: undefined,
    finishedAt: new Date().toISOString(),
  };
}

/**
 * Automatically creates or updates Knockout match objects (SF1, SF2, FINAL, THIRD_PLACE)
 * in the matches array based on finished Quarter Final and Semi Final winners/losers.
 */
export function autoPropagateKnockoutWinners(
  matches: Match[],
  teams: Team[]
): Match[] {
  const groupAStandings = calculateStandings('group-a', teams, matches, INITIAL_TOURNAMENT);
  const groupBStandings = calculateStandings('group-b', teams, matches, INITIAL_TOURNAMENT);
  const bracketView = getKnockoutBracketView(groupAStandings, groupBStandings, matches, teams);

  const updatedMatches = [...matches];

  const upsertMatch = (
    id: string,
    bracketPosition: string,
    roundType: RoundType,
    homeTeamId?: string,
    awayTeamId?: string
  ) => {
    const idx = updatedMatches.findIndex(
      (m) => m.id === id || m.bracketPosition === bracketPosition
    );
    if (idx >= 0) {
      const existing = updatedMatches[idx];
      const newHome = homeTeamId || existing.homeTeamId;
      const newAway = awayTeamId || existing.awayTeamId;
      if (existing.homeTeamId !== newHome || existing.awayTeamId !== newAway) {
        updatedMatches[idx] = {
          ...existing,
          homeTeamId: newHome || '',
          awayTeamId: newAway || '',
        };
      }
    } else if (homeTeamId || awayTeamId) {
      updatedMatches.push({
        id,
        tournamentId: 'tourn-shilda-2026',
        bracketPosition,
        roundType,
        homeTeamId: homeTeamId || '',
        awayTeamId: awayTeamId || '',
        scheduledAt: 'TBD',
        status: 'scheduled',
        homeScore: 0,
        awayScore: 0,
      });
    }
  };

  // SF1: QF1 winner vs QF2 winner
  const sf1HomeId = bracketView.quarterFinals[0]?.winnerTeamId;
  const sf1AwayId = bracketView.quarterFinals[1]?.winnerTeamId;
  upsertMatch('m-sf-1', 'SF1', 'semi_final', sf1HomeId, sf1AwayId);

  // SF2: QF3 winner vs QF4 winner
  const sf2HomeId = bracketView.quarterFinals[2]?.winnerTeamId;
  const sf2AwayId = bracketView.quarterFinals[3]?.winnerTeamId;
  upsertMatch('m-sf-2', 'SF2', 'semi_final', sf2HomeId, sf2AwayId);

  // FINAL: SF1 winner vs SF2 winner
  const finalHomeId = bracketView.semiFinals[0]?.winnerTeamId;
  const finalAwayId = bracketView.semiFinals[1]?.winnerTeamId;
  upsertMatch('m-final', 'FINAL', 'final', finalHomeId, finalAwayId);

  // THIRD PLACE: SF1 loser vs SF2 loser
  const thirdHomeId = getLoserTeamId(bracketView.semiFinals[0]?.match);
  const thirdAwayId = getLoserTeamId(bracketView.semiFinals[1]?.match);
  upsertMatch('m-third', 'THIRD_PLACE', 'third_place', thirdHomeId, thirdAwayId);

  return updatedMatches;
}
