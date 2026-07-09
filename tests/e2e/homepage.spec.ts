import { test, expect } from "playwright/test";

test.describe("Homepage", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("renders hero headline and CTAs", async ({ page }) => {
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Small batches"
    );
    await expect(page.getByRole("link", { name: "Explore Coffee" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Explore Bread" })).toBeVisible();
  });

  test("navigation links are present", async ({ page }) => {
    const nav = page.getByRole("navigation").first();
    await expect(nav.getByRole("link", { name: "Coffee" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Beans" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Bread" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Gallery" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Tools" })).toBeVisible();
  });

  test("latest posts section is visible and has at least one card", async ({ page }) => {
    await expect(page.getByText("Latest")).toBeVisible();
    const cards = page.locator(".card-galatea");
    await expect(cards.first()).toBeVisible();
  });

  test("newsletter signup form is present", async ({ page }) => {
    const emailInput = page.getByPlaceholder("your@email.com");
    await expect(emailInput).toBeVisible();
    await expect(page.getByRole("button", { name: "Subscribe" })).toBeVisible();
  });

  test("skip to main content link exists for accessibility", async ({ page }) => {
    const skipLink = page.getByRole("link", { name: "Skip to main content" });
    await expect(skipLink).toBeAttached();
  });
});
