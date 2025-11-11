import React from "react";
import { Link, NavLink } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { useCart } from "../contexts/CartProvider";
import { useAuth } from "../contexts/AuthProvider";

const Navbar = () => {
  const { cart } = useCart();
  const { isLoggedIn, logout } = useAuth();

  return (
    <header className="bg-gradient-to-r from-[#005f82] to-[#002f56] text-white shadow-lg sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto flex justify-between items-center px-8 py-4">
        {/* Logo / Brand Name */}
        <h1 className="text-2xl font-semibold tracking-wide font-[Poppins] hover:text-[#ffcc66] transition">
          <Link to="/">My Website</Link>
        </h1>

        {/* Navigation Links */}
        <ul className="flex gap-8 text-[16px] font-[Poppins] flex-wrap items-center">
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive
                  ? "text-[#ffcc66] font-semibold border-b-2 border-[#ffcc66] pb-1"
                  : "hover:text-[#ffcc66] transition"
              }
            >
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "text-[#ffcc66] font-semibold border-b-2 border-[#ffcc66] pb-1"
                  : "hover:text-[#ffcc66] transition"
              }
            >
              About
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/blog"
              className={({ isActive }) =>
                isActive
                  ? "text-[#ffcc66] font-semibold border-b-2 border-[#ffcc66] pb-1"
                  : "hover:text-[#ffcc66] transition"
              }
            >
              Blog
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive
                  ? "text-[#ffcc66] font-semibold border-b-2 border-[#ffcc66] pb-1 flex items-center gap-2"
                  : "hover:text-[#ffcc66] transition flex items-center gap-2"
              }
            >
              <FaCartShopping className="text-[18px]" />
              Cart ({cart.length})
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? "text-[#ffcc66] font-semibold border-b-2 border-[#ffcc66] pb-1"
                  : "hover:text-[#ffcc66] transition"
              }
            >
              Contact
            </NavLink>
          </li>

          <li>
            {isLoggedIn ? (
              <button
                onClick={logout}
                className="bg-[#ffcc66] text-[#002f56] font-semibold px-4 py-2 rounded-full hover:bg-[#ffd98b] hover:scale-105 transition-transform duration-200 shadow-md"
              >
                Logout
              </button>
            ) : (
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive
                    ? "text-[#ffcc66] font-semibold border-b-2 border-[#ffcc66] pb-1"
                    : "hover:text-[#ffcc66] transition"
                }
              >
                Login
              </NavLink>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
