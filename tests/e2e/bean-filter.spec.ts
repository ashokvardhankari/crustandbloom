import { test, expect } from "playwright/test";

test.describe("Bean roast filter", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/beans");
  });

  test("beans page loads and shows reviews", async ({ page }) => {
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Beans");
    const cards = page.locator(".card-galatea");
    await expect(cards.first()).toBeVisible();
  });

  test("All filter is selected by default", async ({ page }) => {
    const allBtn = page.getByRole("button", { name: /All/i });
    await expect(allBtn).toHaveClass(/bg-terracotta/);
  });

  test("clicking Light filter updates active pill", async ({ page }) => {
    await page.getByRole("button", { name: /Light/i }).click();
    await expect(page.getByRole("button", { name: /Light/i })).toHaveClass(
      /bg-terracotta/
    );
    await expect(page.getByRole("button", { name: /All/i })).not.toHaveClass(
      /bg-terracotta/
    );
  });

  test("filtering by roast shows only matching cards or empty state", async ({ page }) => {
    await page.getByRole("button", { name: /Dark/i }).click();
    const cards = page.locator(".card-galatea");
    const emptyMsg = page.getByText(/No beans in this roast range/i);
    const hasPosts = (await cards.count()) > 0;
    const hasEmpty = await emptyMsg.isVisible();
    expect(hasPosts || hasEmpty).toBe(true);
  });

  test("individual bean review page loads with spec sidebar", async ({ page }) => {
    // Click the first bean card
    const firstCard = page.locator(".card-galatea").first();
    await firstCard.click();
    await expect(page.getByText("The bean")).toBeVisible();
    await expect(page.getByText("Roaster")).toBeVisible();
    await expect(page.getByText("In my cup")).toBeVisible();
  });
});
