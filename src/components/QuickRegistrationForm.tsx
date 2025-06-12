import React, { useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Plus, CheckCircle, Phone } from 'lucide-react';

const QuickRegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Form submitted:', formData);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Thank you page after submission
  if (isSubmitted) {
    return (
      <div className="bg-white rounded-2xl shadow-xl border-0 p-6 lg:p-8 xl:p-10 h-full flex flex-col justify-between min-h-[600px] w-full mb-16">
        {/* Success header */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center mb-6">
            <CheckCircle className="w-16 h-16 text-success-600" />
          </div>
          <h2 className="text-xl lg:text-2xl font-bold text-success-600 mb-3">Dziękujemy za rejestrację!</h2>
          <p className="text-warm-neutral-600 text-sm lg:text-base">Twoje zgłoszenie zostało pomyślnie wysłane</p>
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
            <h3 className="text-lg font-bold text-white">Zespół Ekspertów</h3>
            <p className="text-sm text-success-100">Wstępna analiza jest pozytywna</p>
          </div>
        </div>

        {/* Call back message */}
        <div className="text-center flex-1 flex flex-col justify-center">
          <Phone className="w-12 h-12 text-navy-900 mx-auto mb-4" />
          <h3 className="text-lg lg:text-xl font-bold text-navy-900 mb-3">
            Oddzwonimy najszybciej jak to możliwe
          </h3>
          <p className="text-sm lg:text-base text-navy-700 mb-6">
            Skontaktujemy się z Tobą, aby przeanalizować Twoją sytuację i zaproponować najlepsze rozwiązanie.
          </p>
          <div className="bg-warm-neutral-50 rounded-lg p-4 border border-warm-neutral-200">
            <p className="text-xs lg:text-sm text-warm-neutral-600">
              <strong>Twoje dane:</strong><br />
              Imię: {formData.name}<br />
              Email: {formData.email}<br />
              Telefon: {formData.phone}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-xs text-warm-neutral-500">
            Dziękujemy za zaufanie. Twoje dane są bezpieczne i nie będą udostępniane osobom trzecim.
          </p>
        </div>
      </div>
    );
  }

  // Original form with improved spacing and height matching
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
          Wypełnij formularz
        </h2>
        <p className="text-warm-neutral-600 text-base leading-relaxed">
          Skontaktujemy się z Tobą, aby przeanalizować Twoją sytuację
        </p>
      </div>

      {/* Form with centered content */}
      <form onSubmit={handleSubmit} className="space-y-6 flex-1 flex flex-col justify-center">
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
            className="w-full px-4 py-3 border border-warm-neutral-300 rounded-lg focus:border-navy-600 focus:ring-1 focus:ring-navy-600 h-12 text-base"
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
            className="w-full px-4 py-3 border border-warm-neutral-300 rounded-lg focus:border-navy-600 focus:ring-1 focus:ring-navy-600 h-12 text-base"
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
            className="w-full px-4 py-3 border border-warm-neutral-300 rounded-lg focus:border-navy-600 focus:ring-1 focus:ring-navy-600 h-12 text-base"
          />
        </div>

        <div className="pt-6 pb-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-navy-900 to-business-blue-600 hover:from-navy-800 hover:to-business-blue-500 text-white font-bold py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Wysyłanie..." : "Wyślij formularz"}
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
