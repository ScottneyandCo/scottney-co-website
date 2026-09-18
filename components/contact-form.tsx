"use client";

import { ArrowUpRight } from "lucide-react";

export default function ContactForm({ services }: { services: string[] }) {
  return (
    <form action="https://api.web3forms.com/submit" method="POST">
      <input type="hidden" name="access_key" value={process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? ""} />
      <input type="hidden" name="subject" value="New project inquiry from Scottney & Co." />
      <input type="hidden" name="redirect" value="https://scottneyandco.com/#contact" />
      <div className="field-row"><label>First name<input required name="name" autoComplete="given-name" placeholder="Your first name" maxLength={80}/></label><label>Last name<input required name="last_name" autoComplete="family-name" placeholder="Your last name" maxLength={80}/></label></div>
      <label>Email address<input required type="email" name="email" autoComplete="email" placeholder="you@example.com" maxLength={254}/></label>
      <label>What service are you interested in?<select required name="service" defaultValue=""><option value="" disabled>Select a service</option>{services.map(service => <option key={service}>{service}</option>)}<option>Multiple services</option><option>I’m not sure yet</option></select></label>
      <label>Tell us about your project<textarea required name="message" rows={5} placeholder="What are you creating, who is it for, and when do you need it?" maxLength={5000}/></label>
      <button className="button" type="submit">Send project inquiry <ArrowUpRight/></button>
    </form>
  );
}
