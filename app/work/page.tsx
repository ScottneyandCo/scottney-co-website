import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Menu, Sparkles } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { portfolioImageUrl, type PortfolioCategory, type PortfolioItem } from "@/lib/portfolio";

export const metadata: Metadata = {
  title: "Work | Scottney & Co.",
  description:
    "Browse the Scottney & Co. portfolio—theatre programs, playbills, flyers, posters, and more creative work, organized by category.",
};

export default async function WorkIndexPage() {
  const supabase = await createClient();

  const { data: categories } = await supabase
    .from("portfolio_categories")
    .select("*")
    .order("sort_order", { ascending: true });

  const { data: items } = await supabase
    .from("portfolio_items")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true });

  const categoryList = (categories as PortfolioCategory[]) ?? [];
  const itemList = (items as PortfolioItem[]) ?? [];

  const coverFor = (categoryId: string) =>
    itemList.find((item) => item.category_id === categoryId);
  const countFor = (categoryId: string) =>
    itemList.filter((item) => item.category_id === categoryId).length;

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

      <section className="work-hero">
        <p className="eyebrow"><Sparkles size={17} /> Selected work</p>
        <h1>Our portfolio.</h1>
        <p className="work-hero-lede">
          Real projects, organized by category. Start with theatre programs, playbills, flyers, and posters—with more
          on the way as we add new work.
        </p>
      </section>

      <div className="category-grid">
        {categoryList.map((category) => {
          const cover = coverFor(category.id);
          const count = countFor(category.id);
          return (
            <Link className="category-card" href={`/work/${category.slug}`} key={category.id}>
              <div className="category-card-media">
                {cover ? (
                  <Image
                    src={portfolioImageUrl(cover.image_path)}
                    alt={cover.title}
                    fill
                    sizes="(max-width:760px) 100vw, 360px"
                  />
                ) : (
                  <span className="category-card-empty">Coming soon</span>
                )}
              </div>
              <div className="category-card-body">
                <h2>{category.name}</h2>
                {category.description ? <p>{category.description}</p> : null}
                <span className="category-card-count">
                  {count} {count === 1 ? "piece" : "pieces"} <ArrowUpRight size={15} />
                </span>
              </div>
            </Link>
          );
        })}
      </div>

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
