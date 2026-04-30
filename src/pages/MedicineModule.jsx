import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomNav } from '../components/Shared/BottomNav';

// Import medicine images
import imgMenta from '../img/menta.png';
import imgAloe from '../img/aloe.png';
import imgCorteza from '../img/corteza.png';
import imgFlor from '../img/flor.png';

// Import scenario images (problem and solution)
import imgDolorEstomago from '../img/dolorestomago.png';
import imgEstomagoCurado from '../img/estomagocurado.png';

import imgQuemaduraSol from '../img/quemaduradesol.png';
import imgPielCuradaSol from '../img/pielcuradadelsolpng.png';

import imgRodillaLastimada from '../img/rodillalastimada.png';
import imgRodillaCurada from '../img/rodillacurada.png';

import imgPicaduraBicho from '../img/picaduradebicho.png';
import imgInflamacionManzanilla from '../img/inflamacionmanzanilla.png';

const MedicineModule = () => {
  const navigate = useNavigate();
  const [currentScenario, setCurrentScenario] = useState(0);
  const [success, setSuccess] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [shuffledMedicines, setShuffledMedicines] = useState([]);

  const baseMedicines = [
    { id: 'm1', name: 'Menta Curativa', image: imgMenta, color: 'bg-[#ffeb3b]', border: 'border-[#fbc02d]', text: 'text-[#f57f17]' },
    { id: 'm2', name: 'Aloe Refrescante', image: imgAloe, color: 'bg-[#64dd17]', border: 'border-[#33691e]', text: 'text-[#1b5e20]' },
    { id: 'm3', name: 'Corteza Sagrada', image: imgCorteza, color: 'bg-[#ff9800]', border: 'border-[#e65100]', text: 'text-[#bf360c]' },
    { id: 'm4', name: 'Flores de Manzanilla', image: imgFlor, color: 'bg-[#29b6f6]', border: 'border-[#0288d1]', text: 'text-[#01579b]' }
  ];

  const scenarios = [
    { problem: '¡Me duele la barriguita!', solution: 'm1', successMsg: '¡Muy bien! La menta alivia el dolor de barriga.', imgProblem: imgDolorEstomago, imgSuccess: imgEstomagoCurado },
    { problem: '¡Me quemé con el sol!', solution: 'm2', successMsg: '¡Excelente! El aloe refresca y sana la piel.', imgProblem: imgQuemaduraSol, imgSuccess: imgPielCuradaSol },
    { problem: '¡Me raspe la rodilla!', solution: 'm3', successMsg: '¡Perfecto! La corteza sagrada ayuda a curar las heridas.', imgProblem: imgRodillaLastimada, imgSuccess: imgRodillaCurada },
    { problem: '¡Me picó un bichito!', solution: 'm4', successMsg: '¡Genial! La manzanilla desinflama y calma la picazón.', imgProblem: imgPicaduraBicho, imgSuccess: imgInflamacionManzanilla }
  ];

  // Shuffle medicines on load and when scenario changes
  useEffect(() => {
    const shuffled = [...baseMedicines].sort(() => 0.5 - Math.random());
    setShuffledMedicines(shuffled);
  }, [currentScenario]);

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-ES';
      speechSynthesis.speak(utterance);
    }
  };

  const handleDragStart = (e, med) => {
    e.dataTransfer.setData('medId', med.id);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const medId = e.dataTransfer.getData('medId');
    const scenario = scenarios[currentScenario];
    
    if (medId === scenario.solution) {
      setSuccess(true);
      setErrorText('');
      speakText(scenario.successMsg);
      
      setTimeout(() => {
        if (currentScenario < scenarios.length - 1) {
          setCurrentScenario(prev => prev + 1);
          setSuccess(false);
        } else {
          localStorage.setItem('inga_progress_medicina', 'completed');
          speakText('¡Has completado todas las curaciones!');
        }
      }, 3500);

    } else {
      setSuccess(false);
      setErrorText('Esa planta sirve para otra cosa. Intenta con otra.');
      speakText('Esa planta sirve para otra cosa. Intenta con otra.');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const isFullyComplete = currentScenario === scenarios.length - 1 && success;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fdf8e9] via-[#fdf8e9] to-[#e8f5d3] font-['Plus_Jakarta_Sans'] pb-32">
      {/* Top Bar */}
      <header className="flex justify-between items-center px-8 py-6 bg-white/50 backdrop-blur-sm rounded-b-[2rem] shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/hub')} className="bg-white rounded-full p-2 shadow-sm border-2 border-[#ef6c00] text-[#ef6c00] hover:bg-[#ef6c00] hover:text-white transition-colors">
            <span className="material-symbols-outlined text-2xl">arrow_back</span>
          </button>
          <h1 className="font-black text-2xl text-[#ef6c00] tracking-wide uppercase">Botica Mágica</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#ef6c00] shadow-sm border-2 border-[#ef6c00]">
            <span className="material-symbols-outlined">person</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 mt-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Side: Avatar & Problem */}
        <div className="bg-white rounded-[3rem] p-6 shadow-2xl relative border-b-8 border-gray-100">
          <div className="w-full aspect-square bg-[#fff8e1] rounded-[2rem] overflow-hidden relative flex items-center justify-center p-4">
            <img src={scenarios[currentScenario].imgProblem} alt="Problema" className={`w-full h-full object-contain ${success ? 'opacity-0 scale-95' : 'opacity-100 scale-100'} transition-all duration-500`} />
            <img src={scenarios[currentScenario].imgSuccess} alt="Curado" className={`absolute w-full h-full object-contain p-4 ${success ? 'opacity-100 scale-100' : 'opacity-0 scale-110'} transition-all duration-500`} />
          </div>
          
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[90%] bg-white rounded-[2rem] p-4 text-center shadow-xl border-b-4 border-gray-100 flex items-center justify-between px-6">
            <p className="font-bold text-[#5d4037] text-lg">
              {success ? scenarios[currentScenario].successMsg : scenarios[currentScenario].problem}
            </p>
            <button 
              onClick={() => speakText(success ? scenarios[currentScenario].successMsg : scenarios[currentScenario].problem)}
              className="w-10 h-10 bg-[#ef6c00] text-white rounded-full flex items-center justify-center shadow-md hover:bg-[#e65100] flex-shrink-0 ml-2"
            >
              <span className="material-symbols-outlined">volume_up</span>
            </button>
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-white transform rotate-45"></div>
          </div>
        </div>

        {/* Right Side: Options & Dropzone */}
        <div className="space-y-8">
          <div className="flex justify-between items-center px-4">
            <h3 className="font-black text-[#8d6e63] tracking-wider uppercase text-xl md:text-2xl">
              {isFullyComplete ? "¡FELICIDADES!" : "¡ELIGE UNA MEDICINA!"}
            </h3>
            <div className="flex gap-2">
              {scenarios.map((_, i) => (
                <div key={i} className={`w-6 h-6 rounded-full shadow-inner ${i < currentScenario || (i === currentScenario && success) ? 'bg-[#64dd17]' : i === currentScenario ? 'bg-[#ffeb3b]' : 'bg-[#e0e0e0]'}`}></div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {shuffledMedicines.map((med) => (
              <div 
                key={med.id}
                draggable={!isFullyComplete}
                onDragStart={(e) => handleDragStart(e, med)}
                className={`rounded-[2rem] p-4 shadow-xl border-b-8 transition-transform ${isFullyComplete ? 'opacity-50 grayscale' : 'cursor-pointer hover:-translate-y-2'} ${med.color} ${med.border}`}
              >
                <div className="bg-white aspect-square rounded-xl overflow-hidden mb-3 border-4 border-white relative">
                  <img src={med.image} alt={med.name} className="w-full h-full object-cover" draggable="false" />
                  <button 
                    onClick={(e) => { e.stopPropagation(); speakText(med.name); }}
                    className="absolute bottom-1 right-1 w-8 h-8 bg-white/90 text-[#5d4037] rounded-full flex items-center justify-center shadow-md backdrop-blur-sm"
                  >
                    <span className="material-symbols-outlined text-sm">volume_up</span>
                  </button>
                </div>
                <p className={`text-center font-bold text-[11px] leading-tight ${med.text}`}>{med.name}</p>
              </div>
            ))}
          </div>

          {errorText && (
            <div className="bg-red-100 text-red-700 p-4 rounded-xl font-bold text-center border-2 border-red-300 animate-pulse">
              {errorText}
            </div>
          )}

          {/* Dropzone */}
          <div 
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className={`h-32 border-4 border-dashed rounded-[3rem] flex items-center justify-center gap-4 transition-colors ${success ? 'bg-[#e8f5e9] border-[#4caf50] text-[#2e7d32]' : 'border-[#bcaaa4] bg-white/50 text-[#8d6e63]'}`}
          >
            {isFullyComplete ? (
              <>
                <span className="material-symbols-outlined text-5xl text-[#ffeb3b]">military_tech</span>
                <span className="font-black text-2xl tracking-wider uppercase text-[#f57f17]">¡NIVEL COMPLETADO!</span>
              </>
            ) : success ? (
              <>
                <span className="material-symbols-outlined text-5xl">volunteer_activism</span>
                <span className="font-black text-2xl tracking-wider uppercase">¡Curado!</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-4xl">local_pharmacy</span>
                <span className="font-black text-xl tracking-wider uppercase">ARRASTRA LA HOJITA AQUÍ</span>
              </>
            )}
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default MedicineModule;
