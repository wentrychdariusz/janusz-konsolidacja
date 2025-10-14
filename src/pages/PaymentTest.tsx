import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useSupabaseTracking } from '@/hooks/useSupabaseTracking';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';

const PaymentTest = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { trackPageView } = useSupabaseTracking();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showBlikInput, setShowBlikInput] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const [paymentUrl, setPaymentUrl] = useState('');
  const [blikCode, setBlikCode] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');

  // Dane z formularza kontaktowego
  const name = searchParams.get('name') || '';
  const email = searchParams.get('email') || '';
  const phone = searchParams.get('phone') || '';

  useEffect(() => {
    trackPageView('payment_test', undefined, 'main_site');
  }, [trackPageView]);

  const handleInitiatePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!firstName.trim() || !lastName.trim()) {
      setError('Podaj imię i nazwisko');
      return;
    }

    setIsProcessing(true);

    try {
      console.log('🚀 Creating transaction...');
      
      // Create transaction in TPay
      const { data, error: functionError } = await supabase.functions.invoke('create-tpay-transaction', {
        body: {
          firstName,
          lastName,
          email,
          phone,
          amount: 9.90
        }
      });

      if (functionError) {
        console.error('❌ Transaction creation error:', functionError);
        throw new Error(functionError.message || 'Błąd tworzenia transakcji');
      }

      if (data.error) {
        console.error('❌ Transaction error:', data.error);
        throw new Error(data.details || data.error);
      }

      console.log('✅ Transaction created:', data);
      
      setTransactionId(data.transactionId);
      setPaymentUrl(data.paymentUrl);
      setShowBlikInput(true); // Show BLIK input after transaction is created
      
    } catch (err) {
      console.error('❌ Error:', err);
      setError(
        err instanceof Error 
          ? err.message 
          : 'Wystąpił błąd. Spróbuj ponownie.'
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBlikPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (blikCode.length !== 6) {
      setError('Kod BLIK musi mieć 6 cyfr');
      return;
    }

    setIsProcessing(true);

    try {
      console.log('💳 Processing BLIK payment...');
      
      // Process BLIK payment with code
      const { data, error: functionError } = await supabase.functions.invoke('confirm-blik-payment', {
        body: {
          transactionId,
          blikCode
        }
      });

      if (functionError) {
        console.error('❌ BLIK payment error:', functionError);
        throw new Error(functionError.message || 'Błąd płatności BLIK');
      }

      if (data.error) {
        console.error('❌ Payment error:', data.error);
        throw new Error(data.details || data.error);
      }

      console.log('✅ Payment successful:', data);
      
      // Redirect to success page
      const params = new URLSearchParams({
        payment: 'success',
        transactionId: data.transactionId || transactionId,
        name,
        email,
        phone
      });
      
      navigate(`/podziekowania?${params.toString()}`);
      
    } catch (err) {
      console.error('❌ Payment error:', err);
      setError(
        err instanceof Error 
          ? err.message 
          : 'Płatność nie powiodła się. Sprawdź kod BLIK i spróbuj ponownie.'
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleOtherPaymentMethods = () => {
    // Redirect to TPay payment page for other methods (cards, transfers, etc.)
    if (paymentUrl) {
      window.location.href = paymentUrl;
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

          {/* Zwrot pieniędzy */}
          <div className="text-center mb-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white p-4 rounded-xl shadow-lg">
            <p className="text-sm sm:text-base font-bold">
              💰 W przypadku rozpoczęcia współpracy zwracamy Ci wpłaconą kwotę 9,90 zł
            </p>
            <p className="text-xs sm:text-sm mt-1 opacity-90">
              To tylko symboliczny sygnał Twojego poważnego podejścia do sprawy
            </p>
          </div>

          {/* Formularz płatności */}
          {!showBlikInput ? (
            // KROK 1: Podaj dane i wybierz płatność
            <form onSubmit={handleInitiatePayment} className="space-y-5">
              {/* Imię i nazwisko */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-semibold text-navy-900 mb-2">
                    Imię
                  </label>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="Jan"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="border-2 border-gray-300 focus:border-business-blue-600 rounded-lg"
                    disabled={isProcessing}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-semibold text-navy-900 mb-2">
                    Nazwisko
                  </label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Kowalski"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="border-2 border-gray-300 focus:border-business-blue-600 rounded-lg"
                    disabled={isProcessing}
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border-2 border-red-400 text-red-700 px-4 py-3 rounded-lg text-sm font-semibold">
                  ⚠️ {error}
                </div>
              )}

              {/* Premium Payment Button */}
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-prestige-gold-400 via-yellow-400 to-prestige-gold-400 rounded-2xl blur opacity-75 animate-pulse"></div>
                <Button 
                  type="submit" 
                  className="relative w-full bg-gradient-to-r from-prestige-gold-600 via-yellow-500 to-prestige-gold-600 hover:from-prestige-gold-700 hover:via-yellow-600 hover:to-prestige-gold-700 text-navy-900 font-black py-6 sm:py-8 text-base sm:text-xl rounded-xl shadow-2xl border-2 border-prestige-gold-700" 
                  size="lg"
                  disabled={isProcessing || !firstName.trim() || !lastName.trim()}
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center w-full">
                      <Loader2 className="mr-2 h-5 w-5 sm:h-6 sm:w-6 animate-spin" />
                      <span className="text-base sm:text-lg">Tworzenie płatności...</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-1 w-full">
                      <span className="text-lg sm:text-2xl font-black">💳 PRZEJDŹ DO PŁATNOŚCI</span>
                      <span className="text-xs sm:text-sm font-bold opacity-90">9,90 zł za Priorytetową Obsługę VIP</span>
                    </div>
                  )}
                </Button>
              </div>

              {/* Dodatkowe info bezpieczeństwa */}
              <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <span>Płatność zabezpieczona przez TPay</span>
              </div>
            </form>
          ) : (
            // KROK 2: Wybierz metodę płatności
            <div className="space-y-5">
              {/* BLIK Payment Option */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-4 sm:p-6">
                <div className="flex flex-col items-center justify-center mb-4 gap-3">
                  <div className="bg-white px-4 py-2 rounded-lg shadow-sm">
                    <img 
                      src="/logos/blik-logo.png" 
                      alt="BLIK" 
                      className="h-8 sm:h-12 w-auto object-contain"
                    />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-navy-900">Płatność BLIK</h3>
                  <p className="text-xs sm:text-sm text-gray-600 text-center">
                    1. Wejdź do aplikacji bankowej<br/>
                    2. Wygeneruj kod BLIK<br/>
                    3. Wpisz go poniżej (ważny 2 minuty)
                  </p>
                </div>

                <form onSubmit={handleBlikPayment} className="space-y-4">
                  <div>
                    <label htmlFor="blik" className="block text-sm sm:text-base font-bold text-navy-900 mb-3 text-center">
                      Wpisz 6-cyfrowy kod BLIK
                    </label>
                    <Input
                      id="blik"
                      type="text"
                      maxLength={6}
                      placeholder="000 000"
                      value={blikCode}
                      onChange={(e) => setBlikCode(e.target.value.replace(/\D/g, ''))}
                      className="text-center text-2xl sm:text-4xl tracking-[0.3em] sm:tracking-[0.5em] font-bold border-3 border-blue-400 focus:border-blue-600 rounded-xl bg-white shadow-sm"
                      disabled={isProcessing}
                      autoFocus
                    />
                  </div>

                  {error && (
                    <div className="bg-red-50 border-2 border-red-400 text-red-700 px-4 py-3 rounded-lg text-sm font-semibold">
                      ⚠️ {error}
                    </div>
                  )}

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 text-base sm:text-lg rounded-xl" 
                    disabled={isProcessing || blikCode.length !== 6}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Autoryzacja płatności...
                      </>
                    ) : (
                      '✅ Potwierdź płatność BLIK'
                    )}
                  </Button>
                </form>
              </div>

              {/* Other Payment Methods */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">lub</span>
                </div>
              </div>

              <Button
                onClick={handleOtherPaymentMethods}
                variant="outline"
                className="w-full py-6 text-base font-semibold border-2"
                disabled={isProcessing}
              >
                💳 Karta płatnicza / Przelew bankowy
              </Button>

              <div className="text-center">
                <Button
                  variant="ghost"
                  onClick={() => {
                    setShowBlikInput(false);
                    setBlikCode('');
                    setError('');
                  }}
                  disabled={isProcessing}
                  className="text-sm"
                >
                  ← Wróć
                </Button>
              </div>
            </div>
          )}

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
