
import React from 'react';

const TopHeader = () => {
  return (
    <div className="bg-gradient-to-r from-business-blue-600 via-business-blue-500 to-navy-600 text-white py-4 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-prestige-gold-400/20 to-transparent animate-pulse"></div>
      <div className="relative z-10 text-center">
        <p className="text-sm md:text-base font-medium">
          💰 Zarabiaj 5-15 tysięcy złotych miesięcznie bez prowadzenia działalności gospodarczej
        </p>
      </div>
    </div>
  );
};

export default TopHeader;
