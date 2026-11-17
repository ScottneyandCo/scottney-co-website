"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/lib/services";

export default function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<{ message: string; success: boolean } | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    setSubmitting(true);
    setStatus(null);

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData.entries())),
      });
      const result = (await response.json()) as { error?: string; ok?: boolean };

      if (!response.ok || !result.ok) {
        setStatus({
          message: result.error ?? "We couldn’t send your inquiry. Please try again.",
          success: false,
        });
        return;
      }

      form.reset();
      setStatus({
        message: "Thanks for reaching out. Your project inquiry has been sent.",
        success: true,
      });
    } catch {
      setStatus({
        message: "We couldn’t connect to send your inquiry. Please try again shortly.",
        success: false,
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form id="inquiry-form" onSubmit={handleSubmit}>
      <h3 id="inquiry-form-title">Tell us about your project</h3>
      <div className="field-row">
        <label>
          Your name
          <input name="name" autoComplete="name" required minLength={2} maxLength={100} />
        </label>
        <label>
          Email address
          <input name="email" type="email" autoComplete="email" required maxLength={254} />
        </label>
      </div>
      <label>
        Service you&apos;re interested in
        <select name="service" defaultValue="">
          <option value="">Choose a service (optional)</option>
          {services.map((service) => (
            <option key={service.slug} value={service.title}>{service.title}</option>
          ))}
        </select>
      </label>
      <label>
        What are you looking to create?
        <textarea name="details" rows={5} required minLength={10} maxLength={5000} />
      </label>
      <label className="honey" aria-hidden="true">
        Leave this field empty
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      <button className="button" type="submit" disabled={submitting}>
        {submitting ? "Sending inquiry…" : "Send project inquiry"} <ArrowUpRight aria-hidden="true" />
      </button>
      {status && (
        <p className="form-status" role={status.success ? "status" : "alert"}>
          {status.message}
        </p>
      )}
      <p className="form-note">Your details are only used to respond to this inquiry.</p>
    </form>
  );
}
