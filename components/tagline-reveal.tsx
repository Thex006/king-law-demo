"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const LINE =
  "For six years Taylor King stood beside people in Chatham County courtrooms as their public defender. She knows how these cases move. Now that experience answers to one client, and that client is you";
const ACCENT = new Set(["six", "years", "you"]);

function Word({ word, i, total, p }: { word: string; i: number; total: number; p: MotionValue<number> }) {
  const start = i / total;
  const end = Math.min(1, start + 1.5 / total);
  const opacity = useTransform(p, [start, end], [0.22, 1]);
  return (
    <motion.span style={{ opacity }} className={ACCENT.has(word.replace(/[.,]/g, "")) ? "text-brass" : undefined}>
      {word}{" "}
    </motion.span>
  );
}

/** Mandatory tagline reveal (landing-page-design B11): words go from 22% to full colour one by one as you scroll. */
export function TaglineReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 45%"] });
  const words = LINE.split(" ");
  const gavelY = useTransform(scrollYProgress, [0, 1], ["12%", "-12%"]);
  const gavelR = useTransform(scrollYProgress, [0, 1], [-8, 4]);

  return (
    <section aria-label="About Taylor King" className="relative overflow-hidden bg-ink px-4 py-24 md:px-10 md:py-40">
      <div className="mx-auto grid max-w-[1400px] items-center gap-12 lg:grid-cols-[1fr_380px]">
        <div ref={ref}>
          <p className="caption-mono mb-8 flex items-center gap-3 text-bone-3">
            <span className="h-px w-8 bg-brass" aria-hidden />
            Why it matters
          </p>
          <p className="heading-2 max-w-[22ch] text-bone" aria-label={LINE}>
            <span aria-hidden>
              {words.map((w, i) => (
                <Word key={i} word={w} i={i} total={words.length} p={scrollYProgress} />
              ))}
            </span>
          </p>
        </div>
        <motion.div
          style={{ y: gavelY, rotate: gavelR }}
          className="relative mx-auto aspect-[4/5] w-full max-w-[380px] overflow-hidden rounded-3xl max-lg:hidden"
        >
          <Image
            src="/images/justice.jpg"
            alt="A bronze statue of Lady Justice holding her scales, lit from the side"
            fill
            quality={90}
            sizes="(min-width: 1024px) 720px, 1px"
            className="object-cover object-[58%_50%]"
          />
        </motion.div>
      </div>
    </section>
  );
}
