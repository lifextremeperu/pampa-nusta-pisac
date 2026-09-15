import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const WachumitaIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M6 9v1a3 3 0 0 0 3 3h1" />
    <path d="M18 11v5a3 3 0 0 1 -3 3h-1" />
    <path d="M10 21v-16a2 2 0 1 1 4 0v16" />
    <path d="M7 21h10" />
  </svg>
);

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
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white overflow-hidden"
        >
          {/* Animated Background Gradient for Preloader */}
          <div className="absolute inset-0 bg-gradient-to-br from-white via-sadhana-sand to-sadhana-primary/10 animated-gradient-bg opacity-70" />
          
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 flex flex-col items-center"
          >
            {/* Floating Wachuma Icon */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="mb-6 relative"
            >
              <div className="absolute inset-0 bg-sadhana-primary blur-xl opacity-20 rounded-full animate-pulse" />
              <WachumitaIcon className="w-16 h-16 text-sadhana-primary relative z-10 drop-shadow-sm" />
            </motion.div>

            {/* Title Reveal */}
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="font-sans text-2xl sm:text-4xl text-sadhana-dark tracking-[0.2em] uppercase font-extrabold"
              >
                PAMPA ÑUSTA
              </motion.h1>
            </div>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="mt-3 font-mono text-[10px] text-sadhana-primary/80 font-bold tracking-[0.3em] uppercase"
            >
              Inicializando Ecoaldea...
            </motion.p>

            {/* Loading Bar */}
            <div className="w-48 h-0.5 bg-sadhana-dark/10 mt-8 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, ease: "easeInOut" }}
                className="h-full bg-gradient-to-r from-sadhana-primary to-sadhana-orange"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
