import { useTranslation } from 'react-i18next';
import { VideoCallTopic } from '../types';

export const useVideoCallTopics = (): VideoCallTopic[] => {
  const { t } = useTranslation();
  
  return [
    {
      id: 'wachuma',
      title: t('chatbot.topics.wachuma_title'),
      quechuaTitle: 'Wachuma Wasi Kawsay',
      collaboratorName: 'Saywa Quispe',
      collaboratorRole: t('chatbot.topics.wachuma_role'),
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=250&auto=format&fit=crop',
      description: t('chatbot.topics.wachuma_desc'),
      iconName: 'Sprout'
    },
    {
      id: 'semillas',
      title: t('chatbot.topics.semillas_title'),
      quechuaTitle: 'Muyo Wasi Allpa',
      collaboratorName: 'Inti Morales',
      collaboratorRole: t('chatbot.topics.semillas_role'),
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=250&auto=format&fit=crop',
      description: t('chatbot.topics.semillas_desc'),
      iconName: 'Wheat'
    },
    {
      id: 'ceremonias',
      title: t('chatbot.topics.ceremonias_title'),
      quechuaTitle: 'Willka Kancha Hampiy',
      collaboratorName: 'Kantu Valderrama',
      collaboratorRole: t('chatbot.topics.ceremonias_role'),
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=250&auto=format&fit=crop',
      description: t('chatbot.topics.ceremonias_desc'),
      iconName: 'Flame'
    },
    {
      id: 'talleres',
      title: t('chatbot.topics.talleres_title'),
      quechuaTitle: 'Allpa Kawsay Wasichiy',
      collaboratorName: 'Mikael Andino',
      collaboratorRole: t('chatbot.topics.talleres_role'),
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=250&auto=format&fit=crop',
      description: t('chatbot.topics.talleres_desc'),
      iconName: 'Tent'
    },
    {
      id: 'general',
      title: t('chatbot.topics.general_title'),
      quechuaTitle: 'Pisac Santuario Watukuq',
      collaboratorName: 'Nayra Ramos',
      collaboratorRole: t('chatbot.topics.general_role'),
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=250&auto=format&fit=crop',
      description: t('chatbot.topics.general_desc'),
      iconName: 'Compass'
    }
  ];
};

export const AVAILABLE_TIME_SLOTS = [
  { id: 'morning_1', label: '10:00 AM - 10:30 AM', timeOnly: '10:00', icon: 'Sun' },
  { id: 'morning_2', label: '11:30 AM - 12:00 PM', timeOnly: '11:30', icon: 'Sun' },
  { id: 'afternoon_1', label: '03:00 PM - 03:30 PM', timeOnly: '15:00', icon: 'Sunset' },
  { id: 'afternoon_2', label: '04:30 PM - 05:00 PM', timeOnly: '16:30', icon: 'Sunset' },
  { id: 'evening_1', label: '06:00 PM - 06:30 PM', timeOnly: '18:00', icon: 'Moon' },
];
