-- Dodaj kolumnę income_type do tabeli calculator_usage
ALTER TABLE public.calculator_usage 
ADD COLUMN income_type TEXT;