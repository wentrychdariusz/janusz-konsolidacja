import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Plus, CheckCircle, Phone, ArrowLeft, MessageSquare, Clock, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { useABTest } from '../hooks/useABTest';
import { useCountdown } from '../hooks/useCountdown';

// Rozszerzenie obiektu window o fbq
declare global {
  interface Window {
    fbq: (action: string, event: string, params?: any) => void;
  }
}

const ABTestThankYou = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get('success');
  const name = searchParams.get('name') || '';
  const email = searchParams.get('email') || '';
  const phone = searchParams.get('phone') || '';
  
  const [smsCode, setSmsCode] = useState('');
  const [smsVerified, setSmsVerified] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationError, setVerificationError] = useState('');

  // A/B Test hook
  const { variant, isVariantA, trackConversion } = useABTest({
    testName: 'thank_you_page_test',
    splitRatio: 0.5
  });

  // Countdown hook - 5 minut (300 sekund)
  const { formattedTime, isExpired, reset: resetCountdown } = useCountdown({
    initialTime: 300,
    onComplete: () => {
      console.log('⏰ Countdown expired - 5 minutes elapsed');
    }
  });

  // Sprawdź przy załadowaniu czy upłynęło 5 minut od weryfikacji SMS
  useEffect(() => {
    const checkAndSendWebhook = async () => {
      const smsVerifiedTimestamp = localStorage.getItem('sms_verified_timestamp');
      const webhookSent = localStorage.getItem('webhook_sent');
      
      if (!smsVerifiedTimestamp || webhookSent === 'true') {
        return; // Nie ma weryfikacji lub webhook już wysłany
      }
      
      const verifiedAt = new Date(smsVerifiedTimestamp).getTime();
      const now = Date.now();
      const fiveMinutes = 5 * 60 * 1000; // 5 minut w milisekundach
      
      if (now - verifiedAt >= fiveMinutes) {
        // Minęło 5 minut - wyślij webhook natychmiast
        console.log('⏰ 5 minutes have passed since SMS verification - sending webhook now!');
        
        try {
          const savedUserData = JSON.parse(localStorage.getItem('user_data') || '{}');
          const paymentStatus = localStorage.getItem('payment_status') || 'Nieopłacone';
          const paymentData = JSON.parse(localStorage.getItem('payment_data') || '{}');
          
          console.log('📦 User data:', savedUserData);
          console.log('💳 Payment status:', paymentStatus);
          console.log('💰 Payment data:', paymentData);
          
          const webhookUrl = 'https://hook.eu2.make.com/mqcldwrvdmcd4ntk338yqipsi1p5ijv3';
          
          const webhookPayload = {
            event: 'sms_verified_with_payment_status',
            payment_status: paymentStatus,
            name: savedUserData.name,
            email: savedUserData.email,
            phone: savedUserData.phone,
            session_id: savedUserData.session_id,
            sms_verified_at: savedUserData.sms_verified_at,
            ...(paymentStatus === 'Opłacone' && paymentData),
            timestamp: new Date().toISOString()
          };
          
          console.log('📤 Sending webhook payload:', webhookPayload);
          
          await fetch(webhookUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(webhookPayload)
          });
          
          console.log('✅ Make.com webhook: Data sent successfully!');
          
          // Oznacz webhook jako wysłany
          localStorage.setItem('webhook_sent', 'true');
          
          // Wyczyść dane
          localStorage.removeItem('user_data');
          localStorage.removeItem('payment_status');
          localStorage.removeItem('payment_data');
          localStorage.removeItem('sms_verified_timestamp');
          console.log('🧹 LocalStorage cleaned');
        } catch (error) {
          console.error('❌ Make.com webhook error:', error);
        }
      } else {
        // Nie minęło jeszcze 5 minut - ustaw timer na pozostały czas
        const remainingTime = fiveMinutes - (now - verifiedAt);
        console.log(`⏳ ${Math.round(remainingTime / 1000)} seconds remaining until webhook`);
        
        setTimeout(async () => {
          checkAndSendWebhook();
        }, remainingTime);
      }
    };
    
    checkAndSendWebhook();
  }, []);

  // Facebook Pixel - track thank you page view
  useEffect(() => {
    if (success === 'true' && typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'CompleteRegistration', {
        content_name: 'Thank You Page',
        content_category: 'Lead Generation',
        value: 1,
        currency: 'PLN'
      });
    }
  }, [success]);

  // Jeśli nie ma parametru success=true, przekieruj na stronę główną
  if (success !== 'true') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-warm-neutral-50 via-business-blue-50 to-prestige-gold-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl border-0 p-8 text-center max-w-md">
          <h2 className="text-2xl font-bold text-navy-900 mb-4">Strona niedostępna</h2>
          <p className="text-warm-neutral-600 mb-6">
            Ta strona jest dostępna tylko po wypełnieniu formularza.
          </p>
          <Link 
            to="/" 
            className="inline-flex items-center bg-gradient-to-r from-navy-900 to-business-blue-600 hover:from-navy-800 hover:to-business-blue-500 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Wróć na stronę główną
          </Link>
        </div>
      </div>
    );
  }

  const handleSmsVerification = async () => {
    if (smsCode.length !== 4) {
      setVerificationError('Kod SMS musi mieć 4 cyfry');
      return;
    }

    setIsVerifying(true);
    setVerificationError('');

    try {
      // Symulacja weryfikacji SMS - tutaj można dodać prawdziwą weryfikację
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSmsVerified(true);
      trackConversion(); // Track conversion for A/B test
      
      // Facebook Pixel - track SMS verification
      if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', 'Purchase', {
          content_name: 'SMS Verification Complete',
          content_category: 'Consultation Confirmed',
          value: 1,
          currency: 'PLN'
        });
      }
      
      // Zapisz dane do localStorage i timestamp weryfikacji
      const sessionId = localStorage.getItem('session_id') || `session_${Date.now()}`;
      const verifiedTimestamp = new Date().toISOString();
      
      const userData = {
        name: decodeURIComponent(name),
        email: decodeURIComponent(email),
        phone: decodeURIComponent(phone),
        session_id: sessionId,
        sms_verified_at: verifiedTimestamp
      };
      
      localStorage.setItem('user_data', JSON.stringify(userData));
      localStorage.setItem('sms_verified_timestamp', verifiedTimestamp);
      localStorage.removeItem('webhook_sent'); // Reset flagi na wypadek ponownej weryfikacji
      
      console.log('📝 User data saved to localStorage:', userData);
      console.log('🕐 SMS verified at:', verifiedTimestamp);
      console.log('⏰ Webhook will be sent after 5 minutes (or when user returns)');
      
    } catch (error) {
      setVerificationError('Wystąpił błąd podczas weryfikacji. Spróbuj ponownie.');
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

  // Wariant A - Oryginalny design
  if (isVariantA) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-warm-neutral-50 via-business-blue-50 to-prestige-gold-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <div className="bg-white rounded-2xl shadow-xl border-0 p-6 lg:p-8 xl:p-10 h-full flex flex-col justify-between min-h-[600px] w-full">
            
            {!smsVerified ? (
              <>
                {/* Header z informacją o SMS */}
                <div className="text-center mb-8">
                  <div className="flex justify-center items-center mb-6">
                    <MessageSquare className="w-16 h-16 text-business-blue-600" />
                  </div>
                  <h1 className="text-xl lg:text-2xl font-bold text-navy-900 mb-3">
                    Potwierdź swoją konsultację
                  </h1>
                  <p className="text-warm-neutral-600 text-sm lg:text-base mb-2">
                    Wysłaliśmy kod SMS na numer: <strong>{decodeURIComponent(phone)}</strong>
                  </p>
                  
                  {/* Countdown Timer */}
                  <div className="flex items-center justify-center space-x-2 mb-4">
                    <Clock className="w-4 h-4 text-business-blue-600" />
                    <span className="text-business-blue-600 font-medium">
                      Czas na wprowadzenie kodu: {formattedTime}
                    </span>
                  </div>
                  
                  {isExpired && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                      <div className="flex items-center justify-center space-x-2">
                        <AlertCircle className="w-4 h-4 text-red-600" />
                        <span className="text-red-600 text-sm">
                          Czas na wprowadzenie kodu upłynął. Wyślij kod ponownie.
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex-1 flex flex-col justify-center space-y-6">
                  <div className="text-center">
                    <label className="block text-base font-medium text-navy-800 mb-4">
                      Kod SMS
                    </label>
                    <div className="flex justify-center">
                      <InputOTP 
                        maxLength={4} 
                        value={smsCode} 
                        onChange={setSmsCode}
                        disabled={isExpired}
                      >
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                        </InputOTPGroup>
                      </InputOTP>
                    </div>
                    
                    {verificationError && (
                      <p className="text-red-600 text-sm mt-2">{verificationError}</p>
                    )}
                  </div>

                  <div className="text-center">
                    <button
                      onClick={handleSmsVerification}
                      disabled={smsCode.length !== 4 || isVerifying || isExpired}
                      className="bg-gradient-to-r from-navy-900 to-business-blue-600 hover:from-navy-800 hover:to-business-blue-500 text-white font-bold py-4 px-8 text-base lg:text-lg rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isVerifying ? "Weryfikuję..." : "Potwierdź konsultację"}
                    </button>
                    
                    <p className="text-sm text-gray-500 mt-4">
                      Nie otrzymałeś SMS? 
                      <button 
                        onClick={handleResendSms}
                        className="text-business-blue-600 hover:underline ml-1"
                      >
                        Wyślij ponownie
                      </button>
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <>
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

                <div className="text-center bg-gradient-to-r from-success-600 to-success-500 text-white p-6 rounded-xl mb-8">
                  <div className="flex justify-center items-center mb-4">
                    <div className="flex items-center space-x-2">
                      <img 
                        src="/lovable-uploads/01dcb25b-999a-4c0d-b7da-525c21306610.png"
                        alt="Dariusz Wentrych"
                        className="w-16 h-16 rounded-full overflow-hidden border-3 border-white shadow-xl object-cover"
                      />
                      
                      <Plus className="w-3 h-3 text-white" />
                      
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
  }

  // Wariant B - Nowy design z bardziej wyrazistymi kolorami
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-3xl shadow-2xl border-0 p-6 lg:p-8 xl:p-10 h-full flex flex-col justify-between min-h-[600px] w-full ring-1 ring-red-100">
          
          {!smsVerified ? (
            <>
              <div className="text-center mb-8">
                <div className="flex justify-center items-center mb-6">
                  <div className="bg-gradient-to-r from-red-500 to-orange-500 p-4 rounded-full">
                    <MessageSquare className="w-12 h-12 text-white" />
                  </div>
                </div>
                <h1 className="text-2xl lg:text-3xl font-black text-red-900 mb-3">
                  ⚡ POTWIERDŹ TERAZ!
                </h1>
                <p className="text-red-700 text-base lg:text-lg mb-2 font-semibold">
                  KOD SMS: <span className="bg-red-100 px-2 py-1 rounded font-bold">{decodeURIComponent(phone)}</span>
                </p>
                
                <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-xl p-4 mb-4">
                  <div className="flex items-center justify-center space-x-2">
                    <Clock className="w-5 h-5 text-white animate-pulse" />
                    <span className="text-white font-bold text-lg">
                      ZOSTAŁO: {formattedTime}
                    </span>
                  </div>
                </div>
                
                {isExpired && (
                  <div className="bg-red-100 border-2 border-red-500 rounded-xl p-4 mb-4">
                    <div className="flex items-center justify-center space-x-2">
                      <AlertCircle className="w-5 h-5 text-red-600" />
                      <span className="text-red-800 font-bold">
                        ⏰ CZAS UPŁYNĄŁ! WYŚLIJ KOD PONOWNIE!
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex-1 flex flex-col justify-center space-y-8">
                <div className="text-center">
                  <label className="block text-xl font-black text-red-900 mb-6">
                    WPISZ 4-CYFROWY KOD
                  </label>
                  <div className="flex justify-center">
                    <InputOTP 
                      maxLength={4} 
                      value={smsCode} 
                      onChange={setSmsCode}
                      disabled={isExpired}
                    >
                      <InputOTPGroup className="gap-4">
                        <InputOTPSlot index={0} className="w-16 h-16 text-2xl font-bold border-2 border-red-300 focus:border-red-500" />
                        <InputOTPSlot index={1} className="w-16 h-16 text-2xl font-bold border-2 border-red-300 focus:border-red-500" />
                        <InputOTPSlot index={2} className="w-16 h-16 text-2xl font-bold border-2 border-red-300 focus:border-red-500" />
                        <InputOTPSlot index={3} className="w-16 h-16 text-2xl font-bold border-2 border-red-300 focus:border-red-500" />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                  
                  {verificationError && (
                    <p className="text-red-700 font-bold text-base mt-4 bg-red-50 p-3 rounded-lg">{verificationError}</p>
                  )}
                </div>

                <div className="text-center">
                  <button
                    onClick={handleSmsVerification}
                    disabled={smsCode.length !== 4 || isVerifying || isExpired}
                    className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-black py-6 px-12 text-xl rounded-2xl shadow-2xl hover:shadow-3xl transform transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed border-2 border-red-700"
                  >
                    {isVerifying ? "⏳ WERYFIKUJĘ..." : "🚀 POTWIERDŹ TERAZ!"}
                  </button>
                  
                  <p className="text-base text-red-600 mt-6 font-semibold">
                    Nie masz SMS? 
                    <button 
                      onClick={handleResendSms}
                      className="text-orange-600 hover:underline ml-2 font-bold bg-orange-100 px-3 py-1 rounded-lg"
                    >
                      📱 WYŚLIJ PONOWNIE
                    </button>
                  </p>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="text-center mb-8">
                <div className="flex justify-center items-center mb-6">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-4 rounded-full">
                    <CheckCircle className="w-12 h-12 text-white" />
                  </div>
                </div>
                <h1 className="text-2xl lg:text-3xl font-black text-green-900 mb-3">
                  🎉 SUKCES! KONSULTACJA POTWIERDZONA!
                </h1>
                <p className="text-green-700 text-base lg:text-lg font-semibold">
                  Twoja konsultacja została zarezerwowana!
                </p>
              </div>

              <div className="text-center bg-gradient-to-r from-green-600 to-emerald-500 text-white p-8 rounded-2xl mb-8 border-2 border-green-700">
                <div className="flex justify-center items-center mb-4">
                  <div className="flex items-center space-x-3">
                    <img 
                      src="/lovable-uploads/01dcb25b-999a-4c0d-b7da-525c21306610.png"
                      alt="Dariusz Wentrych"
                      className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-2xl object-cover"
                    />
                    
                    <Plus className="w-4 h-4 text-white" />
                    
                    <div className="flex items-center space-x-2">
                      <Avatar className="w-12 h-12 border-3 border-white">
                        <AvatarImage 
                          src="/lovable-uploads/763d172c-71d2-4164-a6e6-97c3127b6592.png"
                          alt="Członek zespołu"
                          className="object-cover"
                        />
                        <AvatarFallback className="text-sm">KZ</AvatarFallback>
                      </Avatar>
                      <Avatar className="w-12 h-12 border-3 border-white">
                        <AvatarImage 
                          src="/lovable-uploads/cbddfa95-6c86-4139-b791-f13477aaea8a.png"
                          alt="Członek zespołu"
                          className="object-cover"
                        />
                        <AvatarFallback className="text-sm">MK</AvatarFallback>
                      </Avatar>
                      <Avatar className="w-12 h-12 border-3 border-white">
                        <AvatarImage 
                          src="/lovable-uploads/73083e2d-4631-4f25-abd0-a482d29bb838.png"
                          alt="Członek zespołu"
                          className="object-cover"
                        />
                        <AvatarFallback className="text-sm">AS</AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-black text-white">🏆 ZESPÓŁ EKSPERTÓW</h2>
                  <p className="text-base text-green-100 font-semibold">KONSULTACJA POTWIERDZONA ✅</p>
                </div>
              </div>

              <div className="text-center flex-1 flex flex-col justify-center">
                <Phone className="w-16 h-16 text-red-600 mx-auto mb-6" />
                <h3 className="text-xl lg:text-2xl font-black text-red-900 mb-4">
                  📞 ODDZWONIMY W UZGODNIONYM TERMINIE
                </h3>
                <p className="text-base lg:text-lg text-red-700 mb-8 font-semibold">
                  Skontaktujemy się z Tobą, aby przeprowadzić bezpłatną konsultację!
                </p>
                
                {name && email && phone && (
                  <div className="bg-orange-50 rounded-xl p-6 border-2 border-orange-200 mb-8">
                    <p className="text-sm lg:text-base text-orange-800 font-semibold">
                      <strong className="text-orange-900">📋 TWOJE DANE:</strong><br />
                      👤 Imię: {decodeURIComponent(name)}<br />
                      📧 Email: {decodeURIComponent(email)}<br />
                      📱 Telefon: {decodeURIComponent(phone)}
                    </p>
                  </div>
                )}
                
                <Link 
                  to="/" 
                  className="inline-flex items-center bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-black py-4 px-8 rounded-xl transition-all duration-300 mx-auto border-2 border-red-700 hover:scale-105"
                >
                  <ArrowLeft className="w-5 h-5 mr-3" />
                  🏠 WRÓĆ NA STRONĘ GŁÓWNĄ
                </Link>
              </div>

              <div className="text-center mt-8">
                <p className="text-sm text-red-600 font-semibold bg-red-50 p-3 rounded-lg">
                  🔒 Twoje dane są bezpieczne i nie będą udostępniane osobom trzecim.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ABTestThankYou;
