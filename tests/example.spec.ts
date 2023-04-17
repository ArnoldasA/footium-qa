import { test, expect } from "@playwright/test";

test.beforeAll(async ({ page }) => {
  await page.goto("https://footium.club/");
});

test("Get started", async ({ page }) => {
  const page1Promise = page.waitForEvent("popup");
  await page.getByRole("button", { name: "Get Started" }).click();
  let context = await page.context();
  await page.waitForTimeout(2000); //waitForNavigation and waitForLoadState do not work in this case
  let pages = await context.pages();
  expect(await pages[1].title()).toEqual(
    "How to get started with Footium. For anyone that has been following… | by Sam | Footium | Footium | Medium"
  );
});

test("Investors", async ({ page }) => {
  await expect(page.locator(".css-otj0sz")).toHaveText([
    "Backed VCAnimoca BrandsStride VCEntreé CapitalConcept VenturesIVCEncode Club",
    "Merit CircleBlackPoolBAYZYield Guild Games SEA",
  ]);
  await expect(page.locator(".css-1s2egts")).toHaveText([
    "Chris SmallingProfessional FootballerMichael BentleyCEO of Euler FinanceAhmed Al-BalaghiCEO of BiconomySolBigBrainProminent Web3 Angel",
  ]);
});

test("Play", async ({ page }) => {
  await page.getByRole("button", { name: "Play" }).click();
  await page.waitForLoadState("networkidle");
  await expect(page).toHaveURL("https://footium.club/game");
  await page.waitForLoadState("networkidle");
  const rowCount = await page.locator("tbody tr").count();
  expect(rowCount).toEqual(12);
  const imgCount = await page.locator("tbody tr img").count();
  expect(imgCount).toEqual(12);
});
