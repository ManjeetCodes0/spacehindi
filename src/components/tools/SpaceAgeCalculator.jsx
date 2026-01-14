import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaBirthdayCake, FaCalendarAlt, FaRocket, FaGlobeAmericas,
  FaClock, FaInfoCircle, FaCalculator
} from 'react-icons/fa';
import { GiRingedPlanet, GiSun } from 'react-icons/gi';
import { HiSparkles } from 'react-icons/hi';

const SpaceAgeCalculator = () => {
  const [birthDate, setBirthDate] = useState('');
  const [earthAge, setEarthAge] = useState(null);
  const [planetAges, setPlanetAges] = useState([]);
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const planets = [
    {
      name: 'Mercury',
      orbitalPeriod: 0.2408467,
      dayLength: 58.65,
      gravity: 0.378,
      distance: '77.3 million km',
      color: 'from-gray-400 to-gray-600',
      emoji: '☿',
      facts: 'Closest planet to the Sun with extreme temperature variations'
    },
    {
      name: 'Venus',
      orbitalPeriod: 0.61519726,
      dayLength: 243,
      gravity: 0.907,
      distance: '41.4 million km',
      color: 'from-yellow-400 to-orange-500',
      emoji: '♀',
      facts: 'Hottest planet in our solar system with thick atmosphere'
    },
    {
      name: 'Earth',
      orbitalPeriod: 1,
      dayLength: 1,
      gravity: 1,
      distance: '0 km',
      color: 'from-blue-400 to-green-400',
      emoji: '🌍',
      facts: 'Our home planet, the only known planet with life'
    },
    {
      name: 'Mars',
      orbitalPeriod: 1.8808158,
      dayLength: 1.03,
      gravity: 0.377,
      distance: '78.3 million km',
      color: 'from-red-400 to-orange-600',
      emoji: '♂',
      facts: 'The Red Planet with the largest volcano in the solar system'
    },
    {
      name: 'Jupiter',
      orbitalPeriod: 11.862615,
      dayLength: 0.41,
      gravity: 2.36,
      distance: '628.7 million km',
      color: 'from-orange-400 to-red-500',
      emoji: '♃',
      facts: 'Largest planet with a Great Red Spot storm'
    },
    {
      name: 'Saturn',
      orbitalPeriod: 29.447498,
      dayLength: 0.45,
      gravity: 0.916,
      distance: '1.27 billion km',
      color: 'from-yellow-300 to-amber-500',
      emoji: '♄',
      facts: 'Famous for its spectacular ring system'
    },
    {
      name: 'Uranus',
      orbitalPeriod: 84.016846,
      dayLength: 0.72,
      gravity: 0.889,
      distance: '2.72 billion km',
      color: 'from-cyan-400 to-blue-500',
      emoji: '♅',
      facts: 'Tilted on its side and rotates backwards'
    },
    {
      name: 'Neptune',
      orbitalPeriod: 164.79132,
      dayLength: 0.67,
      gravity: 1.13,
      distance: '4.35 billion km',
      color: 'from-blue-500 to-indigo-600',
      emoji: '♆',
      facts: 'Windiest planet with speeds up to 2,100 km/h'
    }
  ];

  useEffect(() => {
    if (birthDate) {
      calculateAges();
    }
  }, [birthDate]);

  const calculateAges = () => {
    const birth = new Date(birthDate);
    const today = new Date();
    const ageInMs = today - birth;
    const ageInDays = ageInMs / (1000 * 60 * 60 * 24);
    const ageInYears = ageInDays / 365.25;
    
    setEarthAge({
      years: Math.floor(ageInYears),
      days: Math.floor(ageInDays),
      hours: Math.floor(ageInDays * 24),
      minutes: Math.floor(ageInDays * 24 * 60)
    });

    const ages = planets.map(planet => ({
      ...planet,
      age: ageInYears / planet.orbitalPeriod,
      orbits: Math.floor(ageInYears / planet.orbitalPeriod),
      nextBirthday: calculateNextBirthday(birth, planet.orbitalPeriod),
      daysOnPlanet: Math.floor(ageInDays / planet.dayLength)
    }));

    setPlanetAges(ages);
  };

  const calculateNextBirthday = (birthDate, orbitalPeriod) => {
    const today = new Date();
    const birth = new Date(birthDate);
    const ageInMs = today - birth;
    const ageInDays = ageInMs / (1000 * 60 * 60 * 24);
    const currentOrbits = ageInDays / (365.25 * orbitalPeriod);
    const nextOrbit = Math.ceil(currentOrbits);
    const daysUntilNext = (nextOrbit * orbitalPeriod * 365.25) - ageInDays;
    return Math.round(daysUntilNext);
  };

  const formatAge = (age) => {
    const years = Math.floor(age);
    const months = Math.floor((age - years) * 12);
    return `${years} years, ${months} months`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto"
    >
      {/* Header */}
      <div className="glass-card p-8 mb-6">
        <div className="flex items-center gap-4 mb-6">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-xl opacity-60"></div>
            <div className="relative w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <FaRocket className="w-8 h-8 text-white" />
            </div>
          </motion.div>
          
          <div>
            <h2 className="text-3xl font-bold gradient-text">Space Age Calculator</h2>
            <p className="text-gray-400">Discover your age across the solar system!</p>
          </div>
        </div>

        {/* Date Input */}
        <div className="max-w-md mx-auto">
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Enter Your Birth Date
          </label>
          <div className="relative">
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              max={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-3 pl-12 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-cyan-400 transition-all"
            />
            <FaBirthdayCake className="absolute left-4 top-1/2 transform -translate-y-1/2 text-pink-400" />
          </div>
        </div>

        {/* Earth Age Display */}
        <AnimatePresence>
          {earthAge && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="mt-8 p-6 rounded-xl bg-gradient-to-br from-blue-500/20 to-green-500/20 border border-white/10"
            >
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <FaGlobeAmericas className="text-blue-400" />
                Your Age on Earth
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-cyan-400">{earthAge.years}</p>
                  <p className="text-sm text-gray-400">Years</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-400">{earthAge.days.toLocaleString()}</p>
                  <p className="text-sm text-gray-400">Days</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-yellow-400">{earthAge.hours.toLocaleString()}</p>
                  <p className="text-sm text-gray-400">Hours</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-purple-400">{earthAge.minutes.toLocaleString()}</p>
                  <p className="text-sm text-gray-400">Minutes</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Planet Ages Grid */}
      <AnimatePresence>
        {planetAges.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {planetAges.map((planet, index) => (
              <motion.div
                key={planet.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedPlanet(planet)}
                className="glass-card p-6 cursor-pointer group"
              >
                {/* Planet Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${planet.color} flex items-center justify-center text-2xl shadow-lg`}>
                      {planet.emoji}
                    </div>
                    <h3 className="font-bold text-white">{planet.name}</h3>
                  </div>
                  <FaInfoCircle className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Age Display */}
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-white/5">
                    <p className="text-xs text-gray-400 mb-1">Your Age</p>
                    <p className="text-xl font-bold gradient-text">
                      {formatAge(planet.age)}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2 rounded-lg bg-white/5">
                      <p className="text-xs text-gray-400">Orbits</p>
                      <p className="font-bold text-white">{planet.orbits}</p>
                    </div>
                    <div className="p-2 rounded-lg bg-white/5">
                      <p className="text-xs text-gray-400">Days</p>
                      <p className="font-bold text-white">{planet.daysOnPlanet.toLocaleString()}</p>
                    </div>
                  </div>

                  {/* Next Birthday */}
                  <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10">
                    <p className="text-xs text-gray-400">Next Birthday in</p>
                    <p className="font-semibold text-purple-400">
                      {planet.nextBirthday} Earth days
                    </p>
                  </div>
                </div>

                {/* Hover Effect */}
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-20 transition-opacity pointer-events-none"
                  style={{
                    backgroundImage: `linear-gradient(135deg, var(--tw-gradient-from), var(--tw-gradient-to))`
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Planet Details Modal */}
      <AnimatePresence>
        {selectedPlanet && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
              onClick={() => setSelectedPlanet(null)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg"
            >
              <div className="glass-card p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-3">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${selectedPlanet.color} flex items-center justify-center text-4xl shadow-2xl`}>
                      {selectedPlanet.emoji}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{selectedPlanet.name}</h3>
                      <p className="text-sm text-gray-400">Planetary Details</p>
                    </div>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedPlanet(null)}
                    className="p-2 rounded-lg bg-white/10 text-gray-400 hover:bg-white/20"
                  >
                    ✕
                  </motion.button>
                </div>

                <div className="space-y-4">
                  {/* Age Information */}
                  <div className="p-4 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                    <h4 className="font-semibold text-white mb-3">Your Age on {selectedPlanet.name}</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-sm text-gray-400">Age</p>
                        <p className="text-lg font-bold text-cyan-400">
                          {formatAge(selectedPlanet.age)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Total Orbits</p>
                        <p className="text-lg font-bold text-green-400">
                          {selectedPlanet.orbits}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Days Lived</p>
                        <p className="text-lg font-bold text-yellow-400">
                          {selectedPlanet.daysOnPlanet.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Next Birthday</p>
                        <p className="text-lg font-bold text-purple-400">
                          {selectedPlanet.nextBirthday} days
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Planet Facts */}
                  <div className="p-4 rounded-lg bg-white/5">
                    <h4 className="font-semibold text-white mb-2">Planet Facts</h4>
                    <p className="text-sm text-gray-300 mb-3">{selectedPlanet.facts}</p>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-400">Distance from Earth</span>
                        <span className="text-sm text-white">{selectedPlanet.distance}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-400">Gravity</span>
                        <span className="text-sm text-white">{selectedPlanet.gravity}g</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-400">Day Length</span>
                        <span className="text-sm text-white">{selectedPlanet.dayLength} Earth days</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-400">Year Length</span>
                        <span className="text-sm text-white">{selectedPlanet.orbitalPeriod.toFixed(2)} Earth years</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SpaceAgeCalculator;
