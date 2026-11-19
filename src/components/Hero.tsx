import { motion, useMotionTemplate, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef, type RefObject } from "react";

const portrait = "/assets/haSjyjpt7FyCjJUBvXtmzCMSEQg.png";

// Desktop portrait flip, measured from the original site (page scrollY in px).
// The card starts edge-on-ish (60deg), goes edge-on at ~500px, and settles
// showing the grayscale face at 180deg. `lift` is the card's vertical offset.
const flipScroll = [0, 200, 400, 500, 600, 700, 800, 900, 1000, 1100];
const flipAngle = [60, 60, 77, 88, 107, 126, 143, 165, 174, 180];
// The card is effectively sticky near the bottom of the viewport while scrolling.
const liftScroll = [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
const liftY = [0, 109, 223, 333, 443, 545, 642, 732, 820, 905, 901];
const growScroll = [0, 100, 200, 300, 400, 500, 600, 700, 800];
const growY = [0.5, 0.56, 0.65, 0.73, 0.83, 0.91, 0.96, 0.99, 1];
// Colour: black & white at the start, becoming full colour as the card rotates.
const colourAmount = flipAngle.map((a) => Math.min(1, Math.max(0, (a - 60) / 120)));

export function Hero({ track }: { track: RefObject<HTMLDivElement | null> }) {
  const local = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: track, offset: ["start start", "end end"] });
  const { scrollY } = useScroll();
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
        <Portrait scrollY={scrollY} />
      </div>
      <div className="absolute inset-x-0 bottom-5 z-10 flex items-end justify-between px-5 md:px-[92px] xl:px-[130px]">
        <h2 className="hidden font-semibold leading-none tracking-display text-ink md:block md:text-[58px] xl:text-[68px]">©2026</h2>
        <p className="copy w-full text-center text-ink md:w-auto md:text-right">/CREATING SINCE 2020</p>
      </div>
    </section>
  );
}

function Portrait({ scrollY }: { scrollY: MotionValue<number> }) {
  const rotateY = useTransform(scrollY, flipScroll, flipAngle);
  const scaleY = useTransform(scrollY, growScroll, growY);
  const y = useTransform(scrollY, liftScroll, liftY);
  const grayscale = useTransform(scrollY, flipScroll, colourAmount.map((c) => 1 - c));
  const filter = useMotionTemplate`grayscale(${grayscale})`;

  return (
    <motion.div className="relative mx-auto h-[456px] w-[400px]" style={{ y }}>
      <motion.div
        className="absolute inset-0 [transform-style:preserve-3d]"
        style={{ rotateY, scaleY, transformOrigin: "50% 100%" }}
      >
        <motion.img
          src={portrait}
          alt="Portrait of portfolio creator – front view"
          style={{ filter }}
          className="absolute inset-0 h-full w-full rounded-[20px] object-cover [backface-visibility:hidden]"
        />
        <motion.img
          src={portrait}
          alt=""
          aria-hidden="true"
          style={{ filter }}
          className="absolute inset-0 h-full w-full rounded-[20px] object-cover [backface-visibility:hidden] [transform:rotateY(180deg)]"
        />
      </motion.div>
    </motion.div>
  );
}
