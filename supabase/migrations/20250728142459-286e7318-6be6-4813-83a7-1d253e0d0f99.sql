-- Dodaj polityki DELETE dla tabel A/B test, aby można było czyścić dane

-- Pozwól usuwać eventy
CREATE POLICY "Allow all to delete events" 
ON ab_test_events 
FOR DELETE 
USING (true);

-- Pozwól usuwać sesje
CREATE POLICY "Allow all to delete sessions" 
ON ab_test_sessions 
FOR DELETE 
USING (true);