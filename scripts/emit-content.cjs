const fs = require("fs");
const copy = JSON.parse(fs.readFileSync("reference/copy.json", "utf8"));
let full = {};
if (fs.existsSync("reference/fulltext.json")) {
  full = JSON.parse(fs.readFileSync("reference/fulltext.json", "utf8"));
}

const cardMeta = {
  damas: { subtitle: "Agency Framer Template", featured: true },
  najm: { subtitle: "SaaS Framer Template", featured: true },
  kavi: { subtitle: "AI Framer Template", featured: true },
  sham: { subtitle: "Studio Framer Template", featured: true },
  aiwings: { subtitle: "Generate Images & Videos in Your AI Agent", featured: false },
  abjad: { subtitle: "AI Framer Template", featured: false },
  fasselh: { subtitle: "Environmental Framer Template", featured: false },
};

const generated = JSON.parse(fs.readFileSync("reference/generated-content.json", "utf8"));

function cleanBlocks(blocks) {
  return blocks.filter((block) => {
    const text = block.text.trim();
    if (!text) return false;
    if (/^(Category|Year|Live Link|More Projects|More Articles|S u b m i t|Be the first|U s e|M o r e|H o m e|A b o u t|S e r v i c e|W o r k s|C o n t a c t|MAJD|Create a free)/.test(text)) return false;
    if (/^[A-Za-z]( [A-Za-z]){2,}$/.test(text)) return false;
    return true;
  });
}

function expand(blocks, fullBlocks) {
  if (!fullBlocks) return blocks;
  return blocks.map((block) => {
    if (block.tag !== "P" || block.text.length < 240) return block;
    const start = block.text.slice(0, 48);
    const match = fullBlocks.find((item) => item.tag === "P" && item.text.startsWith(start) && item.text.length > block.text.length);
    return match ? { ...block, text: match.text } : block;
  });
}

function sectionsFrom(blocks) {
  const sections = [];
  let current = null;
  for (const block of blocks) {
    if (block.tag === "H2") {
      current = { heading: block.text, paragraphs: [], list: [] };
      sections.push(current);
      continue;
    }
    if (!current || block.tag === "H1" || block.tag === "H3") continue;
    const text = block.text.trim();
    if (/Framer Template$|Generate Images|Environmental Framer|Create a free website/.test(text)) continue;
    const isItem = text.length < 96 && !/[.!?…”"]$/.test(text);
    if (isItem) current.list.push(text);
    else current.paragraphs.push(text);
  }
  return sections;
}

const projects = generated.projects.map((project) => {
  const blocks = expand(cleanBlocks(copy["work__" + project.slug] || project.blocks), full["/work/" + project.slug]);
  const title = (blocks.find((block) => block.tag === "H1") || {}).text || project.slug;
  const summary = (blocks.find((block) => block.tag === "P") || {}).text || "";
  const category = (blocks.find((block) => /Template|^AI$/.test(block.text)) || {}).text || "Free Framer Template";
  const year = (blocks.find((block) => /^20\d\d$/.test(block.text)) || {}).text || "2025";
  const live = project.links.find((href) => !/framer\.link\/(bsFvFjY|5Wi1vkP)/.test(href) && !href.endsWith("framer.com/")) || "https://www.framer.com";
  const images = project.images;
  return {
    slug: project.slug,
    title,
    subtitle: cardMeta[project.slug].subtitle,
    featured: cardMeta[project.slug].featured,
    category,
    year,
    summary,
    live,
    cover: "/assets/" + images[0],
    gallery: images.slice(1, Math.max(1, images.length - 2)).map((name) => "/assets/" + name),
    sections: sectionsFrom(blocks.filter((block) => block.tag === "H2" || (block.tag === "P" && block.text !== summary && block.text !== category && block.text !== year))),
  };
});

const postOrder = generated.posts.map((post) => post.slug);
const excerpts = {
  "how-can-designers-prepare-for-the-future": "How thoughtful visual choices create a stronger sense of reliability for modern brands.",
  "why-every-business-needs-a-professional-website-in-2025": "Why visual direction helps brands create emotion and a distinct point of view.",
  "how-creative-teams-build-strong-brand-systems": "A look at the workflows that keep branding consistent across every touchpoint.",
  "the-rise-of-modern-tech-startup-websites": "Why tech startups need clear, high trust digital experiences to communicate and attract users.",
  "top-web-design-trends-to-watch-in-2025": "Stay ahead of the curve with these key design trends shaping the future of the web.",
  "designing-products-with-purpose": "How mission-led design turns digital products into richer, more meaningful experiences.",
  "starting-and-growing-a-career-in-web-design": "Web design blends creativity and tech, offering strong demand and roles in design.",
};

const posts = generated.posts.map((post) => {
  const blocks = expand(cleanBlocks(copy["blog__" + post.slug] || []), full["/blog/" + post.slug]);
  const title = (blocks.find((block) => block.tag === "H1") || {}).text || post.slug;
  const paragraphs = blocks.filter((block) => block.tag === "P");
  const summary = (paragraphs[0] || {}).text || excerpts[post.slug];
  const date = (paragraphs.find((block) => /^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)/.test(block.text)) || {}).text || "";
  const read = (paragraphs.find((block) => /min read/.test(block.text)) || {}).text || "";
  return {
    slug: post.slug,
    title,
    excerpt: excerpts[post.slug] || summary,
    summary,
    date,
    read,
    image: "/assets/" + post.images[0],
    sections: sectionsFrom(blocks.filter((block) => block.text !== summary && block.text !== date && block.text !== read)),
  };
});

fs.mkdirSync("src/data", { recursive: true });
fs.writeFileSync("src/data/content.json", JSON.stringify({ projects, posts: posts.sort((a, b) => postOrder.indexOf(a.slug) - postOrder.indexOf(b.slug)) }, null, 2));
console.log("wrote content", projects.length, posts.length, "fulltext", Object.keys(full).length);
