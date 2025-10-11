import { useState, useEffect } from "react";
import { Activity, Database, Shield, Zap, ArrowRight, CheckCircle, TrendingDown } from "lucide-react";

const PILLARS = [
  {
    title: "Agentic AI Automation",
    desc: "Autonomous AI agents connect sensors, reports, and operational data to perform continuous MRV (Measurement, Reporting & Verification).",
    icon: Activity,
    gradient: "from-emerald-500 to-teal-600"
  },
  {
    title: "Multimodal Intelligence",
    desc: "Ingests any data type — PDFs, images, SCADA streams, satellite, IoT, and laboratory readings — for unified insight.",
    icon: Database,
    gradient: "from-blue-500 to-cyan-600"
  },
  {
    title: "Blockchain-Backed Trust",
    desc: "Each verified emission or reduction is cryptographically secured and tokenized for transparent trading.",
    icon: Shield,
    gradient: "from-violet-500 to-purple-600"
  },
  {
    title: "Net-Zero as a Service",
    desc: "From carbon monitoring to monetization, all on one AI-driven operating system.",
    icon: Zap,
    gradient: "from-amber-500 to-orange-600"
  },
];

const FloatingParticle = ({ delay, duration, x, y }) => (
  <div 
    className="absolute w-2 h-2 bg-emerald-400/30 rounded-full animate-pulse"
    style={{
      left: `${x}%`,
      top: `${y}%`,
      animationDelay: `${delay}s`,
      animationDuration: `${duration}s`
    }}
  />
);

const StatCard = ({ value, label, trend }) => (
  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-emerald-200/50 hover:border-emerald-400/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
    <div className="flex items-center justify-between mb-2">
      <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
        {value}
      </div>
      {trend && <TrendingDown className="w-5 h-5 text-emerald-600" />}
    </div>
    <div className="text-sm text-slate-600 font-medium">{label}</div>
  </div>
);

