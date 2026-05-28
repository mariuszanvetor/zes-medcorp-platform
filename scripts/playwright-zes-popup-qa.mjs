import fs from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright-core";

const baseUrl = process.env.QA_BASE_URL ?? "http://127.0.0.1:4025";
const outDir = path.resolve(".qa-playwright-zescorp");
const uploadFixture = path.join(outDir, "qa-upload.txt");

async function ensureDir() {
  await fs.mkdir(outDir, { recursive: true });
  await fs.writeFile(uploadFixture, "qa upload fixture for ZES popup flow\n", "utf8");
}

async function screenshot(page, fileName) {
  await page.screenshot({ path: path.join(outDir, fileName), fullPage: true });
}

async function openHome(page) {
  await page.goto(`${baseUrl}/`, { waitUntil: "networkidle" });
  await page.waitForTimeout(700);
}

async function ensurePopupOpen(page) {
  const popup = page.getByTestId("zes-floating-popup");
  if (!(await popup.isVisible())) {
    await page.getByTestId("zes-floating-reopen").click();
  }
  await popup.waitFor({ state: "visible", timeout: 8000 });
}

async function checkOverflow(page, extraSelector = null) {
  return page.evaluate((selector) => {
    const root = document.documentElement;
    const body = document.body;
    const pageOverflow = Math.max(root.scrollWidth, body.scrollWidth) - window.innerWidth;
    if (!selector) {
      return { pageOverflow };
    }
    const el = document.querySelector(selector);
    if (!(el instanceof HTMLElement)) {
      return { pageOverflow, targetOverflow: null };
    }
    return {
      pageOverflow,
      targetOverflow: el.scrollWidth - el.clientWidth,
    };
  }, extraSelector);
}

async function latestAssistantVisible(page) {
  return page.evaluate(() => {
    const container = document.querySelector('[data-testid="zes-floating-messages"]');
    if (!(container instanceof HTMLElement)) {
      return false;
    }

    const cards = container.querySelectorAll("div.justify-self-start");
    if (!cards.length) {
      return false;
    }
    const distanceFromBottom =
      container.scrollHeight - container.clientHeight - container.scrollTop;
    return distanceFromBottom < 64;
  });
}

async function composerVisible(page) {
  const composer = page.getByTestId("zes-floating-composer");
  const input = page.getByTestId("zes-floating-input");
  const send = page.getByTestId("zes-floating-send");
  return (await composer.isVisible()) && (await input.isVisible()) && (await send.isVisible());
}

