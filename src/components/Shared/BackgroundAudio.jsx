import React, { useState, useRef, useEffect } from 'react';
import audioFile from '../../audio/audio.mp3';

export const BackgroundAudio = () => {
  const [volume, setVolume] = useState(0.2);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSlider, setShowSlider] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.error("Audio play failed:", e));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div 
      className="fixed bottom-24 right-6 z-[60] flex flex-col items-center gap-2"
      onMouseLeave={() => setShowSlider(false)}
    >
      {showSlider && (
        <div 
          className="bg-white/95 backdrop-blur-sm p-4 rounded-2xl shadow-2xl border-2 border-[#ef6c00] animate-in fade-in slide-in-from-bottom-4 duration-300 mb-2"
          onMouseEnter={() => setShowSlider(true)}
        >
          <div className="flex flex-col items-center gap-3">
            <span className="text-[10px] font-black text-[#ef6c00] uppercase">Volumen</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-32 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#ef6c00]"
            />
            <span className="text-xs font-bold text-gray-500">{Math.round(volume * 100)}%</span>
          </div>
        </div>
      )}
      
      <div className="flex flex-col gap-2">
        <button
          onClick={() => setShowSlider(!showSlider)}
          className="w-12 h-12 bg-white text-[#ef6c00] rounded-full shadow-lg flex items-center justify-center border-2 border-[#ef6c00] hover:bg-[#ef6c00] hover:text-white transition-all"
          title="Ajustar Volumen"
        >
          <span className="material-symbols-outlined">
            {volume === 0 ? 'volume_off' : volume < 0.5 ? 'volume_down' : 'volume_up'}
          </span>
        </button>

        <button
          onClick={togglePlay}
          className="w-14 h-14 bg-[#ef6c00] text-white rounded-full shadow-lg flex items-center justify-center border-b-4 border-[#bf360c] hover:scale-105 active:translate-y-1 transition-all"
          title={isPlaying ? "Pausar Música" : "Reproducir Música"}
        >
          <span className="material-symbols-outlined text-3xl">
            {isPlaying ? 'pause' : 'play_arrow'}
          </span>
        </button>
      </div>

      <audio
        ref={audioRef}
        src={audioFile}
        loop
      />
    </div>
  );
};
