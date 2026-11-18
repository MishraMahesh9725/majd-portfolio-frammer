const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const out = path.join("reference", "clone");
fs.mkdirSync(out, { recursive: true });

const pages = ["/", "/work", "/work/damas", "/blog", "/blog/how-can-designers-prepare-for-the-future"];
const widths = [1440, 1024, 768, 390];

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", (error) => errors.push(String(error)));
  for (const urlPath of pages) {
    for (const width of widths) {
      await page.setViewportSize({ width, height: width === 390 ? 844 : 900 });
      await page.goto("http://localhost:5173" + urlPath, { waitUntil: "networkidle", timeout: 60000 });
      await page.waitForTimeout(900);
      const name = (urlPath === "/" ? "home" : urlPath.replace(/\//g, "_").replace(/^_/, "")) + "-" + width + "-top.png";
      await page.screenshot({ path: path.join(out, name) });
    }
  }
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("http://localhost:5173/", { waitUntil: "networkidle" });
  await page.waitForTimeout(600);
  const steps = [900, 1800, 3200, 4200, 5300, 6000, 6700, 7400];
  for (const y of steps) {
    await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y);
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(out, `home-1440-y${y}.png`) });
  }
  fs.writeFileSync(path.join(out, "errors.json"), JSON.stringify(errors, null, 2));
  console.log("errors", errors.length);
  await browser.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
