import { Match } from '@/lib/types';
import { INITIAL_MATCHES } from '@/lib/initialData';

// In-memory global state
let cachedMatches: Match[] = [...INITIAL_MATCHES];
let serverLastUpdated: number = Date.now();

export async function getServerMatches(): Promise<{ matches: Match[]; lastUpdated: number }> {
  return { matches: cachedMatches, lastUpdated: serverLastUpdated };
}

export async function setServerMatches(
  matches: Match[],
  clientTimestamp?: number
): Promise<{ matches: Match[]; lastUpdated: number }> {
  cachedMatches = matches;
  serverLastUpdated = clientTimestamp || Date.now();
  return { matches: cachedMatches, lastUpdated: serverLastUpdated };
}

export async function resetServerMatches(): Promise<{ matches: Match[]; lastUpdated: number }> {
  cachedMatches = [...INITIAL_MATCHES];
  serverLastUpdated = Date.now();
  return { matches: cachedMatches, lastUpdated: serverLastUpdated };
}
