import { useState, useEffect } from "react";
import {
  Activity,
  Database,
  Shield,
  Zap,
  CheckCircle,
  Lock,
  Mail,
  Send,
} from "lucide-react";

const TEASERS = [
  {
    title: "Autonomous Carbon Intelligence",
    teaser:
      "What if AI could measure, verify, and trade carbon credits — without human oversight?",
    icon: Activity,
    gradient: "from-emerald-400 to-teal-500",
    hint: "Real-time MRV automation",
    details:
      "Neural networks that never sleep, continuously analyzing emissions across your entire operation.",
  },
  {
    title: "Multimodal Sensing",
    teaser:
      "Satellite imagery meets IoT sensors meets blockchain. All speaking the same language.",
    icon: Database,
    gradient: "from-sky-400 to-cyan-500",
    hint: "Universal data ingestion",
    details:
      "PDF reports, SCADA streams, satellite pixels, lab readings — unified into a single source of truth.",
  },
  {
    title: "Cryptographic Trust",
    teaser:
      "Every carbon unit, cryptographically sealed. Every transaction, immutably recorded.",
    icon: Shield,
    gradient: "from-violet-400 to-purple-500",
    hint: "Blockchain-native verification",
    details:
      "Zero-knowledge proofs meet carbon accounting. Trust without revealing proprietary data.",
  },
  {
    title: "Net-Zero Operating System",
    teaser:
      "Not just software. An entire operating system for the carbon economy.",
    icon: Zap,
    gradient: "from-amber-400 to-orange-500",
    hint: "Enterprise-grade platform",
    details:
      "From measurement to monetization. One platform. One API. Infinite possibilities.",
  },
];

const FloatingParticle = ({ delay, duration, x, y }) => (
  <div
    className="absolute w-2 h-2 bg-emerald-400/40 rounded-full animate-pulse"
    style={{
      left: `${x}%`,
      top: `${y}%`,
      animationDelay: `${delay}s`,
      animationDuration: `${duration}s`,
    }}
  />
);

