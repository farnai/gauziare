'use client';

import React, { createContext, useContext, useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { Match, Team, Group, Tournament, StandingsRow, KnockoutMatchView, MatchStatus } from './types';
import {
  INITIAL_TOURNAMENT,
  INITIAL_GROUPS,
  INITIAL_TEAMS,
  INITIAL_MATCHES,
} from './initialData';
import {
  calculateStandings,
  getKnockoutBracketView,
  startMatch as startMatchFn,
  setMatchPeriod as setMatchPeriodFn,
  finishMatch as finishMatchFn,
  autoPropagateKnockoutWinners,
} from './tournament';
import { supabase, isSupabaseConfigured } from './supabase';

interface ScoreHistoryItem {
  matchId: string;
  previousHome: number;
  previousAway: number;
  timestamp: number;
}

interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  description?: string;
}

interface TournamentContextType {
  tournament: Tournament;
  groups: Group[];
  teams: Team[];
  matches: Match[];
  liveMatch: Match | null;
  upcomingMatches: Match[];
  finishedMatches: Match[];
  groupAStandings: StandingsRow[];
  groupBStandings: StandingsRow[];
  knockoutBracket: {
    quarterFinals: KnockoutMatchView[];
    semiFinals: KnockoutMatchView[];
    final: KnockoutMatchView;
    thirdPlace: KnockoutMatchView;
  };
  isAdmin: boolean;
  toasts: ToastMessage[];
  addToast: (type: ToastMessage['type'], title: string, description?: string) => void;
  removeToast: (id: string) => void;
  loginAdmin: (pass: string) => boolean;
  logoutAdmin: () => void;
  updateScore: (matchId: string, deltaHome: number, deltaAway: number) => void;
  undoScore: (matchId: string) => void;
  startMatch: (matchId: string, period?: '1st_half' | '2nd_half') => void;
  setMatchPeriod: (matchId: string, period: '1st_half' | 'half_time' | '2nd_half' | 'penalties') => void;
  updatePenaltyScore: (matchId: string, deltaHome: number, deltaAway: number) => void;
  cancelLiveMatch: (matchId: string) => void;
  finishMatch: (matchId: string) => void;
  updateMatchDetails: (match: Partial<Match> & { id: string }) => void;
  createMatch: (match: Omit<Match, 'id'>) => void;
  deleteMatch: (matchId: string) => void;
  resetAllData: () => void;
  teamMap: Map<string, Team>;
}

const TournamentContext = createContext<TournamentContextType | null>(null);

const STORAGE_KEY_MATCHES = 'gauziare_momavals_matches_v3';
const STORAGE_KEY_ADMIN = 'gauziare_momavals_admin_auth';
const BROADCAST_CHANNEL_NAME = 'gauziare_momavals_realtime_bus';
const ADMIN_SECRET_PIN = '7776'; // PIN: 7776

