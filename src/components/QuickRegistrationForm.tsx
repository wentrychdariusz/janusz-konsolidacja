import React, { useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Plus, CheckCircle, Phone, ArrowLeft, Edit, Rocket } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useABTest } from '../hooks/useABTest';

// Rozszerzenie obiektu window o fbq
declare global {
  interface Window {
    fbq: (action: string, event: string, params?: any) => void;
  }
}

interface QuickRegistrationFormProps {
  calculatorData?: {
    income: string;
    paydayDebt: string;
    bankDebt: string;
  };
}

const QuickRegistrationForm = ({ calculatorData }: QuickRegistrationFormProps) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Hook do testów A/B
  const { trackConversion } = useABTest({
    testName: 'top_header_test',
    splitRatio: 0.5
  });
  
  // Webhook URL bezpośrednio w kodzie
  const webhookUrl = "https://hook.eu2.make.com/yusy3i37uoiv14b2dx1zv6wro898d9q5";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone) return;
    
    console.log('🚀 Final form submission started');
    console.log('📝 Final data:', { formData, calculatorData });
    console.log('🔗 Webhook URL:', webhookUrl);
    
    // Track konwersję dla testu A/B
    trackConversion();
    
    // Facebook Pixel - track form submission start
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'InitiateCheckout', {
        content_name: 'Quick Registration Form',
        content_category: 'Lead Generation',
        value: 1,
        currency: 'PLN'
      });
    }
    
    setIsSubmitting(true);
    
    try {
      const dataToSend = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        timestamp: new Date().toISOString(),
        source: "QuickRegistrationForm",
        calculatorData: calculatorData
      };
      
      console.log('📤 Sending final data to Make.com:', dataToSend);
      
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      console.log('✅ Final data sent to Make.com');
      console.log('📊 Response status:', response.status);
      console.log('📊 Response ok:', response.ok);
      
      // Facebook Pixel - track successful lead
      if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', 'Lead', {
          content_name: 'Quick Registration Form',
          content_category: 'Lead Generation',
          value: 1,
          currency: 'PLN'
        });
      }
      
      // Przekierowanie na nową ścieżkę SMS verification z parametrami
      const params = new URLSearchParams({
        success: 'true',
        name: formData.name,
        email: formData.email,
        phone: formData.phone
      });
      navigate(`/sms-verification?${params.toString()}`);
      
    } catch (error) {
      console.error('❌ Final form submission error:', error);
      
      // Facebook Pixel - track lead even on error
      if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', 'Lead', {
          content_name: 'Quick Registration Form',
          content_category: 'Lead Generation',
          value: 1,
          currency: 'PLN'
        });
      }
      
      // Przekierowanie na nową ścieżkę SMS verification nawet przy błędzie
      const params = new URLSearchParams({
        success: 'true',
        name: formData.name,
        email: formData.email,
        phone: formData.phone
      });
      navigate(`/sms-verification?${params.toString()}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border-0 p-6 lg:p-8 xl:p-10 h-full flex flex-col justify-center min-h-[600px] w-full mb-16">
      {/* Header with strong green background and simplified content */}
      <div className="text-center mb-8">
        <div className="bg-gradient-to-r from-success-600 to-success-500 p-6 rounded-xl mb-6">
          <div className="flex justify-center items-center mb-4">
            <img 
              src="/lovable-uploads/01dcb25b-999a-4c0d-b7da-525c21306610.png"
              alt="Dariusz Wentrych"
              className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-lg object-cover"
            />
          </div>
          <div className="text-white">
            <h3 className="text-xl font-bold mb-2">Wstępna informacja pozytywna!</h3>
            <p className="text-base text-success-100">Możemy Ci pomóc</p>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-navy-900 mb-3">
          Umów bezpłatną konsultację
        </h2>
        <p className="text-warm-neutral-600 text-base leading-relaxed">
          Wypełnij formularz, a nasz ekspert skontaktuje się z Tobą w ciągu 24 godzin
        </p>
      </div>

      {/* Form with centered content and larger buttons */}
      <form onSubmit={handleFinalSubmit} className="space-y-6 flex-1 flex flex-col justify-center">
        <div>
          <label htmlFor="name" className="block text-base font-medium text-navy-800 mb-2">
            Imię i nazwisko <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Wpisz swoje imię i nazwisko"
            required
            className="w-full px-4 py-4 border border-warm-neutral-300 rounded-lg focus:border-navy-600 focus:ring-1 focus:ring-navy-600 h-14 lg:h-16 text-base"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-base font-medium text-navy-800 mb-2">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="twoj@email.com"
            required
            className="w-full px-4 py-4 border border-warm-neutral-300 rounded-lg focus:border-navy-600 focus:ring-1 focus:ring-navy-600 h-14 lg:h-16 text-base"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-base font-medium text-navy-800 mb-2">
            Telefon <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="+48 123 456 789"
            required
            className="w-full px-4 py-4 border border-warm-neutral-300 rounded-lg focus:border-navy-600 focus:ring-1 focus:ring-navy-600 h-14 lg:h-16 text-base"
          />
        </div>

        <div className="pt-6">
          <button
            type="submit"
            disabled={!formData.name || !formData.email || !formData.phone || isSubmitting}
            className="w-full bg-gradient-to-r from-navy-900 to-business-blue-600 hover:from-navy-800 hover:to-business-blue-500 text-white font-bold py-4 px-6 lg:py-5 lg:px-8 text-base lg:text-lg rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Rocket className="w-5 h-5" />
            {isSubmitting ? "Wysyłanie..." : "Umów bezpłatną konsultację"}
          </button>

          <p className="text-sm text-gray-500 text-center mt-4">
            Twoje dane są bezpieczne. Nie wysyłamy spamu.
          </p>
        </div>
      </form>
    </div>
  );
};

export default QuickRegistrationForm;
