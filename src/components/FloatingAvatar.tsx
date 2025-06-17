
import React from 'react';

const FloatingAvatar = () => {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="w-16 h-16 bg-prestige-gold-500 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform">
        <span className="text-white font-bold">DW</span>
      </div>
    </div>
  );
};

export default FloatingAvatar;
