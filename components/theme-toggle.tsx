"use client";

import { Moon, Sun } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { EASE } from "@/lib/motion";

export const THEME_KEY = "king-theme";
type Theme = "dark" | "light";

/** Dark is the default. The choice is saved per browser and applied before first paint (see app/layout.tsx). */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>("dark");
  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "light" ? "light" : "dark");
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", next === "light" ? "#f4f1ea" : "#000000");
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      /* private mode: the toggle still works for this visit */
    }
  }

  const label = theme === "dark" ? "Switch to light mode" : "Switch to dark mode";
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={`relative grid size-10 shrink-0 place-items-center overflow-hidden rounded-full bg-bone/10 text-bone transition-[background-color,transform] duration-300 ease-out-expo hover:bg-bone/15 active:scale-95 ${className}`}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={theme}
          initial={{ y: 18, rotate: -90, opacity: 0 }}
          animate={{ y: 0, rotate: 0, opacity: 1 }}
          exit={{ y: -18, rotate: 90, opacity: 0 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="grid place-items-center"
        >
          {theme === "dark" ? (
            <Sun weight="fill" className="size-[18px] text-brass" aria-hidden />
          ) : (
            <Moon weight="fill" className="size-[18px] text-brass" aria-hidden />
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
