"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Phone } from "@phosphor-icons/react";
import { useState } from "react";
import { EASE } from "@/lib/motion";
import { site } from "@/lib/site";

/** Phone only: call and consult always one tap away once the hero has scrolled past. */
export function MobileBar() {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  useMotionValueEvent(scrollY, "change", (v) => {
    const consult = document.getElementById("consult");
    const inConsult = consult ? consult.getBoundingClientRect().top < window.innerHeight * 0.6 && consult.getBoundingClientRect().bottom > 0 : false;
    setShow(v > window.innerHeight * 0.7 && !inConsult);
  });
  return (
    <motion.div
      initial={false}
      animate={{ y: show ? 0 : 120, opacity: show ? 1 : 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="fixed inset-x-3 bottom-3 z-40 flex gap-2 rounded-full border border-bone/10 bg-ink/80 p-2 backdrop-blur-xl md:hidden"
      style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
      aria-hidden={!show}
    >
      <a
        href={site.phone.href}
        tabIndex={show ? 0 : -1}
        className="button-sm flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-bone/10 text-bone"
      >
        <Phone weight="fill" className="size-4 text-brass" aria-hidden /> Call now
      </a>
      <a
        href="#consult"
        tabIndex={show ? 0 : -1}
        className="button-sm flex h-12 flex-[1.4] items-center justify-center rounded-full bg-brass text-ink"
      >
        Free consultation
      </a>
    </motion.div>
  );
}
