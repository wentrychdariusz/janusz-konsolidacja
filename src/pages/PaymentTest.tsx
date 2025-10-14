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
    <div className="min-h-screen bg-gradient-to-br from-warm-neutral-50 via-business-blue-50 to-prestige-gold-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-3xl">
        <div className="bg-white rounded-2xl shadow-xl border-0 p-6 sm:p-8 lg:p-10">
          
          {/* Header z wizerunkiem Dariusza Wentrycha */}
          <div className="text-center mb-6">
            <div className="flex justify-center items-center mb-4">
              <div className="flex flex-col items-center">
                <img 
                  src="/lovable-uploads/01dcb25b-999a-4c0d-b7da-525c21306610.png"
                  alt="Dariusz Wentrych"
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-3 border-business-blue-200 shadow-xl object-cover mb-3"
                />
                <div className="text-center">
                  <h3 className="text-lg sm:text-xl font-bold text-navy-900">Dariusz Wentrych</h3>
                  <p className="text-sm sm:text-base text-business-blue-600 font-medium">#1 Ekspert ds. oddłużeń</p>
                </div>
              </div>
            </div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-navy-900 mb-3">
              ✅ Dziękujemy za rejestrację!
            </h1>
          </div>

          {/* Problem i rozwiązanie - skrócone */}
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg mb-4">
            <p className="text-sm sm:text-base text-red-900 font-semibold">
              ⚠️ W branży oddłużeniowej ludzie wypełniają formularze, ale nie odbierają telefonu. 
              To marnuje czas doradców, a osoby naprawdę potrzebujące pomocy muszą czekać dłużej.
            </p>
          </div>

          {/* Cena - duże wyróżnienie */}
          <div className="bg-gradient-to-br from-prestige-gold-100 to-prestige-gold-50 border-2 border-prestige-gold-400 rounded-2xl p-6 mb-6 text-center shadow-lg">
            <p className="text-base sm:text-lg text-navy-700 mb-2 font-medium">Priorytetowa Obsługa</p>
            <div className="flex items-center justify-center gap-3 mb-2">
              <span className="text-4xl sm:text-5xl lg:text-6xl font-black text-navy-900">9,90 zł</span>
            </div>
            <p className="text-xs sm:text-sm text-prestige-gold-700 font-bold">
              💡 Zwracamy w całości przy rozpoczęciu współpracy!
            </p>
          </div>

          {/* Tabela porównawcza */}
          <div className="mb-6 overflow-hidden rounded-xl border-2 border-business-blue-200">
            <div className="grid grid-cols-2 gap-0">
              {/* Nagłówki */}
              <div className="bg-gray-100 p-3 border-b border-r border-gray-300">
                <p className="text-xs sm:text-sm font-bold text-gray-600 text-center">Bez płatności</p>
              </div>
              <div className="bg-prestige-gold-100 p-3 border-b border-gray-300">
                <p className="text-xs sm:text-sm font-bold text-prestige-gold-800 text-center">Za 9,90 zł</p>
              </div>
              
              {/* Wiersz 1 */}
              <div className="p-3 border-b border-r border-gray-200 bg-white">
                <p className="text-xs sm:text-sm text-gray-600">⏳ Oczekiwanie w kolejce</p>
              </div>
              <div className="p-3 border-b border-gray-200 bg-green-50">
                <p className="text-xs sm:text-sm text-green-700 font-semibold">✅ Priorytet #1</p>
              </div>
              
              {/* Wiersz 2 */}
              <div className="p-3 border-b border-r border-gray-200 bg-white">
                <p className="text-xs sm:text-sm text-gray-600">📞 Kontakt standardowy</p>
              </div>
              <div className="p-3 border-b border-gray-200 bg-green-50">
                <p className="text-xs sm:text-sm text-green-700 font-semibold">⚡ Natychmiastowy kontakt</p>
              </div>
              
              {/* Wiersz 3 */}
              <div className="p-3 border-b border-r border-gray-200 bg-white">
                <p className="text-xs sm:text-sm text-gray-600">🕐 Dłuższy czas realizacji</p>
              </div>
              <div className="p-3 border-b border-gray-200 bg-green-50">
                <p className="text-xs sm:text-sm text-green-700 font-semibold">🚀 Szybka konsultacja</p>
              </div>
              
              {/* Wiersz 4 */}
              <div className="p-3 border-r border-gray-200 bg-white">
                <p className="text-xs sm:text-sm text-gray-600">—</p>
              </div>
              <div className="p-3 bg-green-50">
                <p className="text-xs sm:text-sm text-green-700 font-semibold">💼 Obsługa VIP przez cały proces</p>
              </div>
            </div>
          </div>

          {/* CTA Message */}
          <div className="text-center mb-6 bg-navy-900 text-white p-4 rounded-xl">
            <p className="text-sm sm:text-base font-bold">
              #STOPCHAM w konsolidacji długów
            </p>
            <p className="text-xs sm:text-sm mt-1">
              Skupiamy się na osobach, które chcą działać — nie tylko kliknąć
            </p>
          </div>

          {/* Podsumowanie danych */}
          {(name || email || phone) && (
            <div className="bg-warm-neutral-50 p-4 rounded-lg space-y-2 mb-6">
              <p className="text-sm font-semibold text-navy-900 mb-2">Twoje dane:</p>
              {name && <p className="text-sm"><strong>Imię:</strong> {name}</p>}
              {email && <p className="text-sm"><strong>Email:</strong> {email}</p>}
              {phone && <p className="text-sm"><strong>Telefon:</strong> {phone}</p>}
            </div>
          )}

          {/* Formularz płatności BLIK */}
          <form onSubmit={handleBlikPayment} className="space-y-6">
            <div>
              <label htmlFor="blik" className="block text-lg sm:text-xl font-bold text-navy-900 mb-4 text-center">
                Kod BLIK (6 cyfr)
              </label>
              <Input
                id="blik"
                type="text"
                maxLength={6}
                placeholder="000000"
                value={blikCode}
                onChange={(e) => setBlikCode(e.target.value.replace(/\D/g, ''))}
                className="text-center text-2xl sm:text-3xl tracking-widest font-bold border-2 border-business-blue-300 focus:border-business-blue-600 rounded-xl"
                disabled={isProcessing}
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm font-medium">
                {error}
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-navy-900 to-business-blue-600 hover:from-navy-800 hover:to-business-blue-500 text-white font-bold py-5 text-xl rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105" 
              size="lg"
              disabled={isProcessing || blikCode.length !== 6}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Przetwarzanie płatności...
                </>
              ) : (
                '💳 Zapłać 9,90 zł i uzyskaj priorytet'
              )}
            </Button>
          </form>

          {/* Opcja powrotu */}
          <div className="text-center mt-6">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              disabled={isProcessing}
              className="text-warm-neutral-600 hover:text-navy-900"
            >
              ← Powrót
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentTest;
