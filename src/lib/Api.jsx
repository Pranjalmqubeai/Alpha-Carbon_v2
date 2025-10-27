const API_BASE ="http://127.0.0.1:8000";

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
