const fs = require("fs");
const { PNG } = require("pngjs");
const pixelmatch = require("pixelmatch").default || require("pixelmatch");

const a = PNG.sync.read(fs.readFileSync("reference/slices/orig-hero.png"));
const b = PNG.sync.read(fs.readFileSync("reference/clone/check-hero.png"));
const diff = new PNG({ width: a.width, height: a.height });
const count = pixelmatch(a.data, b.data, diff.data, a.width, a.height, { threshold: 0.2 });
fs.writeFileSync("reference/clone/hero-diff.png", PNG.sync.write(diff));
console.log("mismatch", count, "of", a.width * a.height, ((100 * count) / (a.width * a.height)).toFixed(2) + "%");
