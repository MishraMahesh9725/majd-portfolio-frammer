const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const BASE = "https://majd-portfolio.framer.website";
const ROOT = path.resolve(__dirname, "..");
const REF = path.join(ROOT, "reference");
const SHOTS = path.join(REF, "screenshots");
const DATA = path.join(REF, "data");
const ASSETS = path.join(ROOT, "public", "assets");

const WIDTHS = [
  { name: "1440", width: 1440, height: 900 },
  { name: "1024", width: 1024, height: 900 },
  { name: "768", width: 768, height: 900 },
  { name: "390", width: 390, height: 844 },
];

const STYLE_PROPS = [
  "fontFamily",
  "fontSize",
  "fontWeight",
  "fontStyle",
  "lineHeight",
  "letterSpacing",
  "color",
  "backgroundColor",
  "backgroundImage",
  "borderRadius",
  "paddingTop",
  "paddingRight",
  "paddingBottom",
  "paddingLeft",
  "marginTop",
  "marginRight",
  "marginBottom",
  "marginLeft",
  "columnGap",
  "rowGap",
  "gap",
  "boxShadow",
  "textTransform",
  "textAlign",
  "textDecoration",
  "width",
  "height",
  "maxWidth",
  "minHeight",
  "display",
  "position",
  "top",
  "right",
  "bottom",
  "left",
  "opacity",
  "transform",
  "filter",
  "mixBlendMode",
  "overflow",
  "zIndex",
  "borderTopWidth",
  "borderTopStyle",
  "borderTopColor",
  "borderRightWidth",
  "borderBottomWidth",
  "borderLeftWidth",
  "objectFit",
  "objectPosition",
  "whiteSpace",
  "cursor",
  "transition",
  "animation",
  "backdropFilter",
  "justifyContent",
  "alignItems",
  "flexDirection",
];

