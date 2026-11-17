import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Check, Menu, Sparkles } from "lucide-react";

const googleInquiryUrl =
  "https://docs.google.com/forms/d/e/1FAIpQLSeRWZyR26B-9X4uUTptzdo-h2m0odOsm-gIfm31zZhG5rHIvg/viewform";

export const metadata: Metadata = {
  title: "Website Design & Pricing | Scottney & Co.",
  description:
    "Explore custom website design packages from Scottney & Co., including landing pages, small business websites, e-commerce, and redesigns.",
};

const packages = [
  {
    category: "Starter options",
    tone: "teal",
    plans: [
      { name: "Starter Landing Page", detail: "A focused one-page site", price: "$300" },
      { name: "Basic Website", detail: "Up to 3 pages", price: "$500" },
      { name: "Small Business Website", detail: "Up to 5 pages", price: "$750" },
    ],
    included: ["Mobile-friendly", "Clean layout", "Basic contact info", "Launch-ready"],
  },
  {
    category: "Business packages",
    tone: "pink",
    plans: [
      { name: "Professional Website", detail: "Up to 8 pages", price: "$1,100" },
      { name: "Advanced Website", detail: "Up to 10 pages", price: "$1,500" },
      { name: "Website Redesign", detail: "Refresh your existing site", price: "From $600" },
    ],
    included: ["Custom design", "Polished branding", "Stronger user experience", "Room to grow"],
  },
  {
    category: "Specialty options",
    tone: "yellow",
    plans: [
      { name: "E-commerce Starter Site", detail: "Online store setup", price: "From $1,500" },
      { name: "Custom / Advanced Website", detail: "Tailored functionality", price: "Quote required" },
    ],
    included: ["Online selling", "Custom features", "Built for your business", "Flexible solutions"],
  },
];

function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="Scottney and Company home">
        <Image src="/scottney-logo.png" alt="Scottney & Co. Digital Marketing" width={180} height={180} priority />
      </Link>
      <nav aria-label="Main navigation">
        <Link href="/services">Services</Link>
        <Link href="/#work">Work</Link>
        <Link href="/#process">Process</Link>
        <Link href="/#contact">Contact</Link>
      </nav>
      <Link className="button button-small" href={googleInquiryUrl} target="_blank" rel="noreferrer">
        Start a project <ArrowUpRight size={17} />
      </Link>
      <details className="mobile-menu">
        <summary aria-label="Open navigation"><Menu /></summary>
        <div>
          <Link href="/services">Services</Link>
          <Link href="/#work">Work</Link>
          <Link href="/#process">Process</Link>
          <Link href="/#contact">Contact</Link>
        </div>
      </details>
    </header>
  );
}

export default function WebsiteDesignPage() {
  return (
    <main className="website-design-page">
      <SiteHeader />
      <section className="web-design-hero">
        <div className="web-design-copy">
          <p className="eyebrow"><Sparkles size={17} /> Scottney & Co. website design</p>
          <h1>Websites<br /><span>that work.</span></h1>
          <p className="web-design-lede">
            Turn your ideas into a clean, custom website that feels like your brand and makes the next step easy for your customers.
          </p>
          <div className="hero-actions">
            <Link className="button" href="#pricing">See website pricing <ArrowDown size={18} /></Link>
            <Link className="text-link" href={googleInquiryUrl} target="_blank" rel="noreferrer">Start a project <ArrowUpRight size={18} /></Link>
          </div>
          <div className="web-design-proof"><span>Mobile-friendly</span><span>Custom-designed</span><span>Built around your goals</span></div>
        </div>
        <a className="web-design-poster" href="#pricing" aria-label="View website design pricing">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Website%20Design-IMX43MGN55ooiWb0VfRTCdb3JkkRni.png"
            alt="Scottney & Co. website design pricing poster showing starter, business, and specialty website packages"
            width={1103}
            height={1426}
            unoptimized
            priority
          />
          <span>Explore the packages <ArrowDown size={17} /></span>
        </a>
      </section>

      <div className="ticker" aria-label="Website design benefits"><div>CLEAN & CUSTOM ✦ MOBILE-FRIENDLY ✦ BUILT TO WORK ✦ MADE FOR YOUR BUSINESS ✦</div></div>

      <section className="web-pricing-section" id="pricing" aria-labelledby="web-pricing-title">
        <div className="web-pricing-heading">
          <p className="eyebrow">Simple starting points</p>
          <h2 id="web-pricing-title">A site that fits<br />where you&apos;re going.</h2>
          <p>Choose a starting package, then we&apos;ll shape the scope around your content, goals, and the features your business needs.</p>
        </div>
        <div className="website-package-grid">
          {packages.map((group) => (
            <article className={`website-package ${group.tone}`} key={group.category}>
              <h3>{group.category}</h3>
              <div className="website-plan-list">
                {group.plans.map((plan) => (
                  <div className="website-plan" key={plan.name}>
                    <div><h4>{plan.name}</h4><p>{plan.detail}</p></div>
                    <strong>{plan.price}</strong>
                  </div>
                ))}
              </div>
              <ul>
                {group.included.map((item) => <li key={item}><Check size={18} />{item}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="website-quote-band">
        <div><p className="eyebrow light">Have a bigger idea?</p><h2>Custom quotes<br />are always welcome.</h2></div>
        <div><p>Great for online stores, events, creators, and businesses with a more specific vision. Tell us what you have in mind and we&apos;ll recommend the right scope.</p><Link className="button button-cream" href={googleInquiryUrl} target="_blank" rel="noreferrer">Continue to project inquiry <ArrowUpRight size={18} /></Link></div>
      </section>

      <footer>
        <Link className="footer-logo" href="/"><Image src="/scottney-logo.png" alt="Scottney & Co." width={200} height={200} /></Link>
        <p>Creative services for brands, businesses, and big ideas.</p>
        <div><Link href="/services">Services</Link><Link href="/#work">Work</Link><Link href="/#contact">Contact</Link></div>
        <small>© {new Date().getFullYear()} Scottney & Co. All rights reserved.</small>
      </footer>
    </main>
  );
}
