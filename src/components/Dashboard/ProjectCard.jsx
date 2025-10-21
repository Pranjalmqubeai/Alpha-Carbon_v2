import React from "react";
import { Heart, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export default function ProjectCard({ p }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg transition">
      <div className="relative">
        <img src={p.thumb} alt={p.title} className="h-44 w-full object-cover" />
        <button className="absolute top-3 right-3 bg-white/90 rounded-full p-2 shadow-sm hover:bg-white">
          <Heart className="w-5 h-5 text-slate-700" />
        </button>
        <span className="absolute left-3 top-3 text-[11px] font-semibold tracking-wide text-white bg-slate-900/70 px-2.5 py-1 rounded">
          {p.kind}
        </span>
      </div>

      <div className="p-4">
        <div className="flex items-center gap-2 text-slate-500 text-sm mb-1">
          <MapPin className="w-4 h-4" />
          <span>{p.countryFlag} {p.country}</span>
        </div>

        <Link to={`/projects/${p.id}`} className="block">
          <h3 className="font-semibold text-slate-900 line-clamp-2 hover:text-emerald-700">
            {p.title}
          </h3>
        </Link>

        <div className="mt-3 flex items-center justify-between">
          <div className="text-slate-700 font-semibold">${p.price}</div>
          <div className="text-xs text-slate-500 flex items-center gap-1">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-600" />
            SDGs {p.sdgScore}
          </div>
        </div>
      </div>
    </div>
  );
}
