import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Leaf } from 'lucide-react';

export const Preloader: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular tiempo de carga de assets visuales
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2800);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-stone-950 overflow-hidden"
        >
          {/* Animated Background Gradient for Preloader */}
          <div className="absolute inset-0 bg-gradient-to-br from-stone-900 via-stone-950 to-amber-950/20 animated-gradient-bg opacity-50" />
          
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 flex flex-col items-center"
          >
            {/* Spinning Leaf Icon */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="mb-6 relative"
            >
              <div className="absolute inset-0 bg-amber-500 blur-xl opacity-20 rounded-full animate-pulse" />
              <Leaf className="w-16 h-16 text-amber-500 relative z-10 drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]" />
            </motion.div>

            {/* Title Reveal */}
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="font-cinzel text-2xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-white to-amber-200 tracking-[0.2em] uppercase font-bold"
              >
                PAMPA ÑUSTA
              </motion.h1>
            </div>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="mt-3 font-mono text-[10px] text-amber-500/70 tracking-[0.3em] uppercase"
            >
              Inicializando Ecoaldea...
            </motion.p>

            {/* Loading Bar */}
            <div className="w-48 h-0.5 bg-stone-800 mt-8 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, ease: "easeInOut" }}
                className="h-full bg-gradient-to-r from-emerald-500 to-amber-500"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
