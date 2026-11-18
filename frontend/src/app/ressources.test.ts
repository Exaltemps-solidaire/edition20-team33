import { describe, expect, it } from "vitest";
import { personnaliserRegion, resoudreSuggestion, resoudreTexteLibre } from "./ressources";

describe("resoudreSuggestion", () => {
  it("renvoie les ressources ALD et RQTH pour la suggestion droits", () => {
    const reponse = resoudreSuggestion("droits");
    expect(reponse.ressources.map((r) => r.titre)).toEqual([
      "ALD 31 et endométriose",
      "Endo&Vie pro — RQTH et MDPH",
    ]);
  });

  it("renvoie la carte des filières de soins pour la suggestion medecins", () => {
    const reponse = resoudreSuggestion("medecins");
    expect(reponse.ressources.map((r) => r.titre)).toEqual(["Carte des filières de soins par région"]);
  });

  it("renvoie le guide diagnostic pour la suggestion guide", () => {
    const reponse = resoudreSuggestion("guide");
    expect(reponse.ressources.map((r) => r.titre)).toEqual(["Le diagnostic, et maintenant ?"]);
  });

  it("renvoie les groupes de parole pour la suggestion groupes", () => {
    const reponse = resoudreSuggestion("groupes");
    expect(reponse.ressources.map((r) => r.titre)).toEqual(["Groupes de parole et cafés patientes"]);
  });

  it("renvoie une réponse par défaut sans ressource pour une suggestion inconnue", () => {
    const reponse = resoudreSuggestion("inconnue");
    expect(reponse.ressources).toHaveLength(0);
    expect(reponse.intro).toContain("info@endomind.org");
  });
});

describe("resoudreTexteLibre", () => {
  it("reconnaît un mot-clé connu dans une phrase libre", () => {
    const reponse = resoudreTexteLibre("Je cherche un spécialiste près de chez moi");
    expect(reponse.ressources.map((r) => r.titre)).toEqual(["Carte des filières de soins par région"]);
  });

  it("montre l'extrait thématique du guide pour le mot-clé diagnostic, pas la description générique", () => {
    const reponse = resoudreTexteLibre("Je viens d'avoir mon diagnostic");
    expect(reponse.ressources[0].titre).toBe("Les premiers jours après le diagnostic");
    expect(reponse.ressources[0].description).not.toContain("80 pages");
  });

  it("montre l'extrait thématique du guide pour le mot-clé traitement", () => {
    const reponse = resoudreTexteLibre("Quel traitement me conseillez-vous");
    expect(reponse.ressources[0].titre).toBe("Comprendre les traitements");
  });

  it("garde la vue d'ensemble du guide quand la suggestion est cliquée sans mot-clé", () => {
    const reponse = resoudreSuggestion("guide");
    expect(reponse.ressources[0].titre).toBe("Le diagnostic, et maintenant ?");
  });

  it("renvoie le contact humain quand aucun mot-clé n'est reconnu", () => {
    const reponse = resoudreTexteLibre("Bonjour, j'ai une question sur autre chose");
    expect(reponse.ressources).toHaveLength(0);
    expect(reponse.intro).toContain("info@endomind.org");
  });

  it("déclenche l'alerte uniquement quand aucun mot-clé n'est reconnu", () => {
    expect(resoudreTexteLibre("Une question hors sujet").alerte).toBe(true);
    expect(resoudreTexteLibre("Je cherche un spécialiste").alerte).toBeUndefined();
  });

  it("reconnaît des formulations réalistes au-delà des mots-clés exacts d'origine", () => {
    expect(resoudreTexteLibre("Je suis en arrêt de travail, quels sont mes droits ?").ressources.map((r) => r.titre)).toContain(
      "ALD 31 et endométriose",
    );
    expect(resoudreTexteLibre("Je cherche une gynécologue près de chez moi").ressources.map((r) => r.titre)).toEqual([
      "Carte des filières de soins par région",
    ]);
    expect(resoudreTexteLibre("J'aimerais lire des témoignages d'autres patientes").ressources.map((r) => r.titre)).toEqual([
      "Groupes de parole et cafés patientes",
    ]);
  });

  it("ignore les accents manquants dans la question tapée", () => {
    const reponse = resoudreTexteLibre("quels sont les symptomes");
    expect(reponse.ressources[0]?.titre).toBe("Les premiers jours après le diagnostic");

    expect(resoudreTexteLibre("je cherche un medecin").ressources.map((r) => r.titre)).toEqual([
      "Carte des filières de soins par région",
    ]);
  });
});

describe("personnaliserRegion", () => {
  it("mentionne la région choisie dans l'intro de la réponse", () => {
    const reponse = personnaliserRegion(resoudreSuggestion("medecins"), "Occitanie");
    expect(reponse.intro).toContain("Occitanie");
  });

  it("laisse la réponse inchangée quand aucune région n'est choisie", () => {
    const originale = resoudreSuggestion("medecins");
    const reponse = personnaliserRegion(originale, null);
    expect(reponse.intro).toBe(originale.intro);
  });
});
