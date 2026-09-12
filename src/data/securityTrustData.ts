export interface SecurityProtocol {
  id: string;
  category: 'altitude' | 'guarantee' | 'mountain' | 'ceremony' | 'infrastructure' | 'payment';
  title: string;
  quechuaBadge: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  verificationAgency: string;
  statusText: string;
}

export interface PaymentMethodInfo {
  id: string;
  name: string;
  type: 'instant' | 'card' | 'wallet' | 'wire';
  badge: string;
  encryption: string;
  iconKey: string;
}

export const SECURITY_PROTOCOLS: SecurityProtocol[] = [
  {
    id: 'no-risk-guarantee',
    category: 'guarantee',
    title: 'Garantía 100% Sin Riesgo: Cancelación & Reprogramación Flexible',
    quechuaBadge: 'Ayni Allin Kawsay',
    shortDesc: 'Reprogramación de por vida sin penalidad o reembolso total si sufres soroche o imprevistos de viaje.',
    fullDesc: 'Entendemos que los viajes a los Andes pueden presentar imprevistos de salud o cambios de itinerario. Respaldamos tu reserva con nuestra Garantía de Ayni: puedes reprogramar tu fecha de visita, taller o ceremonia sin ningún costo adicional ni penalidad de por vida con hasta 24 horas de aviso, o solicitar reembolso íntegro según nuestros términos transparentes.',
    iconName: 'RotateCcw',
    verificationAgency: 'Póliza de Transparencia Comunitaria Pampa Ñusta',
    statusText: '100% GARANTIZADO'
  },
  {
    id: 'altitude-safety',
    category: 'altitude',
    title: 'Protocolo de Aclimatación a 3,347 msnm & Oxigenoterapia Preventiva',
    quechuaBadge: 'Samay Wasi Hampiy',
    shortDesc: 'Oximetría a la llegada, oxígeno medicinal 24/7 y botica de plantas andinas (Coca & Muña).',
    fullDesc: 'El santuario se ubica a 3,347 msnm en las faldas del Apu Linli. Contamos con estaciones permanentes de monitoreo con oxímetros digitales de pulso, balones de oxígeno medicinal portátiles de alta pureza para emergencias, botiquín de altura avalado y suministro ilimitado de infusiones medicinales tradicionales de hoja de coca orgánica y muña silvestre para una aclimatación armónica.',
    iconName: 'Activity',
    verificationAgency: 'Protocolo Médico Rural Cusco 2026',
    statusText: 'OXÍGENO & BOTIQUÍN ACTIVO'
  },
  {
    id: 'mountain-rescue',
    category: 'mountain',
    title: 'Guías DIRCETUR & Primeros Auxilios en Zonas Agrestes (WFR)',
    quechuaBadge: 'Apu Linli Guardián',
    shortDesc: 'Guías bilingües certificados WFR, radiocomunicación VHF directa y enlace satelital con Pisac.',
    fullDesc: 'Todo recorrido por nuestras terrazas botánicas y senderos del Apu Linli es coordinado por guías oficiales registrados ante DIRCETUR Cusco con certificación Wilderness First Responder (WFR). El santuario dispone de radios VHF de doble banda con frecuencia directa al centro de salud de Pisac y cobertura satelital para contingencias en montaña.',
    iconName: 'Mountain',
    verificationAgency: 'DIRCETUR Cusco Reg. Oficial & Certificación WFR',
    statusText: 'PERSONAL CERTIFICADO'
  },
  {
    id: 'ceremonial-ethics',
    category: 'ceremony',
    title: 'Protocolo Ceremonial Ético & Consentimiento Informado',
    quechuaBadge: 'Willka Kancha Hampiy',
    shortDesc: 'Evaluación de salud previa, ratio seguro de 1 facilitador por 4 personas y contención 24/7.',
    fullDesc: 'Para las ceremonias con plantas maestras y armonización de sonido 432 Hz, aplicamos un filtro previo de salud integral y dieta andina. Mantenemos una ratio estricta de máxima seguridad: al menos 1 cuidador/facilitador experimentado por cada 4 asistentes, garantizando un espacio seguro, protegido, ético y sin sustancias adulteradas.',
    iconName: 'HeartHandshake',
    verificationAgency: 'Alianza de Medicina Tradicional Andina',
    statusText: 'CÓDIGO ÉTICO AUDITADO'
  },
  {
    id: 'bioclimatic-safety',
    category: 'infrastructure',
    title: 'Bioconstrucción Sismorresistente & Agua de Manantial Certificada',
    quechuaBadge: 'Allpa Wasichiy Kawsay',
    shortDesc: 'Estructuras de quincha y piedra antisísmicas, luz solar ininterrumpida y filtración por osmosis.',
    fullDesc: 'Nuestras malokas, domos y qollqas fueron diseñados con arquitectura bioclimática de tierra reforzada y carpintería de madera nativa con verificación estructural. Contamos con sistema fotovoltaico solar autónomo con banco de baterías de respaldo y agua pura de manantial andino sometida a filtración microbiológica por etapas.',
    iconName: 'ShieldCheck',
    verificationAgency: 'Defensa Civil Pisac & Análisis Bacteriológico',
    statusText: 'INFRAESTRUCTURA VERIFICADA'
  },
  {
    id: 'ssl-payment-security',
    category: 'payment',
    title: 'Cifrado SSL 256-Bit & Pasarela de Pagos Tokenizada (PCI-DSS)',
    quechuaBadge: 'Taqikuy Asegurado',
    shortDesc: 'Encriptación de grado bancario TLS 1.3, certificación SSL vigente y cero retención de tarjetas.',
    fullDesc: 'Nuestra plataforma opera bajo certificados de seguridad TLS 1.3 con cifrado criptográfico SHA-256 de 256 bits. Todos los aportes, donaciones y reservas son procesados a través de pasarelas con cumplimiento PCI-DSS Nivel 1. Los datos viajan tokenizados directamente con el emisor bancario, impidiendo cualquier acceso a números o credenciales.',
    iconName: 'Lock',
    verificationAgency: 'Certificación SSL DigiCert / Let’s Encrypt & PCI-DSS Nivel 1',
    statusText: 'CONEXIÓN CIFRADA & AUDITADA'
  }
];

