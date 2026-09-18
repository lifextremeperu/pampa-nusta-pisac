import fs from 'fs';
import path from 'path';

const localesDir = path.join(process.cwd(), 'src', 'locales');

const missingEsTranslations = {
  nav: {
    pampa: "Pampa Ñusta",
    menu: "MENÚ"
  },
  identity: {
    title: "Identidad Pampa Ñusta",
    subtitle: "El Corazón del Santuario",
    who: "¿Quiénes Somos?",
    who_desc: "Somos un colectivo de guardianes de la tierra ubicados en la comunidad de Maska, Pisac. Conformamos una ecoaldea viva dedicada a preservar la memoria ancestral andina, la bioconstrucción y el legado espiritual de los Andes para las futuras generaciones.",
    mission: "Nuestra Misión",
    mission_desc: "Proteger y cultivar el banco genético del cactus sagrado Wachuma y de semillas nativas, brindando un espacio de educación alternativa para niños y un refugio de sanación integral a través de ceremonias y tecnologías regenerativas.",
    vision: "Nuestra Visión",
    vision_desc: "Convertirnos en un epicentro global de sabiduría ancestral y permacultura, donde la humanidad recuerde cómo convivir en armonía con la Pachamama, expandiendo la conciencia colectiva desde el Valle Sagrado de los Incas hacia el mundo entero."
  },
  faq: {
    subtitle: "Guía para Viajeros y Custodios",
    title: "PREGUNTAS FRECUENTES"
  },
  location: {
    title: "Territorio Sagrado",
    subtitle: "COORDENADAS DEL SANTUARIO",
    location: "Maska, Pisac, Cusco - Perú",
    altitude: "3,000 msnm",
    environment: "Valle Sagrado de los Incas",
    climate: "Templado Andino",
    desc: "Ubicados estratégicamente a los pies del imponente complejo arqueológico de Pisac. Nuestro santuario se nutre de las aguas glaciares de los Apus mayores, creando un microclima perfecto para la conservación de la medicina y las semillas."
  }
};

function deepMerge(target, source) {
  for (const key of Object.keys(source)) {
    if (source[key] instanceof Object && key in target) {
      Object.assign(source[key], deepMerge(target[key], source[key]));
    }
  }
  Object.assign(target || {}, source);
  return target;
}

['es', 'fr', 'pt'].forEach(lang => {
  const filePath = path.join(localesDir, lang, 'translation.json');
  if (fs.existsSync(filePath)) {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const updatedData = deepMerge(data, missingEsTranslations);
    fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 4), 'utf8');
  }
});

console.log("Missing ES translations successfully injected!");
