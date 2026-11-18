import { testimonials } from "../data/site";
import { RevealText } from "./Reveal";

export function Testimonials() {
  return (
    <section className="shell py-16 xl:py-8">
      <h2 className="h-section mb-14">
        <RevealText text="Testimonials" />
      </h2>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {testimonials.map((item) => (
          <article key={item.name} className="group relative h-[340px] [perspective:1000px]">
            <div className="relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
              <div className="absolute inset-0 grid place-items-center rounded-[20px] bg-ink [backface-visibility:hidden]">
                <img src={item.logo} alt="" className="h-[60px] w-[60px] object-contain" />
              </div>
              <div className="absolute inset-0 flex flex-col justify-between rounded-[20px] bg-ink p-5 text-cream [backface-visibility:hidden] [transform:rotateY(180deg)]">
                <p className="copy">{item.quote}</p>
                <div className="flex items-center gap-3">
                  <img src={item.avatar} alt="" className="h-[50px] w-[50px] rounded-full object-cover" />
                  <div>
                    <p className="meta">{item.name}</p>
                    <p className="meta font-light opacity-80">{item.role}</p>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
