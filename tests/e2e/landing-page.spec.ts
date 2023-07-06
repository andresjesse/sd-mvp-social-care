import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Social Care/);
});

test("has a link to enter the system", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  // Click the enter system button.
  await page.getByRole("button", { name: "Entrar" }).click();

  // Expects the URL redirects to login.
  await expect(page).toHaveURL(/.*login/);
});
