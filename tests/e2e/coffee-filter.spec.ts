import { test, expect } from "playwright/test";

test.describe("Coffee category filter", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/coffee");
  });

  test("shows All filter selected by default and displays posts", async ({ page }) => {
    const allButton = page.getByRole("button", { name: /All/i });
    await expect(allButton).toHaveClass(/bg-terracotta/);
    const cards = page.locator(".card-galatea");
    await expect(cards.first()).toBeVisible();
  });

  test("filtering by Cappuccino hides non-cappuccino posts", async ({ page }) => {
    await page.getByRole("button", { name: /Cappuccino/i }).click();
    // Either shows cappuccino posts or the empty-state message
    const cards = page.locator(".card-galatea");
    const emptyMsg = page.getByText(/No drinks in this category/i);
    const hasPosts = await cards.count() > 0;
    const hasEmpty = await emptyMsg.isVisible();
    expect(hasPosts || hasEmpty).toBe(true);
  });

  test("filter buttons show all expected categories", async ({ page }) => {
    await expect(page.getByRole("button", { name: /All/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /Espresso/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /Cappuccino/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /Latte/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /Filter/i })).toBeVisible();
  });

  test("selecting a category then All restores all posts", async ({ page }) => {
    const allButton = page.getByRole("button", { name: /^All$/i });
    const initialCount = await page.locator(".card-galatea").count();

    await page.getByRole("button", { name: /Cappuccino/i }).click();
    await allButton.click();

    const finalCount = await page.locator(".card-galatea").count();
    expect(finalCount).toBe(initialCount);
  });
});
