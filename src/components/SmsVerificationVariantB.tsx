import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Clock, AlertCircle } from 'lucide-react';
import { useCountdown } from '../hooks/useCountdown';
import LiveNotifications from './LiveNotifications';
import { useSupabaseTracking } from '../hooks/useSupabaseTracking';
import { useFunnelTracking } from '../hooks/useFunnelTracking';

// Rozszerzenie obiektu window o fbq
declare global {
  interface Window {
    fbq: (action: string, event: string, params?: any) => void;
  }
}

interface SmsVerificationVariantBProps {
  onConversion?: () => void;
}

const SmsVerificationVariantB = ({ onConversion }: SmsVerificationVariantBProps) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const success = searchParams.get('success');
  const name = searchParams.get('name') || '';
  const email = searchParams.get('email') || '';
  const phone = searchParams.get('phone') || '';
  const [smsCode, setSmsCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationError, setVerificationError] = useState('');
  
  // Ref do śledzenia czy już był tracked
  const hasTrackedPageView = useRef(false);

  // Supabase tracking
  const { trackPageView, trackConversion } = useSupabaseTracking();
  const { trackFunnelStep } = useFunnelTracking();

  // Track page view when component mounts - TYLKO RAZ
  useEffect(() => {
    if (!hasTrackedPageView.current) {
      console.log('🎯 SmsVerificationVariantB: Tracking page view for variant B to Supabase');
      trackPageView('sms_verification_test', 'B', 'sms_verification_test');
      trackFunnelStep('sms_verification_view', 'B', 'debt_consolidation_funnel');
      hasTrackedPageView.current = true;
      console.log('📊 Page view tracked for Variant B in Supabase');
    }
  }, [trackPageView, trackFunnelStep]);

  // Countdown hook - 5 minut (300 sekund)
  const {
    formattedTime,
    isExpired,
    reset: resetCountdown
  } = useCountdown({
    initialTime: 300,
    onComplete: () => {
      console.log('⏰ SMS verification countdown expired - 5 minutes elapsed');
    }
  });

  // Kody weryfikacyjne - tylko 3-cyfrowy
  const VERIFICATION_CODES = ['121'];

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
    if (smsCode.length !== 3) {
      setVerificationError('Kod SMS musi mieć 3 cyfry');
      return;
    }

    setIsVerifying(true);
    setVerificationError('');

    try {
      // Symulacja weryfikacji SMS - sprawdzenie kodów
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (VERIFICATION_CODES.includes(smsCode)) {
        
        // A/B Test conversion tracking (używamy hook'a zamiast bezpośredniego trackConversion)
        console.log('🎯 SMS verification success - tracking via A/B Test hook');
        
        if (onConversion && typeof onConversion === 'function') {
          try {
            onConversion();
            console.log('✅ A/B Test: Variant B conversion tracked successfully');
            
            // Track finalną konwersję całego funnelu
            trackConversion('full_funnel_complete', 'B', 'debt_consolidation_funnel');
            trackFunnelStep('sms_verification_completed', 'B', 'debt_consolidation_funnel', {
              phone: decodeURIComponent(phone),
              verificationCode: smsCode
            });
            console.log('🎯 Full funnel conversion tracked for Variant B');
          } catch (conversionError) {
            console.error('❌ Error tracking A/B test conversion:', conversionError);
          }
        }
        
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
          const verifiedClientData = {
            name: name,
            email: email,
            phone: phone,
            sms_code_verified: true,
            verification_code_used: smsCode,
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

        // PRZEKIEROWANIE NA /payment-express z parametrami
        const params = new URLSearchParams({
          name: name,
          email: email,
          phone: phone
        });
        navigate(`/payment-express?${params.toString()}`);
        
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

  console.log('📱 SmsVerificationVariantB component rendered with params:', {
    name,
    email,
    phone,
    success
  });
  console.log('📱 SmsVerificationVariantB onConversion prop:', onConversion);

  return (
    <>
      <LiveNotifications />
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4 relative">
        <div className="max-w-2xl w-full">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border-0 p-6 lg:p-8 xl:p-10 h-full flex flex-col justify-between min-h-[600px] w-full ring-2 ring-red-200">
            
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
                    <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">NR 1</div>
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-black text-red-900">Dariusz Wentrych</h3>
                    <p className="text-base text-red-600 font-bold">#1 Ekspert ds. konsolidacji kredytów w Polsce</p>
                  </div>
                </div>
              </div>
              <h1 className="text-2xl lg:text-3xl font-black text-red-900 mb-4">
                ⚡ POTWIERDŹ TERAZ SWOJĄ KONSULTACJĘ!
              </h1>
              <div className="bg-red-50 border border-red-200 text-red-700 p-2 rounded-lg mb-4">
                <p className="text-sm font-medium mb-1">
                  KOD SMS WYSŁANY NA: 
                </p>
                <p className="text-base font-semibold bg-white text-red-600 px-2 py-1 rounded inline-block">
                  {decodeURIComponent(phone) || 'Twój numer'}
                </p>
              </div>
              <p className="text-red-700 text-base font-semibold">
                ⏰ MASZ TYLKO 5 MINUT NA WPROWADZENIE KODU!
              </p>
            </div>

            {/* Timer z bardziej wyróżniającym się kolorem */}
            <div className="text-center mb-8">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-2xl border-2 border-purple-700 shadow-xl">
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

            {/* Zdjęcia klientów z zaktualizowanym tekstem */}
            <div className="mb-6">
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-4 border border-green-200">
                <div className="flex flex-col items-center justify-center">
                  <div className="flex -space-x-2 mb-3">
                    <img 
                      src="/lovable-uploads/9985157b-e0d2-4841-98fc-efcce96afa49.png" 
                      alt="Zadowolony klient" 
                      className="w-16 h-16 rounded-full border-3 border-white shadow-lg object-cover" 
                    />
                    <img 
                      src="/lovable-uploads/330d84ab-e471-4a60-a2ba-b131b0db582d.png" 
                      alt="Zadowolony klient" 
                      className="w-16 h-16 rounded-full border-3 border-white shadow-lg object-cover" 
                    />
                    <img 
                      src="/lovable-uploads/eb7b2854-6ce9-4318-8cb5-7f866eb59ef8.png" 
                      alt="Zadowolona klientka" 
                      className="w-16 h-16 rounded-full border-3 border-white shadow-lg object-cover" 
                    />
                    <img 
                      src="/lovable-uploads/01dcb25b-999a-4c0d-b7da-525c21306610.png" 
                      alt="Dariusz Wentrych" 
                      className="w-16 h-16 rounded-full border-3 border-white shadow-lg object-cover" 
                    />
                  </div>
                  <p className="text-base text-green-700 font-bold text-center">
                    🎉 Oni wyszli już z długów! Czekamy na Ciebie!
                  </p>
                </div>
              </div>
            </div>

            {/* Formularz SMS z jednolitymi zaokrąglonymi rogami */}
            <div className="flex-1 flex flex-col justify-center space-y-8">
              <div className="text-center">
                <label className="block text-2xl font-black text-red-900 mb-8">
                  🔥 WPISZ 3-CYFROWY KOD SMS
                </label>
                <div className="flex justify-center px-4">
                  <InputOTP 
                    maxLength={3} 
                    value={smsCode} 
                    onChange={setSmsCode}
                    className="text-3xl" 
                    disabled={isExpired}
                  >
                    <InputOTPGroup className="gap-3 sm:gap-6">
                      <InputOTPSlot 
                        index={0} 
                        className="w-14 h-14 sm:w-20 sm:h-20 text-2xl sm:text-3xl font-black border-4 border-red-400 !rounded-xl focus:border-red-600 focus:ring-4 focus:ring-red-200 bg-red-50" 
                      />
                      <InputOTPSlot 
                        index={1} 
                        className="w-14 h-14 sm:w-20 sm:h-20 text-2xl sm:text-3xl font-black border-4 border-red-400 !rounded-xl focus:border-red-600 focus:ring-4 focus:ring-red-200 bg-red-50" 
                      />
                      <InputOTPSlot 
                        index={2} 
                        className="w-14 h-14 sm:w-20 sm:h-20 text-2xl sm:text-3xl font-black border-4 border-red-400 !rounded-xl focus:border-red-600 focus:ring-4 focus:ring-red-200 bg-red-50" 
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
                  disabled={smsCode.length !== 3 || isVerifying || isExpired}
                  className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold py-5 px-10 text-xl rounded-2xl shadow-2xl hover:shadow-3xl transform transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed border-4 border-red-700 w-full sm:w-auto"
                >
                  {isVerifying ? "⏳ WERYFIKUJĘ..." : "🚀 POTWIERDŹ KONSULTACJĘ"}
                </button>
                
                <div className="mt-6">
                  <p className="text-base text-gray-600 font-medium mb-3">
                    Nie otrzymałeś SMS? 
                  </p>
                  <p className="text-gray-600 text-base font-medium cursor-pointer hover:text-gray-800 transition-colors" onClick={handleResendSms}>
                    📱 Wyślij ponownie
                  </p>
                </div>
              </div>
            </div>

            {/* Zwykły tekst motywacyjny */}
            <div className="text-center mt-4">
              <p className="text-green-700 text-base font-medium">
                ✅ Twoja konsultacja zostanie potwierdzona w ciągu kilku sekund
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SmsVerificationVariantB;
