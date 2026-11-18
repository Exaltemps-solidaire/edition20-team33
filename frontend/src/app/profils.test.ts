import { describe, expect, it } from "vitest";
import { PROFILS, trouverProfil } from "./profils";

describe("trouverProfil", () => {
  it("retrouve un profil connu par son id", () => {
    const profil = trouverProfil("specialiste");
    expect(profil?.label).toBe("Je cherche un spécialiste");
  });

  it("renvoie undefined pour un id inconnu", () => {
    expect(trouverProfil("inconnu")).toBeUndefined();
  });

  it("expose les 3 profils attendus par l'écran d'accueil", () => {
    expect(PROFILS).toHaveLength(3);
  });
});
