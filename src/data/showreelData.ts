export interface ShowreelItem {
  id: string;
  indexNumber: string;
  navTitle: string;
  title: string;
  quechua: string;
  category: string;
  year: string;
  videoSrc: string;
  photoSrc: string;
  uploadedPhotoPlaceholderName: string;
  aspectRatio: string;
  durationSeconds: number;
  location: string;
  altitude: string;
  logline: string;
  quote: string;
  credits: {
    directors: string[];
    guardians: string[];
    location: string;
    capacity: string;
    duration: string;
    category: string;
  };
  highlights: string[];
  metrics: { label: string; value: string }[];
}

export const SHOWREEL_ITEMS: ShowreelItem[] = [
  {
    id: 'poster-nusta',
    indexNumber: '00',
    navTitle: 'Póster Oficial',
    title: 'Pampa Ñusta · El Origen',
    quechua: 'Allpa Yachay Kawsay',
    category: 'Reserva Natural / Santuario Vivo',
    year: '2026',
    videoSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    photoSrc: '/Go1cn.jpg',
    uploadedPhotoPlaceholderName: 'Go1cn.jpg',
    aspectRatio: '2:3',
    durationSeconds: 12,
    location: 'Pisac · Valle Sagrado de los Incas',
    altitude: '3,347 msnm',
    logline: 'La Tierra Recuerda. El Espíritu Enseña. El Futuro se Cultiva. La ecoaldea viva en las faldas sagradas del Apu Linli.',
    quote: '«Dos piedras sagradas despiertan la memoria mineral de los Andes: la wak\'a celeste y la wak\'a de oro solar.»',
    credits: {
      directors: ['Ayllus Unidos de Pisac', 'Curaduría Pampa Ñusta'],
      guardians: ['Sabios Quechuas del Valle Sagrado', 'Guardianes de Semillas'],
      location: 'Pisac, Cusco, Perú · 3,347 msnm',
      capacity: 'Abierto a la Comunidad Consciente',
      duration: 'Iniciativa Permanente 2026',
      category: 'Cine Ancestral & Ecoaldea',
    },
    highlights: [
      'Póster oficial con las dos piedras sagradas (Wak\'as talladas en espiral azul y oro).',
      'Casa de adobe ancestral de dos plantas con vigas de eucalipto y tejas andinas.',
      'Trabajo colectivo en huertos y andenes con cultivo regenerativo.',
      'Murales ceremoniales y tipis de meditación en sintonía con la cordillera.',
    ],
    metrics: [
      { label: 'Ubicación', value: 'Pisac, Cusco' },
      { label: 'Altitud', value: '3,347 msnm' },
      { label: 'Capítulos', value: '5 Módulos' },
      { label: 'Formato', value: 'Reel 4K / Experiencia Real' },
    ],
  },
  {
    id: 'wachuma',
    indexNumber: '01',
    navTitle: 'Banco Wachuma',
    title: 'Banco Genético de la Wachuma',
    quechua: 'Achuma Kawsay Taqe',
    category: 'Botánica Sagrada',
    year: '2026',
    videoSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    photoSrc: '/assets/ecoaldea/wachuma-cinematic-master.jpg',
    uploadedPhotoPlaceholderName: 'WhatsApp Image 2026-09-11 at 4.43.54 PM.jpeg',
    aspectRatio: '16:9',
    durationSeconds: 15,
    location: 'Huertos & Invernadero · Pisac',
    altitude: '3,347 msnm',
    logline: 'Custodia viva del cactus sagrado Trichocereus y clones centenarios en el microclima fértil del Valle Sagrado.',
    quote: '«La Wachuma no es sólo una planta; es la memoria mineral que sostiene la visión de la cordillera.»',
    credits: {
      directors: ['Maestros Botánicos Tradicionales', 'Comunidad Pampa Ñusta'],
      guardians: ['Linaje Chavín-Cusco', 'Polinizadores Nocturnos'],
      location: 'Huerto Experimental de Pisac',
      capacity: '12 Clones Madre Protegidos',
      duration: 'Custodia Permanente',
      category: 'Genética Botánica Ancestral',
    },
    highlights: [
      'Invernadero bioclimático y terrazas de aclimatación de cactáceas sagradas.',
      'Clones de más de 80 años rescatados de quebradas interandinas.',
      'Integración con huertos de hortalizas andinas y carretillas de biofertilizante vivo.',
      'Estudio de resistencia climática a heladas y bioindicadores solares.',
    ],
    metrics: [
      { label: 'Variedades', value: '14 Especies' },
      { label: 'Edad Madre', value: '80+ Años' },
      { label: 'Microclima', value: 'Pisac Seco-Templado' },
      { label: 'Estado', value: 'Custodia Activa' },
    ],
  },
  {
    id: 'semillas',
    indexNumber: '02',
    navTitle: 'Bóveda Semillas',
    title: 'Conservación de Semillas Nativas',
    quechua: 'Muhukuna Waqaychay',
    category: 'Soberanía Alimentaria',
    year: '2026',
    videoSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    photoSrc: '/assets/ecoaldea/seed-bank-terrace.jpg',
    uploadedPhotoPlaceholderName: 'WhatsApp Image 2026-09-11 at 1.24.13 PM.jpeg',
    aspectRatio: '16:9',
    durationSeconds: 14,
    location: 'Terrazas de Piedra & Almacén Bioclimático',
    altitude: '3,200 msnm',
    logline: 'Arca milenaria de maíces gigantes, papas silvestres, tarwi y granos dorados que aseguran la soberanía del futuro.',
    quote: '«Quien custodia una semilla custodia los próximos mil años de la humanidad.»',
    credits: {
      directors: ['Custodios de Germoplasma Andino', 'Ayllus Campesinos'],
      guardians: ['18 Comunidades del Valle de Vilcanota'],
      location: 'Terrazas de Germinación en Piedra Natural',
      capacity: '+400 Variedades Resguardadas',
      duration: 'Ciclos Agrícolas Lunares',
      category: 'Patrimonio Biocultural',
    },
    highlights: [
      'Bancales elevados de piedra con musgo y sustrato mineral para germinación limpia.',
      'Colección viva de maíz Paraqay blanco gigante y ecotipos raros de papas silvestres.',
      'Prácticas ancestrales de intercambio ritual de simientes (Chhalay).',
      'Banco de pruebas frente al estrés hídrico y temperaturas extremas.',
    ],
    metrics: [
      { label: 'Papas Nativas', value: '250 Ecotipos' },
      { label: 'Maíces', value: 'Paraqay & Chullpi' },
      { label: 'Granos Sagrados', value: 'Quinua, Kiwicha, Tarwi' },
      { label: 'Almacenamiento', value: 'Qollqas Bioclimáticas' },
    ],
  },
  {
    id: 'ninos',
    indexNumber: '03',
    navTitle: 'Escuela Niños',
    title: 'Centro de Recreación para Niños',
    quechua: 'Wawakuna Pukllay Wasi',
    category: 'Pedagogía de la Tierra',
    year: '2026',
    videoSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    photoSrc: '/assets/ecoaldea/tipis-pisac.jpg',
    uploadedPhotoPlaceholderName: 'WhatsApp Image 2026-09-11 at 1.24.36 PM.jpeg',
    aspectRatio: '16:9',
    durationSeconds: 16,
    location: 'Campamento de Tipis & Praderas de Pisac',
    altitude: '3,150 msnm',
    logline: 'Educación libre y juego consciente donde la infancia aprende con el barro, la música y el campamento bajo la montaña.',
    quote: '«Los niños no necesitan aulas de cemento; necesitan tierra fértil donde florecer libres.»',
    credits: {
      directors: ['Educadores Vivos Waldorf-Andinos'],
      guardians: ['Familias de la Ecoaldea', 'Músicos Tradicionales'],
      location: 'Área de Tipis y Cabañas Cónicas de Paja',
      capacity: 'Grupos Reducidos (15 niños)',
      duration: 'Jornadas de Día & Campamentos',
      category: 'Educación Alternativa',
    },
    highlights: [
      'Campamentos en tipis cónicos de lona y paja con vista a los Apus de Pisac.',
      'Huertos infantiles donde cada niño siembra, cuida y cosecha sus alimentos.',
      'Talleres de bioconstrucción con mini-adobes y barro modelado a mano.',
      'Rutas de exploración botánica, cuentacuentos en Quechua y música con flautas.',
    ],
    metrics: [
      { label: 'Edades', value: '4 a 14 Años' },
      { label: 'Espacio', value: '3 Hectáreas Libres' },
      { label: 'Estructuras', value: 'Tipis & Domos Paja' },
      { label: 'Idiomas', value: 'Quechua & Castellano' },
    ],
  },
  {
    id: 'ceremonias',
    indexNumber: '04',
    navTitle: 'Plantas Maestras',
    title: 'Ceremonias de Plantas Maestras',
    quechua: 'Hampiq Sach’akuna Haywarikuy',
    category: 'Sanación Ancestral',
    year: '2026',
    videoSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    photoSrc: '/assets/ecoaldea/maloka-ceremony.jpg',
    uploadedPhotoPlaceholderName: 'WhatsApp Image 2026-09-11 at 1.24.13 PM (1).jpeg',
    aspectRatio: '16:9',
    durationSeconds: 15,
    location: 'Maloka Ceremonial Circular de Pisac',
    altitude: '3,300 msnm',
    logline: 'Círculos sagrados de introspección y fuego sanador guiados por taitas linajudos dentro de la maloka de madera y paja.',
    quote: '«Sanar no es borrar el dolor, sino devolver el alma a su eje cósmico original frente al fuego.»',
    credits: {
      directors: ['Taitas y Curanderos del Valle Sagrado'],
      guardians: ['Médicos Tradicionales', 'Acompañantes de Integración'],
      location: 'Maloka Circular con Fogón Central',
      capacity: 'Máximo 10 Participantes',
      duration: 'Retiros de 1 a 3 Noches',
      category: 'Medicina Sagrada Tradicional',
    },
    highlights: [
      'Espacio ceremonial circular sostenido por 12 columnas maestras de eucalipto.',
      'Fogón central ritual para la ofrenda sagrada a la Pachamama (Haywarikuy).',
      'Esteras y colchonetas de descanso dispuestas en mandala alrededor del fuego.',
      'Cantos sagrados tradicionales, ícaros y música en afinación natural de 432 Hz.',
    ],
    metrics: [
      { label: 'Planta Sagrada', value: 'Wachuma Tradicional' },
      { label: 'Ambiente', value: 'Maloka Circular de Paja' },
      { label: 'Acompañamiento', value: '1:2 Guía-Participante' },
      { label: 'Integración', value: 'Círculo Matutino' },
    ],
  },
  {
    id: 'talleres',
    indexNumber: '05',
    navTitle: 'Talleres 4+ Días',
    title: 'Talleres Inmersivos de 4 a + Días',
    quechua: 'Allpa Yachay Wasi',
    category: 'Inmersión en Ecoaldea',
    year: '2026',
    videoSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    photoSrc: '/assets/ecoaldea/adobe-house.jpg',
    uploadedPhotoPlaceholderName: 'WhatsApp Image 2026-09-11 at 1.24.38 PM.jpeg',
    aspectRatio: '16:9',
    durationSeconds: 18,
    location: 'Casa Central de Adobe & Ecoaldea',
    altitude: '3,250 msnm',
    logline: 'Vivir y aprender de la tierra: bioconstrucción con adobe, permacultura andina, cocina solar y vida comunitaria real.',
    quote: '«La tierra no se estudia en libros; se comprende cuando tus manos tocan su latido.»',
    credits: {
      directors: ['Equipo de Arquitectura Bioclimática & Permacultura'],
      guardians: ['Comunidad Residente Pampa Ñusta'],
      location: 'Casa de Adobe de Dos Plantas con Mirador',
      capacity: '12 Participantes por Cohorte',
      duration: 'Programas de 4, 7 y 14 Días',
      category: 'Formación Residencial Práctica',
    },
    highlights: [
      'Hospedaje en la casa bioclimática de adobe con balcón de madera y murales sagrados.',
      'Práctica directa de fabricación de adobes, tapial y revoques naturales de cal y barro.',
      'Sistemas de captación de agua de lluvia, tratamiento con humedales y energía solar.',
      'Inmersión en sociocracia, economía regenerativa y gobernanza comunitaria.',
    ],
    metrics: [
      { label: 'Duración', value: '4 a 14 Días' },
      { label: 'Alojamiento', value: 'Habitaciones en Adobe' },
      { label: 'Alimentación', value: '100% Orgánica del Huerto' },
      { label: 'Certificación', value: 'Bioconstrucción Andina' },
    ],
  },
];
