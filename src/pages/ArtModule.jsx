import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomNav } from '../components/Shared/BottomNav';
import { PedagogicalGuide } from '../components/Shared/PedagogicalGuide';
import avatarBoy from '../assets/avatar1.png';

const ArtModule = () => {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [mode, setMode] = useState('draw'); // 'draw' or 'stamp'
  const [brushColor, setBrushColor] = useState('#5d4037');
  const [stampCount, setStampCount] = useState(0);
  const [selectedSymbol, setSelectedSymbol] = useState(null);
  
  const [history, setHistory] = useState([]);
  const [historyStampCounts, setHistoryStampCounts] = useState([]);
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  const colors = ['#5d4037', '#e53935', '#ff9800', '#ffeb3b', '#4caf50', '#2196f3', '#9c27b0'];
  const symbols = [
    { id: 'sol', name: 'SOL', icon: 'light_mode', color: '#fbc02d' },
    { id: 'espiral', name: 'ESPIRAL', icon: 'sync', color: '#4caf50' },
    { id: 'chagra', name: 'CHAGRA', icon: 'local_florist', color: '#ff9800' },
    { id: 'rio', name: 'RÍO', icon: 'water', color: '#03a9f4' }
  ];

  useEffect(() => {
    initCanvas();
  }, []);

  const saveState = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      setHistory(prev => [...prev, canvas.toDataURL()]);
      setHistoryStampCounts(prev => [...prev, stampCount]);
    }
  };

  const undoCanvas = () => {
    if (history.length === 0) return;
    const lastDataUrl = history[history.length - 1];
    const lastStampCount = historyStampCounts[historyStampCounts.length - 1];
    
    setHistory(prev => prev.slice(0, -1));
    setHistoryStampCounts(prev => prev.slice(0, -1));
    setStampCount(lastStampCount);
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
    };
    img.src = lastDataUrl;
  };

  const initCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      setStampCount(0);
      setHistory([]);
      setHistoryStampCounts([]);
    }
  };

  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    
    // For touch events
    if (e.touches && e.touches.length > 0) {
      const touch = e.touches[0];
      return {
        x: (touch.clientX - rect.left) * (canvas.width / rect.width),
        y: (touch.clientY - rect.top) * (canvas.height / rect.height)
      };
    }
    
    // For mouse events
    return {
      x: (e.clientX - rect.left) * (canvas.width / rect.width),
      y: (e.clientY - rect.top) * (canvas.height / rect.height)
    };
  };

  const startDrawing = (e) => {
    if (mode !== 'draw') {
      stampSymbol(e);
      return;
    }
    saveState();
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const { x, y } = getCoordinates(e);
    
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing || mode !== 'draw') return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const { x, y } = getCoordinates(e);

    ctx.lineTo(x, y);
    ctx.strokeStyle = brushColor;
    ctx.lineWidth = 8;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const stampSymbol = (e) => {
    if (!selectedSymbol) return;
    saveState();
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const { x, y } = getCoordinates(e);

    ctx.font = '60px "Material Symbols Outlined"';
    ctx.fillStyle = selectedSymbol.color;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(selectedSymbol.icon, x, y);
    setStampCount(prev => prev + 1);
  };

  const clearCanvas = () => {
    saveState();
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setStampCount(0);
    speakText('Lienzo borrado.');
  };

  const exportCanvas = () => {
    if (stampCount < 2) return;
    const canvas = canvasRef.current;
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'mi_obra_inga.png';
    link.href = dataUrl;
    link.click();
    localStorage.setItem('inga_progress_arte', 'completed');
    speakText('¡Obra guardada!');
  };

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-ES';
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="min-h-screen bg-[#68b2a0]/20 backdrop-blur-[2px] font-['Plus_Jakarta_Sans'] pb-32 overflow-hidden flex flex-col">
      {/* Top Bar */}
      <header className="flex justify-between items-center px-6 py-4 bg-white/90 backdrop-blur-md shadow-md z-10">
        <div className="flex items-center gap-4">
          <button 
            className="w-12 h-12 bg-[#ef6c00] rounded-xl flex items-center justify-center text-white shadow-sm hover:bg-[#e65100] transition-colors"
            onClick={() => navigate('/hub')}
          >
            <span className="material-symbols-outlined text-3xl">home</span>
          </button>
          <div className="flex flex-col">
            <h1 className="font-black text-xl text-[#ef6c00] leading-none">MI MUNDO INGA</h1>
            <p className="text-[10px] font-bold text-[#8d6e63] italic">Nuka Inga kaugsai</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-[#fae4c5] px-6 py-2 rounded-full font-bold text-[#5d4037] flex items-center gap-2 shadow-sm border-2 border-[#e6c8a3]">
            <span className="material-symbols-outlined">palette</span> Taller de Arte
          </div>
          <button 
            onClick={() => setIsInfoOpen(true)}
            className="w-12 h-12 bg-[#0288d1] rounded-full flex items-center justify-center text-white shadow-lg border-b-4 border-[#01579b] hover:scale-105 transition-transform"
            title="Guía de Arte"
          >
            <span className="material-symbols-outlined text-3xl">info</span>
          </button>
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#ef6c00] shadow-sm border-2 border-[#ef6c00]">
            <span className="material-symbols-outlined">person</span>
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex-1 flex mt-6 px-6 gap-6 relative z-0 max-w-7xl mx-auto w-full">
        <PedagogicalGuide 
          isOpen={isInfoOpen} 
          onClose={() => setIsInfoOpen(false)}
          title="El Arte de Tejer Historias"
          description="En el arte Inga, cada trazo y cada símbolo tiene un poder especial. ¡Crea tu propia obra!"
          items={[
            { name: "El Espiral", meaning: "Representa el camino de la vida y el conocimiento que nunca termina.", icon: "sync" },
            { name: "La Chagra", meaning: "Símbolo de comunidad y trabajo compartido para alimentar a la familia.", icon: "local_florist" },
            { name: "El Sol", meaning: "Padre Inti, que nos da luz para ver y calor para crecer.", icon: "light_mode" },
            { name: "Herramientas", meaning: "Usa el pincel para dibujar libremente y los sellos para colocar símbolos sagrados.", icon: "brush" }
          ]}
        />
        {/* Left Sidebar (Tools) */}
        <aside className="w-32 bg-[#81c0b3]/80 backdrop-blur-md rounded-[3rem] flex flex-col items-center py-8 gap-6 shadow-xl relative z-10 border-4 border-white/30 h-full overflow-y-auto">
          
          <div className="text-white font-bold text-xs uppercase tracking-widest bg-[#458e7f] px-3 py-1 rounded-full">Pintar</div>
          <button 
            onClick={() => { setMode('draw'); setSelectedSymbol(null); }}
            className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-transform ${mode === 'draw' ? 'bg-[#ff9800] text-white scale-110 border-4 border-white' : 'bg-white text-gray-400 hover:scale-105'}`}
          >
            <span className="material-symbols-outlined text-3xl">brush</span>
          </button>

          {mode === 'draw' && (
            <div className="flex flex-wrap gap-2 justify-center px-2">
              {colors.map(c => (
                <button 
                  key={c}
                  onClick={() => setBrushColor(c)}
                  className={`w-8 h-8 rounded-full border-2 ${brushColor === c ? 'border-white scale-125 shadow-md' : 'border-transparent opacity-80 hover:scale-110'}`}
                  style={{ backgroundColor: c }}
                ></button>
              ))}
            </div>
          )}

          <div className="w-20 h-1 bg-white/30 rounded-full my-2"></div>
          
          <div className="text-white font-bold text-xs uppercase tracking-widest bg-[#458e7f] px-3 py-1 rounded-full">Figuras</div>
          {symbols.map((sym) => (
            <div 
              key={sym.id}
              onClick={() => {
                setMode('stamp');
                setSelectedSymbol(sym);
                speakText(sym.name);
              }}
              className={`relative group cursor-pointer transition-transform ${selectedSymbol?.id === sym.id && mode === 'stamp' ? 'scale-125' : 'hover:scale-110'}`}
            >
              <div className={`w-16 h-16 rounded-full border-4 shadow-lg flex items-center justify-center bg-white ${selectedSymbol?.id === sym.id && mode === 'stamp' ? 'border-[#ff9800]' : 'border-gray-200'}`} style={{ color: sym.color }}>
                <span className="material-symbols-outlined text-3xl">{sym.icon}</span>
              </div>
            </div>
          ))}

        </aside>

        {/* Canvas Area */}
        <div className="flex-1 bg-white rounded-[3rem] shadow-2xl relative flex items-center justify-center border-b-8 border-gray-200 overflow-hidden">
          <canvas
            ref={canvasRef}
            width={800}
            height={600}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
            className={`bg-white shadow-inner rounded-3xl ${mode === 'draw' ? 'cursor-crosshair' : 'cursor-pointer'}`}
            style={{ width: '100%', height: '100%' }}
          />

          {/* Export & Clear Buttons */}
          <div className="absolute top-6 right-6 flex flex-col gap-4">
            <button 
              onClick={clearCanvas}
              className="w-14 h-14 bg-[#c62828] rounded-full border-b-4 border-[#8e0000] text-white shadow-xl flex items-center justify-center hover:bg-[#b71c1c] active:translate-y-1 transition-all"
              title="Borrar todo"
            >
              <span className="material-symbols-outlined text-2xl">delete</span>
            </button>
            
            <button 
              onClick={undoCanvas}
              disabled={history.length === 0}
              className={`w-14 h-14 rounded-full border-b-4 shadow-xl flex items-center justify-center transition-all ${history.length > 0 ? 'bg-[#ff9800] border-[#e65100] text-white hover:bg-[#fb8c00] active:translate-y-1' : 'bg-gray-300 border-gray-400 text-gray-500 opacity-70 cursor-not-allowed'}`}
              title="Deshacer"
            >
              <span className="material-symbols-outlined text-2xl">undo</span>
            </button>

            <button 
              onClick={exportCanvas}
              disabled={stampCount < 2}
              className={`w-14 h-14 rounded-full border-b-4 shadow-xl flex items-center justify-center transition-all ${stampCount >= 2 ? 'bg-[#4caf50] border-[#2e7d32] text-white hover:bg-[#43a047] active:translate-y-1' : 'bg-gray-300 border-gray-400 text-gray-500 opacity-70 cursor-not-allowed'}`}
              title={stampCount < 2 ? "Coloca al menos 2 figuras para guardar" : "Guardar dibujo"}
            >
              <span className="material-symbols-outlined text-2xl">download</span>
            </button>
          </div>

          {/* Condition Alert */}
          {stampCount < 2 && (
            <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full border-2 border-[#ff9800] shadow-lg flex items-center gap-3">
              <span className="material-symbols-outlined text-[#ff9800]">info</span>
              <p className="font-bold text-[#5d4037] text-sm">Coloca <span className="text-[#e65100] text-lg">{2 - stampCount}</span> figura(s) más para guardar</p>
              <button 
                onClick={() => speakText(`Coloca ${2 - stampCount} figuras más para guardar`)}
                className="w-6 h-6 bg-[#ff9800] text-white rounded-full flex items-center justify-center hover:bg-[#e65100]"
              >
                <span className="material-symbols-outlined text-[14px]">volume_up</span>
              </button>
            </div>
          )}

          {/* Elder Avatar & Instructions */}
          <div className="absolute bottom-6 left-6 flex items-end gap-4 pointer-events-none">
            <div className="w-20 h-20 bg-[#ffca28] rounded-full border-4 border-[#ff9800] overflow-hidden shadow-lg pointer-events-auto">
              <img src={avatarBoy} alt="Compañero Inga" className="w-full h-full object-cover" />
            </div>
            <div className="bg-white px-4 py-3 rounded-[2rem] shadow-xl border-b-4 border-gray-100 mb-2 relative flex items-center gap-4 pointer-events-auto">
              <p className="font-bold text-[#5d4037] text-sm">¡Pinta y sella tus figuras Inga!</p>
              <button 
                onClick={() => speakText("¡Pinta y sella tus figuras Inga!")}
                className="w-8 h-8 bg-[#ef6c00] text-white rounded-full flex items-center justify-center shadow-md hover:bg-[#e65100]"
              >
                <span className="material-symbols-outlined text-sm">volume_up</span>
              </button>
              <div className="absolute -left-2 bottom-3 w-4 h-4 bg-white transform rotate-45"></div>
            </div>
          </div>

        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default ArtModule;
