import React from 'react';

export const PedagogicalGuide = ({ isOpen, onClose, title, description, items = [] }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-[#fdf8e9] w-full max-w-2xl max-h-[80vh] rounded-[2.5rem] shadow-2xl overflow-hidden border-8 border-[#ef6c00] flex flex-col">
        <div className="bg-[#ef6c00] p-6 text-white flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-4xl">menu_book</span>
            <h2 className="text-2xl font-black uppercase tracking-wider">{title || "Guía Pedagógica"}</h2>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/40 transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        
        <div className="p-8 overflow-y-auto space-y-6">
          <p className="text-[#5d4037] text-lg font-bold">
            {description || "¡Bienvenido explorador! Conoce más sobre este desafío:"}
          </p>
          
          <div className="grid gap-4">
            {items.map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-3xl shadow-md border-b-4 border-gray-200 flex gap-4 items-start">
                <div className="w-12 h-12 bg-[#fff3e0] text-[#ef6c00] rounded-2xl flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-3xl">{item.icon || 'star'}</span>
                </div>
                <div>
                  <h3 className="font-black text-xl text-[#ef6c00] mb-1">{item.name}</h3>
                  <p className="text-gray-700 leading-relaxed">{item.meaning}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-[#e8f5e9] p-6 rounded-3xl border-2 border-[#4caf50]">
            <h4 className="font-bold text-[#2e7d32] mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined">lightbulb</span> Sabías que...
            </h4>
            <p className="text-[#1b5e20]">
              Para el pueblo Inga, el arte no es solo decoración, es una forma de escribir su historia y mantener viva su cultura.
            </p>
          </div>
        </div>
        
        <div className="p-6 bg-white border-t-2 border-gray-100 text-center">
          <button 
            onClick={onClose}
            className="bg-[#ef6c00] text-white px-12 py-3 rounded-full font-black text-lg shadow-lg border-b-4 border-[#bf360c] active:translate-y-1 transition-all"
          >
            ¡ENTENDIDO, VAMOS A JUGAR!
          </button>
        </div>
      </div>
    </div>
  );
};
