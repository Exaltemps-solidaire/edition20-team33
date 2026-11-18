// Profils proposés à l'écran « Qui êtes-vous ? ». Fonction pure, testée sans rendu.

export type Profil = {
  id: string;
  label: string;
  description: string;
};

export const PROFILS: Profil[] = [
  {
    id: "diagnostiquee",
    label: "Je viens d'être diagnostiquée",
    description: "Comprendre le diagnostic et les premières démarches.",
  },
  {
    id: "specialiste",
    label: "Je cherche un spécialiste",
    description: "Trouver une filière de soins près de chez vous.",
  },
  {
    id: "proche",
    label: "J'accompagne une proche",
    description: "Comprendre la maladie pour mieux soutenir.",
  },
];

export function trouverProfil(id: string): Profil | undefined {
  return PROFILS.find((profil) => profil.id === id);
}
