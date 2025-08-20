"use client";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaYoutube
} from "react-icons/fa";
import { MdMail, MdPhone } from "react-icons/md";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Logo & About */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-full font-bold text-white">
              BiruhaTech
            </div>
          </div>
          <p className="text-sm leading-relaxed">
            BiruhaTech is an AI-centric software development company delivering
            intelligent solutions in asset management, predictive analytics, and
            enterprise automation to power digital transformation.
          </p>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Services</h3>
          <ul className="space-y-2 text-sm">
            <li>AI-driven Asset Management</li>
            <li>Predictive Maintenance & SLA Tracking</li>
            <li>Data Analytics & Reporting</li>
            <li>Cloud & Enterprise Solutions</li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Company</h3>
          <ul className="space-y-2 text-sm ">
            <li>
              <Link href="#why-us" className="hover:text-cyan-600">
                Why Us
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-cyan-600">Careers</Link>
            </li>
            <li>
              <Link href="#" className="hover:text-cyan-600">Privacy Policy</Link>
            </li>
            <li>
              <Link href="#" className="hover:text-cyan-600">Terms & Conditions</Link>
            </li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
          <p className="flex items-center gap-2 text-sm">
            <MdMail size={20} /> contact@biruhatech.com
          </p>
          <p className="flex items-center gap-2 text-sm">
            <MdPhone size={20} /> +91 98765 43210
          </p>
          <p className="text-sm mt-2">Thamarassery, Kerala, India</p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-4">
            <FaFacebookF className="hover:text-blue-500 cursor-pointer" size={18} />
            <FaInstagram className="hover:text-pink-500 cursor-pointer" size={18} />
            <FaLinkedinIn className="hover:text-blue-400 cursor-pointer" size={18} />
            <FaTwitter className="hover:text-sky-400 cursor-pointer" size={18} />
            <FaYoutube className="hover:text-red-500 cursor-pointer" size={18} />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} BiruhaTech. All rights reserved.
      </div>
    </footer>
  );
}
