"use client";

import { motion } from "framer-motion";
import { GoogleLogo, Quotes } from "@phosphor-icons/react";
import { Stars } from "./ui/stars";
import { reveal, VIEWPORT } from "@/lib/motion";
import { reviews, site } from "@/lib/site";

function Marquee() {
  const items = reviews.map((r) => r.highlight).filter(Boolean) as string[];
  const row = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-bone/10 py-6" aria-hidden>
      <div className="marquee-track flex w-max items-center gap-10">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-10 whitespace-nowrap text-4xl font-semibold tracking-[-0.04em] text-bone/90 md:text-6xl">
            {t}
            <span className="size-3 rotate-45 bg-brass" />
          </span>
        ))}
      </div>
    </div>
  );
}

/** Real Google reviews, word for word. */
export function Reviews() {
  const [lead, ...rest] = reviews;
  return (
    <section id="reviews" aria-labelledby="reviews-title" className="bg-ink py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-4 md:px-10">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6 md:mb-16">
          <div>
            <p className="caption-mono mb-6 flex items-center gap-3 text-bone-3">
              <span className="h-px w-8 bg-brass" aria-hidden />
              Client reviews
            </p>
            <h2 id="reviews-title" className="heading-1 max-w-[14ch]">
              Eleven reviews. Eleven five stars.
            </h2>
          </div>
          <a
            href={site.address.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 rounded-full border border-bone/15 py-2 pl-2 pr-5 transition-colors hover:border-bone/40"
          >
            <span className="grid size-10 place-items-center rounded-full bg-bone text-ink">
              <GoogleLogo weight="bold" className="size-5" aria-hidden />
            </span>
            <span className="flex flex-col">
              <span className="flex items-center gap-2">
                <span className="title-3">{site.rating.value}</span>
                <Stars className="size-3.5" />
              </span>
              <span className="caption-2 text-bone-3">Read them on Google</span>
            </span>
          </a>
        </div>
      </div>

      <Marquee />

      <div className="mx-auto mt-12 grid max-w-[1400px] gap-3 px-4 md:mt-16 md:grid-cols-2 md:gap-4 md:px-10 lg:grid-cols-3">
        <motion.figure
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="flex flex-col justify-between gap-10 rounded-3xl bg-brass p-6 text-ink md:col-span-2 md:p-10 lg:row-span-2"
        >
          <Quotes weight="fill" className="size-10" aria-hidden />
          <blockquote className="heading-2 max-w-[18ch]">&ldquo;{lead.quote}&rdquo;</blockquote>
          <figcaption className="flex items-center justify-between gap-4">
            <span className="title-3">{lead.name}</span>
            <span className="caption-mono text-ink/70">Google, {lead.when}</span>
          </figcaption>
        </motion.figure>

        {rest.map((r, i) => (
          <motion.figure
            key={r.name}
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            transition={{ delay: (i % 3) * 0.08 }}
            className="flex flex-col justify-between gap-8 rounded-3xl border border-bone/10 bg-smoke p-6 transition-colors duration-500 hover:border-brass/40 md:p-8"
          >
            <div>
              <Stars className="size-3.5" />
              <blockquote className="body-3 mt-5 text-bone">&ldquo;{r.quote}&rdquo;</blockquote>
            </div>
            <figcaption className="flex items-center justify-between gap-4 border-t border-bone/10 pt-5">
              <span className="title-4">{r.name}</span>
              <span className="caption-mono text-bone-3">Google, {r.when}</span>
            </figcaption>
          </motion.figure>
        ))}
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="flex flex-col justify-between gap-8 rounded-3xl border border-brass/30 bg-brass/10 p-6 md:p-8"
        >
          <p className="heading-4 max-w-[16ch]">Talk to her before you decide anything. The first hour is free.</p>
          <a
            href="#consult"
            className="button-sm inline-flex h-11 w-fit items-center rounded-full bg-brass px-5 text-ink transition-colors hover:bg-brass-hi"
          >
            Book your free consultation
          </a>
        </motion.div>
      </div>
      <p className="caption-2 mx-auto mt-8 max-w-[1400px] px-4 text-bone-3 md:px-10">
        Quoted word for word from public Google reviews, with cuts marked … Past results do not guarantee a similar outcome in your case.
      </p>
    </section>
  );
}
