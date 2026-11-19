"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Bank, CreditCard, GraduationCap, MapPin, Scales, SealCheck } from "@phosphor-icons/react";
import { CountUp } from "./motion/count-up";
import { reveal, VIEWPORT } from "@/lib/motion";
import { site } from "@/lib/site";

const tile = "relative overflow-hidden rounded-3xl border border-bone/10 bg-smoke p-6 md:p-8";

function Tile({ className = "", children, i = 0 }: { className?: string; children: React.ReactNode; i?: number }) {
  return (
    <motion.div
      variants={reveal}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      transition={{ delay: (i % 3) * 0.08 }}
      className={`${tile} ${className}`}
    >
      {children}
    </motion.div>
  );
}

function Label({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <p className="caption-mono flex items-center gap-2 text-bone-3">
      <span className="text-brass">{icon}</span>
      {children}
    </p>
  );
}

/** The record: every fact here is verified on her Avvo profile or her Google listing. */
export function RecordBento() {
  return (
    <section id="record" aria-labelledby="record-title" className="bg-ink px-4 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6 md:mb-16">
          <div>
            <p className="caption-mono mb-6 flex items-center gap-3 text-bone-3">
              <span className="h-px w-8 bg-brass" aria-hidden />
              The record
            </p>
            <h2 id="record-title" className="heading-1 max-w-[16ch]">
              Trained where the hardest cases land
            </h2>
          </div>
          <p className="body-lead max-w-[30rem] text-bone-2">
            A public defender works the full life of a criminal case, from first appearance to verdict, week after week.
            Six years of that work in Chatham County is the experience behind your defense.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-6 lg:grid-cols-12 md:gap-4">
          {/* Courthouse photo */}
          <motion.figure
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="group relative min-h-[420px] overflow-hidden rounded-3xl md:col-span-6 lg:col-span-7 lg:row-span-2 lg:min-h-[560px]"
          >
            <Image
              src="/images/courthouse-bull-street.jpg"
              alt="The Tomochichi Federal Building and United States Courthouse on Wright Square, Bull Street, Savannah"
              fill
              quality={90}
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="object-cover transition-transform duration-[1400ms] ease-out-expo group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(0_0_0/0)_40%,rgb(0_0_0/0.85)_100%)]" />
            <figcaption className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 p-6 md:p-8">
              <div>
                <p className="caption-mono text-brass">2018 to 2024</p>
                <p className="heading-4 mt-2 max-w-[22ch]">Assistant public defender, Eastern Judicial Circuit</p>
              </div>
              <p className="caption-mono max-w-[16rem] text-bone-3">Pictured: the federal courthouse on Wright Square, Bull Street</p>
            </figcaption>
          </motion.figure>

          <Tile className="flex flex-col justify-between gap-10 md:col-span-3 lg:col-span-5" i={1}>
            <Label icon={<SealCheck weight="fill" className="size-4" />}>State Bar of Georgia</Label>
            <div>
              <p className="text-7xl font-semibold leading-none tracking-[-0.05em] md:text-8xl">
                <CountUp from={1990} to={site.licensed.year} />
              </p>
              <p className="body-3 mt-4 text-bone-2">
                Licensed in Georgia since 2016. Active member in good standing, and Avvo lists no misconduct.
              </p>
            </div>
          </Tile>

          <Tile className="flex flex-col justify-between gap-10 md:col-span-3 lg:col-span-5" i={2}>
            <Label icon={<GraduationCap weight="fill" className="size-4" />}>Education</Label>
            <ul className="flex flex-col divide-y divide-bone/10">
              {site.education.map((e) => (
                <li key={e.school} className="flex items-baseline justify-between gap-4 py-3 first:pt-0 last:pb-0">
                  <span>
                    <span className="title-1 block">{e.school}</span>
                    <span className="body-6 text-bone-3">{e.degree}</span>
                  </span>
                  <span className="caption-mono text-bone-3">{e.year}</span>
                </li>
              ))}
            </ul>
          </Tile>

          <Tile className="md:col-span-6 lg:col-span-5" i={0}>
            <Label icon={<Bank weight="fill" className="size-4" />}>Career</Label>
            <ol className="relative mt-8 flex flex-col gap-6 border-l border-bone/15 pl-6">
              {site.career.map((c, idx) => (
                <li key={c.years + c.org} className="relative">
                  <span
                    className={`absolute -left-[29px] top-1.5 size-2.5 rounded-full ${idx === 0 ? "pulse-dot bg-brass" : "bg-bone-3"}`}
                    aria-hidden
                  />
                  <p className="caption-mono text-bone-3">{c.years}</p>
                  <p className="title-3 mt-1">{c.role}</p>
                  <p className="body-6 text-bone-2">{c.org}</p>
                </li>
              ))}
            </ol>
          </Tile>

          <Tile className="flex flex-col justify-between gap-10 !border-brass/40 !bg-brass text-ink md:col-span-3 lg:col-span-4" i={1}>
            <p className="caption-mono text-ink/70">First consultation</p>
            <div>
              <p className="text-8xl font-semibold leading-none tracking-[-0.06em]">
                <CountUp from={0} to={60} />
                <span className="text-4xl tracking-[-0.03em]"> min</span>
              </p>
              <p className="body-3 mt-4 max-w-[22rem] text-ink/80">
                Free. Sit down with Taylor King, lay out what happened, and leave knowing where you stand.
              </p>
            </div>
          </Tile>

          <Tile className="flex flex-col justify-between gap-10 md:col-span-3 lg:col-span-3" i={2}>
            <Label icon={<CreditCard weight="fill" className="size-4" />}>Clear fees</Label>
            <div>
              <p className="text-5xl font-semibold leading-none tracking-[-0.05em]">
                $<CountUp from={0} to={250} />
                <span className="text-xl text-bone-2"> /hr</span>
              </p>
              <p className="body-6 mt-4 text-bone-2">Cash, check or credit card. You know the rate before you start.</p>
            </div>
          </Tile>

          <motion.figure
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="relative min-h-[300px] overflow-hidden rounded-3xl md:col-span-3 lg:col-span-4"
          >
            <Image
              src="/images/library.jpg"
              alt="Long rows of leather bound law books and marble busts in a historic library"
              fill
              quality={90}
              sizes="(min-width: 1024px) 34vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(0_0_0/0)_45%,rgb(0_0_0/0.8)_100%)]" />
            <figcaption className="caption-mono absolute bottom-6 left-6 text-bone-2">Juris Doctor, University of Georgia</figcaption>
          </motion.figure>

          <Tile className="flex flex-col justify-between gap-10 md:col-span-3 lg:col-span-4" i={1}>
            <Label icon={<Scales weight="fill" className="size-4" />}>Focus</Label>
            <div>
              <p className="heading-3">Criminal defense. Nothing else.</p>
              <p className="body-6 mt-4 text-bone-2">
                One practice area means every hour of her week goes into defending people charged with crimes.
              </p>
            </div>
          </Tile>

          <Tile className="flex flex-col justify-between gap-10 md:col-span-6 lg:col-span-4" i={2}>
            <Label icon={<MapPin weight="fill" className="size-4" />}>The office</Label>
            <div>
              <p className="heading-4">{site.address.street}</p>
              <p className="body-6 mt-1 text-bone-2">
                {site.address.city}, {site.address.region} {site.address.zip}
              </p>
              <a
                href={site.address.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="button-sm mt-6 inline-flex items-center gap-2 text-brass underline decoration-brass/40 underline-offset-4 transition-colors hover:decoration-brass"
              >
                Open in Google Maps
              </a>
            </div>
          </Tile>
        </div>
      </div>
    </section>
  );
}
