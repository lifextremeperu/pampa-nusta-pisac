import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export const SolfeggioAudio: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const oscillatorRefs = useRef<OscillatorNode[]>([]);
  const lfoRef = useRef<OscillatorNode | null>(null);

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

    // Base Frequency (528 Hz - Miracle / DNA Repair)
    const baseFreq = 528;

    // Create multiple oscillators for a rich, warm singing bowl sound
    const frequencies = [
      baseFreq / 2,     // 264 Hz (Octave down, fundamental depth)
      baseFreq,         // 528 Hz (Core)
      baseFreq * 1.5,   // 792 Hz (Perfect fifth)
      baseFreq * 2      // 1056 Hz (Octave up, harmonic brightness)
    ];

    frequencies.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      
      // Use sine waves for pure, meditative tones
      osc.type = index === 0 ? 'triangle' : 'sine';
      osc.frequency.value = freq;
      
      // Mix the volumes of harmonics (lower frequencies are louder)
      oscGain.gain.value = 1 / (index + 1) * 0.2; 
      
      osc.connect(oscGain);
      oscGain.connect(masterGain);
      osc.start();
      oscillatorRefs.current.push(osc);
    });

    // Create an LFO (Low Frequency Oscillator) to create a gentle pulsing "bowl" effect
    const lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = 0.15; // Slow pulse every ~6.6 seconds
    
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.1; // Amount of volume fluctuation

    lfo.connect(lfoGain);
    
    // Connect LFO to master gain's value to modulate volume gently
    lfoGain.connect(masterGain.gain);
    lfo.start();
    lfoRef.current = lfo;

    setIsPlaying(true);
    setIsMuted(false);
    
    // Fade in
    masterGain.gain.setTargetAtTime(0.4, ctx.currentTime, 2.0);
  };

  const toggleMute = () => {
    if (!audioCtxRef.current) {
      initAudio();
      return;
    }

    const ctx = audioCtxRef.current;
    const gain = gainNodeRef.current;
    
    if (isMuted) {
      ctx.resume();
      gain?.gain.setTargetAtTime(0.4, ctx.currentTime, 1.0);
      setIsMuted(false);
    } else {
      gain?.gain.setTargetAtTime(0, ctx.currentTime, 0.5);
      setTimeout(() => ctx.suspend(), 500);
      setIsMuted(true);
    }
  };

  // Auto-play attempt on first user interaction anywhere on the page
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!audioCtxRef.current) {
        initAudio();
      }
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('scroll', handleFirstInteraction);
    };

    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('scroll', handleFirstInteraction, { passive: true });

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('scroll', handleFirstInteraction);
      // Cleanup audio context on unmount
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return (
    <button
      onClick={toggleMute}
      className="fixed bottom-6 right-6 z-[9999] w-12 h-12 rounded-full bg-sadhana-dark/80 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:bg-sadhana-dark transition-all hover:scale-110 shadow-[0_0_15px_rgba(0,0,0,0.5)] group"
      aria-label={isMuted ? "Activar Sonido de Sanación" : "Silenciar Sonido"}
    >
      {isMuted ? (
        <VolumeX className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity" />
      ) : (
        <div className="relative flex items-center justify-center">
          <Volume2 className="w-5 h-5 text-sadhana-primary" />
          <span className="absolute inset-0 rounded-full animate-ping bg-sadhana-primary/20 scale-150" />
        </div>
      )}
    </button>
  );
};
