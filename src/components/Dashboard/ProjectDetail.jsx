import React, { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { PROJECTS } from "../../data/project";
import { ArrowLeft, ExternalLink } from "lucide-react";

function Section({ title, children, defaultOpen=false }) {
  return (
    <details open={defaultOpen} className="border-t border-slate-200 pt-6">
      <summary className="cursor-pointer text-lg font-semibold text-slate-900 mb-3">
        {title}
      </summary>
      <div className="space-y-4">{children}</div>
    </details>
  );
}

export default function ProjectDetail() {
  const { id } = useParams();
  const project = useMemo(() => PROJECTS.find(p => p.id === id), [id]);

  if (!project) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-16">
        <Link to="/" className="inline-flex items-center gap-2 text-emerald-700 hover:underline">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>
        <h1 className="mt-4 text-2xl font-bold text-slate-900">Project not found</h1>
      </div>
    );
  }

  const p = project;

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 lg:px-6 py-8">
        <Link to="/" className="inline-flex items-center gap-2 text-emerald-700 hover:underline">
          <ArrowLeft className="w-4 h-4" /> Back to projects
        </Link>

        {/* Hero */}
        <div className="mt-6 bg-white border border-slate-200 rounded-2xl overflow-hidden">
          <div className="grid lg:grid-cols-2">
            <img src={p.images?.[0] || p.thumb} alt={p.title} className="h-72 w-full object-cover" />
            <div className="p-6 lg:p-8">
              <span className="inline-block text-xs tracking-wide bg-slate-900 text-white px-3 py-1 rounded">
                {p.kind}
              </span>
              <h1 className="mt-3 text-3xl font-bold text-slate-900">{p.title}</h1>
              <p className="text-slate-600 mt-2">{p.description}</p>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <div className="text-slate-900">
                  <div className="text-sm text-slate-500">Price</div>
                  <div className="text-2xl font-bold">${p.price} <span className="text-sm font-medium text-slate-500">/ tCO2e</span></div>
                </div>
                <div className="h-8 w-px bg-slate-200" />
                <div className="text-slate-900">
                  <div className="text-sm text-slate-500">Country</div>
                  <div className="text-lg font-semibold">{p.countryFlag} {p.country}</div>
                </div>
                <div className="h-8 w-px bg-slate-200" />
                <div className="text-slate-900">
                  <div className="text-sm text-slate-500">SDGs covered</div>
                  <div className="font-semibold">{p.sdgScore}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Collapsible sections */}
        <div className="mt-8 bg-white border border-slate-200 rounded-2xl p-6">
          <Section title="Description" defaultOpen>
            <div className="text-slate-700">
              <p><span className="font-semibold">Name:</span> {p.title}</p>
              <p><span className="font-semibold">Location:</span> {p.country}</p>
              <p><span className="font-semibold">Developer:</span> {p.info.company}</p>
            </div>
          </Section>

          <Section title="Sustainable Development Goals" defaultOpen>
            <div className="grid md:grid-cols-2 gap-4">
              {p.sdgs.map((n)=>(
                <div key={n} className="flex items-center gap-3 border border-slate-200 rounded-xl p-3">
                  <div className="w-8 h-8 rounded bg-emerald-600 text-white font-bold flex items-center justify-center">{n}</div>
                  <div className="text-slate-700">SDG #{n}</div>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Project info" defaultOpen>
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Map */}
              <div className="rounded-xl overflow-hidden border border-slate-200">
                <iframe
                  title="map"
                  width="100%"
                  height="260"
                  loading="lazy"
                  src={`https://maps.google.com/maps?q=${p.coords.lat},${p.coords.lng}&z=6&output=embed`}
                />
              </div>

              {/* Key-value */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-slate-700">
                <div className="text-slate-500">Country</div><div className="font-medium">{p.country}</div>
                <div className="text-slate-500">Company</div><div className="font-medium">{p.info.company}</div>
                <div className="text-slate-500">Company Address</div><div className="font-medium">{p.info.address}</div>
                <div className="text-slate-500">Web</div>
                <div>
                  <a href={p.info.website} className="text-emerald-700 hover:underline inline-flex items-center gap-1">
                    {p.info.website?.replace(/^https?:\/\//,"").slice(0,32)} <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
                <div className="text-slate-500">Blockchain Address</div><div className="font-medium truncate">{p.info.blockchain}</div>
                <div className="text-slate-500">Type</div><div className="font-medium">{p.info.type}</div>
                <div className="text-slate-500">Mechanism</div><div className="font-medium">{p.info.mechanism}</div>
                <div className="text-slate-500">Characteristics</div><div className="font-medium">{p.info.characteristics}</div>
              </div>
            </div>
          </Section>

          <Section title="Impact">
            <div className="grid md:grid-cols-3 gap-4">
              {p.impacts.map((i)=>(
                <div key={i.title} className="rounded-xl overflow-hidden border border-slate-200">
                  <div className="relative">
                    <img src={i.image} alt={i.title} className="h-32 w-full object-cover" />
                    <div className="absolute inset-0 bg-slate-900/30" />
                    <div className="absolute bottom-2 left-3 text-white font-semibold">{i.title}</div>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Vintage">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-slate-700">
                <thead>
                  <tr className="text-slate-500 text-sm">
                    <th className="py-2">Year</th>
                    <th>Volume</th>
                    <th>Price</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {p.vintages.map((v)=>(
                    <tr key={v.year} className="border-t border-slate-100">
                      <td className="py-3">{v.year}</td>
                      <td>{v.volume.toLocaleString()} {v.unit}</td>
                      <td>${v.price} {v.unit}</td>
                      <td>
                        <button className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-sm hover:bg-emerald-700">
                          Select
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          <Section title="Certification">
            <div className="grid md:grid-cols-2 gap-6 text-sm text-slate-700">
              <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                <div className="text-slate-500">Registry Name</div><div className="font-medium">{p.info.registry}</div>
                <div className="text-slate-500">Registry Url</div>
                <div>
                  <a href={p.info.registryUrl} className="text-emerald-700 hover:underline inline-flex items-center gap-1">
                    {p.info.registryUrl} <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
                <div className="text-slate-500">Validator</div><div className="font-medium">{p.info.validator}</div>
                <div className="text-slate-500">Status</div><div className="font-medium">{p.info.status}</div>
                <div className="text-slate-500">Type</div><div className="font-medium">{p.info.type}</div>
                <div className="text-slate-500">Credit start</div><div className="font-medium">{p.info.creditStart}</div>
                <div className="text-slate-500">Credit end</div><div className="font-medium">{p.info.creditEnd}</div>
              </div>
              <div>
                <div className="text-slate-500 mb-1">Validation documentation</div>
                <div className="flex flex-wrap gap-3">
                  {p.info.docs.map((d)=>(
                    <a key={d.label} href={d.url} className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-emerald-700 hover:bg-emerald-50">
                      {d.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </Section>

          <Section title="What is a carbon offsetting project?">
            <p className="text-slate-700">
              Carbon offsetting funds projects that reduce or remove greenhouse gases to compensate emissions and progress toward net zero.
            </p>
          </Section>

          <Section title="Understanding the project" defaultOpen>
            <div className="space-y-3 text-slate-700">
              {p.longText.map((t, idx)=> <p key={idx}>{t}</p>)}
            </div>
          </Section>

          <Section title="Last transactions">
            <div className="divide-y divide-slate-200">
              {p.transactions.map((t,idx)=>(
                <div key={idx} className="py-3 flex items-center justify-between text-slate-700">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{t.country === "GB" ? "🇬🇧" : t.country === "IT" ? "🇮🇹" : t.country === "DE" ? "🇩🇪" : "🏳️"}</span>
                    <span className="text-slate-500">{t.country}</span>
                  </div>
                  <div className="font-semibold">${t.amount.toFixed(2)}</div>
                  <div className="text-slate-500">{t.units} tCO2e</div>
                  <div className="text-slate-500">{t.date}</div>
                </div>
              ))}
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}
