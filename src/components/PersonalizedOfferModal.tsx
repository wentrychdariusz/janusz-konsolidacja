import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
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

        <div className="px-0 pb-0">
          {!showOffer ? (
            <>
              {/* Hero Section */}
              <div className="relative bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 text-white px-8 py-8 -mx-6 -mt-6 rounded-t-2xl">
                <div className="absolute top-4 right-4">
                  <div className="bg-prestige-gold-400 text-navy-900 px-3 py-1 rounded-full text-xs font-bold">
                    #1 EKSPERT
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="relative w-24 h-24 mx-auto mb-4">
                    <img 
                      src={expertPortrait} 
                      alt="Dariusz Wentrych - Ekspert nr 1" 
                      className="w-full h-full object-cover rounded-full border-4 border-prestige-gold-400"
                    />
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-prestige-gold-400 rounded-full flex items-center justify-center">
                      <Star className="h-4 w-4 text-navy-900 fill-current" />
                    </div>
                  </div>
                  
                  <h3 className="font-montserrat text-2xl font-bold mb-1">
                    Dariusz Wentrych
                  </h3>
                  <p className="text-prestige-gold-200 text-sm mb-4">
                    Ekspert nr 1 w Polsce w oddłużaniu i konsolidacji
                  </p>
                  
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-prestige-gold-400 font-bold text-lg">5000+</div>
                      <div className="text-xs text-gray-300">Klientów</div>
                    </div>
                    <div className="text-center">
                      <div className="text-prestige-gold-400 font-bold text-lg">98%</div>
                      <div className="text-xs text-gray-300">Sukces</div>
                    </div>
                    <div className="text-center">
                      <div className="text-prestige-gold-400 font-bold text-lg">15 lat</div>
                      <div className="text-xs text-gray-300">Doświadczenie</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Offer Section */}
              <div className="px-8 py-6">
                <div className="text-center mb-6">
                  <h4 className="font-montserrat text-2xl font-bold text-navy-900 mb-3">
                    Sprawdź swoją spersonalizowaną ofertę
                  </h4>
                  <p className="text-warm-neutral-600 text-sm leading-relaxed">
                    Podaj swoje miesięczne zarobki netto, a przedstawię Ci dokładną analizę 
                    <strong className="text-prestige-gold-600"> oszczędności</strong>
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="relative">
                    <Input
                      type="number"
                      placeholder="np. 5000"
                      value={salary}
                      onChange={(e) => setSalary(e.target.value)}
                      className="text-center text-xl font-bold border-2 border-warm-neutral-200 focus:border-prestige-gold-400 h-14 rounded-xl"
                    />
                    <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-warm-neutral-500 font-semibold">
                      zł netto
                    </span>
                  </div>
                  
                  <Button 
                    onClick={handleSalarySubmit}
                    disabled={!salary || parseInt(salary) <= 0}
                    className="w-full bg-gradient-to-r from-prestige-gold-400 to-prestige-gold-500 hover:from-prestige-gold-500 hover:to-prestige-gold-600 text-navy-900 font-bold py-4 rounded-xl text-lg shadow-lg transform transition hover:scale-105"
                  >
                    Sprawdź moją ofertę →
                  </Button>
                </div>

                <div className="flex items-center justify-center gap-2 mt-4 text-xs text-warm-neutral-500">
                  <Shield className="h-4 w-4 text-prestige-gold-400" />
                  <span>100% bezpieczne</span>
                  <span>•</span>
                  <CheckCircle className="h-4 w-4 text-prestige-gold-400" />
                  <span>Bez zobowiązań</span>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Results Section */}
              <div className="px-8 py-6">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full overflow-hidden border-3 border-prestige-gold-400">
                    <img 
                      src={expertPortrait} 
                      alt="Dariusz Wentrych" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="bg-gradient-to-br from-prestige-gold-50 to-warm-neutral-50 p-6 rounded-2xl border-2 border-prestige-gold-200">
                    <h4 className="font-montserrat text-xl font-bold text-navy-900 mb-3">
                      {offer?.title}
                    </h4>
                    <p className="text-warm-neutral-700 mb-4 leading-relaxed">
                      {offer?.message}
                    </p>
                    <div className="bg-gradient-to-r from-prestige-gold-100 to-prestige-gold-200 px-4 py-3 rounded-xl">
                      <p className="font-bold text-prestige-gold-800 text-lg">
                        💎 {offer?.highlight}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Button 
                    onClick={handleGoToCalculator}
                    className="w-full bg-gradient-to-r from-prestige-gold-400 to-prestige-gold-500 hover:from-prestige-gold-500 hover:to-prestige-gold-600 text-navy-900 font-bold py-4 rounded-xl text-lg shadow-lg"
                  >
                    Zobacz szczegółowy kalkulator →
                  </Button>
                  
                  <div className="text-center">
                    <p className="text-xs text-warm-neutral-500">
                      Bezpłatna analiza • Brak ukrytych kosztów • Gwarancja rezultatu
                    </p>
                  </div>
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