
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Clock, AlertCircle, MessageSquare, CheckCircle } from 'lucide-react';
import { useABTest } from '../hooks/useABTest';
import { useCountdown } from '../hooks/useCountdown';

// Rozszerzenie obiektu window o fbq
declare global {
  interface Window {
    fbq: (action: string, event: string, params?: any) => void;
  }
}

const ABTestSmsVerification = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const success = searchParams.get('success');
  const name = searchParams.get('name') || '';
  const email = searchParams.get('email') || '';
  const phone = searchParams.get('phone') || '';
  
  const [smsCode, setSmsCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationError, setVerificationError] = useState('');
  
  // Sprawdź ustawienia A/B testu
  const { settings } = useABTestSettings();
  
  // A/B Test hook z nowymi funkcjami
  const { variant, isVariantA, trackConversion } = useABTest({
    testName: 'sms_verification_test',
    splitRatio: 0.5,
    enabled: settings.sms_verification_enabled,
    forceVariant: settings.sms_verification_force_variant
  });

  // Countdown hook - 5 minut (300 sekund)
  const { formattedTime, isExpired, reset: resetCountdown } = useCountdown({
    initialTime: 300,
    onComplete: () => {
      console.log('⏰ SMS verification countdown expired - 5 minutes elapsed');
    }
  });
  
  // Sztywny kod weryfikacyjny
  const VERIFICATION_CODE = '1212';
  
  // Webhook URLs
  const verificationWebhookUrl = "https://hook.eu2.make.com/py94cyfbhaa514btm2klljd3m3q2tpye";
  const verifiedClientWebhookUrl = "https://hook.eu2.make.com/mqcldwrvdmcd4ntk338yqipsi1p5ijv3";

  // Facebook Pixel - track page view
  useEffect(() => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'CompleteRegistration', {
        content_name: 'SMS Verification Page',
        content_category: 'Lead Generation',
        value: 1,
        currency: 'PLN'
      });
    }
  }, []);

  const handleSmsVerification = async () => {
    if (smsCode.length !== 4) {
      setVerificationError('Kod SMS musi mieć 4 cyfry');
      return;
    }

    setIsVerifying(true);
    setVerificationError('');

    try {
      // Symulacja weryfikacji SMS - sprawdzenie sztywnego kodu
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Sprawdzenie czy kod jest poprawny (1212)
      if (smsCode === VERIFICATION_CODE) {
        
        // Track conversion for A/B test
        trackConversion();
        
        // Wywołanie pierwszego webhook do aktualizacji Google Sheets z informacją o weryfikacji
        try {
          const verificationData = {
            phone: decodeURIComponent(phone),
            name: decodeURIComponent(name),
            email: decodeURIComponent(email),
            sms_verified: true,
            sms_verified_at: new Date().toISOString(),
            verification_status: 'VERIFIED',
            client_quality: 'GOOD_CLIENT'
          };
          
          console.log('📤 Sending verification update to Make.com:', verificationData);
          
          const response = await fetch(verificationWebhookUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(verificationData),
          });
          
          if (response.ok) {
            console.log('✅ Verification status updated in Google Sheets');
          } else {
            console.error('❌ Failed to update verification status:', response.statusText);
          }
          
        } catch (error) {
          console.error('❌ Error updating verification status:', error);
        }

        // POPRAWIONY NOWY HOOK - Wysłanie zweryfikowanych danych klienta
        try {
          // Przygotowanie danych bez dekodowania (może to powodować problem)
          const verifiedClientData = {
            name: name,
            email: email,
            phone: phone,
            sms_code_verified: true,
            verification_code_used: VERIFICATION_CODE,
            verified_at: new Date().toISOString(),
            client_status: 'VERIFIED_CLIENT',
            ready_for_consultation: true,
            source: 'SMS_VERIFICATION_PAGE',
            webhook_test: 'test_data_v2'
          };
          
          console.log('📤 Sending verified client data to new Make.com hook:', verifiedClientData);
          console.log('🔗 Hook URL:', verifiedClientWebhookUrl);
          
          const verifiedResponse = await fetch(verifiedClientWebhookUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify(verifiedClientData),
          });
          
          console.log('📊 Response status:', verifiedResponse.status);
          console.log('📊 Response headers:', verifiedResponse.headers);
          
          if (verifiedResponse.ok) {
            console.log('✅ Verified client data sent to new Make.com hook successfully');
            const responseText = await verifiedResponse.text();
            console.log('📋 Response body:', responseText);
          } else {
            console.error('❌ Failed to send verified client data. Status:', verifiedResponse.status);
            const errorText = await verifiedResponse.text();
            console.error('❌ Error response:', errorText);
          }
          
        } catch (error) {
          console.error('❌ Error sending verified client data:', error);
          console.error('❌ Error details:', error.message);
        }
        
        // Facebook Pixel - track SMS verification
        if (typeof window !== 'undefined' && window.fbq) {
          window.fbq('track', 'Purchase', {
            content_name: 'SMS Verification Complete',
            content_category: 'Consultation Confirmed',
            value: 1,
            currency: 'PLN'
          });
        }

        // PRZEKIEROWANIE NA /podziekowania z parametrami
        const params = new URLSearchParams({
          name: name,
          email: email,
          phone: phone
        });
        navigate(`/podziekowania?${params.toString()}`);
        
      } else {
        setVerificationError('Nieprawidłowy kod SMS. Spróbuj ponownie.');
        
        // Zapisz również nieudaną próbę weryfikacji
        try {
          const failedVerificationData = {
            phone: decodeURIComponent(phone),
            name: decodeURIComponent(name),
            email: decodeURIComponent(email),
            sms_verified: false,
            sms_verified_at: new Date().toISOString(),
            verification_status: 'FAILED',
            client_quality: 'UNVERIFIED',
            failed_code: smsCode
          };
          
          await fetch(verificationWebhookUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(failedVerificationData),
          });
          
        } catch (error) {
          console.error('❌ Error logging failed verification:', error);
        }
      }
      
    } catch (error) {
      setVerificationError('Wystąpił błąd podczas weryfikacji. Spróbuj ponownie.');
      console.error('❌ SMS verification error:', error);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendSms = () => {
    resetCountdown();
    setSmsCode('');
    setVerificationError('');
    console.log('📱 SMS resent - countdown reset');
  };

  console.log('📱 SmsVerification component rendered with params:', { name, email, phone, success });

  // Wariant A - Oryginalny design
  if (isVariantA) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-warm-neutral-50 via-business-blue-50 to-prestige-gold-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <div className="bg-white rounded-2xl shadow-xl border-0 p-6 lg:p-8 xl:p-10 h-full flex flex-col justify-between min-h-[600px] w-full">
            
            {/* Header z wizerunkiem Dariusza Wentrycha */}
            <div className="text-center mb-8">
              <div className="flex justify-center items-center mb-6">
                <div className="flex flex-col items-center">
                  <img 
                    src="/lovable-uploads/01dcb25b-999a-4c0d-b7da-525c21306610.png"
                    alt="Dariusz Wentrych"
                    className="w-20 h-20 rounded-full overflow-hidden border-3 border-business-blue-200 shadow-xl object-cover mb-3"
                  />
                  <div className="text-center">
                    <h3 className="text-lg font-bold text-navy-900">Dariusz Wentrych</h3>
                    <p className="text-sm text-business-blue-600">#1 Ekspert ds. oddłużeń w Polsce</p>
                  </div>
                </div>
              </div>
              <h1 className="text-xl lg:text-2xl font-bold text-navy-900 mb-3">
                Potwierdź bezpłatną konsultację
              </h1>
              <p className="text-warm-neutral-600 text-sm lg:text-base mb-2">
                Wysłaliśmy kod SMS na numer: <strong>{decodeURIComponent(phone) || 'Twój numer'}</strong>
              </p>
              <p className="text-warm-neutral-500 text-sm">
                Wpisz 4-cyfrowy kod, aby potwierdzić umówienie bezpłatnej konsultacji
              </p>
            </div>

            {/* Timer */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center bg-orange-50 text-orange-700 px-4 py-2 rounded-lg border border-orange-200">
                <Clock className="w-4 h-4 mr-2" />
                <span className="font-mono text-lg font-bold">{formattedTime}</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">Pozostały czas na wprowadzenie kodu</p>
              
              {isExpired && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 mt-4">
                  <div className="flex items-center justify-center space-x-2">
                    <AlertCircle className="w-4 h-4 text-red-600" />
                    <span className="text-red-600 text-sm">
                      Czas na wprowadzenie kodu upłynął. Wyślij kod ponownie.
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Formularz SMS z większym polem */}
            <div className="flex-1 flex flex-col justify-center space-y-6">
              <div className="text-center">
                <label className="block text-lg font-medium text-navy-800 mb-6">
                  Kod SMS
                </label>
                <div className="flex justify-center">
                  <InputOTP 
                    maxLength={4} 
                    value={smsCode} 
                    onChange={setSmsCode}
                    className="text-2xl"
                    disabled={isExpired}
                  >
                    <InputOTPGroup className="gap-4">
                      <InputOTPSlot 
                        index={0} 
                        className="w-16 h-16 text-2xl font-bold border-2 border-business-blue-300 rounded-xl focus:border-business-blue-600 focus:ring-2 focus:ring-business-blue-200"
                      />
                      <InputOTPSlot 
                        index={1} 
                        className="w-16 h-16 text-2xl font-bold border-2 border-business-blue-300 rounded-xl focus:border-business-blue-600 focus:ring-2 focus:ring-business-blue-200"
                      />
                      <InputOTPSlot 
                        index={2} 
                        className="w-16 h-16 text-2xl font-bold border-2 border-business-blue-300 rounded-xl focus:border-business-blue-600 focus:ring-2 focus:ring-business-blue-200"
                      />
                      <InputOTPSlot 
                        index={3} 
                        className="w-16 h-16 text-2xl font-bold border-2 border-business-blue-300 rounded-xl focus:border-business-blue-600 focus:ring-2 focus:ring-business-blue-200"
                      />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                
                {verificationError && (
                  <p className="text-red-600 text-base mt-4 font-medium">{verificationError}</p>
                )}
              </div>

              <div className="text-center">
                <button
                  onClick={handleSmsVerification}
                  disabled={smsCode.length !== 4 || isVerifying || isExpired}
                  className="bg-gradient-to-r from-navy-900 to-business-blue-600 hover:from-navy-800 hover:to-business-blue-500 text-white font-bold py-4 px-8 text-lg rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isVerifying ? "Weryfikuję..." : "Potwierdź bezpłatną konsultację"}
                </button>
                
                <p className="text-base text-gray-600 mt-6">
                  Nie otrzymałeś SMS? 
                  <button 
                    className="text-business-blue-600 hover:underline ml-1 font-medium"
                    onClick={handleResendSms}
                  >
                    Wyślij ponownie
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Wariant B - Nowy agresywny design z czerwono-pomarańczową kolorystyką
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-3xl shadow-2xl border-0 p-6 lg:p-8 xl:p-10 h-full flex flex-col justify-between min-h-[600px] w-full ring-2 ring-red-200">
          
          {/* Header z bardziej agresywnym designem */}
          <div className="text-center mb-8">
            <div className="flex justify-center items-center mb-6">
              <div className="flex flex-col items-center">
                <div className="relative">
                  <img 
                    src="/lovable-uploads/01dcb25b-999a-4c0d-b7da-525c21306610.png"
                    alt="Dariusz Wentrych"
                    className="w-24 h-24 rounded-full overflow-hidden border-4 border-red-500 shadow-2xl object-cover mb-3"
                  />
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    #1
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-black text-red-900">Dariusz Wentrych</h3>
                  <p className="text-base text-red-600 font-bold">#1 Ekspert ds. oddłużeń w Polsce</p>
                </div>
              </div>
            </div>
            <h1 className="text-2xl lg:text-3xl font-black text-red-900 mb-4">
              ⚡ POTWIERDŹ TERAZ SWOJĄ KONSULTACJĘ!
            </h1>
            <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white p-4 rounded-xl mb-4">
              <p className="text-lg font-bold mb-2">
                KOD SMS WYSŁANY NA: 
              </p>
              <p className="text-xl font-black bg-white text-red-600 px-4 py-2 rounded-lg inline-block">
                {decodeURIComponent(phone) || 'Twój numer'}
              </p>
            </div>
            <p className="text-red-700 text-base font-semibold">
              ⏰ MASZ TYLKO 5 MINUT NA WPROWADZENIE KODU!
            </p>
          </div>

          {/* Bardziej wyrazisty Timer */}
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-8 py-4 rounded-2xl border-2 border-red-700 shadow-xl">
              <div className="flex items-center justify-center space-x-3">
                <Clock className="w-8 h-8 animate-pulse" />
                <div>
                  <p className="text-lg font-black">ZOSTAŁO CZASU:</p>
                  <span className="font-mono text-3xl font-black">{formattedTime}</span>
                </div>
              </div>
            </div>
            
            {isExpired && (
              <div className="bg-red-100 border-2 border-red-600 rounded-xl p-4 mt-4">
                <div className="flex items-center justify-center space-x-2">
                  <AlertCircle className="w-6 h-6 text-red-700" />
                  <span className="text-red-800 text-lg font-black">
                    ⏰ CZAS UPŁYNĄŁ! WYŚLIJ KOD PONOWNIE!
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Formularz SMS z bardziej agresywnym designem */}
          <div className="flex-1 flex flex-col justify-center space-y-8">
            <div className="text-center">
              <label className="block text-2xl font-black text-red-900 mb-8">
                🔥 WPISZ 4-CYFROWY KOD SMS
              </label>
              <div className="flex justify-center">
                <InputOTP 
                  maxLength={4} 
                  value={smsCode} 
                  onChange={setSmsCode}
                  className="text-3xl"
                  disabled={isExpired}
                >
                  <InputOTPGroup className="gap-6">
                    <InputOTPSlot 
                      index={0} 
                      className="w-20 h-20 text-3xl font-black border-4 border-red-400 rounded-2xl focus:border-red-600 focus:ring-4 focus:ring-red-200 bg-red-50"
                    />
                    <InputOTPSlot 
                      index={1} 
                      className="w-20 h-20 text-3xl font-black border-4 border-red-400 rounded-2xl focus:border-red-600 focus:ring-4 focus:ring-red-200 bg-red-50"
                    />
                    <InputOTPSlot 
                      index={2} 
                      className="w-20 h-20 text-3xl font-black border-4 border-red-400 rounded-2xl focus:border-red-600 focus:ring-4 focus:ring-red-200 bg-red-50"
                    />
                    <InputOTPSlot 
                      index={3} 
                      className="w-20 h-20 text-3xl font-black border-4 border-red-400 rounded-2xl focus:border-red-600 focus:ring-4 focus:ring-red-200 bg-red-50"
                    />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              
              {verificationError && (
                <div className="bg-red-100 border-2 border-red-500 rounded-xl p-4 mt-6">
                  <p className="text-red-800 text-lg font-bold">{verificationError}</p>
                </div>
              )}
            </div>

            <div className="text-center">
              <button
                onClick={handleSmsVerification}
                disabled={smsCode.length !== 4 || isVerifying || isExpired}
                className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-black py-6 px-12 text-2xl rounded-2xl shadow-2xl hover:shadow-3xl transform transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed border-4 border-red-700"
              >
                {isVerifying ? "⏳ WERYFIKUJĘ..." : "🚀 POTWIERDŹ KONSULTACJĘ TERAZ!"}
              </button>
              
              <div className="mt-8">
                <p className="text-lg text-red-700 font-bold mb-4">
                  Nie otrzymałeś SMS? 
                </p>
                <button 
                  className="bg-orange-500 hover:bg-orange-600 text-white font-black py-3 px-8 rounded-xl text-lg transition-all duration-300 hover:scale-105 border-2 border-orange-600"
                  onClick={handleResendSms}
                >
                  📱 WYŚLIJ PONOWNIE
                </button>
              </div>
            </div>
          </div>

          {/* Dodatkowy element motywacyjny */}
          <div className="text-center mt-6">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-4 rounded-xl border-2 border-green-600">
              <p className="text-lg font-bold">
                ✅ TWOJA KONSULTACJA ZOSTANIE POTWIERDZONA W CIĄGU KILKU SEKUND!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ABTestSmsVerification;
