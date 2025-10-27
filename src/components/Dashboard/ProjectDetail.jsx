import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft, ExternalLink, MapPin, Globe2, Building2,
  Leaf, BadgeCheck, FileText, Layers, ArrowRight
} from "lucide-react";
import { fetchProjectById } from "../../lib/Api";
import { adaptProject } from "../../lib/ProjectApi";

function StatPill({ icon:Icon, label, value, sub }) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-white/70 backdrop-blur-sm border border-slate-200 px-4 py-3">
      <div className="p-2 rounded-lg bg-emerald-50">
        <Icon className="w-5 h-5 text-emerald-700" />
      </div>
      <div>
        <div className="text-xs uppercase tracking-wide text-slate-500">{label}</div>
        <div className="text-slate-900 font-semibold">
          {value} {sub && <span className="text-slate-500 font-normal">{sub}</span>}
        </div>
      </div>
    </div>
  );
}

function KeyRow({ k, v }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2">
      <div className="text-slate-500 text-sm">{k}</div>
      <div className="text-slate-900 text-sm font-medium text-right break-words">{v || "—"}</div>
    </div>
  );
}

function Pill({ children }) {
  return (
    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
      {children}
    </span>
  );
}

function TabButton({ active, onClick, children, icon:Icon }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition
        ${active ? "bg-emerald-600 text-white shadow-sm" : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"}`}
    >
      {Icon && <Icon className={`w-4 h-4 ${active ? "text-white" : "text-emerald-700"}`} />}
      {children}
    </button>
  );
}

