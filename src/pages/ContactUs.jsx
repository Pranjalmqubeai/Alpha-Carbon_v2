import React from "react";
import { Mail, Globe, Phone, MapPin, Send, Building2, Handshake } from "lucide-react";

const ContactUs = () => {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-b from-emerald-50 to-white py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Handshake className="w-4 h-4" />
            Contact Us
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
            Partner with Alpha Carbon — where AI meets Accountability.
          </h1>

          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Let’s co-create the future of intelligent carbon management. Whether you’re an energy
            producer, manufacturer, investor, or technology partner, we’ll help you build AI pipelines
            and carbon ledgers that scale credibly.
          </p>
        </div>
      </section>

      {/* Contact Cards + Form */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">
          {/* Cards */}
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-emerald-600" />
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Email</h3>
                  <p className="text-slate-600">info@alphacarbon.ai</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <Globe className="w-6 h-6 text-emerald-600" />
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Website</h3>
                  <p className="text-slate-600">www.alphacarbon.ai</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-emerald-600" />
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Headquarters</h3>
                  <p className="text-slate-600">
                    224 W 5th Street, Suite 500, New York, NY 10001
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-emerald-600" />
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Phone</h3>
                  <p className="text-slate-600">+1 (212) 555-4420</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <Building2 className="w-6 h-6 text-emerald-600" />
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Global Engineering Centers</h3>
                  <p className="text-slate-600">Bangalore · Singapore · Dubai</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-slate-200 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Schedule a Demo</h3>
              <form onSubmit={(e) => e.preventDefault()} className="grid md:grid-cols-2 gap-6">
                <div className="col-span-1">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                  <input
                    className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Jane Doe"
                  />
                </div>
                <div className="col-span-1">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Work Email</label>
                  <input
                    type="email"
                    className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="jane@company.com"
                  />
                </div>
                <div className="col-span-1">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Company</label>
                  <input
                    className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Company Inc."
                  />
                </div>
                <div className="col-span-1">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Role</label>
                  <input
                    className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Sustainability Lead"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-2">What would you like to explore?</label>
                  <textarea
                    rows={5}
                    className="w-full rounded-lg border border-slate-200 px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Carbon accounting, MRV automation, tokenization, etc."
                  />
                </div>
                <div className="md:col-span-2 flex justify-end">
                  <button className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors">
                    <Send className="w-4 h-4" />
                    Submit Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Dark Strip */}
      <section className="bg-slate-900 py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Let’s co-create provable, scalable carbon systems.
          </h2>
          <p className="text-slate-300 mt-3">
            Build with Agentic AI, MRV automation, and blockchain-verified credits.
          </p>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
