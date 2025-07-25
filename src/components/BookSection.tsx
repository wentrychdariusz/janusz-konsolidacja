import React, { useState, useEffect } from 'react';
import OptimizedImage from './OptimizedImage';
import { Book, Heart, Users, Play, Pause, Star } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';

declare global {
  interface Window {
    Wistia: any;
    _wq: any;
    wistiaAudio: any;
  }
}

const BookSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioReady, setAudioReady] = useState(false);

  const bookImages = [
    "/lovable-uploads/cc2d25e5-05d2-41e1-a933-15662005a373.png",
    "/lovable-uploads/61455e95-43aa-416c-aa0c-fe2c22acb9bc.png",
    "/lovable-uploads/e3bdd03e-03a7-423a-9799-55e4a6d4e39a.png"
  ];

  useEffect(() => {
    console.log('BookSection: Checking for Wistia audio');
    
    const checkAudioReady = () => {
      if (window.wistiaAudio) {
        console.log('BookSection: Wistia audio found:', window.wistiaAudio);
        setAudioReady(true);
        
        // Bind events
        window.wistiaAudio.bind('play', () => {
          console.log('BookSection: Audio playing');
          setIsPlaying(true);
        });
        
        window.wistiaAudio.bind('pause', () => {
          console.log('BookSection: Audio paused');
          setIsPlaying(false);
        });
        
        window.wistiaAudio.bind('end', () => {
          console.log('BookSection: Audio ended');
          setIsPlaying(false);
        });
      } else {
        console.log('BookSection: Wistia audio not ready yet, retrying...');
        setTimeout(checkAudioReady, 500);
      }
    };

    // Start checking for audio
    checkAudioReady();
  }, []);

  const handleAudioToggle = () => {
    console.log('BookSection: Toggle clicked, audioReady:', audioReady, 'isPlaying:', isPlaying);
    
    if (window.wistiaAudio && audioReady) {
      try {
        if (isPlaying) {
          console.log('BookSection: Pausing audio');
          window.wistiaAudio.pause();
        } else {
          console.log('BookSection: Playing audio');
          window.wistiaAudio.play();
        }
      } catch (error) {
        console.error('BookSection: Error controlling audio:', error);
      }
    } else {
      console.log('BookSection: Audio not ready yet');
    }
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="px-4 md:px-8 max-w-7xl mx-auto">
        
        {/* Hidden Wistia container */}
        <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
          <div className="wistia_embed wistia_async_u2ihwbwq21" style={{ height: '1px', width: '1px' }}>&nbsp;</div>
        </div>

        {/* Header Question */}
        <div className="text-center mb-12">
          <h2 className="font-montserrat text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-8 leading-tight">
            Jeszcze się zastanawiasz, czy postawić na 
            <span className="text-prestige-gold-600"> profesjonalistów</span>, 
            czy ryzykować z firmami, którym trudno zaufać?
          </h2>
        </div>

        {/* Book Image with Audio Player Overlay */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <OptimizedImage
              src="/lovable-uploads/7c2c43a8-7d25-42ea-90c0-66c86e978e81.png"
              alt="Książka 'Nowe życie bez długów' - 500 egzemplarzy rozdanych klientom"
              className="w-80 h-96 md:w-96 md:h-[28rem] object-cover rounded-2xl shadow-2xl"
              width={384}
              height={448}
            />
            
            {/* Audio Player Overlay on Book Image */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
              <button
                onClick={handleAudioToggle}
                disabled={!audioReady}
                className={`${
                  audioReady 
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800' 
                    : 'bg-gray-400 cursor-not-allowed'
                } text-white rounded-lg px-6 py-4 font-montserrat font-bold text-sm md:text-base shadow-xl transition-colors duration-300 flex items-center space-x-3 border-2 border-blue-200 hover:border-blue-300 min-w-[200px] md:min-w-[240px]`}
              >
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                  {isPlaying ? (
                    <Pause className="w-4 h-4 text-blue-600" />
                  ) : (
                    <Play className="w-4 h-4 text-blue-600 ml-0.5" />
                  )}
                </div>
                <span className="text-center">
                  {!audioReady ? 'Ładowanie...' : 'Posłuchaj fragmentu'}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Audio Player */}
        <div className="flex justify-center mb-12">
          <button
            onClick={handleAudioToggle}
            disabled={!audioReady}
            className={`w-96 md:w-[32rem] h-24 md:h-28 ${
              audioReady 
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800' 
                : 'bg-gray-400 cursor-not-allowed'
            } text-white rounded-xl font-montserrat font-bold text-base md:text-xl shadow-xl transition-colors duration-300 flex items-center justify-center space-x-4 md:space-x-6 border-4 border-blue-200 hover:border-blue-300 px-6`}
          >
            <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
              {isPlaying ? (
                <Pause className="w-6 h-6 md:w-8 md:h-8 text-blue-600" />
              ) : (
                <Play className="w-6 h-6 md:w-8 md:h-8 text-blue-600 ml-1" />
              )}
            </div>
            <span className="text-center leading-tight">
              {!audioReady ? 'Ładowanie audio...' : 
               isPlaying ? 'Zatrzymaj fragment' : 'Posłuchaj fragmentu mojej książki'}
            </span>
          </button>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-1 gap-8 lg:gap-12">
          
          {/* Content */}
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-prestige-gold-500 to-yellow-400 text-white p-6 rounded-2xl shadow-lg">
              <h3 className="font-montserrat text-2xl md:text-3xl font-bold text-center mb-4">
                PRZECZYTAJ MOJĄ KSIĄŻKĘ
              </h3>
              <p className="text-center text-lg font-semibold">
                ABY ZOBACZYĆ OGROMNĄ RÓŻNICĘ
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-prestige-gold-500 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                  <Book className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-montserrat text-xl font-bold text-slate-900 mb-2">
                    Kto rozdaje swoim klientom 500 książek o oddłużaniu?
                  </h4>
                  <p className="text-slate-700 font-lato text-lg">
                    Zrobiliśmy to, bo wiemy, jak ważne jest realne wsparcie. Nie tylko formalne, ale też ludzkie.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-blue-500 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-slate-700 font-lato text-lg">
                    Rozdaliśmy <span className="font-bold text-prestige-gold-600">500 egzemplarzy książki „Nowe życie bez długów"</span>, 
                    aby trafiły do tych, którzy naprawdę potrzebują pomocnej dłoni.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-green-500 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-slate-700 font-lato text-lg">
                    Chcieliśmy, by nasi klienci mogli przekazać ją dalej.<br />
                    <span className="font-semibold">Bliskim, rodzinie, przyjaciołom.</span><br />
                    Każdemu, kto też walczy z długami i potrzebuje nadziei.
                  </p>
                </div>
              </div>

              {/* Book Images Slider */}
              <div className="w-full max-w-4xl mx-auto mt-8">
                <Carousel className="w-full">
                  <CarouselContent>
                    {bookImages.map((image, index) => (
                      <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                        <div className="flex justify-center p-2">
                          <OptimizedImage
                            src={image}
                            alt={`Książka 'Nowe życie bez długów' - zdjęcie ${index + 1}`}
                            className="w-full max-w-sm h-64 md:h-80 object-cover rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-300"
                            width={320}
                            height={320}
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-2" />
                  <CarouselNext className="right-2" />
                </Carousel>
              </div>

              {/* New Section: Why Read My Book */}
              <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
                <h3 className="font-montserrat text-2xl md:text-3xl font-bold text-slate-900 mb-6">
                  Dlaczego warto przeczytać moją książkę?
                </h3>
                
                <div className="space-y-4 text-slate-700 font-lato text-lg leading-relaxed">
                  <p>
                    Napisałem tę książkę, ponieważ przez ponad 20 lat pomagałem ludziom wychodzić z długów. Widziałem ich lęki, bezsenne noce, bezradność. Wiem, że każdy może się z tego wydostać, jeśli tylko dostanie konkretne narzędzia i wsparcie.
                  </p>
                  
                  <p>
                    To przewodnik dla osób, które chcą odzyskać kontrolę nad swoimi finansami. Nie znajdziesz tu teorii oderwanej od rzeczywistości, tylko sprawdzone metody, które działają. Pokazuję, jak dokładnie przeanalizować swoją sytuację, jak wybrać najlepszy sposób oddłużania i jak zacząć odbudowę finansowego bezpieczeństwa.
                  </p>
                  
                  <p>
                    Daję też wskazówki, jak nie wrócić do zadłużenia i jak budować finansową odporność na przyszłość. Dzielę się historiami ludzi, którym się udało, by pokazać, że zmiana jest możliwa.
                  </p>
                  
                  <p className="font-semibold text-prestige-gold-600">
                    Napisałem tę książkę, żeby pomóc Ci zacząć od nowa. Spokojnie, konkretnie i skutecznie.
                  </p>
                </div>

                {/* Author image below the text */}
                <div className="flex justify-center mt-8">
                  <OptimizedImage
                    src="/lovable-uploads/af0eb18f-2eb3-4c97-bd60-2bfb5e62373a.png"
                    alt="Dariusz Wentrych - autor książki"
                    className="w-64 h-80 md:w-80 md:h-96 object-cover rounded-2xl shadow-2xl"
                    width={320}
                    height={384}
                  />
                </div>

                {/* Book Review Table */}
                <div className="mt-8">
                  <Table>
                    <TableBody>
                      <TableRow className="border-0">
                        <TableCell className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
                          <div className="space-y-4">
                            {/* Star Rating */}
                            <div className="flex justify-center space-x-1">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                            
                            {/* Review Quote */}
                            <blockquote className="text-slate-700 font-lato text-base md:text-lg leading-relaxed italic text-center">
                              "Książka stanowi praktyczny przewodnik dla osób borykających się z problemami zadłużenia. Autor, znany ekspert finansowy, przedstawia czytelnikowi konkretne strategie radzenia sobie z długami, podkreślając znaczenie systematycznego podejścia do finansów. Tekst cechuje przystępny język, liczne przykłady i porady, które pomagają zrozumieć mechanizmy oddłużania. Publikacja może okazać się wartościowym narzędziem zarówno dla osób już zadłużonych, jak i tych, którzy chcą uniknąć podobnych problemów w przyszłości."
                            </blockquote>
                          </div>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookSection;
