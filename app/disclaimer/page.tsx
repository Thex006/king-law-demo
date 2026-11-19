import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Legal disclaimer | The King Law Office" };

export default function Disclaimer() {
  return (
    <LegalPage title="Legal disclaimer">
      <h2>Attorney advertising</h2>
      <p>This website is attorney advertising for {site.legalName}, {site.address.full}.</p>
      <h2>Not legal advice</h2>
      <p>The content of this website is general information about criminal cases in Georgia. It is not legal advice for your situation. Every case depends on its own facts.</p>
      <h2>No attorney client relationship</h2>
      <p>Reading this site, calling the office or sending the form does not create an attorney client relationship. That only begins once representation is agreed in writing.</p>
      <h2>Results</h2>
      <p>Client reviews describe individual experiences. Past results do not guarantee a similar outcome.</p>
      <h2>About this website</h2>
      <p>This is a concept website prepared as a design proposal and is not affiliated with or published by {site.legalName}. Facts come from the firm&apos;s public Google Maps and Avvo listings, checked November 2026.</p>
    </LegalPage>
  );
}
