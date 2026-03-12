import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useSupabaseTracking } from '@/hooks/useSupabaseTracking';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';
import { useCountdown } from '@/hooks/useCountdown';
const MAKE_WEBHOOK_URL = 'https://hook.eu2.make.com/yusy3i37uoiv14b2dx1zv6wro898d9q5';

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
  const [isWaitingForConfirmation, setIsWaitingForConfirmation] = useState(false);
  const hasSentPaymentViewToMake = useRef(false);

  // Dane z formularza kontaktowego
  const name = searchParams.get('name') || '';
  const email = searchParams.get('email') || '';
  const phone = searchParams.get('phone') || '';
  const salaryRange = searchParams.get('salary_range') || '';
  const debtRange = searchParams.get('debt_range') || '';
  const hasBik = searchParams.get('has_bik') || '';

  // Licznik 11 minut - zapisywany w sessionStorage
  const {
    formattedTime,
    isExpired
  } = useCountdown({
    initialTime: 660,
    // 11 minut w sekundach
    storageKey: 'payment_vip_timer',
    onComplete: () => {
      console.log('⏰ Czas na płatność minął (11 minut) - przekierowanie na podziekowaniebezvip');
      // Przekieruj na stronę bez VIP
      const params = new URLSearchParams({
        name,
        email,
        phone: phone || phoneInput,
        salary_range: salaryRange,
        debt_range: debtRange,
        has_bik: hasBik,
      });
      navigate(`/podziekowaniebezvip?${params.toString()}`);
    }
  });
  useEffect(() => {
    trackPageView('payment_test', undefined, 'main_site');

    if (hasSentPaymentViewToMake.current) return;
    if (!name || !email || !(phone || phoneInput)) return;

    hasSentPaymentViewToMake.current = true;

    fetch(MAKE_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        phone: phone || phoneInput,
        salary_range: salaryRange,
        debt_range: debtRange,
        has_bik: hasBik,
        salaryRange,
        debtRange,
        hasBik,
        source: 'payment_page_view',
        timestamp: new Date().toISOString(),
      }),
    })
      .then(() => console.log('📤 Payment page view sent to Make.com'))
      .catch((err) => console.error('❌ Payment page view webhook error:', err));
  }, [trackPageView, name, email, phone, phoneInput, salaryRange, debtRange, hasBik]);
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
      setStep('blik-input'); // Od razu przejdź do inputu BLIK
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
      console.log('✅ BLIK code sent:', data);

      // Show confirmation message and wait for user to confirm in bank app
      setIsWaitingForConfirmation(true);
      setIsProcessing(false);

      // Poll for payment status
      let attempts = 0;
      const maxAttempts = 30; // 30 attempts * 2s = 60s timeout
      let pollingActive = true;
      const pollStatus = async () => {
        if (!pollingActive) return;
        attempts++;
        console.log(`🔄 Checking payment status (attempt ${attempts}/${maxAttempts})...`);
        try {
          const {
            data: statusData,
            error: statusError
          } = await supabase.functions.invoke('check-payment-status', {
            body: {
              transactionId
            }
          });
          if (statusError) {
            console.error('❌ Status check error:', statusError);
            pollingActive = false;
            setIsWaitingForConfirmation(false);
            setIsProcessing(false);
            setError('Nie można sprawdzić statusu płatności. Spróbuj ponownie.');
            return;
          }
          console.log('📊 Payment status:', statusData);
          console.log('🔍 Full TPay response:', statusData.fullResponse);

          // Check if payment is completed (correct) or failed
          if (statusData.status === 'correct' || statusData.paymentStatus === 'correct') {
            console.log('✅ Payment confirmed!');
            pollingActive = false;

            // Facebook Pixel - track lead conversion (wysyła do Make.com/CRM)
            if (typeof window !== 'undefined' && (window as any).fbq) {
              (window as any).fbq('track', 'Lead', {
                content_name: 'Płatność potwierdzona',
                content_category: 'Payment Confirmed',
                value: 9.90,
                currency: 'PLN'
              });
              console.log('🎯 Facebook Pixel: Lead conversion tracked for payment');
            }

            // Google Ads conversion tracking
            if ((window as any).gtag) {
              (window as any).gtag('event', 'conversion', {
                'send_to': 'AW-16741438120/5yX2CKmazt0ZEKil-K4-',
                'value': 9.90,
                'currency': 'PLN',
                'transaction_id': transactionId
              });
              console.log('🎯 Google Ads: Conversion tracked for payment');
            }

            // Zapisz status płatności i dane do localStorage (webhook wyśle timer w ABTestThankYou)
            localStorage.setItem('payment_status', 'Opłacone');

            // Zapisz także dane płatności dla webhooka
            const paymentData = {
              transaction_id: transactionId,
              amount: 9.90,
              currency: 'PLN',
              paid_at: new Date().toISOString()
            };
            localStorage.setItem('payment_data', JSON.stringify(paymentData));
            console.log('✅ Payment status saved to localStorage: Opłacone');
            console.log('💳 Payment data saved:', paymentData);

            // Finalny webhook do Make.com z KOMPLETEM danych
            try {
              await fetch(MAKE_WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  name,
                  email,
                  phone: phone || phoneInput,
                  salary_range: salaryRange,
                  debt_range: debtRange,
                  has_bik: hasBik,
                  salaryRange,
                  debtRange,
                  hasBik,
                  payment_status: 'Opłacone',
                  transaction_id: transactionId,
                  amount: 9.90,
                  paid_at: new Date().toISOString(),
                  source: 'payment_completed',
                }),
              });
              console.log('📤 Final webhook sent to Make.com with all data');
            } catch (webhookErr) {
              console.error('❌ Final webhook error:', webhookErr);
            }

            const params = new URLSearchParams({
              paid: 'true',
              payment_status: 'Opłacone',
              transactionId: data.transactionId || transactionId,
              name,
              email,
              phone: phone || phoneInput,
              salary_range: salaryRange,
              debt_range: debtRange,
              has_bik: hasBik,
            });
            console.log('🔗 Redirecting to /podziekowania with params:', {
              paid: 'true',
              payment_status: 'Opłacone',
              transactionId: data.transactionId || transactionId,
              name,
              email,
              phone: phone || phoneInput,
              fullUrl: `/podziekowania?${params.toString()}`
            });
            navigate(`/podziekowania?${params.toString()}`);
            return;
          }

          // Handle declined/error status - stop polling immediately
          if (statusData.status === 'declined' || statusData.status === 'error' || statusData.status === 'cancelled' || statusData.paymentStatus === 'declined') {
            console.log('❌ Payment declined/error');
            pollingActive = false;
            setIsWaitingForConfirmation(false);
            setIsProcessing(false);
            setError('Płatność została odrzucona. Sprawdź kod BLIK i spróbuj ponownie lub wybierz inną metodę płatności.');
            setBlikCode(''); // Clear BLIK code for retry
            return;
          }

          // If still pending and haven't exceeded max attempts, poll again
          if (attempts < maxAttempts && pollingActive) {
            setTimeout(pollStatus, 2000); // Check every 2 seconds
          } else if (pollingActive) {
            pollingActive = false;
            setIsWaitingForConfirmation(false);
            setIsProcessing(false);
            setError('Upłynął limit czasu oczekiwania na potwierdzenie płatności. Spróbuj ponownie.');
            setBlikCode(''); // Clear BLIK code for retry
          }
        } catch (err) {
          console.error('❌ Poll error:', err);
          pollingActive = false;
          setIsWaitingForConfirmation(false);
          setIsProcessing(false);
          setError(err instanceof Error ? err.message : 'Błąd sprawdzania statusu płatności. Spróbuj ponownie.');
          setBlikCode(''); // Clear BLIK code for retry
        }
      };

      // Start polling
      setTimeout(pollStatus, 2000); // Wait 2s before first check
    } catch (err) {
      console.error('❌ Payment error:', err);
      setIsProcessing(false);
      setError(err instanceof Error ? err.message : 'Płatność nie powiodła się. Sprawdź kod BLIK i spróbuj ponownie.');
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
            
            {/* Social proof + Urgency badges */}
            <div className="flex items-center justify-center gap-2 mb-3 flex-wrap">
              <div className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                <span>👥</span>
                <span>67 osób zapłaciło dziś</span>
              </div>
              <div className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 animate-pulse">
                <span>🔥</span>
                <span>Tylko 5 miejsc VIP!</span>
              </div>
            </div>
            
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
                <p className="text-xs sm:text-sm text-gray-600">⏳ Czekasz aż zwolni się miejsce na kontakt</p>
              </div>
              <div className="p-3 border-b border-gray-200 bg-green-50">
                <p className="text-xs sm:text-sm text-green-700 font-semibold">✅ Pomiń kolejkę - Priorytet #1</p>
              </div>
              
              {/* Wiersz 2 */}
              <div className="p-3 border-b border-r border-gray-200 bg-white">
                <p className="text-xs sm:text-sm text-gray-600">📞 Kontakt po kilku dniach</p>
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
              <div className="p-3 border-b border-r border-gray-200 bg-white">
                <p className="text-xs sm:text-sm text-gray-600">—</p>
              </div>
              <div className="p-3 border-b bg-green-50">
                <p className="text-xs sm:text-sm text-green-700 font-semibold">💼 Obsługa VIP przez cały proces</p>
              </div>
              
              {/* Wiersz 5 */}
              <div className="p-3 border-r border-gray-200 bg-white">
                <p className="text-xs sm:text-sm text-gray-600">—</p>
              </div>
              <div className="p-3 bg-green-50">
                <p className="text-xs sm:text-sm text-green-700 font-semibold">🎯 Dedykowany zespół z historią 15.000+ przypadków</p>
              </div>
            </div>
          </div>

          {/* Licznik VIP - wyróżniony */}
          

          {/* Analiza dokumentów - wyróżniona sekcja */}
          <div className="text-center mb-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-400 rounded-xl p-5 sm:p-6 shadow-md">
            <p className="text-base sm:text-lg lg:text-xl font-bold text-navy-900 leading-tight">
              💼 Wpłać teraz 9,90 zł za analizę Twoich dokumentów
            </p>
            <p className="text-sm sm:text-base text-blue-800 font-semibold mt-2">
              Nasz doradca wtedy wie, że zależy Ci na pomocy
            </p>
          </div>

          {/* Strzałki prowadzące do płatności */}
          <div className="flex flex-col items-center mb-4 animate-bounce">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>

          {/* Prosty baner BLIK z social proof */}
          <div className="mb-8 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-center gap-4 mb-3">
              <img src="/logos/blik-logo-rgb.png" alt="BLIK" className="h-10 sm:h-12 w-auto object-contain" />
              <div>
                <h2 className="text-2xl sm:text-3xl font-black">PŁATNOŚĆ BLIK</h2>
                <p className="text-sm sm:text-base font-semibold opacity-95">⚡ Tylko 20 sekund</p>
              </div>
            </div>
            
            {/* Social proof - ile osób dzisiaj zapłaciło */}
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 mb-3 text-center">
              <p className="text-sm font-bold">
                🔥 67 osób zapłaciło dziś za analizę VIP
              </p>
            </div>
            
            <p className="text-center text-sm font-medium opacity-90">
              Wypełnij dane → Wpisz kod 6-cyfrowy → Gotowe! 💳 Lub zapłać kartą/przelewem
            </p>
          </div>

          {/* Progress bar - pokazuje że jest blisko */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-navy-900">Krok {step === 'form' ? '1' : '2'} z 2</span>
              <span className="text-sm font-semibold text-green-600">{step === 'form' ? '50%' : '100%'} ✓</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-500 ease-out"
                style={{ width: step === 'form' ? '50%' : '100%' }}
              />
            </div>
            <p className="text-xs text-center text-gray-600 mt-2 font-medium">
              {step === 'form' ? '📝 Wypełnij dane kontaktowe' : '💳 Ostatni krok - wybierz metodę płatności!'}
            </p>
          </div>

          {/* Podsumowanie danych - pokazuje się po wypełnieniu formularza */}
          {step !== 'form' && (
            <div className="mb-6 bg-green-50 border-2 border-green-300 rounded-xl p-4 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-green-900">✓ Dane kontaktowe zapisane</p>
                  <p className="text-xs text-green-700">{firstName} {lastName} • {phoneInput}</p>
                </div>
                <button 
                  onClick={() => {
                    setStep('form');
                    setError('');
                  }}
                  className="text-xs text-green-700 hover:text-green-900 font-medium underline"
                >
                  Zmień
                </button>
              </div>
            </div>
          )}

          {/* Formularz płatności - Płynne rozwinięcie */}
          <div className="space-y-5">
            {/* KROK 1: Imię i nazwisko - widoczne tylko gdy step === 'form' */}
            {step === 'form' && (
              <form onSubmit={handleInitiatePayment} className="space-y-5 animate-fade-in">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-semibold text-navy-900 mb-2">
                      Imię
                    </label>
                    <Input id="firstName" type="text" placeholder="Jan" value={firstName} onChange={e => setFirstName(e.target.value)} className="h-14 border-2 border-gray-300 focus:border-business-blue-600 rounded-lg text-base" disabled={isProcessing} required />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-semibold text-navy-900 mb-2">
                      Nazwisko
                    </label>
                    <Input id="lastName" type="text" placeholder="Kowalski" value={lastName} onChange={e => setLastName(e.target.value)} className="h-14 border-2 border-gray-300 focus:border-business-blue-600 rounded-lg text-base" disabled={isProcessing} required />
                  </div>
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-navy-900 mb-2">
                    Telefon <span className="text-red-600">*</span>
                  </label>
                  <Input id="phone" type="tel" placeholder="600 000 000" value={phoneInput} onChange={e => setPhoneInput(e.target.value.replace(/[^0-9]/g, ''))} maxLength={9} className="h-14 border-2 border-gray-300 focus:border-business-blue-600 rounded-lg text-base" disabled={isProcessing} required />
                </div>

                {error && <div className="bg-red-50 border-2 border-red-400 text-red-700 px-4 py-3 rounded-lg text-sm font-semibold animate-in fade-in slide-in-from-top-2 duration-300">
                    ⚠️ {error}
                  </div>}

                {/* Premium Payment Button - bez logo */}
                <div className="relative mt-8">
                  <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-7 sm:py-9 text-lg sm:text-xl rounded-2xl shadow-2xl transform hover:scale-[1.02] transition-all duration-300" size="lg" disabled={isProcessing || !firstName.trim() || !lastName.trim() || phoneInput.trim().length !== 9}>
                    {isProcessing ? <div className="flex items-center justify-center w-full">
                        <Loader2 className="mr-2 h-5 w-5 sm:h-6 sm:w-6 animate-spin" />
                        <span className="text-base sm:text-lg">Przygotowywanie...</span>
                      </div> : <span className="text-xl sm:text-2xl font-bold">Zapłać 9,90 za analizę VIP</span>}
                  </Button>
                  <p className="text-center text-xs sm:text-sm text-gray-600 mt-3 font-medium">
                    💳 Lub wybierz kartę / przelew na następnym ekranie
                  </p>
                </div>
              </form>
            )}

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
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <img src="/logos/blik-logo.png" alt="BLIK" className="h-6 sm:h-8 w-auto object-contain" />
                      <h4 className="font-bold text-navy-900 text-sm sm:text-base">Płatność BLIK</h4>
                    </div>
                    
                    {/* Urgency + Trust badges */}
                    <div className="flex items-center justify-center gap-3 mb-3">
                      <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                        <span>🔥</span>
                        <span>5 miejsc VIP zostało</span>
                      </div>
                      <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                        <span>Bezpieczne</span>
                      </div>
                    </div>

                    {!isWaitingForConfirmation ? <>
                        <div className="bg-white rounded-lg p-3 sm:p-4 mb-3">
                          <ol className="text-xs sm:text-sm text-gray-700 space-y-1">
                            <li>1️⃣ Otwórz aplikację bankową</li>
                            <li>2️⃣ Wygeneruj kod BLIK</li>
                            <li>3️⃣ Wpisz poniżej (ważny 2 min)</li>
                          </ol>
                        </div>
                        
                        {/* Dodatkowa motywacja */}
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2 mb-3 text-center">
                          <p className="text-xs font-semibold text-yellow-900">
                            ⚡ 78% klientów kończy w 30 sekund
                          </p>
                        </div>

                        <form onSubmit={handleBlikPayment} className="space-y-4">
                          <div>
                            <Input type="text" maxLength={6} placeholder="000 000" value={blikCode} onChange={e => setBlikCode(e.target.value.replace(/\D/g, ''))} className="h-16 text-center text-2xl sm:text-3xl tracking-[0.3em] font-bold border-2 border-blue-400 focus:border-blue-600 rounded-xl" disabled={isProcessing} autoFocus />
                          </div>

                          {error && <div className="bg-red-50 border-2 border-red-400 text-red-700 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold">
                              ⚠️ {error}
                            </div>}

                          <Button type="submit" className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-5 text-base sm:text-lg rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02]" disabled={isProcessing || blikCode.length !== 6}>
                            {isProcessing ? <>
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                <span>Wysyłanie...</span>
                              </> : <>
                                <span className="text-lg sm:text-xl">✅ ZAPŁAĆ 9,90 zł - ZDOBĄDŹ VIP</span>
                              </>}
                          </Button>
                          
                          {/* Gwarancja pod buttonem */}
                          <div className="text-center mt-2">
                            <p className="text-xs text-green-700 font-semibold">
                              💯 Zwrot 100% przy rozpoczęciu współpracy konsolidacyjnej | 🔒 Bezpieczna płatność TPay
                            </p>
                          </div>

                          <Button type="button" variant="ghost" onClick={() => {
                    setStep('payment-choice');
                    setBlikCode('');
                    setError('');
                  }} disabled={isProcessing} className="w-full text-xs sm:text-sm">
                            ← Zmień metodę płatności
                          </Button>
                        </form>
                      </> : <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-500">
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-6 text-center">
                          <Loader2 className="mx-auto h-12 w-12 text-green-600 animate-spin mb-4" />
                          <h4 className="text-lg font-bold text-green-900 mb-2">
                            📱 Potwierdź płatność w aplikacji bankowej
                          </h4>
                          <p className="text-sm text-green-800 mb-4">
                            Otwórz aplikację swojego banku i zaakceptuj płatność BLIK.
                            Czekamy na potwierdzenie...
                          </p>
                          <Button type="button" variant="outline" onClick={() => {
                    setIsWaitingForConfirmation(false);
                    setIsProcessing(false);
                    setBlikCode('');
                    setError('');
                  }} className="text-sm">
                            Anuluj i spróbuj ponownie
                          </Button>
                        </div>

                        {error && <div className="bg-red-50 border-2 border-red-400 text-red-700 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold">
                            ⚠️ {error}
                          </div>}
                      </div>}
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
                          <p className="font-bold text-navy-900 text-sm sm:text-base">Przelew / Karta</p>
                          <p className="text-xs sm:text-sm text-gray-600">Przelewy bankowe, Visa, Mastercard</p>
                        </div>
                        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </button>
                  </>}
              </div>}

            {/* Security info */}
            <div className="text-center pt-4 space-y-3">
              <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <span>Płatność zabezpieczona przez TPay</span>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <p className="text-xs font-semibold text-gray-700 mb-2">Dostępne metody płatności:</p>
                <div className="flex items-center justify-center gap-2 sm:gap-3 text-xs text-gray-600 flex-wrap">
                  <span className="flex items-center gap-1 bg-white px-2 py-1 rounded">
                    <img src="/logos/blik-logo.png" alt="BLIK" className="h-3 w-auto" />
                    BLIK
                  </span>
                  <span className="flex items-center gap-1 bg-white px-2 py-1 rounded">
                    <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Przelewy online
                  </span>
                  <span className="flex items-center gap-1 bg-white px-2 py-1 rounded">
                    <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    Karty
                  </span>
                  <span className="flex items-center gap-1 bg-white px-2 py-1 rounded">
                    <svg className="w-3 h-3 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                    Google Pay
                  </span>
                  <span className="flex items-center gap-1 bg-white px-2 py-1 rounded">
                    <svg className="w-3 h-3 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                    </svg>
                    Apple Pay
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>;
};
export default PaymentTest;