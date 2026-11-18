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

const REPONSE_PAR_DEFAUT: ReponseSuggestion = {
  intro:
    "Je n'ai pas encore de ressource prête pour cette question. Écrivez à info@endomind.org, l'équipe vous répond directement.",
  ressources: [],
};

export function resoudreSuggestion(id: string): ReponseSuggestion {
  if (id === "droits") return REPONSE_DROITS;
  return REPONSE_PAR_DEFAUT;
}
