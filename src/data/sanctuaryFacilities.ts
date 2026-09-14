export interface SanctuaryFacilityService {
  title: string;
  description: string;
  targetAudience: string;
}

export interface SanctuaryFacility {
  id: string;
  name: string;
  quechuaName: string;
  category: string;
  tag: string;
  altitude: string;
  coordinates: {
    pitch: number;
    yaw: number;
  };
  shortDesc: string;
  fullDesc: string;
  infrastructureDetails: string[];
  servicesOffered: SanctuaryFacilityService[];
  capacity: string;
  schedule: string;
  videoTimestamp: string;
  videoTimeSeconds: number;
  imageUrl: string;
  accentColor: string;
}

export const PAMPA_NUSTA_FACILITIES: SanctuaryFacility[] = [
  {
    id: 'wachuma-wasi',
    name: 'Domo Geodésico & Banco Genético de la Wachuma',
    quechuaName: 'Wachuma Wasi · Templo del Cactus Sagrado',
    category: 'Conservación Botánica & Etnobotánica',
    tag: 'Banco Genético Central',
    altitude: '3,347 m.s.n.m.',
    coordinates: { pitch: -6, yaw: 18 },
    shortDesc: 'Invernadero geodésico bioclimático con más de 40 linajes madre de Trichocereus pachanoi y peruvianus aclimatados.',
    fullDesc: 'El corazón botánico de Pampa Ñusta. Un domo geodésico de arquitectura bioclimática pasiva que alberga la mayor colección viva de cactus sagrado Wachuma de la cuenca del Vilcanota. Diseñado para emular el microclima de quebrada andina con sustratos minerales volcánicos, ventilación cenital y captación térmica diurna para proteger a los linajes madre de las heladas nocturnas.',
    infrastructureDetails: [
      'Estructura geodésica de madera certificada con cubierta de policarbonato alveolar UV',
      'Más de 40 linajes madre identificados taxonómica y genéticamente',
      'Sistema de sustrato multicapa con piedra pómez, zeolita y humus de bosque andino',
      'Banco de propagación vegetativa para reintroducción ecológica en laderas secas'
    ],
    servicesOffered: [
      {
        title: 'Visitas Guiadas de Etnobotánica Sagrada',
        description: 'Recorrido educativo de 90 minutos con botánicos locales sobre historia, taxonomía y rol cultural de la Wachuma en las civilizaciones preincas.',
        targetAudience: 'Investigadores, botánicos, estudiantes y viajeros conscientes'
      },
      {
        title: 'Programa de Apadrinamiento de Linajes Madre',
        description: 'Adopción simbólica de un cactus centenario para financiar su cuidado, nutrición orgánica y estudio taxonómico con certificado oficial.',
        targetAudience: 'Mecenas y guardianes de la biodiversidad'
      },
      {
        title: 'Talleres de Propagación y Resiliencia Cactácea',
        description: 'Aprende las técnicas de corte, cicatrizado, enraizado y cuidado de cactáceas andinas para jardines xerófitos y biohuertos.',
        targetAudience: 'Horticultores y aficionados a la botánica'
      }
    ],
    capacity: '25 personas por grupo',
    schedule: 'Martes a Domingo: 09:00 - 17:00 hrs',
    videoTimestamp: '01:15',
    videoTimeSeconds: 75,
    imageUrl: '/facilities/domo_geodesico.jpg',
    accentColor: 'emerald'
  },
  {
    id: 'arca-semillas',
    name: 'Arca de Semillas Andinas & Laboratorio Vivo',
    quechuaName: 'Muru Muyu Kawsay · Arca de Biodiversidad',
    category: 'Soberanía Alimentaria & Agroecología',
    tag: 'Custodia de Germoplasma',
    altitude: '3,330 m.s.n.m.',
    coordinates: { pitch: 12, yaw: -65 },
    shortDesc: 'Santuario de germoplasma con más de 200 variedades nativas de maíz sagrado, papas andinas, quinua y kiwicha.',
    fullDesc: 'Construido como una bóveda bioclimática de adobe y arcilla curada, el Arca de Semillas custodia el patrimonio genético de los Andes. Conserva variedades ancestrales de maíces policromos, tubérculos nativos de altura y granos sagrados, almacenados en vasijas de arcilla selladas con cera de abeja natural que previenen plagas sin un solo gramo de agroquímicos.',
    infrastructureDetails: [
      'Cámaras de secado tradicional en sombra con corrientes de aire cordillerano',
      'Más de 200 accesiones de semillas nativas documentadas con origen comunal',
      'Vasijas de arcilla local y contenedores de vidrio protegidos de la radiación',
      'Mesa de cernido, selección manual y pruebas de germinación en vivo'
    ],
    servicesOffered: [
      {
        title: 'Círculos de Trueque de Semillas (Chhalay)',
        description: 'Encuentros mensuales donde agricultores locales y custodios foráneos intercambian semillas nativas bajo el principio del Ayni.',
        targetAudience: 'Comunidades campesinas, agricultores agroecológicos y huertos urbanos'
      },
      {
        title: 'Talleres de Manejo y Cosecha Limpia',
        description: 'Formación práctica en métodos andinos de conservación, desgranado, secado en sombra y selección de plantas semilleras.',
        targetAudience: 'Productores rurales y jóvenes aprendices de la tierra'
      },
      {
        title: 'Entrega Solidaria a Familias Quechuas',
        description: 'Donación directa de lotes de semillas multiplicadas en Pampa Ñusta a familias campesinas en riesgo de pérdida de cosechas.',
        targetAudience: 'Familias de las comunidades altas de Pisac'
      }
    ],
    capacity: '20 participantes simultáneos',
    schedule: 'Miércoles a Sábado: 10:00 - 16:00 hrs',
    videoTimestamp: '02:40',
    videoTimeSeconds: 160,
    imageUrl: '/facilities/arca_semillas.jpg',
    accentColor: 'emerald'
  },
  {
    id: 'escuela-viva',
    name: 'Escuela Viva & Bio-Parque Infantil Andino',
    quechuaName: 'Yachay Wasi · Erqekuna Pampa',
    category: 'Pedagogía de la Tierra & Comunidad',
    tag: 'Espacio Educativo Familiar',
    altitude: '3,315 m.s.n.m.',
    coordinates: { pitch: -15, yaw: 95 },
    shortDesc: 'Aldea pedagógica al aire libre con anfiteatro de barro, bio-juegos de madera, huerto infantil y rescate de alpacas.',
    fullDesc: 'Un espacio pionero en los Andes donde la naturaleza es el aula. Diseñado para que niñas y niños de las comunidades rurales y visitantes internacionales reconecten con los ciclos de la tierra. Incluye un anfiteatro circular de barro para asambleas infantiles, laberinto de plantas aromáticas polinizadoras, huerto interactivo de siembra y un pequeño corral de alpacas y cuyes rescatados.',
    infrastructureDetails: [
      'Juegos bio-constructivos elaborados en madera reciclada de eucalipto y cuerdas de cabuya',
      'Anfiteatro de tierra compactada para teatro andino y asambleas infantiles',
      'Bio-huerto a escala infantil para el aprendizaje vivencial de la siembra (Tarpuy)',
      'Corral ecológico de contacto y alimentación con camélidos andinos'
    ],
    servicesOffered: [
      {
        title: 'Jornadas Educativas para Escuelas Rurales',
        description: 'Programas extracurriculares gratuitos para escuelas públicas de Pisac sobre ecología andina, quechua y respeto a la naturaleza.',
        targetAudience: 'Estudiantes de primaria y secundaria de la cuenca'
      },
      {
        title: 'Talleres de Barro, Tintes Naturales y Siembra Infantil',
        description: 'Actividades de fin de semana para familias: modelado con arcilla, teñido con cochinilla y hierbas, y siembra de su propia planta.',
        targetAudience: 'Familias con niñas y niños de 4 a 14 años'
      },
      {
        title: 'Cuentacuentos Andinos y Música Ancestral',
        description: 'Relatos orales bilingües (quechua y español) de mitos tutelares, el río Willakamayu y canciones tradicionales con quenas y tinyas.',
        targetAudience: 'Toda la familia'
      }
    ],
    capacity: '40 niñas, niños y acompañantes',
    schedule: 'Sábados y Domingos: 10:00 - 15:30 hrs (Entre semana para colegios)',
    videoTimestamp: '04:05',
    videoTimeSeconds: 245,
    imageUrl: '/facilities/escuela_viva.jpg',
    accentColor: 'emerald'
  },
  {
    id: 'maloka-ceremonial',
    name: 'Maloka Ceremonial & Espacio Sonoro 432 Hz',
    quechuaName: 'Willka Maloka · Hampiy Kancha',
    category: 'Medicina Tradicional & Sanación Holística',
    tag: 'Templo de Bioconstrucción',
    altitude: '3,355 m.s.n.m.',
    coordinates: { pitch: 22, yaw: -145 },
    shortDesc: 'Templo circular de adobe tradicional con techo de paja brava, acústica natural y círculos de plantas maestras.',
    fullDesc: 'Templo ceremonial sagrado edificado según los preceptos de la cosmovisión andina y la geometría sagrada. Sus muros de adobe térmico de 60 cm de espesor y su cúpula cónica de paja brava generan una atmósfera de silencio absoluto y recogimiento. El espacio cuenta con una acústica natural resonante que potencia las frecuencias armónicas de 432 Hz de instrumentos tradicionales.',
    infrastructureDetails: [
      'Panta circular de 12 metros de diámetro con óculo cenital para observación estelar',
      'Muros de adobe crudo reforzados con paja y madera noble local',
      'Piso de tierra compactada encerada naturalmente con aceites vegetales',
      'Zona anexa de temazcal andino con piedras volcánicas de río sagrado'
    ],
    servicesOffered: [
      {
        title: 'Círculos de Plantas Maestras Tradicionales',
        description: 'Ceremonias nocturnas y diurnas guiadas por taitas y curanderos linajudos bajo rigurosa preparación dietaria y respeto sagrado.',
        targetAudience: 'Buscadores espirituales y personas en procesos de sanación profunda'
      },
      {
        title: 'Inmersión Sonora y Terapia Frecuencias 432 Hz',
        description: 'Baños de sonido con pututus de concha marina, quenas prehispánicas, cuencos de cristal y cantos tradicionales de sanación.',
        targetAudience: 'Personas que buscan desestresarse, armonizar su sistema nervioso y meditar'
      },
      {
        title: 'Baños de Vapor Andino (Inipi / Temazcal)',
        description: 'Purificación física y emocional con piedras volcánicas incandescentes aromatizadas con eucalipto silvestre, muña y ruda.',
        targetAudience: 'Grupos pequeños en retiro y mecenas de la reserva'
      }
    ],
    capacity: '30 personas en círculo ceremonial',
    schedule: 'Previa reserva y entrevista dietaria previa',
    videoTimestamp: '05:25',
    videoTimeSeconds: 325,
    imageUrl: '/facilities/maloka_ceremonial.jpg',
    accentColor: 'emerald'
  },
  {
    id: 'terrazas-permacultura',
    name: 'Terrazas de Permacultura, Cocina Sagrada & Vivero',
    quechuaName: 'Allpa Kawsay · Mikuna Wasi',
    category: 'Agroecología Regenerativa & Nutrición',
    tag: 'Andenería Regenerativa',
    altitude: '3,290 m.s.n.m.',
    coordinates: { pitch: -18, yaw: 170 },
    shortDesc: 'Andenes recuperados con microaspersión solar, huerto bio-intensivo, cocina a leña limpia y reforestación de queñuales.',
    fullDesc: 'La muestra viva de cómo la sabiduría hidráulica inca se fusiona con la permacultura contemporánea. Cinco niveles de terrazas agrícolas restauradas con captación de vertientes naturales, compostaje biodinámico de alta montaña, una cocina comunitaria basada en productos libres de pesticidas cosechados al instante y un vivero dedicado a la reforestación de queñuales (Polylepis).',
    infrastructureDetails: [
      'Sistema de riego por goteo y microaspersión alimentado por energía fotovoltaica',
      'Bancales bio-intensivos con cobertura viva (mulch) y rotación continua de cultivos',
      'Cocina comunitaria con estufas ahorradoras de leña rocket y hornos de barro',
      'Vivero forestal con capacidad de 5,000 plantones anuales de queñual y chachacomo'
    ],
    servicesOffered: [
      {
        title: 'Almuerzos Agroecológicos "De la Chacra al Plato"',
        description: 'Menú gastronómico nutritivo elaborado con verduras, hierbas y granos cosechados directamente de las terrazas el mismo día.',
        targetAudience: 'Visitantes del santuario, familias y grupos de retiro'
      },
      {
        title: 'Voluntariado y Pasantías en Permacultura Andina',
        description: 'Programas de 1 a 4 semanas de trabajo práctico en andenes, bioconstrucción, compostaje y manejo holístico del agua.',
        targetAudience: 'Voluntarios nacionales e internacionales, agrónomos y ambientalistas'
      },
      {
        title: 'Jornadas Comunitarias de Reforestación Andina',
        description: 'Salidas de campo colectivas para plantar queñuales en las cabeceras de cuenca y quebradas para asegurar agua limpia a Pisac.',
        targetAudience: 'Comunidad de Pisac, turistas ecológicos y empresas mecenas'
      }
    ],
    capacity: '35 comensales y practicantes',
    schedule: 'Lunes a Domingo: 08:30 - 17:00 hrs',
    videoTimestamp: '06:45',
    videoTimeSeconds: 405,
    imageUrl: '/facilities/terrazas_permacultura.jpg',
    accentColor: 'emerald'
  }
];

