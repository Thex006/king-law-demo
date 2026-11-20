"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const shots = [
  { src: "/images/oak-avenue.jpg", w: 3840, h: 2543, alt: "An avenue of live oaks hung with Spanish moss", cap: "Live oaks and Spanish moss", shape: "wide" },
  { src: "/images/savannah-doorway.jpg", w: 2560, h: 3840, alt: "A historic Savannah house with a lit arched doorway and iron railings", cap: "Historic district", shape: "tall" },
  { src: "/images/forsyth-fountain.jpg", w: 3840, h: 2412, alt: "The fountain in Forsyth Park, Savannah, framed by oaks", cap: "Forsyth Park fountain", shape: "wide" },
  { src: "/images/square-fountain.jpg", w: 2560, h: 3840, alt: "A fountain in a shaded Savannah square", cap: "One of Savannah's squares", shape: "tall" },
] as const;

/** Bull Street chapter: the section pins and a rail of Savannah photographs slides sideways as you scroll. */
export function SavannahRail() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });
  const track = useRef<HTMLDivElement>(null);
  const travel = useRef(0);
  const [, setTick] = useState(0);
  useEffect(() => {
    const measure = () => {
      if (!track.current) return;
      travel.current = Math.max(0, track.current.scrollWidth - window.innerWidth);
      setTick((t) => t + 1);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (track.current) ro.observe(track.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);
  const x = useTransform(p, (v) => -Math.min(Math.max(v, 0), 1) * travel.current);
  const inner = useTransform(p, [0, 1], ["-6%", "6%"]);

  return (
    <section ref={ref} aria-labelledby="rail-title" className="relative h-[300vh] bg-ink">
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        <motion.div ref={track} style={{ x }} className="flex w-max items-center gap-4 px-4 md:gap-6 md:px-10">
          <div className="flex w-[78vw] shrink-0 flex-col justify-center pr-6 md:w-[40vw] lg:w-[34vw]">
            <p className="caption-mono mb-6 flex items-center gap-3 text-bone-3">
              <span className="h-px w-8 bg-brass" aria-hidden />
              100 Bull Street
            </p>
            <h2 id="rail-title" className="heading-1 max-w-[12ch]">
              Right in the heart of Savannah
            </h2>
            <p className="body-lead mt-6 max-w-[26rem] text-bone-2">
              The office sits on Bull Street in the historic district, a short walk from the city&apos;s squares. Come in for
              your consultation, or start it by phone.
            </p>
          </div>
          {shots.map((s) => (
            <figure
              key={s.src}
              className={`theme-dark relative shrink-0 overflow-hidden rounded-3xl text-bone ${
                s.shape === "wide" ? "h-[52svh] w-[86vw] md:h-[64svh] md:w-[58vw]" : "h-[60svh] w-[64vw] md:h-[72svh] md:w-[30vw]"
              }`}
            >
              <motion.div style={{ x: inner }} className="absolute inset-[0_-8%]">
                <Image
                  src={s.src}
                  alt={s.alt}
                  fill
                  quality={90}
                  sizes={s.shape === "wide" ? "(min-width: 768px) 70vw, 100vw" : "(min-width: 768px) 40vw, 80vw"}
                  className="object-cover"
                />
              </motion.div>
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(0_0_0/0)_60%,rgb(0_0_0/0.75)_100%)]" />
              <figcaption className="caption-mono absolute bottom-5 left-5 text-bone">{s.cap}</figcaption>
            </figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
