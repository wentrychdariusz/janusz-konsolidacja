-- Create table for calculator usage tracking
CREATE TABLE public.calculator_usage (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  income DECIMAL(10,2) NOT NULL,
  debt_amount DECIMAL(10,2),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.calculator_usage ENABLE ROW LEVEL SECURITY;

-- Create policies for reading data (for analytics)
CREATE POLICY "Allow all to read calculator usage" 
ON public.calculator_usage 
FOR SELECT 
USING (true);

-- Create policy for inserting data
CREATE POLICY "Allow all to insert calculator usage" 
ON public.calculator_usage 
FOR INSERT 
WITH CHECK (true);