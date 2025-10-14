import React from 'react';
import {
  BookOpen,
  FileText,
  Cpu,
  Code2,
  Database,
  ShieldCheck,
  Download,
  Link,
  Library,
  FolderGit2
} from 'lucide-react';

const FEATURED_REPORTS = [
  {
    icon: FileText,
    kind: "White Paper",
    title: "Agentic AI and the Future of Digital MRV",
    summary:
      "How autonomous agents transform Measurement, Reporting & Verification with multimodal data fusion and self-validation.",
    action: { label: "Download", href: "#" }
  },
  {
    icon: BookOpen,
    kind: "Technical Brief",
    title: "Industrial Foundation Models for Decarbonization",
    summary:
      "Domain-tuned LLMs/SLMs for Oil & Gas, Steel, Cement, and Chemicals — architecture, training data, and deployment.",
    action: { label: "Read", href: "#" }
  },
  {
    icon: ShieldCheck,
    kind: "Research Note",
    title: "Blockchain Tokenization Standards for Carbon Assets",
    summary:
      "Standards (ERC-1155 / EIP-721C), registry interoperability, and on-chain verification for digital carbon.",
    action: { label: "View", href: "#" }
  }
];

const KNOWLEDGE_CARDS = [
  {
    icon: Database,
    title: "Oil & Gas",
    points: [
      "Methane reconciliation (top-down vs bottom-up)",
      "Flare forecasting and well integrity analytics",
      "OGMP 2.0-aligned reporting templates"
    ]
  },
  {
    icon: Cpu,
    title: "Steel & Cement",
    points: [
      "SLM-driven process optimization",
      "Kiln & blast furnace emissions modeling",
      "Energy intensity benchmarks"
    ]
  },
  {
    icon: Library,
    title: "Power & Data Centers",
    points: [
      "Scope 2 forecasting & grid intensity integration",
      "Cooling efficiency analytics",
      "Renewables & PPAs modeling"
    ]
  },
  {
    icon: Code2,
    title: "Chemicals & Ammonia",
    points: [
      "Reaction pathway modeling for low-carbon output",
      "Feedstock switching scenarios",
      "ISO 14064-1/2 documentation"
    ]
  }
];

const DEV_ASSETS = [
  {
    icon: Code2,
    title: "API Docs",
    desc: "REST endpoints for Carbon OS agents, MRV pipelines, and credit tokenization.",
    cta: { label: "Open API", href: "#" }
  },
  {
    icon: FolderGit2,
    title: "SDKs & Starters",
    desc: "TypeScript/Python SDKs, sample apps, and ready-to-run workflows.",
    cta: { label: "Browse SDKs", href: "#" }
  },
  {
    icon: Database,
    title: "Datasets",
    desc: "Public schemas, sample plant data, and synthetic test corpora for evaluation.",
    cta: { label: "Download Data", href: "#" }
  }
];

const Resources = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-slate-50 via-emerald-50/30 to-white py-24 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white text-emerald-700 px-5 py-2 rounded-full text-sm font-medium mb-8 shadow-sm border border-emerald-100">
            <BookOpen className="w-4 h-4" />
            Resources & Knowledge Center
          </div>

          <h1 className="text-5xl md:text-7xl font-light text-slate-900 mb-6 tracking-tight">
            Knowledge That
            <span className="block font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Accelerates Net Zero</span>
          </h1>

          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-12 leading-relaxed">
            Research, technical briefs, datasets, and developer tools to help you build credible,
            high-impact carbon intelligence with Carbon OS.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <button className="bg-slate-900 text-white px-10 py-4 rounded-lg font-medium hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl">
              Read Whitepapers
            </button>
            <button className="bg-white text-slate-900 px-10 py-4 rounded-lg font-medium border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all">
              Access Developer Hub
            </button>
          </div>
        </div>
      </section>

      {/* Featured Reports */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-light text-slate-900 mb-5 tracking-tight">
              Featured <span className="font-semibold">Reports</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Curated research to guide MRV, tokenization, and industrial decarbonization.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {FEATURED_REPORTS.map((r) => {
              const Icon = r.icon;
              return (
                <div key={r.title} className="bg-white border border-slate-100 rounded-2xl p-8 hover:shadow-xl hover:border-emerald-100 transition-all group">
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7 text-emerald-600" />
                  </div>
                  <span className="text-xs uppercase tracking-wider text-slate-500 font-medium">{r.kind}</span>
                  <h3 className="text-2xl font-semibold text-slate-900 mt-2 mb-4 leading-tight">{r.title}</h3>
                  <p className="text-slate-600 mb-8 leading-relaxed">{r.summary}</p>
                  <div className="flex items-center gap-3">
                    <button className="bg-slate-900 text-white px-5 py-3 rounded-lg text-sm font-medium hover:bg-slate-800 transition-all">
                      {r.action.label}
                    </button>
                    <button className="bg-white text-slate-700 px-5 py-3 rounded-lg text-sm font-medium border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all inline-flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      PDF
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Knowledge Center */}
      <section className="bg-gradient-to-b from-slate-50 to-white py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-light text-slate-900 mb-5 tracking-tight">
              Knowledge <span className="font-semibold">Center</span>
            </h2>
            <p className="text-lg text-slate-600">
              Industry-specific insights, templates, and benchmarks.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {KNOWLEDGE_CARDS.map((k) => {
              const Icon = k.icon;
              return (
                <div key={k.title} className="bg-white rounded-2xl p-8 border border-slate-100 hover:shadow-xl transition-all group">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform shadow-lg">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-4">{k.title}</h3>
                  <ul className="space-y-3 text-slate-600">
                    {k.points.map((p) => (
                      <li key={p} className="flex items-start gap-3">
                        <span className="mt-2 block w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0"></span>
                        <span className="text-sm leading-relaxed">{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Developer Hub */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-light text-slate-900 mb-5 tracking-tight">
              Developer <span className="font-semibold">Hub</span>
            </h2>
            <p className="text-lg text-slate-600">
              Build with Carbon OS: APIs, SDKs, datasets, and examples.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {DEV_ASSETS.map((d) => {
              const Icon = d.icon;
              return (
                <div key={d.title} className="bg-white border border-slate-100 rounded-2xl p-10 hover:shadow-xl hover:border-emerald-100 transition-all group">
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">{d.title}</h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">{d.desc}</p>
                  <button className="inline-flex items-center gap-2 bg-white text-slate-700 px-5 py-3 rounded-lg text-sm font-medium border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all">
                    <Link className="w-4 h-4" />
                    {d.cta.label}
                  </button>
                </div>
              );
            })}
          </div>

          <div className="mt-16 text-center">
            <a
              href="#"
              className="inline-flex items-center gap-3 text-slate-700 hover:text-slate-900 font-medium text-lg group"
            >
              <FolderGit2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Explore example apps and workflows
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-light text-white mb-6 tracking-tight">
            Ready to Go from Research to <span className="font-semibold">Results?</span>
          </h2>
          <p className="text-xl text-slate-300 mb-10 leading-relaxed">
            Use our playbooks, APIs, and datasets to deploy MRV in weeks.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="bg-emerald-600 text-white px-10 py-4 rounded-lg font-medium hover:bg-emerald-500 transition-all shadow-lg hover:shadow-xl">
              Access Developer Hub
            </button>
            <button className="bg-transparent text-white px-10 py-4 rounded-lg font-medium border-2 border-slate-600 hover:border-white hover:bg-white/10 transition-all">
              View Documentation
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Resources;