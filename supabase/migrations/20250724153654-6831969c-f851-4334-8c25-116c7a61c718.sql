-- Dodaj kolumny do tabeli calculator_usage dla health check
ALTER TABLE public.calculator_usage 
ADD COLUMN health_check_score INTEGER,
ADD COLUMN qualified BOOLEAN DEFAULT FALSE;