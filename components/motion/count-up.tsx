"use client";

import { animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/** Counts from `from` to `to` once, when it scrolls into view. Renders the final value on the server. */
export function CountUp({ to, from = 0, duration = 1.4, className }: { to: number; from?: number; duration?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const [v, setV] = useState(to);
  useEffect(() => {
    if (!inView) return;
    const c = animate(from, to, { duration, ease: [0.22, 1, 0.36, 1], onUpdate: (x) => setV(Math.round(x)) });
    return () => c.stop();
  }, [inView, from, to, duration]);
  return (
    <span ref={ref} className={className}>
      {v}
    </span>
  );
}
