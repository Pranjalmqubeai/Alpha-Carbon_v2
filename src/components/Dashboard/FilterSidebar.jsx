import React from "react";

export default function FilterSidebar() {
  return (
    <aside className="hidden lg:block w-64 flex-shrink-0">
      <div className="sticky top-6 space-y-4">
        <h4 className="text-slate-900 font-semibold">Popular Filters</h4>

        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-emerald-600" />
          Favourites
        </label>

        <details className="group border-t border-slate-200 pt-4">
          <summary className="cursor-pointer text-slate-900 font-semibold mb-2">Project kind</summary>
          <div className="space-y-2 pl-1">
            {[
              ["Biodiversity","bg-green-500"],
              ["Carbon forward","bg-slate-600"],
              ["Carbon offsetting","bg-blue-600"],
              ["Contribution","bg-yellow-400"],
              ["Energy Attributes (EACs)","bg-emerald-500"]
            ].map(([label, dot]) => (
              <label key={label} className="flex items-center gap-2 text-sm text-slate-700">
                <span className={`inline-block h-2 w-2 rounded-full ${dot}`} />
                <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-emerald-600" />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </details>

        {["Country","Vintage","Price","Stock","Project name","Standard type","Registry","Mechanism","SDGs","Characteristics","Type"].map((sec)=>(
          <details key={sec} className="border-t border-slate-200 pt-4">
            <summary className="cursor-pointer text-slate-900 font-semibold">{sec}</summary>
            <div className="mt-2 text-sm text-slate-600">—</div>
          </details>
        ))}
      </div>
    </aside>
  );
}
