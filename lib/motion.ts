/** One motion vocabulary for the whole site: ease out expo, transform and opacity, reveal once. */
export const EASE = [0.22, 1, 0.36, 1] as const;

export const reveal = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export const VIEWPORT = { once: true, margin: "0px 0px -12% 0px" } as const;
