import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }, testInfo) => {
  // Acess home page
  await page.goto("http://localhost:3000/");

  // Click button to access login page
  await page.getByRole("button", { name: "Entrar" }).click();

  // Text input
  await page.getByLabel("Email").fill("admin@example.com");

  // Text input
  await page.getByLabel("Password").fill("123456");

  // Click button to login
  await page.getByRole("button", { name: "Login" }).click();

  // Expects the URL redirects to admin page.
  await expect(page).toHaveURL(/.*admin/);
});

test("can register a subject", async ({ page }) => {
  // Click button to register subject
  await page.getByRole("link", { name: "Cadastrar sujeito" }).click();

  // Text input
  await page.getByLabel("Nome *").fill("Nome do fulano");

  // Text input
  await page
    .getByLabel("Nome da mãe (ou parente/conhecido próximo) *")
    .fill("Mãe do fulano");

  // Select input
  await page.getByLabel("Grau de parentesco *").click();
  await page.getByRole("option", { name: "Mãe" }).click();

  // Date input
  await page.getByPlaceholder("00/00/0000").click();
  await page.getByRole("button", { name: "8 junho 2023", exact: true }).click();

  // Click button to register subject
  await page.getByRole("button", { name: "Cadastrar" }).click();

  // Expects the URL redirects to show the social services page.
  await expect(page).toHaveURL(/.*social-services/);
});
