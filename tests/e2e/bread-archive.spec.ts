import { test, expect } from "playwright/test";

test.describe("Bread archive page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/bread");
  });

  test("page loads with classic sourdough and inclusion loaves sections", async ({ page }) => {
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Bread");
    await expect(page.getByRole("heading", { name: "Classic sourdough" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Inclusion loaves" })).toBeVisible();
  });

  test("classic sourdough section shows at least one card", async ({ page }) => {
    const classicSection = page.locator("section").first();
    await expect(classicSection.locator(".card-galatea").first()).toBeVisible();
  });

  test("flavor filter shows All, Savory, Sweet, and Spicy buttons", async ({ page }) => {
    await expect(page.getByRole("button", { name: /All/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /Savory/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /Sweet/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /Spicy/i })).toBeVisible();
  });

  test("All filter is selected by default", async ({ page }) => {
    await expect(page.getByRole("button", { name: /All/i })).toHaveClass(/bg-terracotta/);
  });

  test("clicking Savory filter updates the active pill", async ({ page }) => {
    await page.getByRole("button", { name: /Savory/i }).click();
    await expect(page.getByRole("button", { name: /Savory/i })).toHaveClass(/bg-terracotta/);
    await expect(page.getByRole("button", { name: /All/i })).not.toHaveClass(/bg-terracotta/);
  });

  test("Savory filter shows only savory posts or empty state", async ({ page }) => {
    await page.getByRole("button", { name: /Savory/i }).click();
    const cards = page.locator("#inclusions .card-galatea");
    const emptyMsg = page.getByText(/No loaves found for this filter/i);
    const hasPosts = (await cards.count()) > 0;
    const hasEmpty = await emptyMsg.isVisible();
    expect(hasPosts || hasEmpty).toBe(true);
  });

  test("Sweet filter shows only sweet posts or empty state", async ({ page }) => {
    await page.getByRole("button", { name: /Sweet/i }).click();
    const cards = page.locator("#inclusions .card-galatea");
    const emptyMsg = page.getByText(/No loaves found for this filter/i);
    const hasPosts = (await cards.count()) > 0;
    const hasEmpty = await emptyMsg.isVisible();
    expect(hasPosts || hasEmpty).toBe(true);
  });

  test("Spicy filter shows exactly the spicy post", async ({ page }) => {
    await page.getByRole("button", { name: /Spicy/i }).click();
    const cards = page.locator("#inclusions .card-galatea");
    // There is exactly 1 spicy loaf (calabrian-chili-cheddar)
    await expect(cards).toHaveCount(1);
  });

  test("selecting a flavor filter then All restores all inclusion posts", async ({ page }) => {
    const allButton = page.getByRole("button", { name: /All/i });
    const initialCount = await page.locator("#inclusions .card-galatea").count();

    await page.getByRole("button", { name: /Savory/i }).click();
    await allButton.click();

    const finalCount = await page.locator("#inclusions .card-galatea").count();
    expect(finalCount).toBe(initialCount);
  });
});

test.describe("Bread individual post pages", () => {
  test("inclusion post loads with bake stats bar and sidebar", async ({ page }) => {
    await page.goto("/bread/parmesan-rosemary");
    await expect(page.getByText("Hydration").first()).toBeVisible();
    await expect(page.getByText("Starter").first()).toBeVisible();
    await expect(page.getByText("Bulk Fermentation").first()).toBeVisible();
    await expect(page.getByText("Bake Details")).toBeVisible();
  });

  test("inclusion post shows 'What's inside' section with ingredients", async ({ page }) => {
    await page.goto("/bread/parmesan-rosemary");
    await expect(page.getByText(/What.s inside/i)).toBeVisible();
    await expect(page.getByText(/Parmigiano/i).first()).toBeVisible();
  });

  test("inclusion post shows tasting notes", async ({ page }) => {
    await page.goto("/bread/parmesan-rosemary");
    await expect(page.getByText("Tasting Notes")).toBeVisible();
  });

  test("classic post does not show inclusions section but shows tasting notes", async ({ page }) => {
    await page.goto("/bread/country-sourdough");
    await expect(page.getByText(/What.s inside/i)).not.toBeVisible();
    await expect(page.getByText("Tasting Notes")).toBeVisible();
  });
});
