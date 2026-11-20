"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { CheckCircle, Clock, MapPin, Phone, SpinnerGap } from "@phosphor-icons/react";
import Image from "next/image";
import { useRef, useState } from "react";
import { formatPhone, validateConsult, type ConsultErrors } from "@/lib/consult";
import { EASE } from "@/lib/motion";
import { site } from "@/lib/site";

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "body-3 w-full rounded-2xl border bg-ink/60 px-4 py-3 text-bone placeholder:text-bone-3 outline-none transition-[border-color,background-color] duration-300 focus:border-brass focus:bg-ink";

function Field({
  id,
  label,
  error,
  children,
  hint,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="title-4 text-bone-2">
        {label}
        {hint && <span className="text-bone-3"> {hint}</span>}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            id={`${id}-error`}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="caption-2 text-danger"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Consult() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<ConsultErrors>({});
  const [sentTo, setSentTo] = useState("");
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const raw = Object.fromEntries(fd.entries()) as Record<string, unknown>;
    raw.ack = fd.get("ack") === "on";
    const v = validateConsult(raw);
    setErrors(v.errors);
    if (!v.ok) {
      const first = Object.keys(v.errors)[0];
      document.getElementById(`c-${first}`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/consult", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(raw),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setErrors(json.errors ?? {});
        setStatus("error");
        return;
      }
      setSentTo(formatPhone(String(raw.phone)));
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  const err = (k: keyof ConsultErrors) =>
    errors[k] ? { "aria-invalid": true, "aria-describedby": `c-${k}-error` } : {};

  return (
    <section ref={ref} id="consult" aria-labelledby="consult-title" className="relative overflow-hidden bg-ink px-4 py-24 md:px-10 md:py-32">
      <motion.div style={{ y }} className="absolute inset-[-10%_0]">
        <Image
          src="/images/savannah-skyline.jpg"
          alt=""
          fill
          quality={90}
          sizes="100vw"
          className="object-cover opacity-30"
        />
      </motion.div>
      <div className="absolute inset-0 bg-ink/60" />

      <div className="relative mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[1fr_560px] lg:gap-16">
        <div className="flex flex-col justify-between gap-12">
          <div>
            <p className="caption-mono mb-6 flex items-center gap-3 text-bone-3">
              <span className="h-px w-8 bg-brass" aria-hidden />
              Free consultation
            </p>
            <h2 id="consult-title" className="heading-1 text-hero max-w-[14ch] pb-1">
              The first hour is free. The next move is yours
            </h2>
            <p className="body-lead mt-6 max-w-[30rem] text-bone-2">
              Every day before your court date is a day to prepare. Tell us what happened and Taylor King&apos;s office will
              call you back to set up your 60 minute consultation.
            </p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            <li className="rounded-3xl border border-bone/10 bg-smoke/80 p-6 backdrop-blur-md">
              <Phone weight="fill" className="size-5 text-brass" aria-hidden />
              <p className="caption-mono mt-6 text-bone-3">Call the office</p>
              <a href={site.phone.href} className="heading-4 mt-1 block transition-colors hover:text-brass">
                {site.phone.display}
              </a>
            </li>
            <li className="rounded-3xl border border-bone/10 bg-smoke/80 p-6 backdrop-blur-md">
              <MapPin weight="fill" className="size-5 text-brass" aria-hidden />
              <p className="caption-mono mt-6 text-bone-3">Visit</p>
              <a
                href={site.address.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="title-1 mt-1 block transition-colors hover:text-brass"
              >
                {site.address.street}
                <br />
                {site.address.city}, {site.address.region} {site.address.zip}
              </a>
            </li>
          </ul>
        </div>

        <div className="rounded-[2rem] border border-bone/10 bg-smoke/90 p-6 backdrop-blur-xl md:p-10">
          <AnimatePresence mode="wait">
            {status === "sent" ? (
              <motion.div
                key="sent"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="flex min-h-[520px] flex-col justify-center gap-6"
                role="status"
              >
                <CheckCircle weight="fill" className="size-14 text-brass" aria-hidden />
                <h3 className="heading-3">Request received</h3>
                <p className="body-3 max-w-[26rem] text-bone-2">
                  Expect a call at {sentTo}. If your court date is in the next few days, call {site.phone.display} now so
                  nothing waits.
                </p>
                <a href={site.phone.href} className="button-md text-brass underline underline-offset-4">
                  Call {site.phone.display}
                </a>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                noValidate
                onSubmit={onSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -16 }}
                className="flex flex-col gap-5"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="heading-4">Request your free consultation</h3>
                  <span className="caption-mono flex items-center gap-2 text-bone-3">
                    <Clock weight="bold" className="size-3.5" aria-hidden />2 min
                  </span>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field id="c-name" label="Your name" error={errors.name}>
                    <input id="c-name" name="name" autoComplete="name" className={`${field} ${errors.name ? "border-danger" : "border-bone/15"}`} {...err("name")} />
                  </Field>
                  <Field id="c-phone" label="Phone" error={errors.phone}>
                    <input
                      id="c-phone"
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder="(912) 555 0100"
                      className={`${field} ${errors.phone ? "border-danger" : "border-bone/15"}`}
                      {...err("phone")}
                    />
                  </Field>
                </div>
                <Field id="c-email" label="Email" hint="(optional)" error={errors.email}>
                  <input id="c-email" name="email" type="email" autoComplete="email" className={`${field} ${errors.email ? "border-danger" : "border-bone/15"}`} {...err("email")} />
                </Field>
                <div className="grid gap-5 sm:grid-cols-[1.4fr_1fr]">
                  <Field id="c-charge" label="Charge or situation" error={errors.charge}>
                    <input
                      id="c-charge"
                      name="charge"
                      placeholder="For example, DUI"
                      className={`${field} ${errors.charge ? "border-danger" : "border-bone/15"}`}
                      {...err("charge")}
                    />
                  </Field>
                  <Field id="c-courtDate" label="Next court date" hint="(if any)" error={errors.courtDate}>
                    <input
                      id="c-courtDate"
                      name="courtDate"
                      type="date"
                      className={`${field} ${errors.courtDate ? "border-danger" : "border-bone/15"}`}
                      {...err("courtDate")}
                    />
                  </Field>
                </div>
                <Field id="c-message" label="Anything else" hint="(optional, no details of the facts needed)">
                  <textarea id="c-message" name="message" rows={3} className={`${field} resize-none border-bone/15`} />
                </Field>
                <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
                <div className="flex flex-col gap-2">
                  <label htmlFor="c-ack" className="flex cursor-pointer items-start gap-3">
                    <input id="c-ack" name="ack" type="checkbox" className="mt-1 size-4 shrink-0 accent-brass" {...err("ack")} />
                    <span className="caption-2 text-bone-2">
                      I understand that sending this form does not make Taylor King my lawyer, and that I should not send
                      confidential details of my case here.
                    </span>
                  </label>
                  {errors.ack && (
                    <p id="c-ack-error" className="caption-2 text-danger">
                      {errors.ack}
                    </p>
                  )}
                </div>
                {status === "error" && (
                  <p className="caption-2 text-danger" role="alert">
                    That did not go through. Check the fields above, or call {site.phone.display}.
                  </p>
                )}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="button-md flex h-14 items-center justify-center gap-3 rounded-full bg-brass text-onbrass transition-[background-color,transform] duration-300 ease-out-expo hover:bg-brass-hi active:scale-[0.98] disabled:opacity-70"
                >
                  {status === "sending" ? (
                    <>
                      <SpinnerGap weight="bold" className="size-5 animate-spin" aria-hidden /> Sending
                    </>
                  ) : (
                    "Request my free consultation"
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
