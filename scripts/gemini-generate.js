/**
 * Generate cover photos for the /admin/inclusions idea board via Gemini.
 *
 * Approach (ported from the SmolSoul repo, which ran fast and reliably):
 *  - Launch a REAL Chrome with remote debugging + a dedicated persistent
 *    profile, then drive it with Playwright over CDP. Real Chrome + a logged-in
 *    profile means Gemini doesn't throttle/degrade the session the way it does
 *    an obviously-automated one.
 *  - Enter the prompt with locator.fill() and click Send (reliable, instant).
 *  - Wait for the generated <img>, then extract its bytes IN-PAGE via
 *    canvas.toDataURL() and write them straight to disk — no download button,
 *    no ~/Downloads race, no filename guessing.
 *  - One fresh page per loaf, closed afterwards, so the renderer never wedges.
 *
 * Files are written to public/images/inclusions/<slug>.jpg. The admin API
 * (app/api/admin/ideas/route.ts) auto-attaches any file whose slug matches a
 * loaf, so nothing else needs updating — just run this and the cards fill in.
 *
 * Usage:  node scripts/gemini-generate.js
 * A Chrome window opens at gemini.google.com. Sign into Google once; the script
 * detects the prompt box and proceeds automatically, then reuses the session on
 * later runs. Re-running only generates loaves that don't have a photo yet.
 */

const { chromium } = require("playwright");
const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

const CDP_PORT = 9334;
const PROFILE_DIR = path.join(process.env.HOME, ".crustbloom-chrome-profile");
const OUT_DIR = path.join("public", "images", "inclusions");
const DATA_FILE = path.join("lib", "inclusion-ideas.ts");
const MAX_PX = 1000; // downscale the 1024² output a touch for web
const JPEG_Q = 0.72; // ~300KB per image, matching the ones already in-repo

// ── Mirror lib/inclusion-ideas.ts inclusionSlug() exactly ────────────────────
function inclusionSlug(name) {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// ── Parse the loaf list straight out of the TS data file ─────────────────────
function loadLoaves() {
  const src = fs.readFileSync(DATA_FILE, "utf8");
  const start = src.indexOf("export const INCLUSION_IDEAS");
  const arrStart = src.indexOf("[", src.indexOf("=", start));
  let depth = 0,
    end = -1;
  for (let i = arrStart; i < src.length; i++) {
    if (src[i] === "[") depth++;
    else if (src[i] === "]" && --depth === 0) {
      end = i;
      break;
    }
  }
  const body = src.slice(arrStart, end + 1);
  const names = [...body.matchAll(/\n\s{4}name:\s*"((?:[^"\\]|\\.)*)"/g)].map(
    (m) => m[1],
  );
  const notes = [...body.matchAll(/tastingNote:\s*"((?:[^"\\]|\\.)*)"/gs)].map(
    (m) => m[1].replace(/\s+/g, " ").trim(),
  );
  return names.map((name, i) => ({
    name,
    slug: inclusionSlug(name),
    prompt: buildPrompt(name, notes[i] || ""),
  }));
}

function buildPrompt(name, note) {
  return (
    `Generate a photorealistic overhead food photograph of a rustic artisan ` +
    `sourdough boule flavored like ${name.replace(/[.]$/, "")}: ${note} ` +
    `One whole round loaf on a natural linen cloth over a wooden board, warm ` +
    `soft window light, shallow depth of field, cozy editorial bakery styling, ` +
    `no text, no hands, 1:1 square.`
  );
}

function launchChrome() {
  const chromePath =
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
  const proc = spawn(
    chromePath,
    [
      `--remote-debugging-port=${CDP_PORT}`,
      `--user-data-dir=${PROFILE_DIR}`,
      "--no-first-run",
      "--no-default-browser-check",
      "https://gemini.google.com/app",
    ],
    { stdio: "ignore", detached: true },
  );
  proc.unref();
  return proc;
}

async function waitForCDP(maxWait = 30000) {
  const start = Date.now();
  while (Date.now() - start < maxWait) {
    try {
      const r = await fetch(`http://localhost:${CDP_PORT}/json/version`);
      if (r.ok) return true;
    } catch {}
    await new Promise((r) => setTimeout(r, 500));
  }
  return false;
}

const promptBox = (page) =>
  page.locator('.ql-editor, div[contenteditable="true"]').first();