export interface PanoramaSceneItem {
  id: string;
  name: string;
  quechua: string;
  subtitle: string;
  imageUrl: string;
  initialYaw: number;
  initialPitch: number;
}

export const SANCTUARY_PANORAMA_SCENES: PanoramaSceneItem[] = [
  {
    id: 'santuario-general',
    name: 'Vista Panorámica del Santuario & Domo Central',
    quechua: 'Pampa Ñusta Qaway',
    subtitle: 'Mirador superior sobre las laderas de Pisac y los domos bioclimáticos',
    imageUrl: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=2400&auto=format&fit=crop',
    initialYaw: 15,
    initialPitch: -5
  },
  {
    id: 'banco-wachuma',
    name: 'Jardín Botánico & Domo de la Wachuma',
    quechua: 'Wachuma Kawsay Pampa',
    subtitle: 'Invernadero geodésico y colección viva de cactáceas sagradas',
    imageUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=2400&auto=format&fit=crop',
    initialYaw: -30,
    initialPitch: 10
  },
  {
    id: 'maloka-ceremonial-view',
    name: 'Maloka Ceremonial & Terraza de Meditación',
    quechua: 'Willka Maloka Qhata',
    subtitle: 'Templo circular tradicional andino y explanada de sanación 432Hz',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2400&auto=format&fit=crop',
    initialYaw: 90,
    initialPitch: 5
  },
  {
    id: 'escuela-terrazas',
    name: 'Escuela Viva & Terrazas de Permacultura',
    quechua: 'Yachay Wasi Chakrakuna',
    subtitle: 'Andenería viva, bio-parque infantil y huertos agroecológicos',
    imageUrl: 'https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?q=80&w=2400&auto=format&fit=crop',
    initialYaw: -110,
    initialPitch: -15
  }
];

