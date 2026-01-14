import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FaRocket, FaPlay, FaStar, FaArrowRight, FaYoutube,
  FaInstagram, FaTwitter, FaGlobe, FaBook, FaGamepad,
  FaTools, FaLightbulb, FaChartLine, FaUsers, FaEye,
  FaBell, FaCalendar, FaClock, FaFire, FaTrophy,
  FaGraduationCap, FaMoon, FaSun, FaAtom, FaDna
} from 'react-icons/fa';
import { 
  HiSparkles, HiOutlineSparkles, HiBeaker, 
  HiOutlineGlobeAlt, HiCollection 
} from 'react-icons/hi';
import { GiGalaxy, GiRocketFlight, GiObservatory, GiVortex } from 'react-icons/gi';
import { BiPlanet } from 'react-icons/bi';
import { IoMdPlanet } from 'react-icons/io';
import { MdOutlineScience, MdScience } from 'react-icons/md';

const Home = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);

  // Sample data
  const heroFacts = [
    { text: "ब्रह्मांड में 2 ट्रिलियन से अधिक आकाशगंगाएं हैं", icon: <GiGalaxy /> },
    { text: "एक न्यूट्रॉन तारे का एक चम्मच 6 बिलियन टन वजन होगा", icon: <FaStar /> },
    { text: "अंतरिक्ष पूर्ण रूप से शांत है क्योंकि वहां ध्वनि यात्रा नहीं कर सकती", icon: <GiVortex /> },
    { text: "शुक्र पर एक दिन उसके एक वर्ष से लंबा होता है", icon: <BiPlanet /> },
    { text: "ISS हर 90 मिनट में पृथ्वी की परिक्रमा करता है", icon: <FaRocket /> }
  ];

  const features = [
    {
      icon: <FaGamepad className="text-4xl" />,
      title: "Interactive Quiz",
      description: "अंतरिक्ष विज्ञान पर मजेदार क्विज़",
      count: "50+ Questions",
      link: "/quiz",
      color: "from-purple-500 to-pink-500",
      delay: 0.1
    },
    {
      icon: <FaTools className="text-4xl" />,
      title: "Space Tools",
      description: "उपयोगी अंतरिक्ष कैलकुलेटर",
      count: "10+ Tools",
      link: "/tools",
      color: "from-blue-500 to-cyan-500",
      delay: 0.2
    },
    {
      icon: <FaLightbulb className="text-4xl" />,
      title: "Space Facts",
      description: "रोचक अंतरिक्ष तथ्य जनरेटर",
      count: "500+ Facts",
      link: "/facts",
      color: "from-orange-500 to-red-500",
      delay: 0.3
    },
    {
      icon: <HiCollection className="text-4xl" />,
      title: "Space Gallery",
      description: "अद्भुत अंतरिक्ष छवियां",
      count: "100+ Images",
      link: "/gallery",
      color: "from-green-500 to-teal-500",
      delay: 0.4
    }
  ];

  const statistics = [
    { icon: <FaUsers />, value: "50K+", label: "Subscribers", color: "text-purple-400" },
    { icon: <FaEye />, value: "10M+", label: "Views", color: "text-blue-400" },
    { icon: <FaBook />, value: "500+", label: "Videos", color: "text-green-400" },
    { icon: <FaTrophy />, value: "100+", label: "Awards", color: "text-yellow-400" }
  ];

  const latestVideos = [
    {
      id: 1,
      title: "Black Holes Explained in Hindi",
      thumbnail: "/api/placeholder/320/180",
      views: "1.2M",
      duration: "15:30",
      date: "2 days ago",
      category: "Astrophysics"
    },
    {
      id: 2,
      title: "Mars Mission 2024 Update",
      thumbnail: "/api/placeholder/320/180",
      views: "850K",
      duration: "12:45",
      date: "5 days ago",
      category: "Space Exploration"
    },
    {
      id: 3,
      title: "Quantum Physics Simplified",
      thumbnail: "/api/placeholder/320/180",
      views: "2.1M",
      duration: "18:20",
      date: "1 week ago",
      category: "Physics"
    }
  ];

  const upcomingEvents = [
    {
      date: "15 Dec",
      title: "Geminids Meteor Shower",
      time: "10:00 PM IST",
      type: "Astronomical Event"
    },
    {
      date: "20 Dec",
      title: "Live Q&A Session",
      time: "7:00 PM IST",
      type: "YouTube Live"
    },
    {
      date: "25 Dec",
      title: "James Webb Anniversary",
      time: "Special Video",
      type: "Special Release"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFactIndex((prev) => (prev + 1) % heroFacts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20" />
          
          {/* Animated Stars */}
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              animate={{
                y: [null, Math.random() * window.innerHeight],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                repeatType: "loop",
                ease: "linear"
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
          
          {/* Floating Planets */}
          <motion.div
            className="absolute top-20 left-10 text-8xl text-purple-500/20"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 360],
            }}
            transition={{
              y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 20, repeat: Infinity, ease: "linear" }
            }}
          >
            <IoMdPlanet />
          </motion.div>
          
          <motion.div
            className="absolute bottom-20 right-10 text-6xl text-blue-500/20"
            animate={{
              y: [0, 20, 0],
              rotate: [360, 0],
            }}
            transition={{
              y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 15, repeat: Infinity, ease: "linear" }
            }}
          >
            <GiGalaxy />
          </motion.div>
        </div>

        {/* Hero Content */}
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Logo Animation */}
            <motion.div
              className="inline-block mb-6"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="relative">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur-xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <GiRocketFlight className="relative text-8xl text-white" />
              </div>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              className="text-6xl md:text-8xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="gradient-text-animated">ScienceHindi</span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              className="text-xl md:text-2xl text-gray-300 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              अंतरिक्ष विज्ञान को सरल हिंदी में समझें
            </motion.p>

            {/* Animated Facts */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentFactIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className="glass-card inline-flex items-center gap-3 px-6 py-3 mb-8"
              >
                <span className="text-2xl text-yellow-400">
                  {heroFacts[currentFactIndex].icon}
                </span>
                <span className="text-lg">
                  {heroFacts[currentFactIndex].text}
                </span>
              </motion.div>
            </AnimatePresence>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="https://youtube.com/@ScienceHindi"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-cosmic flex items-center gap-3 text-lg px-8 py-4"
              >
                <FaYoutube className="text-2xl" />
                Watch on YouTube
                <FaArrowRight />
              </motion.a>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsVideoPlaying(true)}
                className="glass-card px-8 py-4 flex items-center gap-3 text-lg hover:border-purple-500 transition-smooth"
              >
                <FaPlay />
                Watch Intro
              </motion.button>
            </div>

            {/* Social Stats */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {statistics.map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  className="glass-card p-4"
                >
                  <div className={`text-3xl ${stat.color} mb-2`}>
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="flex flex-col items-center gap-2 text-gray-400">
            <span className="text-sm">Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
              <motion.div
                className="w-1 h-3 bg-gray-400 rounded-full mt-2"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
              Explore Space Science
            </h2>
            <p className="text-xl text-gray-400">
              Interactive tools and resources to learn about the universe
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: feature.delay }}
                whileHover={{ y: -10 }}
              >
                <Link to={feature.link} className="block h-full">
                  <div className="glass-card-hover h-full p-6 relative overflow-hidden group">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                    />
                    
                    <div className={`text-transparent bg-gradient-to-r ${feature.color} bg-clip-text mb-4`}>
                      {feature.icon}
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-2">
                      {feature.title}
                    </h3>
                    
                    <p className="text-gray-400 mb-4">
                      {feature.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-purple-400">
                        {feature.count}
                      </span>
                      <FaArrowRight className="text-gray-400 group-hover:text-white group-hover:translate-x-2 transition-all" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Videos Section */}
      <section className="section-padding bg-gradient-to-b from-transparent to-purple-900/10">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-8"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Latest Videos
              </h2>
              <p className="text-gray-400">
                नवीनतम अंतरिक्ष विज्ञान वीडियो
              </p>
            </div>
            
            <Link
              to="/gallery"
              className="glass-card px-4 py-2 flex items-center gap-2 hover:border-purple-500 transition-smooth"
            >
              View All
              <FaArrowRight />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestVideos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-xl">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="inline-block px-2 py-1 bg-red-600 text-white text-xs rounded">
                        {video.category}
                      </span>
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-xs">
                    {video.duration}
                  </div>
                </div>
                
                <div className="mt-3">
                  <h3 className="font-semibold text-white group-hover:text-purple-400 transition-colors">
                    {video.title}
                  </h3>
                  <div className="flex items-center gap-3 mt-2 text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      <FaEye /> {video.views}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaClock /> {video.date}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Events */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <FaCalendar className="text-purple-400" />
                Upcoming Events
              </h3>
              
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-card p-4 flex items-center gap-4 hover:border-purple-500 transition-smooth"
                  >
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-400">
                        {event.date.split(' ')[0]}
                      </div>
                      <div className="text-sm text-gray-400">
                        {event.date.split(' ')[1]}
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="font-semibold text-white">
                        {event.title}
                      </h4>
                      <div className="flex items-center gap-3 text-sm text-gray-400 mt-1">
                        <span className="flex items-center gap-1">
                          <FaClock /> {event.time}
                        </span>
                        <span className="text-purple-400">
                          {event.type}
                        </span>
                      </div>
                    </div>
                    
                    <FaBell className="text-gray-400 hover:text-yellow-400 cursor-pointer transition-colors" />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Newsletter */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="space-card h-full">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <HiSparkles className="text-yellow-400" />
                  Join Our Community
                </h3>
                
                <p className="text-gray-400 mb-6">
                  Get weekly space facts and updates delivered to your inbox
                </p>
                
                <form className="space-y-4">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 transition-smooth"
                  />
                  
                  <button
                    type="submit"
                    className="w-full btn-cosmic"
                  >
                    Subscribe Now
                  </button>
                </form>
                
                <div className="mt-6 flex items-center justify-center gap-4">
                  <a href="#" className="text-2xl text-gray-400 hover:text-purple-400 transition-colors">
                    <FaYoutube />
                  </a>
                  <a href="#" className="text-2xl text-gray-400 hover:text-purple-400 transition-colors">
                    <FaInstagram />
                  </a>
                  <a href="#" className="text-2xl text-gray-400 hover:text-purple-400 transition-colors">
                    <FaTwitter />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interactive CTA Section */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-blue-900/20" />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="container-custom relative z-10 text-center"
        >
          <motion.div
            animate={{ 
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="inline-block mb-6"
          >
            <FaGraduationCap className="text-6xl text-purple-400" />
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Start Your Space Journey Today
          </h2>
          
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of space enthusiasts learning about the universe in Hindi
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/quiz">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-cosmic px-8 py-4 text-lg"
              >
                Take Space Quiz
              </motion.button>
            </Link>
            
            <Link to="/tools">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="glass-card px-8 py-4 text-lg hover:border-purple-500 transition-smooth"
              >
                Explore Tools
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            onClick={() => setIsVideoPlaying(false)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <button
                onClick={() => setIsVideoPlaying(false)}
                className="absolute top-4 right-4 text-white text-2xl hover:text-red-500 transition-colors"
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
