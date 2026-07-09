import { test, expect } from "playwright/test";

test.describe("Coffee Calculator", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/tools/coffee-calculator");
  });

  test("page loads with Brew Ratio tab active", async ({ page }) => {
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Coffee Calculator"
    );
    // Yield section should be visible in ratio panel
    await expect(page.getByText("Yield", { exact: true })).toBeVisible();
  });

  test("brew ratio: changing dose updates yield", async ({ page }) => {
    const doseInput = page.getByLabel("Dose (g)").first();
    await doseInput.fill("20");
    await doseInput.blur();
    // With 20g dose at 1:2 (default), yield should be ~40g
    const yieldDisplay = page.locator("text=/^\\d+(\\.\\d)?g$/").first();
    await expect(yieldDisplay).toContainText("40");
  });

  test("brew ratio: selecting 1:1 ristretto preset updates yield", async ({ page }) => {
    await page.getByRole("button", { name: "1:1", exact: true }).click();
    // 18g dose × 1 = 18g yield
    await expect(page.locator("text=/^18(\\.0)?g$/").first()).toBeVisible();
  });

  test("switching to Drink Builder tab shows drink presets", async ({ page }) => {
    await page.getByRole("button", { name: "Drink Builder" }).click();
    await expect(page.getByRole("button", { name: "Cappuccino", exact: true })).toBeVisible();
    await expect(page.getByRole("button", { name: "Latte", exact: true })).toBeVisible();
  });

  test("switching to Extraction Yield tab shows extraction percentage", async ({ page }) => {
    await page.getByRole("button", { name: "Extraction Yield" }).click();
    await expect(page.getByText("Extraction Yield").first()).toBeVisible();
    // With 9.5% quick-estimate TDS, 18g dose, 36g yield → ~19% (ideal range)
    const yieldPct = page.locator("text=/^\\d+(\\.\\d+)?%$/").first();
    await expect(yieldPct).toBeVisible();
  });

  test("extraction yield quick mode shows ideal result for default espresso parameters", async ({ page }) => {
    await page.getByRole("button", { name: "Extraction Yield" }).click();
    // Default: dose=18g, bevWeight=36g, TDS=9.5% → EY = (36 * 9.5) / 18 = 19%
    await expect(page.getByText("Ideal")).toBeVisible();
  });
});
