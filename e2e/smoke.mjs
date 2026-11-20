// Smoke test against a running build: node e2e/smoke.mjs [baseUrl]
import { chromium } from "playwright";
import assert from "node:assert/strict";

const base = process.argv[2] ?? "http://localhost:3003";
const browser = await chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
let failed = 0;
async function test(name, fn) {
  try {
    await fn();
    console.log("ok  ", name);
  } catch (e) {
    failed++;
    console.log("FAIL", name, "\n     ", e.message.split("\n")[0]);
  }
}

for (const [label, opts] of [
  ["desktop", { viewport: { width: 1440, height: 900 } }],
  ["phone", { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true }],
]) {
  const ctx = await browser.newContext(opts);
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  await page.goto(base, { waitUntil: "networkidle" });
  await page.waitForTimeout(2500);

  await test(`${label}: one h1 and the primary CTA`, async () => {
    assert.equal(await page.locator("h1").count(), 1);
    assert.ok(await page.getByRole("link", { name: /Book your free consultation/ }).first().isVisible());
  });

  await test(`${label}: no horizontal overflow`, async () => {
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth), 0);
  });

  await test(`${label}: every image loads`, async () => {
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 700) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 60));
      }
    });
    await page.waitForTimeout(1500);
    const broken = await page.evaluate(() =>
      [...document.images].filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.src),
    );
    assert.deepEqual(broken, []);
  });

  await test(`${label}: phone link and address are correct`, async () => {
    assert.ok((await page.locator('a[href="tel:+19124709324"]').count()) > 0);
    assert.ok((await page.content()).includes("100 Bull St, Suite 200"));
  });

  await test(`${label}: form shows errors, then sends`, async () => {
    await page.evaluate(() => document.getElementById("consult").scrollIntoView());
    await page.getByRole("button", { name: "Request my free consultation" }).click();
    await page.getByText("Tell us your name").waitFor();
    await page.fill("#c-name", "Test Person");
    await page.fill("#c-phone", "912 555 0142");
    await page.fill("#c-charge", "Test charge");
    await page.check("#c-ack");
    await page.getByRole("button", { name: "Request my free consultation" }).click();
    await page.getByText("Request received").waitFor({ timeout: 5000 });
  });

  if (label === "phone") {
    await test("phone: menu opens and closes", async () => {
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.getByRole("button", { name: "Open menu" }).click();
      await page.getByRole("dialog", { name: "Menu" }).waitFor();
      await page.getByRole("button", { name: "Close menu" }).click();
      await page.getByRole("dialog", { name: "Menu" }).waitFor({ state: "detached" });
    });
  }

  await test(`${label}: theme toggle switches to light and remembers it`, async () => {
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.getByRole("button", { name: "Switch to light mode" }).click();
    assert.equal(await page.evaluate(() => document.documentElement.dataset.theme), "light");
    await page.reload({ waitUntil: "networkidle" });
    assert.equal(await page.evaluate(() => document.documentElement.dataset.theme), "light");
    const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
    assert.equal(bg, "rgb(244, 241, 234)");
    await page.waitForTimeout(2200);
    await page.getByRole("button", { name: "Switch to dark mode" }).click();
    assert.equal(await page.evaluate(() => localStorage.getItem("king-theme")), "dark");
  });

  await test(`${label}: no console errors`, async () => assert.deepEqual(errors, []));
  await ctx.close();
}

const ctx = await browser.newContext();
const page = await ctx.newPage();
for (const path of ["/privacy", "/disclaimer"]) {
  await test(`${path} renders`, async () => {
    const r = await page.goto(base + path);
    assert.equal(r.status(), 200);
    assert.equal(await page.locator("h1").count(), 1);
  });
}
await test("unknown page returns 404", async () => {
  const r = await page.goto(base + "/nope");
  assert.equal(r.status(), 404);
  await page.getByText("This page was dismissed").waitFor();
});
await test("API rejects an invalid request", async () => {
  const r = await page.request.post(base + "/api/consult", { data: { name: "" } });
  assert.equal(r.status(), 422);
});
await browser.close();
console.log(failed ? `\n${failed} failed` : "\nall passed");
process.exit(failed ? 1 : 0);
