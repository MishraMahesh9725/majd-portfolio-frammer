import { useState } from "react";
import { services } from "../data/site";
import { RevealText } from "./Reveal";

export function Services() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="services" className="shell py-16 xl:py-24">
      <h2 className="h-section">
        <RevealText text="Services" />
      </h2>
      <div className="mt-14 flex flex-col gap-4" onMouseLeave={() => setActive(null)}>
        {services.map((service, index) => {
          const open = active === index;
          return (
            <button
              key={service.title}
              type="button"
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
              onClick={() => setActive(index)}
              className={`flex min-h-[120px] flex-col justify-center rounded-2xl px-0 text-left transition duration-300 md:flex-row md:items-center md:justify-between ${
                open ? "bg-white/70" : "bg-transparent"
              }`}
            >
              <h3 className="h-card">{service.title}</h3>
              <div className={`mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 md:mt-0 ${open ? "opacity-100" : "opacity-70"}`}>
                {service.items.map((item, itemIndex) => (
                  <span key={item} className="flex items-center gap-4">
                    <span className="copy text-ink/50">{item}</span>
                    {itemIndex < service.items.length - 1 && <span className="hidden h-1 w-1 rounded-full bg-ink/40 md:inline-block" />}
                  </span>
                ))}
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
