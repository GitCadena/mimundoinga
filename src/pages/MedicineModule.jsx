import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomNav } from '../components/Shared/BottomNav';
import { PedagogicalGuide } from '../components/Shared/PedagogicalGuide';

// Import medicine images
import imgMenta from '../img/menta.png';
import imgAloe from '../img/aloe.png';
import imgCorteza from '../img/corteza.png';
import imgFlor from '../img/flor.png';
import imgDienteDeLeon from '../img/dientedeleon.png';
import imgToronjil from '../img/toronjil.png';
import imgCalendula from '../img/calendula.png';

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
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  const baseMedicines = [
    { id: 'm1', name: 'Diente de León', image: imgDienteDeLeon, color: 'bg-[#fff9c4]', border: 'border-[#fbc02d]', text: 'text-[#f57f17]', description: 'Limpia nuestra sangre y nos da fuerza para caminar por el territorio.' },
    { id: 'm2', name: 'Manzanilla', image: imgFlor, color: 'bg-[#e1f5fe]', border: 'border-[#0288d1]', text: 'text-[#01579b]', description: 'Calma los dolores, desinflama el cuerpo y nos ayuda a descansar mejor.' },
    { id: 'm3', name: 'Hierbabuena', image: imgMenta, color: 'bg-[#f1f8e9]', border: 'border-[#388e3c]', text: 'text-[#1b5e20]', description: 'Es la mejor amiga del estómago (Uigsa). Quita el dolor y la pesadez.' },
    { id: 'm4', name: 'Sábila', image: imgAloe, color: 'bg-[#e8f5e9]', border: 'border-[#43a047]', text: 'text-[#1b5e20]', description: 'Refresca nuestra piel y ayuda a sanar las quemaduras del sol.' },
    { id: 'm5', name: 'Caléndula', image: imgCalendula, color: 'bg-[#fff3e0]', border: 'border-[#fb8c00]', text: 'text-[#e65100]', description: 'Limpia y cierra las heridas para que nuestra piel sane rápido.' },
    { id: 'm6', name: 'Toronjil', image: imgToronjil, color: 'bg-[#f3e5f5]', border: 'border-[#8e24aa]', text: 'text-[#4a148c]', description: 'Tranquiliza el corazón y nos ayuda a estar alegres y en armonía.' }
  ];

  const scenarios = [
    { 
      id: 'purificacion',
      problem: 'Siento mi cuerpo pesado, necesito una limpieza interna.', 
      solution: 'm1', 
      successMsg: '¡Excelente! El Diente de León limpió tu sangre y te devolvió la fuerza.', 
      imgProblem: imgDolorEstomago, 
      imgSuccess: imgEstomagoCurado 
    },
    { 
      id: 'digestion',
      problem: '¡Ay! Comí mucho y mi estómago (Uigsa) me duele.', 
      solution: 'm3', 
      successMsg: '¡Muy bien! La Hierbabuena es la mejor amiga del Uigsa.', 
      imgProblem: imgDolorEstomago, 
      imgSuccess: imgEstomagoCurado 
    },
    { 
      id: 'descanso',
      problem: 'Tengo un dolor que no me deja tranquilo ni dormir.', 
      solution: 'm2', 
      successMsg: '¡Perfecto! La Manzanilla te ayudará a descansar profundamente.', 
      imgProblem: imgPicaduraBicho, 
      imgSuccess: imgInflamacionManzanilla 
    },
    { 
      id: 'heridas',
      problem: 'Me caí jugando y tengo una herida que me arde.', 
      solution: 'm5', 
      successMsg: '¡Genial! La Caléndula cerrará tu herida rápidamente.', 
      imgProblem: imgRodillaLastimada, 
      imgSuccess: imgRodillaCurada 
    },
    { 
      id: 'emocional',
      problem: 'Tuve un susto y mi corazón late muy rápido.', 
      solution: 'm6', 
      successMsg: '¡Qué bien! El Toronjil trajo armonía a tu corazón.', 
      imgProblem: imgPicaduraBicho, 
      imgSuccess: imgInflamacionManzanilla 
    },
    { 
      id: 'piel',
      problem: 'Estuve mucho al sol y mi piel siente mucho calor.', 
      solution: 'm4', 
      successMsg: '¡Muy bien! La Sábila refrescó y sanó tu piel.', 
      imgProblem: imgQuemaduraSol, 
      imgSuccess: imgPielCuradaSol 
    }
  ];

  // Shuffle medicines on load and when scenario changes
  useEffect(() => {
    const shuffled = [...baseMedicines].sort(() => 0.5 - Math.random());
    setShuffledMedicines(shuffled);
  }, [currentScenario]);

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel(); // Cancel current speech to avoid overlap
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-ES';
      utterance.rate = 0.9;
      speechSynthesis.speak(utterance);
    }
  };

  const handleDragStart = (e, med) => {
    e.dataTransfer.setData('medId', med.id);
    speakText(med.description);
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
          speakText('¡Has completado todas las curaciones, Guardián de la Chagra!');
        }
      }, 4000);

    } else {
      setSuccess(false);
      const wrongMed = baseMedicines.find(m => m.id === medId);
      setErrorText(`${wrongMed.name} sirve para otra cosa. Intenta con otra.`);
      speakText(`${wrongMed.name} sirve para otra cosa. Intenta con otra.`);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const isFullyComplete = currentScenario === scenarios.length - 1 && success;

  return (
    <div className="min-h-screen bg-white/40 backdrop-blur-[2px] font-['Plus_Jakarta_Sans'] pb-32">
      {/* Top Bar */}
      <header className="flex justify-between items-center px-8 py-6 bg-white/50 backdrop-blur-sm rounded-b-[2rem] shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/hub')} className="bg-white rounded-full p-2 shadow-sm border-2 border-[#ef6c00] text-[#ef6c00] hover:bg-[#ef6c00] hover:text-white transition-colors">
            <span className="material-symbols-outlined text-2xl">arrow_back</span>
          </button>
          <h1 className="font-black text-2xl text-[#ef6c00] tracking-wide uppercase">Botica Mágica</h1>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsInfoOpen(true)}
            className="w-12 h-12 bg-[#4caf50] rounded-full flex items-center justify-center text-white shadow-lg border-b-4 border-[#2e7d32] hover:scale-105 transition-transform"
            title="Ver Guía de Plantas"
          >
            <span className="material-symbols-outlined text-3xl">info</span>
          </button>
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#ef6c00] shadow-sm border-2 border-[#ef6c00]">
            <span className="material-symbols-outlined">person</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 mt-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <PedagogicalGuide 
          isOpen={isInfoOpen} 
          onClose={() => setIsInfoOpen(false)}
          title="Botica Ancestral Inga"
          description="Nuestras plantas son regalo de la Madre Tierra para sanar el cuerpo y el espíritu."
          items={[
            { name: "Diente de León", meaning: "Limpia nuestra sangre y nos da fuerza para caminar.", icon: "eco" },
            { name: "Manzanilla", meaning: "Calma los dolores, desinflama y ayuda a descansar.", icon: "spa" },
            { name: "Hierbabuena", meaning: "Amiga del estómago (Uigsa). Quita el dolor y pesadez.", icon: "local_pharmacy" },
            { name: "Sábila", meaning: "Refresca la piel y sana quemaduras del sol.", icon: "water_drop" },
            { name: "Caléndula", meaning: "Limpia y cierra las heridas rápidamente.", icon: "sanitizer" },
            { name: "Toronjil", meaning: "Tranquiliza el corazón y nos da armonía.", icon: "favorite" }
          ]}
        />
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
                onMouseEnter={() => !isFullyComplete && speakText(med.description)}
                onClick={() => !isFullyComplete && speakText(med.description)}
                className={`rounded-[2rem] p-4 shadow-xl border-b-8 transition-transform ${isFullyComplete ? 'opacity-50 grayscale' : 'cursor-pointer hover:-translate-y-2'} ${med.color} ${med.border}`}
              >
                <div className="bg-white aspect-square rounded-xl overflow-hidden mb-3 border-4 border-white relative">
                  <img src={med.image} alt={med.name} className="w-full h-full object-cover" draggable="false" />
                  <button 
                    onClick={(e) => { e.stopPropagation(); speakText(med.description); }}
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
