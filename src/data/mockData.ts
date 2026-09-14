import { HotspotItem, StoryAct, RiverStation, TripAdvisorReview, DonationTier } from '../types';

export const STORY_ACTS: StoryAct[] = [
  {
    id: 1,
    title: 'El Desafío Imposible',
    quechuaTitle: 'Huayllapumap Sasa Munaynin',
    character: 'Cacique Huayllapuma & Princesa Inquill Chumpi',
    summary: 'El cacique gobernante de Pisac declara que solo quien una las dos orillas del tempestuoso Vilcanota en una sola noche será digno de casarse con su amada hija.',
    detail: 'En la cúspide del señorío de Pisac, las aguas del Willakamayu rugían indomables dividiendo los valles. Huayllapuma, celoso guardián de su linaje real, fijó una prueba que desafiaba a los mismos dioses: erigir un colosal puente de piedra antes del primer rayo del sol Inti.',
    visualEffect: 'warmth',
    stoneProgress: 0,
    quote: '«Aquel que dome las aguas salvajes antes del amanecer, gobernará junto a mi sangre.»',
    image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 2,
    title: 'El Juramento de Asto Rímac',
    quechuaTitle: 'Asto Rimacpa Tuta Ruwaynin',
    character: 'Príncipe Asto Rímac',
    summary: 'Enamorado ciegamente, el noble guerrero convoca a las fuerzas ocultas de la tierra y los espíritus Apus para levantar los pilares megalíticos en medio de la tiniebla.',
    detail: 'Asto Rímac aceptó el reto con una sola condición irrompible: la princesa Inquill Chumpi debía ascender a la montaña sagrada rezando a los ancestros sin jamás girar la vista hacia el abismo del río mientras durase la colosal labor.',
    visualEffect: 'tension',
    stoneProgress: 25,
    quote: '«Camina sin vacilar hacia la cima sagrada; si tus ojos buscan mi fatiga, la montaña reclamará nuestras almas.»',
    image: 'https://images.unsplash.com/photo-1589802829985-817e51171b92?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 3,
    title: 'La Mirada Prohibida',
    quechuaTitle: 'Hark\'asqa Qaway',
    character: 'Inquill Chumpi en la colina',
    summary: 'Angustiada por el estruendo de los bloques de granito y el fragor de la crecida, la princesa duda en el último suspiro de la noche.',
    detail: 'Faltaban instantes para el alba y solo un arco restaba para culminar la hazaña. Un trueno ensordecedor sacudió el cañón. Abrumada por el terror de que su amado hubiese perecido arrastrado por la corriente, Inquill Chumpi volteó su rostro hacia el valle.',
    visualEffect: 'climax',
    stoneProgress: 65,
    quote: '«Un solo latido de incertidumbre bastó para quebrantar el pacto cósmico del Tahuantinsuyo.»',
    image: 'https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 4,
    title: 'La Petrificación Eterna',
    quechuaTitle: 'Wiñay Rumi Tukupuy',
    character: 'Los Guardianes Pétreos de Pisac',
    summary: 'La maldición ancestral congeló sus cuerpos al instante. Hoy, la figura solitaria de la Ñusta vigila desde la roca el río y las terrazas infinitas.',
    detail: 'Al cruzar sus miradas en la penumbra del amanecer, un viento gélido petrificó a Asto Rímac sobre los cimientos del puente inacabado y a Inquill Chumpi en lo alto del escarpado andino. Convertidos en monolitos eternos, su amor resguarda la memoria imperecedera del Parque Arqueológico.',
    visualEffect: 'petrified',
    stoneProgress: 100,
    quote: '«No murieron: se volvieron piedra sagrada (Wak\'a), templando el espíritu de quienes habitamos el Valle Sagrado.»',
    image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=1200&auto=format&fit=crop'
  }
];

