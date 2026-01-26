const BASE_URL = "http://localhost:5118";

export type ArticleListItem = {
  id: number;
  title: string;
  excerpt: string;
  imageUrl?: string | null;
  category: string;
  publishedAt: string;
};

export type ArticleDetails = ArticleListItem & {
  content: string;
};

export async function getArticles(): Promise<ArticleListItem[]> {
  const res = await fetch(`${BASE_URL}/api/articles`);
  if (!res.ok) throw new Error(`GET /api/articles failed: ${res.status}`);
  return res.json();
}

export async function getArticleById(id: number): Promise<ArticleDetails> {
  const res = await fetch(`${BASE_URL}/api/articles/${id}`);
  if (!res.ok) throw new Error(`GET /api/articles/${id} failed: ${res.status}`);
  return res.json();
}
