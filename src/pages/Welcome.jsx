import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import avatarBoy from '../assets/avatar1.png';
import avatarGirl from '../assets/avatar2.png';

const Welcome = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState(null); // 'student' or 'teacher'

  const selectAvatar = (type) => {
    localStorage.setItem('inga_avatar', type);
    navigate('/hub'); // El Mundo de Inga (Dashboard)
  };

  if (role === 'student') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#fdf8e9] to-[#e8f5d3] flex flex-col items-center justify-center p-6 font-['Plus_Jakarta_Sans']">
        <h1 className="text-4xl font-black text-[#5d4037] mb-8 text-center">Elige tu compañero de viaje</h1>
        <div className="flex gap-8">
          <div 
            onClick={() => selectAvatar('boy')}
            className="cursor-pointer group flex flex-col items-center"
          >
            <div className="w-40 h-40 rounded-full border-8 border-white shadow-xl overflow-hidden group-hover:scale-105 transition-transform bg-[#ffca28]">
              <img src={avatarBoy} alt="Niño Inga" className="w-full h-full object-cover" />
            </div>
            <span className="mt-4 text-xl font-bold text-[#e65100] bg-white px-6 py-2 rounded-full shadow-md">Juanito </span>
          </div>
          <div 
            onClick={() => selectAvatar('girl')}
            className="cursor-pointer group flex flex-col items-center"
          >
            <div className="w-40 h-40 rounded-full border-8 border-white shadow-xl overflow-hidden group-hover:scale-105 transition-transform bg-[#64dd17]">
              <img src={avatarGirl} alt="Niña Inga" className="w-full h-full object-cover" />
            </div>
            <span className="mt-4 text-xl font-bold text-[#2e7d32] bg-white px-6 py-2 rounded-full shadow-md">Nina </span>
          </div>
        </div>
        <button onClick={() => setRole(null)} className="mt-12 text-[#8d6e63] font-bold underline">Volver</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdf8e9] to-[#e8f5d3] flex flex-col items-center justify-center p-6 font-['Plus_Jakarta_Sans']">
      <div className="bg-white/80 backdrop-blur-md p-10 rounded-[3rem] shadow-2xl border-b-8 border-gray-200 text-center max-w-md w-full">
        <div className="w-24 h-24 mx-auto bg-[#ffca28] rounded-full flex items-center justify-center shadow-inner mb-6 border-4 border-white">
          <span className="material-symbols-outlined text-5xl text-white">public</span>
        </div>
        <h1 className="text-4xl font-black text-[#e65100] mb-2 uppercase tracking-tight">Mundo Inga</h1>
        <p className="text-[#8d6e63] font-bold mb-10">Sabiduría Ancestral Digital</p>

        <div className="space-y-4">
          <button 
            onClick={() => setRole('student')}
            className="w-full bg-gradient-to-r from-[#81c784] to-[#388e3c] text-white font-bold text-xl py-4 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all border-b-4 border-[#1b5e20] flex items-center justify-center gap-3"
          >
            <span className="material-symbols-outlined text-2xl">sports_esports</span>
            Jugar como Estudiante
          </button>
          
          <button 
            onClick={() => navigate('/admin')}
            className="w-full bg-white text-[#5d4037] font-bold text-xl py-4 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all border-b-4 border-gray-200 flex items-center justify-center gap-3"
          >
            <span className="material-symbols-outlined text-2xl">school</span>
            Panel Docente (Admin)
          </button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
