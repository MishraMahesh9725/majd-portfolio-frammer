const fs = require("fs");
const path = require("path");
const dir = "reference/data";
const files = fs.readdirSync(dir).filter((name) => name.endsWith("-1440.json") && name !== "home-1440.json");
const out = {};
for (const file of files) {
  const data = JSON.parse(fs.readFileSync(path.join(dir, file), "utf8"));
  const blocks = [];
  for (const node of data.textNodes) {
    if (!["H1", "H2", "H3", "P"].includes(node.tag)) continue;
    if (node.rect.h > 500) continue;
    const text = node.text.replace(/\s+/g, " ").trim();
    if (text.length < 2) continue;
    if (/^(U s e|M o r e|Majd|H o m e|A b o u t|S e r v i c e|W o r k s|C o n t a c t|Mejed|MAJD|Scaling|Create a free)/.test(text)) continue;
    blocks.push({ tag: node.tag, text, y: node.rect.y });
  }
  blocks.sort((a, b) => a.y - b.y);
  const unique = [];
  for (const block of blocks) {
    const prev = unique[unique.length - 1];
    if (prev && prev.text === block.text) continue;
    unique.push(block);
  }
  out[file.replace("-1440.json", "")] = unique;
}
fs.writeFileSync("reference/copy.json", JSON.stringify(out, null, 2));
console.log(Object.keys(out).join("\n"));
