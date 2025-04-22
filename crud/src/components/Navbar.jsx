import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { searchUser } from "../features/userDetailSlice";
import { FiSearch, FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const dispatch = useDispatch();
  const allusers = useSelector((state) => state.app.users);
  const [searchData, setSearchData] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    dispatch(searchUser(searchData));
  }, [searchData, dispatch]);

  return (
    <nav className="bg-blue-100 font-sans shadow-md border-b border-blue-200">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-blue-800 tracking-wide hover:text-blue-900 transition duration-300"
        >
          CRUDify
        </Link>

        {/* Desktop Search Bar */}
        <div className="hidden md:flex items-center bg-white px-3 py-2 rounded-lg border border-blue-200 w-72 shadow-sm">
          <FiSearch className="text-blue-500 mr-2" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchData}
            onChange={(e) => setSearchData(e.target.value)}
            className="bg-transparent outline-none text-gray-700 w-full placeholder-gray-500"
            aria-label="Search users"
          />
        </div>

        {/* Hamburger Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-2xl text-blue-800 lg:hidden focus:outline-none"
        >
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </button>

        {/* Desktop Navigation Links */}
        <ul className="hidden lg:flex space-x-8 text-blue-900 font-medium">
          <li>
            <Link
              to="/"
              className="hover:text-blue-600 transition duration-300"
            >
              Create Post
            </Link>
          </li>
          <li>
            <Link
              to="/read"
              className="hover:text-blue-600 transition duration-300"
            >
              All Posts ({allusers.length})
            </Link>
          </li>
        
        </ul>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden px-4 pb-4">
          <div className="flex flex-col gap-4 text-blue-900 font-medium">
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="hover:text-blue-600"
            >
              Create Post
            </Link>
            <Link
              to="/read"
              onClick={() => setIsMenuOpen(false)}
              className="hover:text-blue-600"
            >
              All Posts ({allusers.length})
            </Link>

            {/* Mobile Search Bar */}
            <div className="flex items-center mt-2 bg-white px-3 py-2 rounded-lg border border-blue-200 shadow-sm">
              <FiSearch className="text-blue-500 mr-2" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchData}
                onChange={(e) => setSearchData(e.target.value)}
                className="bg-transparent outline-none text-gray-700 w-full placeholder-gray-500"
                aria-label="Search users"
              />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