function SectionCard({ title, children, icon:Icon }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-4">
        {Icon && <Icon className="w-5 h-5 text-emerald-700" />}
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

export default function ProjectDetail() {
  const { id } = useParams();
  const [p, setP] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [tab, setTab] = useState("overview"); // overview | vintages | cert | activity

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      setErr("");
      try {
        const apiObj = await fetchProjectById(id);
        if (mounted) setP(adaptProject(apiObj));
      } catch (e) {
        if (mounted) setErr(e.message || "Failed to load project");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 lg:px-6 py-16">
        <Link to="/" className="inline-flex items-center gap-2 text-emerald-700 hover:underline">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>
        <div className="mt-6 h-64 rounded-2xl bg-slate-100 animate-pulse" />
        <div className="mt-6 h-48 rounded-2xl bg-slate-100 animate-pulse" />
      </div>
    );
  }

  if (err || !p) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-16">
        <Link to="/" className="inline-flex items-center gap-2 text-emerald-700 hover:underline">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>
        <h1 className="mt-4 text-2xl font-bold text-slate-900">Project not found</h1>
        {err && <p className="mt-2 text-red-600">{err}</p>}
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-emerald-50/40 to-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4 lg:px-6 py-6">
        {/* Back + breadcrumb-ish header */}
        <div className="flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-2 text-emerald-700 hover:underline">
            <ArrowLeft className="w-4 h-4" /> Back to projects
          </Link>
          <div className="hidden md:flex items-center gap-2">
            <Pill>{p.kind || "Project"}</Pill>
            {p.country && <Pill>{p.countryFlag} {p.country}</Pill>}
            <Pill>SDGs {p.sdgScore ?? (p.sdgs?.length || 0)}</Pill>
          </div>
        </div>

        {/* Hero with gradient overlay */}
        <div className="mt-6 relative overflow-hidden rounded-2xl border border-slate-200">
          <div className="relative h-72 md:h-80 lg:h-96">
            <img
              src={p.images?.[0] || p.thumb}
              alt={p.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/70 via-slate-900/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 text-xs text-white/80 mb-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-400"></span>
                  {p.kind}
                </div>
                <h1 className="text-3xl lg:text-4xl font-extrabold text-white leading-tight drop-shadow">
                  {p.title}
                </h1>
                <p className="mt-2 text-slate-100/90 line-clamp-2">{p.description}</p>
              </div>
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl">
                <StatPill icon={Layers} label="Price" value={`$${p.price ?? 0}`} sub="/ tCO2e" />
                <StatPill icon={Leaf} label="SDGs Covered" value={p.sdgScore ?? (p.sdgs?.length || 0)} />
                <StatPill icon={MapPin} label="Country" value={`${p.countryFlag || ""} ${p.country || "—"}`} />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-6 flex items-center gap-2 flex-wrap">
          <TabButton active={tab==="overview"} onClick={()=>setTab("overview")} icon={BadgeCheck}>Overview</TabButton>
          <TabButton active={tab==="vintages"} onClick={()=>setTab("vintages")} icon={Layers}>Vintages</TabButton>
          <TabButton active={tab==="cert"} onClick={()=>setTab("cert")} icon={FileText}>Certification</TabButton>
          <TabButton active={tab==="activity"} onClick={()=>setTab("activity")} icon={ArrowRight}>Activity</TabButton>
        </div>

        {/* Main grid */}
        <div className="mt-6 grid lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {tab === "overview" && (
              <>
                <SectionCard title="Project overview" icon={BadgeCheck}>
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Map or placeholder */}
                    {p.coords ? (
                      <div className="rounded-xl overflow-hidden border border-slate-200">
                        <iframe
                          title="map"
                          width="100%"
                          height="260"
                          loading="lazy"
                          src={`https://maps.google.com/maps?q=${p.coords.lat},${p.coords.lng}&z=6&output=embed`}
                        />
                      </div>
                    ) : (
                      <div className="rounded-xl border border-dashed border-slate-300 p-6 flex items-center justify-center text-slate-500">
                        Map data not available
                      </div>
                    )}

                    {/* Highlights */}
                    <div className="space-y-3">
                      <KeyRow k="Name" v={p.title} />
                      <KeyRow k="Location" v={`${p.countryFlag || ""} ${p.country || "—"}`} />
                      <KeyRow k="Developer" v={p.info?.company} />
                      <KeyRow k="Mechanism" v={p.info?.mechanism} />
                      <KeyRow k="Type" v={p.info?.type} />
                      <KeyRow k="Characteristics" v={p.info?.characteristics} />
                    </div>
                  </div>

                  {/* Impact tiles if any */}
                  {Array.isArray(p.impacts) && p.impacts.length > 0 && (
                    <div className="pt-2">
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {p.impacts.map((i, idx) => (
                          <div key={idx} className="rounded-xl overflow-hidden border border-slate-200 group">
                            <div className="relative h-32">
                              <img src={i.image} alt={i.title} className="w-full h-full object-cover group-hover:scale-105 transition" />
                              <div className="absolute inset-0 bg-slate-900/30" />
                              <div className="absolute bottom-2 left-3 text-white font-semibold drop-shadow">
                                {i.title}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </SectionCard>

                {p.longText?.length > 0 && (
                  <SectionCard title="Deep dive">
                    <div className="prose prose-slate max-w-none">
                      {p.longText.map((t, i) => (
                        <p key={i} className="text-slate-700">{t}</p>
                      ))}
                    </div>
                  </SectionCard>
                )}
              </>
            )}

            {tab === "vintages" && (
              <SectionCard title="Available vintages" icon={Layers}>
                {p.vintages?.length ? (
                  <div className="overflow-x-auto rounded-xl border border-slate-200">
                    <table className="w-full text-left">
                      <thead className="bg-slate-50 text-slate-600 text-sm">
                        <tr>
                          <th className="py-3 px-4">Year</th>
                          <th className="px-4">Volume</th>
                          <th className="px-4">Price</th>
                          <th className="px-4"></th>
                        </tr>
                      </thead>
                      <tbody className="text-slate-800">
                        {p.vintages.map((v, idx) => (
                          <tr key={idx} className="border-t border-slate-100">
                            <td className="py-3 px-4">{v.year ?? "—"}</td>
                            <td className="px-4">
                              {v?.volume?.toLocaleString?.() ?? v?.volume ?? "—"} {v?.unit ?? ""}
                            </td>
                            <td className="px-4">
                              {typeof v?.price === "number" ? `$${v.price}` : (v?.price ?? "—")}
                              {v?.unit ? ` ${v.unit}` : ""}
                            </td>
                            <td className="px-4">
                              <button className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-sm hover:bg-emerald-700">
                                Select
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-slate-500">No vintage data available.</div>
                )}
              </SectionCard>
            )}

            {tab === "cert" && (
              <SectionCard title="Certification & registry" icon={FileText}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
                    <div className="text-slate-500">Registry</div>
                    <div className="font-medium text-slate-900">{p.info?.registry || "—"}</div>

                    <div className="text-slate-500">Registry URL</div>
                    <div>
                      {p.info?.registryUrl ? (
                        <a href={p.info.registryUrl} className="text-emerald-700 inline-flex items-center gap-1 hover:underline">
                          {p.info.registryUrl} <ExternalLink className="w-4 h-4" />
                        </a>
                      ) : "—"}
                    </div>

                    <div className="text-slate-500">Validator</div>
                    <div className="font-medium text-slate-900">{p.info?.validator || "—"}</div>

                    <div className="text-slate-500">Status</div>
                    <div className="font-medium text-slate-900">{p.info?.status || "—"}</div>

                    <div className="text-slate-500">Credit start</div>
                    <div className="font-medium text-slate-900">{p.info?.creditStart || "—"}</div>

                    <div className="text-slate-500">Credit end</div>
                    <div className="font-medium text-slate-900">{p.info?.creditEnd || "—"}</div>
                  </div>

                  <div>
                    <div className="text-slate-500 mb-2">Documents</div>
                    <div className="flex flex-wrap gap-3">
                      {p.info?.docs?.length ? (
                        p.info.docs.map((d, i) => (
                          <a
                            key={`${d.label}-${i}`}
                            href={d.url}
                            className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-emerald-700 hover:bg-emerald-50 inline-flex items-center gap-2 text-sm"
                          >
                            <FileText className="w-4 h-4" />
                            {d.label}
                          </a>
                        ))
                      ) : (
                        <span className="text-slate-500">—</span>
                      )}
                    </div>
                  </div>
                </div>
              </SectionCard>
            )}

            {tab === "activity" && (
              <SectionCard title="Recent activity & transactions" icon={ArrowRight}>
                {p.transactions?.length ? (
                  <div className="divide-y divide-slate-200">
                    {p.transactions.map((t, idx) => (
                      <div key={idx} className="py-3 flex items-center justify-between text-slate-700">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">🏳️</span>
                          <span className="text-slate-500">{t.country}</span>
                        </div>
                        <div className="font-semibold">${Number(t.amount).toFixed(2)}</div>
                        <div className="text-slate-500">{t.units} tCO2e</div>
                        <div className="text-slate-500">{t.date}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-slate-500">No recent transactions.</div>
                )}
              </SectionCard>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Building2 className="w-5 h-5 text-emerald-700" />
                <h3 className="text-lg font-semibold text-slate-900">Developer</h3>
              </div>
              <div className="space-y-3 text-sm">
                <KeyRow k="Company" v={p.info?.company} />
                <KeyRow k="Address" v={p.info?.address} />
                <div className="flex items-center justify-between gap-4">
                  <div className="text-slate-500 text-sm">Website</div>
                  <div className="text-right">
                    {p.info?.website ? (
                      <a href={p.info.website} className="inline-flex items-center gap-1 text-emerald-700 hover:underline">
                        <Globe2 className="w-4 h-4" />
                        {p.info.website?.replace(/^https?:\/\//, "").slice(0, 24)}
                      </a>
                    ) : <span className="text-slate-500 text-sm">—</span>}
                  </div>
                </div>
                <KeyRow k="Blockchain" v={p.info?.blockchain} />
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Leaf className="w-5 h-5 text-emerald-700" />
                <h3 className="text-lg font-semibold text-slate-900">SDGs</h3>
              </div>
              {p.sdgs?.length ? (
                <div className="flex flex-wrap gap-2">
                  {p.sdgs.map((n) => (
                    <span key={n} className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
                      SDG #{n}
                    </span>
                  ))}
                </div>
              ) : (
                <div className="text-slate-500 text-sm">No SDGs listed.</div>
              )}
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Quick actions</h3>
              <div className="grid gap-2">
                <a
                  href={p.info?.registryUrl || "#"}
                  className="px-4 py-2.5 rounded-lg bg-emerald-600 text-white text-sm font-medium flex items-center justify-between hover:bg-emerald-700"
                  target="_blank" rel="noreferrer"
                >
                  View on registry <ExternalLink className="w-4 h-4" />
                </a>
                {p.info?.website && (
                  <a
                    href={p.info.website}
                    className="px-4 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-800 text-sm font-medium flex items-center justify-between hover:bg-slate-50"
                    target="_blank" rel="noreferrer"
                  >
                    Visit project site <Globe2 className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="mt-10 bg-white border border-slate-200 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="text-slate-900 font-semibold text-lg">Ready to proceed?</div>
            <div className="text-slate-600 text-sm">Select a vintage and continue to reserve or purchase credits.</div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="px-4 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-800 font-medium hover:bg-slate-50"
            >
              Browse more projects
            </Link>
            <button className="px-5 py-2.5 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700">
              Continue <span className="ml-1">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
