import { Star } from "@phosphor-icons/react/dist/ssr";

export function Stars({ className = "size-4" }: { className?: string }) {
  return (
    <span className="inline-flex gap-0.5 text-brass" role="img" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} weight="fill" className={className} aria-hidden />
      ))}
    </span>
  );
}