export const PAYMENT_METHODS: PaymentMethodInfo[] = [
  {
    id: 'yape',
    name: 'Yape (BCP)',
    type: 'instant',
    badge: 'Pago Instantáneo Perú',
    encryption: 'Cifrado Móvil Seguro BCP',
    iconKey: 'yape'
  },
  {
    id: 'plin',
    name: 'Plin (Interbank / BBVA / Scotiabank)',
    type: 'instant',
    badge: 'Sin Comisión',
    encryption: 'Tokenización Interbancaria',
    iconKey: 'plin'
  },
  {
    id: 'visa',
    name: 'Visa',
    type: 'card',
    badge: 'Verified by Visa 3DS 2.0',
    encryption: 'Cifrado 256-Bit PCI-DSS',
    iconKey: 'visa'
  },
  {
    id: 'mastercard',
    name: 'Mastercard',
    type: 'card',
    badge: 'Mastercard Identity Check',
    encryption: 'Protección Antifraude Zero-Liability',
    iconKey: 'mastercard'
  },
  {
    id: 'amex',
    name: 'American Express',
    type: 'card',
    badge: 'SafeKey Tokenization',
    encryption: 'Cifrado Bancario Grado Militar',
    iconKey: 'amex'
  },
  {
    id: 'apple-google-pay',
    name: 'Apple Pay & Google Pay',
    type: 'wallet',
    badge: 'Autenticación Biométrica',
    encryption: 'Device Account Number Token',
    iconKey: 'digital_wallet'
  },
  {
    id: 'bank-wire',
    name: 'Transferencia BCP / Interbank Directa',
    type: 'wire',
    badge: 'Cuentas Oficiales Perú',
    encryption: 'Conciliación Bancaria Verificada',
    iconKey: 'wire'
  }
];

export const REFERENTIAL_VIDEO_SCENES = [
  {
    id: 'overview',
    title: 'Santuario Pampa Ñusta & Pisac 3,347 msnm',
    quechuaTitle: 'Willka Allpa Pisac Kawsay',
    description: 'Recorrido panorámico 4K por las faldas del Apu Linli, el río Willakamayu y la geografía sagrada que abraza el santuario.',
    videoSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    poster: 'https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?q=85&w=1920&auto=format&fit=crop',
    duration: '02:45',
    resolution: '4K HDR 60fps',
    highlights: ['Apu Linli 3,347 msnm', 'Andenes de Piedra Viva', 'Valle Sagrado de los Incas']
  },
  {
    id: 'wachuma',
    title: 'Banco Genético de Wachuma & Cactáceas Sagradas',
    quechuaTitle: 'Wachuma Wasi Kawsay',
    description: 'Custodia de más de 40 linajes botánicos de cactáceas ancestrales de 4 vientos y bancos de germoplasma de altura.',
    videoSrc: 'https://assets.mixkit.co/videos/preview/mixkit-clouds-and-blue-sky-2408-large.mp4',
    poster: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1920&q=85',
    duration: '01:50',
    resolution: '1080p Ultra HD',
    highlights: ['40+ Linajes Botánicos', 'Microclima de Altura', 'Polinización Andina']
  },
  {
    id: 'maloka',
    title: 'Maloka Willka Kancha & Sonidos Sagrados 432 Hz',
    quechuaTitle: 'Willka Kancha Hampiy',
    description: 'Espacio ceremonial bioclimático para retiros, armonización con cuencos y flautas andinas junto al fuego sagrado.',
    videoSrc: 'https://assets.mixkit.co/videos/preview/mixkit-stars-in-the-night-sky-slow-motion-41617-large.mp4',
    poster: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1920&q=85',
    duration: '02:15',
    resolution: '4K CineScope',
    highlights: ['Frecuencias 432 Hz', 'Fuego Ancestral', 'Introspección Ética']
  },
  {
    id: 'bioconstruction',
    title: 'Bioconstrucción, Domos & Huertos Regenerativos',
    quechuaTitle: 'Allpa Wasichiy Permacultura',
    description: 'Arquitectura de tierra mejorada, techos vivos, huertos de semillas nativas y talleres vivenciales de 4+ días.',
    videoSrc: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-mountain-valley-during-sunset-41484-large.mp4',
    poster: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1920&q=85',
    duration: '03:10',
    resolution: '1080p 60fps',
    highlights: ['Quincha Sismorresistente', 'Energía Solar 100%', 'Semillas Nativas']
  }
];
