// src/pages/Dashboard.jsx
import React, { useState } from "react";
import { ChevronDown, Search, Filter, Grid3x3, LayoutGrid } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PROJECTS } from "../data/project";

const CATEGORIES = ["All Projects", "Renewable Energy", "Conservation", "Ocean Conservation", "Reforestation"];
const FILTERS = [
  { label: "Impact Level", options: ["High", "Medium", "Low"] },
  { label: "Price Range", options: ["< $50k", "$50k - $100k", "> $100k"] },
  { label: "Location", options: ["North America", "South America", "Europe", "Asia", "Africa"] }
];

function ProjectCard({ project }) {
  const navigate = useNavigate();
  const go = () => navigate(`/projects/${project.id}`);

  return (
    <div
      onClick={go}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && go()}
    >
      <div className="relative overflow-hidden h-56">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium text-gray-700">
          {project.category}
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <div className="flex items-center gap-1 text-yellow-400 text-sm">
            <span>★</span>
            <span className="text-white font-medium">{project.rating}</span>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Location</span>
            <span className="text-gray-900 font-medium">{project.location}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Impact</span>
            <span className="text-emerald-600 font-medium">{project.impact}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <span className="text-2xl font-bold text-gray-900">{project.price}</span>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); go(); }}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium transition-colors"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

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
            <span className="font-semibold text-gray-900">{PROJECTS.length}</span> climate projects available
          </p>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 hover:bg-white transition-colors bg-white/50 backdrop-blur-sm">
            <span className="text-sm font-medium text-gray-700">Sort by: Top Rated</span>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </button>
        </div>

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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {PROJECTS.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>

            <div className="mt-12 text-center">
              <button className="px-8 py-3.5 bg-white hover:bg-gray-50 text-gray-900 rounded-xl font-medium border border-gray-200 transition-colors shadow-sm">
                Load More Projects
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
