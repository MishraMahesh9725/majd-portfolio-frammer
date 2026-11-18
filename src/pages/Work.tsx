import { projects } from "../data/site";
import { ProjectCard } from "../components/ProjectCard";
import { RevealText } from "../components/Reveal";

export function WorkPage() {
  return (
    <section id="hero-section" className="shell pb-24 pt-40">
      <h1 className="h-page max-w-[620px]">
        <RevealText text="My Brightest Creations" />
      </h1>
      <p className="copy mt-4 max-w-[460px]">
        A showcase of my latest projects, highlighting thoughtful design, clear strategy, and impactful results.
      </p>
      <div className="mt-14 grid gap-5 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
