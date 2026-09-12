import React, { useState } from 'react';
import { ShowreelItem } from '../data/showreelData';
import { X, Sparkles, MapPin, Compass, Users, Clock, Upload, Check, Video, Image as ImageIcon } from 'lucide-react';

interface TenOutOfTenDrawerProps {
  item: ShowreelItem | null;
  isOpen: boolean;
  onClose: () => void;
  onBookExperience: (item: ShowreelItem) => void;
  customPhotoUrl?: string | null;
  onUploadPhoto?: (file: File) => void;
}

export const TenOutOfTenDrawer: React.FC<TenOutOfTenDrawerProps> = ({
  item,
  isOpen,
  onClose,
  onBookExperience,
  customPhotoUrl,
  onUploadPhoto,
}) => {
  const [activeMediaTab, setActiveMediaTab] = useState<'photo' | 'video'>('photo');

  if (!item) return null;

  const effectivePhoto = customPhotoUrl || item.photoSrc;

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onUploadPhoto) {
      onUploadPhoto(file);
    }
  };

  return (
    <>
      {/* Dark backdrop overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/75 z-40 transition-opacity duration-500 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Slide-up 10/10 style Modal Drawer */}
      <aside
        aria-label={`Detalles de ${item.title}`}
        className={`fixed bottom-0 left-0 w-full max-h-[90vh] sm:max-h-[85vh] bg-[#070605] border-t border-stone-800/90 text-stone-100 z-50 overflow-y-auto transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[0_-20px_50px_rgba(0,0,0,0.9)] ${
          isOpen ? 'translate-y-0 pointer-events-auto' : 'translate-y-full pointer-events-none'
        }`}
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-10 py-8 sm:py-12">
          {/* Top Bar with Number & Close */}
          <div className="flex items-center justify-between border-b border-stone-800 pb-5 mb-8">
            <div className="flex items-center gap-3">
              <span className="font-mono text-amber-400 font-bold text-lg sm:text-2xl tracking-tighter">
                {item.indexNumber} /
              </span>
              <div>
                <h2 className="font-mono uppercase font-bold text-sm sm:text-lg tracking-widest text-stone-100">
                  {item.title}
                </h2>
                <span className="font-mono text-[11px] text-stone-500 uppercase">
                  {item.quechua} · {item.category}
                </span>
              </div>
            </div>

            {/* Signature 10/10 Close Button */}
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg font-mono text-xs uppercase tracking-widest text-amber-400 hover:text-stone-950 hover:bg-amber-400 transition-all flex items-center gap-1.5 border border-amber-500/40 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span>/ CLOSE</span>
            </button>
          </div>

          {/* Primary Split Grid (Exact 10/10 structure) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12">
            {/* Left Column: Visual Asset & Real Photo Comparison */}
            <div className="lg:col-span-6 flex flex-col gap-4">
              {/* Media Preview Card */}
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl overflow-hidden bg-stone-900 border border-stone-800 shadow-2xl group">
                {activeMediaTab === 'photo' ? (
                  <img
                    src={effectivePhoto}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <video
                    src={item.videoSrc}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                )}

                {/* Badge Overlay */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md border border-stone-700/80 font-mono text-[10px] uppercase text-amber-300 tracking-wider">
                  {activeMediaTab === 'photo' ? 'FOTO REAL ECOALDEA' : 'REEL CINEMATOGRÁFICO'}
                </div>

                {/* Altitude Tag */}
                <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md font-mono text-[10px] text-stone-300 flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-amber-400" />
                  <span>{item.altitude} · {item.location}</span>
                </div>
              </div>

              {/* Media Switcher & Custom Photo Uploader */}
              <div className="flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveMediaTab('photo')}
                    className={`px-3 py-1.5 rounded-lg font-mono text-[11px] uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                      activeMediaTab === 'photo'
                        ? 'bg-amber-400 text-stone-950 font-bold'
                        : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
                    }`}
                  >
                    <ImageIcon className="w-3 h-3" />
                    <span>/ FOTO REAL</span>
                  </button>

                  <button
                    onClick={() => setActiveMediaTab('video')}
                    className={`px-3 py-1.5 rounded-lg font-mono text-[11px] uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                      activeMediaTab === 'video'
                        ? 'bg-amber-400 text-stone-950 font-bold'
                        : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
                    }`}
                  >
                    <Video className="w-3 h-3" />
                    <span>/ VIDEO REEL</span>
                  </button>
                </div>

                {/* Upload Button */}
                <label className="px-3 py-1.5 rounded-lg bg-stone-900/90 border border-stone-700 hover:border-amber-400 text-stone-300 hover:text-amber-300 font-mono text-[10px] uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-all">
                  <Upload className="w-3 h-3 text-amber-400" />
                  <span className="hidden sm:inline">SUBIR FOTO WHATSAPP</span>
                  <span className="sm:hidden">SUBIR</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileInput}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Source Photo Reference info */}
              <div className="p-3 rounded-xl bg-stone-900/50 border border-stone-800/60 font-mono text-[10px] text-stone-400 flex items-center justify-between">
                <span>Archivo vinculado: <strong className="text-stone-300">{item.uploadedPhotoPlaceholderName}</strong></span>
                <span className="text-amber-400 font-bold">100% Auténtico Pisac</span>
              </div>
            </div>

            {/* Right Column: 10/10 Credits & Synopsis */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                {/* 10/10 Keywords List */}
                <div className="flex flex-wrap gap-2 mb-4 font-mono text-xs text-amber-400 uppercase tracking-widest">
                  <span>/ {item.category}</span>
                  <span className="text-stone-600">·</span>
                  <span>/ {item.year}</span>
                  <span className="text-stone-600">·</span>
                  <span>/ Pisac 3,347M</span>
                </div>

                {/* Synopsis / Logline */}
                <p className="text-sm sm:text-base text-stone-200 leading-relaxed font-sans font-light mb-6">
                  {item.logline}
                </p>

                {/* Earth Quote */}
                <blockquote className="p-4 rounded-xl bg-stone-900/80 border-l-2 border-amber-400 text-stone-300 font-cinzel italic text-xs sm:text-sm leading-relaxed mb-6">
                  {item.quote}
                </blockquote>

                {/* Highlights list with slash separators */}
                <div className="space-y-2 mb-8 font-mono text-xs text-stone-300">
                  <span className="block text-[10px] uppercase tracking-widest text-stone-500 mb-2">
                    / ELEMENTOS CLAVE DEL CAPÍTULO:
                  </span>
                  {item.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-amber-400 shrink-0 font-bold">/</span>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                {/* Technical Credits Grid */}
                <div className="grid grid-cols-2 gap-4 border-t border-stone-800/80 pt-6 font-mono text-xs">
                  <div>
                    <span className="block text-[10px] uppercase tracking-widest text-stone-500 mb-1">
                      / CURADORES & GUARDIANES
                    </span>
                    <p className="text-stone-300 text-[11px] leading-snug">
                      {item.credits.directors.join(', ')}
                    </p>
                  </div>

                  <div>
                    <span className="block text-[10px] uppercase tracking-widest text-stone-500 mb-1">
                      / CAPACIDAD & FORMATO
                    </span>
                    <p className="text-stone-300 text-[11px] leading-snug">
                      {item.credits.capacity} · {item.credits.duration}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Bar */}
              <div className="mt-8 pt-6 border-t border-stone-800 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onBookExperience(item)}
                  className="flex-1 py-3.5 px-6 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-mono font-bold text-xs uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>/ RESERVAR EN LA ECOALDEA</span>
                </button>

                <button
                  onClick={onClose}
                  className="py-3.5 px-6 rounded-xl border border-stone-700 bg-stone-900 text-stone-300 hover:text-white font-mono text-xs uppercase tracking-widest transition-all cursor-pointer"
                >
                  / VOLVER AL REEL
                </button>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
