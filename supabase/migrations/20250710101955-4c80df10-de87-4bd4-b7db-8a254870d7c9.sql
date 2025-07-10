-- Tabela dla sesji użytkowników
CREATE TABLE public.ab_test_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Tabela dla eventów A/B testów
CREATE TABLE public.ab_test_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  event_name TEXT NOT NULL,
  variant TEXT,
  test_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  FOREIGN KEY (session_id) REFERENCES ab_test_sessions(session_id) ON DELETE CASCADE
);

-- Włącz RLS dla bezpieczeństwa
ALTER TABLE public.ab_test_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ab_test_events ENABLE ROW LEVEL SECURITY;

-- Polityki RLS - pozwalaj wszystkim czytać i dodawać (statystyki publiczne)
CREATE POLICY "Allow all to read sessions" ON public.ab_test_sessions FOR SELECT USING (true);
CREATE POLICY "Allow all to insert sessions" ON public.ab_test_sessions FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow all to read events" ON public.ab_test_events FOR SELECT USING (true);
CREATE POLICY "Allow all to insert events" ON public.ab_test_events FOR INSERT WITH CHECK (true);

-- Indeksy dla lepszej wydajności
CREATE INDEX idx_ab_test_events_session_id ON public.ab_test_events(session_id);
CREATE INDEX idx_ab_test_events_event_variant ON public.ab_test_events(event_name, variant);
CREATE INDEX idx_ab_test_events_created_at ON public.ab_test_events(created_at);

-- Funkcja do automatycznego update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger dla automatycznego update timestamps
CREATE TRIGGER update_ab_test_sessions_updated_at
  BEFORE UPDATE ON public.ab_test_sessions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();