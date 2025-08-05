import React from "react";
import useNavbar from "./useNavbar";
import { FaBars, FaTimes } from "react-icons/fa";
import { navlinks } from "@config/navlinks";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "@store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { navbarOpen, currentPath, toggleNavbar } = useNavbar();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const handleLogout = () => {
    dispatch(logout()); // clear token from Redux + localStorage
    navigate("/login"); // redirect to login page
  };

  return (
    <>
      <button
        onClick={toggleNavbar}
        className="z-[100] fixed top-4 left-4 text-4xl"
        aria-label="Toggle navbar"
      >
        {navbarOpen ? (
          <FaTimes className="text-white" />
        ) : (
          <FaBars className="text-white" />
        )}
      </button>

      <div
        className={`font-cartoon z-[99] fixed top-0 h-screen w-[300px] bg-[#141923] transition-all duration-300 shadow-lg
          ${navbarOpen ? "left-0" : "left-[-100em]"}`}
      >
        <ul className="py-6 space-y-2 mt-[50px] h-full">
          {navlinks.map((link) => (
            <li
              className={`px-5 ${
                currentPath === link.href.replace("/", "") ? "bg-[#1D2F38]" : ""
              } 
            
            
            `}
              key={link.href}
            >
              <Link to={link.href}>
                <span
                  className={`transition-all duration-200 cursor-pointer text-2xl ${
                    currentPath === link.href.replace("/", "")
                      ? "text-offwhite px-10"
                      : "text-offwhite"
                  }`}
                >
                  {link.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <button
          onClick={handleLogout}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 px-3 border text-[1.1em] text-red-400 rounded-lg cursor-pointer hover:text-white hover:bg-red-400 hover:border-red-400"
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default Navbar;