export interface SanctuaryReferenceVideo {
  id: string;
  title: string;
  subtitle: string;
  type: 'youtube' | 'mp4' | 'youtube360';
  url: string;
  embedUrl: string;
  thumbnailUrl: string;
  duration: string;
  tag: string;
  description: string;
}

export const SANCTUARY_REFERENCE_VIDEOS: SanctuaryReferenceVideo[] = [
  {
    id: 'pisac-docu',
    title: 'Expedición Andina: Enigma y Entorno de Pisac',
    subtitle: 'Video Referencial 4K HDR · Laderas, andenería y geografía sagrada',
    type: 'youtube',
    url: 'https://www.youtube.com/watch?v=CheJWYQvP98',
    embedUrl: 'https://www.youtube-nocookie.com/embed/CheJWYQvP98?autoplay=1&rel=0&modestbranding=1',
    thumbnailUrl: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=1600&auto=format&fit=crop',
    duration: '22:45 min',
    tag: 'Documental Referencial',
    description: 'Recorrido visual cinematográfico en 4K que muestra la majestuosidad de Pisac, sus quebradas andinas y la geografía donde se emplaza el Santuario Ecológico Pampa Ñusta.'
  },
  {
    id: 'sacred-valley-360',
    title: 'Recorrido Virtual 360° VR: Pisac y Valle Sagrado',
    subtitle: 'Video 360° Inmersivo interactivo · Giroscopio y rotación esférica',
    type: 'youtube360',
    url: 'https://www.youtube.com/watch?v=jX6kn9U8Pn8',
    embedUrl: 'https://www.youtube-nocookie.com/embed/jX6kn9U8Pn8?autoplay=1&rel=0&modestbranding=1',
    thumbnailUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=1600&auto=format&fit=crop',
    duration: '08:30 min',
    tag: 'VR 360° Inmersivo',
    description: 'Explora en 360 grados la panorámica viva del valle, montañas tutelares (Apus) y el microclima andino arrastrando con el cursor o moviendo tu dispositivo móvil.'
  },
  {
    id: 'eco-nature-mp4',
    title: 'Santuario Vivo: Naturaleza, Flora y Bioconstrucción',
    subtitle: 'Transmisión HD directa · Ecosistema, domos y biohuertos',
    type: 'mp4',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    embedUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?q=80&w=1600&auto=format&fit=crop',
    duration: '01:00 min',
    tag: 'Tomas Aéreas & Flora',
    description: 'Tomas de alta fidelidad que transmiten la paz, el viento andino y el verdor regenerativo de las terrazas agroecológicas y domos del santuario.'
  }
];

