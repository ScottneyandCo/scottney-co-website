import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, ChevronLeft, Menu } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { PortfolioGallery } from "@/components/portfolio-gallery";
import type { PortfolioCategory, PortfolioItem } from "@/lib/portfolio";

type Params = { params: Promise<{ slug: string }> };

async function getCategory(slug: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("portfolio_categories")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  return (data as PortfolioCategory | null) ?? null;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategory(slug);
  if (!category) return { title: "Work | Scottney & Co." };
  return {
    title: `${category.name} | Scottney & Co.`,
    description: category.description ?? `${category.name} by Scottney & Co.`,
  };
}

export default async function CategoryPage({ params }: Params) {
  const { slug } = await params;
  const category = await getCategory(slug);
  if (!category) notFound();

  const supabase = await createClient();
  const { data: items } = await supabase
    .from("portfolio_items")
    .select("*")
    .eq("category_id", category.id)
    .eq("published", true)
    .order("sort_order", { ascending: true });

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

      <section className="gallery-hero">
        <Link className="back-link" href="/work">
          <ChevronLeft size={16} /> All work
        </Link>
        <h1>{category.name}</h1>
        {category.description ? <p>{category.description}</p> : null}
      </section>

      <PortfolioGallery items={(items as PortfolioItem[]) ?? []} />

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
