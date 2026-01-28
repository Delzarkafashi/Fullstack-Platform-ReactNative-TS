import { apiGet } from "./apiClient";

export async function getResidents() {
  return apiGet("/api/residents");
}

export async function getResidentById(id) {
  return apiGet(`/api/residents/${id}`);
}

export async function getCarePlan(id) {
  return apiGet(`/api/residents/${id}/care-plan`);
}

export async function getDocumentation(id) {
  return apiGet(`/api/residents/${id}/documentation`);
}

export async function createDocumentation(id, payload) {
  const res = await fetch(`${import.meta.env.VITE_API_URL ?? "https://localhost:7110"}${`/api/residents/${id}/documentation`}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(txt || "Kunde inte spara dokumentation");
  }

  return res.json();
}
