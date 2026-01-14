import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FaYoutube, FaTwitter, FaInstagram, FaTelegram, FaDiscord,
  FaHeart, FaRocket, FaStar, FaMoon, FaEnvelope, FaPhone,
  FaMapMarkerAlt, FaArrowUp, FaPaperPlane
} from 'react-icons/fa';
import { BiPlanet } from 'react-icons/bi';
import { HiSparkles } from 'react-icons/hi';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    explore: [
      { label: 'Space Facts', path: '/facts' },
      { label: 'Photo Gallery', path: '/gallery' },
      { label: 'Space Quiz', path: '/quiz' },
      { label: 'Astronomy Tools', path: '/tools' }
    ],
    learn: [
      { label: 'Solar System', path: '/learn/solar-system' },
      { label: 'Black Holes', path: '/learn/black-holes' },
      { label: 'Galaxies', path: '/learn/galaxies' },
      { label: 'Space Missions', path: '/learn/missions' }
    ],
    community: [
      { label: 'YouTube Channel', href: 'https://youtube.com/@sciencehindi' },
      { label: 'Discord Server', href: 'https://discord.gg/sciencehindi' },
      { label: 'Telegram Group', href: 'https://t.me/sciencehindi' },
      { label: 'Support Us', path: '/support' }
    ]
  };

  const socialLinks = [
    { icon: <FaYoutube />, href: 'https://youtube.com/@sciencehindi', color: 'hover:text-red-500' },
    { icon: <FaTwitter />, href: 'https://twitter.com/sciencehindi', color: 'hover:text-blue-400' },
    { icon: <FaInstagram />, href: 'https://instagram.com/sciencehindi', color: 'hover:text-pink-500' },
    { icon: <FaTelegram />, href: 'https://t.me/sciencehindi', color: 'hover:text-blue-500' },
    { icon: <FaDiscord />, href: 'https://discord.gg/sciencehindi', color: 'hover:text-purple-500' }
  ];

  return (
    <>
      <footer className="relative mt-20 border-t border-white/10 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          
          {/* Floating Stars */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="relative container mx-auto px-4 py-12">
          {/* Newsletter Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <FaRocket className="text-3xl text-cyan-400 animate-bounce" />
              <h3 className="text-3xl font-bold gradient-text">
                Join Our Space Journey
              </h3>
            </div>
            
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Get weekly updates about space discoveries, astronomy facts, and exclusive content in Hindi!
            </p>

            <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
              <div className="relative group">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-6 py-4 pr-32 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-all duration-300 group-hover:border-cyan-400/50"
                  required
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold flex items-center gap-2 shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
                >
                  {isSubscribed ? (
                    <>
                      <FaHeart className="animate-pulse" />
                      <span>Subscribed!</span>
                    </>
                  ) : (
                    <>
                      <FaPaperPlane />
                      <span>Subscribe</span>
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>

          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <Link to="/" className="flex items-center gap-3 mb-4 group">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full blur-lg opacity-60"></div>
                  <div className="relative w-16 h-16 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-full flex items-center justify-center">
                    <BiPlanet className="w-10 h-10 text-white" />
                  </div>
                </motion.div>
                
                <div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    ScienceHindi
                  </h2>
                  <p className="text-sm text-gray-400">अंतरिक्ष विज्ञान का सफर</p>
                </div>
              </Link>
              
              <p className="text-gray-400 mb-6 leading-relaxed">
                Exploring the cosmos in Hindi! Join our community of space enthusiasts 
                and learn about the wonders of the universe in your native language.
              </p>

              {/* Social Links */}
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                    className={`p-3 rounded-lg bg-white/10 text-gray-400 transition-all duration-300 ${social.color} hover:bg-white/20`}
                  >
                    <span className="text-xl">{social.icon}</span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Links Sections */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <FaStar className="text-yellow-400" />
                Explore
              </h4>
              <ul className="space-y-2">
                {footerLinks.explore.map((link, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <FaMoon className="text-purple-400" />
                Learn
              </h4>
              <ul className="space-y-2">
                {footerLinks.learn.map((link, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-purple-400 transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <HiSparkles className="text-yellow-400" />
                Community
              </h4>
              <ul className="space-y-2">
                {footerLinks.community.map((link, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {link.href ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 flex items-center gap-2 group"
                      >
                        <span className="w-1 h-1 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        to={link.path}
                        className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 flex items-center gap-2 group"
                      >
                        <span className="w-1 h-1 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        {link.label}
                      </Link>
                    )}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8 border-t border-white/10">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 text-gray-400"
            >
              <FaEnvelope className="text-cyan-400" />
              <span>contact@sciencehindi.com</span>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 text-gray-400"
            >
              <FaPhone className="text-purple-400" />
              <span>+91 98765 43210</span>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 text-gray-400"
            >
              <FaMapMarkerAlt className="text-yellow-400" />
              <span>Mumbai, India</span>
            </motion.div>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-gray-400 text-sm">
            <p>© 2024 ScienceHindi. All rights reserved.</p>
            
            <div className="flex items-center gap-2 mt-4 md:mt-0">
              <span>Made with</span>
              <FaHeart className="text-red-500 animate-pulse" />
              <span>for space enthusiasts</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 p-4 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-2xl shadow-purple-500/50 z-40"
          >
            <FaArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default Footer;
