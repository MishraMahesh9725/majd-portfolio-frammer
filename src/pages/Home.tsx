import { useRef } from "react";
import { posts, projects } from "../data/site";
import { ArrowLink } from "../components/ArrowLink";
import { Bio } from "../components/Bio";
import { BlogCard } from "../components/BlogCard";
import { ContactForm } from "../components/ContactForm";
import { Hero } from "../components/Hero";
import { ProjectCard } from "../components/ProjectCard";
import { RevealText } from "../components/Reveal";
import { Services } from "../components/Services";
import { Testimonials } from "../components/Testimonials";
import { TextReveal } from "../components/TextReveal";

export function HomePage() {
  const track = useRef<HTMLDivElement>(null);
  const featured = projects.filter((project) => project.featured);
  const preview = posts.slice(0, 3);

  return (
    <>
      <div ref={track} className="relative">
        <div className="pointer-events-none absolute inset-x-0 top-0 hidden h-full xl:block">
          <div className="sticky top-0 flex h-screen items-end justify-center pb-36">
            <span className="sr-only">Portrait stays in view while the introduction scrolls.</span>
          </div>
        </div>
        <Hero track={track} />
        <Bio />
      </div>
      <TextReveal />
      <Services />
      <section className="shell py-10 xl:py-16">
        <div className="mb-8 flex items-end justify-between gap-6">
          <h2 className="h-section max-w-[460px]">
            <RevealText text="Featured Projects" />
          </h2>
          <ArrowLink href="/work#hero-section">View All Work</ArrowLink>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
      <Testimonials />
      <section className="shell py-16">
        <h2 className="h-section mb-14">
          <RevealText text="Thoughts" />
        </h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {preview.map((post, index) => (
            <BlogCard key={post.slug} post={post} className={index === 2 ? "md:block xl:hidden" : ""} />
          ))}
          <article className="flex h-[460px] flex-col justify-between rounded-2xl bg-ink p-6 text-cream xl:col-start-3 xl:row-start-1">
            <p className="text-[32px] font-normal leading-[1.2] tracking-display md:text-[44px]">
              See how we shape brands with clarity and craft— explore our blog
            </p>
            <ArrowLink href="/blog#hero-section" light>
              View All
            </ArrowLink>
          </article>
        </div>
      </section>
      <ContactForm />
    </>
  );
}
