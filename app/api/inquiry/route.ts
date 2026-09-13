import { NextResponse } from "next/server";

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

    const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      console.error("Inquiry email is not configured: WEB3FORMS_ACCESS_KEY is missing");
      return NextResponse.json({ error: "Email is not configured" }, { status: 503 });
    }

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `New ${service} inquiry from ${firstName} ${lastName}`,
        from_name: "Scottney & Co. Website",
        name: `${firstName} ${lastName}`,
        email,
        replyto: email,
        service,
        message: details,
      }),
    });

    const result = (await response.json().catch(() => ({}))) as { success?: boolean };
    if (!response.ok || !result.success) {
      console.error("Web3Forms rejected inquiry", { status: response.status });
      return NextResponse.json({ error: "Unable to send inquiry" }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Inquiry submission failed", { error: String(error) });
    return NextResponse.json({ error: "Unable to send inquiry" }, { status: 500 });
  }
}
