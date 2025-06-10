
import React, { useState } from 'react';

const QuickRegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white shadow-xl border-0 w-full max-w-md mx-auto rounded-lg overflow-hidden">
      {/* Header with Dariusz's photo */}
      <div className="text-center bg-gradient-to-r from-navy-900 to-business-blue-600 text-white p-6">
        <div className="flex justify-center mb-4">
          <img 
            src="/lovable-uploads/01dcb25b-999a-4c0d-b7da-525c21306610.png"
            alt="Dariusz Wentrych"
            className="w-20 h-20 rounded-full overflow-hidden border-4 border-prestige-gold-400 shadow-xl object-cover"
          />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">Dariusz Wentrych</h3>
          <p className="text-sm text-prestige-gold-300">Ekspert Oddłużenia - 20 lat doświadczenia</p>
        </div>
        <div className="mt-4">
          <h2 className="text-lg font-bold">Bezpłatna konsultacja oddłużeniowa</h2>
          <p className="text-sm text-prestige-gold-300 mt-2 font-medium">
            Sprawdź jak uwolnić się od długów w 100% legalnie
          </p>
        </div>
      </div>

      {/* Info section */}
      <div className="text-center bg-gray-50 p-3">
        <p className="text-sm text-gray-700 font-medium">
          📞 Zadzwonię do Ciebie w ciągu 24h i przedstawię konkretny plan działania
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-navy-800 mb-1">
            Imię <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Wpisz swoje imię"
            required
            className="w-full px-3 py-2 mt-1 border border-warm-neutral-300 rounded-lg focus:border-navy-600 focus:ring-1 focus:ring-navy-600 h-10 text-sm"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-navy-800 mb-1">
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
            className="w-full px-3 py-2 mt-1 border border-warm-neutral-300 rounded-lg focus:border-navy-600 focus:ring-1 focus:ring-navy-600 h-10 text-sm"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-navy-800 mb-1">
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
            className="w-full px-3 py-2 mt-1 border border-warm-neutral-300 rounded-lg focus:border-navy-600 focus:ring-1 focus:ring-navy-600 h-10 text-sm"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-navy-900 to-navy-700 hover:from-navy-800 hover:to-navy-600 text-white font-bold text-lg rounded-lg shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 h-14 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Wysyłanie..." : "📞 Umów bezpłatną konsultację"}
        </button>

        <p className="text-xs text-gray-500 text-center mt-3">
          Twoje dane są bezpieczne. Nie wysyłamy spamu.
        </p>
      </form>
    </div>
  );
};

export default QuickRegistrationForm;
