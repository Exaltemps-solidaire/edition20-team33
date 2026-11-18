import { describe, expect, it } from "vitest";
import { resoudreSuggestion } from "./ressources";

describe("resoudreSuggestion", () => {
  it("renvoie les ressources ALD et RQTH pour la suggestion droits", () => {
    const reponse = resoudreSuggestion("droits");
    expect(reponse.ressources.map((r) => r.titre)).toEqual([
      "ALD 31 et endométriose",
      "Endo&Vie pro — RQTH et MDPH",
    ]);
  });

  it("renvoie une réponse par défaut sans ressource pour une suggestion inconnue", () => {
    const reponse = resoudreSuggestion("medecins");
    expect(reponse.ressources).toHaveLength(0);
    expect(reponse.intro).toContain("info@endomind.org");
  });
});
