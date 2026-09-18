const fs = require('fs');
const path = require('path');

const locales = ['es', 'en', 'fr', 'pt'];
const translations = {
  es: {
    "intro_desc": "El llamado de la montaña es para quienes sienten el profundo deseo de reconectar con la Pachamama. Existen diferentes caminos para integrarte a nuestra comunidad, desde visitas cortas de aprendizaje hasta convertirte en un guardián permanente del santuario.",
    "requirements": "Requisitos",
    "voluntariado_req": ["Amor por la naturaleza", "Disposición física", "Estadía mínima de 2 semanas"],
    "retiro_req": ["Entrevista previa", "Preparación de dieta", "Respeto absoluto al linaje"],
    "residencia_req": ["Aprobación del Consejo", "Habilidad de aporte", "Compromiso vitalicio"]
  },
  en: {
    "intro_desc": "The call of the mountain is for those who feel the deep desire to reconnect with Pachamama. There are different paths to integrate into our community, from short learning visits to becoming a permanent guardian of the sanctuary.",
    "requirements": "Requirements",
    "voluntariado_req": ["Love for nature", "Physical readiness", "Minimum stay of 2 weeks"],
    "retiro_req": ["Prior interview", "Diet preparation", "Absolute respect for the lineage"],
    "residencia_req": ["Council approval", "Ability to contribute", "Lifelong commitment"]
  },
  fr: {
    "intro_desc": "L'appel de la montagne s'adresse à ceux qui ressentent le profond désir de se reconnecter avec Pachamama. Il existe différents chemins pour s'intégrer à notre communauté, des courtes visites d'apprentissage à devenir un gardien permanent du sanctuaire.",
    "requirements": "Exigences",
    "voluntariado_req": ["Amour de la nature", "Condition physique", "Séjour minimum de 2 semaines"],
    "retiro_req": ["Entretien préalable", "Préparation de diète", "Respect absolu de la lignée"],
    "residencia_req": ["Approbation du Conseil", "Capacité à contribuer", "Engagement à vie"]
  },
  pt: {
    "intro_desc": "O chamado da montanha é para aqueles que sentem o profundo desejo de se reconectar com a Pachamama. Existem diferentes caminhos para se integrar à nossa comunidade, desde visitas curtas de aprendizado até se tornar um guardião permanente do santuário.",
    "requirements": "Requisitos",
    "voluntariado_req": ["Amor pela natureza", "Disposição física", "Estadia mínima de 2 semanas"],
    "retiro_req": ["Entrevista prévia", "Preparação de dieta", "Respeito absoluto à linhagem"],
    "residencia_req": ["Aprovação do Conselho", "Habilidade de contribuição", "Compromisso vitalício"]
  }
};

locales.forEach(lang => {
  const filePath = path.join(__dirname, 'src', 'locales', lang, 'translation.json');
  if (fs.existsSync(filePath)) {
    let data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    // Merge into joinus object
    data.joinus = {
      ...data.joinus,
      ...translations[lang]
    };
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 4), 'utf8');
    console.log(`Updated ${lang}/translation.json`);
  }
});
