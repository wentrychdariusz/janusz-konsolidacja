import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { X, Shield, Users, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PersonalizedOfferModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PersonalizedOfferModal = ({ isOpen, onClose }: PersonalizedOfferModalProps) => {
  const [salary, setSalary] = useState('');
  const [showOffer, setShowOffer] = useState(false);
  const navigate = useNavigate();

  const getPersonalizedOffer = (salaryAmount: number) => {
    if (salaryAmount >= 8000) {
      return {
        title: "Doskonała sytuacja finansowa!",
        message: "Z Twoimi zarobkami możemy zaoszczędzić nawet do 2000 zł miesięcznie na obsłudze długów.",
        highlight: "Nawet 24 000 zł rocznie więcej w kieszeni"
      };
    } else if (salaryAmount >= 5000) {
      return {
        title: "Świetne perspektywy oddłużenia!",
        message: "Przy Twoich dochodach możemy zmniejszyć raty nawet o 40-60%.",
        highlight: "Oszczędności do 1200 zł miesięcznie"
      };
    } else if (salaryAmount >= 3000) {
      return {
        title: "Możemy Ci pomóc!",
        message: "Takim osobom jak Ty pomagamy najczęściej. Zredukujemy Twoje raty o 30-50%.",
        highlight: "To może być nawet 800 zł miesięcznie więcej"
      };
    } else {
      return {
        title: "Sprawdźmy Twoje możliwości",
        message: "Nawet przy niższych dochodach często znajdujemy rozwiązania oddłużeniowe.",
        highlight: "Bezpłatna analiza sytuacji finansowej"
      };
    }
  };

  const handleSalarySubmit = () => {
    const salaryNum = parseInt(salary);
    if (salaryNum && salaryNum > 0) {
      setShowOffer(true);
    }
  };

  const handleGoToCalculator = () => {
    navigate(`/kalkulator-beta?salary=${salary}`);
    onClose();
  };

  const offer = salary ? getPersonalizedOffer(parseInt(salary)) : null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm" />
      <DialogContent className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-md translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] rounded-2xl border-0 shadow-2xl">
        <DialogHeader className="relative pb-2">
          <Button
            variant="ghost"
            size="sm"
            className="absolute -top-2 -right-2 h-8 w-8 rounded-full"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="px-6 pb-6">
          {!showOffer ? (
            <>
              {/* Trust Header */}
              <div className="text-center mb-6">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden border-4 border-prestige-gold-200">
                  <img 
                    src="/lovable-uploads/d8efef9d-ca92-4814-9618-8b5105db9432.png" 
                    alt="Dariusz Woźniak" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-montserrat text-xl font-bold text-navy-900 mb-2">
                  Dariusz Woźniak
                </h3>
                <p className="text-warm-neutral-600 text-sm mb-4">
                  Ekspert oddłużeniowy z 15-letnim doświadczeniem
                </p>
                
                {/* Trust indicators */}
                <div className="flex justify-center items-center gap-4 mb-6">
                  <div className="flex items-center gap-1 text-xs text-warm-neutral-600">
                    <Users className="h-4 w-4 text-prestige-gold-400" />
                    <span>1000+ klientów</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-warm-neutral-600">
                    <Award className="h-4 w-4 text-prestige-gold-400" />
                    <span>Certyfikowany</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-warm-neutral-600">
                    <Shield className="h-4 w-4 text-prestige-gold-400" />
                    <span>100% bezpieczne</span>
                  </div>
                </div>
              </div>

              {/* Salary Input */}
              <div className="space-y-4">
                <div className="text-center">
                  <h4 className="font-montserrat text-xl font-bold text-navy-900 mb-2">
                    💰 Ile możesz zaoszczędzić?
                  </h4>
                  <p className="text-warm-neutral-600 text-sm mb-4">
                    <span className="font-semibold text-prestige-gold-600">TYLKO 30 SEKUND!</span> Wpisz zarobki i zobacz swoją dokładną oszczędność
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="relative">
                    <Input
                      type="number"
                      placeholder="Wpisz swoje zarobki netto"
                      value={salary}
                      onChange={(e) => setSalary(e.target.value)}
                      className="text-center text-lg font-semibold border-2 border-warm-neutral-200 focus:border-prestige-gold-400"
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-warm-neutral-500">
                      zł
                    </span>
                  </div>
                  
                  <Button 
                    onClick={handleSalarySubmit}
                    disabled={!salary || parseInt(salary) <= 0}
                    className="w-full bg-prestige-gold-400 hover:bg-prestige-gold-500 text-navy-900 font-semibold py-3 rounded-xl"
                  >
                    Pokaż moją ofertę
                  </Button>
                </div>

                <p className="text-xs text-warm-neutral-500 text-center">
                  <Shield className="inline h-3 w-3 mr-1" />
                  Twoje dane są w 100% bezpieczne i poufne
                </p>
              </div>
            </>
          ) : (
            <>
              {/* Personalized Offer */}
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full overflow-hidden border-3 border-prestige-gold-200">
                  <img 
                    src="/lovable-uploads/d8efef9d-ca92-4814-9618-8b5105db9432.png" 
                    alt="Dariusz Woźniak" 
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="bg-gradient-to-br from-prestige-gold-50 to-warm-neutral-50 p-4 rounded-xl border border-prestige-gold-200">
                  <h4 className="font-montserrat text-lg font-bold text-navy-900 mb-2">
                    {offer?.title}
                  </h4>
                  <p className="text-warm-neutral-700 text-sm mb-3">
                    {offer?.message}
                  </p>
                  <div className="bg-prestige-gold-100 px-3 py-2 rounded-lg">
                    <p className="font-semibold text-prestige-gold-700 text-sm">
                      🎯 {offer?.highlight}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button 
                    onClick={handleGoToCalculator}
                    className="w-full bg-prestige-gold-400 hover:bg-prestige-gold-500 text-navy-900 font-semibold py-3 rounded-xl"
                  >
                    Sprawdź szczegóły w kalkulatorze
                  </Button>
                  
                  <p className="text-xs text-warm-neutral-500">
                    Bezpłatna analiza • Bez zobowiązań • 100% poufne
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PersonalizedOfferModal;