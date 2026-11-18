import { ArrowLink } from "./ArrowLink";
import { RevealText } from "./Reveal";

export function Bio() {
  return (
    <section id="bio-section" className="flex min-h-screen items-end">
      <div className="shell grid w-full gap-10 pb-16 pt-24 md:grid-cols-[300px_1fr_360px] md:pb-20 xl:pb-[120px]">
        <div>
          <h2 className="h-section">
            <RevealText text="Hey!" />
          </h2>
          <p className="copy-strong mt-16 max-w-[300px] md:mt-[260px]">
            <RevealText text="I’m Majd, a builder based in Syria, currently working on Templyo, a platform for high-quality Framer templates." />
          </p>
        </div>
        <div className="hidden md:block" />
        <div className="flex flex-col justify-end gap-5 md:min-h-[445px]">
          <p className="copy">
            I’m a software engineer and Framer creator with a strong focus on building modern, scalable, and conversion-driven web experiences.
          </p>
          <p className="copy">
            Over the years, I’ve created and shipped multiple SaaS products and Framer templates used by global customers, helping them launch faster.
          </p>
          <ArrowLink href="https://framer.link/nnhGcWR">Get Started</ArrowLink>
        </div>
      </div>
    </section>
  );
}
