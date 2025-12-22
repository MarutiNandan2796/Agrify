import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileMenuRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="bg-gradient-to-r from-white via-green-50 to-blue-50 shadow-2xl border-b-4 border-gradient-to-r from-green-500 to-blue-500 sticky top-0 z-50 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center group">
              <span className="text-4xl group-hover:scale-125 transition-transform duration-300 animate-pulse-slow">🌱</span>
              <span className="ml-3 text-2xl font-extrabold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent group-hover:from-green-500 group-hover:to-blue-500 transition-all">
                AgriTech
              </span>
            </Link>
            
            <div className="hidden md:ml-12 md:flex md:space-x-2">
              <Link
                to="/dashboard"
                className="group relative text-gray-700 hover:text-white px-5 py-2 rounded-xl text-sm font-bold transition-all duration-300 hover:bg-gradient-to-r hover:from-green-500 hover:to-emerald-600 hover:shadow-lg transform hover:scale-105"
              >
                <span className="relative z-10 flex items-center">
                  <span className="mr-2 text-lg">📊</span>
                  Dashboard
                </span>
              </Link>
              <Link
                to="/soil-test"
                className="group relative text-gray-700 hover:text-white px-5 py-2 rounded-xl text-sm font-bold transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-600 hover:shadow-lg transform hover:scale-105"
              >
                <span className="relative z-10 flex items-center">
                  <span className="mr-2 text-lg">➕</span>
                  New Test
                </span>
              </Link>
              <Link
                to="/history"
                className="group relative text-gray-700 hover:text-white px-5 py-2 rounded-xl text-sm font-bold transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-600 hover:shadow-lg transform hover:scale-105"
              >
                <span className="relative z-10 flex items-center">
                  <span className="mr-2 text-lg">📋</span>
                  History
                </span>
              </Link>
              {isAdmin && (
                <Link
                  to="/admin"
                  className="group relative text-gray-700 hover:text-white px-5 py-2 rounded-xl text-sm font-bold transition-all duration-300 hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-600 hover:shadow-lg transform hover:scale-105"
                >
                  <span className="relative z-10 flex items-center">
                    <span className="mr-2 text-lg">⚙️</span>
                    Admin
                  </span>
                </Link>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Profile Dropdown */}
            <div className="relative" ref={profileMenuRef}>
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="relative bg-gradient-to-br from-white to-green-50 backdrop-blur-sm rounded-2xl shadow-lg border-2 border-green-300 hover:border-green-500 hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer group overflow-hidden"
              >
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-blue-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10 flex items-center space-x-3 px-4 py-2.5">
                  {/* Profile Avatar Circle */}
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform border-2 border-white">
                    <span className="text-xl">👤</span>
                  </div>
                  
                  {/* Content */}
                  <div className="flex flex-col">
                    <p className="text-gray-800 font-bold text-sm leading-tight flex items-center">
                      {user?.name}
                      <svg 
                        className={`ml-1.5 w-3.5 h-3.5 text-green-600 transition-transform duration-300 ${showProfileMenu ? 'rotate-90' : ''}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </p>
                    
                    {/* Role Badge */}
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-sm group-hover:shadow-md transition-shadow mt-1">
                      <span className="mr-1 text-xs">🌾</span>
                      {user?.role}
                    </span>
                  </div>
                </div>
              </button>

              {/* Dropdown Menu */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl border-2 border-green-200 overflow-hidden z-50 animate-fade-in">
                  {/* Profile Header - Clickable */}
                  <Link
                    to="/dashboard"
                    onClick={() => setShowProfileMenu(false)}
                    className="block bg-gradient-to-r from-green-500 to-blue-500 p-4 hover:from-green-600 hover:to-blue-600 transition-all duration-300 cursor-pointer group"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <span className="text-3xl">👤</span>
                      </div>
                      <div className="text-white flex-1">
                        <p className="font-bold text-lg flex items-center">
                          {user?.name}
                          <svg className="ml-2 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </p>
                        <p className="text-sm opacity-90">{user?.email}</p>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold uppercase bg-white/20 backdrop-blur-sm mt-1">
                          {user?.role}
                        </span>
                      </div>
                    </div>
                  </Link>

                  {/* Menu Items */}
                  <div className="py-2">
                    <Link
                      to="/dashboard"
                      onClick={() => setShowProfileMenu(false)}
                      className="flex items-center space-x-3 px-4 py-3 hover:bg-green-50 transition-colors group"
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                        <span className="text-xl">📊</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">Dashboard</p>
                        <p className="text-xs text-gray-500">View your overview</p>
                      </div>
                    </Link>

                    <Link
                      to="/profile"
                      onClick={() => setShowProfileMenu(false)}
                      className="flex items-center space-x-3 px-4 py-3 hover:bg-green-50 transition-colors group"
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                        <span className="text-xl">👨‍🌾</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">My Profile</p>
                        <p className="text-xs text-gray-500">Manage account details</p>
                      </div>
                    </Link>

                    <Link
                      to="/history"
                      onClick={() => setShowProfileMenu(false)}
                      className="flex items-center space-x-3 px-4 py-3 hover:bg-green-50 transition-colors group"
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                        <span className="text-xl">🔬</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">Test History</p>
                        <p className="text-xs text-gray-500">View all soil tests</p>
                      </div>
                    </Link>

                    <Link
                      to="/settings"
                      onClick={() => setShowProfileMenu(false)}
                      className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-green-50 transition-colors group"
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                        <span className="text-xl">⚙️</span>
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-gray-800">Settings</p>
                        <p className="text-xs text-gray-500">Preferences & security</p>
                      </div>
                    </Link>

                    <Link
                      to="/help"
                      onClick={() => setShowProfileMenu(false)}
                      className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-green-50 transition-colors group"
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                        <span className="text-xl">❓</span>
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-gray-800">Help & Support</p>
                        <p className="text-xs text-gray-500">Get assistance</p>
                      </div>
                    </Link>

                    <div className="border-t border-gray-200 my-2"></div>

                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        handleLogout();
                      }}
                      className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-red-50 transition-colors group"
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-red-400 to-red-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                        <span className="text-xl">🚪</span>
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-red-600">Logout</p>
                        <p className="text-xs text-gray-500">Sign out of account</p>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
