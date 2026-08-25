-- PostgreSQL Database Schema for "გაუზიარე მომავალს" Charity Tournament
-- Multi-year ready, full relational integrity and Supabase Realtime enabled

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Tournaments Table
CREATE TABLE IF NOT EXISTS tournaments (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  year INTEGER NOT NULL,
  location TEXT NOT NULL,
  description TEXT,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('upcoming', 'active', 'completed')) DEFAULT 'active',
  points_for_win INTEGER NOT NULL DEFAULT 3,
  points_for_draw INTEGER NOT NULL DEFAULT 1,
  points_for_loss INTEGER NOT NULL DEFAULT 0,
  qualification_count INTEGER NOT NULL DEFAULT 4,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Groups Table
CREATE TABLE IF NOT EXISTS groups (
  id TEXT PRIMARY KEY,
  tournament_id TEXT REFERENCES tournaments(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  code TEXT NOT NULL CHECK (code IN ('A', 'B')),
  display_order INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Teams Table
CREATE TABLE IF NOT EXISTS teams (
  id TEXT PRIMARY KEY,
  group_id TEXT REFERENCES groups(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  logo_url TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Matches Table
CREATE TABLE IF NOT EXISTS matches (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  tournament_id TEXT REFERENCES tournaments(id) ON DELETE CASCADE,
  group_id TEXT REFERENCES groups(id) ON DELETE SET NULL,
  home_team_id TEXT REFERENCES teams(id) ON DELETE CASCADE,
  away_team_id TEXT REFERENCES teams(id) ON DELETE CASCADE,
  scheduled_at TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('scheduled', 'live', 'finished', 'postponed', 'cancelled')) DEFAULT 'scheduled',
  home_score INTEGER NOT NULL DEFAULT 0,
  away_score INTEGER NOT NULL DEFAULT 0,
  started_at TIMESTAMPTZ,
  finished_at TIMESTAMPTZ,
  round_type TEXT NOT NULL CHECK (round_type IN ('group', 'quarter_final', 'semi_final', 'final', 'third_place')) DEFAULT 'group',
  round_order INTEGER DEFAULT 1,
  bracket_position TEXT,
  match_day INTEGER DEFAULT 1,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Match Events Table (Prepared for future goals, cards, live timeline)
CREATE TABLE IF NOT EXISTS match_events (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  match_id TEXT REFERENCES matches(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL CHECK (event_type IN ('goal', 'yellow_card', 'red_card')),
  team_id TEXT REFERENCES teams(id) ON DELETE CASCADE,
  minute INTEGER NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security (RLS)
ALTER TABLE tournaments ENABLE ROW LEVEL SECURITY;
ALTER TABLE groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE match_events ENABLE ROW LEVEL SECURITY;

-- Public READ policies (Anyone can view scores, standings, and matches)
CREATE POLICY "Allow public read-only access on tournaments" ON tournaments FOR SELECT USING (true);
CREATE POLICY "Allow public read-only access on groups" ON groups FOR SELECT USING (true);
CREATE POLICY "Allow public read-only access on teams" ON teams FOR SELECT USING (true);
CREATE POLICY "Allow public read-only access on matches" ON matches FOR SELECT USING (true);
CREATE POLICY "Allow public read-only access on match_events" ON match_events FOR SELECT USING (true);

-- Admin WRITE policies (Only authenticated users can insert/update/delete)
CREATE POLICY "Allow authenticated admins to mutate tournaments" ON tournaments FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow authenticated admins to mutate groups" ON groups FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow authenticated admins to mutate teams" ON teams FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow authenticated admins to mutate matches" ON matches FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow authenticated admins to mutate match_events" ON match_events FOR ALL TO authenticated USING (true);

-- Realtime Publication Configuration
ALTER PUBLICATION supabase_realtime ADD TABLE matches;
ALTER PUBLICATION supabase_realtime ADD TABLE match_events;
