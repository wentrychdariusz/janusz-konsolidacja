-- Create table for tracking popup salary entries
CREATE TABLE public.popup_salary_entries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  salary_amount NUMERIC NOT NULL,
  page_source TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  user_agent TEXT,
  variant TEXT
);

-- Enable Row Level Security
ALTER TABLE public.popup_salary_entries ENABLE ROW LEVEL SECURITY;

-- Create policies for popup salary entries
CREATE POLICY "Allow all to insert popup salary entries" 
ON public.popup_salary_entries 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow all to read popup salary entries" 
ON public.popup_salary_entries 
FOR SELECT 
USING (true);