import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#005f82] to-[#002f56] text-white py-10 px-8 shadow-inner">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Left Side - Copyright */}
        <p className="text-[16px] font-semibold tracking-wide">
          &copy; {new Date().getFullYear()} <span className="text-[#ffcc66]"></span> — All Rights Reserved Bharat
        </p>

        {/* Right Side - Links */}
        <ul className="flex flex-wrap justify-center md:justify-end gap-8 text-[16px] font-[Poppins]">
          <li>
            <Link
              to="/"
              className="hover:text-[#ffcc66] transition-all duration-300"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="hover:text-[#ffcc66] transition-all duration-300"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/blog"
              className="hover:text-[#ffcc66] transition-all duration-300"
            >
              Blog
            </Link>
          </li>
          <li>
            <Link
              to="/cart"
              className="hover:text-[#ffcc66] transition-all duration-300"
            >
              Cart
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="hover:text-[#ffcc66] transition-all duration-300"
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>

      {/* Divider */}
      <div className="mt-6 border-t border-white/30"></div>

      {/* Bottom Note */}
      <div className="text-center mt-4 text-sm text-gray-300">
        Designed & Developed by{" "}
        <span className="text-[#ffcc66] font-medium">Bharat</span>
      </div>
    </footer>
  );
};

export default Footer;
