import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { Monogram } from "./ui/monogram";

export function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <main id="main" className="min-h-screen bg-ink px-4 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-[720px]">
        <Link href="/" className="button-sm inline-flex items-center gap-2 text-bone-2 transition-colors hover:text-bone">
          <ArrowLeft weight="bold" className="size-4" aria-hidden /> Back to the site
        </Link>
        <div className="mt-12 flex items-center gap-4">
          <Monogram className="size-10" />
          <p className="caption-mono text-bone-3">The King Law Office</p>
        </div>
        <h1 className="heading-1 mt-6">{title}</h1>
        <div className="body-3 mt-10 flex flex-col gap-5 text-bone-2 [&_h2]:title-1 [&_h2]:mt-6 [&_h2]:text-bone">{children}</div>
      </div>
    </main>
  );
}
