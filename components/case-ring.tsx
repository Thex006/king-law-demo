"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import { EASE } from "@/lib/motion";
import { stages } from "@/lib/site";

/** Degrees between cards: a shallow arc, so the neighbours stay readable beside the front card. */
const STEP = 34;

/**
 * "Your case" chapter: five stage cards stand on a real 3D ring (CSS preserve-3d).
 * The section pins while the ring turns one stage per scroll step; the copy beside it follows.
 */
export function CaseRing() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.4 });
  const rotate = useTransform(smooth, [0, 1], [0, -STEP * (stages.length - 1)]);
  const tilt = useTransform(smooth, [0, 0.5, 1], [-6, -10, -6]);
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const [active, setActive] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const i = Math.min(stages.length - 1, Math.max(0, Math.round(Math.min(Math.max(v, 0), 1) * (stages.length - 1))));
    setActive(i);
  });
  const s = stages[active];

  return (
    <section ref={ref} id="process" aria-labelledby="process-title" className="relative bg-coal" style={{ height: `${stages.length * 90 + 60}vh` }}>
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden px-4 pt-24 pb-24 md:px-10 md:pt-28 md:pb-8">
        <div className="mx-auto flex w-full max-w-[1400px] flex-wrap items-end justify-between gap-4">
          <div>
            <p className="caption-mono mb-4 flex items-center gap-3 text-bone-3">
              <span className="h-px w-8 bg-brass" aria-hidden />
              Your case, stage by stage
            </p>
            <h2 id="process-title" className="heading-2 max-w-[18ch]">
              Know what comes next before it happens
            </h2>
          </div>
          <div className="hidden items-center gap-4 lg:flex" aria-hidden>
            <span className="caption-mono text-brass tabular-nums">{s.n}</span>
            <span className="relative h-px w-32 bg-line md:w-48">
              <motion.span style={{ width: bar }} className="absolute inset-y-0 left-0 bg-brass" />
            </span>
            <span className="caption-mono text-bone-3">05</span>
          </div>
        </div>

        <div className="mx-auto grid w-full max-w-[1400px] flex-1 content-center items-center gap-4 lg:grid-cols-[1fr_420px] lg:gap-12">
          {/* The ring */}
          <div className="relative h-full min-h-[260px] [perspective:1400px] max-lg:h-[38svh] max-lg:max-h-[300px]" aria-hidden>
            <motion.div
              style={{ rotateX: tilt }}
              className="absolute left-1/2 top-1/2 [transform-style:preserve-3d]"
            >
              <div className="ring-pull [transform-style:preserve-3d]">
              <motion.div style={{ rotateY: rotate }} className="relative [transform-style:preserve-3d]">
                {stages.map((st, i) => (
                  <div
                    key={st.n}
                    className="theme-dark ring-card absolute text-bone overflow-hidden rounded-3xl border border-bone/15 bg-ash [backface-visibility:hidden]"
                    style={{ transform: `rotateY(${i * STEP}deg) translateZ(var(--ring-r))` }}
                  >
                    <Image src={st.image} alt="" fill quality={90} sizes="(min-width: 1024px) 760px, 560px" className="object-cover" />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(0_0_0/0.1)_30%,rgb(0_0_0/0.85)_100%)]" />
                    <div
                      className={`absolute inset-0 transition-opacity duration-500 ${i === active ? "opacity-0" : "opacity-55"} bg-ink`}
                    />
                    <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                      <p className="caption-mono text-brass">{st.n}</p>
                      <p className="heading-4 mt-1">{st.title}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
              </div>
            </motion.div>
          </div>

          {/* The copy for the stage in front */}
          <div className="relative min-h-[220px] lg:min-h-[320px]" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                <p className="caption-mono text-bone-3">
                  Stage {s.n} of 05
                </p>
                <h3 className="heading-3 mt-3">{s.title}</h3>
                <p className="body-3 mt-4 text-bone-2">{s.what}</p>
                <div className="mt-6 rounded-2xl border border-brass/30 bg-brass/10 p-5">
                  <p className="caption-mono text-brass">With Taylor King</p>
                  <p className="body-3 mt-2 text-bone">{s.move}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <p className="caption-mono mx-auto mt-2 w-full max-w-[1400px] text-bone-3 max-md:hidden">
          General information about Georgia criminal cases, not legal advice for your situation
        </p>
      </div>
    </section>
  );
}
