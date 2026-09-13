import { NextResponse } from "next/server";

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character] || character);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    if (body.companyWebsite) return NextResponse.json({ ok: true });

    const firstName = String(body.firstName || "").trim().slice(0, 80);
    const lastName = String(body.lastName || "").trim().slice(0, 80);
    const email = String(body.email || "").trim().slice(0, 254);
    const service = String(body.service || "").trim().slice(0, 100);
    const details = String(body.details || "").trim().slice(0, 5000);
    if (!firstName || !lastName || !service || !details || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: "Invalid form submission" }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.INQUIRY_TO_EMAIL;
    const from = process.env.INQUIRY_FROM_EMAIL || "Scottney & Co. Website <onboarding@resend.dev>";
    if (!apiKey || !to) {
      console.error("Inquiry email is not configured");
      return NextResponse.json({ error: "Email is not configured" }, { status: 503 });
    }

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `New ${service} inquiry from ${firstName} ${lastName}`,
        html: `<div style="font-family:Arial,sans-serif;max-width:640px"><h1>New project inquiry</h1><p><strong>Name:</strong> ${escapeHtml(firstName)} ${escapeHtml(lastName)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p><strong>Service:</strong> ${escapeHtml(service)}</p><p><strong>Project details:</strong></p><p style="white-space:pre-wrap">${escapeHtml(details)}</p></div>`,
      }),
    });

    if (!response.ok) {
      console.error("Resend rejected inquiry email", { status: response.status });
      return NextResponse.json({ error: "Unable to send inquiry" }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Inquiry submission failed", { error: String(error) });
    return NextResponse.json({ error: "Unable to send inquiry" }, { status: 500 });
  }
}
