import { expect, test } from "@playwright/test";

// Démo du cas passant, de bout en bout. Chaque itération ajoute ses étapes (test.step).
test("Démo : le cas passant", async ({ page }) => {
  await test.step("J'ouvre l'application", async () => {
    await page.goto("/");
    await expect(page.locator("body")).toBeVisible();
  });

  await test.step("Je vois les suggestions de questions fréquentes", async () => {
    await expect(page.getByRole("button", { name: "Mes droits (ALD, RQTH)" })).toBeVisible();
  });

  await test.step("Je clique sur 'Mes droits (ALD, RQTH)' et je vois la ressource", async () => {
    await page.getByRole("button", { name: "Mes droits (ALD, RQTH)" }).click();
    await expect(page.getByText("ALD 31 et endométriose")).toBeVisible();
  });
});
