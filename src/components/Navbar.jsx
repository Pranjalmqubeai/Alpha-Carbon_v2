import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo.png";
import { AuthContext } from "../context/AuthContext";

const links = [
  { to: "/", label: "Home" },
  { to: "/platform", label: "Platform" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);

  const baseItem =
    "relative px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 hover:scale-[1.03]";
  const activeExtras = `
    text-emerald-700
    after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2
    after:w-1/2 after:h-0.5 after:rounded-full
    after:bg-gradient-to-r after:from-emerald-500 after:to-teal-500
  `;
  const inactiveExtras =
    "text-slate-600 hover:text-slate-900 hover:bg-slate-50/70";

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur-xl border-b border-emerald-100/70 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 h-18 lg:h-20 flex items-center justify-between">
        {/* Logo & Title */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative flex-shrink-0">
            <div className="absolute inset-0 rounded-2xl blur-xl opacity-25 group-hover:opacity-40 transition-opacity bg-gradient-to-r from-emerald-500 to-teal-600" />
            <img
              src={logo}
              alt="AlphaCarbon logo"
              className="relative w-11 h-11 lg:w-12 lg:h-12 rounded-2xl object-contain shadow-md border border-emerald-200/70 group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-[1.15rem] sm:text-lg lg:text-xl font-black tracking-tight">
              <span className="text-slate-900">AlphaCarbon</span>{" "}
              <span className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 bg-clip-text text-transparent animate-gradient">
                Integrity Platform
              </span>
            </span>
            <span className="text-[0.7rem] sm:text-xs text-slate-500 font-medium">
              Carbon Intelligence • Verification • Trust
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `${baseItem} ${isActive ? activeExtras : inactiveExtras}`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span className="absolute inset-0 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg" />
                  )}
                  <span className="relative">{link.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Auth Section (Desktop) */}
        <div className="hidden lg:flex items-center gap-3">
          {!user ? (
            <>
              <Link
                to="/signin"
                className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-emerald-700 transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition-colors shadow-sm hover:shadow"
              >
                Create Account
              </Link>
            </>
          ) : (
            <>
              <span className="px-3 py-2 rounded-xl text-sm font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200">
                Hi, {user.username || user.name || "User"}
              </span>
              <button
                onClick={logout}
                className="px-4 py-2 rounded-xl bg-white text-slate-700 text-sm font-semibold border border-slate-200 hover:bg-slate-50 transition-colors"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen((s) => !s)}
          className="lg:hidden p-2 text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur border-t border-emerald-100 shadow-xl animate-fade-in">
          <nav className="px-6 py-6 space-y-2">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 shadow-sm"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}

            {/* Mobile Auth Buttons */}
            <div className="mt-4 border-t border-emerald-100 pt-4 space-y-3">
              {!user ? (
                <>
                  <Link
                    to="/signin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full block text-center px-4 py-3 text-sm font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full block text-center px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-semibold text-sm shadow-lg"
                  >
                    Create Account
                  </Link>
                </>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                  }}
                  className="w-full block text-center px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-semibold text-sm shadow-lg"
                >
                  Logout
                </button>
              )}
            </div>
          </nav>
        </div>
      )}

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-fade-in { animation: fade-in 0.2s ease-out; }
        .animate-gradient { background-size: 200% auto; animation: gradient 3s ease infinite; }
      `}</style>
    </header>
  );
}