export default function LightHomepage() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setEmail("");
    }, 3500);
  };

  return (
    <div className="bg-gradient-to-b from-emerald-50 via-white to-emerald-50/30 text-slate-800">
      {/* Light Stealth Badge */}
      <div className="fixed top-6 right-6 z-50 bg-white/70 backdrop-blur border border-emerald-300 px-6 py-3 rounded-full text-emerald-700 font-semibold text-sm shadow">
        <div className="flex items-center gap-2">
          <Lock className="w-4 h-4" />
          STEALTH MODE
        </div>
      </div>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Soft background accents */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(circle at 50% 50%, rgba(16,185,129,0.12), transparent 60%)",
            }}
          />
          <div
            className="absolute inset-0 opacity-40"
            style={{
              background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(56,189,248,0.12), transparent 45%)`,
            }}
          />
        </div>

        {/* Particles */}
        {[...Array(22)].map((_, i) => (
          <FloatingParticle
            key={i}
            delay={i * 0.18}
            duration={3 + (i % 4)}
            x={Math.random() * 100}
            y={Math.random() * 100}
          />
        ))}

        {/* Concentric rings (light) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="absolute w-96 h-96 border border-emerald-300/40 rounded-full animate-ping-slow" />
          <div className="absolute w-[600px] h-[600px] border border-emerald-300/30 rounded-full animate-ping-slower" />
          <div className="absolute w-[820px] h-[820px] border border-emerald-300/20 rounded-full animate-ping-slowest" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-28 grid md:grid-cols-12 gap-12 items-center">
          {/* Left content */}
          <div className="md:col-span-7 space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-semibold border border-emerald-300">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              Coming Soon: AI-Native Carbon OS
            </div>

            <h1 className="text-5xl md:text-7xl font-black leading-tight text-slate-900">
              The Future of
              <br />
              <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent animate-gradient">
                Carbon Intelligence
              </span>
              <br />
              <span className="text-slate-500">Is Being Built</span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-700 leading-relaxed max-w-2xl">
              We’re building something unprecedented: An autonomous AI platform that doesn’t just
              measure carbon — it <span className="text-emerald-600 font-semibold">thinks</span>,{" "}
              <span className="text-teal-600 font-semibold">acts</span>, and{" "}
              <span className="text-cyan-600 font-semibold">verifies</span> in real time.
            </p>

            <div className="bg-white/80 backdrop-blur border border-slate-200 rounded-2xl p-6 space-y-3 shadow-sm">
              <div className="text-slate-500 text-sm font-semibold uppercase tracking-wider">
                What’s Coming
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Activity, title: "Agentic AI", subtitle: "Autonomous carbon ops" },
                  { icon: Database, title: "Multimodal Fusion", subtitle: "Any data, one truth" },
                  { icon: Shield, title: "Blockchain Trust", subtitle: "Cryptographic proof" },
                  { icon: Zap, title: "Carbon OS", subtitle: "Enterprise platform" },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="flex items-start gap-3">
                      <div className="w-9 h-9 bg-emerald-50 rounded-lg border border-emerald-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon className="w-4.5 h-4.5 text-emerald-600" />
                      </div>
                      <div>
                        <div className="text-slate-900 font-semibold text-sm">{item.title}</div>
                        <div className="text-slate-500 text-xs">{item.subtitle}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right visual */}
          <div className="md:col-span-5 relative">
            <div className="relative animate-float">
              <div className="relative bg-white rounded-3xl p-8 shadow-xl border border-slate-200 overflow-hidden">
                {/* tiny grid */}
                <div className="absolute inset-0 opacity-10">
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, rgba(16,185,129,0.25) 1px, transparent 1px), linear-gradient(to bottom, rgba(16,185,129,0.25) 1px, transparent 1px)",
                      backgroundSize: "40px 40px",
                    }}
                  />
                </div>

                {/* soft orbs */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-300/30 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-300/30 rounded-full blur-3xl" />

                {/* status widget */}
                <div className="relative space-y-6">
                  <div className="bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl p-6 text-white shadow-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-white/25 rounded-xl flex items-center justify-center border border-white/40">
                        <Activity className="w-6 h-6 animate-pulse" />
                      </div>
                      <div>
                        <div className="font-bold text-lg">Neural Network Active</div>
                        <div className="text-emerald-50/90 text-sm">Processing data streams</div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {[
                        { label: "Multi-source Ingestion", pct: 94, tint: "from-white to-emerald-100" },
                        { label: "AI Verification", pct: 87, tint: "from-white to-teal-100" },
                        { label: "Blockchain Sync", pct: 100, tint: "from-white to-cyan-100" },
                      ].map((row, idx) => (
                        <div key={row.label} className="bg-white/15 rounded-lg p-3 border border-white/25">
                          <div className="flex justify-between text-sm mb-1">
                            <span>{row.label}</span>
                            <span className="text-emerald-50">{row.pct}%</span>
                          </div>
                          <div className="w-full bg-white/25 rounded-full h-2">
                            <div
                              className={`bg-gradient-to-r ${row.tint} rounded-full h-2`}
                              style={{
                                width: `${row.pct}%`,
                                animationDelay: `${idx * 0.25}s`,
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* data sources */}
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { name: "Satellite", color: "from-sky-400 to-cyan-400" },
                      { name: "IoT Network", color: "from-emerald-400 to-teal-400" },
                      { name: "SCADA", color: "from-violet-400 to-purple-400" },
                      { name: "Lab Sensors", color: "from-amber-400 to-orange-400" },
                    ].map((source, i) => (
                      <div
                        key={source.name}
                        className="bg-white/80 backdrop-blur rounded-xl p-4 border border-slate-200 hover:border-emerald-300 transition-all hover:shadow-sm"
                        style={{ animationDelay: `${i * 0.08}s` }}
                      >
                        <div
                          className={`w-10 h-10 bg-gradient-to-br ${source.color} rounded-lg mb-3 flex items-center justify-center shadow-sm`}
                        >
                          <div className="w-4 h-4 bg-white rounded-full" />
                        </div>
                        <div className="text-sm font-semibold text-slate-900">
                          {source.name}
                        </div>
                        <div className="text-xs text-emerald-700 flex items-center gap-1">
                          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                          Live Feed
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* system status */}
                  <div className="bg-white/85 backdrop-blur rounded-xl p-4 border border-slate-200">
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-sm font-semibold text-slate-700">System Status</div>
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }} />
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }} />
                      </div>
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Autonomous Agents</span>
                        <span className="text-emerald-700 font-semibold">12 Active</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Data Points/sec</span>
                        <span className="text-cyan-700 font-semibold">~2.4K</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Verification Latency</span>
                        <span className="text-teal-700 font-semibold">&lt;200ms</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* corner badges */}
              <div className="absolute -bottom-6 -left-6 bg-gradient-to-r from-violet-500 to-purple-500 text-white px-6 py-3 rounded-2xl shadow border border-violet-300/50">
                <div className="text-sm font-bold">Blockchain Native</div>
                <div className="text-xs/relaxed opacity-90">Cryptographically Sealed</div>
              </div>

              <div className="absolute -top-6 -right-6 bg-gradient-to-r from-sky-500 to-cyan-500 text-white px-6 py-3 rounded-2xl shadow border border-sky-300/50">
                <div className="text-sm font-bold">AI-Powered</div>
                <div className="text-xs/relaxed opacity-90">100% Autonomous</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TEASERS */}
      <section className="relative py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-semibold border border-emerald-300">
              Technology Preview
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900">
              What Makes{" "}
              <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
                Alpha Carbon
              </span>{" "}
              Different?
            </h2>
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
              Glimpses into the technology that will redefine carbon intelligence
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {TEASERS.map((t, i) => {
              const Icon = t.icon;
              return (
                <div
                  key={t.title}
                  className="group relative bg-white rounded-3xl p-8 border border-slate-200 hover:border-emerald-300 transition-all duration-500 hover:shadow-md"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${t.gradient} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`}
                  />
                  <div className="relative space-y-6">
                    <div className="flex items-start justify-between">
                      <div
                        className={`w-16 h-16 bg-gradient-to-br ${t.gradient} rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-500`}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="text-xs font-mono text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                        {t.hint}
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-slate-900">{t.title}</h3>
                    <p className="text-lg text-slate-700 leading-relaxed italic">"{t.teaser}"</p>
                    <p className="text-sm text-slate-600 leading-relaxed pt-4 border-t border-slate-200">
                      {t.details}
                    </p>

                    <div
                      className={`absolute bottom-4 right-4 w-24 h-24 bg-gradient-to-br ${t.gradient} opacity-0 group-hover:opacity-20 rounded-full blur-2xl transition-opacity duration-500`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* EMAIL SIGNUP */}
      <section className="relative py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-white rounded-3xl overflow-hidden shadow-xl border border-emerald-200">
            {/* pattern */}
            <div className="absolute inset-0 opacity-10">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 2px 2px, rgba(0,0,0,0.8) 1px, transparent 0)",
                  backgroundSize: "48px 48px",
                }}
              />
            </div>

            {/* orbs */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br from-emerald-300 to-teal-300 rounded-full opacity-40 blur-3xl" />
            <div
              className="absolute -bottom-24 -left-24 w-64 h-64 bg-gradient-to-br from-sky-300 to-cyan-300 rounded-full opacity-40 blur-3xl"
              style={{ animationDelay: "1s" }}
            />

            <div className="relative px-8 md:px-16 py-16 space-y-8">
              <div className="text-center space-y-4">
                <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-semibold border border-emerald-300">
                  <Mail className="w-4 h-4" />
                  Join the Waitlist
                </div>

                <h3 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight">
                  Be the First to Know When We
                  <br />
                  <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    Exit Stealth Mode
                  </span>
                </h3>

                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  Get exclusive early access, technical previews, and be part of shaping the future of autonomous carbon intelligence.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      className="w-full bg-white border border-slate-300 rounded-xl pl-12 pr-4 py-4 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submitted}
                    className="group bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2 whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {submitted ? (
                      <>
                        <CheckCircle className="w-5 h-5" />
                        Subscribed!
                      </>
                    ) : (
                      <>
                        Notify Me
                        <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              </form>

              {submitted && (
                <div className="text-center animate-fade-in">
                  <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-300 text-emerald-700 px-6 py-3 rounded-xl text-sm font-semibold">
                    <CheckCircle className="w-5 h-5" />
                    You're on the list! We'll reach out when we go live.
                  </div>
                </div>
              )}

              {/* Benefits */}
              <div className="grid md:grid-cols-3 gap-6 pt-8">
                {[
                  { icon: Zap, text: "Early Access", desc: "Be among the first to test" },
                  { icon: Database, text: "Technical Insights", desc: "Deep dives into our tech" },
                  { icon: Shield, text: "Founder Updates", desc: "Direct from the team" },
                ].map((b, i) => {
                  const BenefitIcon = b.icon;
                  return (
                    <div key={i} className="flex flex-col items-center text-center space-y-2">
                      <div className="w-12 h-12 bg-white border border-slate-200 rounded-xl flex items-center justify-center">
                        <BenefitIcon className="w-6 h-6 text-emerald-600" />
                      </div>
                      <div className="text-slate-900 font-semibold">{b.text}</div>
                      <div className="text-sm text-slate-600">{b.desc}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER STRIP */}
      

      {/* local keyframes */}
      <style>{`
        @keyframes float { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-16px) } }
        @keyframes fade-in { from { opacity: 0; transform: translateY(14px) } to { opacity: 1; transform: translateY(0) } }
        @keyframes gradient { 0%,100% { background-position: 0% 50% } 50% { background-position: 100% 50% } }
        @keyframes ping-slow { 0% { transform: scale(1); opacity: .6 } 100% { transform: scale(1.45); opacity: 0 } }
        @keyframes ping-slower { 0% { transform: scale(1); opacity: .4 } 100% { transform: scale(1.75); opacity: 0 } }
        @keyframes ping-slowest { 0% { transform: scale(1); opacity: .25 } 100% { transform: scale(2.1); opacity: 0 } }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-fade-in { animation: fade-in .85s ease-out; }
        .animate-gradient { background-size: 200% 200%; animation: gradient 3s ease infinite; }
        .animate-ping-slow { animation: ping-slow 4s cubic-bezier(0,0,.2,1) infinite; }
        .animate-ping-slower { animation: ping-slower 6s cubic-bezier(0,0,.2,1) infinite; }
        .animate-ping-slowest { animation: ping-slowest 8s cubic-bezier(0,0,.2,1) infinite; }
      `}</style>
    </div>
  );
}
