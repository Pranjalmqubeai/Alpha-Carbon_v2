import React from 'react';
import {
  BookOpen,
  FileText,
  Cpu,
  Code2,
  Database,
  ShieldCheck,
  Download,
  Link as LinkIcon,
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
      {/* Hero — emerald theme */}
      <section className="bg-gradient-to-b from-emerald-50 to-white py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <BookOpen className="w-4 h-4" />
            Resources & Knowledge Center
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
            Knowledge That Accelerates Net Zero
          </h1>

          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            Research, technical briefs, datasets, and developer tools to help you build credible,
            high-impact carbon intelligence with Carbon OS.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <button className="bg-emerald-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-emerald-700 transition-colors">
              Read Whitepapers
            </button>
            <button className="bg-white text-slate-900 px-8 py-4 rounded-lg font-semibold border-2 border-slate-200 hover:bg-slate-50 transition-colors">
              Access Developer Hub
            </button>
          </div>
        </div>
      </section>

      {/* Featured Reports */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Featured Reports</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Curated research to guide MRV, tokenization, and industrial decarbonization.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {FEATURED_REPORTS.map((r) => {
              const Icon = r.icon;
              return (
                <div key={r.title} className="bg-white border border-slate-200 rounded-xl p-8 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-emerald-600" />
                  </div>
                  <span className="text-xs uppercase tracking-wide text-slate-500">{r.kind}</span>
                  <h3 className="text-2xl font-bold text-slate-900 mt-1 mb-3">{r.title}</h3>
                  <p className="text-slate-600 mb-6">{r.summary}</p>
                  <div className="flex items-center gap-2">
                    <button className="bg-slate-900 text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-slate-800 transition-colors">
                      {r.action.label}
                    </button>
                    <button className="bg-white text-slate-900 px-4 py-2.5 rounded-lg text-sm font-semibold border border-slate-200 hover:bg-slate-50 transition-colors inline-flex items-center gap-2">
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
      <section className="bg-emerald-50/50 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Knowledge Center</h2>
            <p className="text-lg text-slate-600">
              Industry-specific insights, templates, and benchmarks.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {KNOWLEDGE_CARDS.map((k) => {
              const Icon = k.icon;
              return (
                <div key={k.title} className="bg-white rounded-xl p-6 border border-slate-200">
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{k.title}</h3>
                  <ul className="space-y-2 text-slate-700">
                    {k.points.map((p) => (
                      <li key={p} className="flex items-start gap-2">
                        <span className="mt-1 block w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                        <span>{p}</span>
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
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Developer Hub</h2>
            <p className="text-lg text-slate-600">
              Build with Carbon OS: APIs, SDKs, datasets, and examples.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {DEV_ASSETS.map((d) => {
              const Icon = d.icon;
              return (
                <div key={d.title} className="bg-white border border-slate-200 rounded-xl p-8">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{d.title}</h3>
                  <p className="text-slate-600 mb-4">{d.desc}</p>
                  <button className="inline-flex items-center gap-2 bg-white text-slate-900 px-4 py-2.5 rounded-lg text-sm font-semibold border border-slate-200 hover:bg-slate-50 transition-colors">
                    <LinkIcon className="w-4 h-4" />
                    {d.cta.label}
                  </button>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <a
              href="#"
              className="inline-flex items-center gap-2 text-slate-700 hover:text-slate-900 font-semibold"
            >
              <FolderGit2 className="w-5 h-5" />
              Explore example apps and workflows
            </a>
          </div>
        </div>
      </section>

      {/* CTA — emerald dark strip */}
      <section className="bg-slate-900 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Go from Research to Results?
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Use our playbooks, APIs, and datasets to deploy MRV in weeks.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="bg-emerald-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-emerald-700 transition-colors">
              Access Developer Hub
            </button>
            <button className="bg-transparent text-white px-8 py-4 rounded-lg font-semibold border-2 border-white hover:bg-white hover:text-slate-900 transition-colors">
              View Documentation
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Resources;
