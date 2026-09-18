export interface SanctuaryFacilityService {
  title: string;
  description: string;
  targetAudience: string;
}

export interface SanctuaryProjectRoadmap {
  phase: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'planned';
}

export interface SanctuaryProjectBenefit {
  icon: 'leaf' | 'globe' | 'heart' | 'trending-up' | 'shield' | 'award';
  title: string;
  description: string;
}

export interface SanctuaryFacilityCustomSection {
  title: string;
  type: 'text' | 'taxonomy' | 'highlight';
  content?: string;
  bullets?: string[];
  metrics?: { label: string; value: string }[];
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
  
  // New Professional / Research Fields
  neuromarketingHook: string;
  researchObjectives: string[];
  projectBudget: string;
  roadmap: SanctuaryProjectRoadmap[];
  scope: string;
  benefits: SanctuaryProjectBenefit[];
  customSections?: SanctuaryFacilityCustomSection[];

  capacity: string;
  schedule: string;
  videoTimestamp: string;
  videoTimeSeconds: number;
  imageUrl: string;
  accentColor: string;
}

import { useTranslation } from 'react-i18next';

export const useSanctuaryFacilities = (): SanctuaryFacility[] => {
  const { t } = useTranslation();

  return [
    {
      id: 'wachuma-wasi',
      name: t('pampa_facilities.wachuma_wasi.name'),
      quechuaName: 'Wachuma Wasi · Templo del Cactus Sagrado',
      category: 'Conservación Botánica & Etnobotánica',
      tag: 'Banco Genético Central',
      altitude: '3,347 m.s.n.m.',
      coordinates: { pitch: -6, yaw: 18 },
      shortDesc: t('pampa_facilities.wachuma_wasi.shortDesc'),
      fullDesc: t('pampa_facilities.wachuma_wasi.fullDesc'),
      neuromarketingHook: t('pampa_facilities.wachuma_wasi.neuromarketingHook'),
      scope: t('pampa_facilities.wachuma_wasi.scope'),
      researchObjectives: [
        'Identificación taxonómica y fenotípica de 40 linajes madre ancestrales.',
        'Aclimatación y resistencia al estrés hídrico en domos de arquitectura pasiva.',
        'Propagación biotecnológica de 5,000 clones para reforestación endémica.'
      ],
      customSections: [
        {
          title: 'Objetivo del Banco Genético',
          type: 'text',
          content: 'Frente a la tala indiscriminada y el saqueo silvestre del cactus sagrado en los valles interandinos, Pampa Ñusta ha creado un banco de germoplasma vivo donde cada ejemplar es catalogado, cuidado y propagado asexualmente por esquejes madre.',
          bullets: [
            'Protección de Clones: Preservación de genotipos con 7 y 8 costillas sagradas y alta resiliencia a heladas de 3,347 msnm.',
            'Riego por Gravedad: Canales incaicos de agua pura de manantial que nutren el sustrato pedregoso.',
            'Polinización Natural: Mantenimiento de corredores biológicos para murciélagos nectarívoros y mariposas nocturnas.'
          ]
        },
        {
          title: 'Taxonomía & Biometría',
          type: 'taxonomy',
          metrics: [
            { label: 'Nombre Científico', value: 'Trichocereus pachanoi' },
            { label: 'Sinónimo Aceptado', value: 'Echinopsis pachanoi' },
            { label: 'Nombre Quechua', value: 'Achuma / Wachuma' },
            { label: 'Distribución Hábitat', value: '2,000 - 3,400 msnm' },
            { label: 'Crecimiento Anual', value: '30 - 45 cm / año' },
            { label: 'Floración', value: 'Nocturna, 19-24 cm, blanca' }
          ]
        },
        {
          title: 'El Guardián de la Visión Andina',
          type: 'highlight',
          content: 'Representado en los monolitos de la cultura Chavín de Huántar desde hace más de 3,000 años, la Wachuma era considerada la llave para conectar el Kay Pacha (mundo del presente) con el Hanan Pacha (mundo espiritual).\n\n**Rito de Agradecimiento:**\nAntes de realizar cualquier poda o cuidado en el huerto, los guardianes de Pampa Ñusta realizan el Kintu (ofrenda de 3 hojas de coca) pidiendo permiso a los Apus Linli y Pachatusan.'
        }
      ],
      benefits: [
        { icon: 'award', title: 'Certificado de Adopción', description: 'Reconocimiento fiscal deducible de impuestos (según país de origen).' },
        { icon: 'leaf', title: 'Apadrinamiento Directo', description: 'Tu nombre en un linaje madre ancestral custodiado en el domo.' },
        { icon: 'heart', title: 'Retiros Exclusivos', description: 'Acceso anual a ceremonias privadas de integración botánica.' }
      ],
      projectBudget: '$ 45,500 USD',
      roadmap: [
        { phase: 'Fase I', title: 'Infraestructura Bioclimática', description: 'Levantamiento topográfico y construcción de la estructura geodésica con madera certificada.', status: 'completed' },
        { phase: 'Fase II', title: 'Rescate de Linajes', description: 'Recolección ética de especímenes madre y trasplante con sustratos volcánicos especializados.', status: 'in-progress' },
        { phase: 'Fase III', title: 'Propagación Masiva', description: 'Desarrollo de almácigos y clones para reintroducción ecológica en ecosistemas degradados.', status: 'planned' }
      ],
      infrastructureDetails: [
        'Estructura geodésica de madera certificada con cubierta de policarbonato alveolar UV',
        'Sistema de sustrato multicapa con piedra pómez, zeolita y humus de bosque andino',
        'Sensores IoT para monitoreo de humedad, temperatura y radiación fotosintética',
        'Banco de propagación vegetativa de alta esterilidad'
      ],
      servicesOffered: [
        {
          title: 'Visitas Guiadas de Etnobotánica Sagrada',
          description: 'Recorrido educativo de 90 minutos con botánicos locales sobre historia, taxonomía y rol cultural de la Wachuma en las civilizaciones preincas.',
          targetAudience: 'Investigadores, botánicos, estudiantes y viajeros conscientes'
        }
      ],
      capacity: '25 personas por grupo',
      schedule: 'Martes a Domingo: 09:00 - 17:00 hrs',
      videoTimestamp: '01:15',
      videoTimeSeconds: 75,
      imageUrl: '/assets/ecoaldea/instalacion_domo_wachuma.jpg',
      accentColor: 'emerald'
    },
    {
      id: 'arca-semillas',
      name: t('pampa_facilities.arca_semillas.name'),
      quechuaName: 'Muru Muyu Kawsay · Arca de Biodiversidad',
      category: 'Soberanía Alimentaria & Agroecología',
      tag: 'Custodia de Germoplasma',
      altitude: '3,330 m.s.n.m.',
      coordinates: { pitch: 12, yaw: -65 },
      shortDesc: t('pampa_facilities.arca_semillas.shortDesc'),
      fullDesc: t('pampa_facilities.arca_semillas.fullDesc'),
      neuromarketingHook: t('pampa_facilities.arca_semillas.neuromarketingHook'),
      scope: t('pampa_facilities.arca_semillas.scope'),
      researchObjectives: [
        'Rescate y preservación criogénica in-situ de 250 ecotipos de cultivos andinos.',
        'Análisis de resistencia a heladas y sequías extremas frente al calentamiento global.',
        'Distribución solidaria de germoplasma fortificado a 18 comunidades del Ayllu.'
      ],
      benefits: [
        { icon: 'shield', title: 'Custodio Honorífico', description: 'Reconocimiento oficial como protector del Patrimonio de la Humanidad.' },
        { icon: 'globe', title: 'Reportes de Impacto', description: 'Acceso a métricas de distribución comunitaria y análisis agrícola.' },
        { icon: 'award', title: 'Caja de Semillas Ancestrales', description: 'Envío anual a tu domicilio de un kit simbólico de germoplasma andino.' }
      ],
      projectBudget: '$ 32,000 USD',
      roadmap: [
        { phase: 'Fase I', title: 'Bóveda de Barro', description: 'Construcción de recintos isotérmicos subterráneos con adobe de alta densidad.', status: 'completed' },
        { phase: 'Fase II', title: 'Catálogo de Ecotipos', description: 'Recolección, secado en sombra y clasificación morfológica de semillas autóctonas.', status: 'in-progress' },
        { phase: 'Fase III', title: 'Laboratorio de Germinación', description: 'Implementación de microscopios y cámaras de germinación controlada.', status: 'planned' }
      ],
      infrastructureDetails: [
        'Cámaras de secado tradicional en sombra con corrientes de aire cordillerano',
        'Más de 200 accesiones de semillas nativas documentadas con origen comunal',
        'Vasijas de arcilla local y contenedores de vidrio protegidos de la radiación UV',
        'Mesa de cernido, selección manual y pruebas de germinación in-vitro'
      ],
      servicesOffered: [
        {
          title: 'Círculos de Trueque de Semillas (Chhalay)',
          description: 'Encuentros mensuales donde agricultores locales y custodios foráneos intercambian semillas nativas bajo el principio del Ayni.',
          targetAudience: 'Comunidades campesinas, agricultores agroecológicos y huertos urbanos'
        }
      ],
      capacity: '20 participantes simultáneos',
      schedule: 'Miércoles a Sábado: 10:00 - 16:00 hrs',
      videoTimestamp: '02:40',
      videoTimeSeconds: 160,
      imageUrl: '/assets/ecoaldea/instalacion_arca_semillas.jpg',
      accentColor: 'emerald'
    },
    {
      id: 'escuela-viva',
      name: t('pampa_facilities.escuela_viva.name'),
      quechuaName: 'Yachay Wasi · Erqekuna Pampa',
      category: 'Pedagogía de la Tierra',
      tag: 'Desarrollo Humano',
      altitude: '3,315 m.s.n.m.',
      coordinates: { pitch: -15, yaw: 95 },
      shortDesc: t('pampa_facilities.escuela_viva.shortDesc'),
      fullDesc: t('pampa_facilities.escuela_viva.fullDesc'),
      neuromarketingHook: t('pampa_facilities.escuela_viva.neuromarketingHook'),
      scope: t('pampa_facilities.escuela_viva.scope'),
      researchObjectives: [
        'Desarrollo de currículo pedagógico intercultural bilingüe (Quechua-Español).',
        'Evaluación del impacto del aprendizaje bio-experiencial en la psicomotricidad infantil.',
        'Integración de saberes ancestrales en la educación ambiental contemporánea.'
      ],
      benefits: [
        { icon: 'heart', title: 'Trazabilidad Educativa', description: 'Reportes semestrales del progreso académico de los niños apadrinados.' },
        { icon: 'trending-up', title: 'Placa Conmemorativa', description: 'Reconocimiento grabado en madera nativa exhibida en el anfiteatro.' },
        { icon: 'globe', title: 'Ceremonia de Clausura', description: 'Invitación VIP a la fiesta del Ayllu y celebración de fin de curso.' }
      ],
      projectBudget: '$ 28,500 USD',
      roadmap: [
        { phase: 'Fase I', title: 'Infraestructura Lúdica', description: 'Diseño e instalación de bio-juegos seguros con maderas nobles y cuerdas de fibras naturales.', status: 'completed' },
        { phase: 'Fase II', title: 'Aulas de Barro', description: 'Construcción de domos pequeños de súper-adobe para talleres artísticos de invierno.', status: 'in-progress' },
        { phase: 'Fase III', title: 'Programa de Becas', description: 'Financiamiento continuo para que 50 niños del valle accedan a educación complementaria gratuita.', status: 'planned' }
      ],
      infrastructureDetails: [
        'Juegos bio-constructivos elaborados en madera reciclada de eucalipto',
        'Anfiteatro de tierra compactada con acústica natural',
        'Aulas bioclimáticas de superadobe con techos recíprocos',
        'Corral ecológico de contacto para terapia asistida con camélidos'
      ],
      servicesOffered: [
        {
          title: 'Jornadas Educativas para Escuelas Rurales',
          description: 'Programas extracurriculares gratuitos sobre ecología andina, quechua y respeto a la naturaleza.',
          targetAudience: 'Estudiantes de primaria de la cuenca'
        }
      ],
      capacity: '40 niñas, niños y acompañantes',
      schedule: 'Fines de semana: 10:00 - 15:30 hrs',
      videoTimestamp: '04:05',
      videoTimeSeconds: 245,
      imageUrl: '/assets/ecoaldea/instalacion_escuela_viva.jpg',
      accentColor: 'emerald'
    },
    {
      id: 'maloka-ceremonial',
      name: t('pampa_facilities.maloka_ceremonial.name'),
      quechuaName: 'Willka Maloka · Hampiy Kancha',
      category: 'Medicina Tradicional Integrativa',
      tag: 'Investigación Etnopsiquiátrica',
      altitude: '3,355 m.s.n.m.',
      coordinates: { pitch: 22, yaw: -145 },
      shortDesc: t('pampa_facilities.maloka_ceremonial.shortDesc'),
      fullDesc: t('pampa_facilities.maloka_ceremonial.fullDesc'),
      neuromarketingHook: t('pampa_facilities.maloka_ceremonial.neuromarketingHook'),
      scope: t('pampa_facilities.maloka_ceremonial.scope'),
      researchObjectives: [
        'Estudio fenomenológico de la remisión de ansiedad clínica mediante plantas maestras.',
        'Medición de frecuencias acústicas (432 Hz) y su impacto en el sistema nervioso parasimpático.',
        'Sistematización de los protocolos de dieta y purificación andina.'
      ],
      benefits: [
        { icon: 'trending-up', title: 'Co-Autoría en Investigación', description: 'Tu nombre en los reportes clínicos sobre neuroplasticidad.' },
        { icon: 'heart', title: 'Retiro Privado VIP', description: 'Un retiro privado anual en la Maloka para ti y acompañantes.' },
        { icon: 'shield', title: 'Pionero Integrativo', description: 'Acceso a la mesa de consejeros del avance psiquiátrico-tradicional.' }
      ],
      projectBudget: '$ 65,000 USD',
      roadmap: [
        { phase: 'Fase I', title: 'Cimentación y Muros', description: 'Levantamiento de muros de adobe sismo-resistente y techos de paja brava.', status: 'completed' },
        { phase: 'Fase II', title: 'Tratamiento Acústico', description: 'Ingeniería de sonido natural empleando resonadores cerámicos incrustados en los muros.', status: 'in-progress' },
        { phase: 'Fase III', title: 'Clínica Integrativa', description: 'Construcción de áreas anexas para monitoreo médico y contención terapéutica post-ceremonial.', status: 'planned' }
      ],
      infrastructureDetails: [
        'Planta circular de 12 metros inspirada en geometría fractal andina',
        'Resonadores acústicos ancestrales para amplificación armónica',
        'Sistemas de calefacción radiante subterránea tipo "gloria"',
        'Zonas de integración psicológica con luz ámbar regulable'
      ],
      servicesOffered: [
        {
          title: 'Retiros Clínico-Tradicionales',
          description: 'Intervenciones terapéuticas inmersivas guiadas por facilitadores integrativos y chamanes de la nación Q\'ero.',
          targetAudience: 'Pacientes en recuperación de TEPT, depresión y adicciones'
        }
      ],
      capacity: '30 personas en círculo ceremonial',
      schedule: 'Previa reserva y evaluación clínica',
      videoTimestamp: '05:25',
      videoTimeSeconds: 325,
      imageUrl: '/assets/ecoaldea/instalacion_maloka_ceremonial.jpg',
      accentColor: 'emerald'
    },
    {
      id: 'terrazas-permacultura',
      name: t('pampa_facilities.terrazas_permacultura.name'),
      quechuaName: 'Allpa Kawsay · Mikuna Wasi',
      category: 'Ingeniería Agrícola & Resiliencia Climática',
      tag: 'Piloto Hidro-Solar',
      altitude: '3,290 m.s.n.m.',
      coordinates: { pitch: -18, yaw: 170 },
      shortDesc: t('pampa_facilities.terrazas_permacultura.shortDesc'),
      fullDesc: t('pampa_facilities.terrazas_permacultura.fullDesc'),
      neuromarketingHook: t('pampa_facilities.terrazas_permacultura.neuromarketingHook'),
      scope: t('pampa_facilities.terrazas_permacultura.scope'),
      researchObjectives: [
        'Evaluación de eficiencia hídrica combinando andenería tradicional y riego de ultra-bajo caudal.',
        'Análisis de secuestro de carbono en suelos restaurados con agricultura sintrópica.',
        'Desarrollo de un modelo económico de huella de carbono negativa para agricultores locales.'
      ],
      benefits: [
        { icon: 'leaf', title: 'Bonos de Carbono', description: 'Métricas certificadas de toneladas de carbono secuestradas anualmente.' },
        { icon: 'globe', title: 'Modelo Open-Source', description: 'Derechos para replicar nuestra ingeniería agro-solar en tus próprios terrenos.' },
        { icon: 'award', title: 'Legado Físico', description: 'Tu nombre en la red de abastecimiento hídrico e infraestructura solar.' }
      ],
      projectBudget: '$ 80,000 USD',
      roadmap: [
        { phase: 'Fase I', title: 'Restauración Lítica', description: 'Reconstrucción de muros de contención incaicos y estabilización de taludes.', status: 'completed' },
        { phase: 'Fase II', title: 'Bombeo Solar', description: 'Instalación de paneles solares y sistemas de impulsión de agua desde acuíferos profundos.', status: 'in-progress' },
        { phase: 'Fase III', title: 'Agro-Robótica Básica', description: 'Integración de sensores de humedad de suelo conectados por LoRaWAN para riego autónomo.', status: 'planned' }
      ],
      infrastructureDetails: [
        'Muros de andenería seca estabilizada con vetiver y agaves nativos',
        'Red de tuberías presurizadas y micro-aspersores autocompensados',
        'Estación agrometeorológica con transmisión de datos en tiempo real',
        'Composteras biodinámicas con control térmico'
      ],
      servicesOffered: [
        {
          title: 'Transferencia Tecnológica Comunitaria',
          description: 'Capacitación a líderes comunales en instalación de sistemas solares y mantenimiento de riego tecnificado.',
          targetAudience: 'Ingenieros agrónomos, ONGs y comunidades campesinas'
        }
      ],
      capacity: '35 investigadores y pasantes',
      schedule: 'Lunes a Domingo: 08:30 - 17:00 hrs',
      videoTimestamp: '06:45',
      videoTimeSeconds: 405,
      imageUrl: '/assets/ecoaldea/instalacion_terrazas_permacultura.jpg',
      accentColor: 'emerald'
    }
  ];
};

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
