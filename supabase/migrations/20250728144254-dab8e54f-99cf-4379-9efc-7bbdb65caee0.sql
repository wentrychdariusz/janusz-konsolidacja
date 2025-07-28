-- Dodaj kolumny dla URL i referrer do ab_test_events
ALTER TABLE public.ab_test_events 
ADD COLUMN page_url TEXT,
ADD COLUMN referrer_url TEXT;

-- Dodaj indeksy dla lepszej wydajności zapytań
CREATE INDEX idx_ab_test_events_page_url ON public.ab_test_events(page_url);
CREATE INDEX idx_ab_test_events_referrer_url ON public.ab_test_events(referrer_url);