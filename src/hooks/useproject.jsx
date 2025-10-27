import { useEffect, useMemo, useState } from "react";
import { fetchProjects } from "../lib/Api";
import { adaptProject } from "../lib/ProjectApi";

export function useProjects() {
  const [projects, setProjects] = useState([]);
  const [count, setCount] = useState(0);
  const [next, setNext] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function load(url) {
    setLoading(true);
    setError("");
    try {
      const data = await fetchProjects({ pageUrl: url });
      setCount(data.count ?? 0);
      setNext(data.next ?? null);
      setProjects((prev) => [
        ...prev,
        ...((data.results ?? []).map(adaptProject)),
      ]);
    } catch (e) {
      setError(e.message || "Failed to load");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load(); // initial page
  }, []);

  const hasMore = !!next;
  const loadMore = () => (next ? load(next) : undefined);

  return { projects, count, hasMore, loadMore, loading, error };
}
