import React from "react";
import { Heart, MapPin, Leaf } from "lucide-react";
import { Link } from "react-router-dom";

export default function ProjectCard({ p }) {
  return (
    <Link
      to={`/projects/${p.id}`}
      className="
        group
        rounded-2xl
        overflow-hidden
        bg-white
        border
        border-slate-200
        hover:border-emerald-400/70
        hover:shadow-xl
        hover:shadow-emerald-400/10
        transition-all
        duration-300
        cursor-pointer
        relative
      "
    >
      {/* Thumbnail */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={p.thumb}
          alt={p.title}
          className="
            w-full h-full object-cover
            transition-all duration-500
            group-hover:scale-110
            group-hover:brightness-105
          "
        />

        {/* Top overlay tag */}
        <span
          className="
            absolute left-3 top-3 text-[11px]
            font-semibold tracking-wide
            text-white
            bg-black/60 backdrop-blur-sm
            px-2.5 py-1 rounded-full
            shadow
          "
        >
          {p.kind}
        </span>

        {/* Favorite */}
        <button
          type="button"
          className="
            absolute top-3 right-3 p-2
            bg-white/90 rounded-full shadow-sm
            hover:bg-white
          "
        >
          <Heart className="text-rose-500 w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        {/* Location */}
        <div className="flex items-center gap-2 text-slate-500 text-sm">
          <MapPin className="w-4 h-4" />
          <span className="font-medium">
            {p.countryFlag} {p.country}
          </span>
        </div>

        {/* Title */}
        <h3
          className="
            font-semibold text-slate-900
            text-lg leading-snug
            group-hover:text-emerald-700
            transition-colors
            line-clamp-2
          "
        >
          {p.title}
        </h3>

        {/* SDG badge + Price */}
        <div className="flex items-center justify-between pt-2">
          <div className="text-xl font-bold text-slate-900">
            ${p.price}
            <span className="text-xs text-slate-500 ml-1">/tCO2e</span>
          </div>

          <div
            className="
              text-xs px-2 py-1 rounded-full
              bg-emerald-600/10 text-emerald-700
              flex items-center gap-1
              font-medium
            "
          >
            <Leaf className="w-3 h-3" />
            SDGs {p.sdgScore}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-slate-100" />

        {/* Impact bar */}
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>Climate Impact</span>
          <span className="font-semibold text-emerald-600">
            {p.sdgScore >= 6 ? "High" : "Medium"}
          </span>
        </div>

        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-emerald-400 to-emerald-600 h-full"
            style={{ width: `${p.sdgScore * 10}%` }}
          />
        </div>
      </div>
    </Link>
  );
}
