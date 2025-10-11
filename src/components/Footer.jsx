import { Link } from "react-router-dom";
import { Lock } from "lucide-react";
import logo from "../assets/logo.png"; // adjust path if this file is elsewhere

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <section className="py-12 px-6 bg-white/80">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            {/* Brand + tagline */}
            <div className="flex items-center gap-3">
              <Link to="/" className="group relative">
                <span className="absolute inset-0 rounded-xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity bg-gradient-to-r from-emerald-500 to-teal-500" />
                <img
                  src={logo}
                  alt="Alpha Carbon logo"
                  className="relative w-10 h-10 rounded-xl object-contain border border-emerald-100 shadow-sm"
                />
              </Link>

              <div className="space-y-1 text-left">
                <Link to="/" className="block">
                  <div className="text-2xl font-black text-slate-900">
                    Alpha{" "}
                    <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                      Carbon
                    </span>
                  </div>
                </Link>
                <p className="text-sm text-slate-600">
                  Building the future of autonomous carbon intelligence
                </p>
              </div>
            </div>

            {/* Simple nav */}
            <nav className="flex gap-5 text-sm text-slate-600">
              <Link to="/platform" className="hover:text-slate-900">
                Platform
              </Link>
              <Link to="/resources" className="hover:text-slate-900">
                Resources
              </Link>
              <Link to="/about" className="hover:text-slate-900">
                About
              </Link>
              <Link to="/contact" className="hover:text-slate-900">
                Contact
              </Link>
            </nav>

            {/* Status + year */}
            <div className="flex items-center gap-4 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-emerald-600" />
                <span>Stealth Mode Active</span>
              </div>
              <span>•</span>
              <span>© {new Date().getFullYear()} Alpha Carbon</span>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}
