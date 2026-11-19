"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { EASE } from "@/lib/motion";

/** Opening curtain: a brass counter runs to 100, then the black panel lifts off the hero. About one second. */
export function Loader() {
  const [n, setN] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const start = performance.now();
    const dur = 950;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setN(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setDone(true), 120);
    };
    raf = requestAnimationFrame(tick);
    // Never hold the page hostage: lift the curtain on time even if frames are slow.
    const safety = setTimeout(() => setDone(true), 1800);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(safety);
    };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          aria-hidden
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.9, ease: EASE }}
          style={{ clipPath: "inset(0 0 0% 0)" }}
          className="loader-auto fixed inset-0 z-[90] flex flex-col justify-between bg-coal px-4 py-6 md:px-10 md:py-8"
        >
          <div className="flex items-center justify-between">
            <span className="caption-mono text-bone-2">The King Law Office</span>
            <span className="caption-mono text-bone-3">Savannah, GA</span>
          </div>
          <div className="flex items-end justify-between gap-6">
            <span className="caption-mono max-w-[16rem] text-bone-3">Criminal defense, 100 Bull Street</span>
            <span className="text-[22vw] font-semibold leading-[0.8] tracking-[-0.06em] text-brass tabular-nums md:text-[14vw]">
              {String(n).padStart(2, "0")}
            </span>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-px bg-line">
            <div className="h-full bg-brass" style={{ width: `${n}%` }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
