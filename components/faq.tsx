"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "@phosphor-icons/react";
import { useState } from "react";
import { EASE, reveal, VIEWPORT } from "@/lib/motion";
import { faqs } from "@/lib/site";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" aria-labelledby="faq-title" className="bg-coal px-4 py-24 md:px-10 md:py-32">
      <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <p className="caption-mono mb-6 flex items-center gap-3 text-bone-3">
            <span className="h-px w-8 bg-brass" aria-hidden />
            Straight answers
          </p>
          <h2 id="faq-title" className="heading-1 max-w-[12ch]">
            Questions people ask first
          </h2>
          <p className="body-lead mt-6 max-w-[26rem] text-bone-2">
            Anything not here, ask in your free consultation. That is what the hour is for.
          </p>
        </div>
        <motion.ul variants={reveal} initial="hidden" whileInView="show" viewport={VIEWPORT} className="flex flex-col">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <li key={f.q} className="border-b border-bone/10 first:border-t">
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    id={`faq-q-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="group flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className={`title-1 transition-colors duration-300 ${isOpen ? "text-bone" : "text-bone-2 group-hover:text-bone"}`}>
                      {f.q}
                    </span>
                    <span
                      className={`grid size-10 shrink-0 place-items-center rounded-full border transition-[transform,background-color,border-color] duration-500 ease-out-expo ${
                        isOpen ? "rotate-45 border-brass bg-brass text-ink" : "border-bone/20 text-bone"
                      }`}
                    >
                      <Plus weight="bold" className="size-4" aria-hidden />
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-${i}`}
                      role="region"
                      aria-labelledby={`faq-q-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="body-3 max-w-[40rem] pb-6 text-bone-2">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
