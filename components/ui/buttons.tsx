import { ArrowUpRight, Phone } from "@phosphor-icons/react/dist/ssr";
import { site } from "@/lib/site";

type Size = "sm" | "md" | "lg";
const pad: Record<Size, string> = {
  sm: "h-10 pl-4 pr-2 gap-2 button-sm",
  md: "h-12 pl-6 pr-2 gap-3 button-md",
  lg: "h-14 pl-6 pr-2 gap-3 button-md",
};
const dot: Record<Size, string> = { sm: "size-7", md: "size-8", lg: "size-10" };

/** The one primary action: a free consultation. */
export function ConsultButton({
  size = "md",
  className = "",
  label = "Book your free consultation",
}: {
  size?: Size;
  className?: string;
  label?: string;
}) {
  return (
    <a
      href="#consult"
      className={`group inline-flex items-center justify-between rounded-full bg-brass text-ink transition-[background-color,transform] duration-300 ease-out-expo hover:bg-brass-hi active:scale-[0.98] ${pad[size]} ${className}`}
    >
      <span className="whitespace-nowrap">{label}</span>
      <span
        className={`grid place-items-center rounded-full bg-ink text-brass transition-transform duration-500 ease-out-expo group-hover:rotate-45 ${dot[size]}`}
      >
        <ArrowUpRight weight="bold" className="size-4" aria-hidden />
      </span>
    </a>
  );
}

export function CallButton({ size = "md", className = "" }: { size?: Size; className?: string }) {
  return (
    <a
      href={site.phone.href}
      className={`group inline-flex items-center gap-3 rounded-full border border-bone/20 bg-ink/40 px-6 text-bone backdrop-blur-md transition-[border-color,background-color] duration-300 ease-out-expo hover:border-bone/50 hover:bg-ink/60 ${
        size === "sm" ? "button-sm h-10 px-4" : size === "lg" ? "button-md h-14" : "button-md h-12"
      } ${className}`}
    >
      <Phone weight="fill" className="size-4 text-brass" aria-hidden />
      <span className="whitespace-nowrap">{site.phone.display}</span>
    </a>
  );
}
