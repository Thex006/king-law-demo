"use client";

import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRef, useState } from "react";
import { CallButton, ConsultButton } from "./ui/buttons";
import { Stars } from "./ui/stars";
import { SplitReveal } from "./motion/split-reveal";
import { EASE } from "@/lib/motion";
import { site } from "@/lib/site";

const DepthPhoto = dynamic(() => import("./three/depth-photo").then((m) => m.DepthPhoto), { ssr: false });

/** Delay that lines the hero up with the opening curtain. */
const D = 1.15;

export function Hero() {
  // Phones get a 2560px texture (still sharp on a 3x screen, half the upload work).
  const [narrow] = useState(() => typeof window !== "undefined" && window.innerWidth < 768);
  const ref = useRef<HTMLElement>(null);
  const progress = useRef({ current: 0 }).current;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => (progress.current = Math.min(Math.max(v, 0), 1)));
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const fade = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} id="top" className="theme-dark relative h-[100svh] min-h-[640px] overflow-hidden bg-ink text-bone" aria-labelledby="hero-title">
      {/* Still photo first (instant, and the no WebGL fallback). The depth canvas fades in over it. */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-savannah-night.jpg"
          alt="Savannah at night: a lamplit square with a domed building beyond the trees"
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-[62%_50%] brightness-[0.62]"
        />
      </div>
      <div className="absolute inset-0">
        <DepthPhoto
          src={`/_next/image?url=%2Fimages%2Fhero-savannah-night.jpg&w=${narrow ? 2560 : 3840}&q=90`}
          depth="/images/hero-depth.png"
          imageAspect={3840 / 2560}
          focusX={0.62}
          progress={progress}
        />
      </div>
      {/* Legibility scrims: flat black at the bottom and the left, so type always sits on dark. */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgb(0_0_0/0.55)_0%,rgb(0_0_0/0)_28%,rgb(0_0_0/0)_45%,rgb(0_0_0/0.92)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgb(0_0_0/0.78)_0%,rgb(0_0_0/0.45)_45%,rgb(0_0_0/0)_75%)] max-md:hidden" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgb(0_0_0/0.2)_0%,rgb(0_0_0/0.62)_30%,rgb(0_0_0/0.8)_100%)] md:hidden" />
      <div className="grain pointer-events-none absolute inset-0" />

      <motion.div style={{ y, opacity: fade }} className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col justify-end px-4 pb-24 md:px-10 md:pb-16">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: D }}
          className="caption-mono mb-6 flex items-center gap-3 text-bone-2"
        >
          <span className="h-px w-8 bg-brass" aria-hidden />
          Criminal defense attorney, Savannah, Georgia
        </motion.p>

        <SplitReveal
          as="h1"
          id="hero-title"
          onMount
          delay={D + 0.1}
          text="Charged in Savannah? Put a former public defender in your corner"
          className="display-1 text-hero max-w-[15ch] pb-2"
        />

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: D + 0.7 }}
          className="body-lead mt-6 max-w-[34rem] text-bone-2"
        >
          Taylor King spent six years as an assistant public defender in the Eastern Judicial Circuit, the courts of
          Chatham County. Now she runs her own office on Bull Street, and your first hour with her costs nothing.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: D + 0.85 }}
          className="mt-8 flex flex-wrap items-center gap-3"
        >
          <ConsultButton size="lg" className="max-sm:w-full" />
          <CallButton size="lg" className="max-sm:hidden" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: EASE, delay: D + 1.05 }}
          className="mt-10 flex flex-wrap items-end justify-between gap-6 border-t border-bone/15 pt-6"
        >
          <a href="#reviews" className="group flex items-center gap-4">
            <span className="heading-3 tabular-nums">{site.rating.value}</span>
            <span className="flex flex-col gap-1">
              <Stars />
              <span className="caption-2 text-bone-2 transition-colors group-hover:text-bone">
                {site.rating.count} client reviews on Google
              </span>
            </span>
          </a>
          <p className="caption-mono hidden text-right text-bone-3 md:block">
            {site.address.full}
            <br />
            Move your cursor, the square moves with you
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
