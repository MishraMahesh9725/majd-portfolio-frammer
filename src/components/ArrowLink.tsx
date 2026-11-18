import type { ReactNode } from "react";
import { Link } from "react-router-dom";

function Arrow({ light = false }: { light?: boolean }) {
  return (
    <span
      className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg border transition duration-300 group-hover:bg-ink group-hover:text-cream ${
        light ? "border-cream/40 text-cream group-hover:bg-cream group-hover:text-ink" : "border-ink/15 text-ink"
      }`}
    >
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
        <path d="M2.2 9.8 9.6 2.4M4.2 2.2H9.8V7.8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export function ArrowLink({
  href,
  children,
  light = false,
}: {
  href: string;
  children: ReactNode;
  light?: boolean;
}) {
  const className = `group inline-flex items-center gap-2.5 copy ${light ? "text-cream" : "text-ink"}`;
  const inner = (
    <>
      <span>{children}</span>
      <Arrow light={light} />
    </>
  );
  if (href.startsWith("/")) {
    return (
      <Link to={href} className={className}>
        {inner}
      </Link>
    );
  }
  return (
    <a className={className} href={href} target="_blank" rel="noreferrer">
      {inner}
    </a>
  );
}
