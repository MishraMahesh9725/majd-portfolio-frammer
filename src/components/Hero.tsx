import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef, type RefObject } from "react";

const portrait = "/assets/haSjyjpt7FyCjJUBvXtmzCMSEQg.png";

export function Hero({ track }: { track: RefObject<HTMLDivElement | null> }) {
  const local = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: track, offset: ["start start", "end end"] });
  const front = useTransform(scrollYProgress, [0.05, 0.45], [0, 1]);
  const rise = useTransform(scrollYProgress, [0, 0.4], [0, -30]);

  return (
    <section id="hero-section" ref={local} className="relative flex min-h-screen flex-col justify-center">
      <img
        src="/assets/OLDYsHB9RMavvQrkVRNy08ZXYE.png"
        alt=""
        className="pointer-events-none absolute left-[2%] top-[28%] w-[60px] md:left-[5%] md:top-[30%] md:w-[124px] xl:left-[114px] xl:top-[233px] xl:w-[140px]"
      />
      <img
        src="/assets/lIIjRX5gxRdY7UWw5wqIXicPOA.png"
        alt=""
        className="pointer-events-none absolute right-[2%] top-[44%] w-[99px] md:right-[8%] md:top-[48%] md:w-[173px] xl:right-[95px] xl:top-[508px] xl:w-[198px]"
      />
      <div className="relative z-10 px-5 text-center md:px-16">
        <h1 className="h-hero text-ink">
          <motion.span className="block" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
            SOFTWARE
          </motion.span>
          <motion.span className="block" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}>
            ENGINEER
          </motion.span>
        </h1>
      </div>
      <motion.div style={{ y: rise }} className="relative z-10 mt-8 flex justify-center xl:hidden">
        <img src={portrait} alt="Portrait of portfolio creator – front view" className="h-[205px] w-[180px] rounded-[20px] object-cover md:h-[251px] md:w-[220px]" />
      </motion.div>
      <div className="pointer-events-none absolute inset-x-0 bottom-5 z-10 hidden xl:block">
        <Portrait front={front} />
      </div>
      <div className="absolute inset-x-0 bottom-5 z-10 flex items-end justify-between px-5 md:px-[92px] xl:px-[130px]">
        <h2 className="hidden font-semibold leading-none tracking-display text-ink md:block md:text-[58px] xl:text-[68px]">©2026</h2>
        <p className="copy w-full text-center text-ink md:w-auto md:text-right">/CREATING SINCE 2020</p>
      </div>
    </section>
  );
}

function Portrait({ front }: { front: MotionValue<number> }) {
  return (
    <div className="relative mx-auto h-[228px] w-[200px] overflow-hidden rounded-[20px]">
      <img src={portrait} alt="Portrait of portfolio creator – back view" className="absolute inset-0 h-full w-full object-cover grayscale brightness-50" />
      <motion.img src={portrait} alt="Portrait of portfolio creator – front view" style={{ opacity: front }} className="absolute inset-0 h-full w-full object-cover" />
    </div>
  );
}
