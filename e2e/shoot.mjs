// Screenshots of every section at desktop and phone size. Usage: node e2e/shoot.mjs [baseUrl]
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const base = process.argv[2] ?? "http://localhost:3003";
const out = process.env.OUT ?? "e2e/shots";
mkdirSync(out, { recursive: true });
const browser = await chromium.launch({
  args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"],
});

async function run(name, opts, stops) {
  const ctx = await browser.newContext(opts);
  if (process.env.THEME) await ctx.addInitScript((t) => localStorage.setItem("king-theme", t), process.env.THEME);
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  await page.goto(base, { waitUntil: "networkidle" });
  await page.waitForTimeout(3200);
  for (const [label, sel, extra = 0, wait = 1400] of stops) {
    await page.evaluate(
      ([s, e]) => {
        const el = /^\d+$/.test(s) ? null : document.querySelector(s);
        const y = el ? el.getBoundingClientRect().top + window.scrollY + e : Number(s) + e;
        window.scrollTo(0, y);
      },
      [sel, extra],
    );
    await page.waitForTimeout(wait);
    await page.screenshot({ path: `${out}/${process.env.THEME ?? "dark"}-${name}-${label}.png` });
  }
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  console.log(name, "overflow:", overflow, "errors:", errors.length ? errors : "none");
  await ctx.close();
}

const stops = [
  ["01-hero", "0"],
  ["02-hero-scrolled", "0", 300],
  ["03-tagline", "section[aria-label='About Taylor King']", 120],
  ["04-record", "#record"],
  ["05-record-b", "#record", 700],
  ["06-record-c", "#record", 1300],
  ["07-ring-0", "#process", 10],
  ["08-ring-2", "#process", 1500],
  ["09-ring-4", "#process", 3200],
  ["10-reviews", "#reviews"],
  ["11-reviews-b", "#reviews", 800],
  ["12-rail-0", "section[aria-labelledby='rail-title']", 0],
  ["13-rail-mid", "section[aria-labelledby='rail-title']", 900],
  ["14-rail-end", "section[aria-labelledby='rail-title']", 1700],
  ["15-faq", "#faq"],
  ["16-consult", "#consult"],
  ["17-consult-b", "#consult", 500],
  ["18-footer", "footer"],
];
const which = process.env.ONLY ?? "both";
if (which !== "phone") await run("desktop", { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 }, stops);
if (which !== "desktop")
  await run("phone", { viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true }, stops);
await browser.close();
