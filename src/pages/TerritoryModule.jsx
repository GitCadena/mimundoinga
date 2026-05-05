import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './TerritoryModule.css';
import { PedagogicalGuide } from '../components/Shared/PedagogicalGuide';

// Import cartoon backgrounds
import bgRio from '../img/rio_infantil.png';
import bgChagra from '../img/chagra_infantil.png';
import bgCamino from '../img/camino_infantil.png';
import imgAvatar from '../img/avatar_inga_infantil.png';
import imgBasura1 from '../img/basura1.png';
import imgBasura2 from '../img/basura2.png';
import imgBasura3 from '../img/basura3.png';
import imgBasura4 from '../img/basura4.png';

const SCENARIOS = [
  {
    id: 'rio',
    name: 'El Río',
    ingaName: 'Iaku',
    bgImg: bgRio,
    items: [
      { id: 'item-1', type: 'bottle', top: '45%', left: '30%', img: imgBasura1, className: 'animate-bounce-slow' },
      { id: 'item-2', type: 'can', top: '70%', left: '50%', img: imgBasura2, className: 'animate-float' },
      { id: 'item-3', type: 'bottle', top: '60%', left: '60%', img: imgBasura3, className: 'animate-bounce-slow' },
    ],
    feedback: {
      es: 'El agua es la sangre de nuestra madre tierra. Debemos cuidarla para que siga dándonos vida.',
      inga: 'Iaku suma kaugsaita kuam ka. Iakuta cuidanakunchi.',
    }
  },
  {
    id: 'chagra',
    name: 'La Chagra',
    ingaName: 'Chagra',
    bgImg: bgChagra,
    items: [
      { id: 'item-4', type: 'debris', top: '40%', left: '20%', img: imgBasura4, className: 'animate-wiggle' },
      { id: 'item-5', type: 'glass', top: '60%', left: '40%', img: imgBasura3, className: 'animate-pulse-slow' },
      { id: 'item-6', type: 'glass', top: '55%', left: '80%', img: imgBasura2, className: 'animate-wiggle' },
    ],
    feedback: {
      es: 'La tierra nos alimenta. Si la ensuciamos, enfermamos. Sanémosla juntos.',
      inga: 'Allpa mikui kuam ka. Allpata mapayachispa unguii tian.',
    }
  },
  {
    id: 'camino',
    name: 'El Camino',
    ingaName: 'Nambita',
    bgImg: bgCamino,
    items: [
      { id: 'item-7', type: 'wrapper', top: '58%', left: '45%', img: imgBasura3, className: 'animate-float' },
      { id: 'item-8', type: 'paper', top: '85%', left: '65%', img: imgBasura4, className: 'animate-bounce-slow' },
      { id: 'item-9', type: 'wrapper', top: '85%', left: '45%', img: imgBasura1, className: 'animate-float' },
    ],
    feedback: {
      es: 'El camino nos conecta con los espíritus del bosque. Debe estar limpio para escuchar sus voces.',
      inga: 'Nambita kawsaiwa sugllai ka. Suma nambitapi rimanakunchi.',
    }
  }
];

