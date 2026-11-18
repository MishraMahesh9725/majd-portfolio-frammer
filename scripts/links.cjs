const data = JSON.parse(require("fs").readFileSync(process.argv[2], "utf8"));
const links = new Map();
for (const link of data.links || []) {
  links.set(link.href + " :: " + link.text.slice(0, 80), link);
}
for (const value of links.values()) {
  console.log(value.text.replace(/\s+/g, " ").slice(0, 70).padEnd(72), value.href);
}
console.log("--- fonts in text ---");
const fonts = new Set();
for (const node of data.textNodes || []) {
  const family = String(node.styles.fontFamily || "");
  if (family && !family.startsWith("sans-serif")) fonts.add(family + " @ " + node.styles.fontSize + " " + node.text.slice(0, 30));
}
console.log([...fonts].slice(0, 40).join("\n"));
