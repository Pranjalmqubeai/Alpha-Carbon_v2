import React, { useState } from "react";
import { ChevronDown, Search, Filter, Grid3x3, LayoutGrid } from "lucide-react";
import { useNavigate } from "react-router-dom";
// REMOVE: import { PROJECTS } from "../data/project";
import { useProjects } from "../hooks/useproject";
import ProjectCard from "../components/Dashboard/ProjectCard"; // your existing card that expects {p}

const CATEGORIES = ["All Projects", "Renewable Energy", "Conservation", "Ocean Conservation", "Reforestation"];
const FILTERS = [
  { label: "Impact Level", options: ["High", "Medium", "Low"] },
  { label: "Price Range", options: ["< $50k", "$50k - $100k", "> $100k"] },
  { label: "Location", options: ["North America", "South America", "Europe", "Asia", "Africa"] }
];

function FilterSection({ title, options }) {
  const [expanded, setExpanded] = useState(true);
  return (
    <div className="border-b border-gray-100 pb-4">
      <button onClick={() => setExpanded(!expanded)} className="flex items-center justify-between w-full text-left mb-3">
        <span className="font-semibold text-gray-900">{title}</span>
        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expanded ? 'rotate-180' : ''}`} />
      </button>
      {expanded && (
        <div className="space-y-2">
          {options.map((option, idx) => (
            <label key={idx} className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />
              <span className="text-sm text-gray-700 group-hover:text-gray-900">{option}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Dashboard() {
  const [selectedCategory, setSelectedCategory] = useState("All Projects");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");

  const { projects, count, hasMore, loadMore, loading, error } = useProjects();

  // Light client-side filtering (optional)
  const filtered = projects.filter((p) => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return true;
    return (
      p.title?.toLowerCase().includes(q) ||
      p.country?.toLowerCase().includes(q) ||
      p.kind?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50/30">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Climate Projects</h1>
              <p className="text-gray-600">Discover and invest in impactful environmental initiatives</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors">
                <Filter className="w-5 h-5 text-gray-600" />
              </button>
              <button 
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                className="p-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                {viewMode === 'grid' ? <LayoutGrid className="w-5 h-5 text-gray-600" /> : <Grid3x3 className="w-5 h-5 text-gray-600" />}
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects by name, location, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none text-gray-900 placeholder-gray-400"
            />
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-xl font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            <span className="font-semibold text-gray-900">{count}</span> climate projects available
          </p>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 hover:bg-white transition-colors bg-white/50 backdrop-blur-sm">
            <span className="text-sm font-medium text-gray-700">Sort by: Top Rated</span>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {error && (
          <div className="mb-6 text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">{error}</div>
        )}

        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="w-80 flex-shrink-0">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900">Filters</h2>
                <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">Clear all</button>
              </div>
              <div className="space-y-6">
                {FILTERS.map((filter) => (
                  <FilterSection key={filter.label} title={filter.label} options={filter.options} />
                ))}
              </div>
            </div>
          </aside>

          {/* Grid */}
          <main className="flex-1">
            {loading && projects.length === 0 ? (
              <div className="p-8 text-center text-gray-600">Loading projects…</div>
            ) : (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {filtered.map((p) => (
                    <ProjectCard key={p.id} p={p} />
                  ))}
                </div>

                <div className="mt-12 text-center">
                  {hasMore ? (
                    <button
                      onClick={loadMore}
                      className="px-8 py-3.5 bg-white hover:bg-gray-50 text-gray-900 rounded-xl font-medium border border-gray-200 transition-colors shadow-sm disabled:opacity-50"
                      disabled={loading}
                    >
                      {loading ? "Loading…" : "Load More Projects"}
                    </button>
                  ) : (
                    <span className="text-gray-500">No more projects</span>
                  )}
                </div>
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
