-- Dodaj kolumnę IP do tabel trackingu A/B testów

-- Dodaj IP do ab_test_events
ALTER TABLE ab_test_events 
ADD COLUMN user_ip text;

-- Dodaj IP do ab_test_sessions  
ALTER TABLE ab_test_sessions
ADD COLUMN user_ip text;

-- Dodaj indeks dla wydajności zapytań po IP
CREATE INDEX idx_ab_test_events_user_ip ON ab_test_events(user_ip);
CREATE INDEX idx_ab_test_sessions_user_ip ON ab_test_sessions(user_ip);