"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-gradient-to-r from-cyan-400/60 via-sky-500/60 to-indigo-800/60">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center h-16">
        {/* Logo */}
        <Link href="/" className="text-3xl font-bold text-white">
          <span className="tracking-tighter">BairuhaTech</span>
        </Link>

        {/* Mobile Menu Button (Hamburger) */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Nav Links - Desktop */}
        <div className="hidden md:flex gap-8 text-sm font-medium text-white">
          <Link href="#home" className="hover:text-cyan-200 transition">
            Home
          </Link>
          <Link href="#about" className="hover:text-cyan-200 transition">
            About Us
          </Link>
          <Link href="#careers" className="hover:text-cyan-200 transition">
            Careers
          </Link>
          <Link href="#vision" className="hover:text-cyan-200 transition">
            Our Vision
          </Link>
          <Link href="#services" className="hover:text-cyan-200 transition">
            Services
          </Link>
        </div>

        {/* CTA Button - Desktop */}
        <Link
          href="#contact"
          scroll={true}
          className="hidden md:block ml-6 px-5 py-2 rounded-full border border-white text-white font-semibold text-sm hover:border-cyan-300 hover:text-cyan-300 transition shadow-[0_0_10px_rgba(56,189,248,0.5)]"
        >
          CONTACT
        </Link>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden ${isOpen ? "block" : "hidden"
          } backdrop-blur-md bg-gradient-to-r from-cyan-400/90 via-sky-500/90 to-indigo-800/90 pb-4`}
      >
        <div className="flex flex-col items-center gap-4 text-sm font-medium text-white">
          <Link href="#home" className="py-2" onClick={toggleMenu}>
            Home
          </Link>
          <Link href="#about" className="py-2" onClick={toggleMenu}>
            About Us
          </Link>
          <Link href="#careers" className="py-2" onClick={toggleMenu}>
            Careers
          </Link>
          <Link href="#vision" className="py-2" onClick={toggleMenu}>
            Our Vision
          </Link>
          <Link href="#services" className="py-2" onClick={toggleMenu}>
            Services
          </Link>
          <Link
            href="#contact"
            className="px-5 py-2 rounded-full border border-white text-white font-semibold hover:border-cyan-300 hover:text-cyan-300 transition shadow-[0_0_10px_rgba(56,189,248,0.5)] mt-2"
            onClick={toggleMenu}
          >
            CONTACT
          </Link>
        </div>
      </div>
    </nav>
  );
}
