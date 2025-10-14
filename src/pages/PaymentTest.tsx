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
          <div className="text-center mb-8">
            <div className="flex justify-center items-center mb-6">
              <div className="flex flex-col items-center">
                <img 
                  src="/lovable-uploads/01dcb25b-999a-4c0d-b7da-525c21306610.png"
                  alt="Dariusz Wentrych"
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-3 border-business-blue-200 shadow-xl object-cover mb-3 sm:mb-4"
                />
                <div className="text-center">
                  <h3 className="text-xl sm:text-2xl font-bold text-navy-900">Dariusz Wentrych</h3>
                  <p className="text-base sm:text-lg text-business-blue-600 font-medium">#1 Ekspert ds. oddłużeń w Polsce</p>
                </div>
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-navy-900 mb-6">
              ✅ Dziękujemy za rejestrację!
            </h1>
          </div>

          {/* Długi tekst o priorytetowej obsłudze */}
          <div className="space-y-4 mb-8 text-warm-neutral-700 text-base sm:text-lg leading-relaxed">
            <p>
              W branży oddłużeniowej pojawiła się plaga zgłoszeń od osób, które wypełniają formularze, 
              ale potem nie odbierają telefonu i wcale nie chcą się naprawdę oddłużyć — mimo że możemy im skutecznie pomóc.
            </p>
            <p>
              Przez to doradcy tracą czas, a osoby, które naprawdę chcą wyjść z długów, muszą czekać dłużej.
            </p>
            <p className="font-bold text-navy-900">
              Nazwijmy to po imieniu — to zwykłe chamstwo.
            </p>
            <p>
              Czas, który mógłby zostać poświęcony komuś, kto naprawdę potrzebuje pomocy, jest marnowany przez ludzi, 
              którzy nie mają szacunku do pracy innych.
            </p>
            <p className="font-bold text-business-blue-700">
              Dlatego wprowadziliśmy usługę <span className="text-prestige-gold-600">Priorytetowa Obsługa Klienta Dariusza Wentrycha</span> – 
              specjalny tryb dla osób, które traktują swoją sytuację poważnie i chcą działać od razu.
            </p>
            <p>
              Aby z niej skorzystać, prosimy o symboliczną opłatę <strong className="text-navy-900">9,90 zł</strong> (BLIK lub szybki przelew).
            </p>

            <div className="bg-business-blue-50 border-l-4 border-business-blue-600 p-4 rounded-lg space-y-2">
              <p className="font-semibold text-navy-900">Ta niewielka kwota sprawia, że:</p>
              <ul className="space-y-2 ml-4">
                <li>✅ Twoje zgłoszenie trafia do kolejki priorytetowej,</li>
                <li>⚡ doradca kontaktuje się z Tobą w pierwszej kolejności,</li>
                <li>🤝 otrzymujesz szybką i profesjonalną konsultację,</li>
                <li>💼 w całym procesie jesteś traktowany jako klient priorytetowy.</li>
              </ul>
            </div>

            <div className="bg-prestige-gold-50 border-l-4 border-prestige-gold-600 p-4 rounded-lg">
              <p className="font-bold text-prestige-gold-700">
                💡 Jeśli zdecydujesz się rozpocząć proces oddłużenia z nami — zwrócimy Ci tę kwotę w całości.
              </p>
              <p className="mt-2">
                To uczciwy i prosty sposób, dzięki któremu szybciej pomagamy tym, którzy naprawdę chcą wyjść z długów.
              </p>
            </div>

            <p className="font-bold text-navy-900 text-lg">
              💥 Dzięki temu rozwiązaniu walczymy z chamstwem internetu – z ludźmi, którzy nie szanują czasu i pracy innych.
            </p>
            <p className="font-semibold text-business-blue-700">
              My skupiamy się na Tobie – osobie, która chce działać, a nie tylko kliknąć.
            </p>
            <p className="text-navy-900 font-medium">
              Bo tu liczy się konkret, szacunek i skuteczność.
            </p>
            <p className="text-center font-bold text-xl text-navy-900 mt-4">
              #STOPCHAM w konsolidacji długów
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
