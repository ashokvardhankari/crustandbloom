import { test, expect } from "playwright/test";

test.describe("Baking Calculator", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/tools/baking-calculator");
  });

  test("page loads with schedule visible", async ({ page }) => {
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Baking Calculator"
    );
    // Baking schedule steps should appear
    await expect(page.getByText(/total time:/i)).toBeVisible();
  });

  test("timeline shows multiple steps", async ({ page }) => {
    const steps = page.locator(".rounded-xl").filter({ hasText: /min|hour/ });
    const stepCount = await steps.count();
    expect(stepCount).toBeGreaterThanOrEqual(3);
  });

  test("switching direction to backward planning changes label", async ({ page }) => {
    await page.getByRole("button", { name: /I want bread by/i }).click();
    await expect(
      page.getByRole("button", { name: /I want bread by/i })
    ).toHaveClass(/bg-terracotta/);
  });

  test("changing date/time updates schedule times", async ({ page }) => {
    const dtInput = page.locator('input[type="datetime-local"]');
    await dtInput.fill("2025-06-15T08:00");
    // After changing start time, first step should reflect new time
    await expect(page.getByText(/Sun|Mon|Tue|Wed|Thu|Fri|Sat/).first()).toBeVisible();
  });
});
