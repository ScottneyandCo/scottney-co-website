import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, ChevronRight, Menu, Sparkles } from "lucide-react";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services | Scottney & Co.",
  description:
    "A detailed look at every Scottney & Co. service: website design, photo editing, voice-over, commercials, digital marketing, flyers, posters, programs, and playbills.",
};

export default function ServicesPage() {
  return (
    <main>
      <header className="site-header">
        <Link className="brand" href="/" aria-label="Scottney and Company home">
          <Image src="/scottney-logo.png" alt="Scottney & Co. Digital Marketing" width={180} height={180} priority />
        </Link>
        <nav aria-label="Main navigation">
          <Link href="/services">Services</Link>
          <Link href="/work">Work</Link>
          <Link href="/#process">Process</Link>
          <Link href="/#contact">Contact</Link>
        </nav>
        <Link className="button button-small" href="/#contact">Start a project <ArrowUpRight size={17} /></Link>
        <details className="mobile-menu">
          <summary aria-label="Open navigation"><Menu /></summary>
          <div>
            <Link href="/services">Services</Link>
            <Link href="/work">Work</Link>
            <Link href="/#process">Process</Link>
            <Link href="/#contact">Contact</Link>
          </div>
        </details>
      </header>

      <section className="services-hero">
        <p className="eyebrow"><Sparkles size={17} /> Everything we make</p>
        <h1>Services, in full detail.</h1>
        <p className="services-hero-lede">
          Six ways we help you look ready, sound confident, and sell clearly. Pick one, or combine several into a complete
          campaign—each with a defined scope and deliverables you can actually use.
        </p>
        <nav className="service-jump" aria-label="Jump to a service">
          {services.map((service) => (
            <a className={`jump-chip ${service.color}`} key={service.number} href={`#service-${service.number}`}>
              <span>{service.number}</span> {service.title}
            </a>
          ))}
        </nav>
      </section>

      <div className="ticker" aria-label="Services offered">
        <div>WEBSITES ✦ PHOTO EDITING ✦ VOICE-OVER ✦ COMMERCIALS ✦ FLYERS & POSTERS ✦ PROGRAMS & PLAYBILLS ✦</div>
      </div>

      <div className="service-detail-list">
        {services.map((service, index) => (
          <section
            className={`service-detail ${service.color}`}
            id={`service-${service.number}`}
            key={service.number}
            aria-labelledby={`service-${service.number}-title`}
          >
            <div className="service-detail-lead">
              <span className="service-detail-number">{service.number}</span>
              <h2 id={`service-${service.number}-title`}>{service.title}</h2>
              <p className="service-detail-intro">{service.intro}</p>
              <p className="service-detail-body">{service.detail}</p>
              <Link className="button" href="/#contact">Request this service <ArrowUpRight size={18} /></Link>
            </div>
            <div className="service-detail-panels">
              <div className="detail-panel">
                <h3>What&apos;s included</h3>
                <ul>
                  {service.includes.map((item) => (
                    <li key={item}><Check size={17} />{item}</li>
                  ))}
                </ul>
              </div>
              <div className="detail-panel">
                <h3>Ideal for</h3>
                <ul className="ideal-list">
                  {service.idealFor.map((item) => (
                    <li key={item}><ChevronRight size={17} />{item}</li>
                  ))}
                </ul>
              </div>
            </div>
            <span className="service-detail-index" aria-hidden="true">
              {index + 1}/{services.length}
            </span>
          </section>
        ))}
      </div>

      <section className="pricing">
        <div>
          <p className="eyebrow light">Pricing & inquiries</p>
          <h2>Not sure which services you need?</h2>
        </div>
        <div>
          <p>
            Tell us the goal and we&apos;ll recommend the right mix, then send a straightforward custom quote based on scope,
            timing, and final deliverables—no confusing extras.
          </p>
          <Link className="button button-cream" href="/#contact">Request a quote <ArrowUpRight /></Link>
        </div>
      </section>

      <footer>
        <Link className="footer-logo" href="/">
          <Image src="/scottney-logo.png" alt="Scottney & Co." width={200} height={200} />
        </Link>
        <p>Creative services for brands, businesses, and big ideas.</p>
        <div>
          <Link href="/services">Services</Link>
          <Link href="/work">Work</Link>
          <Link href="/#contact">Contact</Link>
        </div>
        <small>© {new Date().getFullYear()} Scottney & Co. All rights reserved.</small>
      </footer>
    </main>
  );
}
