const fs = require("fs");
const path = require("path");

const file = process.argv[2];
const data = JSON.parse(fs.readFileSync(file, "utf8"));

function font(value) {
  return String(value || "").split(",")[0].replace(/"/g, "");
}

const lines = [];
lines.push("# " + path.basename(file));
lines.push("scroll " + data.scrollHeight + " width " + data.innerWidth);
lines.push("body " + JSON.stringify(data.body));
lines.push("");
lines.push("## Named layout");
for (const node of data.named) {
  if (node.rect.w < 20 && node.rect.h < 20) continue;
  lines.push(
    [
      node.name,
      node.rect.x + "," + node.rect.y,
      node.rect.w + "x" + node.rect.h,
      (node.text || "").replace(/\s+/g, " ").slice(0, 70),
      node.styles.backgroundColor || "",
      node.styles.borderRadius || "",
      node.styles.position || "",
      node.styles.opacity || "",
    ].join(" | ")
  );
}
lines.push("");
lines.push("## Text");
const seen = new Set();
for (const node of data.textNodes) {
  if (!["H1", "H2", "H3", "H4", "H5", "P", "A", "BUTTON", "LABEL"].includes(node.tag)) continue;
  if (node.text.length < 2 || node.rect.h > 900) continue;
  const key = node.tag + node.text.slice(0, 80) + node.rect.y;
  if (seen.has(key)) continue;
  seen.add(key);
  const style = node.styles;
  lines.push(
    [
      node.tag,
      node.text.replace(/\s+/g, " ").slice(0, 90),
      node.rect.x + "," + node.rect.y,
      node.rect.w + "x" + node.rect.h,
      font(style.fontFamily),
      style.fontSize,
      style.fontWeight,
      style.lineHeight || "",
      style.letterSpacing || "",
      style.color,
      style.backgroundColor,
      style.borderRadius || "",
      "op:" + style.opacity,
    ].join(" | ")
  );
}
lines.push("");
lines.push("## Images");
for (const image of data.images) {
  lines.push(
    [
      image.tag,
      image.rect.x + "," + image.rect.y,
      image.rect.w + "x" + image.rect.h,
      image.alt || "",
      (image.src || image.poster || "").slice(0, 180),
    ].join(" | ")
  );
}
lines.push("");
lines.push("## Backgrounds");
for (const bg of data.backgrounds) {
  lines.push([bg.name, bg.rect.x + "," + bg.rect.y, bg.rect.w + "x" + bg.rect.h, bg.bg.slice(0, 220)].join(" | "));
}

const out = file.replace(/\.json$/, ".summary.txt");
fs.writeFileSync(out, lines.join("\n"));
console.log("wrote", out, "lines", lines.length);