const TerritoryModule = () => {
  const navigate = useNavigate();
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [activeItems, setActiveItems] = useState(SCENARIOS[0].items);
  const [isCleaned, setIsCleaned] = useState(false);
  const [showParticle, setShowParticle] = useState(null);
  const [gameFinished, setGameFinished] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-ES';
      window.speechSynthesis.speak(utterance);
    }
  };
  
  // Evaluation Stats
  const [startTime, setStartTime] = useState(Date.now());
  const [stats, setStats] = useState({ seconds: 0, errors: 0 });

  const currentLevel = SCENARIOS[currentLevelIndex];

  useEffect(() => {
    setActiveItems(currentLevel.items);
    setIsCleaned(false);
    setStartTime(Date.now());
  }, [currentLevelIndex]);

  useEffect(() => {
    if (activeItems.length === 0 && !isCleaned && !gameFinished) {
      setIsCleaned(true);
      const timeTaken = Math.floor((Date.now() - startTime) / 1000);
      setStats(prev => ({ ...prev, seconds: prev.seconds + timeTaken }));
    }
  }, [activeItems, isCleaned, startTime, gameFinished]);

  const handleItemClick = (id, e) => {
    e.stopPropagation();
    setShowParticle(id);
    setTimeout(() => {
      setActiveItems(prev => prev.filter(item => item.id !== id));
      setShowParticle(null);
    }, 500);
  };

  const handleBackgroundClick = () => {
    if (!isCleaned) {
      setStats(prev => ({ ...prev, errors: prev.errors + 1 }));
    }
  };

  const nextLevel = () => {
    if (currentLevelIndex < SCENARIOS.length - 1) {
      setCurrentLevelIndex(prev => prev + 1);
    } else {
      setGameFinished(true);
      localStorage.setItem('inga_progress_territorio', 'completed');
      // Play final voice synthesis
      const msg = new SpeechSynthesisUtterance("¡Felicidades, Guardián del Territorio! Has devuelto la armonía a nuestra Casa Grande.");
      msg.lang = 'es-CO';
      window.speechSynthesis.speak(msg);
    }
  };

  return (
    <div className="min-h-screen bg-[#1b5e20]/20 backdrop-blur-[2px] font-['Plus_Jakarta_Sans'] flex flex-col relative overflow-hidden">
      {/* Header */}
      <header className="absolute top-0 w-full z-20 flex justify-between items-center p-6 bg-gradient-to-b from-black/60 to-transparent">
        <button 
          onClick={() => navigate('/hub')}
          className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-[#1b5e20] transition-colors shadow-lg border border-white/30"
          title="Volver al Mapa"
        >
          <span className="material-symbols-outlined text-3xl">arrow_back</span>
        </button>
        <h1 className="text-white text-2xl font-black tracking-wider uppercase drop-shadow-md">
          Cuida el Territorio
        </h1>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsInfoOpen(true)}
            className="w-12 h-12 bg-[#ff9800] rounded-full flex items-center justify-center text-white shadow-lg border-b-4 border-[#e65100] hover:scale-105 transition-transform"
            title="Guía de Territorio"
          >
            <span className="material-symbols-outlined text-3xl">info</span>
          </button>
          <div className="bg-white/20 backdrop-blur-md px-6 py-2 rounded-full border border-white/30 text-white font-bold flex gap-4">
            <span>Nivel {currentLevelIndex + 1}/{SCENARIOS.length}</span>
            <span className="text-red-300">Errores: {stats.errors}</span>
          </div>
        </div>
      </header>

      {/* Main Scenario */}
  <main 
    className={`flex-1 relative transition-all duration-1000 bg-cover bg-center ${isCleaned ? 'cleaned' : 'polluted'}`}
    style={{ backgroundImage: `url(${currentLevel.bgImg})` }}
    onClick={handleBackgroundClick}
  >
    <PedagogicalGuide 
      isOpen={isInfoOpen} 
      onClose={() => setIsInfoOpen(false)}
      title="Guardianes de la Casa Grande"
      description="Para el pueblo Inga, el territorio es nuestra madre. Cuidar el agua y la tierra es cuidar la vida."
      items={[
        { name: "El Río (Iaku)", meaning: "El agua limpia es sagrada. No debemos arrojar basura que enferme a los peces.", icon: "water" },
        { name: "La Chagra", meaning: "Es donde sembramos nuestro alimento. Debe estar limpia para que la tierra sea fértil.", icon: "agriculture" },
        { name: "El Camino (Nambita)", meaning: "Por aquí caminamos hacia el saber. Mantenerlo limpio es señal de respeto.", icon: "nature_people" },
        { name: "Tu Misión", meaning: "Haz clic en todos los elementos extraños (basura) para devolverle la salud al territorio.", icon: "auto_fix_high" }
      ]}
    />
        {/* Avatars */}
        <div className="absolute bottom-8 left-8 z-30 flex items-end gap-4 drop-shadow-2xl">
          <div className="w-36 h-36 bg-[#ffeb3b] rounded-full border-4 border-white shadow-xl overflow-hidden flex items-center justify-center relative animate-bounce-slow">
             <img src={imgAvatar} alt="Avatar" className="w-full h-full object-cover" />
          </div>
          <div className="bg-white p-6 rounded-[2rem] rounded-bl-sm shadow-2xl max-w-md border-b-4 border-green-600 relative">
            <div className="absolute -left-4 bottom-8 w-6 h-6 bg-white transform rotate-45"></div>
            <h3 className="font-black text-xl text-green-800 mb-2 pr-12">{currentLevel.name} ({currentLevel.ingaName})</h3>
            <p className="text-gray-700 font-medium mb-2">{currentLevel.feedback.es}</p>
            <p className="text-green-700 italic font-bold">"{currentLevel.feedback.inga}"</p>
            <button 
              onClick={(e) => { 
                e.stopPropagation(); 
                speakText(`${currentLevel.feedback.es}. ${currentLevel.feedback.inga}`); 
              }}
              className="absolute top-4 right-4 w-10 h-10 bg-[#ef6c00] text-white rounded-full flex items-center justify-center shadow-md hover:bg-[#e65100]"
            >
              <span className="material-symbols-outlined">volume_up</span>
            </button>
          </div>
        </div>

        {/* Garbage Items */}
        {activeItems.map(item => (
          <div 
            key={item.id}
            className={`absolute cursor-pointer transition-transform hover:scale-125 ${item.className} ${showParticle === item.id ? 'animate-ping opacity-0' : ''}`}
            style={{ top: item.top, left: item.left }}
            onClick={(e) => handleItemClick(item.id, e)}
            title="Limpiar"
          >
            <img src={item.img} alt="basura" className="w-16 h-16 md:w-20 md:h-20 object-contain drop-shadow-xl" />
          </div>
        ))}

        {/* Next Level / Success State */}
        {isCleaned && !gameFinished && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 text-center animate-bounce">
            <button 
              onClick={nextLevel}
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-black text-2xl shadow-[0_8px_0_#1b5e20] hover:shadow-[0_4px_0_#1b5e20] hover:translate-y-1 transition-all border-4 border-white"
            >
              ¡Sanado! Siguiente Nivel <span className="material-symbols-outlined align-middle ml-2">arrow_forward</span>
            </button>
          </div>
        )}

        {/* Game Finished State */}
        {gameFinished && (
          <div className="absolute inset-0 bg-black/60 z-50 flex flex-col items-center justify-center p-8 text-center backdrop-blur-sm">
            <div className="bg-white rounded-[3rem] p-12 max-w-2xl border-8 border-green-500 shadow-2xl transform hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-8xl text-yellow-400 mb-6 drop-shadow-lg">workspace_premium</span>
              <h2 className="text-5xl font-black text-green-800 mb-6">¡Guardián del Territorio!</h2>
              <p className="text-2xl text-gray-700 mb-8 font-medium">Has devuelto la armonía a nuestra Casa Grande.</p>
              <div className="bg-green-50 p-6 rounded-2xl mb-8 flex justify-around">
                <div>
                  <p className="text-sm text-gray-500 uppercase font-bold">Tiempo Total</p>
                  <p className="text-3xl font-black text-green-600">{stats.seconds}s</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 uppercase font-bold">Errores</p>
                  <p className="text-3xl font-black text-red-500">{stats.errors}</p>
                </div>
              </div>
              <button 
                onClick={() => navigate('/hub')}
                className="bg-gradient-to-r from-green-500 to-green-700 text-white px-10 py-4 rounded-full font-black text-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all w-full"
              >
                Volver al Mapa
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default TerritoryModule;
