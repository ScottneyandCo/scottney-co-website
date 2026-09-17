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
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
  const to = process.env.INQUIRY_TO_EMAIL;

  if (!accessKey) {
    console.error("Contact form is not configured");
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

  if (!firstName || !lastName || !service || !details || !/^\S+@\S+\.\S+$/.test(email)) {
    return Response.json({ error: "Please complete all required fields." }, { status: 400 });
  }

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `New ${service} inquiry from ${firstName} ${lastName}`,
        from_name: `${firstName} ${lastName}`,
        email,
        ...(to ? { to } : {}),
        name: `${firstName} ${lastName}`,
        service,
        message: `Name: ${firstName} ${lastName}\nEmail: ${email}\nService: ${service}\n\n${details}`,
      }),
    });

    const result = (await response.json().catch(() => null)) as { success?: boolean } | null;

    if (!response.ok || !result?.success) {
      console.error("Web3Forms rejected contact submission", response.status);
      return Response.json({ error: "Email service is unavailable." }, { status: 502 });
    }
  } catch (error) {
    console.error("Contact form request failed", error);
    return Response.json({ error: "Email service is unavailable." }, { status: 502 });
  }

  return Response.json({ success: true });
}
