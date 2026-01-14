import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaHome, FaImages, FaBookOpen, FaGamepad, FaTools,
  FaYoutube, FaBars, FaTimes, FaSearch, FaBell,
  FaSun, FaMoon, FaGlobe, FaUser, FaRocket
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';
import { BiPlanet } from 'react-icons/bi';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(3);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'Home', icon: <FaHome />, color: 'from-blue-400 to-cyan-400' },
    { path: '/facts', label: 'Facts', icon: <FaBookOpen />, color: 'from-purple-400 to-pink-400' },
    { path: '/gallery', label: 'Gallery', icon: <FaImages />, color: 'from-green-400 to-teal-400' },
    { path: '/quiz', label: 'Quiz', icon: <FaGamepad />, color: 'from-yellow-400 to-orange-400' },
    { path: '/tools', label: 'Tools', icon: <FaTools />, color: 'from-red-400 to-rose-400' },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    setSearchQuery('');
    setIsSearchOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'backdrop-blur-xl bg-black/80 shadow-2xl shadow-purple-500/20' 
            : 'backdrop-blur-md bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo Section */}
            <Link to="/" className="flex items-center gap-3 group">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full blur-lg opacity-60 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative w-12 h-12 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-full flex items-center justify-center">
                  <BiPlanet className="w-8 h-8 text-white" />
                </div>
              </motion.div>
              
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  ScienceHindi
                </h1>
                <p className="text-xs text-gray-400">अंतरिक्ष विज्ञान</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-2">
              {navItems.map((item, index) => (
                <Link key={item.path} to={item.path}>
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative group"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-r ${item.color} rounded-lg opacity-0 group-hover:opacity-100 blur-xl transition-all duration-300`}></div>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`relative px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-300 ${
                        location.pathname === item.path
                          ? 'bg-white/20 text-white'
                          : 'text-gray-300 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {item.icon}
                      <span className="font-medium">{item.label}</span>
                      {location.pathname === item.path && (
                        <motion.div
                          layoutId="navbar-indicator"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400"
                        />
                      )}
                    </motion.button>
                  </motion.div>
                </Link>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Search Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-3 rounded-lg bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white transition-all duration-300"
              >
                <FaSearch />
              </motion.button>

              {/* Notifications */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-3 rounded-lg bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white transition-all duration-300"
              >
                <FaBell />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                    {notifications}
                  </span>
                )}
              </motion.button>

              {/* Theme Toggle */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-3 rounded-lg bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white transition-all duration-300"
              >
                {isDarkMode ? <FaSun /> : <FaMoon />}
              </motion.button>

              {/* Language Toggle */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-lg bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white transition-all duration-300"
              >
                <FaGlobe />
              </motion.button>

              {/* YouTube Button */}
              <motion.a
                href="https://youtube.com/@sciencehindi"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold flex items-center gap-2 shadow-lg shadow-red-500/30 hover:shadow-red-500/50 transition-all duration-300"
              >
                <FaYoutube />
                <span>Subscribe</span>
                <HiSparkles className="animate-pulse" />
              </motion.a>
            </div>

            {/* Mobile Menu Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-3 rounded-lg bg-white/10 text-white"
            >
              {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </motion.button>
          </div>
        </div>

        {/* Search Bar Dropdown */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 right-0 p-4 backdrop-blur-xl bg-black/90"
            >
              <form onSubmit={handleSearch} className="container mx-auto">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for space facts, tools, quizzes..."
                    className="w-full px-6 py-4 pr-12 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-all duration-300"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 text-white"
                  >
                    <FaSearch />
                  </button>
                </div>

                {/* Quick Links */}
                <div className="flex gap-2 mt-4">
                  {['Black Holes', 'Galaxies', 'ISS', 'Mars'].map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => setSearchQuery(tag)}
                      className="px-3 py-1 rounded-full bg-white/10 text-gray-300 text-sm hover:bg-white/20 transition-all duration-300"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="fixed top-0 right-0 bottom-0 w-80 backdrop-blur-xl bg-black/95 z-40 lg:hidden"
          >
            <div className="p-6 pt-24">
              {navItems.map((item, index) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all duration-300 ${
                      location.pathname === item.path
                        ? 'bg-white/20 text-white'
                        : 'text-gray-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </motion.div>
                </Link>
              ))}

              {/* Mobile Action Buttons */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <a
                  href="https://youtube.com/@sciencehindi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold"
                >
                  <FaYoutube />
                  <span>Subscribe to Channel</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
