import { Loader } from "@/components/loader";
import { SiteNav } from "@/components/site-nav";
import { Hero } from "@/components/hero";
import { TaglineReveal } from "@/components/tagline-reveal";
import { RecordBento } from "@/components/record-bento";
import { CaseRing } from "@/components/case-ring";
import { Reviews } from "@/components/reviews";
import { SavannahRail } from "@/components/savannah-rail";
import { Faq } from "@/components/faq";
import { Consult } from "@/components/consult";
import { SiteFooter } from "@/components/site-footer";
import { MobileBar } from "@/components/mobile-bar";

export default function Home() {
  return (
    <>
      <Loader />
      <SiteNav />
      <main id="main">
        <Hero />
        <TaglineReveal />
        <RecordBento />
        <CaseRing />
        <Reviews />
        <SavannahRail />
        <Faq />
        <Consult />
      </main>
      <SiteFooter />
      <MobileBar />
    </>
  );
}
