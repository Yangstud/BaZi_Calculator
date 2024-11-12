import React from 'react';

export function YinYangSpinner() {
  return (
    <div className="flex justify-center items-center p-8">
      <div className="relative w-16 h-16 animate-spin">
        <div className="absolute inset-0 rounded-full border-2 border-gray-200 border-t-gray-800"></div>
        <div className="absolute top-0 left-1/2 w-2 h-2 -ml-1 bg-gray-800 rounded-full"></div>
        <div className="absolute bottom-0 left-1/2 w-2 h-2 -ml-1 bg-gray-200 rounded-full"></div>
        <div className="absolute inset-[2px] rounded-full bg-gradient-to-b from-gray-800 to-gray-800 via-transparent" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)' }}></div>
      </div>
    </div>
  );
}