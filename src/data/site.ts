import content from "./content.json";

export type Section = {
  heading: string;
  paragraphs: string[];
  list: string[];
};

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  featured: boolean;
  category: string;
  year: string;
  summary: string;
  live: string;
  cover: string;
  gallery: string[];
  sections: Section[];
};

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  summary: string;
  date: string;
  read: string;
  image: string;
  sections: Section[];
};

export const projects = content.projects as Project[];
export const posts = content.posts as Post[];

export const services = [
  { title: "Website Migration", items: ["Web Migration", "Optimization", "Framer Rebuild"] },
  { title: "Framer Templates", items: ["Startup", "Agency", "SaaS"] },
  { title: "Frontend Development", items: ["UI Dev", "Responsive Layouts", "Web Performance"] },
  { title: "Product Consulting", items: ["Product Direction", "Web Strategy", "Technical Guidance"] },
];

export const testimonials = [
  {
    quote:
      "Templyo completely changed how I approach building sites in Framer. The templates are not just beautiful, they’re actually structured in a way that makes scaling so much easier.",
    name: "Yakoub Kashmiri",
    role: "Marketing Director",
    avatar: "/assets/kAftuUN9iRKwIt9M6RqZo9NS314.jpg",
    logo: "/assets/MG7SSqT3AUbDDMeyGynYFWvAWI.png",
  },
  {
    quote:
      "I’ve tried dozens of Framer templates, but Templyo stands out. Everything feels intentional, from the layout to the smallest interactions.",
    name: "Daniel K.",
    role: "Indie Maker",
    avatar: "/assets/HqoHkPp6dpJFdgMqUKIaAXmy7o.jpg",
    logo: "/assets/yceQCLz3chOtgu2oZRjmfEKjY.png",
  },
  {
    quote:
      "Templyo saved me weeks of work. I was able to launch my landing page in a day, and it still looks fully custom.",
    name: "Mark M.",
    role: "Startup Founder",
    avatar: "/assets/Y9KmJAQ4w53hsc4jJojfokLZ7D8.jpg",
    logo: "/assets/gN85dqTeMmVvE57UMiHhgeL4P4.png",
  },
  {
    quote:
      "The quality is insane. Clean structure, smooth animations, and super easy to customize. It feels like a premium product from start to finish.",
    name: "Omar H.",
    role: "Frontend Developer",
    avatar: "/assets/HH8KrojyxZx6X20z1r13CSwiiWE.jpg",
    logo: "/assets/WsYTUG4cqmLIU4lwbMUQX7FdOY.png",
  },
];

export const quote =
  "From idea to launch. Clean, scalable digital products built to move fast, stay simple, and perform in real-world use, driven by clarity, structured systems, and intentional design.";

export const navLinks = [
  { label: "Home", to: "/#hero-section" },
  { label: "About Me", to: "/#bio-section" },
  { label: "Services", to: "/#services" },
  { label: "Works", to: "/work#hero-section" },
  { label: "Contact", to: "/#contact" },
];
