export type ThemeMode = 'hanan' | 'hurin'; // Hanan (Day/Sun/Inti) vs Hurin (Night/Moon/Petrification)

export interface HotspotItem {
  id: string;
  name: string;
  quechuaName: string;
  category: string;
  coordinates: {
    pitch: number; // degrees
    yaw: number;   // degrees
  };
  altitude: string;
  shortDesc: string;
  fullDesc: string;
  architecturalDetails: string[];
  historicalDebate?: string;
  imageUrl: string;
  tag: string;
}

export interface StoryAct {
  id: number;
  title: string;
  quechuaTitle: string;
  summary: string;
  detail: string;
  character: string;
  visualEffect: 'warmth' | 'tension' | 'climax' | 'petrified';
  stoneProgress: number; // 0 to 100
  image: string;
  quote: string;
}

export interface RiverStation {
  id: number;
  name: string;
  quechuaName: string;
  altitude: number;
  distanceKm: number;
  significance: string;
  culturalNote: string;
  iconType: 'source' | 'temple' | 'terrace' | 'tomb' | 'fortress';
  image: string;
}

export interface TripAdvisorReview {
  id: string;
  author: string;
  country: string;
  countryFlag: string;
  date: string;
  rating: number;
  title: string;
  comment: string;
  avatarUrl: string;
  helpfulCount: number;
}

export interface DonationTier {
  id: string;
  name: string;
  quechuaName: string;
  pricePEN: number;
  priceUSD: number;
  period: 'mensual' | 'anual' | 'único';
  description: string;
  benefits: string[];
  impactMetric: string;
  popular?: boolean;
  terraceLevel: number; // For andenería visual stacking
}

export interface EcoaldeaModule {
  id: string;
  chapterNumber: string;
  title: string;
  quechuaTitle: string;
  tagline: string;
  cinemaLogline: string;
  badge: string;
  element: 'Tierra' | 'Agua' | 'Fuego' | 'Viento' | 'Éter';
  altitude: string;
  duration: string;
  capacity: string;
  metrics: { label: string; value: string }[];
  keyHighlights: string[];
  imageUrl: string;
  secondaryImage: string;
  quote: string;
  ctaText: string;
}

export interface VideoCallTopic {
  id: string;
  title: string;
  quechuaTitle: string;
  collaboratorName: string;
  collaboratorRole: string;
  avatarUrl: string;
  description: string;
  iconName: string;
}

export interface VideoCallBooking {
  bookingCode: string;
  topicId: string;
  topicTitle: string;
  collaboratorName: string;
  collaboratorRole: string;
  date: string;
  timeSlot: string;
  platform: 'meet' | 'whatsapp' | 'zoom';
  userName: string;
  userEmail: string;
  userPhone: string;
  userNotes?: string;
  createdAt: string;
  status: 'confirmed' | 'pending';
}