export const TournamentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tournament] = useState<Tournament>(INITIAL_TOURNAMENT);
  const [groups] = useState<Group[]>(INITIAL_GROUPS);
  const [teams] = useState<Team[]>(INITIAL_TEAMS);
  const [matches, setMatches] = useState<Match[]>(INITIAL_MATCHES);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [historyStack, setHistoryStack] = useState<ScoreHistoryItem[]>([]);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const teamMap = useMemo(() => new Map(teams.map((t) => [t.id, t])), [teams]);

  // Toast Helper
  const addToast = useCallback(
    (type: ToastMessage['type'], title: string, description?: string) => {
      const id = `${Date.now()}-${Math.random()}`;
      setToasts((prev) => [...prev, { id, type, title, description }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 4000);
    },
    []
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const lastLocalMutationRef = useRef<number>(0);

  // Initialize from LocalStorage and Server API
  useEffect(() => {
    let isMounted = true;

    // 1. Instant load from local storage
    if (typeof window !== 'undefined') {
      const savedMatches = localStorage.getItem(STORAGE_KEY_MATCHES);
      const savedTime = localStorage.getItem('gauziare_last_updated');
      if (savedTime) {
        lastLocalMutationRef.current = Number(savedTime) || 0;
      }
      if (savedMatches) {
        try {
          const parsed = JSON.parse(savedMatches);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setMatches(parsed);
          }
        } catch {
          // ignore corrupted data
        }
      }

      const savedAdmin = localStorage.getItem(STORAGE_KEY_ADMIN);
      if (savedAdmin === 'true') {
        setIsAdmin(true);
      }
    }

    const fetchServerState = async () => {
      try {
        let res = await fetch(`/api/tournament.php?t=${Date.now()}`, {
          cache: 'no-store',
          headers: { 'Cache-Control': 'no-cache' },
        });
        if (!res.ok) {
          res = await fetch(`/api/tournament?t=${Date.now()}`, {
            cache: 'no-store',
            headers: { 'Cache-Control': 'no-cache' },
          });
        }
        if (res.ok) {
          const data = await res.json();
          if (data?.matches && Array.isArray(data.matches) && isMounted) {
            // Never overwrite if our local mutation is newer than the server response
            if (data.lastUpdated && data.lastUpdated < lastLocalMutationRef.current) {
              return;
            }
            setMatches(data.matches);
            if (typeof window !== 'undefined') {
              localStorage.setItem(STORAGE_KEY_MATCHES, JSON.stringify(data.matches));
              localStorage.setItem('gauziare_last_updated', String(data.lastUpdated || Date.now()));
            }
          }
        }
      } catch (err) {
        // network fallback
      }
    };

    // Fetch from server
    fetchServerState();

    // Fast Poller for spectators
    const pollInterval = setInterval(fetchServerState, 2500);

    return () => {
      isMounted = false;
      clearInterval(pollInterval);
    };
  }, []);

  // Broadcast Channel for Instant Multi-tab realtime sync
  useEffect(() => {
    if (typeof window === 'undefined' || !('BroadcastChannel' in window)) return;

    const channel = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
    channel.onmessage = (event) => {
      if (event.data?.type === 'MATCHES_UPDATED' && Array.isArray(event.data.payload)) {
        setMatches(event.data.payload);
      }
    };

    return () => {
      channel.close();
    };
  }, []);

  // Supabase Realtime Listener (if configured)
  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) return;
    const client = supabase;

    const subscription = client
      .channel('public:matches')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'matches' },
        () => {
          client
            .from('matches')
            .select('*')
            .then(({ data }) => {
              if (data && data.length > 0) {
                const mapped: Match[] = data.map((d) => ({
                  id: d.id,
                  tournamentId: d.tournament_id,
                  groupId: d.group_id,
                  homeTeamId: d.home_team_id,
                  awayTeamId: d.away_team_id,
                  scheduledAt: d.scheduled_at,
                  status: d.status,
                  homeScore: d.home_score,
                  awayScore: d.away_score,
                  startedAt: d.started_at,
                  finishedAt: d.finished_at,
                  roundType: d.round_type,
                  bracketPosition: d.bracket_position,
                  matchDay: d.match_day,
                }));
                setMatches(mapped);
              }
            });
        }
      )
      .subscribe();

    return () => {
      client.removeChannel(subscription);
    };
  }, []);

  // Sync matches state to storage, cloud server API, and broadcast channel
  const persistMatches = useCallback(
    (newMatches: Match[]) => {
      const propagated = autoPropagateKnockoutWinners(newMatches, teams);
      const now = Date.now();
      lastLocalMutationRef.current = now;
      setMatches(propagated);

      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY_MATCHES, JSON.stringify(propagated));
        localStorage.setItem('gauziare_last_updated', String(now));

        if ('BroadcastChannel' in window) {
          const channel = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
          channel.postMessage({ type: 'MATCHES_UPDATED', payload: propagated });
          channel.close();
        }
      }

      // Immediately push update to persistent server API so all clients receive it
      fetch('/api/tournament.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ matches: propagated, lastUpdated: now }),
      })
        .catch(() => {
          return fetch('/api/tournament', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ matches: propagated, lastUpdated: now }),
          });
        })
        .catch((err) => {
          console.error('Failed to sync to server API:', err);
        });
    },
    [teams]
  );

  // Admin Auth Handlers
  const loginAdmin = useCallback(
    (pinOrPass: string): boolean => {
      const clean = pinOrPass.trim().toLowerCase();
      if (clean === ADMIN_SECRET_PIN || clean === 'admin' || clean === 'shilda2026') {
        setIsAdmin(true);
        if (typeof window !== 'undefined') {
          localStorage.setItem(STORAGE_KEY_ADMIN, 'true');
        }
        addToast('success', 'ავტორიზაცია წარმატებულია', 'ადმინისტრატორის რეჟიმი გააქტიურდა');
        return true;
      } else {
        addToast('error', 'არასწორი პაროლი / PIN', 'სცადეთ თავიდან');
        return false;
      }
    },
    [addToast]
  );

  const logoutAdmin = useCallback(() => {
    setIsAdmin(false);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY_ADMIN);
    }
    addToast('info', 'გამოსვლა', 'ადმინისტრატორის სესია დასრულდა');
  }, [addToast]);

  // Live Score Updates
  const updateScore = useCallback(
    (matchId: string, deltaHome: number, deltaAway: number) => {
      setMatches((prev) => {
        const target = prev.find((m) => m.id === matchId);
        if (!target) return prev;

        // record history for undo
        setHistoryStack((h) => [
          ...h,
          {
            matchId,
            previousHome: target.homeScore,
            previousAway: target.awayScore,
            timestamp: Date.now(),
          },
        ]);

        const nextMatches = prev.map((m) => {
          if (m.id !== matchId) return m;
          const newHome = Math.max(0, m.homeScore + deltaHome);
          const newAway = Math.max(0, m.awayScore + deltaAway);
          return { ...m, homeScore: newHome, awayScore: newAway };
        });

        persistMatches(nextMatches);
        return nextMatches;
      });
    },
    [persistMatches]
  );

  // Undo Last Score Change
  const undoScore = useCallback(
    (matchId: string) => {
      const last = [...historyStack].reverse().find((h) => h.matchId === matchId);
      if (!last) {
        addToast('warning', 'ისტორია ცარიელია', 'გასაუქმებელი ცვლილება ვერ მოიძებნა');
        return;
      }

      setMatches((prev) => {
        const nextMatches = prev.map((m) => {
          if (m.id !== matchId) return m;
          return { ...m, homeScore: last.previousHome, awayScore: last.previousAway };
        });
        persistMatches(nextMatches);
        return nextMatches;
      });

      // Remove from history stack
      setHistoryStack((prev) => {
        const idx = prev.findIndex((h) => h === last);
        if (idx >= 0) {
          const clone = [...prev];
          clone.splice(idx, 1);
          return clone;
        }
        return prev;
      });

      addToast('info', 'ანგარიშის ცვლილება გაუქმდა');
    },
    [historyStack, persistMatches, addToast]
  );

  // Start Match
  const startMatch = useCallback(
    (matchId: string, period: '1st_half' | '2nd_half' = '1st_half') => {
      setMatches((prev) => {
        const nextMatches = prev.map((m) => (m.id === matchId ? startMatchFn(m, period) : m));
        persistMatches(nextMatches);
        return nextMatches;
      });
      addToast('success', 'მატჩი დაიწყო!', `${period === '1st_half' ? 'I ტაიმი' : 'II ტაიმი'} ჩაირთო LIVE რეჟიმში`);
    },
    [persistMatches, addToast]
  );

  // Set Match Period (1st Half, Half Time / Break, 2nd Half, Penalties)
  const setMatchPeriod = useCallback(
    (matchId: string, period: '1st_half' | 'half_time' | '2nd_half' | 'penalties') => {
      setMatches((prev) => {
        const nextMatches = prev.map((m) => {
          if (m.id !== matchId) return m;
          const updated = setMatchPeriodFn(m, period as any);
          return {
            ...updated,
            matchPeriod: period,
            hasPenalties: period === 'penalties' ? true : m.hasPenalties,
          };
        });
        persistMatches(nextMatches);
        return nextMatches;
      });
      const label =
        period === '1st_half'
          ? 'I ტაიმი'
          : period === 'half_time'
          ? 'შესვენება (ტაიმი დასრულდა)'
          : period === '2nd_half'
          ? 'II ტაიმი'
          : '⚽ პენალტების სერია';
      addToast('info', `პერიოდი: ${label}`);
    },
    [persistMatches, addToast]
  );

  // Update Penalty Score (+1 / -1)
  const updatePenaltyScore = useCallback(
    (matchId: string, deltaHome: number, deltaAway: number) => {
      setMatches((prev) => {
        const nextMatches = prev.map((m) => {
          if (m.id !== matchId) return m;
          const currentHomePen = m.homePenaltyScore ?? 0;
          const currentAwayPen = m.awayPenaltyScore ?? 0;
          const newHomePen = Math.max(0, currentHomePen + deltaHome);
          const newAwayPen = Math.max(0, currentAwayPen + deltaAway);
          return {
            ...m,
            hasPenalties: true,
            homePenaltyScore: newHomePen,
            awayPenaltyScore: newAwayPen,
          };
        });
        persistMatches(nextMatches);
        return nextMatches;
      });
    },
    [persistMatches]
  );

  // Cancel Live Status & Reset Match to Scheduled
  const cancelLiveMatch = useCallback(
    (matchId: string) => {
      setMatches((prev) => {
        const nextMatches = prev.map((m) => {
          if (m.id !== matchId) return m;
          return {
            ...m,
            status: 'scheduled' as MatchStatus,
            homeScore: 0,
            awayScore: 0,
            homePenaltyScore: undefined,
            awayPenaltyScore: undefined,
            hasPenalties: false,
            matchPeriod: '1st_half' as const,
            startedAt: undefined,
            finishedAt: undefined,
          };
        });
        persistMatches(nextMatches);
        return nextMatches;
      });
      addToast('warning', 'LIVE გაუქმდა', 'მატჩი დაუბრუნდა დაგეგმილ მდგომარეობას (0 - 0)');
    },
    [persistMatches, addToast]
  );

  // Finish Match
  const finishMatch = useCallback(
    (matchId: string) => {
      setMatches((prev) => {
        const nextMatches = prev.map((m) => (m.id === matchId ? finishMatchFn(m) : m));
        persistMatches(nextMatches);
        return nextMatches;
      });
      addToast('success', 'მატჩი დასრულდა', 'შედეგი ოფიციალურად დაფიქსირდა და ცხრილები გადაითვალა');
    },
    [persistMatches, addToast]
  );

  // Update Match Details / Correction
  const updateMatchDetails = useCallback(
    (updatedData: Partial<Match> & { id: string }) => {
      setMatches((prev) => {
        const nextMatches = prev.map((m) => (m.id === updatedData.id ? { ...m, ...updatedData } : m));
        persistMatches(nextMatches);
        return nextMatches;
      });
      addToast('success', 'მატჩის მონაცემები განახლდა');
    },
    [persistMatches, addToast]
  );

  // Create new match
  const createMatch = useCallback(
    (newMatch: Omit<Match, 'id'>) => {
      const id = `match-${Date.now()}`;
      const fullMatch: Match = { ...newMatch, id };
      setMatches((prev) => {
        const nextMatches = [...prev, fullMatch];
        persistMatches(nextMatches);
        return nextMatches;
      });
      addToast('success', 'ახალი მატჩი დაემატა');
    },
    [persistMatches, addToast]
  );

  // Delete match
  const deleteMatch = useCallback(
    (matchId: string) => {
      setMatches((prev) => {
        const nextMatches = prev.filter((m) => m.id !== matchId);
        persistMatches(nextMatches);
        return nextMatches;
      });
      addToast('info', 'მატჩი წაიშალა');
    },
    [persistMatches, addToast]
  );

  // Reset to initial seed
  const resetAllData = useCallback(() => {
    persistMatches(INITIAL_MATCHES);
    setHistoryStack([]);
    fetch('/api/tournament', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'reset' }),
    }).catch(() => {});
    addToast('info', 'მონაცემები განულდა საწყის მდგომარეობამდე');
  }, [persistMatches, addToast]);

  // Derived Values
  const liveMatch = useMemo(() => matches.find((m) => m.status === 'live') || null, [matches]);

  const upcomingMatches = useMemo(
    () => matches.filter((m) => m.status === 'scheduled'),
    [matches]
  );

  const finishedMatches = useMemo(
    () => matches.filter((m) => m.status === 'finished'),
    [matches]
  );

  // Group Standings
  const groupAStandings = useMemo(
    () => calculateStandings('group-a', teams, matches, tournament),
    [teams, matches, tournament]
  );

  const groupBStandings = useMemo(
    () => calculateStandings('group-b', teams, matches, tournament),
    [teams, matches, tournament]
  );

  // Knockout Bracket
  const knockoutBracket = useMemo(
    () => getKnockoutBracketView(groupAStandings, groupBStandings, matches, teams),
    [groupAStandings, groupBStandings, matches, teams]
  );

  return (
    <TournamentContext.Provider
      value={{
        tournament,
        groups,
        teams,
        matches,
        liveMatch,
        upcomingMatches,
        finishedMatches,
        groupAStandings,
        groupBStandings,
        knockoutBracket,
        isAdmin,
        toasts,
        addToast,
        removeToast,
        loginAdmin,
        logoutAdmin,
        updateScore,
        undoScore,
        startMatch,
        setMatchPeriod,
        updatePenaltyScore,
        cancelLiveMatch,
        finishMatch,
        updateMatchDetails,
        createMatch,
        deleteMatch,
        resetAllData,
        teamMap,
      }}
    >
      {children}
    </TournamentContext.Provider>
  );
};

export function useTournament() {
  const context = useContext(TournamentContext);
  if (!context) {
    throw new Error('useTournament must be used within a TournamentProvider');
  }
  return context;
}
