import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBars, FaTimes, FaGraduationCap, FaUser, FaSignOutAlt, FaCog, FaChartLine } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileMenuRef = useRef(null);
  const { currentUser, logout } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-indigo-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <FaGraduationCap className="h-8 w-8 mr-2" />
              <span className="font-bold text-xl">LearnHub</span>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="px-3 py-2 rounded-md hover:bg-indigo-500 transition-colors">
              Home
            </Link>
            <Link to="/courses" className="px-3 py-2 rounded-md hover:bg-indigo-500 transition-colors">
              Courses
            </Link>
            <Link to="/about" className="px-3 py-2 rounded-md hover:bg-indigo-500 transition-colors">
              About
            </Link>
            
            {currentUser ? (
              <div className="relative ml-4" ref={profileMenuRef}>
                <button
                  onClick={toggleProfileMenu}
                  className="flex items-center focus:outline-none"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="h-8 w-8 rounded-full object-cover border-2 border-white"
                  />
                  <span className="ml-2">{currentUser.name}</span>
                  <svg
                    className={`ml-1 h-5 w-5 transition-transform ${
                      showProfileMenu ? 'transform rotate-180' : ''
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                
                {showProfileMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10"
                  >
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      <FaUser className="mr-2 text-indigo-600" />
                      My Profile
                    </Link>
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      <FaChartLine className="mr-2 text-indigo-600" />
                      Dashboard
                    </Link>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      <FaCog className="mr-2 text-indigo-600" />
                      Account Settings
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setShowProfileMenu(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <FaSignOutAlt className="mr-2 text-indigo-600" />
                      Sign Out
                    </button>
                  </motion.div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="px-3 py-2 rounded-md hover:bg-indigo-500 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="ml-2 px-4 py-2 bg-white text-indigo-600 font-medium rounded-md hover:bg-gray-100 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-indigo-500 focus:outline-none"
            >
              {isOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="md:hidden"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md hover:bg-indigo-500 transition-colors"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              to="/courses"
              className="block px-3 py-2 rounded-md hover:bg-indigo-500 transition-colors"
              onClick={toggleMenu}
            >
              Courses
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 rounded-md hover:bg-indigo-500 transition-colors"
              onClick={toggleMenu}
            >
              About
            </Link>
            
            {currentUser ? (
              <>
                <div className="flex items-center px-3 py-2">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="h-8 w-8 rounded-full object-cover border-2 border-white"
                  />
                  <span className="ml-2">{currentUser.name}</span>
                </div>
                <Link
                  to="/profile"
                  className="block px-3 py-2 rounded-md hover:bg-indigo-500 transition-colors flex items-center"
                  onClick={toggleMenu}
                >
                  <FaUser className="mr-2" />
                  My Profile
                </Link>
                <Link
                  to="/dashboard"
                  className="block px-3 py-2 rounded-md hover:bg-indigo-500 transition-colors flex items-center"
                  onClick={toggleMenu}
                >
                  <FaChartLine className="mr-2" />
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    logout();
                    toggleMenu();
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md hover:bg-indigo-500 transition-colors flex items-center"
                >
                  <FaSignOutAlt className="mr-2" />
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md hover:bg-indigo-500 transition-colors"
                  onClick={toggleMenu}
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="block px-3 py-2 bg-white text-indigo-600 font-medium rounded-md hover:bg-gray-100 transition-colors text-center"
                  onClick={toggleMenu}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;