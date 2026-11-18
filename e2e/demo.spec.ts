import { expect, test } from "@playwright/test";

// Démo du cas passant, de bout en bout. Chaque itération ajoute ses étapes (test.step).
test("Démo : le cas passant", async ({ page }) => {
  await test.step("J'ouvre l'application", async () => {
    await page.goto("/");
    await expect(page.locator("body")).toBeVisible();
  });

  await test.step("Je choisis un profil avant d'entrer dans le chatbot", async () => {
    await expect(page.getByRole("button", { name: "Je viens d'être diagnostiquée" })).toBeVisible();
    await page.getByRole("button", { name: "Je viens d'être diagnostiquée" }).click();
  });

  await test.step("Je vois les suggestions de questions fréquentes", async () => {
    await expect(page.getByRole("button", { name: "Mes droits (ALD, RQTH)" })).toBeVisible();
  });

  await test.step("Je clique sur 'Mes droits (ALD, RQTH)' et je vois la ressource", async () => {
    await page.getByRole("button", { name: "Mes droits (ALD, RQTH)" }).click();
    await expect(page.getByText("ALD 31 et endométriose")).toBeVisible();
  });

  await test.step("Je clique sur chaque suggestion et je vois une ressource dédiée", async () => {
    await page.getByRole("button", { name: "Réseau de médecins" }).click();
    await expect(page.getByText("Carte des filières de soins par région")).toBeVisible();

    await page.getByRole("button", { name: "Le guide diagnostic" }).click();
    await expect(page.getByText("Le diagnostic, et maintenant ?")).toBeVisible();

    await page.getByRole("button", { name: "Groupes de parole" }).click();
    await expect(page.getByText("Groupes de parole et cafés patientes")).toBeVisible();
  });

  await test.step("Je tape une question et j'obtiens une ressource ou le contact humain", async () => {
    await page.getByLabel("Votre question").fill("Je cherche un spécialiste");
    await page.getByRole("button", { name: "Envoyer" }).click();
    await expect(page.getByText("Carte des filières de soins par région")).toHaveCount(2);

    await page.getByLabel("Votre question").fill("Une question hors sujet");
    await page.getByRole("button", { name: "Envoyer" }).click();
    await expect(page.getByText("info@endomind.org")).toBeVisible();
  });
});
