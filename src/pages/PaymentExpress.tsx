import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSupabaseTracking } from '@/hooks/useSupabaseTracking';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, Clock, Shield, Zap, CheckCircle } from 'lucide-react';
import { useCountdown } from '@/hooks/useCountdown';

const PaymentExpress = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { trackPageView } = useSupabaseTracking();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<'blik' | 'other'>('blik');
  const [transactionId, setTransactionId] = useState('');
  const [paymentUrl, setPaymentUrl] = useState('');
  const [blikCode, setBlikCode] = useState('');
  const [error, setError] = useState('');
  const [isWaitingForConfirmation, setIsWaitingForConfirmation] = useState(false);

  // Dane z formularza kontaktowego (już są przekazane)
  const fullName = searchParams.get('name') || 'Jan Kowalski';
  const nameParts = fullName.trim().split(' ');
  const firstName = nameParts[0] || 'Jan';
  const lastName = nameParts.slice(1).join(' ') || 'Kowalski';
  const email = searchParams.get('email') || 'kontakt@example.com';
  const phone = searchParams.get('phone') || '123456789';
  
  // Licznik 11 minut
  const { formattedTime, isExpired } = useCountdown({ 
    initialTime: 660,
    storageKey: 'payment_express_timer',
    onComplete: () => {
      const params = new URLSearchParams({ 
        name: fullName, 
        email, 
        phone 
      });
      navigate(`/podziekowaniebezvip?${params.toString()}`);
    }
  });

  useEffect(() => {
    trackPageView('payment_express', undefined, 'main_site');
    
    // Sprawdź czy mamy prawdziwe dane
    const hasRealData = searchParams.get('name') && searchParams.get('email') && searchParams.get('phone');
    
    if (!hasRealData) {
      console.warn('⚠️ PaymentExpress otwarty bez danych z formularza - używam danych testowych');
    }
    
    // Auto-create transaction on page load
    handleInitiatePayment();
  }, []);

  const handleInitiatePayment = async () => {
    if (transactionId) return; // Already created
    
    // Validate data before creating transaction
    if (!firstName || firstName.length < 3) {
      setError('Imię musi mieć minimum 3 znaki');
      return;
    }
    if (!phone || phone.length < 9) {
      setError('Numer telefonu musi mieć minimum 9 cyfr');
      return;
    }
    
    setIsProcessing(true);
    try {
      const { data, error: functionError } = await supabase.functions.invoke('create-tpay-transaction', {
        body: {
          firstName,
          lastName,
          email,
          phone,
          amount: 9.90
        }
      });

      if (functionError) throw new Error(functionError.message || 'Błąd tworzenia transakcji');
      if (data.error) throw new Error(data.details || data.error);

      setTransactionId(data.transactionId);
      setPaymentUrl(data.paymentUrl);
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
      const { data, error: functionError } = await supabase.functions.invoke('confirm-blik-payment', {
        body: { transactionId, blikCode }
      });

      if (functionError) throw new Error(functionError.message || 'Błąd płatności BLIK');
      if (data.error) throw new Error(data.details || data.error);

      setIsWaitingForConfirmation(true);
      setIsProcessing(false);

      // Poll for payment status
      let attempts = 0;
      const maxAttempts = 30;
      let pollingActive = true;

      const pollStatus = async () => {
        if (!pollingActive) return;
        attempts++;

        try {
          const { data: statusData, error: statusError } = await supabase.functions.invoke('check-payment-status', {
            body: { transactionId }
          });

          if (statusError) {
            pollingActive = false;
            setIsWaitingForConfirmation(false);
            setIsProcessing(false);
            setError('Nie można sprawdzić statusu płatności. Spróbuj ponownie.');
            return;
          }

          if (statusData.status === 'correct' || statusData.paymentStatus === 'correct') {
            pollingActive = false;
            
            // Facebook Pixel tracking
            if (typeof window !== 'undefined' && (window as any).fbq) {
              (window as any).fbq('track', 'Lead', {
                content_name: 'Płatność potwierdzona',
                content_category: 'Payment Confirmed',
                value: 9.90,
                currency: 'PLN'
              });
            }
            
            // Google Ads tracking
            if ((window as any).gtag) {
              (window as any).gtag('event', 'conversion', {
                'send_to': 'AW-16741438120/5yX2CKmazt0ZEKil-K4-',
                'value': 9.90,
                'currency': 'PLN',
                'transaction_id': transactionId
              });
            }
            
            localStorage.setItem('payment_status', 'Opłacone');
            const paymentData = {
              transaction_id: transactionId,
              amount: 9.90,
              currency: 'PLN',
              paid_at: new Date().toISOString()
            };
            localStorage.setItem('payment_data', JSON.stringify(paymentData));
            
            const params = new URLSearchParams({
              paid: 'true',
              payment_status: 'Opłacone',
              transactionId,
              name: fullName,
              email,
              phone
            });
            
            navigate(`/podziekowania?${params.toString()}`);
            return;
          }

          if (statusData.status === 'declined' || statusData.status === 'error' || statusData.status === 'cancelled') {
            pollingActive = false;
            setIsWaitingForConfirmation(false);
            setIsProcessing(false);
            setError('Płatność została odrzucona. Sprawdź kod BLIK i spróbuj ponownie.');
            setBlikCode('');
            return;
          }

          if (attempts < maxAttempts && pollingActive) {
            setTimeout(pollStatus, 2000);
          } else if (pollingActive) {
            pollingActive = false;
            setIsWaitingForConfirmation(false);
            setIsProcessing(false);
            setError('Upłynął limit czasu oczekiwania na potwierdzenie płatności. Spróbuj ponownie.');
            setBlikCode('');
          }
        } catch (err) {
          pollingActive = false;
          setIsWaitingForConfirmation(false);
          setIsProcessing(false);
          setError('Błąd sprawdzania statusu płatności. Spróbuj ponownie.');
          setBlikCode('');
        }
      };

      setTimeout(pollStatus, 2000);
    } catch (err) {
      setIsProcessing(false);
      setError(err instanceof Error ? err.message : 'Płatność nie powiodła się. Sprawdź kod BLIK i spróbuj ponownie.');
    }
  };

  const handleOtherPaymentMethods = () => {
    if (paymentUrl) {
      window.location.href = paymentUrl;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Sticky Timer Bar */}
        <div className={`fixed top-0 left-0 right-0 z-50 py-3 px-4 shadow-lg ${
          isExpired ? 'bg-red-600' : 'bg-gradient-to-r from-orange-500 to-red-600'
        }`}>
          <div className="max-w-md mx-auto flex items-center justify-between text-white">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span className="font-bold text-lg">{formattedTime}</span>
            </div>
            <span className="text-sm font-semibold">Priorytet VIP</span>
          </div>
        </div>

        {/* Main Card */}
        <div className="mt-16 bg-white rounded-2xl shadow-2xl border-0 p-8">
          
          {/* Compact Header */}
          <div className="text-center mb-6">
            <img 
              src="/lovable-uploads/01dcb25b-999a-4c0d-b7da-525c21306610.png" 
              alt="Dariusz Wentrych" 
              className="w-16 h-16 rounded-full mx-auto mb-3 border-2 border-blue-400 shadow-lg object-cover" 
            />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              ✅ Jeden krok do konsultacji
            </h1>
            <p className="text-gray-600 text-sm">
              Dariusz Wentrych czeka na Twój sygnał
            </p>
            <div className="mt-2 text-xs text-gray-500">
              {fullName} • {phone}
            </div>
          </div>

          {/* Why Pay - Compact */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 mb-6 border border-blue-200">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}
            <div className="flex flex-col md:flex-row items-start md:gap-3 mb-4">
              <Shield className="w-6 h-6 text-blue-600 flex-shrink-0 mb-2 md:mb-0 md:mt-0.5 mx-auto md:mx-0" />
              <div className="w-full">
                <p className="text-lg text-gray-900 font-bold mb-2">
                  Dlaczego chcemy teraz pobrać od Ciebie 9,90 zł?
                </p>
                <div className="flex items-center gap-4 mb-3 text-xs text-gray-600">
                  <div className="flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 text-blue-600" />
                    <span>BLIK 30 sekund</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5 text-green-600" />
                    <span>Przelew online</span>
                  </div>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed mb-3">
                  Codziennie wiele osób wypełnia formularz kontaktowy, ale część z nich nigdy nie odbiera telefonu. A my to nie przypadkowa infolinia – tylko zespół ludzi, którzy poświęcają swój czas, żeby realnie pomagać. Wśród nas są osoby, które po pracy wracają do rodzin, niektórzy mają dzieci – a mimo to znajdują czas, by wspierać innych.
                </p>
                <p className="text-sm text-gray-700 leading-relaxed mb-3">
                  Symboliczna wpłata 9,90 zł to forma weryfikacji, która pozwala nam mieć pewność, że zgłasza się do nas osoba rzeczywiście zainteresowana rozmową i pomocą w sprawie finansowej. To proste zabezpieczenie przed przypadkowymi zgłoszeniami, które blokują czas naszych doradców.
                </p>
                <p className="text-sm text-gray-900 font-semibold mb-2">
                  W ramach weryfikacji analizujemy Twoją sytuację kredytową, w tym:
                </p>
                <div className="space-y-2 mb-3">
                  <div className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>możliwości uzyskania finansowania na podstawie przedstawionych danych,</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>błędy i nieprawidłowości widoczne w raportach BIK, BIG i InfoMonitora,</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>czynniki obniżające zdolność kredytową oraz to, co można poprawić,</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>potencjalne ścieżki rozwiązania problemu finansowego.</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2 mt-3">
              <div className="flex items-center gap-2 text-xs text-gray-700">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Zwrot przy współpracy</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-700">
                <Zap className="w-4 h-4 text-orange-600" />
                <span>Kontakt w 24h</span>
              </div>
            </div>
          </div>

          {/* Price - Prominent */}
          <div className="text-center mb-6">
            <div className="inline-flex items-baseline gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-full">
              <span className="text-4xl font-black">9,90 zł</span>
              <span className="text-sm opacity-90">jednorazowo</span>
            </div>
          </div>

          {/* BLIK Payment Form */}
          {step === 'blik' && (
            <form onSubmit={handleBlikPayment} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kod BLIK z aplikacji bankowej
                </label>
                <Input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={6}
                  value={blikCode}
                  onChange={(e) => setBlikCode(e.target.value.replace(/\D/g, ''))}
                  placeholder="_ _ _ _ _ _"
                  className="text-center text-2xl font-mono tracking-widest h-14"
                  disabled={isProcessing || isWaitingForConfirmation}
                />
              </div>

              {isWaitingForConfirmation && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                  <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-blue-600" />
                  <p className="text-sm text-blue-800 font-medium">
                    Potwierdź płatność w aplikacji bankowej
                  </p>
                </div>
              )}

              <Button 
                type="submit"
                className="w-full h-14 text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg"
                disabled={isProcessing || isWaitingForConfirmation || blikCode.length !== 6}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    Przetwarzanie...
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5 mr-2" />
                    Zapłać BLIK
                  </>
                )}
              </Button>

              <button
                type="button"
                onClick={() => setStep('other')}
                className="w-full text-sm text-gray-600 hover:text-gray-900 font-medium"
                disabled={isProcessing}
              >
                Lub wybierz inną metodę płatności
              </button>
            </form>
          )}

          {/* Other Payment Methods */}
          {step === 'other' && (
            <div className="space-y-4">
              <Button
                onClick={handleOtherPaymentMethods}
                className="w-full h-14 text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg"
                disabled={!paymentUrl}
              >
                Zapłać kartą lub przelewem
              </Button>

              <button
                type="button"
                onClick={() => setStep('blik')}
                className="w-full text-sm text-gray-600 hover:text-gray-900 font-medium"
              >
                ← Wróć do płatności BLIK
              </button>
            </div>
          )}

          {/* Trust Badges */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <Shield className="w-4 h-4" />
                <span>Bezpieczne</span>
              </div>
              <div className="flex items-center gap-1">
                <img src="/logos/blik-logo.png" alt="BLIK" className="h-4" />
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4" />
                <span>Szyfrowane</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Benefits - Minimal */}
        <div className="mt-4 text-center text-xs text-gray-500 space-y-1">
          <p>💼 Status VIP • ⚡ Natychmiastowy kontakt</p>
          <p>🎁 Zwrot 9,90 zł przy rozpoczęciu współpracy</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentExpress;
