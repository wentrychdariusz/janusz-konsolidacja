
import React, { useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Plus, CheckCircle, Phone, ArrowLeft, Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Edytowalne dane z kalkulatora
  const [editableCalculatorData, setEditableCalculatorData] = useState({
    income: calculatorData?.income || "",
    paydayDebt: calculatorData?.paydayDebt || "",
    bankDebt: calculatorData?.bankDebt || "0"
  });
  
  // Webhook URL bezpośrednio w kodzie
  const webhookUrl = "https://hook.eu2.make.com/7necdpy3hfmdqd2ybn4gmqwcjb8r8nve";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCalculatorDataChange = (field: string, value: string) => {
    setEditableCalculatorData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleContactFormSubmit = async () => {
    if (!formData.name || !formData.email || !formData.phone) return;
    
    console.log('🚀 Contact form submission started');
    console.log('📝 Contact data:', formData);
    console.log('🔗 Webhook URL:', webhookUrl);
    
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
        calculatorData: editableCalculatorData
      };
      
      console.log('📤 Sending contact data to Make.com:', dataToSend);
      
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      console.log('✅ Contact data sent to Make.com');
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
      
      // Przejdź do kroku 3 (potwierdzenie danych finansowych)
      setCurrentStep(3);
      
    } catch (error) {
      console.error('❌ Contact form submission error:', error);
      // Przejdź do kroku 3 nawet przy błędzie (webhook może działać mimo CORS)
      
      // Facebook Pixel - track lead even on error
      if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', 'Lead', {
          content_name: 'Quick Registration Form',
          content_category: 'Lead Generation',
          value: 1,
          currency: 'PLN'
        });
      }
      
      setCurrentStep(3);
    } finally {
      setIsSubmitting(false);
    }
  };

  const goBackToForm = () => {
    setCurrentStep(1);
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('🚀 Final form submission started');
    console.log('📝 Final data:', { formData, editableCalculatorData });
    
    // Przekierowanie na stronę podziękowania z parametrami
    const params = new URLSearchParams({
      success: 'true',
      name: formData.name,
      email: formData.email,
      phone: formData.phone
    });
    navigate(`/formularz?${params.toString()}`);
  };

  // Krok 1: Formularz danych kontaktowych
  if (currentStep === 1) {
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
            Krok 1 z 3: Podaj swoje dane
          </h2>
          <p className="text-warm-neutral-600 text-base leading-relaxed">
            Wypełnij formularz, a następnie sprawdź i potwierdź swoje dane
          </p>
        </div>

        {/* Form with centered content and larger buttons */}
        <div className="space-y-6 flex-1 flex flex-col justify-center">
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
              type="button"
              onClick={handleContactFormSubmit}
              disabled={!formData.name || !formData.email || !formData.phone || isSubmitting}
              className="w-full bg-gradient-to-r from-navy-900 to-business-blue-600 hover:from-navy-800 hover:to-business-blue-500 text-white font-bold py-4 px-6 lg:py-5 lg:px-8 text-base lg:text-lg rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Wysyłanie..." : "Wyślij dane i przejdź dalej ➡️"}
            </button>

            <p className="text-sm text-gray-500 text-center mt-4">
              Twoje dane są bezpieczne. Nie wysyłamy spamu.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Krok 3: Potwierdzenie danych finansowych
  return (
    <div className="bg-white rounded-2xl shadow-xl border-0 p-6 lg:p-8 xl:p-10 h-full flex flex-col justify-center min-h-[600px] w-full mb-16">
      {/* Header */}
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
            <h3 className="text-xl font-bold mb-2">Sprawdź dane finansowe</h3>
            <p className="text-base text-success-100">Krok 3 z 3</p>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-navy-900 mb-3">
          Potwierdź swoje dane finansowe
        </h2>
        <p className="text-warm-neutral-600 text-base leading-relaxed">
          Sprawdź, czy dane z kalkulatora są poprawne
        </p>
      </div>

      {/* Podsumowanie danych */}
      <div className="space-y-6 flex-1 flex flex-col justify-center">
        {/* Dane z kalkulatora jeśli są dostępne */}
        {(calculatorData || editableCalculatorData.income) && (
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-navy-800 mb-4">Twoja sytuacja finansowa:</h3>
            <div className="space-y-4">
              {/* Dochód */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-medium text-sm">Czy to są Twoje zarobki na rękę za pracę?</span>
                    <p className="text-xs text-gray-600">Podaj kwotę netto, którą otrzymujesz miesięcznie</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={editableCalculatorData.income}
                      onChange={(e) => handleCalculatorDataChange('income', e.target.value)}
                      className="w-24 px-2 py-1 text-sm border border-gray-300 rounded text-right"
                    />
                    <span className="text-sm font-medium">PLN</span>
                  </div>
                </div>
              </div>

              {/* Chwilówki */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-medium text-sm">Czy to jest poprawna suma Twoich chwilówek?</span>
                    <p className="text-xs text-gray-600">Łączna kwota zadłużenia w parabankach i chwilówkach</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={editableCalculatorData.paydayDebt}
                      onChange={(e) => handleCalculatorDataChange('paydayDebt', e.target.value)}
                      className="w-24 px-2 py-1 text-sm border border-gray-300 rounded text-right"
                    />
                    <span className="text-sm font-medium">PLN</span>
                  </div>
                </div>
              </div>

              {/* Kredyty bankowe */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-medium text-sm">Czy to jest poprawna suma kredytów bankowych?</span>
                    <p className="text-xs text-gray-600">Łączna kwota zadłużenia w bankach (kredyty, karty, limity)</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={editableCalculatorData.bankDebt}
                      onChange={(e) => handleCalculatorDataChange('bankDebt', e.target.value)}
                      className="w-24 px-2 py-1 text-sm border border-gray-300 rounded text-right"
                    />
                    <span className="text-sm font-medium">PLN</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Podsumowanie danych kontaktowych */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="font-semibold text-navy-800 mb-3">Twoje dane kontaktowe zostały wysłane:</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Imię i nazwisko:</span>
              <span className="font-medium">{formData.name}</span>
            </div>
            <div className="flex justify-between">
              <span>Email:</span>
              <span className="font-medium">{formData.email}</span>
            </div>
            <div className="flex justify-between">
              <span>Telefon:</span>
              <span className="font-medium">{formData.phone}</span>
            </div>
          </div>
        </div>

        {/* Przyciski */}
        <div className="pt-6 space-y-3">
          <form onSubmit={handleFinalSubmit}>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-success-600 to-success-500 hover:from-success-700 hover:to-success-600 text-white font-bold py-4 px-6 lg:py-5 lg:px-8 text-base lg:text-lg rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105"
            >
              ✅ Zakończ i przejdź do podziękowania
            </button>
          </form>

          <button
            type="button"
            onClick={goBackToForm}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 text-base rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Wróć do edycji danych kontaktowych
          </button>

          <p className="text-sm text-gray-500 text-center mt-4">
            Dane kontaktowe zostały już wysłane. Ten krok służy tylko do sprawdzenia danych finansowych.
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuickRegistrationForm;
