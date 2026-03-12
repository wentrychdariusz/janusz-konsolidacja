import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const VERIFICATION_CODE = '121';
const verificationWebhookUrl = "https://hook.eu2.make.com/py94cyfbhaa514btm2klljd3m3q2tpye";

const SmsVerificationNowy = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const name = searchParams.get('name') || '';
  const email = searchParams.get('email') || '';
  const phone = searchParams.get('phone') || '';

  const [smsCode, setSmsCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleVerify = async () => {
    if (smsCode.length !== 3) return;
    setIsVerifying(true);
    setError('');

    if (smsCode !== VERIFICATION_CODE) {
      setError('Nieprawidłowy kod. Spróbuj ponownie.');
      setIsVerifying(false);
      return;
    }

    // Wyślij do webhook
    try {
      await fetch(verificationWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: decodeURIComponent(phone),
          name: decodeURIComponent(name),
          email: decodeURIComponent(email),
          sms_verified: true,
          sms_verified_at: new Date().toISOString(),
          verification_status: 'VERIFIED',
        }),
      });
    } catch (err) {
      console.error('Webhook error:', err);
    }

    setSuccess(true);
    setTimeout(() => {
      const params = new URLSearchParams({ name, email, phone });
      navigate(`/payment?${params.toString()}`);
    }, 1500);

    setIsVerifying(false);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-warm-neutral-50 via-business-blue-50 to-prestige-gold-50 flex items-center justify-center p-4">
        <div className="text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-navy-900">Zweryfikowano! Przekierowuję...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="font-lato min-h-screen bg-gradient-to-br from-warm-neutral-50 via-business-blue-50 to-prestige-gold-50 flex flex-col p-4">
      <div className="w-full max-w-md mx-auto pt-6 sm:pt-12">
        
        {/* Nagłówek na górze */}
        <div className="text-center mb-6">
          <img
            src="/lovable-uploads/01dcb25b-999a-4c0d-b7da-525c21306610.png"
            alt="Dariusz Wentrych"
            className="w-14 h-14 rounded-full border-2 border-business-blue-200 shadow-lg object-cover mx-auto mb-3"
          />
          <h1 className="text-2xl sm:text-3xl font-bold text-navy-900 mb-2">
            Potwierdź miejsce na konsultację
          </h1>
          <p className="text-warm-neutral-600 text-base">
            Wysłaliśmy SMS z kodem na numer: <strong>{decodeURIComponent(phone) || 'Twój numer'}</strong>
          </p>
        </div>

        {/* Karta z kodem */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8">
          <p className="text-center text-navy-800 font-semibold text-lg mb-5">Wpisz 3-cyfrowy kod z SMS</p>

          <div className="flex justify-center mb-6">
            <InputOTP maxLength={3} value={smsCode} onChange={setSmsCode}>
              <InputOTPGroup className="gap-4">
                {[0, 1, 2].map((i) => (
                  <InputOTPSlot
                    key={i}
                    index={i}
                    className="w-16 h-16 sm:w-20 sm:h-20 text-3xl sm:text-4xl font-bold border-2 border-business-blue-300 rounded-xl focus:border-business-blue-600 focus:ring-2 focus:ring-business-blue-200"
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>

          {error && (
            <p className="text-red-600 text-center font-semibold mb-4">{error}</p>
          )}

          <button
            onClick={handleVerify}
            disabled={smsCode.length !== 3 || isVerifying}
            className="w-full bg-navy-900 hover:bg-navy-800 text-white font-bold py-4 text-xl rounded-xl shadow-lg transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isVerifying ? 'Weryfikuję...' : 'Potwierdź konsultację'}
          </button>

          <p className="text-center text-warm-neutral-500 text-sm mt-4">
            Nie dostałeś kodu? <button onClick={() => setSmsCode('')} className="text-business-blue-600 hover:underline font-medium">Wyślij ponownie</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SmsVerificationNowy;
