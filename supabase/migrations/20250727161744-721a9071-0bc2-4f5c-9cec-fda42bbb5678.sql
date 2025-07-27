-- Tabela do analizy czasów wypełniania formularzy
CREATE TABLE public.form_timing_analysis (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  form_type TEXT NOT NULL, -- 'debt_calculator', 'contact_form', etc.
  field_name TEXT NOT NULL, -- 'income', 'payday_debt', 'bank_debt'
  field_value TEXT, -- wartość pola (opcjonalnie)
  time_to_fill INTEGER NOT NULL, -- czas w milisekundach
  total_form_time INTEGER, -- całkowity czas wypełniania formularza
  is_suspicious BOOLEAN DEFAULT false,
  suspicious_reasons TEXT[], -- array powodów podejrzeń
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Indeksy dla lepszej wydajności
CREATE INDEX idx_form_timing_session_id ON public.form_timing_analysis(session_id);
CREATE INDEX idx_form_timing_form_type ON public.form_timing_analysis(form_type);
CREATE INDEX idx_form_timing_suspicious ON public.form_timing_analysis(is_suspicious);
CREATE INDEX idx_form_timing_created_at ON public.form_timing_analysis(created_at);

-- RLS policies
ALTER TABLE public.form_timing_analysis ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all to insert timing analysis" 
ON public.form_timing_analysis 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow all to read timing analysis" 
ON public.form_timing_analysis 
FOR SELECT 
USING (true);

-- Tabela do przechowywania agregowanych statystyk podejrzanych zachowań
CREATE TABLE public.suspicious_behavior_analysis (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  form_type TEXT NOT NULL,
  total_suspicious_flags INTEGER DEFAULT 0,
  suspicious_categories TEXT[], -- ['fast_filling', 'inconsistent_data', 'default_values']
  risk_level TEXT DEFAULT 'low', -- 'low', 'medium', 'high', 'critical'
  income_reported NUMERIC,
  total_debt_reported NUMERIC,
  income_to_debt_ratio NUMERIC,
  behavioral_patterns JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Indeksy
CREATE INDEX idx_suspicious_behavior_session_id ON public.suspicious_behavior_analysis(session_id);
CREATE INDEX idx_suspicious_behavior_risk_level ON public.suspicious_behavior_analysis(risk_level);
CREATE INDEX idx_suspicious_behavior_created_at ON public.suspicious_behavior_analysis(created_at);

-- RLS policies
ALTER TABLE public.suspicious_behavior_analysis ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all to insert suspicious behavior analysis" 
ON public.suspicious_behavior_analysis 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow all to read suspicious behavior analysis" 
ON public.suspicious_behavior_analysis 
FOR SELECT 
USING (true);