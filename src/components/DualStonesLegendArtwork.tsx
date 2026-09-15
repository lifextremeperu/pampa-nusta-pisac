import React, { useState } from 'react';
import { Sparkles, Sun, Moon, Sprout, Heart, Users, Volume2 } from 'lucide-react';
import { andeanAudio } from '../utils/audioSynthesizer';

export const DualStonesLegendArtwork: React.FC = () => {
  const [activeEnergyFocus, setActiveEnergyFocus] = useState<'both' | 'femenina' | 'masculina'>('both');
  const [isPlayingSound, setIsPlayingSound] = useState(false);

  const handlePlaySound = async () => {
    const playing = await andeanAudio.toggle();
    setIsPlayingSound(playing);
  };

  return (
    <div className="relative w-full">
      {/* Top Badge & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sadhana-primary/30 bg-sadhana-primary/10 text-sadhana-sand text-[10px] font-mono font-bold tracking-[0.2em] uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-sadhana-primary" />
            <span>ARTE VISUAL ANCESTRAL · MONOLITOS TUTELARES DE PISAC</span>
          </div>
          <h3 className="font-black text-2xl sm:text-4xl text-white tracking-tighter uppercase">
            Las Dos Piedras Sagradas: <span className="text-sadhana-sand">Energía Femenina & Masculina</span>
          </h3>
          <p className="text-sm sm:text-base text-sadhana-sand/70 mt-2 font-medium">
            La Ñusta y el Príncipe transmutados en roca viva, enseñando la siembra sagrada (Tarpuy) a los niños y al pueblo andino.
          </p>
        </div>

        {/* Energy Filter Buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-white/5 backdrop-blur-md rounded-full border border-white/10 shrink-0">
          <button
            onClick={() => setActiveEnergyFocus('both')}
            className={`px-4 py-2 rounded-full text-[10px] font-bold tracking-[0.2em] transition-all uppercase ${
              activeEnergyFocus === 'both'
                ? 'bg-sadhana-primary text-white shadow-lg'
                : 'text-sadhana-sand/70 hover:text-white'
            }`}
          >
            Dualidad Yanantin
          </button>
          <button
            onClick={() => setActiveEnergyFocus('femenina')}
            className={`px-4 py-2 rounded-full text-[10px] font-bold tracking-[0.2em] transition-all uppercase flex items-center gap-1.5 ${
              activeEnergyFocus === 'femenina'
                ? 'bg-sadhana-primary text-white shadow-lg'
                : 'text-sadhana-sand/70 hover:text-white'
            }`}
          >
            <Moon className="w-3 h-3" />
            <span>Femenina</span>
          </button>
          <button
            onClick={() => setActiveEnergyFocus('masculina')}
            className={`px-4 py-2 rounded-full text-[10px] font-bold tracking-[0.2em] transition-all uppercase flex items-center gap-1.5 ${
              activeEnergyFocus === 'masculina'
                ? 'bg-sadhana-primary text-white shadow-lg'
                : 'text-sadhana-sand/70 hover:text-white'
            }`}
          >
            <Sun className="w-3 h-3" />
            <span>Masculina</span>
          </button>
        </div>
      </div>

      {/* Visual Canvas Stage */}
      <div className="relative aspect-[16/9] w-full rounded-none overflow-hidden bg-sadhana-dark">
        {/* Photographic Underlay: Real Pisac Archeological Terraces & Sky */}
        <img
          src="https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=85&w=1600&auto=format&fit=crop"
          alt="Andenes de Pisac y Rocas Sagradas"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-40 mix-blend-luminosity"
        />

        {/* Ambient Gradient for Rich Depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-sadhana-dark via-sadhana-dark/40 to-sadhana-dark/20 mix-blend-multiply" />

        {/* SVG ARTWORK: The 2 Sacred Megaliths radiating Feminine & Masculine energy while teaching sowing to children and community */}
        <svg
          viewBox="0 0 1000 562"
          className="absolute inset-0 w-full h-full pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Lunar Feminine Emerald/Gold Glow */}
            <radialGradient id="femGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#34d399" stopOpacity="0.8" />
              <stop offset="40%" stopColor="#10b981" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#064e3b" stopOpacity="0" />
            </radialGradient>

            {/* Solar Masculine Amber/Gold Glow */}
            <radialGradient id="mascGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.85" />
              <stop offset="45%" stopColor="#d97706" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#78350f" stopOpacity="0" />
            </radialGradient>

            {/* Earth & Seed Sacred Sparkles */}
            <filter id="sacredBlur" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Sunbeams and Sacred Golden Sky Streams */}
          <g opacity="0.35">
            <line x1="500" y1="0" x2="300" y2="400" stroke="#fde68a" strokeWidth="2" strokeDasharray="6,8" />
            <line x1="500" y1="0" x2="500" y2="480" stroke="#fde68a" strokeWidth="2.5" strokeDasharray="8,6" />
            <line x1="500" y1="0" x2="700" y2="400" stroke="#fde68a" strokeWidth="2" strokeDasharray="6,8" />
          </g>

          {/* LEFT: Piedra de la Energía Femenina (Inquill Chumpi / Pachamama) */}
          <g
            className={`transition-all duration-700 ${
              activeEnergyFocus === 'masculina' ? 'opacity-30 scale-95' : 'opacity-100 scale-100'
            }`}
          >
            {/* Halo de luz lunar-esmeralda */}
            <circle cx="280" cy="220" r="140" fill="url(#femGlow)" />

            {/* Silueta esculpida de la Piedra Sagrada Femenina */}
            <path
              d="M 230 430 L 220 280 Q 225 180 270 140 Q 320 180 330 280 L 320 430 Z"
              fill="#2d3748"
              stroke="#6ee7b7"
              strokeWidth="3.5"
              filter="url(#sacredBlur)"
            />
            {/* Relieves tallados en la roca femenina: Manto de estrellas y espigas */}
            <path d="M 255 190 Q 275 230 295 190" stroke="#a7f3d0" strokeWidth="2" fill="none" />
            <path d="M 250 250 Q 275 300 300 250" stroke="#a7f3d0" strokeWidth="2" fill="none" />
            <path d="M 245 320 Q 275 370 305 320" stroke="#a7f3d0" strokeWidth="2" fill="none" />
            
            {/* Símbolo lunar en el corazón de la piedra */}
            <circle cx="275" cy="210" r="14" fill="#ecfdf5" />
            <circle cx="280" cy="208" r="12" fill="#065f46" />

            {/* Destellos de bendición hacia las semillas */}
            <g opacity="0.9">
              <circle cx="290" cy="360" r="3" fill="#a7f3d0" />
              <circle cx="310" cy="380" r="4" fill="#fef08a" />
              <circle cx="330" cy="370" r="3.5" fill="#6ee7b7" />
            </g>
          </g>

          {/* RIGHT: Piedra de la Energía Masculina (Asto Rímac / Apu Linli) */}
          <g
            className={`transition-all duration-700 ${
              activeEnergyFocus === 'femenina' ? 'opacity-30 scale-95' : 'opacity-100 scale-100'
            }`}
          >
            {/* Halo de luz solar-dorada */}
            <circle cx="720" cy="210" r="150" fill="url(#mascGlow)" />

            {/* Silueta pétrea del Monolito Apu Masculino */}
            <path
              d="M 660 430 L 670 260 Q 675 160 720 120 Q 765 160 770 260 L 780 430 Z"
              fill="#3a2f26"
              stroke="#f59e0b"
              strokeWidth="3.5"
              filter="url(#sacredBlur)"
            />
            {/* Relieves escalonados incas (Chakana) en la roca masculina */}
            <path
              d="M 700 180 H 740 V 200 H 720 V 220 H 700 Z"
              fill="none"
              stroke="#fef08a"
              strokeWidth="2"
            />
            <path d="M 685 270 L 755 270" stroke="#fcd34d" strokeWidth="2.5" />
            <path d="M 680 330 L 760 330" stroke="#fcd34d" strokeWidth="2.5" />

            {/* Rayos de sol que descienden al suelo */}
            <g opacity="0.85">
              <circle cx="690" cy="360" r="4" fill="#fbbf24" />
              <circle cx="670" cy="380" r="3" fill="#f59e0b" />
              <circle cx="650" cy="370" r="3.5" fill="#fef08a" />
            </g>
          </g>

          {/* CENTER & FOREGROUND: Niños y el Pueblo Aprendiendo a Sembrar (Tarpuy) */}
          <g>
            {/* Surco fértil de tierra negra en primer plano */}
            <path
              d="M 100 520 Q 500 480 900 520 L 950 562 L 50 562 Z"
              fill="#1c140d"
              stroke="#5a3e2b"
              strokeWidth="3"
            />

            {/* Niños y comunidad (Siluetas tradicionales con semillas y chakitaklla) */}
            {/* Anciano sabio mostrando la semilla */}
            <path d="M 430 470 Q 440 420 455 410 Q 470 420 480 470 Z" fill="#b45309" />
            <circle cx="455" cy="395" r="14" fill="#d97706" />
            {/* Chakitaklla (arado de pie andino) */}
            <line x1="420" y1="410" x2="405" y2="490" stroke="#78350f" strokeWidth="4" />

            {/* Niña andina inclinada sembrando maíz con manta sagrada */}
            <path d="M 510 475 Q 525 435 540 430 Q 555 440 565 480 Z" fill="#047857" />
            <circle cx="538" cy="415" r="11" fill="#10b981" />
            {/* Chullo / Sombrero ceremonial */}
            <polygon points="527,410 549,410 538,390" fill="#dc2626" />

            {/* Niño andino recibiendo la semilla en la palma */}
            <path d="M 590 480 Q 600 445 615 440 Q 630 450 635 485 Z" fill="#b91c1c" />
            <circle cx="612" cy="425" r="11" fill="#f59e0b" />
            <polygon points="602,420 622,420 612,400" fill="#4338ca" />

            {/* Semillas sagradas brillantes cayendo en la tierra */}
            <g filter="url(#sacredBlur)">
              <circle cx="485" cy="460" r="5" fill="#fef08a" />
              <circle cx="505" cy="475" r="5" fill="#fef08a" />
              <circle cx="530" cy="490" r="6" fill="#fef08a" />
              <circle cx="550" cy="485" r="5" fill="#fef08a" />
              <circle cx="575" cy="478" r="5" fill="#fef08a" />
            </g>

            {/* Pequeños brotes verdes naciendo de la tierra (Kawsay) */}
            <path d="M 360 495 Q 365 475 375 480 Q 365 485 360 495 Z" fill="#34d399" />
            <path d="M 640 495 Q 645 475 655 480 Q 645 485 640 495 Z" fill="#34d399" />
            <path d="M 740 505 Q 745 485 755 490 Q 745 495 740 505 Z" fill="#34d399" />
          </g>
        </svg>

        {/* Dynamic Labels Overlay on Image */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 max-w-xs">
          <div className="p-2.5 rounded-xl bg-stone-950/85 backdrop-blur-md border border-emerald-500/40 text-white shadow-lg">
            <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-[10px] uppercase font-bold">
              <Moon className="w-3 h-3" />
              <span>Piedra Femenina · Inquill Chumpi</span>
            </div>
            <p className="text-[11px] text-stone-300 font-sans mt-0.5">
              Custodia el agua subterránea, la fertilidad y la humedad nutricia de las semillas nativas.
            </p>
          </div>
        </div>

        <div className="absolute top-4 right-4 flex flex-col gap-2 max-w-xs text-right">
          <div className="p-2.5 rounded-xl bg-stone-950/85 backdrop-blur-md border border-amber-500/40 text-white shadow-lg">
            <div className="flex items-center justify-end gap-1.5 text-amber-400 font-mono text-[10px] uppercase font-bold">
              <span>Piedra Masculina · Asto Rímac</span>
              <Sun className="w-3 h-3" />
            </div>
            <p className="text-[11px] text-stone-300 font-sans mt-0.5">
              Guía el calor del sol, la inclinación de los andenes y la fuerza de los surcos de piedra.
            </p>
          </div>
        </div>

        {/* Bottom Banner inside Image: Teaching the Village */}
        <div className="absolute bottom-6 left-6 right-6 p-4 md:p-6 rounded-none bg-sadhana-dark/80 backdrop-blur-md border border-white/10 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-sadhana-primary/20 border border-sadhana-primary/50 flex items-center justify-center shrink-0">
              <Sprout className="w-6 h-6 text-sadhana-primary" />
            </div>
            <div>
              <span className="text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] text-sadhana-sand font-bold block mb-1">
                Tarpuy Raymi · La Transmisión a los Niños
              </span>
              <p className="text-sm text-sadhana-sand/70 font-medium">
                Las dos piedras emiten sus bendiciones para que las nuevas generaciones aprendan a sembrar maíz blanco y quinua con respeto a la Pachamama.
              </p>
            </div>
          </div>

          <button
            onClick={handlePlaySound}
            className="px-6 py-3 rounded-full bg-white/5 backdrop-blur-md border border-sadhana-primary/40 hover:bg-sadhana-primary text-white text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all shrink-0 cursor-pointer"
          >
            <Volume2 className="w-4 h-4" />
            <span>{isPlayingSound ? 'Sonido Sagrado Activo' : 'Canto de Siembra'}</span>
          </button>
        </div>
      </div>

      {/* Explanatory Triad Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        <div className="p-6 md:p-8 border border-white/10 bg-white/5 backdrop-blur-sm">
          <div className="flex items-center gap-3 text-sadhana-primary font-bold text-sm mb-4 uppercase tracking-widest">
            <Moon className="w-5 h-5" />
            <h4>1. Energía Femenina (Pachamama)</h4>
          </div>
          <p className="text-sm text-sadhana-sand/70 leading-relaxed font-medium">
            La princesa petrificada se convirtió en la matriz que acoge la semilla en la oscuridad fértil de la tierra, enseñando a las niñas y mujeres el cuidado lunar.
          </p>
        </div>

        <div className="p-6 md:p-8 border border-white/10 bg-white/5 backdrop-blur-sm">
          <div className="flex items-center gap-3 text-sadhana-sand font-bold text-sm mb-4 uppercase tracking-widest">
            <Sun className="w-5 h-5" />
            <h4>2. Energía Masculina (Apu Linli)</h4>
          </div>
          <p className="text-sm text-sadhana-sand/70 leading-relaxed font-medium">
            El noble guerrero en piedra sostiene la estructura de los muros de contención, enseñando a los varones y jóvenes el trazo de canales y la tracción del arado.
          </p>
        </div>

        <div className="p-6 md:p-8 border border-white/10 bg-white/5 backdrop-blur-sm">
          <div className="flex items-center gap-3 text-white font-bold text-sm mb-4 uppercase tracking-widest">
            <Users className="w-5 h-5" />
            <h4>3. Herencia al Pueblo & Ayllu</h4>
          </div>
          <p className="text-sm text-sadhana-sand/70 leading-relaxed font-medium">
            Ninguna piedra compite: ambas se complementan en el principio andino del <em>Yanantin</em>, asegurando que la comunidad jamás pase hambre ni olvide sus raíces.
          </p>
        </div>
      </div>
    </div>
  );
};