async function run() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const loaves = loadLoaves();
  const pending = loaves.filter((l) => {
    const dest = path.join(OUT_DIR, `${l.slug}.jpg`);
    return !(fs.existsSync(dest) && fs.statSync(dest).size > 5000);
  });
  const done = loaves.length - pending.length;
  console.log(`\n${loaves.length} loaves — ${done} already have photos, ${pending.length} to generate.\n`);
  if (!pending.length) {
    console.log("Nothing to do.");
    return;
  }

  // Dry run: validate parsing/slugs without touching Chrome.
  if (process.argv.includes("--list")) {
    pending.slice(0, 5).forEach((l) => console.log(`  → ${l.slug}\n     ${l.prompt.slice(0, 90)}…`));
    if (pending.length > 5) console.log(`  … and ${pending.length - 5} more`);
    return;
  }

  console.log("Launching Chrome (dedicated profile)…");
  const chromeProc = launchChrome();
  if (!(await waitForCDP())) {
    console.error(`Could not reach Chrome on CDP ${CDP_PORT}.`);
    process.exit(1);
  }

  const browser = await chromium.connectOverCDP(`http://localhost:${CDP_PORT}`);
  const context = browser.contexts()[0];

  // Auto-detect login: poll the first Gemini page until the prompt box shows.
  const gate = context.pages().find((p) => p.url().includes("gemini")) || (await context.newPage());
  if (!gate.url().includes("gemini")) await gate.goto("https://gemini.google.com/app");
  console.log("Waiting for you to sign into Google in the Chrome window…");
  const loginStart = Date.now();
  while (Date.now() - loginStart < 5 * 60 * 1000) {
    if (await promptBox(gate).isVisible().catch(() => false)) break;
    await new Promise((r) => setTimeout(r, 1500));
  }
  if (!(await promptBox(gate).isVisible().catch(() => false))) {
    console.error("Timed out waiting for Gemini login.");
    process.exit(1);
  }
  console.log("Signed in. Generating…\n");

  let ok = 0,
    fail = 0;
  for (let i = 0; i < pending.length; i++) {
    const item = pending[i];
    const label = `[${i + 1}/${pending.length}]`;
    let saved = false;

    for (let attempt = 1; attempt <= 3 && !saved; attempt++) {
      let page;
      try {
        process.stdout.write(`${label} ${item.name} (try ${attempt})… `);
        page = await context.newPage();
        await page.goto("https://gemini.google.com/app", {
          waitUntil: "domcontentloaded",
          timeout: 20000,
        });
        const box = promptBox(page);
        await box.waitFor({ state: "visible", timeout: 15000 });
        await box.click();
        await box.fill(item.prompt);
        await page.waitForTimeout(300);
        await page.getByRole("button", { name: /send message/i }).click();

        // Wait for the generated image to finish loading (up to 100s).
        await page.waitForFunction(
          () =>
            [...document.querySelectorAll("img")].some(
              (im) => im.naturalWidth >= 512,
            ),
          null,
          { timeout: 100000 },
        );
        await page.waitForTimeout(1500);

        const b64 = await page.evaluate(
          ({ max, q }) => {
            const imgs = [...document.querySelectorAll("img")].filter(
              (im) => im.naturalWidth >= 512,
            );
            const img = imgs[imgs.length - 1];
            if (!img) return null;
            let w = img.naturalWidth,
              h = img.naturalHeight;
            if (Math.max(w, h) > max) {
              const s = max / Math.max(w, h);
              w = Math.round(w * s);
              h = Math.round(h * s);
            }
            const c = document.createElement("canvas");
            c.width = w;
            c.height = h;
            c.getContext("2d").drawImage(img, 0, 0, w, h);
            return c.toDataURL("image/jpeg", q).split(",")[1];
          },
          { max: MAX_PX, q: JPEG_Q },
        );
        if (!b64) throw new Error("no image data");

        const dest = path.join(OUT_DIR, `${item.slug}.jpg`);
        fs.writeFileSync(dest, Buffer.from(b64, "base64"));
        console.log(`OK ${Math.round(fs.statSync(dest).size / 1024)}KB`);
        ok++;
        saved = true;
      } catch (e) {
        console.log(`FAIL: ${String(e.message).slice(0, 80)}`);
        if (attempt < 3) await new Promise((r) => setTimeout(r, 3000));
      } finally {
        if (page) await page.close().catch(() => {});
      }
    }
    if (!saved) fail++;
    if (i < pending.length - 1) await new Promise((r) => setTimeout(r, 1500));
  }

  await browser.close();
  try {
    process.kill(-chromeProc.pid);
  } catch {}
  console.log(`\n${"=".repeat(48)}`);
  console.log(`Done: ${ok} generated, ${fail} failed, ${done} pre-existing.`);
  console.log(`${"=".repeat(48)}\n`);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