export default function Homepage() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="bg-gradient-to-b from-slate-50 via-emerald-50/30 to-slate-50 overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1),transparent_50%)]" />
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(16,185,129,0.15), transparent 40%)`
          }}
        />
        
        {/* Floating Particles */}
        {[...Array(15)].map((_, i) => (
          <FloatingParticle 
            key={i} 
            delay={i * 0.3} 
            duration={3 + (i % 3)} 
            x={Math.random() * 100} 
            y={Math.random() * 100} 
          />
        ))}

        <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-32 grid md:grid-cols-12 gap-12 items-center">
          {/* Left Content */}
          <div className="md:col-span-7 space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold">
              <CheckCircle className="w-4 h-4" />
              AI-Powered Carbon Intelligence
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black leading-tight">
              <span className="bg-gradient-to-r from-slate-900 via-emerald-800 to-teal-700 bg-clip-text text-transparent">
                AI That Thinks,
              </span>
              <br />
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Acts & Verifies
              </span>
              <br />
              <span className="text-slate-900">Carbon in Real Time</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-2xl">
              Alpha Carbon's <span className="font-semibold text-emerald-700">Carbon OS Platform</span> combines 
              Agentic AI, Multimodal LLMs/SLMs, and blockchain verification to automate the full carbon 
              lifecycle — from measurement to tokenization.
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="group bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex items-center gap-2">
                Request Demo
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="bg-white text-slate-700 px-8 py-4 rounded-xl font-semibold text-lg border-2 border-slate-200 hover:border-emerald-400 hover:text-emerald-700 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md">
                Explore Platform
              </button>
            </div>

            {/* Mini Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8">
              <StatCard value="99.8%" label="MRV Accuracy" trend />
              <StatCard value="24/7" label="Autonomous Monitoring" />
              <StatCard value="<48h" label="Token Settlement" />
            </div>
          </div>

          {/* Right Visual */}
          <div className="md:col-span-5 relative">
            <div className="relative animate-float">
              {/* Main Card */}
              <div className="relative bg-gradient-to-br from-white to-emerald-50 rounded-3xl p-8 shadow-2xl border border-emerald-100 overflow-hidden">
                {/* Animated Grid Background */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0" style={{
                    backgroundImage: 'linear-gradient(to right, rgb(16 185 129) 1px, transparent 1px), linear-gradient(to bottom, rgb(16 185 129) 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                  }} />
                </div>

                {/* Hero Visual Content */}
                <div className="relative space-y-6">
                  {/* AI Agent Visualization */}
                  <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white shadow-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                        <Activity className="w-6 h-6 animate-pulse" />
                      </div>
                      <div>
                        <div className="font-bold text-lg">AI Agent Active</div>
                        <div className="text-emerald-100 text-sm">Processing emissions data</div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Data Ingestion</span>
                          <span>94%</span>
                        </div>
                        <div className="w-full bg-white/20 rounded-full h-2">
                          <div className="bg-white rounded-full h-2 w-[94%] animate-pulse" />
                        </div>
                      </div>
                      
                      <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Verification</span>
                          <span>87%</span>
                        </div>
                        <div className="w-full bg-white/20 rounded-full h-2">
                          <div className="bg-white rounded-full h-2 w-[87%] animate-pulse" style={{ animationDelay: '0.3s' }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Data Sources Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    {['Satellite', 'IoT Sensors', 'SCADA', 'Lab Data'].map((source, i) => (
                      <div 
                        key={source}
                        className="bg-white rounded-xl p-4 border border-slate-200 hover:border-emerald-400 transition-all duration-300 hover:shadow-md hover:-translate-y-1"
                        style={{ animationDelay: `${i * 0.1}s` }}
                      >
                        <div className="w-8 h-8 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-lg mb-2 flex items-center justify-center">
                          <div className="w-3 h-3 bg-emerald-600 rounded-full animate-pulse" />
                        </div>
                        <div className="text-sm font-semibold text-slate-700">{source}</div>
                        <div className="text-xs text-emerald-600">● Connected</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-32 h-32 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full opacity-20 blur-2xl animate-pulse" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full opacity-20 blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 bg-gradient-to-r from-violet-600 to-purple-600 text-white px-6 py-3 rounded-2xl shadow-xl animate-bounce-slow">
                <div className="text-sm font-semibold">Blockchain Verified</div>
                <div className="text-xs opacity-90">100% Transparent</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUE PILLARS */}
      <section className="relative py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold">
              Value Pillars
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900">
              Where Professional Meets <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Practical</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Four pillars that make Carbon OS credible, auditable, and enterprise-ready
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PILLARS.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="group relative bg-white rounded-2xl p-8 shadow-lg border border-slate-200 hover:border-transparent hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${pillar.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500`} />
                  
                  <div className="relative">
                    <div className={`w-16 h-16 bg-gradient-to-br ${pillar.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-emerald-600 group-hover:to-teal-600 group-hover:bg-clip-text transition-all duration-300">
                      {pillar.title}
                    </h3>
                    
                    <p className="text-slate-600 leading-relaxed">
                      {pillar.desc}
                    </p>

                    <div className={`absolute top-4 right-4 w-20 h-20 bg-gradient-to-br ${pillar.gradient} opacity-0 group-hover:opacity-10 rounded-full blur-xl transition-opacity duration-500`} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="relative bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900 rounded-3xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                backgroundSize: '48px 48px'
              }} />
            </div>

            <div className="relative px-8 md:px-16 py-16 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex-1 space-y-4">
                <h3 className="text-3xl md:text-4xl font-black text-white leading-tight">
                  Build your <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">carbon intelligence layer</span>
                </h3>
                <p className="text-emerald-100 text-lg">
                  Plug Agentic AI & MRV into your operations in weeks, not months.
                </p>
                
                <div className="flex flex-wrap gap-4 pt-4">
                  {['Real-time Monitoring', 'Blockchain Verified', 'AI-Powered Insights'].map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-white">
                      <CheckCircle className="w-5 h-5 text-emerald-400" />
                      <span className="text-sm font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <button className="group bg-white text-slate-900 px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex items-center gap-2 whitespace-nowrap">
                  Talk to Solutions Architect
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="bg-transparent text-white px-8 py-4 rounded-xl font-semibold text-lg border-2 border-white/30 hover:border-white hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 text-center">
                  Browse Resources
                </button>
              </div>
            </div>

            <div className="absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full opacity-20 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full opacity-20 blur-3xl" />
          </div>
        </div>
      </section>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </div>
  );
}