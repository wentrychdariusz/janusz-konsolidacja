
import React from 'react';
import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-navy-900 text-white py-12">
      <div className="px-4 md:px-8 lg:px-12 xl:px-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Company Info */}
          <div>
            <h3 className="font-montserrat text-xl font-bold mb-4 text-prestige-gold-400">
              Wentrych.pl
            </h3>
            <p className="text-gray-300 mb-4 font-lato">
              Doradztwo finansowe i oddłużanie z 20-letnim doświadczeniem
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-gray-300">
                <Phone className="w-4 h-4" />
                <span className="font-lato">+48 123 456 789</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Mail className="w-4 h-4" />
                <span className="font-lato">kontakt@wentrych.pl</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <MapPin className="w-4 h-4" />
                <span className="font-lato">Warszawa, Polska</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-montserrat text-xl font-bold mb-4 text-prestige-gold-400">
              Informacje
            </h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://kredytstudio.pl/polityka-prywatnosci" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-prestige-gold-400 transition-colors duration-300 font-lato flex items-center space-x-1"
                >
                  <span>Polityka prywatności</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a 
                  href="https://kredytstudio.pl/regulamin" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-prestige-gold-400 transition-colors duration-300 font-lato flex items-center space-x-1"
                >
                  <span>Regulamin</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a 
                  href="https://kredytstudio.pl/kontakt" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-prestige-gold-400 transition-colors duration-300 font-lato flex items-center space-x-1"
                >
                  <span>Kontakt</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-montserrat text-xl font-bold mb-4 text-prestige-gold-400">
              Usługi
            </h3>
            <ul className="space-y-2 text-gray-300 font-lato">
              <li>Oddłużanie</li>
              <li>Doradztwo finansowe</li>
              <li>Negocjacje z bankami</li>
              <li>Restrukturyzacja długów</li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 font-lato text-sm">
              © 2024 Wentrych.pl. Wszystkie prawa zastrzeżone.
            </div>
            <div className="text-gray-400 font-lato text-sm">
              Opieka marketingowa:{" "}
              <a 
                href="https://przemyslawlech.pl" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-prestige-gold-400 hover:text-prestige-gold-300 transition-colors duration-300"
              >
                przemyslawlech.pl
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
