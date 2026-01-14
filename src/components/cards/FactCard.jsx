import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaRocket, FaStar, FaAtom, FaGlobeAmericas, 
  FaShareAlt, FaBookmark, FaExpand, FaHeart 
} from 'react-icons/fa';
import { BiRefresh } from 'react-icons/bi';
import { HiSparkles } from 'react-icons/hi';

const FactCard = ({ fact, category, id, image, source, difficulty }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 1000));
  const [isExpanded, setIsExpanded] = useState(false);

  const categoryIcons = {
    planets: <FaGlobeAmericas />,
    stars: <FaStar />,
    physics: <FaAtom />,
    spacecraft: <FaRocket />
  };

  const categoryColors = {
    planets: 'from-blue-500 to-purple-600',
    stars: 'from-yellow-400 to-orange-500',
    physics: 'from-green-400 to-teal-600',
    spacecraft: 'from-pink-500 to-rose-600'
  };

  const difficultyColors = {
    beginner: 'bg-green-500',
    intermediate: 'bg-yellow-500',
    advanced: 'bg-red-500'
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Amazing Space Fact',
          text: fact,
          url: window.location.href
        });
      } catch (err) {
        console.log('Share failed:', err);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
      
      <div className="relative glass-card p-6 h-full">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        {/* Category Badge */}
        <div className="relative flex justify-between items-start mb-4">
          <motion.div 
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r ${categoryColors[category]} text-white text-sm font-semibold`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {categoryIcons[category]}
            <span className="capitalize">{category}</span>
          </motion.div>

          {/* Difficulty Indicator */}
          <div className="flex gap-1">
            {[1, 2, 3].map((level) => (
              <div
                key={level}
                className={`w-2 h-2 rounded-full ${
                  level <= (difficulty === 'beginner' ? 1 : difficulty === 'intermediate' ? 2 : 3)
                    ? difficultyColors[difficulty]
                    : 'bg-gray-600'
                } transition-all duration-300`}
              />
            ))}
          </div>
        </div>

        {/* Flip Card Container */}
        <div className="relative h-64 mb-4 preserve-3d cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
          <AnimatePresence mode="wait">
            {!isFlipped ? (
              <motion.div
                key="front"
                initial={{ rotateY: 0 }}
                exit={{ rotateY: 90 }}
                className="absolute inset-0"
              >
                {/* Image with Overlay */}
                {image && (
                  <div className="relative h-40 mb-4 rounded-xl overflow-hidden">
                    <img 
                      src={image} 
                      alt={category}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    
                    {/* Sparkle Effect */}
                    <motion.div
                      className="absolute top-2 right-2 text-yellow-400"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    >
                      <HiSparkles className="w-6 h-6" />
                    </motion.div>
                  </div>
                )}

                {/* Fact Text */}
                <motion.p 
                  className={`text-gray-200 ${isExpanded ? '' : 'line-clamp-3'} leading-relaxed`}
                  layout
                >
                  {fact}
                </motion.p>

                {/* Flip Indicator */}
                <div className="absolute bottom-2 right-2 text-gray-400 text-sm flex items-center gap-1">
                  <BiRefresh className="w-4 h-4" />
                  <span>Click to flip</span>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="back"
                initial={{ rotateY: -90 }}
                animate={{ rotateY: 0 }}
                className="absolute inset-0 glass-card p-4"
              >
                <h3 className="text-lg font-bold mb-3 gradient-text">Did You Know?</h3>
                
                {/* Additional Information */}
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <FaStar className="text-yellow-400 mt-1 flex-shrink-0" />
                    <p className="text-sm text-gray-300">
                      This fact relates to {category} and is considered {difficulty} level knowledge.
                    </p>
                  </div>
                  
                  {source && (
                    <div className="flex items-start gap-2">
                      <span className="text-xs text-gray-400">Source:</span>
                      <span className="text-xs text-cyan-400">{source}</span>
                    </div>
                  )}

                  {/* Fun Visualization */}
                  <div className="mt-4 p-3 bg-gradient-to-br from-purple-900/30 to-blue-900/30 rounded-lg">
                    <div className="flex justify-around">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          animate={{ 
                            y: [0, -10, 0],
                            opacity: [0.3, 1, 0.3]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.2
                          }}
                        >
                          <FaStar className="text-yellow-400 w-4 h-4" />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Flip Back Indicator */}
                <div className="absolute bottom-2 right-2 text-gray-400 text-sm flex items-center gap-1">
                  <BiRefresh className="w-4 h-4" />
                  <span>Click to flip back</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Action Buttons */}
        <div className="relative flex items-center justify-between mt-4 pt-4 border-t border-white/10">
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLike}
              className={`p-2 rounded-lg ${
                isLiked ? 'bg-red-500 text-white' : 'bg-white/10 text-gray-300'
              } transition-all duration-300`}
            >
              <FaHeart className={`w-4 h-4 ${isLiked ? 'animate-pulse' : ''}`} />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsSaved(!isSaved)}
              className={`p-2 rounded-lg ${
                isSaved ? 'bg-blue-500 text-white' : 'bg-white/10 text-gray-300'
              } transition-all duration-300`}
            >
              <FaBookmark className="w-4 h-4" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleShare}
              className="p-2 rounded-lg bg-white/10 text-gray-300 hover:bg-white/20 transition-all duration-300"
            >
              <FaShareAlt className="w-4 h-4" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 rounded-lg bg-white/10 text-gray-300 hover:bg-white/20 transition-all duration-300"
            >
              <FaExpand className="w-4 h-4" />
            </motion.button>
          </div>

          {/* Like Count */}
          <motion.div 
            className="flex items-center gap-1 text-sm text-gray-400"
            animate={{ scale: isLiked ? [1, 1.2, 1] : 1 }}
          >
            <span>{likeCount}</span>
            <span>likes</span>
          </motion.div>
        </div>

        {/* ID Badge */}
        <div className="absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
          #{id}
        </div>
      </div>
    </motion.div>
  );
};

export default FactCard;
