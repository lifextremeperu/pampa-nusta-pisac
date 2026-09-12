import { VideoCallTopic } from '../types';

export const VIDEO_CALL_TOPICS: VideoCallTopic[] = [
  {
    id: 'wachuma',
    title: 'Banco Genético de Wachuma & Botánica Sagrada',
    quechuaTitle: 'Wachuma Wasi Kawsay',
    collaboratorName: 'Saywa Quispe',
    collaboratorRole: 'Bióloga & Curadora Botánica del Santuario',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=250&auto=format&fit=crop',
    description: 'Conversa directamente con nuestra bióloga sobre las más de 40 variedades madre de cactáceas sagradas, conservación a 3,347 msnm y microclimas.',
    iconName: 'Sprout'
  },
  {
    id: 'semillas',
    title: 'Semillas Nativas & Agroecología Andina',
    quechuaTitle: 'Muyo Wasi Allpa',
    collaboratorName: 'Inti Morales',
    collaboratorRole: 'Guardián de Semillas Ancestrales & Permacultor',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=250&auto=format&fit=crop',
    description: 'Aprende sobre la custodia de maíces milenarios, tubérculos sagrados de altura, qollqas bioclimáticas y redes de trueque comunitario.',
    iconName: 'Wheat'
  },
  {
    id: 'ceremonias',
    title: 'Plantas Maestras, Retiros & Armonización 432 Hz',
    quechuaTitle: 'Willka Kancha Hampiy',
    collaboratorName: 'Kantu Valderrama',
    collaboratorRole: 'Facilitador Ceremonial & Terapeuta de Sonido',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=250&auto=format&fit=crop',
    description: 'Resuelve tus inquietudes sobre preparación dietaria, ceremonias ancestrales con plantas sagradas, retiros de introspección y frecuencias 432 Hz.',
    iconName: 'Flame'
  },
  {
    id: 'talleres',
    title: 'Bioconstrucción, Voluntariado & Talleres 4+ Días',
    quechuaTitle: 'Allpa Kawsay Wasichiy',
    collaboratorName: 'Mikael Andino',
    collaboratorRole: 'Arquitecto de Tierra & Coordinador de Residencias',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=250&auto=format&fit=crop',
    description: 'Consulta fechas, requisitos y programas de inmersión en permacultura viva, construcción con quincha/adobe y residencia comunitaria.',
    iconName: 'Tent'
  },
  {
    id: 'general',
    title: 'Visitas Guiadas, Logística en Pisac & Hospitalidad',
    quechuaTitle: 'Pisac Santuario Watukuq',
    collaboratorName: 'Nayra Ramos',
    collaboratorRole: 'Coordinadora de Bienvenida & Logística en Pisac',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=250&auto=format&fit=crop',
    description: 'Información práctica para tu viaje a Pisac: rutas desde Cusco, aclimatación a 3,347 msnm, estadía recomendada y visitas familiares.',
    iconName: 'Compass'
  }
];

export const AVAILABLE_TIME_SLOTS = [
  { id: 'morning_1', label: '10:00 AM - 10:30 AM', timeOnly: '10:00', icon: 'Sun' },
  { id: 'morning_2', label: '11:30 AM - 12:00 PM', timeOnly: '11:30', icon: 'Sun' },
  { id: 'afternoon_1', label: '03:00 PM - 03:30 PM', timeOnly: '15:00', icon: 'Sunset' },
  { id: 'afternoon_2', label: '04:30 PM - 05:00 PM', timeOnly: '16:30', icon: 'Sunset' },
  { id: 'evening_1', label: '06:00 PM - 06:30 PM', timeOnly: '18:00', icon: 'Moon' },
];
