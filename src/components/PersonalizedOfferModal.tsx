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
        // A/B test - przekieruj na glowna1a lub glowna1b
        const targetPage = variant === 'A' ? '/glowna1a' : '/glowna1b';
        navigate(targetPage);
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
      <DialogContent className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-[95vw] sm:max-w-lg translate-x-[-50%] translate-y-[-50%] gap-0 border bg-white p-0 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] rounded-2xl border-0 shadow-2xl [&>button]:hidden overflow-hidden">
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

              {/* Mobile-enhanced table */}
              <div className="bg-white rounded-xl border-2 border-prestige-gold-300 overflow-hidden shadow-lg">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-prestige-gold-100 to-prestige-gold-200">
                      <th className="px-3 sm:px-4 py-4 sm:py-4 text-center">
                        <div className="space-y-2">
                          <div className="text-base sm:text-lg font-bold text-navy-900">
                            Wpisz miesięczne zarobki netto
                          </div>
                          <div className="text-sm sm:text-base text-navy-700 font-medium">
                            📋 Zobacz spersonalizowaną ofertę oddłużenia
                          </div>
                          <div className="text-xs sm:text-sm text-green-700 font-medium">
                            ✅ Sprawdzimy jak możemy Ci pomóc w konsolidacji długów
                          </div>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-gradient-to-r from-blue-50 to-green-50">
                      <td className="px-4 sm:px-6 py-8 sm:py-8">
                        <div className="space-y-6">
                          {/* Mobile-enhanced input */}
                          <div className="relative">
                            <Input
                              type="text"
                              placeholder="4 000"
                              value={salary}
                              onChange={handleSalaryChange}
                              className="text-center text-3xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-bold border-2 border-navy-400 focus:border-navy-600 h-16 sm:h-24 md:h-28 lg:h-32 xl:h-36 rounded-lg transition-colors duration-200 text-navy-700 bg-white w-full shadow-md placeholder:text-3xl sm:placeholder:text-5xl md:placeholder:text-5xl lg:placeholder:text-6xl xl:placeholder:text-7xl placeholder:text-navy-400 placeholder:font-bold"
                              autoFocus
                            />
                            <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-navy-600 text-2xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl font-medium">
                              zł
                            </span>
                          </div>
                          
                          {/* Mobile-enhanced button */}
                          <div>
                            <Button 
                              onClick={handleSalarySubmit}
                              disabled={!salary || parsePLN(salary) <= 0}
                              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-6 sm:py-6 rounded-lg text-lg sm:text-xl shadow-lg transition-all duration-200 disabled:opacity-50 min-h-[70px] border-2 border-green-400 hover:scale-105 hover:shadow-xl"
                            >
                              🎯 Odblokowuję spersonalizowaną ofertę
                            </Button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
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

              <Button 
                onClick={handleGoToCalculator}
                className="w-full bg-gradient-to-r from-prestige-gold-400 to-prestige-gold-600 hover:from-prestige-gold-500 hover:to-prestige-gold-700 text-navy-900 font-bold py-4 rounded-xl text-lg shadow-xl"
              >
                Przejdź do analizy →
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PersonalizedOfferModal;