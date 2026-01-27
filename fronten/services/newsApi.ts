export type NewsListItem = {
  id: number;
  title: string;
  slug: string;
  publishedAt: string;
};

export type NewsDetails = {
  id: number;
  title: string;
  slug: string;
  category: string;
  publishedAt: string;
  content: string;
};

const BASE_URL = "http://localhost:5118";

export async function getNews(): Promise<NewsListItem[]> {
  const res = await fetch(`${BASE_URL}/api/news`);
  if (!res.ok) throw new Error("Failed to load news");
  return res.json();
}

export async function getNewsBySlug(slug: string): Promise<NewsDetails> {
  const res = await fetch(`${BASE_URL}/api/news/${slug}`);
  if (!res.ok) throw new Error("Failed to load news details");
  return res.json();
}
