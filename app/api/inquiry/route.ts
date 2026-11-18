import { Resend } from "resend";
import { z } from "zod";

const inquirySchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(254),
  service: z.string().trim().max(120).default("Not specified"),
  details: z.string().trim().min(10).max(5000),
  website: z.string().max(0).optional(),
});

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const forwardedHost = request.headers.get("x-forwarded-host")?.split(",")[0].trim();
  const requestHost = forwardedHost ?? request.headers.get("host") ?? new URL(request.url).host;
  if (origin) {
    try {
      if (new URL(origin).host !== requestHost) {
        return Response.json({ error: "Request could not be verified." }, { status: 403 });
      }
    } catch {
      return Response.json({ error: "Request could not be verified." }, { status: 403 });
    }
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > 20_000) {
    return Response.json({ error: "Your message is too large." }, { status: 413 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Please check the form and try again." }, { status: 400 });
  }

  const parsed = inquirySchema.safeParse(payload);
  if (!parsed.success) {
    return Response.json({ error: "Please check your name, email, and message." }, { status: 400 });
  }

  if (parsed.data.website) {
    return Response.json({ ok: true });
  }

  const { RESEND_API_KEY, INQUIRY_FROM_EMAIL, INQUIRY_TO_EMAIL } = process.env;
  if (!RESEND_API_KEY || !INQUIRY_FROM_EMAIL || !INQUIRY_TO_EMAIL) {
    return Response.json({ error: "Email delivery is temporarily unavailable. Please try again later." }, { status: 503 });
  }

  const resend = new Resend(RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: INQUIRY_FROM_EMAIL,
    to: [INQUIRY_TO_EMAIL],
    replyTo: parsed.data.email,
    subject: `New project inquiry from ${parsed.data.name}`,
    text: [
      `Name: ${parsed.data.name}`,
      `Email: ${parsed.data.email}`,
      `Service: ${parsed.data.service || "Not specified"}`,
      "",
      "Project details:",
      parsed.data.details,
    ].join("\n"),
  });

  if (error) {
    return Response.json({ error: "We couldn’t send your inquiry. Please try again or email us directly." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
