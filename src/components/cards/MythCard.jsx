import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaCheckCircle, FaTimesCircle, FaQuestionCircle, 
  FaLightbulb, FaUserGraduate, FaChartLine 
} from 'react-icons/fa';
import { GiBlackHoleBolas, GiGalaxy, GiRocketFlight } from 'react-icons/gi';
import { BsLightningChargeFill } from 'react-icons/bs';
import confetti from 'canvas-confetti';

const MythCard = ({ myth, reality, category, difficulty, explanation, id }) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [userGuess, setUserGuess] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [stats, setStats] = useState({
    correct: Math.floor(Math.random() * 1000),
    incorrect: Math.floor(Math.random() * 500)
  });

  const handleGuess = (guess) => {
    if (userGuess) return;
    
    setUserGuess(guess);
    setIsRevealed(true);
    
    if (guess === 'reality') {
      // Trigger confetti for correct answer
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#4ECDC4', '#95E1D3', '#A8E6CF', '#C77DFF']
      });
      setStats(prev => ({ ...prev, correct: prev.correct + 1 }));
    } else {
      setStats(prev => ({ ...prev, incorrect: prev.incorrect + 1 }));
    }
  };

  const categoryIcons = {
    blackholes: <GiBlackHoleBolas />,
    galaxy: <GiGalaxy />,
    rockets: <GiRocketFlight />,
    general: <FaQuestionCircle />
  };

  const getAccuracyColor = () => {
    const accuracy = (stats.correct / (stats.correct + stats.incorrect)) * 100;
    if (accuracy > 70) return 'text-green-400';
    if (accuracy > 50) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-pink-600/20 to-red-600/20 animate-gradient-shift"></div>
      </div>

      <div className="relative glass-card p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 text-white">
              {categoryIcons[category] || categoryIcons.general}
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Myth or Reality?</h3>
              <p className="text-xs text-gray-400 capitalize">{category} • {difficulty}</p>
            </div>
          </div>
          
          {/* Stats Badge */}
          <motion.div 
            className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/10"
            whileHover={{ scale: 1.05 }}
          >
            <FaChartLine className={getAccuracyColor()} />
            <span className="text-xs text-gray-300">
              {Math.round((stats.correct / (stats.correct + stats.incorrect)) * 100)}% accuracy
            </span>
          </motion.div>
        </div>

        {/* Statement Card */}
        <motion.div 
          className="relative mb-6 p-6 rounded-xl bg-gradient-to-br from-blue-900/30 to-purple-900/30 border border-white/10"
          animate={{ 
            boxShadow: isRevealed 
              ? userGuess === 'reality' 
                ? '0 0 30px rgba(78, 205, 196, 0.5)' 
                : '0 0 30px rgba(255, 107, 107, 0.5)'
              : '0 0 0px rgba(255, 255, 255, 0)'
          }}
        >
          <BsLightningChargeFill className="absolute top-2 right-2 text-yellow-400 animate-pulse" />
          
          <p className="text-lg text-white leading-relaxed mb-4">
            {myth}
          </p>

          {/* Interactive Buttons */}
          {!isRevealed && (
            <div className="grid grid-cols-2 gap-4 mt-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleGuess('myth')}
                className="py-3 px-6 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold shadow-lg hover:shadow-red-500/50 transition-all duration-300"
              >
                <FaTimesCircle className="inline mr-2" />
                Myth
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleGuess('reality')}
                className="py-3 px-6 rounded-xl bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold shadow-lg hover:shadow-green-500/50 transition-all duration-300"
              >
                <FaCheckCircle className="inline mr-2" />
                Reality
              </motion.button>
            </div>
          )}

          {/* Result Display */}
          <AnimatePresence>
            {isRevealed && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-6"
              >
                <div className={`p-4 rounded-lg ${
                  userGuess === 'reality' 
                    ? 'bg-green-500/20 border border-green-500/50' 
                    : 'bg-red-500/20 border border-red-500/50'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    {userGuess === 'reality' ? (
                      <>
                        <FaCheckCircle className="text-green-400 text-xl" />
                        <span className="font-bold text-green-400">Correct! It's Reality!</span>
                      </>
                    ) : (
                      <>
                        <FaTimesCircle className="text-red-400 text-xl" />
                        <span className="font-bold text-red-400">Oops! It's Actually Reality!</span>
                      </>
                    )}
                  </div>
                  
                  <p className="text-gray-300 text-sm">
                    {reality}
                  </p>
                </div>

                {/* Show Explanation Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowExplanation(!showExplanation)}
                  className="mt-4 w-full py-2 px-4 rounded-lg bg-white/10 text-gray-300 hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <FaLightbulb />
                  {showExplanation ? 'Hide' : 'Show'} Detailed Explanation
                </motion.button>

                {/* Detailed Explanation */}
                <AnimatePresence>
                  {showExplanation && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 p-4 rounded-lg bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-white/10"
                    >
                      <div className="flex items-start gap-2">
                        <FaUserGraduate className="text-cyan-400 mt-1" />
                        <div>
                          <h4 className="font-semibold text-cyan-400 mb-2">Scientific Explanation:</h4>
                          <p className="text-gray-300 text-sm leading-relaxed">
                            {explanation}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Community Stats */}
        <div className="flex justify-between items-center pt-4 border-t border-white/10">
          <div className="flex gap-4">
            <div className="flex items-center gap-1">
              <FaCheckCircle className="text-green-400 text-sm" />
              <span className="text-xs text-gray-400">{stats.correct} got it right</span>
            </div>
            <div className="flex items-center gap-1">
              <FaTimesCircle className="text-red-400 text-sm" />
              <span className="text-xs text-gray-400">{stats.incorrect} got it wrong</span>
            </div>
          </div>
          
          <div className="text-xs text-gray-500">
            ID: #{id}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MythCard;
