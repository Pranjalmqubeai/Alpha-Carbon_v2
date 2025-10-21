import React from "react";
import { ChevronDown, Search } from "lucide-react";
import { PROJECTS } from "../data/project";
import ProjectCard from "../components/Dashboard/ProjectCard.jsx";
import FilterSidebar from "../components/Dashboard/FilterSidebar.jsx";

export default function Dashboard() {
  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
        {/* Header pills */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-3">
            {["Carbon offsetting","Removals","Biodiversity"].map((t,i)=>(
              <button
                key={t}
                className={`px-5 py-2.5 rounded-2xl border ${i===0 ? "bg-white border-slate-300 shadow-sm" : "bg-white/60 border-transparent"} text-slate-700 hover:bg-white`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                placeholder="Search projects..."
                className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-100"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
            <button className="inline-flex items-center gap-1 text-sm text-slate-700 bg-white border border-slate-200 px-3 py-2 rounded-lg">
              Sort by: <span className="font-semibold ml-1">Top Sellers</span> <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Count */}
        <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-6">
          3 climate projects available
        </h2>

        <div className="flex gap-8">
          {/* Left: filters */}
          <FilterSidebar />

          {/* Right: grid */}
          <div className="flex-1">
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {PROJECTS.map((p) => (
                <ProjectCard key={p.id} p={p} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
