import { Link } from "react-router-dom";
import { Lock } from "lucide-react";
import logo from "../assets/logo.png";

export default function Footer() {
  return (
    <footer className="border-t border-emerald-100 bg-gradient-to-b from-white to-emerald-50/50 backdrop-blur">
      <section className="py-12 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            {/* Brand */}
            <div className="flex items-center gap-4">
              <Link to="/" className="group relative">
                <span className="absolute inset-0 rounded-2xl blur-xl opacity-25 group-hover:opacity-40 transition-opacity bg-gradient-to-r from-emerald-500 to-teal-600" />
                <img
                  src={logo}
                  alt="AlphaCarbon Integrity Platform logo"
                  className="relative w-12 h-12 rounded-2xl object-contain border border-emerald-100 shadow-sm"
                />
              </Link>

              <div className="space-y-1 text-left">
                <Link to="/" className="block">
                  <div className="text-2xl font-black text-slate-900">
                    AlphaCarbon{" "}
                    <span className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 bg-clip-text text-transparent">
                      Integrity Platform
                    </span>
                  </div>
                </Link>
                <p className="text-sm text-slate-600 font-medium">
                  Enabling verified and intelligent decarbonization.
                </p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex flex-wrap justify-center gap-6 text-sm font-medium text-slate-600">
              <Link to="/platform" className="hover:text-emerald-700 transition-colors">
                Platform
              </Link>
              <Link to="/resources" className="hover:text-emerald-700 transition-colors">
                Resources
              </Link>
              <Link to="/about" className="hover:text-emerald-700 transition-colors">
                About
              </Link>
              <Link to="/contact" className="hover:text-emerald-700 transition-colors">
                Contact
              </Link>
            </nav>

            {/* Legal / Status */}
            <div className="flex items-center gap-3 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-emerald-600" />
                <span className="text-slate-600">Integrity First</span>
              </div>
              <span className="hidden sm:block">•</span>
              <span>© {new Date().getFullYear()} AlphaCarbon Integrity Platform</span>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-slate-200 mt-10 pt-6 text-center text-sm text-slate-500">
            Built with 💚 by{" "}
            <span className="font-semibold text-emerald-700">
              AlphaCarbon Intelligence Team
            </span>
          </div>
        </div>
      </section>
    </footer>
  );
}
