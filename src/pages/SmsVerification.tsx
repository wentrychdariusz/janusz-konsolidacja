import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Plus, CheckCircle, Phone, ArrowLeft, MessageSquare, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

// Rozszerzenie obiektu window o fbq
declare global {
  interface Window {
    fbq: (action: string, event: string, params?: any) => void;
  }
}

const SmsVerification = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get('success');
  const name = searchParams.get('name') || '';
  const email = searchParams.get('email') || '';
  const phone = searchParams.get('phone') || '';
  
  const [smsCode, setSmsCode] = useState('');
  const [smsVerified, setSmsVerified] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationError, setVerificationError] = useState('');
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes in seconds
  
  // Sztywny kod weryfikacyjny
  const VERIFICATION_CODE = '1212';
  
  // Webhook URL do potwierdzenia SMS
  const verificationWebhookUrl = "https://hook.eu2.make.com/py94cyfbhaa514btm2klljd3m3q2tpye";

  // Countdown timer
  useEffect(() => {
    if (timeLeft > 0 && !smsVerified) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, smsVerified]);

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Facebook Pixel - track thank you page view
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
        setSmsVerified(true);
        
        // Wywołanie webhook do aktualizacji Google Sheets z informacją o weryfikacji
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
          // Nie przerywamy procesu nawet jeśli aktualizacja nie powiodła się
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
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-neutral-50 via-business-blue-50 to-prestige-gold-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-xl border-0 p-6 lg:p-8 xl:p-10 h-full flex flex-col justify-between min-h-[600px] w-full">
          
          {!smsVerified ? (
            // Krok weryfikacji SMS
            <>
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
                  <span className="font-mono text-lg font-bold">{formatTime(timeLeft)}</span>
                </div>
                <p className="text-sm text-gray-500 mt-2">Pozostały czas na wprowadzenie kodu</p>
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
                  
                  {timeLeft === 0 && (
                    <p className="text-red-600 text-base mt-4 font-medium">Czas na wprowadzenie kodu upłynął. Wyślij kod ponownie.</p>
                  )}
                </div>

                <div className="text-center">
                  <button
                    onClick={handleSmsVerification}
                    disabled={smsCode.length !== 4 || isVerifying || timeLeft === 0}
                    className="bg-gradient-to-r from-navy-900 to-business-blue-600 hover:from-navy-800 hover:to-business-blue-500 text-white font-bold py-4 px-8 text-lg rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isVerifying ? "Weryfikuję..." : "Potwierdź bezpłatną konsultację"}
                  </button>
                  
                  <p className="text-base text-gray-600 mt-6">
                    Nie otrzymałeś SMS? 
                    <button 
                      className="text-business-blue-600 hover:underline ml-1 font-medium"
                      onClick={() => setTimeLeft(180)}
                    >
                      Wyślij ponownie
                    </button>
                  </p>
                </div>
              </div>
            </>
          ) : (
            // Finalna strona podziękowań po weryfikacji SMS
            <>
              {/* Success header */}
              <div className="text-center mb-8">
                <div className="flex justify-center items-center mb-6">
                  <CheckCircle className="w-16 h-16 text-success-600" />
                </div>
                <h1 className="text-xl lg:text-2xl font-bold text-success-600 mb-3">
                  Konsultacja potwierdzona!
                </h1>
                <p className="text-warm-neutral-600 text-sm lg:text-base">
                  Dziękujemy za potwierdzenie. Twoja konsultacja została zarezerwowana.
                </p>
              </div>

              {/* Dariusz and team section */}
              <div className="text-center bg-gradient-to-r from-success-600 to-success-500 text-white p-6 rounded-xl mb-8">
                <div className="flex justify-center items-center mb-4">
                  <div className="flex items-center space-x-2">
                    {/* Dariusz main photo */}
                    <img 
                      src="/lovable-uploads/01dcb25b-999a-4c0d-b7da-525c21306610.png"
                      alt="Dariusz Wentrych"
                      className="w-16 h-16 rounded-full overflow-hidden border-3 border-white shadow-xl object-cover"
                    />
                    
                    {/* Plus icon */}
                    <Plus className="w-3 h-3 text-white" />
                    
                    {/* Team members */}
                    <div className="flex items-center space-x-1">
                      <Avatar className="w-10 h-10 border-2 border-white">
                        <AvatarImage 
                          src="/lovable-uploads/763d172c-71d2-4164-a6e6-97c3127b6592.png"
                          alt="Członek zespołu"
                          className="object-cover"
                        />
                        <AvatarFallback className="text-xs">KZ</AvatarFallback>
                      </Avatar>
                      <Avatar className="w-10 h-10 border-2 border-white">
                        <AvatarImage 
                          src="/lovable-uploads/cbddfa95-6c86-4139-b791-f13477aaea8a.png"
                          alt="Członek zespołu"
                          className="object-cover"
                        />
                        <AvatarFallback className="text-xs">MK</AvatarFallback>
                      </Avatar>
                      <Avatar className="w-10 h-10 border-2 border-white">
                        <AvatarImage 
                          src="/lovable-uploads/73083e2d-4631-4f25-abd0-a482d29bb838.png"
                          alt="Członek zespołu"
                          className="object-cover"
                        />
                        <AvatarFallback className="text-xs">AS</AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Zespół Ekspertów</h2>
                  <p className="text-sm text-success-100">Konsultacja potwierdzona</p>
                </div>
              </div>

              {/* Call back message */}
              <div className="text-center flex-1 flex flex-col justify-center">
                <Phone className="w-12 h-12 text-navy-900 mx-auto mb-4" />
                <h3 className="text-lg lg:text-xl font-bold text-navy-900 mb-3">
                  Oddzwonimy w uzgodnionym terminie
                </h3>
                <p className="text-sm lg:text-base text-navy-700 mb-6">
                  Skontaktujemy się z Tobą, aby przeprowadzić bezpłatną konsultację i zaproponować najlepsze rozwiązanie.
                </p>
                
                {name && email && phone && (
                  <div className="bg-warm-neutral-50 rounded-lg p-4 border border-warm-neutral-200 mb-6">
                    <p className="text-xs lg:text-sm text-warm-neutral-600">
                      <strong>Twoje dane:</strong><br />
                      Imię: {decodeURIComponent(name)}<br />
                      Email: {decodeURIComponent(email)}<br />
                      Telefon: {decodeURIComponent(phone)}
                    </p>
                  </div>
                )}
                
                <Link 
                  to="/" 
                  className="inline-flex items-center bg-gradient-to-r from-navy-900 to-business-blue-600 hover:from-navy-800 hover:to-business-blue-500 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 mx-auto"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Wróć na stronę główną
                </Link>
              </div>

              {/* Footer */}
              <div className="text-center mt-6">
                <p className="text-xs text-warm-neutral-500">
                  Dziękujemy za zaufanie. Twoje dane są bezpieczne i nie będą udostępniane osobom trzecim.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SmsVerification;
