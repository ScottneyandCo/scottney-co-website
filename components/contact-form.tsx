"use client";

import { ArrowUpRight } from "lucide-react";

export default function ContactForm({ services }: { services: string[] }) {
  return (
    <form action="https://docs.google.com/forms/d/e/1FAIpQLSeRWZyR26B-9X4uUTptzdo-h2m0odOsm-gIfm31zZhG5rHIvg/formResponse" method="POST" target="_blank" onSubmit={(event) => {
      const form = event.currentTarget;
      const firstName = form.elements.namedItem("firstName") as HTMLInputElement;
      const lastName = form.elements.namedItem("lastName") as HTMLInputElement;
      const fullName = form.elements.namedItem("entry.1853324919") as HTMLInputElement;
      fullName.value = `${firstName.value} ${lastName.value}`.trim();
    }}>
      <div className="field-row"><label>First name<input required name="firstName" autoComplete="given-name" placeholder="Your first name" maxLength={80}/></label><label>Last name<input required name="lastName" autoComplete="family-name" placeholder="Your last name" maxLength={80}/></label></div>
      <input type="hidden" name="entry.1853324919" />
      <label>Email address<input required type="email" name="entry.134440961" autoComplete="email" placeholder="you@example.com" maxLength={254}/></label>
      <label>What service are you interested in?<select required name="entry.314909382" defaultValue=""><option value="" disabled>Select a service</option>{services.map(service => <option key={service}>{service}</option>)}<option>Multiple services</option><option>I’m not sure yet</option></select></label>
      <label>Tell us about your project<textarea required name="entry.448924368" rows={5} placeholder="What are you creating, who is it for, and when do you need it?" maxLength={5000}/></label>
      <input type="hidden" name="entry.377038451" value="I'm flexible" />
      <input type="hidden" name="entry.1616271578" value="$100–$250" />
      <input type="hidden" name="entry.451416824" value="Will discuss during consultation" />
      <input type="hidden" name="entry.1940986486" value="No" />
      <input type="hidden" name="entry.1349408893" value="Medium" />
      <button className="button" type="submit">Send project inquiry <ArrowUpRight/></button>
    </form>
  );
}
