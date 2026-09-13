"use client";

import { FormEvent, useState } from "react";
import { ArrowUpRight } from "lucide-react";

const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

export default function ContactForm({ services }: { services: string[] }) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function submitInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!ACCESS_KEY) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    if (data.companyWebsite) {
      form.reset();
      setStatus("success");
      return;
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `New ${data.service} inquiry from ${data.firstName} ${data.lastName}`,
          from_name: "Scottney & Co. Website",
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          replyto: data.email,
          service: data.service,
          message: data.details,
        }),
      });
      const result = (await response.json()) as { success?: boolean };
      if (response.ok && result.success) {
        form.reset();
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={submitInquiry}>
      <div className="field-row"><label>First name<input required name="firstName" autoComplete="given-name" placeholder="Your first name" maxLength={80}/></label><label>Last name<input required name="lastName" autoComplete="family-name" placeholder="Your last name" maxLength={80}/></label></div>
      <label>Email address<input required type="email" name="email" autoComplete="email" placeholder="you@example.com" maxLength={254}/></label>
      <label>What service are you interested in?<select required name="service" defaultValue=""><option value="" disabled>Select a service</option>{services.map(service => <option key={service}>{service}</option>)}<option>Multiple services</option><option>I’m not sure yet</option></select></label>
      <label>Tell us about your project<textarea required name="details" rows={5} placeholder="What are you creating, who is it for, and when do you need it?" maxLength={5000}/></label>
      <input className="honey" name="companyWebsite" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <button className="button" type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Send project inquiry"} <ArrowUpRight/></button>
      <div className="form-status" role="status" aria-live="polite">
        {status === "success" && "Thanks! Your inquiry was sent. We’ll be in touch soon."}
        {status === "error" && "We couldn’t send your message. Please try again or email us directly."}
      </div>
    </form>
  );
}
