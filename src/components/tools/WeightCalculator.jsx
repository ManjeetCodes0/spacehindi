import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaWeight, FaGlobeAmericas, FaCalculator, FaRocket,
  FaInfoCircle, FaChartBar, FaBalanceScale
} from 'react-icons/fa';
import { GiWeight, GiAstronautHelmet } from 'react-icons/gi';
import { HiSparkles } from 'react-icons/hi';
import { BiPlanet } from 'react-icons/bi';

const WeightCalculator = () => {
  const [earthWeight, setEarthWeight] = useState('');
  const [weightUnit, setWeightUnit] = useState('kg');
  const [planetWeights, setPlanetWeights] = useState([]);
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [showComparison, setShowComparison] = useState(false);

  const celestialBodies = [
    {
      name: 'Sun',
      gravity: 27.01,
      radius: '696,000 km',
      type: 'Star',
      color: 'from-yellow-400 to-orange-500',
      emoji: '☀️',
      fact: 'You would be crushed instantly by the Sun\'s gravity',
      atmosphere: 'Plasma',
      escape_velocity: '617.5 km/s'
    },
    {
      name: 'Mercury',
      gravity: 0.378,
      radius: '2,440 km',
      type: 'Terrestrial',
      color: 'from-gray-400 to-gray-600',
      emoji: '☿',
      fact: 'You could jump 3 times higher than on Earth',
      atmosphere: 'None',
      escape_velocity: '4.3 km/s'
    },
    {
      name: 'Venus',
      gravity: 0.907,
      radius: '6,052 km',
      type: 'Terrestrial',
      color: 'from-yellow-500 to-orange-600',
      emoji: '♀',
      fact: 'Your weight would be almost the same as Earth',
      atmosphere: 'Carbon Dioxide',
      escape_velocity: '10.4 km/s'
    },
    {
      name: 'Earth',
      gravity: 1,
      radius: '6,371 km',
      type: 'Terrestrial',
      color: 'from-blue-500 to-green-500',
      emoji: '🌍',
      fact: 'Home sweet home - your reference weight',
      atmosphere: 'Nitrogen/Oxygen',
      escape_velocity: '11.2 km/s'
    },
    {
      name: 'Moon',
      gravity: 0.166,
      radius: '1,737 km',
      type: 'Natural Satellite',
      color: 'from-gray-300 to-gray-500',
      emoji: '🌙',
      fact: 'You could jump 6 times higher and carry heavy objects easily',
      atmosphere: 'None',
      escape_velocity: '2.4 km/s'
    },
    {
      name: 'Mars',
      gravity: 0.377,
      radius: '3,390 km',
      type: 'Terrestrial',
      color: 'from-red-500 to-orange-700',
      emoji: '♂',
      fact: 'You would feel 62% lighter than on Earth',
      atmosphere: 'Carbon Dioxide',
      escape_velocity: '5.0 km/s'
    },
    {
      name: 'Jupiter',
      gravity: 2.36,
      radius: '69,911 km',
      type: 'Gas Giant',
      color: 'from-orange-600 to-red-700',
      emoji: '♃',
      fact: 'You would feel 2.5 times heavier - walking would be difficult',
      atmosphere: 'Hydrogen/Helium',
      escape_velocity: '59.5 km/s'
    },
    {
      name: 'Saturn',
      gravity: 0.916,
      radius: '58,232 km',
      type: 'Gas Giant',
      color: 'from-yellow-600 to-amber-700',
      emoji: '♄',
      fact: 'Despite being huge, you\'d weigh slightly less than on Earth',
      atmosphere: 'Hydrogen/Helium',
      escape_velocity: '35.5 km/s'
    },
    {
      name: 'Uranus',
      gravity: 0.889,
      radius: '25,362 km',
      type: 'Ice Giant',
      color: 'from-cyan-500 to-blue-600',
      emoji: '♅',
      fact: 'You would weigh 11% less than on Earth',
      atmosphere: 'Hydrogen/Helium/Methane',
      escape_velocity: '21.3 km/s'
    },
    {
      name: 'Neptune',
      gravity: 1.13,
      radius: '24,622 km',
      type: 'Ice Giant',
      color: 'from-blue-600 to-indigo-700',
      emoji: '♆',
      fact: 'You would be slightly heavier than on Earth',
      atmosphere: 'Hydrogen/Helium/Methane',
      escape_velocity: '23.5 km/s'
    },
    {
      name: 'Pluto',
      gravity: 0.063,
      radius: '1,188 km',
      type: 'Dwarf Planet',
      color: 'from-purple-600 to-pink-600',
      emoji: '🪐',
      fact: 'You could easily jump over buildings!',
      atmosphere: 'Nitrogen (trace)',
      escape_velocity: '1.2 km/s'
    }
  ];

  useEffect(() => {
    if (earthWeight) {
      calculateWeights();
    }
  }, [earthWeight, weightUnit]);

  const calculateWeights = () => {
    const weightInKg = weightUnit === 'lbs' 
      ? parseFloat(earthWeight) * 0.453592 
      : parseFloat(earthWeight);
    
    const weights = celestialBodies.map(body => ({
      ...body,
      weight: weightInKg * body.gravity,
      weightDisplay: weightUnit === 'lbs' 
        ? (weightInKg * body.gravity * 2.20462).toFixed(1)
        : (weightInKg * body.gravity).toFixed(1),
      jumpHeight: (1 / body.gravity).toFixed(1),
      walkingDifficulty: body.gravity > 1.5 ? 'Very Difficult' : 
                         body.gravity > 1 ? 'Moderate' : 
                         body.gravity > 0.5 ? 'Easy' : 'Very Easy'
    }));
    
    setPlanetWeights(weights);
  };

  const getWeightComparison = (gravity) => {
    if (gravity < 0.1) return 'Like a feather';
    if (gravity < 0.3) return 'Like carrying groceries';
    if (gravity < 0.5) return 'Like wearing light backpack';
    if (gravity < 0.8) return 'Slightly lighter';
    if (gravity < 1.2) return 'About normal';
    if (gravity < 2) return 'Like carrying someone';
    if (gravity < 5) return 'Like wearing heavy armor';
    return 'Crushing weight';
  };

  const getActivityDifficulty = (gravity) => {
    const activities = {
      walking: gravity > 2 ? 'Extremely Hard' : gravity > 1.5 ? 'Hard' : gravity > 0.8 ? 'Normal' : 'Easy',
      running: gravity > 1.5 ? 'Nearly Impossible' : gravity > 1 ? 'Very Hard' : gravity > 0.5 ? 'Normal' : 'Easy',
      jumping: gravity > 2 ? 'Impossible' : gravity > 1.5 ? 'Very Limited' : gravity > 0.8 ? 'Normal' : 'Super High'
    };
    return activities;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-6xl mx-auto"
    >
      {/* Header */}
      <div className="glass-card p-8 mb-6">
        <div className="flex items-center gap-4 mb-6">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-xl opacity-60"></div>
            <div className="relative w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <GiWeight className="w-8 h-8 text-white" />
            </div>
          </motion.div>
          
          <div>
            <h2 className="text-3xl font-bold gradient-text">Cosmic Weight Calculator</h2>
            <p className="text-gray-400">Discover your weight across the cosmos!</p>
          </div>
        </div>

        {/* Input Section */}
        <div className="max-w-md mx-auto">
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Enter Your Earth Weight
          </label>
          
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="number"
                value={earthWeight}
                onChange={(e) => setEarthWeight(e.target.value)}
                placeholder="Enter weight"
                className="w-full px-4 py-3 pl-12 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-cyan-400 transition-all"
              />
              <FaWeight className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400" />
            </div>
            
            <select
              value={weightUnit}
              onChange={(e) => setWeightUnit(e.target.value)}
              className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-cyan-400 transition-all"
            >
              <option value="kg">kg</option>
              <option value="lbs">lbs</option>
            </select>
          </div>

          {earthWeight && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 rounded-lg bg-gradient-to-r from-blue-500/20 to-green-500/20 border border-white/10"
            >
              <p className="text-sm text-gray-400">Your Mass (constant everywhere):</p>
              <p className="text-2xl font-bold text-cyan-400">
                {weightUnit === 'lbs' 
                  ? `${(parseFloat(earthWeight) * 0.453592).toFixed(1)} kg`
                  : `${earthWeight} kg`}
              </p>
            </motion.div>
          )}
        </div>

        {/* View Toggle */}
        <div className="flex justify-center gap-2 mt-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowComparison(false)}
            className={`px-4 py-2 rounded-lg font-medium ${
              !showComparison 
                ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white' 
                : 'bg-white/10 text-gray-400'
            }`}
          >
            Grid View
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowComparison(true)}
            className={`px-4 py-2 rounded-lg font-medium ${
              showComparison 
                ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white' 
                : 'bg-white/10 text-gray-400'
            }`}
          >
            Comparison Chart
          </motion.button>
        </div>
      </div>

      {/* Results Display */}
      <AnimatePresence mode="wait">
        {planetWeights.length > 0 && !showComparison && (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            {planetWeights.map((body, index) => (
              <motion.div
                key={body.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedPlanet(body)}
                className="glass-card p-6 cursor-pointer group"
              >
                {/* Planet Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <motion.div
                      animate={{ rotate: body.name === 'Saturn' ? 360 : 0 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className={`w-12 h-12 rounded-full bg-gradient-to-br ${body.color} flex items-center justify-center text-2xl shadow-lg group-hover:shadow-xl transition-shadow`}
                    >
                      {body.emoji}
                    </motion.div>
                    <div>
                      <h3 className="font-bold text-white">{body.name}</h3>
                      <p className="text-xs text-gray-400">{body.type}</p>
                    </div>
                  </div>
                </div>

                {/* Weight Display */}
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10">
                    <p className="text-xs text-gray-400 mb-1">Your Weight</p>
                    <p className="text-2xl font-bold text-white">
                      {body.weightDisplay} {weightUnit}
                    </p>
                    <p className="text-xs text-purple-400 mt-1">
                      {getWeightComparison(body.gravity)}
                    </p>
                  </div>

                  {/* Gravity Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Gravity</span>
                      <span className="text-cyan-400">{body.gravity}g</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(100, (body.gravity / 3) * 100)}%` }}
                        transition={{ delay: index * 0.05 }}
                        className={`h-full bg-gradient-to-r ${body.color}`}
                      />
                    </div>
                  </div>

                  {/* Jump Height */}
                  <div className="flex justify-between items-center p-2 rounded-lg bg-white/5">
                    <span className="text-xs text-gray-400">Jump Height</span>
                    <span className="text-sm font-semibold text-yellow-400">
                      {body.jumpHeight}x
                    </span>
                  </div>
                </div>

                {/* Hover Effect */}
                <motion.div
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 to-transparent rounded-2xl"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-xs text-white text-center">Click for details</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Comparison Chart */}
        {planetWeights.length > 0 && showComparison && (
          <motion.div
            key="chart"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="glass-card p-8"
          >
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <FaChartBar className="text-cyan-400" />
              Weight Comparison Across the Cosmos
            </h3>

            <div className="space-y-4">
              {planetWeights.map((body, index) => (
                <motion.div
                  key={body.name}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-4"
                >
                  <div className="flex items-center gap-2 w-32">
                    <span className="text-2xl">{body.emoji}</span>
                    <span className="text-sm font-medium text-white">{body.name}</span>
                  </div>
                  
                  <div className="flex-1">
                    <div className="relative h-8 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ 
                          width: `${(body.weight / Math.max(...planetWeights.map(p => p.weight))) * 100}%`
                        }}
                        transition={{ delay: index * 0.05, duration: 0.5 }}
                        className={`absolute inset-y-0 left-0 bg-gradient-to-r ${body.color} flex items-center justify-end pr-2`}
                      >
                        <span className="text-xs font-bold text-white">
                          {body.weightDisplay} {weightUnit}
                        </span>
                      </motion.div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <span className="text-sm text-gray-400">{body.gravity}g</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Legend */}
            <div className="mt-8 p-4 rounded-lg bg-white/5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    <span className="text-xs text-gray-400">Lighter than Earth</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                    <span className="text-xs text-gray-400">Similar to Earth</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <span className="text-xs text-gray-400">Heavier than Earth</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <GiAstronautHelmet className="text-purple-400" />
                  <span className="text-xs text-gray-400">
                    Mass remains constant: {weightUnit === 'lbs' 
                      ? `${(parseFloat(earthWeight) * 0.453592).toFixed(1)} kg`
                      : `${earthWeight} kg`}
                  </span>
                </div>
              </div>
            </div>
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
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl"
            >
              <div className="glass-card p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${selectedPlanet.color} flex items-center justify-center text-5xl shadow-2xl`}>
                      {selectedPlanet.emoji}
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-white">{selectedPlanet.name}</h3>
                      <p className="text-gray-400">{selectedPlanet.type}</p>
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

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Weight Information */}
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                      <h4 className="font-semibold text-white mb-3">Weight Analysis</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-400">Your Weight</span>
                          <span className="text-sm font-bold text-white">
                            {selectedPlanet.weightDisplay} {weightUnit}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-400">Gravity</span>
                          <span className="text-sm font-bold text-cyan-400">
                            {selectedPlanet.gravity}g
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-400">Jump Multiplier</span>
                          <span className="text-sm font-bold text-yellow-400">
                            {selectedPlanet.jumpHeight}x
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-400">Walking</span>
                          <span className="text-sm font-bold text-green-400">
                            {selectedPlanet.walkingDifficulty}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Activities */}
                    <div className="p-4 rounded-lg bg-white/5">
                      <h4 className="font-semibold text-white mb-3">Physical Activities</h4>
                      {Object.entries(getActivityDifficulty(selectedPlanet.gravity)).map(([activity, difficulty]) => (
                        <div key={activity} className="flex justify-between mb-2">
                          <span className="text-sm text-gray-400 capitalize">{activity}</span>
                          <span className={`text-sm font-medium ${
                            difficulty.includes('Hard') || difficulty.includes('Impossible') ? 'text-red-400' :
                            difficulty.includes('Normal') ? 'text-yellow-400' : 'text-green-400'
                          }`}>
                            {difficulty}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Planet Information */}
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-white/5">
                      <h4 className="font-semibold text-white mb-3">Physical Properties</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-400">Radius</span>
                          <span className="text-sm text-white">{selectedPlanet.radius}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-400">Atmosphere</span>
                          <span className="text-sm text-white">{selectedPlanet.atmosphere}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-400">Escape Velocity</span>
                          <span className="text-sm text-white">{selectedPlanet.escape_velocity}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-gradient-to-br from-cyan-500/10 to-blue-500/10">
                      <h4 className="font-semibold text-cyan-400 mb-2">Fun Fact</h4>
                      <p className="text-sm text-gray-300">{selectedPlanet.fact}</p>
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

export default WeightCalculator;
