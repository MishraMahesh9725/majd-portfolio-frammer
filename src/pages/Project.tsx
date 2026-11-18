import { Link, Navigate, useParams } from "react-router-dom";
import { projects } from "../data/site";
import { ArrowLink } from "../components/ArrowLink";
import { ProjectCard } from "../components/ProjectCard";
import { RevealText } from "../components/Reveal";

export function ProjectPage() {
  const { slug } = useParams();
  const index = projects.findIndex((project) => project.slug === slug);
  const project = projects[index];
  if (!project) return <Navigate to="/work" replace />;
  const more = [projects[(index + 1) % projects.length], projects[(index + 2) % projects.length]];

  return (
    <article id="work-section" className="shell-wide pb-20 pt-40">
      <p className="meta text-ink/50">
        <Link to="/work#hero-section">Work</Link> / {project.title}
      </p>
      <h1 className="h-page mt-4 max-w-[780px]">{project.title}</h1>
      <div className="mt-10 grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-end">
        <div className="flex flex-wrap gap-8">
          <Meta label="Category" value={project.category} />
          <Meta label="Year" value={project.year} />
          <ArrowLink href={project.live}>Live Link</ArrowLink>
        </div>
        <p className="copy">{project.summary}</p>
      </div>
      <img src={project.cover} alt={`${project.title} cover`} className="mt-10 aspect-[1080/742] w-full rounded-[20px] object-cover" />
      <div className="mt-16 max-w-[740px] space-y-12">
        {project.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="h-article">
              <RevealText text={section.heading} />
            </h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="copy mt-5">
                {paragraph}
              </p>
            ))}
            {section.list.length > 0 && (
              <ul className="mt-4 list-disc space-y-1 pl-5">
                {section.list.map((item) => (
                  <li key={item} className="copy">
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>
      {project.gallery.length > 0 && (
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {project.gallery.slice(0, 2).map((src) => (
            <img key={src} src={src} alt="" loading="lazy" className="aspect-[520/390] w-full rounded-[20px] object-cover" />
          ))}
          {project.gallery[2] && (
            <img src={project.gallery[2]} alt="" loading="lazy" className="aspect-[1080/742] w-full rounded-[20px] object-cover md:col-span-2" />
          )}
        </div>
      )}
      <section className="mt-20">
        <h2 className="mb-8 text-[48px] font-semibold leading-none tracking-display md:text-[68px]">More Projects</h2>
        <div className="grid gap-5 md:grid-cols-2">
          {more.map((item) => (
            <ProjectCard key={item.slug} project={item} />
          ))}
        </div>
      </section>
    </article>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="meta text-ink/50">{label}</p>
      <p className="copy">{value}</p>
    </div>
  );
}
