import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-10 text-sm text-slate-600">
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Alpha Carbon. All rights reserved.</p>
          <nav className="flex gap-5">
            <Link to="/platform" className="hover:text-slate-900">Platform</Link>
            <Link to="/resources" className="hover:text-slate-900">Resources</Link>
            <Link to="/about" className="hover:text-slate-900">About</Link>
            <Link to="/contact" className="hover:text-slate-900">Contact</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
