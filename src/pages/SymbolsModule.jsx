import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSymbols } from '../data/symbols';
import avatarBoy from '../assets/avatar1.png';
import avatarGirl from '../assets/avatar2.png';
import { BottomNav } from '../components/Shared/BottomNav';

const SymbolsModule = () => {
  const navigate = useNavigate();
  const [symbols, setSymbols] = useState([]);
  const [meanings, setMeanings] = useState([]);
  const [matches, setMatches] = useState({});
  const [feedback, setFeedback] = useState({ message: '', type: '' });

  const playSpeech = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-ES';
      speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    const loadedSymbols = getSymbols();
    // Select 4 random items for a session
    const gameItems = [...loadedSymbols].sort(() => 0.5 - Math.random()).slice(0, 4);
    setSymbols(gameItems);
    
    // Shuffle meanings for the drop targets
    const shuffledMeanings = [...gameItems].sort(() => 0.5 - Math.random());
    setMeanings(shuffledMeanings);
  }, []);

  const handleDragStart = (e, symbol) => {
    e.dataTransfer.setData('symbolId', symbol.id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, meaningObj) => {
    e.preventDefault();
    const draggedSymbolId = e.dataTransfer.getData('symbolId');
    
    if (draggedSymbolId === meaningObj.id) {
      setMatches(prev => {
        const newMatches = { ...prev, [meaningObj.id]: true };
        if (Object.keys(newMatches).length === symbols.length) {
          localStorage.setItem('inga_progress_simbolos', 'completed');
        }
        return newMatches;
      });
      setFeedback({ message: '¡Insignia de Sabiduría ganada!', type: 'success' });
      playSuccessSound();
    } else {
      setFeedback({ message: 'Inténtalo de nuevo, escucha el saber de los mayores.', type: 'error' });
      playErrorSound();
    }

    setTimeout(() => setFeedback({ message: '', type: '' }), 3000);
  };

  const playSuccessSound = () => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, audioCtx.currentTime); 
      osc.frequency.exponentialRampToValueAtTime(1046.50, audioCtx.currentTime + 0.1); 
      gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.5);
    } catch(e) {}
  };

  const playErrorSound = () => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(200, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(150, audioCtx.currentTime + 0.3);
      gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.3);
    } catch(e) {}
  };

  const isComplete = symbols.length > 0 && Object.keys(matches).length === symbols.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#81c784] to-[#388e3c] font-['Plus_Jakarta_Sans'] pb-32 relative overflow-hidden flex flex-col">
      {/* Decorative Texture Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>

      {/* Top Bar */}
      <header className="flex justify-between items-center px-8 py-6 bg-white/30 backdrop-blur-md rounded-b-[2rem] shadow-sm relative z-10">
        <div className="flex items-center gap-3">
          <button 
            className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#2e7d32] shadow-sm hover:scale-105 transition-transform"
            onClick={() => navigate('/hub')}
          >
            <span className="material-symbols-outlined text-3xl">arrow_back</span>
          </button>
          <h1 className="font-black text-2xl text-white tracking-wide uppercase">Caminando por los Símbolos</h1>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 mt-8 flex-1 w-full relative z-10 flex flex-col items-center">
        
        {/* 
          CRITERIO DE ACTITUD: 
          El saludo en lengua Inga por parte de los avatares busca generar un vínculo 
          emocional y respeto hacia la cultura propia desde el primer impacto visual.
        */}
        <div className="flex items-end gap-4 mb-8">
          <div className="flex -space-x-4">
            <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg overflow-hidden bg-[#ffca28] relative z-10">
              <img src={avatarBoy} alt="Niño" className="w-full h-full object-cover" />
            </div>
            <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg overflow-hidden bg-[#ef6c00] relative z-0">
              <img src={avatarGirl} alt="Niña" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="bg-white px-6 py-4 rounded-[2rem] rounded-bl-sm shadow-xl border-b-4 border-gray-100 relative mb-4 flex items-center gap-4">
            <p className="font-bold text-[#5d4037] text-lg">Alliura samungichi (Bienvenidos)</p>
            <button 
              onClick={() => playSpeech("Alliura samungichi. Bienvenidos.")}
              className="w-8 h-8 bg-[#ef6c00] text-white rounded-full flex items-center justify-center shadow-md hover:bg-[#e65100]"
            >
              <span className="material-symbols-outlined text-sm">volume_up</span>
            </button>
          </div>
        </div>

        {/* Feedback Alert */}
        <div className="h-12 w-full flex justify-center mb-4">
          {feedback.message && (
            <div className={`px-8 py-2 rounded-full font-bold shadow-lg animate-bounce ${feedback.type === 'success' ? 'bg-[#ffeb3b] text-[#f57f17] border-2 border-[#fbc02d]' : 'bg-[#e53935] text-white border-2 border-[#b71c1c]'}`}>
              {feedback.message}
            </div>
          )}
        </div>

        {isComplete ? (
          <div className="bg-white rounded-[3rem] p-12 text-center shadow-2xl border-b-8 border-gray-200 animate-pulse">
            <span className="material-symbols-outlined text-8xl text-[#ffeb3b] filter drop-shadow-md mb-4">military_tech</span>
            <h2 className="text-4xl font-black text-[#5d4037] mb-4">¡Felicidades!</h2>
            <p className="text-xl font-bold text-gray-500 mb-8">Has completado este camino de sabiduría.</p>
            <button 
              className="bg-gradient-to-r from-[#ff9800] to-[#ef6c00] text-white font-bold text-xl px-8 py-4 rounded-full shadow-lg border-b-4 border-[#e65100] hover:-translate-y-1 transition-transform"
              onClick={() => window.location.reload()}
            >
              Jugar de nuevo
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full">
            {/* 
              CRITERIO DE IDENTIFICACIÓN: 
              El estudiante debe reconocer visualmente la iconografía Inga 
              (arrastrando las imágenes).
            */}
            <div className="bg-white/90 backdrop-blur-sm rounded-[3rem] p-8 shadow-2xl border-b-8 border-gray-100">
              <h2 className="font-black text-2xl text-[#2e7d32] mb-6 text-center uppercase">1. Símbolos Inga</h2>
              <div className="grid grid-cols-2 gap-6">
                {symbols.map(symbol => {
                  if (matches[symbol.id]) return null;
                  return (
                    <div 
                      key={symbol.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, symbol)}
                      className="cursor-grab active:cursor-grabbing hover:scale-105 transition-transform flex flex-col items-center"
                    >
                      <div className="w-24 h-24 rounded-[2rem] border-4 border-white shadow-lg flex items-center justify-center relative group" style={{ backgroundColor: symbol.color }}>
                        {symbol.image ? (
                          <img src={symbol.image} alt={symbol.name} className="w-16 h-16 object-contain" draggable="false" />
                        ) : (
                          <span className="text-white text-3xl font-black">{symbol.name[0]}</span>
                        )}
                        <div className="absolute inset-0 opacity-20 border-2 border-dashed border-white rounded-[1.8rem]"></div>
                        {/* Sound Icon overlay */}
                        <button 
                          onClick={(e) => { e.stopPropagation(); playSpeech(symbol.name); }}
                          className="absolute bottom-1 right-1 w-6 h-6 bg-white/80 rounded-full flex items-center justify-center text-[#2e7d32] shadow-sm hover:scale-110 z-20"
                        >
                          <span className="material-symbols-outlined text-[14px]">volume_up</span>
                        </button>
                      </div>
                      <span className="mt-3 font-bold text-sm bg-[#e8f5e9] text-[#2e7d32] px-4 py-1 rounded-full shadow-sm">{symbol.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 
              CRITERIO DE INTERPRETACIÓN:
              El estudiante asocia el nombre y significado con la representación gráfica, 
              comprendiendo que no es solo un dibujo sino un concepto profundo.
            */}
            <div className="bg-white/90 backdrop-blur-sm rounded-[3rem] p-8 shadow-2xl border-b-8 border-gray-100 flex flex-col gap-4">
              <h2 className="font-black text-2xl text-[#e65100] mb-2 text-center uppercase">2. Significados</h2>
              {meanings.map(meaningObj => {
                const isMatched = matches[meaningObj.id];
                return (
                  <div 
                    key={meaningObj.id}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, meaningObj)}
                    className={`p-4 rounded-2xl border-4 transition-colors relative flex items-center justify-between ${isMatched ? 'bg-[#f1f8e9] border-[#81c784]' : 'bg-[#fff3e0] border-dashed border-[#ffb74d]'}`}
                  >
                    {isMatched ? (
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full border-2 border-white shadow-sm flex items-center justify-center text-white font-bold" style={{ backgroundColor: meaningObj.color }}>
                          <span className="material-symbols-outlined">check</span>
                        </div>
                        <div>
                          <p className="font-bold text-[#2e7d32]">{meaningObj.name}</p>
                          <p className="text-xs font-bold text-gray-500">{meaningObj.meaning}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-12 w-full">
                        <p className="font-bold text-[#e65100] text-center">¿Cuál es: {meaningObj.name}?</p>
                      </div>
                    )}
                    <button 
                      onClick={(e) => { e.stopPropagation(); playSpeech(isMatched ? meaningObj.meaning : `¿Cuál es: ${meaningObj.name}?`); }}
                      className={`w-8 h-8 rounded-full flex items-center justify-center shadow-sm hover:scale-110 ml-2 flex-shrink-0 ${isMatched ? 'bg-[#81c784] text-white' : 'bg-[#ffcc80] text-[#e65100]'}`}
                    >
                      <span className="material-symbols-outlined text-sm">volume_up</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>
      
      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default SymbolsModule;