export const ARCHEOLOGICAL_HOTSPOTS: HotspotItem[] = [
  {
    id: 'intihuatana',
    name: 'El Intihuatana',
    quechuaName: 'Inti Watana (Amarrador del Sol)',
    category: 'Centro Astronómico y Ceremonial',
    coordinates: { pitch: -8, yaw: 12 },
    altitude: '3,375 m.s.n.m.',
    tag: 'Templo Solar Principal',
    shortDesc: 'Monolito ceremonial esculpido en roca viva para medir los solsticios y calcular el ciclo agrícola imperial.',
    fullDesc: 'Considerado el corazón espiritual de Pisac, el Intihuatana descansa sobre una esplanada semicircular de cantería fina de estilo imperial inca. Su columna tallada en la roca madre servía a los astrónomos y sacerdotes (Willka Uma) para amarrar la trayectoria solar durante el solsticio de invierno en junio, asegurando el renacimiento de las cosechas y el favor del dios Inti.',
    architecturalDetails: [
      'Mampostería de granito pulido sin argamasa con junta milimétrica',
      'Alineamiento axial astronómico con los cerros tutelares (Apus Linli y Pachatusan)',
      'Hornacinas y ventanas trapezoidales con leve inclinación antisísmica de 7 grados',
      'Canal de libación ritual tallado en la misma roca para ofrendas de chicha'
    ],
    historicalDebate: 'Algunos cronistas sugieren que servía además como observatorio de las Pléyades (Qollqa) para sincronizar las siembras de maíz en las terrazas de Ajchapata.',
    imageUrl: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'kallaqhasa',
    name: 'Kallaqhasa',
    quechuaName: 'Qallaqhasa (Barrio Sagrado / La Ciudadela Alta)',
    category: 'Complejo Residencial y Militar',
    coordinates: { pitch: 18, yaw: -45 },
    altitude: '3,450 m.s.n.m.',
    tag: 'Arquitectura y Túneles',
    shortDesc: 'Sector residencial encaramado sobre un filo rocoso con enigmáticos túneles subterráneos excavados en la montaña.',
    fullDesc: 'Erguido sobre la zona más elevada y agreste de Pisac, Kallaqhasa albergaba a la élite militar y sacerdotal. Destaca por sus viviendas de piedra unidas con fino barro arcilloso y sus dos túneles tallados directamente en la roca madre (de 3 y 16 metros de longitud), que atraviesan los riscos para conectar vertientes opuestas.',
    architecturalDetails: [
      'Túnel de 16 metros excavado a mano en piedra dura volcánica',
      'Muros de contención perimétricos al borde de abismos de más de 300 metros',
      'Viviendas rectangulares con dobles jambas en las portadas de acceso',
      'Sistema de vigías con visual directa a las rutas de penetración amazónica'
    ],
    historicalDebate: 'El debate arqueológico actual confronta si los túneles eran pasajes de repliegue táctico militar, canales de comunicación encubiertos o conductos ceremoniales de renacimiento espiritual subterráneo (Uku Pacha).',
    imageUrl: 'https://images.unsplash.com/photo-1589802829985-817e51171b92?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'tantamarka',
    name: 'Tantamarka',
    quechuaName: 'Tantana Marka (Cementerio Prehispánico)',
    category: 'Necrópolis Imperial Andina',
    coordinates: { pitch: 26, yaw: 90 },
    altitude: '3,320 m.s.n.m.',
    tag: 'Memoria de los Ancestros',
    shortDesc: 'Cientos de tumbas excavadas en la pared vertical del acantilado, la necrópolis más vasta del Valle Sagrado.',
    fullDesc: 'Frente a los andenes ceremoniales, los escarpados farallones de Tantamarka revelan una asombrosa concentración de oquedades funerarias. En ellas reposaban miles de fardos funerarios incas envueltos en textiles policromos, colocados en posición fetal para su tránsito hacia el Hanan Pacha.',
    architecturalDetails: [
      'Tumbas en nichos naturales y tallados a más de 100 metros de altura vertical',
      'Acceso original mediante cuerdas de ichu y andamiajes de madera suspendidos',
      'Orientación solar este para recibir el calor purificador del sol naciente',
      'Silos de ofrendas adyacentes para acompañar el viaje espiritual del difunto'
    ],
    historicalDebate: 'A pesar del grave expolio sufrido en la época colonial y republicana, los estudios bioarqueológicos modernos continúan desentrañando la dieta, procedencia y linaje de los ciudadanos que custodiaban el centro administrativo.',
    imageUrl: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'andeneria',
    name: 'Andenería de Ajchapata y Qantus Raqay',
    quechuaName: 'Ajchapata Terrasas',
    category: 'Ingeniería Hidráulica y Agrícola',
    coordinates: { pitch: -22, yaw: -110 },
    altitude: '3,200 - 3,400 m.s.n.m.',
    tag: 'Obra Maestra Topográfica',
    shortDesc: 'Gigantescas terrazas curvas en forma de abanico que domaron la erosión y generaron microclimas térmicos.',
    fullDesc: 'Las terrazas agrícolas de Pisac representan la cúspide de la ingeniería ambiental andina. Construidas con capas de piedras de grava, arena y tierra fértil traída desde el fondo del valle, estas terrazas retenían el calor solar durante el día y lo liberaban gradualmente en las gélidas noches andinas, impidiendo que las heladas destruyeran los cultivos experimentales.',
    architecturalDetails: [
      'Estructura multicapa: drenaje basal de piedra gruesa, filtro de arena y manto vegetal',
      'Muros de contención con inclinación de 10 a 12 grados contra la presión del terreno',
      'Canales de agua con gradientes milimétricos y pozas de desaceleración de caudal',
      'Diferencial térmico de hasta 4°C entre la terraza superior y la inferior'
    ],
    historicalDebate: 'Operaban como estaciones de domesticación y aclimatación de más de 20 variedades de maíz y tubérculos autóctonos.',
    imageUrl: 'https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'qoriwayrachina',
    name: 'Qoriwayrachina',
    quechuaName: 'Qori Wayrachina (Donde el Viento Purifica el Oro)',
    category: 'Torreones y Bastión Defensivo',
    coordinates: { pitch: 10, yaw: 160 },
    altitude: '3,480 m.s.n.m.',
    tag: 'Atalaya Militar',
    shortDesc: 'Torreones semicirculares y atalayas de control territorial sobre el cañón del Vilcanota hacia el Cusco imperial.',
    fullDesc: 'Emplazado en un saliente rocoso de visión panorámica de 360 grados, Qoriwayrachina custodiaba la entrada nororiental al Valle Sagrado. Sus torreones semicirculares de cantería precisa permitían a los centinelas divisar a días de camino cualquier columna de avanzada proveniente de la ceja de selva del Antisuyo o de los valles rebeldes.',
    architecturalDetails: [
      'Planta semicircular optimizada para resistir empujes de viento cordillerano',
      'Parapetos defensivos con troneras de observación protegidas',
      'Puntos de comunicación visual mediante hogueras y señales de humo con las ciudadelas vecinas',
      'Estructuras de fundición y aventamiento de metales preciosos al viento'
    ],
    historicalDebate: 'El topónimo sugiere que además de guarnición militar, funcionaba como un centro metalúrgico donde los vientos canalizados de la quebrada atizaban las huayras (hornos de fundición incas).',
    imageUrl: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?q=80&w=1200&auto=format&fit=crop'
  }
];

