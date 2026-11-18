const data = JSON.parse(require("fs").readFileSync("reference/data/home-1440.json", "utf8"));
const want = ["Scaling", "S", "MAJD", "From", "idea", "Home", "H"];
for (const node of data.textNodes) {
  if (node.tag !== "SPAN" && node.tag !== "P") continue;
  const text = node.text.trim();
  if (!["Scaling", "Start-ups", "for", "Growth.", "MAJD", "From", "idea", "launch.", "Home", "H", "o", "m", "e"].includes(text) && text.length > 12) continue;
  if (node.rect.y < 1700 && !["From", "idea", "launch."].includes(text)) continue;
  const style = node.styles;
  console.log(
    node.tag,
    JSON.stringify(text),
    "y=" + node.rect.y,
    style.fontSize,
    style.fontWeight,
    style.lineHeight || "",
    style.letterSpacing || "",
    style.color,
    "op=" + style.opacity,
    style.transform || ""
  );
}
