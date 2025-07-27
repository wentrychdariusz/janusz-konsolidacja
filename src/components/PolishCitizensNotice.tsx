import React from 'react';
const PolishCitizensNotice = () => {
  return (
    <div className="flex items-center justify-center gap-2 mt-1">
      <div className="flex items-center gap-1">
        <div className="w-4 h-3 relative">
          <div className="w-full h-1.5 bg-white"></div>
          <div className="w-full h-1.5 bg-red-600"></div>
        </div>
        <span className="text-xs opacity-90">Pomagamy wyłącznie obywatelom RP</span>
      </div>
    </div>
  );
};
export default PolishCitizensNotice;