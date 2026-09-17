export const runtime = "nodejs";

type Inquiry = {
  firstName?: unknown;
  lastName?: unknown;
  email?: unknown;
  service?: unknown;
  details?: unknown;
};

const text = (value: unknown, maximum: number) =>
  typeof value === "string" ? value.trim().slice(0, maximum) : "";

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.INQUIRY_FROM_EMAIL;
  const to = process.env.INQUIRY_TO_EMAIL;

  if (!apiKey || !from || !to) {
    console.error("Contact email is not configured");
    return Response.json({ error: "Email service is unavailable." }, { status: 503 });
  }

  let inquiry: Inquiry;
  try {
    inquiry = (await request.json()) as Inquiry;
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const firstName = text(inquiry.firstName, 80);
  const lastName = text(inquiry.lastName, 80);
  const email = text(inquiry.email, 254);
  const service = text(inquiry.service, 160);
  const details = text(inquiry.details, 5_000);

 
  }

  if (!firstName || !lastName || !service || !details || !/^\S+@\S+\.\S+$/.test(email)) {
    return Response.json({ error: "Please complete all required fields." }, { status: 400 });
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `New ${service} inquiry from ${firstName} ${lastName}`,
        text: `Name: ${firstName} ${lastName}\nEmail: ${email}\nService: ${service}\n\n${details}`,
      }),
    });

    if (!response.ok) {
      console.error("Resend rejected contact email", response.status);
      return Response.json({ error: "Email service is unavailable." }, { status: 502 });
    }
  } catch (error) {
    console.error("Contact email request failed", error);
    return Response.json({ error: "Email service is unavailable." }, { status: 502 });
  }

  return Response.json({ success: true });
}
