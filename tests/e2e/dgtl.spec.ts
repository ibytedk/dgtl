import { expect, test } from "@playwright/test";

test("homepage exposes the DGTL hero and next race entry point", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "DGTL", exact: true })).toBeVisible();
  await expect(
    page.getByRole("main").getByText("Danish Grand Touring League", { exact: true })
  ).toBeVisible();
  await expect(page.getByRole("link", { name: /Tilmeld dig næste løb/ })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Næste løb" })).toBeVisible();
  await expect(page.getByText("Spa 2004").first()).toBeVisible();
  await expect(page.getByRole("heading", { name: "Nyeste medlemmer" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "På vej ud..." })).toBeVisible();
  await expect(page.getByText("Tomas Deha")).toBeVisible();
});

test("calendar shows race classes and signup state", async ({ page }) => {
  await page.goto("/kalender");

  await expect(page.getByRole("heading", { name: "Løbskalender" })).toBeVisible();
  await expect(page.getByText("Tilmelding åben")).toBeVisible();
  await expect(page.getByText("GT").first()).toBeVisible();
  await expect(page.getByText("nGT").first()).toBeVisible();
});

test("downloads only present published league files", async ({ page }) => {
  await page.goto("/downloads");

  await expect(page.getByRole("heading", { name: "Downloads" })).toBeVisible();
  await expect(page.getByText("DGTL Base Pack")).toBeVisible();
  await expect(page.getByText("Godkendte skins - Spa 500")).toBeVisible();
  await expect(page.getByText("Skin moderation")).toBeVisible();
});

test("cars page exposes the complete GTR2 catalog by class", async ({ page }) => {
  await page.goto("/biler");

  await expect(page.getByRole("heading", { name: "GTR2 bilkatalog" })).toBeVisible();
  await expect(page.getByText("38 racebiler")).toBeVisible();
  await expect(page.getByText("GT").first()).toBeVisible();
  await expect(page.getByText("nGT").first()).toBeVisible();
  await expect(page.getByText("G2").first()).toBeVisible();
  await expect(page.getByText("G3").first()).toBeVisible();
  await expect(page.getByRole("heading", { name: "2004 Maserati MC12 GT1" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "2004 Porsche 911 GT3-RSR" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "2004 BMW M3 GTR" })).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "2004 Dodge Viper Competition Coupe" })
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: "Maserati Coupé" })).toBeVisible();
});

test("tracks page exposes the complete GTR2 catalog with sourced stories", async ({ page }) => {
  await page.goto("/baner");

  await expect(page.getByRole("heading", { name: "GTR2 banekatalog" })).toBeVisible();
  await expect(page.getByText("33 layouts")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Anderstorp 2003" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Barcelona National" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Zhuhai" })).toBeVisible();
  await expect(page.getByText("Trackmap og data: RacingCircuits.info").first()).toBeVisible();
  await expect(page.getByRole("link", { name: "Læs hele baneprofilen" }).first()).toBeVisible();
});

test("track detail page exposes long-form Danish circuit content", async ({ page }) => {
  await page.goto("/baner/spa-2004");

  await expect(page.getByRole("heading", { name: "Spa 2004", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Fakta" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Historie" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Køreprofil i GTR2" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Løbsrapporter og resultatnedslag" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Proximus 24 Spa" })).toHaveCount(2);
  await expect(page.getByText("BMS Scuderia Italia #2 -")).toBeVisible();
  await expect(page.getByText("Researchstatus")).toBeVisible();
  await expect(page.getByText("Eau Rouge/Raidillon").first()).toBeVisible();
  await expect(page.getByRole("link", { name: "RacingCircuits.info" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Racing Sports Cars - Spa 24 Hours 2004" })).toBeVisible();
});

test("profile exposes fun and win driver level choices", async ({ page }) => {
  await page.goto("/profil");

  await expect(page.getByRole("heading", { name: "Kørerprofil" })).toBeVisible();
  await expect(page.getByText("Ambitionsniveau")).toBeVisible();
  await expect(page.getByRole("radio", { name: /Kører for sjov/ })).toBeVisible();
  await expect(page.getByRole("radio", { name: /Kører for at vinde/ })).toBeVisible();
  await expect(page.locator(".profile-level-option b").filter({ hasText: "Am" })).toBeVisible();
  await expect(page.locator(".profile-level-option b").filter({ hasText: "Pro" })).toBeVisible();
});

test("rules page exposes general and endurance rule documents", async ({ page }) => {
  await page.goto("/regler");

  await expect(page.getByRole("heading", { name: "Regler", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "DGTL.dk Generelle Regler 2026" })).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "DGTL Endurance 2026 - Tillægsregler" })
  ).toBeVisible();
  await expect(page.getByText("Kører for at vinde (Pro)").first()).toBeVisible();
  await expect(page.getByText("Kører for sjov (Am)").first()).toBeVisible();
});
