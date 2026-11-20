"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ConsultButton, CallButton } from "./ui/buttons";
import { Magnetic } from "./motion/magnetic";
import { Monogram } from "./ui/monogram";
import { ThemeToggle } from "./theme-toggle";
import { EASE } from "@/lib/motion";
import { navLinks, site } from "@/lib/site";

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids]);
  return active;
}

const ids = navLinks.map((l) => l.href.slice(1));

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const active = useActiveSection(ids);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE, delay: 1.3 }}
        className="fixed inset-x-0 top-4 z-50 flex justify-center px-4"
      >
        <nav
          aria-label="Main"
          className="flex w-full max-w-fit items-center gap-2 rounded-full border border-bone/10 bg-ink/60 p-2 pl-3 shadow-[0_8px_32px_rgb(0_0_0/0.4)] backdrop-blur-xl max-md:max-w-none max-md:justify-between"
        >
          <a href="#top" className="flex items-center gap-3 rounded-full pr-3" aria-label={`${site.name}, back to top`}>
            <Monogram className="size-8" />
            <span className="title-4 whitespace-nowrap">The King Law Office</span>
          </a>

          <ul className="hidden items-center lg:flex">
            {navLinks.map((l) => {
              const isActive = active === l.href.slice(1);
              return (
                <li key={l.href}>
                  <a
                    href={l.href}
                    aria-current={isActive ? "location" : undefined}
                    className={`title-4 relative block rounded-full px-4 py-2 transition-colors duration-300 ease-out-expo hover:text-bone ${
                      isActive ? "text-bone" : "text-bone-2"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 -z-10 rounded-full bg-bone/10"
                        transition={{ duration: 0.5, ease: EASE }}
                      />
                    )}
                    {l.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <ThemeToggle className="max-lg:ml-auto" />

          <Magnetic className="hidden md:inline-flex" strength={0.2}>
            <ConsultButton size="sm" label="Free consultation" />
          </Magnetic>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="relative grid size-10 place-items-center rounded-full bg-bone/10 transition-transform duration-200 active:scale-95 lg:hidden"
          >
            <span
              className={`absolute h-[1.5px] w-4 bg-bone transition-transform duration-500 ease-out-expo ${
                open ? "rotate-45" : "-translate-y-[3px]"
              }`}
            />
            <span
              className={`absolute h-[1.5px] w-4 bg-bone transition-transform duration-500 ease-out-expo ${
                open ? "-rotate-45" : "translate-y-[3px]"
              }`}
            />
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.25 } }}
            transition={{ duration: 0.35, ease: EASE }}
            className="fixed inset-0 z-40 flex flex-col justify-between bg-ink/95 px-6 pb-8 pt-28 backdrop-blur-2xl lg:hidden"
          >
            <ul className="flex flex-col gap-2">
              {navLinks.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE, delay: Math.min(i * 0.06, 0.4) }}
                >
                  <a href={l.href} onClick={() => setOpen(false)} className="heading-1 block py-2">
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.3 }}
              className="flex flex-col gap-3"
            >
              <p className="body-6 text-bone-2">{site.address.full}</p>
              <div onClick={() => setOpen(false)}>
                <ConsultButton size="lg" className="w-full" />
              </div>
              <CallButton size="lg" className="w-full justify-center" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
