import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaExpand, FaCompress, FaRulerHorizontal, FaInfoCircle,
  FaPlay, FaPause, FaRedo, FaArrowsAltH
} from 'react-icons/fa';
import { GiGalaxy, GiPlanetCore, GiSun } from 'react-icons/gi';
import { HiSparkles } from 'react-icons/hi';

const UniverseScale = () => {
  const [currentScale, setCurrentScale] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedObject, setSelectedObject] = useState(null);
  const [comparisonMode, setComparisonMode] = useState(false);
  const [compareObjects, setCompareObjects] = useState([]);

  const scaleData = [
    {
      level: 0,
      name: 'Quantum',
      size: '10⁻³⁵ m',
      object: 'Planck Length',
      description: 'The smallest measurable unit of length in the universe',
      color: 'from-purple-600 to-pink-600',
      icon: '⚛️'
    },
    {
      level: 1,
      name: 'Subatomic',
      size: '10⁻¹⁵ m',
      object: 'Proton',
      description: 'Building blocks of atomic nuclei',
      color: 'from-blue-600 to-cyan-600',
      icon: '⚡'
    },
    {
      level: 2,
      name: 'Atomic',
      size: '10⁻¹⁰ m',
      object: 'Hydrogen Atom',
      description: 'Simplest and most abundant element',
      color: 'from-green-600 to-teal-600',
      icon: '🔬'
    },
    {
      level: 3,
      name: 'Molecular',
      size: '10⁻⁹ m',
      object: 'DNA Molecule',
      description: 'Blueprint of life',
      color: 'from-yellow-600 to-orange-600',
      icon: '🧬'
    },
    {
      level: 4,
      name: 'Cellular',
      size: '10⁻⁵ m',
      object: 'Human Cell',
      description: 'Basic unit of life',
      color: 'from-red-600 to-rose-600',
      icon: '🦠'
    },
    {
      level: 5,
      name: 'Human',
      size: '1.7 m',
      object: 'Average Human',
      description: 'Homo sapiens',
      color: 'from-indigo-600 to-purple-600',
      icon: '👤'
    },
    {
      level: 6,
      name: 'Geographic',
      size: '8,848 m',
      object: 'Mount Everest',
      description: 'Highest mountain on Earth',
      color: 'from-gray-600 to-slate-600',
      icon: '🏔️'
    },
    {
      level: 7,
      name: 'Planetary',
      size: '12,742 km',
      object: 'Earth',
      description: 'Our home planet',
      color: 'from-blue-500 to-green-500',
      icon: '🌍'
    },
    {
      level: 8,
      name: 'Stellar',
      size: '1.39 million km',
      object: 'Sun',
      description: 'Our parent star',
      color: 'from-yellow-500 to-orange-500',
      icon: '☀️'
    },
    {
      level: 9,
      name: 'Solar System',
      size: '30 AU',
      object: 'Neptune Orbit',
      description: 'Edge of our solar system',
      color: 'from-blue-700 to-indigo-700',
      icon: '🪐'
    },
    {
      level: 10,
      name: 'Interstellar',
      size: '4.37 light years',
      object: 'Alpha Centauri',
      description: 'Nearest star system',
      color: 'from-cyan-600 to-blue-600',
      icon: '✨'
    },
    {
      level: 11,
      name: 'Galactic',
      size: '100,000 light years',
      object: 'Milky Way Galaxy',
      description: 'Our galaxy containing 400 billion stars',
      color: 'from-purple-700 to-pink-700',
      icon: '🌌'
    },
    {
      level: 12,
      name: 'Intergalactic',
      size: '2.5 million light years',
      object: 'Andromeda Galaxy',
      description: 'Nearest major galaxy',
      color: 'from-indigo-800 to-purple-800',
      icon: '🌠'
    },
    {
      level: 13,
      name: 'Universal',
      size: '93 billion light years',
      object: 'Observable Universe',
      description: 'Everything we can see',
      color: 'from-black to-gray-800',
      icon: '🌌'
    }
  ];

  const handleScaleChange = (newScale) => {
    setCurrentScale(Math.max(0, Math.min(scaleData.length - 1, newScale)));
  };

  const startAnimation = () => {
    setIsAnimating(true);
    let scale = 0;
    const interval = setInterval(() => {
      if (scale >= scaleData.length - 1) {
        clearInterval(interval);
        setIsAnimating(false);
        return;
      }
      setCurrentScale(scale);
      scale++;
    }, 1000);
  };

  const addToComparison = (object) => {
    if (compareObjects.length < 3 && !compareObjects.find(o => o.level === object.level)) {
      setCompareObjects([...compareObjects, object]);
    }
  };

  const current = scaleData[currentScale];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-6xl mx-auto"
    >
      {/* Header */}
      <div className="glass-card p-8 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <GiGalaxy className="text-5xl text-purple-400" />
            </motion.div>
            
            <div>
              <h2 className="text-3xl font-bold gradient-text">Universe Scale Explorer</h2>
              <p className="text-gray-400">Journey from quantum to cosmic scales</p>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={startAnimation}
              disabled={isAnimating}
              className="p-3 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 text-white disabled:opacity-50"
            >
              {isAnimating ? <FaPause /> : <FaPlay />}
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setCurrentScale(0)}
              className="p-3 rounded-lg bg-white/10 text-gray-300 hover:bg-white/20"
            >
              <FaRedo />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setComparisonMode(!comparisonMode)}
              className={`p-3 rounded-lg ${comparisonMode ? 'bg-purple-500' : 'bg-white/10'} text-white`}
            >
              <FaArrowsAltH />
            </motion.button>
          </div>
        </div>

        {/* Scale Slider */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Scale Level</span>
            <span className="text-sm text-cyan-400 font-mono">{current.size}</span>
          </div>
          
          <div className="relative">
            <input
              type="range"
              min="0"
              max={scaleData.length - 1}
              value={currentScale}
              onChange={(e) => handleScaleChange(parseInt(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #4ECDC4 0%, #4ECDC4 ${(currentScale / (scaleData.length - 1)) * 100}%, rgba(255, 255, 255, 0.1) ${(currentScale / (scaleData.length - 1)) * 100}%, rgba(255, 255, 255, 0.1) 100%)`
              }}
            />
            
            {/* Scale Markers */}
            <div className="absolute -top-1 left-0 right-0 flex justify-between pointer-events-none">
              {scaleData.map((item, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentScale ? 'bg-cyan-400 scale-150' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Scale Labels */}
          <div className="flex justify-between mt-4">
            <span className="text-xs text-gray-500">Quantum</span>
            <span className="text-xs text-gray-500">Human</span>
            <span className="text-xs text-gray-500">Planetary</span>
            <span className="text-xs text-gray-500">Galactic</span>
            <span className="text-xs text-gray-500">Universal</span>
          </div>
        </div>
      </div>

      {/* Current Scale Display */}
      <motion.div
        key={currentScale}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-8 mb-6"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ duration: 0.5 }}
            className={`inline-block text-8xl mb-4`}
          >
            {current.icon}
          </motion.div>
          
          <h3 className={`text-4xl font-bold bg-gradient-to-r ${current.color} bg-clip-text text-transparent mb-2`}>
            {current.object}
          </h3>
          
          <p className="text-xl text-gray-400 mb-1">{current.name} Scale</p>
          <p className="text-3xl font-mono text-cyan-400">{current.size}</p>
        </div>

        <p className="text-center text-gray-300 max-w-2xl mx-auto mb-8">
          {current.description}
        </p>

        {/* Visual Representation */}
        <div className="relative h-64 rounded-xl overflow-hidden bg-gradient-to-br from-black to-gray-900">
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear"
              }}
              className={`w-32 h-32 rounded-full bg-gradient-to-br ${current.color} opacity-30 blur-3xl`}
            />
            
            <motion.div
              animate={{
                scale: 1 + (currentScale / scaleData.length),
                rotate: currentScale * 10
              }}
              transition={{ type: "spring" }}
              className="absolute text-6xl"
            >
              {current.icon}
            </motion.div>
          </div>

          {/* Size Comparison Dots */}
          <div className="absolute bottom-4 left-4 right-4 flex justify-center gap-2">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  scale: i <= currentScale / 3 ? 1 : 0.5,
                  opacity: i <= currentScale / 3 ? 1 : 0.3
                }}
                className="w-2 h-2 rounded-full bg-cyan-400"
              />
            ))}
          </div>
        </div>

        {/* Add to Comparison Button */}
        {comparisonMode && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => addToComparison(current)}
            className="mt-6 w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold"
          >
            Add to Comparison
          </motion.button>
        )}
      </motion.div>

      {/* Comparison Mode */}
      {comparisonMode && compareObjects.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6"
        >
          <h3 className="text-xl font-bold text-white mb-4">Size Comparison</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {compareObjects.map((obj, index) => (
              <motion.div
                key={obj.level}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 rounded-lg bg-white/5"
              >
                <div className="text-center">
                  <div className="text-4xl mb-2">{obj.icon}</div>
                  <h4 className="font-semibold text-white">{obj.object}</h4>
                  <p className="text-sm text-gray-400">{obj.size}</p>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setCompareObjects(compareObjects.filter(o => o.level !== obj.level))}
                    className="mt-2 text-red-400 text-sm"
                  >
                    Remove
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>

          {compareObjects.length >= 2 && (
            <div className="mt-4 p-4 rounded-lg bg-gradient-to-r from-cyan-500/10 to-purple-500/10">
              <p className="text-sm text-gray-300">
                <span className="font-semibold text-cyan-400">Scale Difference: </span>
                The size ratio between {compareObjects[0].object} and {compareObjects[compareObjects.length - 1].object} 
                is approximately 10^{Math.abs(compareObjects[0].level - compareObjects[compareObjects.length - 1].level) * 5}
              </p>
            </div>
          )}
        </motion.div>
      )}

      {/* Information Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="glass-card p-4"
        >
          <FaRulerHorizontal className="text-2xl text-cyan-400 mb-2" />
          <h4 className="font-semibold text-white mb-1">Powers of Ten</h4>
          <p className="text-sm text-gray-400">
            Each level represents roughly 10x change in scale
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="glass-card p-4"
        >
          <HiSparkles className="text-2xl text-purple-400 mb-2" />
          <h4 className="font-semibold text-white mb-1">Fun Fact</h4>
          <p className="text-sm text-gray-400">
            There are more stars in the universe than grains of sand on Earth
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="glass-card p-4"
        >
          <FaInfoCircle className="text-2xl text-yellow-400 mb-2" />
          <h4 className="font-semibold text-white mb-1">Did You Know?</h4>
          <p className="text-sm text-gray-400">
            If Earth was a marble, the Sun would be a beach ball 100m away
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default UniverseScale;