async function run() {
  await ensureDir();

  const browser = await chromium.launch({ headless: true });
  const desktop = await browser.newContext({ viewport: { width: 1440, height: 920 } });
  const mobile = await browser.newContext({
    viewport: { width: 390, height: 844 },
    userAgent:
      "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1",
    isMobile: true,
    hasTouch: true,
    deviceScaleFactor: 3,
  });

  const report = {
    baseUrl,
    checks: [],
    generatedAt: new Date().toISOString(),
  };

  const d = await desktop.newPage();
  await openHome(d);
  await screenshot(d, "01-home-desktop.png");

  await ensurePopupOpen(d);
  await screenshot(d, "02-popup-open-desktop.png");

  const duplicateIds = await d.evaluate(
    () => document.querySelectorAll("#zes-guide").length,
  );
  report.checks.push({
    check: "no_duplicate_legacy_id",
    pass: duplicateIds <= 1,
    value: duplicateIds,
  });

  const desktopOverflow = await checkOverflow(d, '[data-testid="zes-floating-popup"]');
  report.checks.push({
    check: "desktop_no_horizontal_overflow",
    pass: (desktopOverflow.pageOverflow ?? 0) <= 1 && (desktopOverflow.targetOverflow ?? 0) <= 1,
    value: desktopOverflow,
  });

  await d.getByTestId("zes-floating-input").fill("buna ziua");
  await d.getByTestId("zes-floating-send").click();
  await d.waitForTimeout(2600);
  const greetingVisible = await latestAssistantVisible(d);
  report.checks.push({
    check: "latest_response_visible_after_greeting",
    pass: greetingVisible,
  });
  await screenshot(d, "03-popup-greeting-response-desktop.png");

  await d.getByTestId("zes-floating-input").fill("am un aparat defect");
  await d.getByTestId("zes-floating-send").click();
  await d.waitForTimeout(2800);
  const serviceVisible = await latestAssistantVisible(d);
  report.checks.push({
    check: "latest_response_visible_after_service",
    pass: serviceVisible,
  });
  await screenshot(d, "04-popup-service-response-desktop.png");

  await d.getByTestId("zes-floating-upload").click();
  await d.setInputFiles('input[type="file"]', uploadFixture);
  await d.waitForTimeout(2600);
  await screenshot(d, "05-popup-upload-flow.png");

  await d.getByRole("button", { name: /Trimite datele catre ZESCORP/i }).first().click().catch(() => {});
  await d.waitForTimeout(900);
  await screenshot(d, "06-popup-lead-panel.png");

  await d.getByTestId("zes-floating-minimize").click();
  await d.waitForTimeout(500);
  const reopenVisible = await d.getByTestId("zes-floating-reopen").isVisible();
  report.checks.push({
    check: "minimize_shows_reopen",
    pass: reopenVisible,
  });

  await d.getByTestId("zes-floating-reopen").click();
  await d.waitForTimeout(500);
  const reopenedVisible = await d.getByTestId("zes-floating-popup").isVisible();
  report.checks.push({
    check: "reopen_restores_popup",
    pass: reopenedVisible,
  });

  await screenshot(d, "07-popup-reopened-desktop.png");

  await d.goto(`${baseUrl}/service-aparatura-medicala`, { waitUntil: "networkidle" });
  await screenshot(d, "08-landing-service-desktop.png");
  await d.goto(`${baseUrl}/radioprotectie-plumbare-rx`, { waitUntil: "networkidle" });
  await screenshot(d, "09-landing-rx-desktop.png");

  const m = await mobile.newPage();
  await openHome(m);
  await screenshot(m, "10-home-mobile.png");
  await ensurePopupOpen(m);
  await screenshot(m, "11-popup-open-mobile.png");

  const mobileOverflow = await checkOverflow(m, '[data-testid="zes-floating-popup"]');
  report.checks.push({
    check: "mobile_no_horizontal_overflow",
    pass: (mobileOverflow.pageOverflow ?? 0) <= 1 && (mobileOverflow.targetOverflow ?? 0) <= 1,
    value: mobileOverflow,
  });

  await m.getByTestId("zes-floating-input").fill("buna ziua");
  await m.getByTestId("zes-floating-send").click();
  await m.waitForTimeout(2800);
  const mobileGreetingVisible = await latestAssistantVisible(m);
  report.checks.push({
    check: "mobile_latest_response_visible",
    pass: mobileGreetingVisible,
  });
  await screenshot(m, "12-popup-greeting-mobile.png");

  const mobileComposerVisible = await composerVisible(m);
  report.checks.push({
    check: "mobile_composer_visible",
    pass: mobileComposerVisible,
  });

  await m.getByTestId("zes-floating-minimize").click();
  await m.waitForTimeout(500);
  await screenshot(m, "13-popup-minimized-mobile.png");

  const mobileReopenVisible = await m.getByTestId("zes-floating-reopen").isVisible();
  report.checks.push({
    check: "mobile_minimize_reopen",
    pass: mobileReopenVisible,
  });

  await fs.writeFile(
    path.join(outDir, "qa-report.json"),
    JSON.stringify(report, null, 2),
    "utf8",
  );

  await desktop.close();
  await mobile.close();
  await browser.close();
}

run().catch(async (error) => {
  const errorFile = path.join(outDir, "qa-error.txt");
  await fs.mkdir(outDir, { recursive: true });
  await fs.writeFile(errorFile, String(error?.stack || error), "utf8");
  process.exit(1);
});
