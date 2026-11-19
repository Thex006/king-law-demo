import Link from "next/link";
import { Monogram } from "./ui/monogram";
import { ConsultButton } from "./ui/buttons";
import { navLinks, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="bg-ink px-4 pb-28 pt-24 md:px-10 md:pb-10">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col items-start justify-between gap-10 border-b border-bone/10 pb-16 lg:flex-row lg:items-end">
          <p className="display-1 text-hero max-w-[14ch] pb-2">Your defense starts with one call</p>
          <div className="flex flex-col gap-4">
            <ConsultButton size="lg" />
            <a href={site.phone.href} className="heading-4 transition-colors hover:text-brass">
              {site.phone.display}
            </a>
          </div>
        </div>

        <div className="grid gap-10 py-12 md:grid-cols-[1.2fr_1fr_1fr]">
          <div className="flex items-start gap-4">
            <Monogram className="size-12 shrink-0" />
            <div>
              <p className="title-3">{site.legalName}</p>
              <p className="body-6 mt-1 text-bone-2">
                {site.attorney}, attorney at law
                <br />
                {site.address.full}
              </p>
            </div>
          </div>
          <nav aria-label="Footer">
            <ul className="flex flex-col gap-3">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="body-6 text-bone-2 transition-colors hover:text-bone">
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#consult" className="body-6 text-bone-2 transition-colors hover:text-bone">
                  Free consultation
                </a>
              </li>
            </ul>
          </nav>
          <ul className="flex flex-col gap-3">
            <li>
              <Link href="/privacy" className="body-6 text-bone-2 transition-colors hover:text-bone">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/disclaimer" className="body-6 text-bone-2 transition-colors hover:text-bone">
                Legal disclaimer
              </Link>
            </li>
            <li>
              <a href={site.address.mapsUrl} target="_blank" rel="noopener noreferrer" className="body-6 text-bone-2 transition-colors hover:text-bone">
                Google Maps listing
              </a>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-4 border-t border-bone/10 pt-8">
          <p className="caption-2 max-w-[60rem] text-bone-3">
            Attorney advertising. This website is general information, not legal advice, and using it or contacting the office
            does not create an attorney client relationship. Past results do not guarantee a similar outcome.
          </p>
          <p className="caption-2 max-w-[60rem] text-bone-3">
            Concept website prepared as a design proposal. It is not affiliated with or published by {site.legalName}. Facts
            are taken from the firm&apos;s public Google and Avvo listings. Photographs from Unsplash and Wikimedia Commons
            (Tomochichi Federal Building, CC BY-SA 4.0).
          </p>
        </div>
      </div>
    </footer>
  );
}
