import fs from 'fs';
import path from 'path';

const localesDir = path.join(process.cwd(), 'src', 'locales');

const extraEnTranslations = {
  nusta: {
    story: {
      intro: {
        title: "Legend of the Enchanted Ñusta",
        subtitle: "ORIGINAL DOCUMENTARY: ANCESTRAL MEMORY",
        description: "Inquill Chumpi and Prince Asto Rímac: love, a pact with the Apus, and their transmutation into stone guardians of the harvest in Pisac."
      },
      piedras: {
        title: "Feminine & Masculine Energy",
        subtitle: "TUTELARY MONOLITHS OF PISAC",
        description: "The Ñusta and the Prince transmuted into living rock, teaching the sacred planting (Tarpuy) to the children and the Andean people."
      }
    }
  }
};

const extraEsTranslations = {
  nusta: {
    story: {
      intro: {
        title: "Leyenda de la Ñusta Encantada",
        subtitle: "DOCUMENTAL ORIGINAL: MEMORIA ANCESTRAL",
        description: "Inquill Chumpi y el príncipe Asto Rímac: amor, pacto con los Apus y la transmutación en guardianes pétreos de la siembra en Pisac."
      },
      piedras: {
        title: "Energía Femenina & Masculina",
        subtitle: "MONOLITOS TUTELARES DE PISAC",
        description: "La Ñusta y el Príncipe transmutados en roca viva, enseñando la siembra sagrada (Tarpuy) a los niños y al pueblo andino."
      }
    }
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

const enPath = path.join(localesDir, 'en', 'translation.json');
if (fs.existsSync(enPath)) {
  const data = JSON.parse(fs.readFileSync(enPath, 'utf8'));
  const updatedData = deepMerge(data, extraEnTranslations);
  fs.writeFileSync(enPath, JSON.stringify(updatedData, null, 4), 'utf8');
}

['es', 'fr', 'pt'].forEach(lang => {
  const filePath = path.join(localesDir, lang, 'translation.json');
  if (fs.existsSync(filePath)) {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const updatedData = deepMerge(data, extraEsTranslations);
    fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 4), 'utf8');
  }
});

console.log("Extra translations merged!");
