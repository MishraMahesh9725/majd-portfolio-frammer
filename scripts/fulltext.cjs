const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const BASE = "https://majd-portfolio.framer.website";
const paths = [
  "/work/damas",
  "/work/najm",
  "/work/kavi",
  "/work/sham",
  "/work/aiwings",
  "/work/abjad",
  "/work/fasselh",
  "/blog/how-can-designers-prepare-for-the-future",
  "/blog/why-every-business-needs-a-professional-website-in-2025",
  "/blog/how-creative-teams-build-strong-brand-systems",
  "/blog/the-rise-of-modern-tech-startup-websites",
  "/blog/top-web-design-trends-to-watch-in-2025",
  "/blog/designing-products-with-purpose",
  "/blog/starting-and-growing-a-career-in-web-design",
];

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const out = {};
  for (const urlPath of paths) {
    await page.goto(BASE + urlPath, { waitUntil: "domcontentloaded", timeout: 60000 });
    await page.waitForTimeout(1500);
    out[urlPath] = await page.evaluate(() => {
      const nodes = [...document.querySelectorAll("h1,h2,h3,p,li")];
      return nodes
        .map((el) => ({
          tag: el.tagName,
          text: (el.innerText || "").replace(/\s+/g, " ").trim(),
          y: Math.round(el.getBoundingClientRect().top + window.scrollY),
        }))
        .filter((item) => item.text && item.text.length > 1 && item.y < 8000)
        .filter((item) => !/Use for Free|More Templates|Made in Framer|Scaling Start|Quick links|Mejed@|Join the newsletter|Be the first to read|Submit/i.test(item.text));
    });
    console.log(urlPath, out[urlPath].length);
  }
  fs.writeFileSync(path.join("reference", "fulltext.json"), JSON.stringify(out, null, 2));
  await browser.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
