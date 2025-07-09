
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Clock, AlertCircle } from 'lucide-react';
import { useCountdown } from '../hooks/useCountdown';
import { useABTest } from '../hooks/useABTest';

// Rozszerzenie obiektu window o fbq
declare global {
  interface Window {
    fbq: (action: string, event: string, params?: any) => void;
  }
}

const SmsVerificationVariantA = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const success = searchParams.get('success');
  const name = searchParams.get('name') || '';
  const email = searchParams.get('email') || '';
  const phone = searchParams.get('phone') || '';
  
  const [smsCode, setSmsCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationError, setVerificationError] = useState('');

  // A/B Test hook dla trackowania konwersji
  const { trackConversion } = useABTest({
    testName: 'sms_verification_test',
    enabled: true
  });

  // Countdown hook - 5 minut (300 sekund)
  const { formattedTime, isExpired, reset: resetCountdown } = useCountdown({
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
      
      // Sprawdzenie czy kod jest poprawny (121)
      if (VERIFICATION_CODES.includes(smsCode)) {
        
        // WAŻNE: Trackowanie konwersji A/B testu
        trackConversion();
        console.log('🎯 A/B Test: Variant A conversion tracked for SMS verification');
        
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

  console.log('📱 SmsVerificationVariantA component rendered with params:', { name, email, phone, success });

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-neutral-50 via-business-blue-50 to-prestige-gold-50 flex flex-col justify-start items-center p-4 pt-8">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl">
        <div className="bg-white rounded-2xl shadow-xl border-0 p-6 sm:p-8 lg:p-10">
          
          {/* Header z wizerunkiem Dariusza Wentrycha */}
          <div className="text-center mb-8 sm:mb-10">
            <div className="flex justify-center items-center mb-6 sm:mb-8">
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
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-navy-900 mb-4 sm:mb-6 px-2">
              Potwierdź bezpłatną konsultację
            </h1>
            <p className="text-warm-neutral-600 text-lg sm:text-xl mb-3 sm:mb-4 px-2 font-medium">
              Wysłaliśmy kod SMS na numer: <strong>{decodeURIComponent(phone) || 'Twój numer'}</strong>
            </p>
            <p className="text-warm-neutral-500 text-base sm:text-lg px-2">
              Wpisz 3-cyfrowy kod, aby potwierdzić umówienie bezpłatnej konsultacji
            </p>
          </div>

          {/* Timer */}
          <div className="text-center mb-8 sm:mb-10">
            <div className="inline-flex items-center bg-orange-50 text-orange-700 px-6 sm:px-8 py-3 sm:py-4 rounded-xl border border-orange-200">
              <Clock className="w-6 h-6 mr-3" />
              <span className="font-mono text-2xl sm:text-3xl font-bold">{formattedTime}</span>
            </div>
            <p className="text-base sm:text-lg text-gray-500 mt-4 font-medium">Pozostały czas na wprowadzenie kodu</p>
            
            {isExpired && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-6 mx-2">
                <div className="flex items-center justify-center space-x-2">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                  <span className="text-red-600 text-base sm:text-lg font-medium">
                    Czas na wprowadzenie kodu upłynął. Wyślij kod ponownie.
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Formularz SMS */}
          <div className="space-y-8 sm:space-y-10">
            <div className="text-center px-2">
              <label className="block text-xl sm:text-2xl font-bold text-navy-800 mb-6 sm:mb-8">
                Kod SMS
              </label>
              <div className="flex justify-center mb-6">
                <InputOTP 
                  maxLength={3} 
                  value={smsCode} 
                  onChange={setSmsCode}
                  className="text-2xl sm:text-3xl"
                  disabled={isExpired}
                >
                  <InputOTPGroup className="gap-3 sm:gap-4 md:gap-6">
                    <InputOTPSlot 
                      index={0} 
                      className="w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 text-2xl sm:text-3xl md:text-4xl font-bold border-2 border-business-blue-300 rounded-xl focus:border-business-blue-600 focus:ring-2 focus:ring-business-blue-200"
                    />
                    <InputOTPSlot 
                      index={1} 
                      className="w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 text-2xl sm:text-3xl md:text-4xl font-bold border-2 border-business-blue-300 rounded-xl focus:border-business-blue-600 focus:ring-2 focus:ring-business-blue-200"
                    />
                    <InputOTPSlot 
                      index={2} 
                      className="w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 text-2xl sm:text-3xl md:text-4xl font-bold border-2 border-business-blue-300 rounded-xl focus:border-business-blue-600 focus:ring-2 focus:ring-business-blue-200"
                    />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              
              {verificationError && (
                <div className="mb-6 px-2">
                  <p className="text-red-600 text-lg sm:text-xl font-bold">{verificationError}</p>
                </div>
              )}
            </div>

            <div className="text-center px-2">
              <button
                onClick={handleSmsVerification}
                disabled={smsCode.length !== 3 || isVerifying || isExpired}
                className="bg-gradient-to-r from-navy-900 to-business-blue-600 hover:from-navy-800 hover:to-business-blue-500 text-white font-bold py-4 sm:py-5 px-8 sm:px-12 text-xl sm:text-2xl rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
              >
                {isVerifying ? "Weryfikuję..." : "Potwierdź bezpłatną konsultację"}
              </button>
              
              <div className="mt-6 sm:mt-8">
                <p className="text-lg sm:text-xl text-gray-600 font-medium">
                  Nie otrzymałeś SMS? 
                  <button 
                    className="text-business-blue-600 hover:underline ml-2 font-bold"
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
    </div>
  );
};

export default SmsVerificationVariantA;
