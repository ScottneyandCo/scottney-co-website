import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PortfolioAdmin } from "@/components/portfolio-admin";
import type { PortfolioCategory, PortfolioItem } from "@/lib/portfolio";

export const metadata: Metadata = {
  title: "Manage work | Scottney & Co.",
  robots: { index: false, follow: false },
};

export default async function AdminPortfolioPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: categories } = await supabase
    .from("portfolio_categories")
    .select("*")
    .order("sort_order", { ascending: true });

  const { data: items } = await supabase
    .from("portfolio_items")
    .select("*")
    .order("category_id", { ascending: true })
    .order("sort_order", { ascending: true });

  return (
    <PortfolioAdmin
      userId={user.id}
      userEmail={user.email ?? ""}
      categories={(categories as PortfolioCategory[]) ?? []}
      initialItems={(items as PortfolioItem[]) ?? []}
    />
  );
}
