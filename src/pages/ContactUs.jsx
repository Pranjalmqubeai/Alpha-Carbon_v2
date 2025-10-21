import React, { useState } from "react";
import { Mail, Globe, Phone, MapPin, Send, Building2, Handshake } from "lucide-react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-slate-50 via-emerald-50/30 to-white py-24 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white text-emerald-700 px-5 py-2 rounded-full text-sm font-medium mb-8 shadow-sm border border-emerald-100">
            <Handshake className="w-4 h-4" />
            Contact Us
          </div>

          <h1 className="text-5xl md:text-7xl font-light text-slate-900 mb-6 tracking-tight">
            Partner with Alpha Carbon
            <span className="block font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">where AI meets Accountability</span>
          </h1>

          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Let's co-create the future of intelligent carbon management. Whether you're an energy
            producer, manufacturer, investor, or technology partner, we'll help you build AI pipelines
            and carbon ledgers that scale credibly.
          </p>
        </div>
      </section>

      {/* Contact Cards + Form */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <div className="space-y-6">
            <div className="bg-white border border-slate-100 rounded-2xl p-6 hover:shadow-xl hover:border-emerald-100 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-1">Email</h3>
                  <p className="text-slate-600">info@alphacarbon.ai</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-100 rounded-2xl p-6 hover:shadow-xl hover:border-emerald-100 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Globe className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-1">Website</h3>
                  <p className="text-slate-600">www.alphacarbon.ai</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-100 rounded-2xl p-6 hover:shadow-xl hover:border-emerald-100 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-1">Headquarters</h3>
                  <p className="text-slate-600 leading-relaxed">
                    224 W 5th Street, Suite 500, New York, NY 10001
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-100 rounded-2xl p-6 hover:shadow-xl hover:border-emerald-100 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-1">Phone</h3>
                  <p className="text-slate-600">+1 (212) 555-4420</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-100 rounded-2xl p-6 hover:shadow-xl hover:border-emerald-100 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-1">Global Engineering Centers</h3>
                  <p className="text-slate-600">Bangalore · Singapore · Dubai</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-slate-100 rounded-2xl p-10 hover:shadow-xl hover:border-emerald-100 transition-all">
              <h3 className="text-3xl font-semibold text-slate-900 mb-8">Schedule a Demo</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="col-span-1">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                  <input
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="w-full rounded-lg border border-slate-200 px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    placeholder="Jane Doe"
                  />
                </div>
                <div className="col-span-1">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Work Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="w-full rounded-lg border border-slate-200 px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    placeholder="jane@company.com"
                  />
                </div>
                <div className="col-span-1">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Company</label>
                  <input
                    value={formData.company}
                    onChange={(e) => handleChange('company', e.target.value)}
                    className="w-full rounded-lg border border-slate-200 px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    placeholder="Company Inc."
                  />
                </div>
                <div className="col-span-1">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Role</label>
                  <input
                    value={formData.role}
                    onChange={(e) => handleChange('role', e.target.value)}
                    className="w-full rounded-lg border border-slate-200 px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    placeholder="Sustainability Lead"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-2">What would you like to explore?</label>
                  <textarea
                    rows={5}
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    className="w-full rounded-lg border border-slate-200 px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none"
                    placeholder="Carbon accounting, MRV automation, tokenization, etc."
                  />
                </div>
                <div className="md:col-span-2 flex justify-end">
                  <button 
                    onClick={handleSubmit}
                    className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-3.5 rounded-lg font-medium hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl"
                  >
                    <Send className="w-4 h-4" />
                    Submit Request
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-light text-white mb-6 tracking-tight">
            Let's co-create provable, scalable <span className="font-semibold">carbon systems.</span>
          </h2>
          <p className="text-xl text-slate-300 leading-relaxed">
            Build with Agentic AI, MRV automation, and blockchain-verified credits.
          </p>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;