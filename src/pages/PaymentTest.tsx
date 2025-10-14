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
  const {
    trackPageView
  } = useSupabaseTracking();
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<'form' | 'payment-choice' | 'blik-input'>('form');
  const [transactionId, setTransactionId] = useState('');
  const [paymentUrl, setPaymentUrl] = useState('');
  const [blikCode, setBlikCode] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneInput, setPhoneInput] = useState(searchParams.get('phone') || '');
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
    if (!phoneInput.trim() || phoneInput.trim().length < 9) {
      setError('Podaj pełny numer telefonu (9 cyfr)');
      return;
    }
    setIsProcessing(true);
    try {
      console.log('🚀 Creating transaction...');

      // Create transaction in TPay
      const {
        data,
        error: functionError
      } = await supabase.functions.invoke('create-tpay-transaction', {
        body: {
          firstName,
          lastName,
          email,
          phone: phoneInput,
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
      setStep('payment-choice'); // Move to payment method selection
    } catch (err) {
      console.error('❌ Error:', err);
      setError(err instanceof Error ? err.message : 'Wystąpił błąd. Spróbuj ponownie.');
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
      const {
        data,
        error: functionError
      } = await supabase.functions.invoke('confirm-blik-payment', {
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
        phone: phone || phoneInput
      });
      navigate(`/podziekowania?${params.toString()}`);
    } catch (err) {
      console.error('❌ Payment error:', err);
      setError(err instanceof Error ? err.message : 'Płatność nie powiodła się. Sprawdź kod BLIK i spróbuj ponownie.');
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
  const handleSelectBlik = () => {
    setStep('blik-input');
    setError('');
  };
  return <div className="min-h-screen bg-gradient-to-br from-warm-neutral-50 via-business-blue-50 to-prestige-gold-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-3xl">
        <div className="bg-white rounded-2xl shadow-xl border-0 p-6 sm:p-8 lg:p-10">
          
          {/* Header z wizerunkiem Dariusza Wentrycha */}
          <div className="text-center mb-6">
            <div className="flex justify-center items-center mb-4">
              <div className="flex flex-col items-center">
                <img src="/lovable-uploads/01dcb25b-999a-4c0d-b7da-525c21306610.png" alt="Dariusz Wentrych" className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-3 border-business-blue-200 shadow-xl object-cover mb-3" />
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

          {/* Problem i rozwiązanie */}
          <div className="bg-red-50 border-l-4 border-red-500 p-4 sm:p-5 rounded-lg mb-4">
            <p className="text-sm sm:text-base text-red-900 font-semibold mb-3">
              ⚠️ W branży oddłużeniowej ludzie wypełniają formularze, ale nie odbierają telefonu.
              To marnuje czas doradców, a osoby, które naprawdę potrzebują pomocy, muszą czekać dłużej.
            </p>
            <p className="text-sm sm:text-base text-red-900 leading-relaxed">
              Dlatego wprowadziliśmy symboliczną opłatę 9,90 zł – to sposób, by potwierdzić, że traktujesz swoją sytuację poważnie i naprawdę chcesz działać. Wykonaj płatność BLIK lub płatność online teraz i zyskaj swojego indywidualnego opiekuna, który zajmie się Twoim przypadkiem od razu.
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

          {/* Analiza dokumentów - wyróżniona sekcja */}
          <div className="text-center mb-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-400 rounded-xl p-5 sm:p-6 shadow-md">
            <p className="text-base sm:text-lg lg:text-xl font-bold text-navy-900 leading-tight">
              💼 Wpłacaj 9,90 zł za analizę Twoich dokumentów
            </p>
            <p className="text-sm sm:text-base text-blue-800 font-semibold mt-2">
              Nasz doradca wie, że zależy Ci na pomocy
            </p>
          </div>

          {/* Formularz płatności - Płynne rozwinięcie */}
          <div className="space-y-5">
            {/* KROK 1: Imię i nazwisko - zawsze widoczne */}
            <form onSubmit={handleInitiatePayment} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-semibold text-navy-900 mb-2">
                    Imię
                  </label>
                  <Input id="firstName" type="text" placeholder="Jan" value={firstName} onChange={e => setFirstName(e.target.value)} className="border-2 border-gray-300 focus:border-business-blue-600 rounded-lg" disabled={isProcessing || step !== 'form'} required />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-semibold text-navy-900 mb-2">
                    Nazwisko
                  </label>
                  <Input id="lastName" type="text" placeholder="Kowalski" value={lastName} onChange={e => setLastName(e.target.value)} className="border-2 border-gray-300 focus:border-business-blue-600 rounded-lg" disabled={isProcessing || step !== 'form'} required />
                </div>
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-navy-900 mb-2">
                  Telefon <span className="text-red-600">*</span>
                </label>
                <Input id="phone" type="tel" placeholder="600 000 000" value={phoneInput} onChange={e => setPhoneInput(e.target.value.replace(/[^0-9]/g, ''))} maxLength={9} className="border-2 border-gray-300 focus:border-business-blue-600 rounded-lg" disabled={isProcessing || step !== 'form'} required />
              </div>

              {step === 'form' && <>
                  {error && <div className="bg-red-50 border-2 border-red-400 text-red-700 px-4 py-3 rounded-lg text-sm font-semibold animate-in fade-in slide-in-from-top-2 duration-300">
                      ⚠️ {error}
                    </div>}

                  {/* Premium Payment Button - wyróżniony */}
                  <div className="relative mt-8">
                    <div className="absolute -inset-2 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 rounded-3xl blur-xl opacity-75 animate-pulse"></div>
                    <Button type="submit" className="relative w-full bg-gradient-to-r from-red-600 via-orange-600 to-red-600 hover:from-red-700 hover:via-orange-700 hover:to-red-700 text-white font-black py-7 sm:py-9 text-lg sm:text-2xl rounded-2xl shadow-2xl border-4 border-red-800 transform hover:scale-[1.02] transition-all duration-300" size="lg" disabled={isProcessing || !firstName.trim() || !lastName.trim() || phoneInput.trim().length !== 9}>
                      {isProcessing ? <div className="flex items-center justify-center w-full">
                          <Loader2 className="mr-2 h-6 w-6 sm:h-7 sm:w-7 animate-spin" />
                          <span className="text-base sm:text-xl">Przygotowywanie...</span>
                        </div> : <div className="flex flex-col items-center justify-center gap-2 w-full">
                          <span className="text-2xl sm:text-4xl font-black drop-shadow-lg">⚡ ZAPŁAĆ TERAZ</span>
                          <span className="text-sm sm:text-base font-bold bg-white/20 px-4 py-1 rounded-full">
                            9,90 zł • Priorytet VIP
                          </span>
                        </div>}
                    </Button>
                  </div>
                </>}
            </form>

            {/* KROK 2: Wybór metody płatności - rozwijanie */}
            {step !== 'form' && <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-500">
                <div className="border-t-2 border-gray-200 pt-4">
                  <h3 className="text-center text-base sm:text-lg font-bold text-navy-900 mb-4">
                    Wybierz metodę płatności
                  </h3>
                </div>

                {/* BLIK Option */}
                {step === 'payment-choice' && <button onClick={handleSelectBlik} className="w-full bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-300 hover:border-blue-500 rounded-2xl p-4 sm:p-6 transition-all duration-300 hover:shadow-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="bg-white px-3 py-2 rounded-lg shadow">
                          <img src="/logos/blik-logo.png" alt="BLIK" className="h-6 sm:h-8 w-auto object-contain" />
                        </div>
                        <div className="text-left">
                          <p className="font-bold text-navy-900 text-sm sm:text-base">Płatność BLIK</p>
                          <p className="text-xs sm:text-sm text-gray-600">Szybka płatność mobilna</p>
                        </div>
                      </div>
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </button>}

                {/* BLIK Code Input - rozwinięcie */}
                {step === 'blik-input' && <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-2xl p-4 sm:p-6 animate-in fade-in slide-in-from-top-4 duration-500">
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <img src="/logos/blik-logo.png" alt="BLIK" className="h-6 sm:h-8 w-auto object-contain" />
                      <h4 className="font-bold text-navy-900 text-sm sm:text-base">Płatność BLIK</h4>
                    </div>

                    <div className="bg-white rounded-lg p-3 sm:p-4 mb-4">
                      <ol className="text-xs sm:text-sm text-gray-700 space-y-1">
                        <li>1️⃣ Otwórz aplikację bankową</li>
                        <li>2️⃣ Wygeneruj kod BLIK</li>
                        <li>3️⃣ Wpisz poniżej (ważny 2 min)</li>
                      </ol>
                    </div>

                    <form onSubmit={handleBlikPayment} className="space-y-4">
                      <div>
                        <Input type="text" maxLength={6} placeholder="000 000" value={blikCode} onChange={e => setBlikCode(e.target.value.replace(/\D/g, ''))} className="text-center text-2xl sm:text-3xl tracking-[0.3em] font-bold border-2 border-blue-400 focus:border-blue-600 rounded-xl" disabled={isProcessing} autoFocus />
                      </div>

                      {error && <div className="bg-red-50 border-2 border-red-400 text-red-700 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold">
                          ⚠️ {error}
                        </div>}

                      <Button type="submit" className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 text-sm sm:text-base rounded-xl" disabled={isProcessing || blikCode.length !== 6}>
                        {isProcessing ? <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Autoryzacja...
                          </> : '✅ Zapłać 9,90 zł'}
                      </Button>

                      <Button type="button" variant="ghost" onClick={() => {
                  setStep('payment-choice');
                  setBlikCode('');
                  setError('');
                }} disabled={isProcessing} className="w-full text-xs sm:text-sm">
                        ← Zmień metodę płatności
                      </Button>
                    </form>
                  </div>}

                {/* Other Payment Methods */}
                {step === 'payment-choice' && <>
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                      </div>
                      <div className="relative flex justify-center text-xs">
                        <span className="px-2 bg-white text-gray-500">lub</span>
                      </div>
                    </div>

                    <button onClick={handleOtherPaymentMethods} className="w-full bg-white border-2 border-gray-300 hover:border-gray-400 rounded-2xl p-4 sm:p-6 transition-all duration-300 hover:shadow-lg">
                      <div className="flex items-center justify-between">
                        <div className="text-left">
                          <p className="font-bold text-navy-900 text-sm sm:text-base">Karta / Przelew</p>
                          <p className="text-xs sm:text-sm text-gray-600">Visa, Mastercard, przelewy</p>
                        </div>
                        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </button>
                  </>}
              </div>}

            {/* Security info */}
            <div className="flex items-center justify-center gap-2 text-xs text-gray-500 pt-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span>Płatność zabezpieczona przez TPay</span>
            </div>
          </div>

          {/* Opcja powrotu */}
          <div className="text-center mt-6">
            <Button variant="ghost" onClick={() => navigate(-1)} disabled={isProcessing} className="text-warm-neutral-600 hover:text-navy-900">
              ← Powrót
            </Button>
          </div>
        </div>
      </div>
    </div>;
};
export default PaymentTest;