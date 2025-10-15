-- Insert test data with paid status
INSERT INTO public.leads (name, phone, email, payment_status, sms_verified)
VALUES (
  'Jan Kowalski',
  '48123456789',
  'jan.kowalski@test.pl',
  'Opłacone',
  'Zweryfikowany'
);