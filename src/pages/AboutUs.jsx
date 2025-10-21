import React from "react";
import { Target, ShieldCheck, Cpu, Layers, Sparkles, Globe2 } from "lucide-react";

const VALUES = [
  { icon: ShieldCheck, title: "Transparency by Design", desc: "Blockchain-verified trust." },
  { icon: Target,      title: "Autonomy with Purpose",  desc: "Agentic AI acting for planetary good." },
  { icon: Cpu,         title: "Scientific Integrity",   desc: "Models anchored in physics & regulations." },
  { icon: Layers,      title: "Scalability for Impact", desc: "From one facility to a global supply chain." },
];

const AboutUs = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-slate-50 via-emerald-50/30 to-white py-24 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white text-emerald-700 px-5 py-2 rounded-full text-sm font-medium mb-8 shadow-sm border border-emerald-100">
            <Sparkles className="w-4 h-4" />
            About Alpha Carbon
          </div>

          <h1 className="text-5xl md:text-7xl font-light text-slate-900 mb-6 tracking-tight">
            Our Mission, Vision
            <span className="block font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">& Principles</span>
          </h1>

          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            To redefine how industries measure, manage, and monetize carbon through Agentic AI and
            trusted digital infrastructure — enabling verifiable net zero at planetary scale.
          </p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-start">
          <div className="bg-white border border-slate-100 rounded-2xl p-10 hover:shadow-xl hover:border-emerald-100 transition-all">
            <h2 className="text-3xl font-semibold text-slate-900 mb-5">Who We Are</h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              Alpha Carbon is a deep-tech climate company combining AI engineering, data science, and
              blockchain to transform industrial decarbonization. We build domain-aware LLMs, SLMs,
              and Agentic systems capable of autonomously operating within energy, metal, and chemical
              ecosystems.
            </p>
          </div>

          <div className="bg-white border border-slate-100 rounded-2xl p-10 hover:shadow-xl hover:border-emerald-100 transition-all">
            <h2 className="text-3xl font-semibold text-slate-900 mb-5">Our Vision</h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              A future where every ton of CO₂ is intelligently measured, verified, and tokenized,
              turning carbon management from a cost center into a value engine.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-gradient-to-b from-slate-50 to-white py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-light text-slate-900 mb-5 tracking-tight">
              Core <span className="font-semibold">Values</span>
            </h2>
            <p className="text-lg text-slate-600">
              Principles that guide how we design, build, and deploy Carbon OS.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {VALUES.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.title} className="bg-white border border-slate-100 rounded-2xl p-8 hover:shadow-xl transition-all group">
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">{v.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Offices */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white border border-slate-100 rounded-2xl p-10 hover:shadow-xl hover:border-emerald-100 transition-all">
            <div className="flex items-start gap-6">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <Globe2 className="w-7 h-7 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-3">Global Presence</h3>
                <p className="text-slate-600 text-lg leading-relaxed">
                  <strong className="text-slate-900">Headquarters:</strong> New York, NY &nbsp;|&nbsp;
                  <strong className="text-slate-900">Engineering Centers:</strong> Bangalore · Singapore · Dubai
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-light text-white mb-6 tracking-tight">
            Building the carbon intelligence layer <span className="font-semibold">for industry.</span>
          </h2>
          <p className="text-xl text-slate-300 leading-relaxed">
            From MRV automation to credit tokenization — proven, traceable, and scalable.
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;