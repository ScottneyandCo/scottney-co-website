import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Menu } from "lucide-react";
import type { ServicePricingPage as ServicePricingPageData } from "@/lib/service-pricing";

const inquiryUrl = "https://docs.google.com/forms/d/e/1FAIpQLSeRWZyR26B-9X4uUTptzdo-h2m0odOsm-gIfm31zZhG5rHIvg/viewform";

type ServicePricingPageProps = {
  page: ServicePricingPageData;
};

export default function ServicePricingPage({ page }: ServicePricingPageProps) {
  return (
    <main className="pricing-page">
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
        <Link className="button button-small" href={inquiryUrl} target="_blank" rel="noreferrer">
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

      <section className="pricing-page-hero">
        <Link className="pricing-back-link" href="/services"><ArrowLeft size={17} /> All services</Link>
        <p className="eyebrow">Scottney & Co. / clear pricing</p>
        <h1>{page.title}<span>.</span></h1>
        <p>{page.description}</p>
        <Link className="button" href={inquiryUrl} target="_blank" rel="noreferrer">
          Ask about a project <ArrowUpRight size={18} />
        </Link>
      </section>

      <div className="ticker" aria-label="Service pricing"><div>STRAIGHTFORWARD PRICING ✦ CLEAR SCOPE ✦ MADE FOR YOUR PROJECT ✦</div></div>

      <section className="pricing-catalog" aria-label={`${page.title} pricing`}>
        {page.groups.map((group) => (
          <section className="pricing-catalog-group" key={group.title}>
            <div className="pricing-group-heading">
              <h2>{group.title}</h2>
            </div>
            <div className="pricing-option-grid">
              {group.options.map((option) => (
                <article className="pricing-option" key={option.name}>
                  <div className="pricing-option-copy">
                    <h3>{option.name}</h3>
                    {option.detail && <p>{option.detail}</p>}
                    {option.secondaryPrice && <p className="pricing-secondary">Annual billing: {option.secondaryPrice}</p>}
                  </div>
                  <strong>{option.price}</strong>
                </article>
              ))}
            </div>
          </section>
        ))}
      </section>

      <section className="pricing-clarity-band">
        <div>
          <p className="eyebrow light">Need something custom?</p>
          <h2>Let&apos;s scope it together.</h2>
        </div>
        <div>
          <p>Share what you&apos;re planning and we&apos;ll confirm the scope, timeline, and final price before work begins.</p>
          <Link className="button button-cream" href={inquiryUrl} target="_blank" rel="noreferrer">
            Request a quote <ArrowUpRight size={18} />
          </Link>
        </div>
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
