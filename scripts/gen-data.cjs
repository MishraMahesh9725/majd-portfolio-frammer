const fs = require("fs");
const path = require("path");
const copy = require("../reference/copy.json");

function imagesOf(file) {
  const data = JSON.parse(fs.readFileSync(path.join("reference/data", file), "utf8"));
  const urls = [];
  for (const image of data.images) {
    const src = image.src || "";
    const match = src.match(/framerusercontent\.com\/images\/([^?]+)/);
    if (!match) continue;
    if (urls.includes(match[1])) continue;
    urls.push(match[1]);
  }
  const links = data.links
    .map((link) => link.href)
    .filter((href) => href && !href.includes("majd-portfolio.framer.website") && !href.startsWith("mailto"));
  return { urls, links: [...new Set(links)] };
}

function blocks(key) {
  return (copy[key] || []).filter((block) => block.y < 5000 || block.tag !== "H3");
}

const projects = ["damas", "najm", "kavi", "sham", "aiwings", "abjad", "fasselh"].map((slug) => {
  const info = imagesOf(`work__${slug}-1440.json`);
  const content = copy[`work__${slug}`];
  return {
    slug,
    images: info.urls,
    links: info.links,
    blocks: content.filter((block) => !["More Projects", "Category", "Year", "Live Link"].includes(block.text) && block.tag !== "H3"),
  };
});

const posts = [
  "how-can-designers-prepare-for-the-future",
  "why-every-business-needs-a-professional-website-in-2025",
  "how-creative-teams-build-strong-brand-systems",
  "the-rise-of-modern-tech-startup-websites",
  "top-web-design-trends-to-watch-in-2025",
  "designing-products-with-purpose",
  "starting-and-growing-a-career-in-web-design",
].map((slug) => {
  const info = imagesOf(`blog__${slug}-1440.json`);
  return {
    slug,
    images: info.urls,
    blocks: copy[`blog__${slug}`].filter((block) => block.text !== "More Articles" && block.tag !== "H3"),
  };
});

fs.mkdirSync("src/data", { recursive: true });
fs.writeFileSync("reference/generated-content.json", JSON.stringify({ projects, posts }, null, 2));
console.log("projects", projects.map((p) => p.slug + " imgs " + p.images.length + " links " + p.links.join(" | ")).join("\n"));
console.log("--- posts");
for (const post of posts) {
  console.log(post.slug, post.images[0], post.blocks[0] && post.blocks[0].text, "blocks", post.blocks.length);
}
