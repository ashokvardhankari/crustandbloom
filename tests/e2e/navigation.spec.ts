import { test, expect } from "playwright/test";

test.describe("Navigation", () => {
  test("clicking Coffee nav link shows coffee archive page", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("navigation").first().getByRole("link", { name: "Coffee" }).click();
    await expect(page).toHaveURL("/coffee");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Coffee");
  });

  test("clicking Bread nav link shows bread archive page", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("navigation").first().getByRole("link", { name: "Bread" }).click();
    await expect(page).toHaveURL("/bread");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Bread");
  });

  test("clicking Beans nav link shows beans page", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("navigation").first().getByRole("link", { name: "Beans" }).click();
    await expect(page).toHaveURL("/beans");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Beans");
  });

  test("clicking Gallery nav link shows gallery page", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("navigation").first().getByRole("link", { name: "Gallery" }).click();
    await expect(page).toHaveURL("/gallery");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Gallery");
  });

  test("logo link navigates back to homepage", async ({ page }) => {
    await page.goto("/coffee");
    await page.getByRole("link", { name: /Crust.*Bloom/ }).first().click();
    await expect(page).toHaveURL("/");
  });

  test("unknown slug returns 404 page", async ({ page }) => {
    const response = await page.goto("/coffee/this-does-not-exist-xyz");
    expect(response?.status()).toBe(404);
    await expect(page.getByText(/not found/i)).toBeVisible();
  });
});
