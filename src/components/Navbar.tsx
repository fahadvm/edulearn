import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Home as HomeIcon,
  User,
  Info,
  Phone,
  Menu,
  X
} from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="backdrop-blur-lg bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent"
        >
          EduLearn
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-8 items-center text-white">
          <Link to="/" className="flex items-center gap-2 hover:text-yellow-400 transition">
            <HomeIcon size={18} /> Home
          </Link>

          <Link to="/about" className="flex items-center gap-2 hover:text-yellow-400 transition">
            <Info size={18} /> About
          </Link>

          <Link to="/contact" className="flex items-center gap-2 hover:text-yellow-400 transition">
            <Phone size={18} /> Contact
          </Link>

          <Link to="/profile" className="flex items-center gap-2 hover:text-yellow-400 transition">
            <User size={18} /> Profile
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white hover:text-yellow-400 transition"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      <div
        className={`md:hidden backdrop-blur-xl bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 border-t border-white/10 transition-all duration-300 overflow-hidden ${
          open ? "max-h-60 py-4" : "max-h-0 py-0"
        }`}
      >
        <nav className="flex flex-col space-y-4 px-6 text-white">

          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 hover:text-yellow-400 transition"
          >
            <HomeIcon size={20} /> Home
          </Link>

          <Link
            to="/about"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 hover:text-yellow-400 transition"
          >
            <Info size={20} /> About
          </Link>

          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 hover:text-yellow-400 transition"
          >
            <Phone size={20} /> Contact
          </Link>

          <Link
            to="/profile"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 hover:text-yellow-400 transition"
          >
            <User size={20} /> Profile
          </Link>

        </nav>
      </div>
    </header>
  );
}
