import { describe, expect, it } from "vitest";
import { formatPhone, validateConsult } from "@/lib/consult";

const good = { name: "Jordan Lee", phone: "912 555 0142", charge: "DUI, first offense", ack: true };

describe("validateConsult", () => {
  it("accepts a complete request", () => {
    const r = validateConsult(good);
    expect(r.ok).toBe(true);
    expect(r.errors).toEqual({});
  });
  it("requires name, phone, charge and the acknowledgement", () => {
    const r = validateConsult({});
    expect(r.ok).toBe(false);
    expect(Object.keys(r.errors).sort()).toEqual(["ack", "charge", "name", "phone"]);
  });
  it("accepts +1 numbers and rejects short ones", () => {
    expect(validateConsult({ ...good, phone: "+1 (912) 470-9324" }).ok).toBe(true);
    expect(validateConsult({ ...good, phone: "470-9324" }).errors.phone).toBeDefined();
  });
  it("checks optional email and court date only when given", () => {
    expect(validateConsult({ ...good, email: "nope" }).errors.email).toBeDefined();
    expect(validateConsult({ ...good, courtDate: "2026-12-03" }).ok).toBe(true);
    expect(validateConsult({ ...good, courtDate: "next week" }).errors.courtDate).toBeDefined();
  });
  it("flags the honeypot as spam without failing validation", () => {
    const r = validateConsult({ ...good, website: "http://spam.example" });
    expect(r.ok).toBe(true);
    expect(r.spam).toBe(true);
  });
  it("trims and caps long input", () => {
    const r = validateConsult({ ...good, message: "x".repeat(5000) });
    expect(r.data?.message?.length).toBe(2000);
  });
});

describe("formatPhone", () => {
  it("formats 10 and 11 digit numbers", () => {
    expect(formatPhone("9124709324")).toBe("(912) 470-9324");
    expect(formatPhone("+1 912 470 9324")).toBe("(912) 470-9324");
  });
});
