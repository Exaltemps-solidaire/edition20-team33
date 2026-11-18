import { describe, expect, it } from "vitest";
import { resoudreSuggestion, resoudreTexteLibre } from "./ressources";

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

  it("renvoie le contact humain quand aucun mot-clé n'est reconnu", () => {
    const reponse = resoudreTexteLibre("Bonjour, j'ai une question sur autre chose");
    expect(reponse.ressources).toHaveLength(0);
    expect(reponse.intro).toContain("info@endomind.org");
  });
});
