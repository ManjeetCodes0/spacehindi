import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaSatellite, FaGlobeAmericas, FaClock, FaMapMarkerAlt,
  FaCompass, FaTachometerAlt, FaUsers, FaRocket,
  FaPlay, FaPause, FaExpand, FaCompress
} from 'react-icons/fa';
import { BiRefresh } from 'react-icons/bi';
import { HiSparkles } from 'react-icons/hi';

const ISSTracker = () => {
  const [issData, setIssData] = useState({
    latitude: 0,
    longitude: 0,
    altitude: 408,
    velocity: 27600,
    visibility: 'daylight',
    timestamp: new Date()
  });
  
  const [astronauts, setAstronauts] = useState([]);
  const [nextPasses, setNextPasses] = useState([]);
  const [isTracking, setIsTracking] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedView, setSelectedView] = useState('map'); // map, 3d, data
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simulate ISS position updates
  useEffect(() => {
    const updateISSPosition = () => {
      if (!isTracking) return;
      
      setIssData(prev => ({
        ...prev,
        latitude: prev.latitude + (Math.random() - 0.5) * 5,
        longitude: prev.longitude + (Math.random() - 0.5) * 10,
        timestamp: new Date()
      }));
    };

    const interval = setInterval(updateISSPosition, 5000);
    return () => clearInterval(interval);
  }, [isTracking]);

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => console.log(error)
      );
    }
  }, []);

  // Simulate astronauts data
  useEffect(() => {
    setAstronauts([
      { name: 'Jasmin Moghbeli', country: 'USA', mission: 'Expedition 70', days: 120 },
      { name: 'Andreas Mogensen', country: 'Denmark', mission: 'Expedition 70', days: 120 },
      { name: 'Satoshi Furukawa', country: 'Japan', mission: 'Expedition 70', days: 120 },
      { name: 'Konstantin Borisov', country: 'Russia', mission: 'Expedition 70', days: 120 },
      { name: 'Oleg Kononenko', country: 'Russia', mission: 'Expedition 70', days: 120 },
      { name: 'Nikolai Chub', country: 'Russia', mission: 'Expedition 70', days: 120 },
      { name: 'Loral O\'Hara', country: 'USA', mission: 'Expedition 70', days: 120 }
    ]);
    
    setLoading(false);
  }, []);

  const calculateDistance = () => {
    if (!userLocation) return null;
    // Simplified distance calculation
    const R = 6371; // Earth's radius in km
    const dLat = (issData.latitude - userLocation.lat) * Math.PI / 180;
    const dLon = (issData.longitude - userLocation.lng) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(userLocation.lat * Math.PI / 180) * 
              Math.cos(issData.latitude * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return Math.round(R * c);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="cosmic-spinner"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${isFullscreen ? 'fixed inset-0 z-50 p-4 bg-[#0B0E1F]' : ''}`}
    >
      <div className="glass-card p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-lg opacity-60"></div>
              <div className="relative w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                <FaSatellite className="w-6 h-6 text-white" />
              </div>
            </motion.div>
            
            <div>
              <h2 className="text-2xl font-bold text-white">ISS Live Tracker</h2>
              <p className="text-sm text-gray-400">International Space Station</p>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsTracking(!isTracking)}
              className={`p-2 rounded-lg ${
                isTracking ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
              }`}
            >
              {isTracking ? <FaPause /> : <FaPlay />}
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIssData({...issData, timestamp: new Date()})}
              className="p-2 rounded-lg bg-white/10 text-gray-300 hover:bg-white/20"
            >
              <BiRefresh />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 rounded-lg bg-white/10 text-gray-300 hover:bg-white/20"
            >
              {isFullscreen ? <FaCompress /> : <FaExpand />}
            </motion.button>
          </div>
        </div>

        {/* View Selector */}
        <div className="flex gap-2 mb-6">
          {['map', '3d', 'data'].map((view) => (
            <motion.button
              key={view}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedView(view)}
              className={`px-4 py-2 rounded-lg font-medium capitalize transition-all ${
                selectedView === view
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                  : 'bg-white/10 text-gray-400 hover:bg-white/20'
              }`}
            >
              {view} View
            </motion.button>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Map/3D View */}
          <div className="glass-card p-4 h-96 relative overflow-hidden">
            {selectedView === 'map' && (
              <div className="relative w-full h-full bg-gradient-to-b from-blue-900/30 to-black/50 rounded-lg">
                {/* World Map Background */}
                <div className="absolute inset-0 opacity-30">
                  <img 
                    src="/api/placeholder/800/400" 
                    alt="World Map"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* ISS Position */}
                <motion.div
                  animate={{
                    left: `${(issData.longitude + 180) / 360 * 100}%`,
                    top: `${(90 - issData.latitude) / 180 * 100}%`
                  }}
                  transition={{ duration: 1 }}
                  className="absolute w-8 h-8 -ml-4 -mt-4"
                >
                  <FaSatellite className="text-yellow-400 text-2xl animate-pulse" />
                  <div className="absolute inset-0 bg-yellow-400 rounded-full animate-ping opacity-75"></div>
                </motion.div>

                {/* User Location */}
                {userLocation && (
                  <div
                    style={{
                      left: `${(userLocation.lng + 180) / 360 * 100}%`,
                      top: `${(90 - userLocation.lat) / 180 * 100}%`
                    }}
                    className="absolute w-4 h-4 -ml-2 -mt-2"
                  >
                    <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  </div>
                )}

                {/* Orbit Path */}
                <svg className="absolute inset-0 w-full h-full">
                  <path
                    d="M 0,200 Q 200,100 400,200 T 800,200"
                    stroke="rgba(78, 205, 196, 0.3)"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="5,5"
                  />
                </svg>
              </div>
            )}

            {selectedView === '3d' && (
              <div className="flex items-center justify-center h-full">
                <motion.div
                  animate={{ rotateY: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="relative"
                >
                  <div className="w-32 h-32 rounded-full bg-gradient-to-b from-blue-600 to-blue-900 shadow-2xl"></div>
                  <motion.div
                    animate={{
                      rotate: 360,
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="w-40 h-1 relative">
                      <FaSatellite className="absolute right-0 text-white text-2xl" />
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            )}

            {selectedView === 'data' && (
              <div className="space-y-4 p-4">
                <h3 className="text-lg font-semibold text-white mb-4">Technical Data</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                    <span className="text-gray-400">Orbital Period</span>
                    <span className="text-white font-mono">92.68 min</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                    <span className="text-gray-400">Orbital Inclination</span>
                    <span className="text-white font-mono">51.64°</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                    <span className="text-gray-400">Perigee</span>
                    <span className="text-white font-mono">418 km</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                    <span className="text-gray-400">Apogee</span>
                    <span className="text-white font-mono">422 km</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                    <span className="text-gray-400">Solar Panels</span>
                    <span className="text-white font-mono">73m span</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Info Panel */}
          <div className="space-y-4">
            {/* Real-time Data */}
            <div className="glass-card p-4">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <FaGlobeAmericas className="text-cyan-400" />
                Current Position
              </h3>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-xs text-gray-400 mb-1">Latitude</p>
                  <p className="text-lg font-mono font-bold text-white">
                    {issData.latitude.toFixed(4)}°
                  </p>
                </div>
                
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-xs text-gray-400 mb-1">Longitude</p>
                  <p className="text-lg font-mono font-bold text-white">
                    {issData.longitude.toFixed(4)}°
                  </p>
                </div>
                
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-xs text-gray-400 mb-1">Altitude</p>
                  <p className="text-lg font-mono font-bold text-white">
                    {issData.altitude} km
                  </p>
                </div>
                
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-xs text-gray-400 mb-1">Velocity</p>
                  <p className="text-lg font-mono font-bold text-white">
                    {issData.velocity} km/h
                  </p>
                </div>
              </div>

              {userLocation && (
                <div className="mt-3 p-3 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg">
                  <p className="text-sm text-gray-400">Distance from you</p>
                  <p className="text-2xl font-bold text-cyan-400">
                    {calculateDistance()} km
                  </p>
                </div>
              )}
            </div>

            {/* Crew */}
            <div className="glass-card p-4 max-h-64 overflow-y-auto">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <FaUsers className="text-purple-400" />
                Current Crew ({astronauts.length})
              </h3>
              
              <div className="space-y-2">
                {astronauts.map((astronaut, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold">
                        {astronaut.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{astronaut.name}</p>
                        <p className="text-xs text-gray-400">{astronaut.country}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-400">{astronaut.days} days</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Status Bar */}
        <div className="mt-6 pt-4 border-t border-white/10">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-gray-400">Live Tracking</span>
              </div>
              
              <div className="flex items-center gap-2">
                <FaClock className="text-gray-400" />
                <span className="text-gray-400">
                  Updated: {issData.timestamp.toLocaleTimeString()}
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <HiSparkles className="text-yellow-400 animate-pulse" />
              <span className="text-gray-400">Next pass in 2h 15m</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ISSTracker;
