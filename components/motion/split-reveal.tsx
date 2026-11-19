"use client";

import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";

type Props = {
  text: string;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  id?: string;
  delay?: number;
  /** Words to colour with the accent. */
  accent?: string[];
  /** Animate on mount instead of when scrolled into view (the hero). */
  onMount?: boolean;
};

/** Headline reveal: each word rises out of its own mask, in reading order, once. */
export function SplitReveal({ text, as = "h2", className = "", id, delay = 0, accent = [], onMount = false }: Props) {
  const Tag = motion[as];
  const words = text.split(" ");
  const trigger = onMount
    ? { animate: "show" }
    : { whileInView: "show", viewport: { once: true, margin: "0px 0px -10% 0px" } };
  return (
    <Tag
      id={id}
      className={className}
      initial="hidden"
      {...trigger}
      transition={{ staggerChildren: 0.07, delayChildren: delay }}
      aria-label={text}
    >
      {words.map((w, i) => (
        <span key={i} aria-hidden className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-top">
          <motion.span
            className={`inline-block origin-bottom-left ${accent.includes(w.replace(/[,.]/g, "")) ? "text-brass" : ""}`}
            variants={{
              hidden: { y: "115%", rotate: 6 },
              show: { y: "0%", rotate: 0, transition: { duration: 1, ease: EASE } },
            }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
