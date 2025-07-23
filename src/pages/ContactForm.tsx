import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import ABTestContactForm from '../components/ABTestContactForm';

const ContactForm = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Jeśli są parametry success (czyli user przyszedł z głównej strony), przekieruj do SMS verification
    if (searchParams.get('success') === 'true') {
      const params = new URLSearchParams({
        success: 'true',
        name: searchParams.get('name') || '',
        email: searchParams.get('email') || '',
        phone: searchParams.get('phone') || ''
      });
      navigate(`/sms-verification?${params.toString()}`);
    }
  }, [searchParams, navigate]);
  
  // Jeśli nie ma parametrów success, pokaż formularz kontaktowy
  if (searchParams.get('success') !== 'true') {
    return <ABTestContactForm />;
  }
  
  // Loading state podczas przekierowywania
  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-neutral-50 via-business-blue-50 to-prestige-gold-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-business-blue-600 mx-auto mb-4"></div>
        <p className="text-warm-neutral-600">Przekierowywanie...</p>
      </div>
    </div>
  );
};

export default ContactForm;