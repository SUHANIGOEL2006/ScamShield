import { Shield, Menu, X } from "lucide-react";
import { useState } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 z-50 w-full border-b border-slate-800/40 bg-[#08111F]/80 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6 lg:px-10">

        {/* Logo */}
        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500 shadow-lg shadow-green-500/20">
            <Shield size={22} className="text-white" />
          </div>
          <div className="leading-none">
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Scam<span className="text-green-500">Shield</span>
            </h1>

            <p className="mt-0.5 text-xs tracking-wide text-slate-400">
              Intelligent URL Risk Analyzer
            </p>
          </div>

        </div>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-10 lg:flex">

          <a
            href="#home"
            className="relative text-[17px] font-medium text-slate-300 transition-all duration-300 hover:text-white after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-green-500 after:transition-all after:duration-300 hover:after:w-full"
          >
            Home
          </a>

          <a
            href="#about"
            className="relative text-[17px] font-medium text-slate-300 transition-all duration-300 hover:text-white after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-green-500 after:transition-all after:duration-300 hover:after:w-full"
          >
            About
          </a>

        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-3xl text-white transition lg:hidden"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-slate-800 bg-[#08111F] lg:hidden">

          <a
            href="#home"
            onClick={() => setIsOpen(false)}
            className="block px-6 py-4 text-base font-medium text-slate-300 transition hover:bg-slate-900 hover:text-white"
          >
            Home
          </a>

          <a
            href="#about"
            onClick={() => setIsOpen(false)}
            className="block px-6 py-4 text-base font-medium text-slate-300 transition hover:bg-slate-900 hover:text-white"
          >
            About
          </a>

        </div>
      )}
    </nav>
  );
}

export default Navbar;