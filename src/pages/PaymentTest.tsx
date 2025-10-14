import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useSupabaseTracking } from '@/hooks/useSupabaseTracking';
import { Loader2 } from 'lucide-react';

const PaymentTest = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { trackPageView } = useSupabaseTracking();
  const [isProcessing, setIsProcessing] = useState(false);
  const [blikCode, setBlikCode] = useState('');
  const [error, setError] = useState('');

  // Dane z formularza kontaktowego
  const name = searchParams.get('name') || '';
  const email = searchParams.get('email') || '';
  const phone = searchParams.get('phone') || '';

  useEffect(() => {
    trackPageView('payment_test', undefined, 'main_site');
  }, [trackPageView]);

  const handleBlikPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (blikCode.length !== 6) {
      setError('Kod BLIK musi mieć 6 cyfr');
      return;
    }

    setIsProcessing(true);

    try {
      // TODO: Tutaj będzie integracja z TPay API
      console.log('Payment data:', {
        name,
        email,
        phone,
        blikCode,
        amount: 50 // Przykładowa kwota - do ustalenia
      });

      // Symulacja płatności
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Po udanej płatności przekierowanie
      navigate('/podziekowania?payment=success');
    } catch (err) {
      console.error('Payment error:', err);
      setError('Wystąpił błąd podczas płatności. Spróbuj ponownie.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Przyspiesz swoją konsultację</CardTitle>
          <CardDescription>
            Zapłać 50 PLN i otrzymaj natychmiastowy kontakt
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Podsumowanie danych */}
            <div className="bg-muted p-4 rounded-lg space-y-2">
              <p className="text-sm"><strong>Imię:</strong> {name}</p>
              <p className="text-sm"><strong>Email:</strong> {email}</p>
              <p className="text-sm"><strong>Telefon:</strong> {phone}</p>
            </div>

            {/* Formularz płatności BLIK */}
            <form onSubmit={handleBlikPayment} className="space-y-4">
              <div>
                <label htmlFor="blik" className="block text-sm font-medium mb-2">
                  Kod BLIK (6 cyfr)
                </label>
                <Input
                  id="blik"
                  type="text"
                  maxLength={6}
                  placeholder="000000"
                  value={blikCode}
                  onChange={(e) => setBlikCode(e.target.value.replace(/\D/g, ''))}
                  className="text-center text-2xl tracking-widest"
                  disabled={isProcessing}
                />
              </div>

              {error && (
                <div className="bg-destructive/10 text-destructive px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full" 
                size="lg"
                disabled={isProcessing || blikCode.length !== 6}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Przetwarzanie...
                  </>
                ) : (
                  'Zapłać 50 PLN'
                )}
              </Button>
            </form>

            {/* Opcja powrotu */}
            <div className="text-center">
              <Button
                variant="ghost"
                onClick={() => navigate(-1)}
                disabled={isProcessing}
              >
                Powrót
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentTest;
