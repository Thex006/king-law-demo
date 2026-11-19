/** K monogram: a brass K cut into a black disc with a fine ring. Drawn in SVG so it stays sharp at any size. */
export function Monogram({ className = "size-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <circle cx="32" cy="32" r="31" fill="#000" stroke="#d6ad62" strokeOpacity="0.55" strokeWidth="1.5" />
      <path d="M22 16v32M22 33l17-17M28 28l13 20" stroke="#d6ad62" strokeWidth="4.5" strokeLinecap="square" fill="none" />
    </svg>
  );
}