export const RIVER_STATIONS: RiverStation[] = [
  {
    id: 1,
    name: 'Abra de La Raya',
    quechuaName: 'La Raya Abra (Chawpi Qucha)',
    altitude: 4338,
    distanceKm: 0,
    significance: 'El Nacimiento Sagrado de las Aguas',
    culturalNote: 'Divisoria continental donde los deshielos glaciares del nevado Chimboya dan origen al río Vilcanota, venerado como el espejo terrenal de Mayu (la Vía Láctea).',
    iconType: 'source',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 2,
    name: 'Santuario de Ajchapata',
    quechuaName: 'Ajchapata Chakrakuna',
    altitude: 3200,
    distanceKm: 142,
    significance: 'El Abanico de la Fertilidad Imperial',
    culturalNote: 'Donde el río se ensancha permitiendo la irrigación de los más de 40 andenes monumentales que sostenían económicamente a la corte del inca Pachacútec.',
    iconType: 'terrace',
    image: 'https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 3,
    name: 'El Intihuatana de Pisac',
    quechuaName: 'Inti Watana Wasi',
    altitude: 3375,
    distanceKm: 145,
    significance: 'El Eje Astral del Valle Sagrado',
    culturalNote: 'Punto de resonancia cósmica donde el curso del río coincide con la trayectoria del sol en el cénit, alineando los templos con las constelaciones oscuras de la llama y la perdiz.',
    iconType: 'temple',
    image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 4,
    name: 'Garganta de Tantamarka',
    quechuaName: 'Tantamarka Wayq\'o',
    altitude: 3320,
    distanceKm: 147,
    significance: 'La Puerta de los Ancestros',
    culturalNote: 'El cañón se estrecha en un murmullo profundo. En sus murallas pétreas descansaban los antepasados que regaban espiritualmente el valle.',
    iconType: 'tomb',
    image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 5,
    name: 'Fortaleza de Ollantaytambo',
    quechuaName: 'Ullantay Tanpu',
    altitude: 2792,
    distanceKm: 210,
    significance: 'El Guardián del Valle Bajo',
    culturalNote: 'Último bastión pétreo antes de adentrarse en los cañones selváticos que conducen a la ciudadela sagrada de Machu Picchu.',
    iconType: 'fortress',
    image: 'https://images.unsplash.com/photo-1589802829985-817e51171b92?q=80&w=800&auto=format&fit=crop'
  }
];

