import { useState, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X, ChevronRight } from "lucide-react";
import logo from "../assets/logo.png";
import { AuthContext } from "../context/AuthContext";

const links = [
  { to: "/", label: "Home" },
  { to: "/platform", label: "Platform" },
  { to: "/resources", label: "Resources" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/signin");
  };

  const baseItem =
    "relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300";
  const activeExtras = `
    text-emerald-700
    after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2
    after:w-1/2 after:h-0.5 after:rounded-full
    after:bg-gradient-to-r after:from-emerald-500 after:to-teal-500
  `;
  const inactiveExtras = "text-slate-600 hover:text-slate-900";

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur-xl border-b border-emerald-100 shadow-sm">
      <div className="mx-auto max-w-7xl px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="absolute inset-0 rounded-xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity bg-gradient-to-r from-emerald-500 to-teal-500" />
            <img
              src={logo}
              alt="Alpha Carbon logo"
              className="relative w-10 h-10 rounded-xl object-contain shadow-lg border border-emerald-100"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black text-slate-900">
              Alpha{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Carbon
              </span>
            </span>
            <span className="text-xs text-slate-500 font-medium -mt-0.5">
              Carbon OS Platform
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `${baseItem} ${isActive ? activeExtras : inactiveExtras}`
              }
              end={link.to === "/"} // exact for home
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

        {/* Right Section (Dynamic) */}
        <div className="hidden lg:flex items-center gap-4">
          {!user ? (
            <>
              <Link
                to="/signin"
                className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-emerald-700 transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/contact"
                className="group relative px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl hover:shadow-emerald-500/30 transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2 overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative">Schedule Demo</span>
                <ChevronRight className="relative w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </>
          ) : (
            <>
              <span className="text-sm font-semibold text-slate-700">
                Hi, {user.username}
              </span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-semibold text-sm hover:bg-emerald-700 transition-all"
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
        <div className="lg:hidden bg-white border-t border-emerald-100 shadow-xl animate-fade-in">
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
                <div className="flex items-center justify-between">
                  {link.label}
                </div>
              </NavLink>
            ))}

            {/* Auth Buttons */}
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
                    to="/contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full block text-center px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-semibold text-sm shadow-lg"
                  >
                    Schedule Demo
                  </Link>
                </>
              ) : (
                <button
                  onClick={handleLogout}
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
        .animate-fade-in { animation: fade-in 0.2s ease-out; }
      `}</style>
    </header>
  );
}
