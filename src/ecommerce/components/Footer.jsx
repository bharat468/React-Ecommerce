import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#005f82] to-[#002f56] text-white py-10 px-8 shadow-inner">
      
      {/* Footer Links */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-center gap-20 mb-6 text-[16px] font-[Poppins]">
        <ul className="space-y-2 text-center">
          <li><Link to="/about" className="hover:text-[#ffcc66] transition-all duration-300">About Us</Link></li>
          <li><Link to="/shop" className="hover:text-[#ffcc66] transition-all duration-300">Shop</Link></li>
          <li><Link to="/locate" className="hover:text-[#ffcc66] transition-all duration-300">Locate Us</Link></li>
        </ul>

        <ul className="space-y-2 text-center">
          <li><Link to="/about" className="hover:text-[#ffcc66] transition-all duration-300">About Us</Link></li>
          <li><Link to="/shop" className="hover:text-[#ffcc66] transition-all duration-300">Shop</Link></li>
          <li><Link to="/locate" className="hover:text-[#ffcc66] transition-all duration-300">Locate Us</Link></li>
        </ul>

        <ul className="space-y-2 text-center">
          <li><Link to="/about" className="hover:text-[#ffcc66] transition-all duration-300">About Us</Link></li>
          <li><Link to="/shop" className="hover:text-[#ffcc66] transition-all duration-300">Shop</Link></li>
          <li><Link to="/locate" className="hover:text-[#ffcc66] transition-all duration-300">Locate Us</Link></li>
        </ul>
      </div>

      {/* Divider */}
      <div className="mt-4 border-t border-white/30 w-[90%] mx-auto"></div>

      {/* Copyright */}
      <div className="text-center mt-4 text-sm text-gray-300">
        © {new Date().getFullYear()} All Rights Reserved - <span className="text-[#ffcc66]">BHARAT</span>
      </div>
    </footer>
  );
};

export default Footer;
