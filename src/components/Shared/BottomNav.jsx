import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // If we are exactly on the hub, we want the center button to just act as home.
  // Actually, Aventura is always the center hub button.
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 px-8 py-4 pointer-events-none">
      <div className="bg-white rounded-[2rem] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] flex justify-between items-center px-4 md:px-16 h-20 max-w-5xl mx-auto relative pointer-events-auto">
        
        {/* Left Side Group */}
        <div className="flex gap-4 md:gap-8">
          <button 
            className={`flex flex-col items-center hover:text-[#ef6c00] transition-colors ${location.pathname === '/arte' ? 'text-[#ef6c00]' : 'text-[#ff9800]'}`} 
            onClick={() => navigate('/arte')}
          >
            <span className="material-symbols-outlined text-2xl md:text-3xl">palette</span>
            <span className="text-[10px] md:text-xs font-bold mt-1">Arte</span>
          </button>
          
          <button 
            className={`flex flex-col items-center hover:text-[#ef6c00] transition-colors ${location.pathname === '/simbolos' ? 'text-[#ef6c00]' : 'text-[#ff9800]'}`} 
            onClick={() => navigate('/simbolos')}
          >
            <span className="material-symbols-outlined text-2xl md:text-3xl">local_florist</span>
            <span className="text-[10px] md:text-xs font-bold mt-1">Símbolos</span>
          </button>
        </div>

        {/* Center Active Hub Button */}
        <button 
          className={`absolute left-1/2 -translate-x-1/2 -top-8 w-16 h-16 md:w-20 md:h-20 bg-gradient-to-b from-[#ff9800] to-[#ef6c00] rounded-xl md:rounded-[1.5rem] rotate-45 shadow-xl flex items-center justify-center border-b-4 md:border-b-8 border-[#e65100] transform hover:-translate-y-2 transition-transform ${location.pathname === '/hub' || location.pathname === '/medallas' ? 'scale-110' : ''}`}
          onClick={() => navigate('/hub')}
        >
          <div className="-rotate-45 flex flex-col items-center text-white">
            <span className="material-symbols-outlined text-2xl md:text-3xl">explore</span>
            <span className="text-[9px] md:text-[10px] font-bold mt-1">Aventura</span>
          </div>
        </button>

        {/* Right Side Group */}
        <div className="flex gap-4 md:gap-8">
          <button 
            className={`flex flex-col items-center hover:text-[#ef6c00] transition-colors ${location.pathname === '/medicina' ? 'text-[#ef6c00]' : 'text-[#ff9800]'}`} 
            onClick={() => navigate('/medicina')}
          >
            <span className="material-symbols-outlined text-2xl md:text-3xl">medical_services</span>
            <span className="text-[10px] md:text-xs font-bold mt-1">Medicina</span>
          </button>
          
          <button 
            className={`flex flex-col items-center hover:text-[#ef6c00] transition-colors ${location.pathname === '/territorio' ? 'text-[#ef6c00]' : 'text-[#ff9800]'}`} 
            onClick={() => navigate('/territorio')}
          >
            <span className="material-symbols-outlined text-2xl md:text-3xl">eco</span>
            <span className="text-[10px] md:text-xs font-bold mt-1">Territorio</span>
          </button>
        </div>

      </div>
    </nav>
  );
};