function ensureDirs() {
  for (const dir of [REF, SHOTS, DATA, ASSETS]) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function slugify(urlPath) {
  if (!urlPath || urlPath === "/") return "home";
  return urlPath.replace(/^\//, "").replace(/[^\w/-]+/g, "").replace(/\//g, "__");
}

async function extractPage(page) {
  return page.evaluate((styleProps) => {
    function rectOf(el) {
      const r = el.getBoundingClientRect();
      return {
        x: Math.round(r.x),
        y: Math.round(r.y + window.scrollY),
        w: Math.round(r.width),
        h: Math.round(r.height),
      };
    }

    function stylesOf(el) {
      const cs = getComputedStyle(el);
      const out = {};
      for (const prop of styleProps) {
        const value = cs[prop];
        if (value && value !== "none" && value !== "normal" && value !== "auto" && value !== "0px" && value !== "rgba(0, 0, 0, 0)" && value !== "static") {
          out[prop] = value;
        }
      }
      if (cs.backgroundColor) out.backgroundColor = cs.backgroundColor;
      if (cs.color) out.color = cs.color;
      if (cs.position) out.position = cs.position;
      if (cs.display) out.display = cs.display;
      if (cs.opacity) out.opacity = cs.opacity;
      if (cs.transform && cs.transform !== "none") out.transform = cs.transform;
      return out;
    }

    const named = [];
    document.querySelectorAll("[data-framer-name]").forEach((el) => {
      const rect = rectOf(el);
      if (rect.w < 1 && rect.h < 1) return;
      named.push({
        name: el.getAttribute("data-framer-name"),
        tag: el.tagName,
        id: el.id || "",
        text: (el.innerText || "").trim().replace(/\s+/g, " ").slice(0, 280),
        href: el.getAttribute("href") || el.querySelector("a")?.getAttribute("href") || "",
        rect,
        styles: stylesOf(el),
      });
    });

    const textNodes = [];
    document.querySelectorAll("h1,h2,h3,h4,h5,h6,p,a,button,label,input,textarea,li,span").forEach((el) => {
      const text = (el.innerText || el.getAttribute("placeholder") || el.getAttribute("aria-label") || "").trim().replace(/\s+/g, " ");
      if (!text) return;
      const rect = rectOf(el);
      if (rect.w < 1 && rect.h < 1) return;
      if (text.length > 400 && el.tagName === "SPAN") return;
      textNodes.push({
        tag: el.tagName,
        text: text.slice(0, 320),
        placeholder: el.getAttribute("placeholder") || "",
        href: el.getAttribute("href") || "",
        nameAttr: el.getAttribute("data-framer-name") || "",
        rect,
        styles: stylesOf(el),
      });
    });

    const images = [];
    document.querySelectorAll("img,video,source").forEach((el) => {
      const src = el.currentSrc || el.src || el.getAttribute("src") || "";
      const srcset = el.getAttribute("srcset") || "";
      const poster = el.getAttribute("poster") || "";
      images.push({
        tag: el.tagName,
        alt: el.getAttribute("alt") || "",
        src,
        srcset,
        poster,
        rect: rectOf(el),
        styles: stylesOf(el),
      });
    });

    const backgrounds = [];
    document.querySelectorAll("*").forEach((el) => {
      const bg = getComputedStyle(el).backgroundImage;
      if (!bg || bg === "none" || !bg.includes("url(")) return;
      const rect = rectOf(el);
      if (rect.w < 8 || rect.h < 8) return;
      backgrounds.push({
        name: el.getAttribute("data-framer-name") || "",
        tag: el.tagName,
        bg: bg.slice(0, 800),
        rect,
      });
    });

    const fonts = [];
    document.fonts.forEach((font) => {
      fonts.push({
        family: font.family,
        weight: font.weight,
        style: font.style,
        status: font.status,
      });
    });

    const cssVars = {};
    const root = getComputedStyle(document.documentElement);
    for (const sheet of [...document.styleSheets]) {
      let rules;
      try {
        rules = [...sheet.cssRules];
      } catch {
        continue;
      }
      for (const rule of rules) {
        if (!rule.style) continue;
        const selector = rule.selectorText || "";
        if (!/html|:root|body/.test(selector)) continue;
        for (const prop of rule.style) {
          if (prop.startsWith("--")) cssVars[prop] = root.getPropertyValue(prop).trim();
        }
      }
    }

    const links = [...document.querySelectorAll("a")].map((a) => ({
      text: (a.innerText || a.getAttribute("aria-label") || "").trim().replace(/\s+/g, " ").slice(0, 180),
      href: a.href,
    }));

    const meta = [...document.querySelectorAll("meta")].map((m) => ({
      name: m.getAttribute("name"),
      property: m.getAttribute("property"),
      content: m.getAttribute("content"),
    }));

    const linkTags = [...document.querySelectorAll("link")].map((l) => ({
      rel: l.rel,
      href: l.href,
      as: l.as || "",
    }));

    const body = getComputedStyle(document.body);
    return {
      title: document.title,
      description: document.querySelector('meta[name="description"]')?.content || "",
      meta,
      linkTags,
      body: {
        backgroundColor: body.backgroundColor,
        color: body.color,
        fontFamily: body.fontFamily,
        fontSize: body.fontSize,
      },
      scrollHeight: document.documentElement.scrollHeight,
      innerWidth: window.innerWidth,
      fonts,
      cssVars,
      links,
      images,
      backgrounds,
      named,
      textNodes,
    };
  }, STYLE_PROPS);
}

async function sampleMotion(page) {
  return page.evaluate(async () => {
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const interesting = [...document.querySelectorAll("[data-framer-name], h1, h2, p, a, button")].slice(0, 80);
    const before = interesting.map((el) => {
      const cs = getComputedStyle(el);
      return {
        name: el.getAttribute("data-framer-name") || el.tagName,
        text: (el.innerText || "").trim().slice(0, 60),
        opacity: cs.opacity,
        transform: cs.transform,
        color: cs.color,
        filter: cs.filter,
      };
    });
    await sleep(700);
    const after = interesting.map((el) => {
      const cs = getComputedStyle(el);
      return {
        opacity: cs.opacity,
        transform: cs.transform,
        color: cs.color,
        filter: cs.filter,
      };
    });
    const changes = [];
    before.forEach((item, index) => {
      const next = after[index];
      if (!next) return;
      if (item.opacity !== next.opacity || item.transform !== next.transform || item.color !== next.color || item.filter !== next.filter) {
        changes.push({ ...item, after: next });
      }
    });

    const animated = [];
    document.querySelectorAll("*").forEach((el) => {
      const cs = getComputedStyle(el);
      const animation = cs.animation;
      const transition = cs.transition;
      if ((animation && animation !== "none") || (transition && transition !== "all 0s ease 0s" && transition !== "none")) {
        const name = el.getAttribute("data-framer-name");
        const text = (el.innerText || "").trim().slice(0, 40);
        if (!name && !text) return;
        animated.push({
          name: name || "",
          tag: el.tagName,
          text,
          animation,
          transition,
        });
      }
    });
    return { changes: changes.slice(0, 60), animated: animated.slice(0, 80) };
  });
}

async function hoverScan(page) {
  const targets = await page.evaluate(() => {
    const items = [];
    document.querySelectorAll("a, button").forEach((el, index) => {
      const r = el.getBoundingClientRect();
      if (r.width < 8 || r.height < 8 || r.bottom < 0 || r.top > window.innerHeight) return;
      const text = (el.innerText || el.getAttribute("aria-label") || "").trim().replace(/\s+/g, " ").slice(0, 80);
      items.push({ index, text, x: r.x + r.width / 2, y: r.y + r.height / 2 });
    });
    return items.slice(0, 25);
  });

  const results = [];
  for (const target of targets) {
    const before = await page.evaluate((index) => {
      const el = document.querySelectorAll("a, button")[index];
      if (!el) return null;
      const cs = getComputedStyle(el);
      return {
        color: cs.color,
        backgroundColor: cs.backgroundColor,
        transform: cs.transform,
        opacity: cs.opacity,
        boxShadow: cs.boxShadow,
      };
    }, target.index);
    await page.mouse.move(target.x, target.y);
    await page.waitForTimeout(350);
    const after = await page.evaluate((index) => {
      const el = document.querySelectorAll("a, button")[index];
      if (!el) return null;
      const cs = getComputedStyle(el);
      return {
        color: cs.color,
        backgroundColor: cs.backgroundColor,
        transform: cs.transform,
        opacity: cs.opacity,
        boxShadow: cs.boxShadow,
      };
    }, target.index);
    if (before && after && JSON.stringify(before) !== JSON.stringify(after)) {
      results.push({ text: target.text, before, after });
    }
  }
  await page.mouse.move(0, 0);
  return results;
}

async function navScrollProbe(page) {
  const points = [0, 120, 400, 900, 1600];
  const samples = [];
  for (const y of points) {
    await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y);
    await page.waitForTimeout(450);
    const sample = await page.evaluate(() => {
      const logo = [...document.querySelectorAll("a")].find((a) => (a.innerText || "").trim() === "Majd");
      const nav = logo ? logo.closest("nav") || logo.parentElement?.parentElement : null;
      const target = nav || logo;
      if (!target) return { scrollY: window.scrollY };
      const cs = getComputedStyle(target);
      const r = target.getBoundingClientRect();
      return {
        scrollY: window.scrollY,
        tag: target.tagName,
        name: target.getAttribute("data-framer-name") || "",
        top: Math.round(r.top),
        height: Math.round(r.height),
        opacity: cs.opacity,
        transform: cs.transform,
        position: cs.position,
        backgroundColor: cs.backgroundColor,
      };
    });
    samples.push(sample);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  return samples;
}

function collectAssetUrls(payload) {
  const urls = new Set();
  const add = (value) => {
    if (!value) return;
    const matches = String(value).match(/https?:\/\/[^"')\s]+/g) || [];
    for (const match of matches) {
      const clean = match.replace(/\\+$/, "");
      if (/framerusercontent\.com|fonts\.gstatic\.com|fonts\.googleapis\.com/.test(clean)) {
        urls.add(clean.split("&")[0]);
      }
    }
  };
  for (const image of payload.images || []) {
    add(image.src);
    add(image.srcset);
    add(image.poster);
  }
  for (const bg of payload.backgrounds || []) add(bg.bg);
  for (const link of payload.linkTags || []) add(link.href);
  return [...urls];
}

async function downloadAssets(urls) {
  const saved = [];
  const used = new Set(fs.readdirSync(ASSETS));
  for (const url of urls) {
    try {
      const parsed = new URL(url);
      if (!/framerusercontent\.com/.test(parsed.hostname)) continue;
      let name = decodeURIComponent(path.basename(parsed.pathname));
      name = name.replace(/[^a-zA-Z0-9._-]/g, "_");
      if (!name || name.length > 120) name = `asset_${saved.length}`;
      if (used.has(name)) {
        const ext = path.extname(name);
        const base = path.basename(name, ext);
        name = `${base}_${saved.length}${ext}`;
      }
      const dest = path.join(ASSETS, name);
      if (!fs.existsSync(dest)) {
        const response = await fetch(url);
        if (!response.ok) {
          saved.push({ url, error: response.status });
          continue;
        }
        const buffer = Buffer.from(await response.arrayBuffer());
        fs.writeFileSync(dest, buffer);
      }
      used.add(name);
      saved.push({ url, file: name });
    } catch (error) {
      saved.push({ url, error: String(error.message || error) });
    }
  }
  return saved;
}

async function discoverPaths(page) {
  await page.goto(BASE + "/", { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForTimeout(2500);
  const homeLinks = await page.evaluate(() => [...document.querySelectorAll("a")].map((a) => a.getAttribute("href") || ""));
  await page.goto(BASE + "/blog", { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForTimeout(2000);
  const blogLinks = await page.evaluate(() => [...document.querySelectorAll("a")].map((a) => a.getAttribute("href") || ""));
  await page.goto(BASE + "/work", { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForTimeout(2000);
  const workLinks = await page.evaluate(() => [...document.querySelectorAll("a")].map((a) => a.getAttribute("href") || ""));
  const all = [...homeLinks, ...blogLinks, ...workLinks];
  const paths = new Set(["/", "/work", "/work/damas", "/work/najm", "/work/kavi", "/work/sham", "/blog"]);
  for (const href of all) {
    if (!href) continue;
    try {
      const url = new URL(href, BASE);
      if (url.hostname !== "majd-portfolio.framer.website") continue;
      if (url.pathname.startsWith("/blog/") || url.pathname.startsWith("/work/")) paths.add(url.pathname);
    } catch {
      /* ignore */
    }
  }
  return [...paths];
}

async function main() {
  ensureDirs();
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  const page = await context.newPage();

  console.log("Discovering paths...");
  const paths = await discoverPaths(page);
  fs.writeFileSync(path.join(REF, "paths.json"), JSON.stringify(paths, null, 2));
  console.log(paths.join("\n"));

  const assetUrls = new Set();
  const interactions = {};

  for (const urlPath of paths) {
    const slug = slugify(urlPath);
    console.log("PAGE", urlPath);
    for (const size of WIDTHS) {
      await page.setViewportSize({ width: size.width, height: size.height });
      await page.goto(BASE + urlPath, { waitUntil: "domcontentloaded", timeout: 60000 });
      await page.evaluate(() => document.fonts && document.fonts.ready);
      await page.waitForTimeout(2800);
      const shot = path.join(SHOTS, `${slug}-${size.name}.png`);
      await page.screenshot({ path: shot, fullPage: true });
      const payload = await extractPage(page);
      fs.writeFileSync(path.join(DATA, `${slug}-${size.name}.json`), JSON.stringify(payload, null, 2));
      for (const url of collectAssetUrls(payload)) assetUrls.add(url);
      console.log("  shot", size.name, "h", payload.scrollHeight, "named", payload.named.length);
    }

    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(BASE + urlPath, { waitUntil: "domcontentloaded", timeout: 60000 });
    await page.waitForTimeout(1200);
    const motion = await sampleMotion(page);
    const hovers = await hoverScan(page);
    const nav = urlPath === "/" ? await navScrollProbe(page) : [];
    interactions[urlPath] = { motion, hovers, nav };

    if (urlPath === "/") {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(BASE + "/", { waitUntil: "domcontentloaded", timeout: 60000 });
      await page.waitForTimeout(2000);
      const clicked = await page.evaluate(() => {
        const buttons = [...document.querySelectorAll("button, [role='button'], a")];
        const menu = buttons.find((el) => {
          const name = (el.getAttribute("aria-label") || el.getAttribute("data-framer-name") || el.innerText || "").toLowerCase();
          return /menu|open|nav/.test(name);
        });
        if (!menu) {
          return {
            candidates: buttons.slice(0, 20).map((el) => ({
              tag: el.tagName,
              text: (el.innerText || "").trim().slice(0, 40),
              aria: el.getAttribute("aria-label"),
              name: el.getAttribute("data-framer-name"),
            })),
          };
        }
        menu.click();
        return { opened: menu.getAttribute("data-framer-name") || menu.innerText };
      });
      await page.waitForTimeout(700);
      await page.screenshot({ path: path.join(SHOTS, "home-390-menu.png"), fullPage: false });
      interactions["/"].mobileMenu = clicked;
    }
  }

  fs.writeFileSync(path.join(REF, "interactions.json"), JSON.stringify(interactions, null, 2));
  console.log("Downloading", assetUrls.size, "asset urls");
  const saved = await downloadAssets([...assetUrls]);
  fs.writeFileSync(path.join(REF, "assets.json"), JSON.stringify(saved, null, 2));
  await browser.close();
  console.log("DONE");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
