import { EcoaldeaModule } from '../types';
import { useTranslation } from 'react-i18next';

export const useEcoaldeaModules = (): EcoaldeaModule[] => {
  const { t } = useTranslation();

  return [
    {
      id: 'wachuma',
      chapterNumber: 'CAPÍTULO I',
      title: t('ecoaldea.modules.wachuma.title'),
      quechuaTitle: 'Achuma Kawsay',
      tagline: t('ecoaldea.modules.wachuma.tagline'),
      cinemaLogline: t('ecoaldea.modules.wachuma.cinemaLogline'),
      badge: t('ecoaldea.modules.wachuma.badge'),
      element: 'Tierra',
      altitude: '3,000 msnm',
      duration: 'Crecimiento de 1 a 5 años',
      capacity: 'Reserva de 1,000 ejemplares',
      metrics: [
        { label: 'Origen', value: t('ecoaldea.modules.wachuma.metrics.origen') },
        { label: 'Edad Promedio', value: t('ecoaldea.modules.wachuma.metrics.edad') },
        { label: 'Altura Máxima', value: t('ecoaldea.modules.wachuma.metrics.altura') },
        { label: 'Estado', value: t('ecoaldea.modules.wachuma.metrics.estado') }
      ],
      keyHighlights: t('ecoaldea.modules.wachuma.keyHighlights', { returnObjects: true }) as string[],
      imageUrl: '/assets/ecoaldea/elemento_tierra.jpg',
      secondaryImage: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=1200&auto=format&fit=crop',
      quote: t('ecoaldea.modules.wachuma.quote'),
      ctaText: t('ecoaldea.modules.wachuma.ctaText'),
      projectVision: t('ecoaldea.modules.wachuma.projectVision'),
      objectives: t('ecoaldea.modules.wachuma.objectives', { returnObjects: true }) as string[],
      roadmap: t('ecoaldea.modules.wachuma.roadmap', { returnObjects: true }) as any,
      neuromarketingHook: t('ecoaldea.modules.wachuma.neuromarketingHook'),
      gallery: [
        'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1602081515989-138be5bb9eb9?q=80&w=1200&auto=format&fit=crop'
      ]
    },
    {
      id: 'reina',
      chapterNumber: 'EPISODIO NOCTURNO',
      title: t('ecoaldea.modules.reina.title'),
      quechuaTitle: 'T\'ika Tuta',
      tagline: t('ecoaldea.modules.reina.tagline'),
      cinemaLogline: t('ecoaldea.modules.reina.cinemaLogline'),
      badge: t('ecoaldea.modules.reina.badge'),
      element: 'Tierra',
      altitude: '3,000 msnm',
      duration: 'Vigilia de 12 horas',
      capacity: 'Grupo selecto',
      metrics: [
        { label: 'Pico de Floración', value: t('ecoaldea.modules.reina.metrics.floracion') },
        { label: 'Aroma', value: t('ecoaldea.modules.reina.metrics.aroma') },
        { label: 'Polinizador Andino', value: t('ecoaldea.modules.reina.metrics.polinizador') },
        { label: 'Duración Vital', value: t('ecoaldea.modules.reina.metrics.duracion') }
      ],
      keyHighlights: t('ecoaldea.modules.reina.keyHighlights', { returnObjects: true }) as string[],
      imageUrl: 'https://images.unsplash.com/photo-1520302630591-fd1c66edc19d?q=80&w=1200&auto=format&fit=crop',
      secondaryImage: 'https://images.unsplash.com/photo-1610448777174-8848db6e51f8?q=80&w=1200&auto=format&fit=crop',
      quote: t('ecoaldea.modules.reina.quote'),
      ctaText: t('ecoaldea.modules.reina.ctaText'),
      projectVision: t('ecoaldea.modules.reina.projectVision'),
      objectives: t('ecoaldea.modules.reina.objectives', { returnObjects: true }) as string[],
      roadmap: t('ecoaldea.modules.reina.roadmap', { returnObjects: true }) as any,
      neuromarketingHook: t('ecoaldea.modules.reina.neuromarketingHook'),
      gallery: [
        'https://images.unsplash.com/photo-1507646871158-71e16f3af2c5?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1616421396115-4fa8eb7813a0?q=80&w=1200&auto=format&fit=crop'
      ]
    },
    {
      id: 'semillas',
      chapterNumber: 'CAPÍTULO II',
      title: t('ecoaldea.modules.semillas.title'),
      quechuaTitle: 'Muhukuna Waqaychay',
      tagline: t('ecoaldea.modules.semillas.tagline'),
      cinemaLogline: t('ecoaldea.modules.semillas.cinemaLogline'),
      badge: t('ecoaldea.modules.semillas.badge'),
      element: 'Agua',
      altitude: '3,000 msnm',
      duration: 'Ciclo Agrícola de 6 meses',
      capacity: 'Reserva Ilimitada',
      metrics: [
        { label: 'Maíz Nativo', value: t('ecoaldea.modules.semillas.metrics.maiz') },
        { label: 'Tubérculos', value: t('ecoaldea.modules.semillas.metrics.papa') },
        { label: 'Granos Andinos', value: t('ecoaldea.modules.semillas.metrics.quinoa') },
        { label: 'Superalimentos', value: t('ecoaldea.modules.semillas.metrics.amaranto') }
      ],
      keyHighlights: t('ecoaldea.modules.semillas.keyHighlights', { returnObjects: true }) as string[],
      imageUrl: '/assets/ecoaldea/elemento_agua.jpg',
      secondaryImage: 'https://images.unsplash.com/photo-1598046937895-24c6530a6c05?q=80&w=1200&auto=format&fit=crop',
      quote: t('ecoaldea.modules.semillas.quote'),
      ctaText: t('ecoaldea.modules.semillas.ctaText'),
      projectVision: t('ecoaldea.modules.semillas.projectVision'),
      objectives: t('ecoaldea.modules.semillas.objectives', { returnObjects: true }) as string[],
      roadmap: t('ecoaldea.modules.semillas.roadmap', { returnObjects: true }) as any,
      neuromarketingHook: t('ecoaldea.modules.semillas.neuromarketingHook'),
      gallery: [
        'https://images.unsplash.com/photo-1515150144380-bca9f1650ed9?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=1200&auto=format&fit=crop'
      ]
    },
    {
      id: 'ninos',
      chapterNumber: 'CAPÍTULO III',
      title: t('ecoaldea.modules.ninos.title'),
      quechuaTitle: 'Wawakuna Pukllay Wasi',
      tagline: t('ecoaldea.modules.ninos.tagline'),
      cinemaLogline: t('ecoaldea.modules.ninos.cinemaLogline'),
      badge: t('ecoaldea.modules.ninos.badge'),
      element: 'Viento',
      altitude: '3,000 msnm',
      duration: 'Programas de 3 a 12 meses',
      capacity: '25 Niños por Grupo',
      metrics: [
        { label: 'Enfoque', value: t('ecoaldea.modules.ninos.metrics.enfoque') },
        { label: 'Edades', value: t('ecoaldea.modules.ninos.metrics.edades') },
        { label: 'Actividades', value: t('ecoaldea.modules.ninos.metrics.actividad') },
        { label: 'Idiomas', value: t('ecoaldea.modules.ninos.metrics.idioma') }
      ],
      keyHighlights: t('ecoaldea.modules.ninos.keyHighlights', { returnObjects: true }) as string[],
      imageUrl: '/assets/ecoaldea/elemento_viento.jpg',
      secondaryImage: 'https://images.unsplash.com/photo-1519340241574-2c6b4f60f64c?q=80&w=1200&auto=format&fit=crop',
      quote: t('ecoaldea.modules.ninos.quote'),
      ctaText: t('ecoaldea.modules.ninos.ctaText'),
      projectVision: t('ecoaldea.modules.ninos.projectVision'),
      objectives: t('ecoaldea.modules.ninos.objectives', { returnObjects: true }) as string[],
      roadmap: t('ecoaldea.modules.ninos.roadmap', { returnObjects: true }) as any,
      neuromarketingHook: t('ecoaldea.modules.ninos.neuromarketingHook'),
      gallery: [
        '/assets/ecoaldea/elemento_viento.jpg',
        'https://images.unsplash.com/photo-1519340241574-2c6b4f60f64c?q=80&w=1200&auto=format&fit=crop'
      ]
    },
    {
      id: 'ceremonias',
      chapterNumber: 'CAPÍTULO IV',
      title: t('ecoaldea.modules.ceremonias.title'),
      quechuaTitle: 'Hampiq Sach’akuna Haywarikuy',
      tagline: t('ecoaldea.modules.ceremonias.tagline'),
      cinemaLogline: t('ecoaldea.modules.ceremonias.cinemaLogline'),
      badge: t('ecoaldea.modules.ceremonias.badge'),
      element: 'Fuego',
      altitude: '3,300 msnm',
      duration: 'Retiros de 1 a 3 Noches',
      capacity: '10 Participantes Máx.',
      metrics: [
        { label: 'Medicina Sagrada', value: t('ecoaldea.modules.ceremonias.metrics.medicina') },
        { label: 'Ritual de Purificación', value: t('ecoaldea.modules.ceremonias.metrics.ritual') },
        { label: 'Música de Sanación', value: t('ecoaldea.modules.ceremonias.metrics.musica') },
        { label: 'Acompañamiento', value: t('ecoaldea.modules.ceremonias.metrics.acompanamiento') }
      ],
      keyHighlights: t('ecoaldea.modules.ceremonias.keyHighlights', { returnObjects: true }) as string[],
      imageUrl: '/assets/ecoaldea/ceremonia_tipi_wachuma.jpg',
      secondaryImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
      quote: t('ecoaldea.modules.ceremonias.quote'),
      ctaText: t('ecoaldea.modules.ceremonias.ctaText'),
      projectVision: t('ecoaldea.modules.ceremonias.projectVision'),
      objectives: t('ecoaldea.modules.ceremonias.objectives', { returnObjects: true }) as string[],
      roadmap: t('ecoaldea.modules.ceremonias.roadmap', { returnObjects: true }) as any,
      neuromarketingHook: t('ecoaldea.modules.ceremonias.neuromarketingHook'),
      gallery: [
        'https://images.unsplash.com/photo-1519750058525-4c01d4a0fc84?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1463131754021-d144e5900506?q=80&w=1200&auto=format&fit=crop'
      ]
    },
    {
      id: 'talleres',
      chapterNumber: 'CAPÍTULO V',
      title: t('ecoaldea.modules.talleres.title'),
      quechuaTitle: 'Allpa Yachay Wasi',
      tagline: t('ecoaldea.modules.talleres.tagline'),
      cinemaLogline: t('ecoaldea.modules.talleres.cinemaLogline'),
      badge: t('ecoaldea.modules.talleres.badge'),
      element: 'Éter',
      altitude: '3,000 msnm',
      duration: '4 a 14 Días',
      capacity: '15 Estudiantes Máx.',
      metrics: [
        { label: 'Teoría', value: t('ecoaldea.modules.talleres.metrics.teoria') },
        { label: 'Práctica', value: t('ecoaldea.modules.talleres.metrics.practica') },
        { label: 'Comunidad', value: t('ecoaldea.modules.talleres.metrics.convivencia') },
        { label: 'Certificación', value: t('ecoaldea.modules.talleres.metrics.certificado') }
      ],
      keyHighlights: t('ecoaldea.modules.talleres.keyHighlights', { returnObjects: true }) as string[],
      imageUrl: '/assets/ecoaldea/elemento_eter.jpg',
      secondaryImage: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=1200&auto=format&fit=crop',
      quote: t('ecoaldea.modules.talleres.quote'),
      ctaText: t('ecoaldea.modules.talleres.ctaText'),
      projectVision: t('ecoaldea.modules.talleres.projectVision'),
      objectives: t('ecoaldea.modules.talleres.objectives', { returnObjects: true }) as string[],
      roadmap: t('ecoaldea.modules.talleres.roadmap', { returnObjects: true }) as any,
      neuromarketingHook: t('ecoaldea.modules.talleres.neuromarketingHook'),
      gallery: [
        'https://images.unsplash.com/photo-1495904786722-d2b5a19a8535?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?q=80&w=1200&auto=format&fit=crop'
      ]
    }
  ];
};
