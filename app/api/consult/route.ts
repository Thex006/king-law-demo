import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { validateConsult } from "@/lib/consult";

/**
 * Demo backend: requests are appended to data/consults.jsonl on this machine (no paid services, nothing leaves the PC).
 * On Vercel only /tmp is writable, so there it lands in /tmp/data (temporary, per instance).
 * In production this would go to the firm's inbox or case management system.
 */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, errors: { form: "Bad request" } }, { status: 400 });
  }
  const { ok, data, errors, spam } = validateConsult(body);
  if (!ok || !data) return NextResponse.json({ ok: false, errors }, { status: 422 });
  if (!spam) {
    const dir = process.env.VERCEL ? "/tmp/data" : path.join(process.cwd(), "data");
    const { website: _hp, ...rest } = data;
    void _hp;
    await mkdir(dir, { recursive: true });
    await appendFile(path.join(dir, "consults.jsonl"), JSON.stringify({ ...rest, at: new Date().toISOString() }) + "\n");
  }
  return NextResponse.json({ ok: true });
}
