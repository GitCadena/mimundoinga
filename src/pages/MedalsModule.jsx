import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import avatarBoy from '../assets/avatar1.png';
import avatarGirl from '../assets/avatar2.png';
import { BottomNav } from '../components/Shared/BottomNav';

const MedalsModule = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState({
    simbolos: false,
    medicina: false,
    arte: false,
    territorio: false
  });
  const [avatarType, setAvatarType] = useState('boy');

  useEffect(() => {
    setProgress({
      simbolos: localStorage.getItem('inga_progress_simbolos') === 'completed',
      medicina: localStorage.getItem('inga_progress_medicina') === 'completed',
      arte: localStorage.getItem('inga_progress_arte') === 'completed',
      territorio: localStorage.getItem('inga_progress_territorio') === 'completed'
    });
    setAvatarType(localStorage.getItem('inga_avatar') || 'boy');
  }, []);

  const completedCount = Object.values(progress).filter(Boolean).length;
  const percentage = Math.round((completedCount / 4) * 100);
  const currentLevel = completedCount;
  const avatarImage = avatarType === 'girl' ? avatarGirl : avatarBoy;
  const avatarName = avatarType === 'girl' ? 'Nina' : 'Juanito';

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-ES';
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fff8e1] to-[#e8f5d3] font-['Plus_Jakarta_Sans'] pb-32">
      {/* Top Bar */}
      <header className="flex justify-between items-center px-8 py-6 bg-white/50 backdrop-blur-sm rounded-b-[2rem] shadow-sm">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-[#ef6c00] text-3xl">home</span>
          <h1 className="font-black text-2xl text-[#ef6c00] tracking-wide uppercase">El Mundo de Inga</h1>
        </div>
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#ef6c00] shadow-sm border-2 border-[#ef6c00]">
          <span className="material-symbols-outlined">person</span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 mt-8">
        
        {/* User Profile Info */}
        <div className="flex items-center gap-6 mb-8">
          <div className="relative">
            <div className={`w-24 h-24 rounded-full border-4 overflow-hidden shadow-lg ${avatarType === 'girl' ? 'border-[#64dd17] bg-[#64dd17]' : 'border-[#ffb300] bg-[#ffca28]'}`}>
              <img src={avatarImage} alt={avatarName} className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-[#7cb342] rounded-full border-2 border-white flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-white text-xl">star</span>
            </div>
          </div>
          <div>
            <h2 className={`text-4xl font-black mb-2 flex items-center gap-3 ${avatarType === 'girl' ? 'text-[#2e7d32]' : 'text-[#ff8f00]'}`}>
              {avatarName}
              <button onClick={() => speakText(`Hola ${avatarName}, este es tu progreso.`)} className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm hover:scale-110 text-[#5d4037]">
                <span className="material-symbols-outlined text-sm">volume_up</span>
              </button>
            </h2>
            <div className="bg-white/80 backdrop-blur-sm px-4 py-1.5 rounded-full inline-flex items-center gap-2 border border-gray-200 shadow-sm text-[#558b2f] font-bold text-sm">
              <span className="material-symbols-outlined text-[16px]">eco</span> Nivel {currentLevel}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column: Mi Camino (Map) */}
          <div className="md:col-span-2 bg-[#fbf9f1] rounded-[3rem] p-8 shadow-2xl relative border-b-8 border-gray-100 overflow-hidden min-h-[500px]">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-black text-[#8d6e63] flex items-center gap-3">
                <span className="material-symbols-outlined text-3xl">map</span> Mi Camino
              </h3>
              <button onClick={() => speakText("Sigue el camino para completar tu aventura.")} className="w-10 h-10 rounded-full bg-[#ef6c00] text-white flex items-center justify-center shadow-md hover:bg-[#e65100]">
                <span className="material-symbols-outlined">volume_up</span>
              </button>
            </div>

            {/* Path visualization */}
            <div className="absolute top-24 left-1/2 -translate-x-1/2 w-full h-[400px]">
              
              {/* Thick Road Background */}
              <svg className="w-full h-full absolute top-0 left-0" viewBox="0 0 400 400" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M 140 92 C 220 92, 260 120, 260 182 S 140 210, 140 272 S 260 300, 260 362" stroke="#efebe0" strokeWidth="46" strokeLinecap="round" />
                <path d="M 140 92 C 220 92, 260 120, 260 182 S 140 210, 140 272 S 260 300, 260 362" stroke="#e0dccf" strokeWidth="40" strokeLinecap="round" />
              </svg>
              
              {/* Footprints / Dashed path */}
              <svg className="w-full h-full absolute top-0 left-0" viewBox="0 0 400 400" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M 140 92 C 220 92, 260 120, 260 182 S 140 210, 140 272 S 260 300, 260 362" stroke="#bcaaa4" strokeWidth="6" strokeLinecap="round" strokeDasharray="0 25" />
              </svg>

              {/* Progress Glow/Path */}
              <svg className="w-full h-full absolute top-0 left-0" viewBox="0 0 400 400" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path 
                  d="M 140 92 C 220 92, 260 120, 260 182 S 140 210, 140 272 S 260 300, 260 362" 
                  stroke="url(#pathGradient)" 
                  strokeWidth="8" 
                  strokeLinecap="round" 
                  strokeDasharray={completedCount > 0 ? "1000" : "0 1000"} 
                  strokeDashoffset={completedCount === 4 ? "0" : completedCount === 3 ? "250" : completedCount === 2 ? "500" : completedCount === 1 ? "750" : "1000"}
                  className="transition-all duration-1000 ease-in-out filter drop-shadow-[0_0_10px_rgba(76,175,80,0.8)]"
                />
                <defs>
                  <linearGradient id="pathGradient" x1="0" y1="0" x2="0" y2="400" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#ffca28" />
                    <stop offset="0.5" stopColor="#81c784" />
                    <stop offset="1" stopColor="#4caf50" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Checkpoint 1 (Simbolos) */}
              <div className={`absolute top-[60px] left-[35%] w-16 h-16 rounded-full border-4 border-white flex items-center justify-center shadow-lg transform -translate-x-1/2 transition-transform duration-500 ${progress.simbolos ? 'bg-[#ff9800] text-white hover:scale-110' : 'bg-gray-200 text-gray-400'}`}>
                {progress.simbolos ? <span className="material-symbols-outlined text-3xl">check</span> : <span className="material-symbols-outlined text-3xl">palette</span>}
                <div className="absolute -bottom-10 bg-white text-[#5d4037] text-xs font-black px-4 py-1.5 rounded-full whitespace-nowrap shadow-md border-b-2 border-gray-200 z-10 flex items-center gap-1">
                  Símbolos
                  <button onClick={(e) => { e.stopPropagation(); speakText("Módulo de Símbolos"); }} className="hover:text-[#ef6c00]"><span className="material-symbols-outlined text-[10px]">volume_up</span></button>
                </div>
              </div>

              {/* Checkpoint 2 (Medicina) */}
              <div className={`absolute top-[150px] left-[65%] w-16 h-16 rounded-full border-4 border-white flex items-center justify-center shadow-lg transform -translate-x-1/2 transition-transform duration-500 ${progress.medicina ? 'bg-[#66bb6a] text-white hover:scale-110' : 'bg-gray-200 text-gray-400'}`}>
                {progress.medicina ? <span className="material-symbols-outlined text-3xl">check</span> : <span className="material-symbols-outlined text-3xl">medical_services</span>}
                <div className="absolute -bottom-10 bg-white text-[#5d4037] text-xs font-black px-4 py-1.5 rounded-full whitespace-nowrap shadow-md border-b-2 border-gray-200 z-10 flex items-center gap-1">
                  Medicina
                  <button onClick={(e) => { e.stopPropagation(); speakText("Módulo de Medicina"); }} className="hover:text-[#ef6c00]"><span className="material-symbols-outlined text-[10px]">volume_up</span></button>
                </div>
              </div>

              {/* Checkpoint 3 (Arte) */}
              <div className={`absolute top-[240px] left-[35%] w-16 h-16 rounded-full border-4 border-white flex items-center justify-center shadow-lg transform -translate-x-1/2 transition-transform duration-500 ${progress.arte ? 'bg-[#29b6f6] text-white hover:scale-110' : 'bg-gray-200 text-gray-400'}`}>
                {progress.arte ? <span className="material-symbols-outlined text-3xl">check</span> : <span className="material-symbols-outlined text-3xl">palette</span>}
                <div className="absolute -bottom-10 bg-white text-[#5d4037] text-xs font-black px-4 py-1.5 rounded-full whitespace-nowrap shadow-md border-b-2 border-gray-200 z-10 flex items-center gap-1">
                  Arte
                  <button onClick={(e) => { e.stopPropagation(); speakText("Taller de Arte"); }} className="hover:text-[#ef6c00]"><span className="material-symbols-outlined text-[10px]">volume_up</span></button>
                </div>
              </div>

              {/* Checkpoint 4 (Territorio) */}
              <div className={`absolute top-[330px] left-[65%] w-16 h-16 rounded-full border-4 border-white flex items-center justify-center shadow-lg transform -translate-x-1/2 transition-transform duration-500 ${progress.territorio ? 'bg-[#03a9f4] text-white hover:scale-110' : 'bg-gray-200 text-gray-400'}`}>
                {progress.territorio ? <span className="material-symbols-outlined text-3xl">check</span> : <span className="material-symbols-outlined text-3xl">eco</span>}
                <div className="absolute -bottom-10 bg-white text-[#5d4037] text-xs font-black px-4 py-1.5 rounded-full whitespace-nowrap shadow-md border-b-2 border-gray-200 z-10 flex items-center gap-1">
                  Territorio
                  <button onClick={(e) => { e.stopPropagation(); speakText("Cuida el Territorio"); }} className="hover:text-[#ef6c00]"><span className="material-symbols-outlined text-[10px]">volume_up</span></button>
                </div>
              </div>
            </div>
            
            {/* Completion Badge */}
            {completedCount === 4 && (
              <div className="absolute top-8 right-8 animate-bounce">
                <span className="material-symbols-outlined text-6xl text-[#ffca28] filter drop-shadow-md">military_tech</span>
              </div>
            )}
          </div>

          {/* Right Column: Stats */}
          <div className="space-y-6">
            
            {/* Medallas */}
            <div className="bg-[#f0ece1] rounded-[2rem] p-6 text-center shadow-inner border-b-8 border-[#e0d8c8]">
              <h3 className="font-bold text-[#f57f17] text-lg mb-4">Mis Medallas</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className={`aspect-square rounded-3xl border-4 border-white shadow-md flex items-center justify-center transition-all ${progress.simbolos ? 'bg-gradient-to-br from-[#ffca28] to-[#ff9800] text-white' : 'bg-gray-200 text-gray-400'}`}>
                  <span className="material-symbols-outlined text-4xl">local_florist</span>
                </div>
                <div className={`aspect-square rounded-3xl border-4 border-white shadow-md flex items-center justify-center transition-all ${progress.medicina ? 'bg-gradient-to-br from-[#81c784] to-[#388e3c] text-white' : 'bg-gray-200 text-gray-400'}`}>
                  <span className="material-symbols-outlined text-4xl">medical_services</span>
                </div>
                <div className={`aspect-square rounded-3xl border-4 border-white shadow-md flex items-center justify-center transition-all ${progress.arte ? 'bg-gradient-to-br from-[#29b6f6] to-[#0288d1] text-white' : 'bg-gray-200 text-gray-400'}`}>
                  <span className="material-symbols-outlined text-4xl">palette</span>
                </div>
                <div className={`aspect-square rounded-3xl border-4 border-white shadow-md flex items-center justify-center transition-all ${progress.territorio ? 'bg-gradient-to-br from-[#03a9f4] to-[#01579b] text-white' : 'bg-gray-200 text-gray-400'}`}>
                  <span className="material-symbols-outlined text-4xl">eco</span>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="bg-white rounded-[2rem] p-6 shadow-xl border-b-8 border-gray-100 relative">
              <div className="flex justify-between items-center mb-3">
                <span className="material-symbols-outlined text-[#ff9800]">menu_book</span>
                <span className="font-bold text-[#8d6e63] text-sm">{percentage}%</span>
              </div>
              <div className="h-6 bg-gray-100 rounded-full overflow-hidden shadow-inner flex">
                <div className="bg-gradient-to-r from-[#ffca28] to-[#ff9800] h-full relative transition-all duration-1000" style={{ width: `${percentage}%` }}>
                  {percentage > 0 && (
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                      <div className="w-1.5 h-1.5 bg-white/60 rounded-full"></div>
                      <div className="w-1.5 h-1.5 bg-white/60 rounded-full"></div>
                    </div>
                  )}
                </div>
              </div>
              <p className="text-center text-xs font-bold text-gray-500 mt-3">{percentage === 100 ? '¡Completaste todo!' : '¡Sigue aprendiendo!'}</p>
            </div>

            {/* Stars Bar */}
            <div className="bg-gradient-to-b from-[#7cb342] to-[#558b2f] rounded-[2rem] p-6 flex justify-around items-center shadow-xl border-b-8 border-[#33691e]">
              <span className={`material-symbols-outlined text-4xl transition-colors ${completedCount >= 1 ? 'text-white filter drop-shadow-md' : 'text-white/30'}`}>star</span>
              <span className={`material-symbols-outlined text-4xl transition-colors ${completedCount >= 2 ? 'text-white filter drop-shadow-md' : 'text-white/30'}`}>star</span>
              <span className={`material-symbols-outlined text-4xl transition-colors ${completedCount >= 3 ? 'text-white filter drop-shadow-md' : 'text-white/30'}`}>star</span>
              <span className={`material-symbols-outlined text-4xl transition-colors ${completedCount >= 4 ? 'text-white filter drop-shadow-md' : 'text-white/30'}`}>star</span>
            </div>

          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default MedalsModule;
