import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaSignOutAlt, FaUser } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import axios from "axios";
import Api from "../../API/Api";

const Navbar = ({ user, profile }) => {
  const token = localStorage.getItem("Token");
  const api = Api();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const toggleMobileMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  useEffect(() => {
    fetchData();
  }, [profile]);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(`${api}/userprofile`, {
        headers: { authorization: `Bearer ${token}` },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="bg-gray-900 p-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo/Title */}
        <Link to="/" className="text-white font-bold text-3xl">
          CHATS
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {/* <Link to="/" className="text-white hover:underline">
            Home
          </Link> */}

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center space-x-2 text-white"
            >
              <img
                src={profile || "https://via.placeholder.com/150"}
                alt="Profile"
                className="rounded-full w-10 h-10 object-cover"
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-gray-800 rounded-lg shadow-lg z-50 transform origin-top-right animate-fade-in">
                <div className="flex flex-col items-center space-y-4 p-4">
                  <div className="flex flex-wrap items-center">
                  <img src={profile} alt="user" className="w-7 h-7 object-cover border-gray-800 rounded-full mr-2" />
                  <span className="text-gray-200 text-sm"> {user}</span>
                  </div>
                  <Link
                    to="/profile"
                    className="flex items-center text-gray-300 hover:text-indigo-400"
                  >
                    <FaUser className="mr-2" /> Profile
                  </Link>
                  <button
                    onClick={logout}
                    className="flex items-center text-gray-300 hover:text-red-400"
                  >
                    <FaSignOutAlt className="mr-2" /> Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="text-white">
            {isMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden mt-2 bg-gray-700 shadow-lg rounded-md">
          <ul className="py-2">
            <li>
              <Link
                to="/profile"
                className="block px-4 py-2 text-gray-300 hover:bg-gray-600"
              >
                Profile
              </Link>
            </li>
            <li>
              <button
                onClick={logout}
                className="block w-full px-4 py-2 text-gray-300 hover:bg-gray-600"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
