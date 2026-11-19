"use client";

import Lenis from "lenis";
import { useEffect } from "react";

/** Lenis inertia scroll. Off on touch screens (native feels better there). */
export function SmoothScroll() {
  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (coarse) return;

    const lenis = new Lenis({ lerp: 0.1, anchors: { offset: -24 } });
    // Lets sections scroll to a point smoothly.
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    let raf = 0;
    const loop = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);
  return null;
}
