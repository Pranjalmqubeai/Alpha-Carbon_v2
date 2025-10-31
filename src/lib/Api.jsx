import BASE_URL from "../BaseUrl";
const API_BASE = BASE_URL

export async function fetchProjects({ pageUrl } = {}) {
  const url = pageUrl ?? `${API_BASE}/projects/projectsapi/`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to load projects: ${res.status}`);
  return res.json(); 
}

export async function fetchProjectById(id) {
  const res = await fetch(`${API_BASE}/projects/projectsapi/${id}/`);
  if (!res.ok) throw new Error(`Project ${id} not found`);
  return res.json(); 
}
