// services/pageContentApi.ts
const BASE_URL = "http://localhost:5118";

export type PageContentItem = {
  id: number;
  pageKey: string;
  title: string;
  excerpt: string;
  imageUrl: string | null;
  content: string | null;
  publishedAt: string | null;
};

function normalizeItem(raw: any): PageContentItem {
  return {
    id: Number(raw?.id),
    pageKey: String(raw?.pageKey ?? raw?.page_key ?? ""),
    title: String(raw?.title ?? ""),
    excerpt: String(raw?.excerpt ?? ""),
    imageUrl: raw?.imageUrl ?? raw?.image_url ?? null,
    content: raw?.content ?? null,
    publishedAt: raw?.publishedAt ?? raw?.published_at ?? null,
  };
}

export async function getPageContent(pageKey: string): Promise<PageContentItem[]> {
  const res = await fetch(`${BASE_URL}/api/pages/${encodeURIComponent(pageKey)}`);
  if (!res.ok) throw new Error(`GET /api/pages/${pageKey} failed: ${res.status}`);

  const data = await res.json();
  if (!Array.isArray(data)) return [];

  return data.map(normalizeItem);
}
