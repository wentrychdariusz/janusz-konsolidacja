-- Tworzenie tabeli do śledzenia funnelu użytkownika
CREATE TABLE public.user_funnel_tracking (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  step_name TEXT NOT NULL,
  step_completed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  variant TEXT,
  test_name TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.user_funnel_tracking ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow all to insert funnel tracking" 
ON public.user_funnel_tracking 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow all to read funnel tracking" 
ON public.user_funnel_tracking 
FOR SELECT 
USING (true);

-- Index dla lepszej wydajności
CREATE INDEX idx_user_funnel_tracking_session_id ON public.user_funnel_tracking(session_id);
CREATE INDEX idx_user_funnel_tracking_step_name ON public.user_funnel_tracking(step_name);
CREATE INDEX idx_user_funnel_tracking_created_at ON public.user_funnel_tracking(created_at);

-- Dodanie tabeli do publikacji realtime
ALTER TABLE public.user_funnel_tracking REPLICA IDENTITY FULL;