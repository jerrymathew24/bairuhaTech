"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminNavbar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    router.replace("/admin-login");
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-gradient-to-r from-cyan-400/60 via-sky-500/60 to-blue-800/60 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex justify-between items-center h-16">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl sm:text-2xl font-extrabold text-white tracking-wide"
        >
          BiruhaTech
        </Link>

        {/* Greeting (hidden on small screens) */}
        <div className="hidden sm:block text-white text-base md:text-lg font-medium">
          Hi, Admin
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="bg-gradient-to-r from-cyan-400/60 via-sky-500/60 to-blue-800/60 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-md sm:rounded-lg text-sm sm:text-base hover:bg-white hover:text-black transition font-semibold shadow-md"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
