import { Link } from "react-router-dom";
import type { Project } from "../data/site";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link to={`/work/${project.slug}#work-section`} className="group block">
      <div className="overflow-hidden rounded-[20px]">
        <img
          src={project.cover}
          alt={`${project.title} preview`}
          loading="lazy"
          className="aspect-[580/400] w-full object-cover transition duration-700 group-hover:scale-[1.04]"
        />
      </div>
      <h3 className="h-card mt-2.5">{project.title}</h3>
      <p className="meta mt-0.5 text-ink">{project.subtitle}</p>
    </Link>
  );
}
