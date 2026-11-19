import Link from "next/link";
import { Monogram } from "@/components/ui/monogram";
import { site } from "@/lib/site";

export default function NotFound() {
  return (
    <main id="main" className="flex min-h-screen flex-col items-center justify-center gap-8 bg-ink px-4 text-center">
      <Monogram className="size-16" />
      <p className="caption-mono text-brass">404</p>
      <h1 className="heading-1 text-hero max-w-[14ch] pb-1">This page was dismissed</h1>
      <p className="body-lead max-w-[28rem] text-bone-2">The page you wanted is not here. Your consultation still is.</p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link href="/" className="button-md inline-flex h-12 items-center rounded-full bg-brass px-6 text-ink">
          Back to the home page
        </Link>
        <a href={site.phone.href} className="button-md inline-flex h-12 items-center rounded-full border border-bone/20 px-6">
          {site.phone.display}
        </a>
      </div>
    </main>
  );
}
