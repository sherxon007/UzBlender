import React, { useState, PropsWithChildren } from 'react';

interface TooltipProps {
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

export const Tooltip = ({ content, children, position = 'top', className = '' }: PropsWithChildren<TooltipProps>) => {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    top: 'bottom-full mb-3 left-1/2 -translate-x-1/2',
    bottom: 'top-full mt-3 left-1/2 -translate-x-1/2',
    left: 'right-full mr-3 top-1/2 -translate-y-1/2',
    right: 'left-full ml-3 top-1/2 -translate-y-1/2',
  };

  return (
    <div 
      className={`relative flex items-center justify-center ${className}`}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      <div 
        className={`absolute ${positionClasses[position]} z-[60] px-3 py-1.5 bg-[#050b14]/95 border border-cyber-cyan/50 text-cyber-cyan text-[10px] font-bold tracking-widest uppercase rounded shadow-[0_0_15px_rgba(0,240,255,0.3)] whitespace-nowrap pointer-events-none transition-all duration-200 ease-out backdrop-blur-sm ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-1 scale-95'}`}
      >
        {content}
        {/* Decorative tiny dots for high-tech feel */}
        <div className="absolute -left-[2px] -top-[2px] w-1 h-1 bg-white rounded-full opacity-50"></div>
        <div className="absolute -right-[2px] -bottom-[2px] w-1 h-1 bg-white rounded-full opacity-50"></div>
      </div>
    </div>
  );
};