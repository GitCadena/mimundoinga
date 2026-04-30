import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import imgDash from '../img/fondo.png';
import { BottomNav } from '../components/Shared/BottomNav';

const Dashboard = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState({
    simbolos: false,
    medicina: false,
    arte: false,
    territorio: false
  });

  useEffect(() => {
    setProgress({
      simbolos: localStorage.getItem('inga_progress_simbolos') === 'completed',
      medicina: localStorage.getItem('inga_progress_medicina') === 'completed',
      arte: localStorage.getItem('inga_progress_arte') === 'completed',
      territorio: localStorage.getItem('inga_progress_territorio') === 'completed'
    });
  }, []);

  const completedCount = Object.values(progress).filter(Boolean).length;
  const percentage = Math.round((completedCount / 4) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fdf8e9] via-[#fdf8e9] to-[#e8f5d3] font-['Plus_Jakarta_Sans'] pb-32">
      {/* Top Bar */}
      <header className="flex justify-between items-center px-8 py-6 bg-white/50 backdrop-blur-sm rounded-b-[2rem] shadow-sm">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate('/')}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-[#ef6c00] hover:text-white transition-colors text-[#ef6c00] border-2 border-[#ef6c00]"
            title="Volver a Inicio"
          >
            <span className="material-symbols-outlined text-2xl">arrow_back</span>
          </button>
          <span className="material-symbols-outlined text-[#ef6c00] text-3xl ml-2">home</span>
          <h1 className="font-black text-2xl text-[#ef6c00] tracking-wide uppercase">El Mundo de Inga</h1>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/medallas')}
            className="bg-[#fbc02d] hover:bg-[#f9a825] px-4 py-1.5 rounded-full font-black text-black flex items-center gap-2 shadow-sm border-b-4 border-[#e6a800] transition-colors cursor-pointer"
            title="Ver mi progreso"
          >
            <span className="material-symbols-outlined text-black">military_tech</span> {percentage}% Progreso
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 mt-8 space-y-12 relative">
        {/* Header Section */}
        <section className="flex justify-between items-center">
          <div className="space-y-4">
            <h2 className="font-black text-5xl text-[#5d4037]">El Mundo de Inga</h2>
            <div className="relative inline-block mt-4">
              <div className="bg-white border-2 border-[#ff9800] rounded-[2rem] rounded-bl-sm px-6 py-4 shadow-lg">
                <p className="font-bold text-xl text-gray-800">¡Hola amigo! ¿Listo para jugar?</p>
              </div>
              {/* Bubble tail */}
              <div className="absolute -bottom-3 left-4 w-6 h-6 bg-white border-b-2 border-l-2 border-[#ff9800] transform -rotate-45"></div>
            </div>
          </div>
          <div className="w-64 h-64 bg-gray-200 rounded-2xl overflow-hidden shadow-2xl shadow-gray-400/50">
            {/* Placeholder for 3D Girl Avatar */}
            <img src={imgDash} alt="Avatar Inga" className="w-full h-full object-cover" />
          </div>
        </section>

        {/* 4 Cards Section */}
        <section className="grid grid-cols-4 gap-6">
          <div 
            onClick={() => navigate('/simbolos')}
            className="h-64 bg-gradient-to-b from-[#4caf50] to-[#2e7d32] rounded-[2.5rem] relative overflow-hidden shadow-xl shadow-green-900/20 group cursor-pointer border-b-8 border-[#1b5e20] hover:-translate-y-2 transition-transform"
          >
            <div className="absolute top-6 left-1/2 -translate-x-1/2 w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30">
              <span className="material-symbols-outlined text-white text-3xl">local_florist</span>
            </div>
            <div className="absolute bottom-4 left-4 right-4 bg-[#f1f8e9] rounded-full py-3 text-center">
              <span className="font-bold text-[#2e7d32] text-lg leading-tight">Caminando por<br/>los Símbolos</span>
            </div>
          </div>

          <div 
            onClick={() => navigate('/medicina')}
            className="h-64 bg-gradient-to-b from-[#ff9800] to-[#e65100] rounded-[2.5rem] relative overflow-hidden shadow-xl shadow-orange-900/20 group cursor-pointer border-b-8 border-[#bf360c] hover:-translate-y-2 transition-transform"
          >
            <div className="absolute top-6 left-1/2 -translate-x-1/2 w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30">
              <span className="material-symbols-outlined text-white text-3xl">medical_services</span>
            </div>
            <div className="absolute bottom-4 left-4 right-4 bg-[#fff3e0] rounded-full py-3 text-center">
              <span className="font-bold text-[#e65100] text-lg">Botica Mágica</span>
            </div>
          </div>

          <div 
            onClick={() => navigate('/arte')}
            className="h-64 bg-gradient-to-b from-[#afb42b] to-[#827717] rounded-[2.5rem] relative overflow-hidden shadow-xl shadow-yellow-900/20 group cursor-pointer border-b-8 border-[#33691e] hover:-translate-y-2 transition-transform"
          >
            <div className="absolute top-6 left-1/2 -translate-x-1/2 w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30">
              <span className="material-symbols-outlined text-white text-3xl">palette</span>
            </div>
            <div className="absolute bottom-4 left-4 right-4 bg-[#f9fbe7] rounded-full py-3 text-center">
              <span className="font-bold text-[#827717] text-lg">Taller de Arte</span>
            </div>
          </div>

          <div 
            onClick={() => navigate('/territorio')}
            className="h-64 bg-gradient-to-b from-[#0288d1] to-[#01579b] rounded-[2.5rem] relative overflow-hidden shadow-xl shadow-blue-900/20 group cursor-pointer border-b-8 border-[#01579b] hover:-translate-y-2 transition-transform"
          >
            <div className="absolute top-6 left-1/2 -translate-x-1/2 w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30">
              <span className="material-symbols-outlined text-white text-3xl">eco</span>
            </div>
            <div className="absolute bottom-4 left-4 right-4 bg-[#e1f5fe] rounded-full py-3 text-center">
              <span className="font-bold text-[#01579b] text-lg leading-tight">Cuida el<br/>Territorio</span>
            </div>
          </div>
        </section>

        {/* Mapa de Aventuras */}
        <section 
          className="bg-[#f0ece1] rounded-[3rem] p-8 text-center shadow-inner relative border-b-8 border-[#e0d8c8] cursor-pointer hover:-translate-y-1 transition-transform"
          onClick={() => navigate('/medallas')}
        >
          <h3 className="font-bold text-xl text-[#5d4037] mb-6">Tu Mapa de Aventuras</h3>
          <div className="flex justify-center items-center gap-4">
            <div className="w-12 h-12 bg-[#64dd17] rounded-full border-4 border-[#33691e] shadow-inner"></div>
            <div className="w-12 h-12 bg-[#ff9100] rounded-full border-4 border-[#e65100] shadow-inner"></div>
            <div className="w-12 h-12 bg-[#ffea00] rounded-full border-4 border-[#f57f17] shadow-inner"></div>
            <div className="w-12 h-12 bg-[#03a9f4] rounded-full border-4 border-[#01579b] shadow-inner"></div>
            <div className="w-12 h-12 border-4 border-dashed border-[#bcaaa4] rounded-full"></div>
            <div className="w-12 h-12 border-4 border-dashed border-[#bcaaa4] rounded-full"></div>
            <span className="material-symbols-outlined text-[#bcaaa4] text-3xl">flag</span>
          </div>
          
          {/* Floating Megaphone Button */}
          <button className="absolute -right-6 -bottom-6 w-16 h-16 bg-[#ffea00] rounded-full border-b-4 border-[#f57f17] shadow-lg flex items-center justify-center transform hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-[#5d4037] text-2xl">campaign</span>
          </button>
        </section>
      </main>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default Dashboard;
