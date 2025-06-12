
import React from 'react';
import { Users, Award, Star } from 'lucide-react';

const TrustBar = () => {
  const trustElements = [
    {
      icon: Users,
      text: "15.000 zadowolonych klientów w całej Polsce"
    },
    {
      icon: Award,
      text: "20 lat doświadczenia w finansach"
    },
    {
      icon: Star,
      text: "Autor bestsellera 'Nowe życie bez długów'"
    }
  ];

  return (
    <div className="w-full bg-gradient-to-r from-business-blue-400/20 via-business-blue-300/15 to-business-blue-400/20 border-t border-b border-business-blue-400/30 backdrop-blur-sm py-4">
      <div className="px-4 md:px-8 lg:px-12 xl:px-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {trustElements.map((element, index) => (
            <div 
              key={index}
              className="flex items-center justify-center md:justify-start space-x-3 text-center md:text-left"
            >
              <div className="bg-gradient-to-r from-business-blue-400 to-business-blue-500 rounded-full w-10 h-10 flex items-center justify-center shadow-lg flex-shrink-0">
                <element.icon className="w-5 h-5 text-white" />
              </div>
              <p className="text-white font-lato font-semibold text-sm md:text-base leading-tight">
                {element.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustBar;
