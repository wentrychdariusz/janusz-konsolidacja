-- Create leads table
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  payment_status TEXT NOT NULL DEFAULT 'Nieopłacone',
  sms_verified TEXT NOT NULL DEFAULT 'Niezweryfikowany',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts (since webhook is public)
CREATE POLICY "Allow public inserts" 
ON public.leads 
FOR INSERT 
WITH CHECK (true);

-- Create policy to allow service role full access
CREATE POLICY "Service role has full access" 
ON public.leads 
FOR ALL 
USING (auth.jwt() ->> 'role' = 'service_role');

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_email ON public.leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_phone ON public.leads(phone);