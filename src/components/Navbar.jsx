import { NavLink, Link } from "react-router-dom";
import Button from "./ui/Button.jsx";
import Logo from "../assets/logo.png"; // <-- adjust if your path differs

const links = [
  { to: "/", label: "Home" },
  { to: "/platform", label: "Platform" },
  { to: "/resources", label: "Resources" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src={Logo}
            alt="Alpha Carbon"
            className="h-8 w-auto object-contain"
            loading="eager"
            fetchpriority="high"
          />
          <span className="sr-only">Alpha Carbon</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `text-sm ${
                  isActive ? "text-slate-900 font-semibold" : "text-slate-600 hover:text-slate-900"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:block">
          <Button as={Link} to="/contact">Schedule a Demo</Button>
        </div>
      </div>
    </header>
  );
}
