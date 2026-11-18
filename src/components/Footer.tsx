import { Link } from "react-router-dom";
import { navLinks } from "../data/site";
import { RevealText } from "./Reveal";

export function Footer() {
  return (
    <footer className="bg-ink text-cream">
      <div className="shell grid gap-12 py-16 md:grid-cols-[340px_1fr] md:py-20 xl:py-[120px]">
        <h2 className="max-w-[340px] text-[48px] font-semibold leading-none tracking-display md:text-[58px] xl:text-[68px]">
          <RevealText text="Scaling Start-ups for Growth." />
        </h2>
        <div className="grid gap-10 md:grid-cols-2 md:justify-items-start xl:justify-items-end">
          <div>
            <h4 className="text-[26px] font-medium leading-[1.2] text-cream">
              <RevealText text="/Quick links" />
            </h4>
            <div className="mt-4 flex max-w-[300px] flex-wrap gap-2.5">
              {navLinks.map((link) => (
                <Link key={link.label} to={link.to} className="rounded-lg bg-cream px-4 py-2 text-[16px] font-medium tracking-display text-ink">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-[26px] font-medium leading-[1.2] text-cream">
              <RevealText text="/Contact" />
            </h4>
            <a href="mailto:mejed@templyo.io" className="copy mt-4 block text-cream">
              Mejed@Templyo.io
            </a>
          </div>
        </div>
      </div>
      <p className="overflow-hidden px-3 pb-2 text-center font-bold leading-[0.9] tracking-display text-cream/10 text-[29vw] xl:text-[417px]">
        MAJD
      </p>
    </footer>
  );
}
