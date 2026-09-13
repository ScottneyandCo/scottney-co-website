import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, ChevronRight, Mail, Menu, Sparkles } from "lucide-react";
import ContactForm from "@/components/contact-form";
import { services } from "@/lib/services";

const projects = [
  { type: "Website design", title: "Your brand, built to convert", className: "project-web" },
  { type: "Campaign graphics", title: "A launch people notice", className: "project-campaign" },
  { type: "Program design", title: "The keepsake after the show", className: "project-program" },
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Scottney and Company home"><Image src="/scottney-logo.png" alt="Scottney & Co. Digital Marketing" width={180} height={180} priority /></a>
        <nav aria-label="Main navigation"><a href="#services">Services</a><Link href="/work">Work</Link><a href="#process">Process</a><a href="#contact">Contact</a></nav>
        <a className="button button-small" href="#contact">Start a project <ArrowUpRight size={17} /></a>
        <details className="mobile-menu"><summary aria-label="Open navigation"><Menu /></summary><div><a href="#services">Services</a><Link href="/work">Work</Link><a href="#process">Process</a><a href="#contact">Contact</a></div></details>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy"><p className="eyebrow"><Sparkles size={17} /> Creative services, made clear</p><h1>Big ideas.<br/><span>Bold execution.</span></h1><p className="hero-lede">Websites, visuals, audio, video, and print design that help your business look ready, sound confident, and sell clearly.</p><div className="hero-actions"><a className="button" href="#contact">Tell us what you need <ArrowUpRight /></a><a className="text-link" href="#services">Explore services <ChevronRight /></a></div><div className="hero-proof"><span>One creative partner</span><span>Clear deliverables</span><span>Built for your goals</span></div></div>
        <div className="hero-art" aria-hidden="true"><div className="logo-disc"><Image src="/scottney-logo.png" alt="" width={620} height={620} priority /></div><span className="star star-one">✦</span><span className="star star-two">✦</span><div className="orbit-text">WEB • PRINT • VOICE • VIDEO •</div></div>
      </section>

      <div className="ticker" aria-label="Services offered"><div>WEBSITES ✦ PHOTO EDITING ✦ VOICE-OVER ✦ COMMERCIALS ✦ FLYERS & POSTERS ✦ PROGRAMS & PLAYBILLS ✦</div></div>
      <section className="section services" id="services"><div className="section-heading"><p className="eyebrow">What we do</p><h2>Creative support from first idea to final file.</h2><p>Choose one service or combine several into a complete campaign. Either way, you’ll know exactly what you’re getting.</p></div><div className="service-grid">{services.map((service) => <article className={`service-card ${service.color}`} key={service.title}><span className="service-number">{service.number}</span><h3>{service.title}</h3><p>{service.intro}</p><h4>What’s included</h4><ul>{service.includes.map(item => <li key={item}><Check size={17}/>{item}</li>)}</ul><Link href={`/services#service-${service.number}`}>Learn more <ArrowUpRight size={18}/></Link></article>)}</div><div className="portfolio-note">Want the full breakdown of every service? <Link href="/services">See service details <ArrowUpRight size={18}/></Link></div></section>

      <section className="why"><div className="why-title"><p className="eyebrow light">Why Scottney & Co.</p><h2>Good creative work should do more than look good.</h2></div><div className="why-list"><article><strong>01</strong><div><h3>Everything works together</h3><p>Your website, campaign graphics, audio, video, and print pieces share one clear visual direction.</p></div></article><article><strong>02</strong><div><h3>Clear from the start</h3><p>You get a defined scope, straightforward feedback rounds, and deliverables you can actually use.</p></div></article><article><strong>03</strong><div><h3>Made for real people</h3><p>We balance bold ideas with clear messaging, easy reading, and the needs of your audience.</p></div></article></div></section>

      <section className="section work" id="work"><div className="section-heading split"><div><p className="eyebrow">Selected work</p><h2>See the work we&apos;re proud of.</h2></div><p>Browse real projects—starting with theatre programs, playbills, flyers, and posters, with more categories on the way.</p></div><div className="project-grid">{projects.map((project, index) => <article className={`project ${project.className}`} key={project.type}><div className="project-visual"><span>{String(index + 1).padStart(2,"0")}</span><div className="mock-lines"><i/><i/><i/></div></div><p>{project.type}</p><h3>{project.title}</h3></article>)}</div><div className="portfolio-note">Explore the full portfolio. <Link href="/work">View all work <ArrowUpRight size={18}/></Link></div></section>

      <section className="process" id="process"><div className="section-heading"><p className="eyebrow">How it works</p><h2>Simple process. No mystery.</h2></div><ol><li><span>1</span><div><h3>Tell us the goal</h3><p>Share what you need, who it’s for, your timing, and any ideas or existing materials.</p></div></li><li><span>2</span><div><h3>Get a clear plan</h3><p>We’ll confirm the scope, deliverables, timeline, and custom quote before work begins.</p></div></li><li><span>3</span><div><h3>Review the work</h3><p>You’ll see the creative direction, share focused feedback, and approve the final result.</p></div></li><li><span>4</span><div><h3>Put it to work</h3><p>Receive polished, ready-to-use files—or launch your new website with confidence.</p></div></li></ol></section>

      <section className="pricing"><div><p className="eyebrow light">Pricing & inquiries</p><h2>Your project is unique.<br/>Your quote should be too.</h2></div><div><p>Pricing depends on scope, timing, and the final deliverables. Tell us what you’re creating and we’ll respond with a straightforward recommendation and custom quote—without the confusing extras.</p><a className="button button-cream" href="#contact">Request a quote <ArrowUpRight/></a></div></section>

      <section className="contact section" id="contact"><div className="contact-copy"><p className="eyebrow">Let’s make something</p><h2>Ready when you are.</h2><p>Tell us what you need and where you are in the process. We’ll follow up to talk through the details.</p><div className="contact-direct"><Mail/><div><span>Prefer email?</span><a href="mailto:info@scottneyandco.com">info@scottneyandco.com</a></div></div></div><ContactForm services={services.map((service) => service.title)} /></section>

      <footer><a className="footer-logo" href="#top"><Image src="/scottney-logo.png" alt="Scottney & Co." width={200} height={200}/></a><p>Creative services for brands, businesses, and big ideas.</p><div><a href="#services">Services</a><Link href="/work">Work</Link><a href="#contact">Contact</a></div><small>© {new Date().getFullYear()} Scottney & Co. All rights reserved.</small></footer>
    </main>
  );
}
