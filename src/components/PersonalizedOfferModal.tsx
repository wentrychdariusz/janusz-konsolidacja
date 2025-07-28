import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { X, Shield, Award, CheckCircle, Star, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useABTest } from '../hooks/useABTest';
import expertPortrait from '../assets/dariusz-expert-portrait.jpg';

interface PersonalizedOfferModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PersonalizedOfferModal = ({ isOpen, onClose }: PersonalizedOfferModalProps) => {
  const [salary, setSalary] = useState('');
  const [showOffer, setShowOffer] = useState(false);
  const navigate = useNavigate();
  
  const { variant } = useABTest({
    testName: 'salary_ab_test',
    enabled: true,
    splitRatio: 0.5
  });

  // Funkcja formatowania liczb - poprawiona wersja
  const formatNumber = (value: string) => {
    // Usuń wszystkie spacje i pozostaw tylko cyfry
    const num = value.replace(/\s/g, '').replace(/\D/g, '');
    // Formatuj z spacjami co 3 cyfry
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };

  // Parsowanie PLN (jak w DebtCalculator)
  const parsePLN = (val: string) => {
    const clean = (val || '').toString().replace(/\s+/g, '').replace(',', '.');
    const num = parseFloat(clean);
    return isNaN(num) ? 0 : num;
  };

  console.log('🔧 PersonalizedOfferModal render - isOpen:', isOpen, 'salary:', salary);

  const getPersonalizedOffer = (salaryAmount: number) => {
    if (salaryAmount >= 4000) {
      return {
        title: "Doskonała sytuacja finansowa!",
        message: "Z Twoimi zarobkami możemy zaoszczędzić nawet do 2000 zł miesięcznie na obsłudze długów.",
        highlight: "Nawet 24 000 zł rocznie więcej w kieszeni"
      };
    } else if (salaryAmount >= 3000) {
      return {
        title: "Możemy Ci pomóc!",
        message: "Takim osobom jak Ty pomagamy najczęściej. Zredukujemy Twoje raty o 30-50%.",
        highlight: "To może być nawet 800 zł miesięcznie więcej"
      };
    } else {
      return {
        title: "Niestety nie możemy pomóc",
        message: "Przy obecnej sytuacji finansowej nie jesteśmy w stanie zaoferować odpowiedniego rozwiązania oddłużeniowego.",
        highlight: "Minimalne zarobki to 3000 zł netto"
      };
    }
  };

