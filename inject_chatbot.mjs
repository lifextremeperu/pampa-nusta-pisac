import fs from 'fs';
import path from 'path';

const localesDir = './src/locales';
const langs = ['es', 'en', 'fr', 'pt'];

const newTranslations = {
  es: {
    "chatbot": {
      "welcome_msg": "Bienvenido a Pampa Ñusta. Estás a un paso de conectar con los guardianes del santuario. Selecciona el propósito de tu sesión privada (30 min):",
      "platform_msg": "Perfecto. Tu sesión será con {{name}} ({{role}}). ¿Qué plataforma prefieres usar?",
      "datetime_msg": "Excelente. Por favor selecciona el día y la hora de tu preferencia (Hora Perú GMT-5):",
      "contact_msg": "Ya casi terminamos. Déjanos tus datos de contacto para enviarte el enlace de acceso:",
      "data_sent": "Datos enviados:",
      "confirmation_msg": "¡Reserva confirmada con éxito! Tu código es {{code}}. Puedes agregarla a tu calendario o notificarnos por WhatsApp.",
      "reset_msg": "Sesión reiniciada. ¿Sobre qué tema deseas agendar tu videollamada?",
      "official_reservations": "Reservas Oficiales",
      "maximize_panel": "Maximizar panel",
      "pampa_nusta_pisac": "Pampa Ñusta · Pisac",
      "date": "Fecha",
      "time_peru": "Horario (Perú)",
      "continue": "Continuar",
      "full_name": "Nombre Completo",
      "email": "Correo Electrónico",
      "whatsapp": "WhatsApp (con código país)",
      "notes": "Tema o consulta clave (opcional)...",
      "confirm_reservation": "Confirmar Reserva",
      "reservation_code": "CÓDIGO DE RESERVA",
      "topic": "Tema:",
      "with": "Con:",
      "confirm_whatsapp": "Confirmar vía WhatsApp",
      "add_calendar": "Añadir a Google Calendar",
      "schedule_new": "Agendar Nueva Sesión",
      "topics": {
        "wachuma_title": "Banco Genético de Wachuma & Botánica Sagrada",
        "wachuma_role": "Bióloga & Curadora Botánica del Santuario",
        "wachuma_desc": "Conversa directamente con nuestra bióloga sobre las más de 40 variedades madre de cactáceas sagradas, conservación a 3,347 msnm y microclimas.",
        "semillas_title": "Semillas Nativas & Agroecología Andina",
        "semillas_role": "Guardián de Semillas Ancestrales & Permacultor",
        "semillas_desc": "Aprende sobre la custodia de maíces milenarios, tubérculos sagrados de altura, qollqas bioclimáticas y redes de trueque comunitario.",
        "ceremonias_title": "Plantas Maestras, Retiros & Armonización 432 Hz",
        "ceremonias_role": "Facilitador Ceremonial & Terapeuta de Sonido",
        "ceremonias_desc": "Resuelve tus inquietudes sobre preparación dietaria, ceremonias ancestrales con plantas sagradas, retiros de introspección y frecuencias 432 Hz.",
        "talleres_title": "Bioconstrucción, Voluntariado & Talleres 4+ Días",
        "talleres_role": "Arquitecto de Tierra & Coordinador de Residencias",
        "talleres_desc": "Consulta fechas, requisitos y programas de inmersión en permacultura viva, construcción con quincha/adobe y residencia comunitaria.",
        "general_title": "Visitas Guiadas, Logística en Pisac & Hospitalidad",
        "general_role": "Coordinadora de Bienvenida & Logística en Pisac",
        "general_desc": "Información práctica para tu viaje a Pisac: rutas desde Cusco, aclimatación a 3,347 msnm, estadía recomendada y visitas familiares."
      }
    }
  },
  en: {
    "chatbot": {
      "welcome_msg": "Welcome to Pampa Ñusta. You are one step away from connecting with the sanctuary guardians. Select the purpose of your private session (30 min):",
      "platform_msg": "Perfect. Your session will be with {{name}} ({{role}}). Which platform do you prefer?",
      "datetime_msg": "Excellent. Please select your preferred day and time (Peru Time GMT-5):",
      "contact_msg": "Almost done. Leave us your contact details to send you the access link:",
      "data_sent": "Data sent:",
      "confirmation_msg": "Reservation successfully confirmed! Your code is {{code}}. You can add it to your calendar or notify us via WhatsApp.",
      "reset_msg": "Session restarted. What topic would you like to schedule your video call about?",
      "official_reservations": "Official Reservations",
      "maximize_panel": "Maximize panel",
      "pampa_nusta_pisac": "Pampa Ñusta · Pisac",
      "date": "Date",
      "time_peru": "Schedule (Peru)",
      "continue": "Continue",
      "full_name": "Full Name",
      "email": "Email Address",
      "whatsapp": "WhatsApp (with country code)",
      "notes": "Key topic or inquiry (optional)...",
      "confirm_reservation": "Confirm Reservation",
      "reservation_code": "RESERVATION CODE",
      "topic": "Topic:",
      "with": "With:",
      "confirm_whatsapp": "Confirm via WhatsApp",
      "add_calendar": "Add to Google Calendar",
      "schedule_new": "Schedule New Session",
      "topics": {
        "wachuma_title": "Wachuma Gene Bank & Sacred Botany",
        "wachuma_role": "Biologist & Botanical Curator of the Sanctuary",
        "wachuma_desc": "Talk directly with our biologist about the more than 40 mother varieties of sacred cacti, conservation at 3,347 masl and microclimates.",
        "semillas_title": "Native Seeds & Andean Agroecology",
        "semillas_role": "Guardian of Ancestral Seeds & Permaculturist",
        "semillas_desc": "Learn about the custody of ancient corn, sacred high-altitude tubers, bioclimatic qollqas and community barter networks.",
        "ceremonias_title": "Master Plants, Retreats & 432 Hz Harmonization",
        "ceremonias_role": "Ceremonial Facilitator & Sound Therapist",
        "ceremonias_desc": "Resolve your doubts about dietary preparation, ancestral ceremonies with sacred plants, introspection retreats and 432 Hz frequencies.",
        "talleres_title": "Bioconstruction, Volunteering & 4+ Day Workshops",
        "talleres_role": "Earth Architect & Residency Coordinator",
        "talleres_desc": "Check dates, requirements and immersion programs in living permaculture, quincha/adobe construction and community residency.",
        "general_title": "Guided Tours, Logistics in Pisac & Hospitality",
        "general_role": "Welcome & Logistics Coordinator in Pisac",
        "general_desc": "Practical information for your trip to Pisac: routes from Cusco, acclimatization to 3,347 masl, recommended stay and family visits."
      }
    }
  },
  fr: {
    "chatbot": {
      "welcome_msg": "Bienvenue à Pampa Ñusta. Vous êtes à un pas de vous connecter avec les gardiens du sanctuaire. Sélectionnez le but de votre session privée (30 min):",
      "platform_msg": "Parfait. Votre session sera avec {{name}} ({{role}}). Quelle plateforme préférez-vous?",
      "datetime_msg": "Excellent. Veuillez sélectionner votre jour et heure préférés (Heure du Pérou GMT-5):",
      "contact_msg": "Presque terminé. Laissez-nous vos coordonnées pour vous envoyer le lien d'accès:",
      "data_sent": "Données envoyées:",
      "confirmation_msg": "Réservation confirmée avec succès! Votre code est {{code}}. Vous pouvez l'ajouter à votre calendrier ou nous en informer via WhatsApp.",
      "reset_msg": "Session redémarrée. Sur quel sujet aimeriez-vous planifier votre appel vidéo?",
      "official_reservations": "Réservations Officielles",
      "maximize_panel": "Agrandir le panneau",
      "pampa_nusta_pisac": "Pampa Ñusta · Pisac",
      "date": "Date",
      "time_peru": "Horaire (Pérou)",
      "continue": "Continuer",
      "full_name": "Nom Complet",
      "email": "Adresse Email",
      "whatsapp": "WhatsApp (avec indicatif)",
      "notes": "Sujet clé ou question (optionnel)...",
      "confirm_reservation": "Confirmer la Réservation",
      "reservation_code": "CODE DE RÉSERVATION",
      "topic": "Sujet:",
      "with": "Avec:",
      "confirm_whatsapp": "Confirmer via WhatsApp",
      "add_calendar": "Ajouter à Google Calendar",
      "schedule_new": "Planifier une Nouvelle Session",
      "topics": {
        "wachuma_title": "Banque de Gènes de Wachuma & Botanique Sacrée",
        "wachuma_role": "Biologiste & Conservatrice Botanique",
        "wachuma_desc": "Discutez avec notre biologiste de plus de 40 variétés de cactus sacrés.",
        "semillas_title": "Graines Indigènes & Agroécologie",
        "semillas_role": "Gardien des Graines Ancestrales",
        "semillas_desc": "Découvrez la garde des maïs anciens et des tubercules sacrés d'altitude.",
        "ceremonias_title": "Plantes Maîtresses, Retraites & Harmonisation",
        "ceremonias_role": "Facilitateur Cérémoniel",
        "ceremonias_desc": "Résolvez vos doutes sur la préparation diététique et les cérémonies.",
        "talleres_title": "Bioconstruction, Bénévolat & Ateliers",
        "talleres_role": "Architecte de Terre & Coordinateur",
        "talleres_desc": "Vérifiez les dates et les programmes d'immersion en permaculture.",
        "general_title": "Visites Guidées, Logistique & Hospitalité",
        "general_role": "Coordinatrice d'Accueil à Pisac",
        "general_desc": "Informations pratiques pour votre voyage à Pisac."
      }
    }
  },
  pt: {
    "chatbot": {
      "welcome_msg": "Bem-vindo a Pampa Ñusta. Você está a um passo de se conectar com os guardiões do santuário. Selecione o objetivo da sua sessão privada (30 min):",
      "platform_msg": "Perfeito. Sua sessão será com {{name}} ({{role}}). Qual plataforma você prefere?",
      "datetime_msg": "Excelente. Por favor, selecione seu dia e horário preferidos (Horário do Peru GMT-5):",
      "contact_msg": "Quase pronto. Deixe-nos seus contatos para enviar o link de acesso:",
      "data_sent": "Dados enviados:",
      "confirmation_msg": "Reserva confirmada com sucesso! Seu código é {{code}}. Você pode adicioná-la ao seu calendário ou nos notificar via WhatsApp.",
      "reset_msg": "Sessão reiniciada. Sobre qual assunto você gostaria de agendar sua videochamada?",
      "official_reservations": "Reservas Oficiais",
      "maximize_panel": "Maximizar painel",
      "pampa_nusta_pisac": "Pampa Ñusta · Pisac",
      "date": "Data",
      "time_peru": "Horário (Peru)",
      "continue": "Continuar",
      "full_name": "Nome Completo",
      "email": "E-mail",
      "whatsapp": "WhatsApp (com código do país)",
      "notes": "Assunto principal (opcional)...",
      "confirm_reservation": "Confirmar Reserva",
      "reservation_code": "CÓDIGO DE RESERVA",
      "topic": "Assunto:",
      "with": "Com:",
      "confirm_whatsapp": "Confirmar via WhatsApp",
      "add_calendar": "Adicionar ao Google Calendar",
      "schedule_new": "Agendar Nova Sessão",
      "topics": {
        "wachuma_title": "Banco Genético de Wachuma & Botânica Sagrada",
        "wachuma_role": "Bióloga & Curadora Botânica",
        "wachuma_desc": "Converse diretamente com nossa bióloga sobre as mais de 40 variedades mães.",
        "semillas_title": "Sementes Nativas & Agroecologia",
        "semillas_role": "Guardião de Sementes Ancestrais",
        "semillas_desc": "Aprenda sobre a custódia do milho antigo e tubérculos sagrados de altitude.",
        "ceremonias_title": "Plantas Mestras, Retiros & Harmonização",
        "ceremonias_role": "Facilitador Cerimonial",
        "ceremonias_desc": "Tire suas dúvidas sobre a preparação alimentar e cerimônias ancestrais.",
        "talleres_title": "Bioconstrução, Voluntariado & Oficinas",
        "talleres_role": "Arquiteto de Terra & Coordenador",
        "talleres_desc": "Verifique datas, requisitos e programas de imersão em permacultura viva.",
        "general_title": "Visitas Guiadas, Logística & Hospitalidade",
        "general_role": "Coordenadora de Boas-Vindas em Pisac",
        "general_desc": "Informações práticas para sua viagem a Pisac e estadia recomendada."
      }
    }
  }
};

for (const lang of langs) {
  const filePath = path.join(localesDir, lang, 'translation.json');
  if (fs.existsSync(filePath)) {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    data.chatbot = { ...data.chatbot, ...newTranslations[lang].chatbot };
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`Updated ${lang}`);
  }
}
