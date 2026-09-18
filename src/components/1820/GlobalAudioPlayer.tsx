import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export const GlobalAudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const lfoRef = useRef<OscillatorNode | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);

  const initAudio = () => {
    if (audioCtxRef.current) return;

    // Create AudioContext
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    const ctx = new AudioContext();
    audioCtxRef.current = ctx;

    // Master Gain (Volume)
    const masterGain = ctx.createGain();
    masterGain.gain.value = 0; // Start muted
    masterGain.connect(ctx.destination);
    gainNodeRef.current = masterGain;

    // Solfeggio 528 Hz (Frecuencia de Sanación / Reparación del ADN)
    const baseFreq = 528;

    // Frecuencias armónicas para simular un cuenco tibetano rico y profundo
    const frequencies = [
      baseFreq / 2,     // 264 Hz (Octava inferior)
      baseFreq,         // 528 Hz (Tono fundamental)
      baseFreq * 1.5,   // 792 Hz (Quinta perfecta)
      baseFreq * 2      // 1056 Hz (Octava superior)
    ];

    frequencies.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      
      osc.type = index === 0 ? 'triangle' : 'sine';
      osc.frequency.value = freq;
      
      // Mezcla armónica: volumen más bajo para frecuencias más altas
      oscGain.gain.value = (1 / (index + 1)) * 0.15; 
      
      osc.connect(oscGain);
      oscGain.connect(masterGain);
      osc.start();
      oscillatorsRef.current.push(osc);
    });

    // LFO (Oscilador de baja frecuencia) para el efecto de "pulsación" relajante del cuenco
    const lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = 0.1; // Pulsación muy lenta (~10 segundos)
    
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.15; // Amplitud de la pulsación

    lfo.connect(lfoGain);
    lfoGain.connect(masterGain.gain);
    lfo.start();
    lfoRef.current = lfo;

    setIsPlaying(true);
    
    // Fade in suave
    masterGain.gain.setTargetAtTime(0.4, ctx.currentTime, 2.0);
  };

  const togglePlay = () => {
    if (!audioCtxRef.current) {
      initAudio();
      return;
    }

    const ctx = audioCtxRef.current;
    const gain = gainNodeRef.current;
    
    if (isPlaying) {
      // Fade out
      gain?.gain.setTargetAtTime(0, ctx.currentTime, 1.0);
      setTimeout(() => ctx.suspend(), 1000);
      setIsPlaying(false);
    } else {
      // Fade in
      ctx.resume();
      gain?.gain.setTargetAtTime(0.4, ctx.currentTime, 1.0);
      setIsPlaying(true);
    }
  };

  // Intentar iniciar el audio automáticamente tras la primera interacción
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!audioCtxRef.current) {
        initAudio();
      }
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('scroll', handleFirstInteraction);
    };

    document.addEventListener('click', handleFirstInteraction, { once: true });
    document.addEventListener('scroll', handleFirstInteraction, { passive: true, once: true });

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('scroll', handleFirstInteraction);
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return (
    <div className="flex items-center gap-3 text-white relative z-[100]">
      <div 
        className={`transition-opacity duration-700 ${isPlaying ? 'opacity-0 pointer-events-none' : 'opacity-100'} hidden md:block`}
      >
        <span className="text-[9px] uppercase tracking-widest bg-white/10 px-3 py-1.5 rounded-full border border-white/20 shadow-sm cursor-pointer hover:bg-white/20 transition-all font-mono font-bold" onClick={togglePlay}>
          Frecuencia 528Hz
        </span>
      </div>
      
      <button 
        onClick={togglePlay}
        className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.08)] flex items-center justify-center border border-white/20 transition-transform hover:scale-105 active:scale-95 group relative cursor-pointer"
        aria-label="Toggle Solfeggio Audio"
      >
        {isPlaying && (
          <>
            <span className="absolute inset-0 rounded-full border border-sadhana-primary/40 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]"></span>
            <span className="absolute inset-0 rounded-full border border-sadhana-primary/20 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite_1s]"></span>
          </>
        )}
        
        {isPlaying ? (
          <Volume2 className="w-4 h-4 md:w-5 md:h-5 text-sadhana-primary" />
        ) : (
          <VolumeX className="w-4 h-4 md:w-5 md:h-5 text-white/50 group-hover:text-white transition-colors" />
        )}
      </button>
    </div>
  );
};