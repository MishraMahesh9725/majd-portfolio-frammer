import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { quote } from "../data/site";

export function TextReveal() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const words = quote.split(" ");

  return (
    <section ref={ref} className="relative h-[150vh]" aria-label="Statement">
      <div className="sticky top-0 flex h-screen items-center">
        <p className="shell text-center text-[28px] font-medium leading-[1.2] tracking-display md:text-[36px]">
          {words.map((word, index) => (
            <Word key={`${word}-${index}`} index={index} total={words.length} progress={scrollYProgress}>
              {word}
            </Word>
          ))}
        </p>
      </div>
    </section>
  );
}

function Word({
  children,
  index,
  total,
  progress,
}: {
  children: string;
  index: number;
  total: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const start = index / total;
  const end = start + 1 / total;
  const color = useTransform(progress, [start, end], ["rgba(0,0,0,0.1)", "#111111"]);
  return (
    <motion.span style={{ color }} className="mr-[0.28em] inline-block">
      {children}
    </motion.span>
  );
}
