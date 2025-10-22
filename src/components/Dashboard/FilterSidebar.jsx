import React from "react";

export default function FilterSidebar() {
  return (
    <aside className="hidden lg:block w-64 flex-shrink-0">
      <div className="sticky top-6 space-y-4">
        <h4 className="text-slate-900 font-semibold">Filters</h4>

        {/* Project kind */}
        <details className="group border-t border-slate-200 pt-4" open>
          <summary className="cursor-pointer text-slate-900 font-semibold mb-2">
            Project kind
          </summary>
          <div className="space-y-2 pl-1">
            {[
              ["Biodiversity", "bg-green-500"],
              ["Carbon forward", "bg-slate-600"],
              ["Carbon offsetting", "bg-blue-600"],
              ["Contribution", "bg-yellow-400"],
              ["Energy Attributes (EACs)", "bg-emerald-500"],
            ].map(([label, dot]) => (
              <label key={label} className="flex items-center gap-2 text-sm text-slate-700">
                <span className={`inline-block h-2 w-2 rounded-full ${dot}`} />
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 text-emerald-600"
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </details>

        {/* Project name */}
        <details className="border-t border-slate-200 pt-4" open>
          <summary className="cursor-pointer text-slate-900 font-semibold">
            Project name
          </summary>
          <div className="mt-3">
            <input
              type="text"
              placeholder="Search by name…"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-100"
            />
          </div>
        </details>

        {/* Vintage */}
        <details className="border-t border-slate-200 pt-4" open>
          <summary className="cursor-pointer text-slate-900 font-semibold">
            Vintage
          </summary>
          <div className="mt-3 space-y-2">
            {["2022", "2021", "2020", "2019", "2018"].map((y) => (
              <label key={y} className="flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 text-emerald-600"
                />
                <span>{y}</span>
              </label>
            ))}
          </div>
        </details>

        {/* Registry */}
        <details className="border-t border-slate-200 pt-4" open>
          <summary className="cursor-pointer text-slate-900 font-semibold">
            Registry
          </summary>
          <div className="mt-3 space-y-2">
            {["Verra Registry", "Gold Standard", "ACR", "CAR"].map((reg) => (
              <label key={reg} className="flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 text-emerald-600"
                />
                <span>{reg}</span>
              </label>
            ))}
          </div>
        </details>
      </div>
    </aside>
  );
}
