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
      {/* Hero — emerald theme */}
      <section className="bg-gradient-to-b from-emerald-50 to-white py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Sparkles className="w-4 h-4" />
            About Alpha Carbon
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
            Our Mission, Vision & Principles
          </h1>

          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            To redefine how industries measure, manage, and monetize carbon through Agentic AI and
            trusted digital infrastructure — enabling verifiable net zero at planetary scale.
          </p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-start">
          <div className="bg-white border border-slate-200 rounded-xl p-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Who We Are</h2>
            <p className="text-slate-600 text-lg">
              Alpha Carbon is a deep-tech climate company combining AI engineering, data science, and
              blockchain to transform industrial decarbonization. We build domain-aware LLMs, SLMs,
              and Agentic systems capable of autonomously operating within energy, metal, and chemical
              ecosystems.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Vision</h2>
            <p className="text-slate-600 text-lg">
              A future where every ton of CO₂ is intelligently measured, verified, and tokenized,
              turning carbon management from a cost center into a value engine.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-emerald-50/50 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Core Values</h2>
            <p className="text-lg text-slate-600">
              Principles that guide how we design, build, and deploy Carbon OS.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {VALUES.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.title} className="bg-white border border-slate-200 rounded-xl p-8">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{v.title}</h3>
                  <p className="text-slate-600 mt-2">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Offices */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white border border-slate-200 rounded-xl p-8">
            <div className="flex items-start gap-4">
              <Globe2 className="w-6 h-6 text-emerald-600" />
              <div>
                <h3 className="text-2xl font-bold text-slate-900">Global Presence</h3>
                <p className="text-slate-600 mt-2">
                  <strong>Headquarters:</strong> New York, NY &nbsp;|&nbsp;
                  <strong>Engineering Centers:</strong> Bangalore · Singapore · Dubai
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA — emerald dark strip */}
      <section className="bg-slate-900 py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Building the carbon intelligence layer for industry.
          </h2>
          <p className="text-slate-300 mt-3">
            From MRV automation to credit tokenization — proven, traceable, and scalable.
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
