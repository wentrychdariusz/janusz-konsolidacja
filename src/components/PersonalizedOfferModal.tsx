import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { X, Shield, Award, CheckCircle, Star, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import expertPortrait from '../assets/dariusz-expert-portrait.jpg';

interface PersonalizedOfferModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PersonalizedOfferModal = ({ isOpen, onClose }: PersonalizedOfferModalProps) => {
  const [salary, setSalary] = useState('');
  const [showOffer, setShowOffer] = useState(false);
  const navigate = useNavigate();

  console.log('🔧 PersonalizedOfferModal render - isOpen:', isOpen, 'salary:', salary);

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
      <div className="fixed inset-0 z-50 bg-black/10 backdrop-blur-[2px]" />
      <DialogContent className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-md translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] rounded-2xl border-0 shadow-2xl">
        <DialogHeader className="sr-only">
          <DialogTitle>Spersonalizowana oferta oddłużeniowa</DialogTitle>
          <DialogDescription>Wprowadź swoje zarobki aby otrzymać spersonalizowaną ofertę</DialogDescription>
          <Button
            variant="ghost"
            size="sm"
            className="absolute -top-2 -right-2 h-8 w-8 rounded-full z-10"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="px-0 pb-0">
          {!showOffer ? (
            <>
              {/* Simple Header */}
              <div className="text-center px-8 py-6">
                <div className="relative w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden border-4 border-prestige-gold-400 group">
                  <img 
                    src={expertPortrait} 
                    alt="Dariusz Wentrych" 
                    className="w-full h-full object-cover hover:scale-110 transition-all duration-300"
                  />
                  {/* Trust badge */}
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white animate-pulse">
                    <CheckCircle className="w-3 h-3 text-white" />
                  </div>
                </div>
                
                <div className="text-center mb-6">
                  <h3 className="font-montserrat text-2xl font-bold text-navy-900 mb-2 flex items-center justify-center gap-2">
                    Dariusz Wentrych
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                    </div>
                  </h3>
                  <div className="text-sm text-green-700 font-bold mb-2">
                    ✅ Ekspert nr 1 w oddłużeniu • 15.000+ zadowolonych klientów
                  </div>
                  <div className="text-sm text-blue-600 font-medium italic mb-4">
                    💬 "Pomagam od 20 lat - sprawdź, czy mogę pomóc również Tobie!"
                  </div>
                </div>

                {/* Large Input Field */}
                <div className="mb-6">
                  <Input
                    type="number"
                    placeholder="Wpisz swoje zarobki"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    className="text-center text-2xl font-bold border-3 border-prestige-gold-400 focus:border-prestige-gold-600 h-16 rounded-xl animate-pulse focus:animate-none transition-all duration-300 shadow-lg text-navy-900"
                  />
                </div>
                
                {/* Simple Button */}
                <Button 
                  onClick={handleSalarySubmit}
                  disabled={!salary || parseInt(salary) <= 0}
                  className="w-full bg-gradient-to-r from-prestige-gold-400 to-prestige-gold-600 hover:from-prestige-gold-500 hover:to-prestige-gold-700 text-navy-900 font-bold py-4 rounded-xl text-lg shadow-xl transform transition-all duration-300 hover:scale-105 disabled:opacity-50"
                >
                  Sprawdź spersonalizowaną ofertę
                </Button>
              </div>
            </>
          ) : (
            <>
              {/* Results */}
              <div className="px-8 py-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full overflow-hidden border-3 border-prestige-gold-400">
                  <img 
                    src={expertPortrait} 
                    alt="Dariusz Wentrych" 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="bg-gradient-to-br from-prestige-gold-50 to-warm-neutral-50 p-6 rounded-2xl border-2 border-prestige-gold-400 mb-6">
                  <h4 className="font-montserrat text-xl font-bold text-navy-900 mb-3">
                    {offer?.title}
                  </h4>
                  <p className="text-warm-neutral-700 mb-4">
                    {offer?.message}
                  </p>
                  <div className="bg-prestige-gold-200 px-4 py-3 rounded-xl">
                    <p className="font-bold text-prestige-gold-800 text-lg">
                      💎 {offer?.highlight}
                    </p>
                  </div>
                </div>

                <Button 
                  onClick={handleGoToCalculator}
                  className="w-full bg-gradient-to-r from-prestige-gold-400 to-prestige-gold-600 hover:from-prestige-gold-500 hover:to-prestige-gold-700 text-navy-900 font-bold py-4 rounded-xl text-lg shadow-xl"
                >
                  Zobacz kalkulator →
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PersonalizedOfferModal;