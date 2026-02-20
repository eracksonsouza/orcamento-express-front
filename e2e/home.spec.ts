import { expect, test } from "@playwright/test";

test("shows app shell", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /orcamento express/i })).toBeVisible();
});
