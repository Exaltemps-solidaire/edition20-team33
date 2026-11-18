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

const REPONSE_GUIDE: ReponseSuggestion = {
  intro: "ENDOmind a publié un guide complet pour cette étape.",
  ressources: [
    {
      label: "📘 Guide",
      titre: "Le diagnostic, et maintenant ?",
      description: "Guide gratuit de 80 pages : repères pour comprendre son diagnostic et les premières étapes.",
      lien: "Télécharger le guide →",
    },
  ],
};

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
};

export function resoudreSuggestion(id: string): ReponseSuggestion {
  if (id === "droits") return REPONSE_DROITS;
  if (id === "medecins") return REPONSE_MEDECINS;
  if (id === "guide") return REPONSE_GUIDE;
  if (id === "groupes") return REPONSE_GROUPES;
  return REPONSE_PAR_DEFAUT;
}
