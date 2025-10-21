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
      <section className="bg-gradient-to-b from-emerald-50 to-white py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <CheckCircle className="w-4 h-4" />
            Carbon OS Platform
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
            Enterprise Carbon Intelligence Platform
          </h1>
          
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            A complete operating system for carbon management - from measurement to monetization. 
            Built for the world's most emission-intensive industries.
          </p>
          
          <button className="bg-emerald-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-emerald-700 transition-colors">
            Schedule a Demo
          </button>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Core Platform Features
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Everything you need to measure, verify, and monetize your carbon initiatives
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {FEATURES.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="bg-white border border-slate-200 rounded-xl p-8 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-emerald-600" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">
                    {feature.title}
                  </h3>
                  
                  <p className="text-slate-600 mb-4">
                    {feature.description}
                  </p>
                  
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-center gap-2 text-slate-700">
                        <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        <span>{benefit}</span>
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
      <section className="bg-slate-50 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Platform Capabilities
            </h2>
            <p className="text-lg text-slate-600">
              End-to-end carbon lifecycle management
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {CAPABILITIES.map((capability) => {
              const Icon = capability.icon;
              return (
                <div key={capability.title} className="bg-white rounded-xl p-6 text-center border border-slate-200">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {capability.title}
                  </h3>
                  
                  <p className="text-slate-600">
                    {capability.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-slate-600">
              Simple integration, powerful results
            </p>
          </div>

          <div className="space-y-8">
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
              <div key={item.step} className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-16 h-16 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                  {item.step}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-lg">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-slate-900 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Transform Your Carbon Strategy?
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Join industry leaders using Carbon OS to achieve net-zero faster
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="bg-emerald-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-emerald-700 transition-colors">
              Request Demo
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

export default Platform;