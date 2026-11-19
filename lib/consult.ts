/** Consultation request: one validator shared by the form (instant feedback) and the API route (the real check). */
export type ConsultInput = {
  name: string;
  phone: string;
  email?: string;
  charge: string;
  courtDate?: string;
  message?: string;
  ack: boolean;
  /** Honeypot: real people never fill it. */
  website?: string;
};

export type ConsultErrors = Partial<Record<keyof ConsultInput, string>>;

const digits = (s: string) => s.replace(/\D/g, "");

export function validateConsult(raw: Partial<Record<keyof ConsultInput, unknown>>): {
  ok: boolean;
  data?: ConsultInput;
  errors: ConsultErrors;
  spam?: boolean;
} {
  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  const data: ConsultInput = {
    name: str(raw.name).slice(0, 120),
    phone: str(raw.phone).slice(0, 40),
    email: str(raw.email).slice(0, 160) || undefined,
    charge: str(raw.charge).slice(0, 160),
    courtDate: str(raw.courtDate).slice(0, 20) || undefined,
    message: str(raw.message).slice(0, 2000) || undefined,
    ack: raw.ack === true || raw.ack === "on" || raw.ack === "true",
    website: str(raw.website) || undefined,
  };
  const errors: ConsultErrors = {};
  if (data.name.length < 2) errors.name = "Tell us your name";
  const d = digits(data.phone);
  if (!(d.length === 10 || (d.length === 11 && d.startsWith("1")))) errors.phone = "Enter a 10 digit US phone number";
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email)) errors.email = "Check the email address";
  if (data.charge.length < 2) errors.charge = "Say what the charge is, or what happened";
  if (data.courtDate && !/^\d{4}-\d{2}-\d{2}$/.test(data.courtDate)) errors.courtDate = "Pick a date";
  if (!data.ack) errors.ack = "Please confirm you have read this";
  return { ok: Object.keys(errors).length === 0, data, errors, spam: Boolean(data.website) };
}

/** (912) 470-9324 style, for display back to the visitor. */
export function formatPhone(p: string) {
  const d = digits(p).replace(/^1(?=\d{10}$)/, "");
  return d.length === 10 ? `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}` : p;
}
