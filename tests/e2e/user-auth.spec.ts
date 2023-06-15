import { test, expect } from "@playwright/test";

test("a registered user can enter the system", async ({ page }) => {
  await page.goto("http://localhost:3000/login");

  // Text input
  await page.getByLabel("Email").fill("admin@example.com");

  // Text input
  await page.getByLabel("Password").fill("123456");

  // Click the enter system button.
  await page.getByRole("button", { name: "Login" }).click();

  // Expects the URL redirects to admin dashboard.
  await expect(page).toHaveURL(/.*admin/);
});

//TODO: test logout
