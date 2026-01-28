import { apiGet } from "./apiClient";

export async function getResidents() {
  return apiGet("/api/residents");
}

export async function getResidentById(id) {
  return apiGet(`/api/residents/${id}`);
}
