"use client";

import { ArrowUpRight } from "lucide-react";

const googleFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSeRWZyR26B-9X4uUTptzdo-h2m0odOsm-gIfm31zZhG5rHIvg/viewform";

export default function ContactForm({ services }: { services: string[] }) {
  return (
    <form onSubmit={(event) => {
      event.preventDefault();
      window.location.href = googleFormUrl;
    }}>
      <div className="field-row"><label>First name<input required name="firstName" autoComplete="given-name" placeholder="Your first name" maxLength={80}/></label><label>Last name<input required name="lastName" autoComplete="family-name" placeholder="Your last name" maxLength={80}/></label></div>
      <label>Email address<input required type="email" name="email" autoComplete="email" placeholder="you@example.com" maxLength={254}/></label>
      <label>What service are you interested in?<select required name="service" defaultValue=""><option value="" disabled>Select a service</option>{services.map(service => <option key={service}>{service}</option>)}<option>Multiple services</option><option>I’m not sure yet</option></select></label>
      <label>Tell us about your project<textarea required name="message" rows={5} placeholder="What are you creating, who is it for, and when do you need it?" maxLength={5000}/></label>
      <button className="button" type="submit">Continue to project inquiry <ArrowUpRight/></button>
    </form>
  );
}
