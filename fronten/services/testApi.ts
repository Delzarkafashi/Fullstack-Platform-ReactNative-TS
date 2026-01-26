const BASE_URL = "http://localhost:5118";

export async function getTests() {
  const res = await fetch(`${BASE_URL}/api/Test`);
  return res.json();
}

export async function createTest(name: string) {
  const res = await fetch(`${BASE_URL}/api/Test`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  return res.json();
}
