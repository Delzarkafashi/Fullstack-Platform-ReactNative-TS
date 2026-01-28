const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5118";

export async function apiGet(path) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { Accept: "application/json" },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`GET ${path} failed ${res.status} ${text}`);
  }

  return res.json();
}