  const handleSalarySubmit = () => {
    const salaryNum = parsePLN(salary);
    if (salaryNum && salaryNum > 0) {
      // Nowa logika według wymagań użytkownika
      if (salaryNum >= 4000) {
        // A/B test - przekieruj na glowna1a lub glowna1b z salary w URL
        const targetPage = variant === 'A' ? '/glowna1a' : '/glowna1b';
        navigate(`${targetPage}?salary=${salaryNum}`);
        onClose();
        return;
      } else if (salaryNum >= 3000) {
        // Przekieruj na zewnętrzną stronę dariuszwentrych.com.pl
        window.location.href = 'https://dariuszwentrych.com.pl';
        onClose();
        return;
      } else {
        // Pokaż komunikat "nie możemy pomóc" 
        setShowOffer(true);
        return;
      }
    }
  };

  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSalary(formatNumber(e.target.value));
  };

  const handleGoToCalculator = () => {
    navigate(`/analiza?salary=${salary}`);
    onClose();
  };

  const handleClose = () => {
    setShowOffer(false);
    setSalary('');
    onClose();
  };

  const offer = salary ? getPersonalizedOffer(parsePLN(salary)) : null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="w-full max-w-[95vw] sm:max-w-lg rounded-2xl border-0 shadow-2xl overflow-hidden p-0 [&>button]:hidden">
        <DialogHeader className="sr-only">
          <DialogTitle>Spersonalizowana oferta oddłużeniowa</DialogTitle>
          <DialogDescription>Wprowadź swoje zarobki aby otrzymać spersonalizowaną ofertę</DialogDescription>
        </DialogHeader>
        
        {!showOffer ? (
          <>
            {/* Progress button */}
            <div className="bg-gradient-to-r from-prestige-gold-50 to-prestige-gold-100 px-4 py-3 border-b border-prestige-gold-200 sm:px-6 sm:py-4 rounded-t-2xl">
              <div className="flex flex-col items-center gap-2">
                <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3">
                  <div className="bg-prestige-gold-500 h-2 sm:h-3 rounded-full transition-all duration-300" style={{width: '50%'}}></div>
                </div>
                <div className="text-navy-700 text-xs sm:text-sm font-medium">50% ukończone</div>
              </div>
            </div>
            
            {/* Mobile-enhanced Header */}
            <div className="text-center px-4 sm:px-6 py-4 sm:py-4">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-3">
                <div className="relative w-16 h-16 sm:w-16 sm:h-16 rounded-full overflow-hidden border-3 border-prestige-gold-400">
                  <img 
                    src="/lovable-uploads/01dcb25b-999a-4c0d-b7da-525c21306610.png" 
                    alt="Dariusz Wentrych" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 sm:w-5 sm:h-5 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                    <CheckCircle className="w-3 h-3 text-white" />
                  </div>
                </div>
                
                <div className="text-center sm:text-left">
                  <h3 className="font-montserrat text-lg sm:text-xl font-bold text-navy-900 flex items-center justify-center sm:justify-start gap-2">
                    Dariusz Wentrych
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />)}
                    </div>
                  </h3>
                  <div className="text-sm sm:text-xs text-green-700 font-bold">
                    ✅ Ekspert nr 1 w oddłużaniu i konsolidacji
                  </div>
                  <div className="text-sm sm:text-xs text-blue-600 font-medium">
                    📚 Autor bestsellera "Nowe życie bez długów"
                  </div>
                  <div className="text-sm sm:text-xs text-purple-600 font-medium">
                    💼 20+ lat doświadczenia w finansach
                  </div>
                </div>
              </div>

              {/* Simplified input section */}
              <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-xl border-2 border-blue-200 shadow-lg mx-4 mb-4">
                <div className="space-y-4">
                  <div className="text-center">
                    <h4 className="text-lg font-bold text-navy-900 mb-2">
                      Wpisz miesięczne zarobki netto
                    </h4>
                    <p className="text-sm text-navy-700">
                      📋 Zobacz spersonalizowaną ofertę oddłużenia
                    </p>
                  </div>
                  
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="4 000"
                      value={salary}
                      onChange={handleSalaryChange}
                      className="text-center text-2xl font-bold border-2 border-navy-400 focus:border-navy-600 h-14 rounded-lg bg-white w-full shadow-md placeholder:text-2xl placeholder:text-navy-400 pr-12"
                      autoFocus
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-navy-600 text-xl font-medium">
                      zł
                    </span>
                  </div>
                  
                  <Button 
                    onClick={handleSalarySubmit}
                    disabled={!salary || parsePLN(salary) <= 0}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 rounded-lg text-base shadow-lg disabled:opacity-50 h-12"
                  >
                    🎯 Odblokowuję ofertę
                  </Button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Progress indicator for step 2 */}
            <div className="bg-gradient-to-r from-green-50 to-green-100 px-6 py-3 border-b border-green-200 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="text-navy-900 font-bold text-sm">KROK 2 z 2</div>
                <div className="flex space-x-2">
                  <div className="w-6 h-2 bg-green-500 rounded-full"></div>
                  <div className="w-6 h-2 bg-green-500 rounded-full"></div>
                </div>
              </div>
            </div>
            
            {/* Results */}
            <div className="px-6 py-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full overflow-hidden border-3 border-prestige-gold-400">
                <img 
                  src="/lovable-uploads/01dcb25b-999a-4c0d-b7da-525c21306610.png" 
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

              {parsePLN(salary) >= 3000 ? (
                <Button 
                  onClick={handleGoToCalculator}
                  className="w-full bg-gradient-to-r from-prestige-gold-400 to-prestige-gold-600 hover:from-prestige-gold-500 hover:to-prestige-gold-700 text-navy-900 font-bold py-4 rounded-xl text-lg shadow-xl"
                >
                  Przejdź do analizy →
                </Button>
              ) : (
                <Button 
                  onClick={handleClose}
                  className="w-full bg-gradient-to-r from-gray-400 to-gray-600 hover:from-gray-500 hover:to-gray-700 text-white font-bold py-4 rounded-xl text-lg shadow-xl"
                >
                  Zamknij
                </Button>
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PersonalizedOfferModal;