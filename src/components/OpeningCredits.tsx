import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { andeanAudio } from '../utils/audioSynthesizer';

interface OpeningCreditsProps {
  onComplete: () => void;
}

export const OpeningCredits: React.FC<OpeningCreditsProps> = ({ onComplete }) => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    // Play subtle wind/ambient sound on mount
    if (!andeanAudio.getIsPlaying()) {
      andeanAudio.toggle();
    }

    const timeouts = [
      setTimeout(() => setStage(1), 1500),  // Show "Una producción original"
      setTimeout(() => setStage(2), 4000),  // Show "Pampa Ñusta: La Leyenda Viva"
      setTimeout(() => setStage(3), 7500),  // Fade out completely
      setTimeout(() => {
        onComplete();
      }, 9000), // Finish and unmount
    ];

    return () => timeouts.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {stage < 3 && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-[#030303] flex items-center justify-center flex-col pointer-events-auto"
        >
          {/* Film Grain inside credits too */}
          <div className="absolute inset-0 film-grain opacity-50 mix-blend-overlay pointer-events-none" />

          <AnimatePresence mode="wait">
            {stage === 1 && (
              <motion.h3
                key="prod"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="font-sans text-stone-500 uppercase tracking-[0.3em] text-xs sm:text-sm font-semibold"
              >
                Una Producción Original
              </motion.h3>
            )}
            
            {stage === 2 && (
              <motion.h1
                key="title"
                initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(10px)" }}
                transition={{ duration: 2, ease: "easeInOut" }}
                className="font-cinzel text-4xl sm:text-6xl text-white font-bold tracking-widest text-center mt-6"
              >
                PAMPA ÑUSTA
                <span className="block text-natgeo-yellow text-lg sm:text-2xl mt-4 tracking-[0.2em] uppercase font-mono font-medium">
                  La Leyenda Viva
                </span>
              </motion.h1>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