export const TRIPADVISOR_REVIEWS: TripAdvisorReview[] = [
  {
    id: 'rev-1',
    author: 'Elena Rostova',
    country: 'Suiza',
    countryFlag: '🇨🇭',
    date: 'Febrero 2026',
    rating: 5,
    title: 'Más imponente y sobrecogedor que muchos monumentos célebres',
    comment: 'La vista desde el Intihuatana te deja sin respiración. La simetría de los andenes cayendo como cascadas de piedra hacia el río Vilcanota demuestra una genialidad arquitectónica inigualable. Sentir la leyenda de la Ñusta en las rocas altas fue mágico.',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    helpfulCount: 42
  },
  {
    id: 'rev-2',
    author: 'Mateo Cárdenas',
    country: 'Perú',
    countryFlag: '🇵🇪',
    date: 'Enero 2026',
    rating: 5,
    title: 'Orgullo de nuestra ingeniería andina y espiritualidad viva',
    comment: 'Caminar por Kallaqhasa y atravesar el túnel inca de 16 metros excavado en la montaña es una experiencia iniciática. Los guías locales de las comunidades quechuas explican la cosmovisión andina y el respeto a la Pachamama con una lucidez conmovedora.',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    helpfulCount: 89
  },
  {
    id: 'rev-3',
    author: 'Marcus Vance',
    country: 'Reino Unido',
    countryFlag: '🇬🇧',
    date: 'Marzo 2026',
    rating: 5,
    title: 'An astronomical and hydraulic marvel of the ancient world',
    comment: 'The sheer scale of Ajchapata terraces is overwhelming. Unlike standard tourist spots, Pisac retains an authentic mystical energy. The cemetery of Tantamarka carved into the sheer cliffs is both eerie and humbling.',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
    helpfulCount: 37
  },
  {
    id: 'rev-4',
    author: 'Kenji Takahashi',
    country: 'Japón',
    countryFlag: '🇯🇵',
    date: 'Diciembre 2025',
    rating: 5,
    title: '完璧な調和 — Perfect harmony between nature and stone',
    comment: 'The stone carving technique without mortar is so precise you cannot fit a sheet of paper. Watching the sunset turn the Vilcanota River into liquid gold from Qoriwayrachina is a memory I will carry forever.',
    avatarUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=200&auto=format&fit=crop',
    helpfulCount: 56
  }
];

export const DONATION_TIERS: DonationTier[] = [
  {
    id: 'guardian-semillas-wachuma',
    name: 'Guardián del Banco Genético & Semillas',
    quechuaName: 'Achuma & Muhu Kamayoq',
    pricePEN: 45,
    priceUSD: 12,
    period: 'mensual',
    terraceLevel: 1,
    description: 'Destinado al cuidado botánico de la Wachuma madre, fertilización orgánica y almacenamiento bioclimático de semillas nativas.',
    impactMetric: 'Protege 1 clon madre de Wachuma y almacena 15 variedades de semillas andinas al mes.',
    benefits: [
      'Certificado Digital de Mecenas con glifo ancestral',
      'Acceso al catálogo botánico y fenotipos de Wachuma',
      'Boletín estacional de siembra y ciclos lunares',
      'Descuento del 15% en visitas a la ecoaldea'
    ]
  },
  {
    id: 'padrino-escuela-ninos',
    name: 'Padrino de la Escuela de Niños & Huertos',
    quechuaName: 'Wawakunaq Allpa Wasi',
    pricePEN: 120,
    priceUSD: 35,
    period: 'mensual',
    popular: true,
    terraceLevel: 2,
    description: 'Beca y financiamiento para niños locales en la escuela libre de bioconstrucción, huertos pedagógicos y cuentacuentos bajo el queñual.',
    impactMetric: 'Beca a 1 niño de las comunidades de Pisac en el programa semanal de educación viva.',
    benefits: [
      'Todos los privilegios del nivel anterior',
      'Carta y dibujo hecho a mano por los niños de la escuela',
      'Muestra anual de semillas nativas cosechadas por los niños',
      'Acceso libre a 1 jornada familiar de recreación en la ecoaldea'
    ]
  },
  {
    id: 'cofradia-plantas-talleres',
    name: 'Protector de Ceremonias & Talleres de la Tierra',
    quechuaName: 'Hampiq Sach’a & Allpa Ayllu',
    pricePEN: 380,
    priceUSD: 100,
    period: 'mensual',
    terraceLevel: 3,
    description: 'Sostiene el fuego ceremonial de plantas maestras, insumos de bioconstrucción con adobe y quincha para los talleres inmersivos de 4+ días.',
    impactMetric: 'Financia herramientas comunitarias de bioconstrucción y materiales de retiros regenerativos.',
    benefits: [
      'Todos los beneficios de los niveles anteriores',
      'Invitación preferente a 1 retiro o ceremonia de Luna Llena',
      'Pase vitalicio para acampar en el bosque sagrado de la ecoaldea',
      'Consultoría personalizada en diseño de permacultura andina',
      'Estatuto de Guardián Fundador de la Ecoaldea Pampa Ñusta'
    ]
  }
];
