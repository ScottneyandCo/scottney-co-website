export type PortfolioCategory = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  sort_order: number;
  created_at: string;
};

export type PortfolioItem = {
  id: string;
  category_id: string;
  owner_id: string;
  title: string;
  details: string | null;
  image_path: string;
  sort_order: number;
  published: boolean;
  created_at: string;
  updated_at: string;
};

export function portfolioImageUrl(path: string): string {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  return `${base}/storage/v1/object/public/portfolio/${path}`;
}
