// Mapping suggestion → ressource ENDOmind. Fonction pure, testée sans rendu.

export type Ressource = {
  label: string;
  titre: string;
  description: string;
  lien: string;
};

export type ReponseSuggestion = {
  intro: string;
  ressources: Ressource[];
  alerte?: boolean;
};

const REPONSE_DROITS: ReponseSuggestion = {
  intro: "Bonne question. ENDOmind a préparé des ressources spécifiques sur vos droits.",
  ressources: [
    {
      label: "📄 Fiche pratique",
      titre: "ALD 31 et endométriose",
      description:
        "Ce qu'est l'ALD 31 (affection de longue durée, prise en charge à 100 %), comment la demander, pourquoi elle est parfois refusée.",
      lien: "Télécharger la fiche ALD →",
    },
    {
      label: "📘 Livret",
      titre: "Endo&Vie pro — RQTH et MDPH",
      description:
        "Reconnaissance de la qualité de travailleur handicapé, maison départementale des personnes handicapées : démarches pas à pas.",
      lien: "Voir le livret →",
    },
  ],
};

const REPONSE_MEDECINS: ReponseSuggestion = {
  intro: "ENDOmind recense les filières de soins coordonnées, par région.",
  ressources: [
    {
      label: "🗺 Ressource disponible",
      titre: "Carte des filières de soins par région",
      description:
        "Des réseaux de professionnel·les formé·es à l'endométriose, organisés par région.",
      lien: "Voir la carte des filières →",
    },
  ],
};

type ExtraitGuide = {
  theme: string;
  resume: string;
  extrait: string;
};

const EXTRAIT_GUIDE_PAR_DEFAUT: ExtraitGuide = {
  theme: "Le diagnostic, et maintenant ?",
  resume: "ENDOmind a publié un guide complet pour cette étape.",
  extrait: "Guide gratuit de 80 pages : repères pour comprendre son diagnostic et les premières étapes.",
};

const EXTRAITS_GUIDE: Record<string, ExtraitGuide> = {
  diagnostic: {
    theme: "Les premiers jours après le diagnostic",
    resume: "Ce que vous ressentez est normal : le guide consacre un chapitre aux premiers jours.",
    extrait:
      "« On a longtemps cherché un nom à mes douleurs. Le jour du diagnostic, on se sent à la fois soulagée et perdue. » — extrait du guide.",
  },
  traitement: {
    theme: "Comprendre les traitements",
    resume: "Le guide détaille les grandes familles de traitements et comment en parler à son médecin.",
    extrait:
      "« Il n'existe pas un traitement unique : hormonal, chirurgical, ou les deux combinés, selon votre situation. » — extrait du guide.",
  },
};

function resoudreGuide(themeGuide?: string): ReponseSuggestion {
  const extrait = (themeGuide && EXTRAITS_GUIDE[themeGuide]) || EXTRAIT_GUIDE_PAR_DEFAUT;
  return {
    intro: extrait.resume,
    ressources: [
      {
        label: "📘 Guide — extrait",
        titre: extrait.theme,
        description: extrait.extrait,
        lien: "Lire ce passage dans le guide →",
      },
    ],
  };
}

const REPONSE_GROUPES: ReponseSuggestion = {
  intro: "ENDOmind organise des rencontres entre patientes.",
  ressources: [
    {
      label: "👥 Ressource",
      titre: "Groupes de parole et cafés patientes",
      description: "Des rencontres pour échanger avec d'autres patientes près de chez vous.",
      lien: "En savoir plus →",
    },
  ],
};

const REPONSE_PAR_DEFAUT: ReponseSuggestion = {
  intro:
    "Je n'ai pas encore de ressource prête pour cette question. Écrivez à info@endomind.org, l'équipe vous répond directement.",
  ressources: [],
  alerte: true,
};

export function resoudreSuggestion(id: string, themeGuide?: string): ReponseSuggestion {
  if (id === "droits") return REPONSE_DROITS;
  if (id === "medecins") return REPONSE_MEDECINS;
  if (id === "guide") return resoudreGuide(themeGuide);
  if (id === "groupes") return REPONSE_GROUPES;
  return REPONSE_PAR_DEFAUT;
}

const MOTS_CLES: { motCle: string; id: string; themeGuide?: string }[] = [
  // Droits : ALD, RQTH, démarches administratives
  { motCle: "ald", id: "droits" },
  { motCle: "rqth", id: "droits" },
  { motCle: "droit", id: "droits" },
  { motCle: "congé", id: "droits" },
  { motCle: "arrêt de travail", id: "droits" },
  { motCle: "invalidité", id: "droits" },
  { motCle: "handicap", id: "droits" },
  { motCle: "allocation", id: "droits" },
  { motCle: "pension", id: "droits" },

  // Médecins : trouver un professionnel de santé formé
  { motCle: "médecin", id: "medecins" },
  { motCle: "spécialiste", id: "medecins" },
  { motCle: "gynécologue", id: "medecins" },
  { motCle: "chirurgien", id: "medecins" },
  { motCle: "consultation", id: "medecins" },
  { motCle: "rendez-vous", id: "medecins" },
  { motCle: "rdv", id: "medecins" },

  // Guide : thème « diagnostic »
  { motCle: "diagnostic", id: "guide", themeGuide: "diagnostic" },
  { motCle: "diagnostiqu", id: "guide", themeGuide: "diagnostic" },
  { motCle: "annonce", id: "guide", themeGuide: "diagnostic" },
  { motCle: "symptôme", id: "guide", themeGuide: "diagnostic" },

  // Guide : thème « traitement »
  { motCle: "traitement", id: "guide", themeGuide: "traitement" },
  { motCle: "opération", id: "guide", themeGuide: "traitement" },
  { motCle: "chirurgie", id: "guide", themeGuide: "traitement" },
  { motCle: "hormone", id: "guide", themeGuide: "traitement" },

  // Guide : vue d'ensemble
  { motCle: "guide", id: "guide" },

  // Groupes de parole : échanger avec d'autres patientes
  { motCle: "groupe", id: "groupes" },
  { motCle: "parole", id: "groupes" },
  { motCle: "soutien", id: "groupes" },
  { motCle: "échanger", id: "groupes" },
  { motCle: "témoignage", id: "groupes" },
  { motCle: "rencontre", id: "groupes" },
];

export function resoudreTexteLibre(texte: string): ReponseSuggestion {
  const texteNormalise = texte.toLowerCase();
  const correspondance = MOTS_CLES.find(({ motCle }) => texteNormalise.includes(motCle));
  if (!correspondance) return REPONSE_PAR_DEFAUT;
  return resoudreSuggestion(correspondance.id, correspondance.themeGuide);
}

export const REGIONS = ["Île-de-France", "Auvergne-Rhône-Alpes", "Occitanie", "Hauts-de-France"];

export function personnaliserRegion(reponse: ReponseSuggestion, region: string | null): ReponseSuggestion {
  if (!region) return reponse;
  return { ...reponse, intro: `${reponse.intro} (région sélectionnée : ${region})` };
}
