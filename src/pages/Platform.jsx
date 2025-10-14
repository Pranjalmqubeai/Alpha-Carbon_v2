import React from 'react';
import { Activity, Database, Shield, Zap, CheckCircle, BarChart3, Globe, Lock } from 'lucide-react';

const FEATURES = [
  {
    icon: Activity,
    title: "Agentic AI Engine",
    description: "Autonomous AI agents continuously monitor, measure, and verify carbon emissions across all your operations.",
    benefits: ["Real-time data processing", "Automated MRV workflows", "Predictive analytics"]
  },
  {
    icon: Database,
    title: "Multimodal Data Processing",
    description: "Seamlessly ingest and analyze data from any source - PDFs, satellite imagery, IoT sensors, and SCADA systems.",
    benefits: ["Universal data compatibility", "Smart data extraction", "Unified reporting"]
  },
  {
    icon: Shield,
    title: "Blockchain Verification",
    description: "Every measurement and reduction is cryptographically secured and tokenized for transparent carbon trading.",
    benefits: ["Immutable audit trails", "Instant verification", "Trusted transactions"]
  },
  {
    icon: Globe,
    title: "Global Compliance",
    description: "Built-in support for international standards including GHG Protocol, ISO 14064, and regional regulations.",
    benefits: ["Multi-jurisdiction support", "Automated reporting", "Regulatory updates"]
  }
];

const CAPABILITIES = [
  {
    icon: BarChart3,
    title: "Carbon Accounting",
    description: "Comprehensive Scope 1, 2, and 3 emissions tracking with real-time dashboards and insights."
  },
  {
    icon: Zap,
    title: "Emissions Reduction",
    description: "AI-powered recommendations to identify and implement the most effective reduction strategies."
  },
  {
    icon: Lock,
    title: "Credit Monetization",
    description: "Automated carbon credit generation, verification, and marketplace integration."
  }
];

const Platform = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-slate-50 via-emerald-50/30 to-white py-24 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white text-emerald-700 px-5 py-2 rounded-full text-sm font-medium mb-8 shadow-sm border border-emerald-100">
            <CheckCircle className="w-4 h-4" />
            Carbon OS Platform
          </div>
          
          <h1 className="text-5xl md:text-7xl font-light text-slate-900 mb-6 tracking-tight">
            Enterprise Carbon
            <span className="block font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Intelligence Platform</span>
          </h1>
          
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-12 leading-relaxed">
            A comprehensive operating system for carbon management—from precise measurement to strategic monetization. 
            Engineered for the world's most emission-intensive industries.
          </p>
          
          <button className="bg-slate-900 text-white px-10 py-4 rounded-lg font-medium hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl">
            Schedule a Demo
          </button>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-light text-slate-900 mb-5 tracking-tight">
              Core Platform <span className="font-semibold">Features</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              A comprehensive suite designed to measure, verify, and monetize your carbon initiatives with precision
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {FEATURES.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="bg-white border border-slate-100 rounded-2xl p-10 hover:shadow-xl hover:border-emerald-100 transition-all group">
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7 text-emerald-600" />
                  </div>
                  
                  <h3 className="text-2xl font-semibold text-slate-900 mb-4">
                    {feature.title}
                  </h3>
                  
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    {feature.description}
                  </p>
                  
                  <ul className="space-y-3">
                    {feature.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-center gap-3 text-slate-700">
                        <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                        <span className="text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="bg-gradient-to-b from-slate-50 to-white py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-light text-slate-900 mb-5 tracking-tight">
              Platform <span className="font-semibold">Capabilities</span>
            </h2>
            <p className="text-lg text-slate-600">
              End-to-end carbon lifecycle management
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {CAPABILITIES.map((capability) => {
              const Icon = capability.icon;
              return (
                <div key={capability.title} className="bg-white rounded-2xl p-8 text-center border border-slate-100 hover:shadow-xl transition-all group">
                  <div className="w-20 h-20 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-105 transition-transform shadow-lg">
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">
                    {capability.title}
                  </h3>
                  
                  <p className="text-slate-600 leading-relaxed">
                    {capability.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-light text-slate-900 mb-5 tracking-tight">
              How It <span className="font-semibold">Works</span>
            </h2>
            <p className="text-lg text-slate-600">
              Seamless integration, transformative results
            </p>
          </div>

          <div className="space-y-12">
            {[
              {
                step: "01",
                title: "Connect Your Data Sources",
                description: "Integrate with existing sensors, SCADA systems, ERPs, and document repositories. Our AI agents automatically discover and map your carbon data."
              },
              {
                step: "02",
                title: "AI Agents Automate MRV",
                description: "Agentic AI continuously measures, reports, and verifies emissions across all scopes. No manual data entry required."
              },
              {
                step: "03",
                title: "Get Verified Credits",
                description: "Blockchain verification ensures every reduction is cryptographically secured. Credits are automatically tokenized and ready for trading."
              },
              {
                step: "04",
                title: "Monitor & Optimize",
                description: "Real-time dashboards show your carbon footprint, reduction progress, and monetization opportunities. AI provides actionable recommendations."
              }
            ].map((item) => (
              <div key={item.step} className="flex gap-8 items-start group">
                <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl flex items-center justify-center text-white font-light text-2xl shadow-lg group-hover:scale-105 transition-transform">
                  {item.step}
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="text-2xl font-semibold text-slate-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-lg leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-light text-white mb-6 tracking-tight">
            Ready to Transform Your <span className="font-semibold">Carbon Strategy?</span>
          </h2>
          <p className="text-xl text-slate-300 mb-10 leading-relaxed">
            Join industry leaders using Carbon OS to achieve net-zero faster
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="bg-emerald-600 text-white px-10 py-4 rounded-lg font-medium hover:bg-emerald-500 transition-all shadow-lg hover:shadow-xl">
              Request Demo
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

export default Platform;