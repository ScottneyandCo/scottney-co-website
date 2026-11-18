import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServicePricingPage from "@/components/service-pricing-page";
import { pricingSlugs, servicePricing } from "@/lib/service-pricing";

type PricingRouteProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return pricingSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PricingRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const page = servicePricing[slug];

  if (!page) {
    return { title: "Pricing | Scottney & Co." };
  }

  return {
    title: `${page.title} Pricing | Scottney & Co.`,
    description: page.description,
  };
}

export default async function PricingRoute({ params }: PricingRouteProps) {
  const { slug } = await params;
  const page = servicePricing[slug];

  if (!page) notFound();

  return <ServicePricingPage page={page} />;
}
