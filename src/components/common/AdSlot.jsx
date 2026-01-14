import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaAd, FaExternalLinkAlt, FaInfoCircle } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';

const AdSlot = ({ 
  type = 'banner', // banner, square, native, floating
  position = 'inline', // inline, sidebar, floating, modal
  closeable = false,
  autoClose = 0,
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState(autoClose);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (autoClose > 0 && isVisible) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsVisible(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [autoClose, isVisible]);

  const adContent = {
    banner: {
      width: 'w-full',
      height: 'h-32 md:h-40',
      title: 'Space Equipment Sale!',
      description: 'Get 30% off on all telescopes and astronomy gear',
      cta: 'Shop Now',
      gradient: 'from-purple-600 to-pink-600'
    },
    square: {
      width: 'w-full',
      height: 'h-72',
      title: 'Learn Astronomy',
      description: 'Join our online course and explore the universe',
      cta: 'Enroll Today',
      gradient: 'from-cyan-600 to-blue-600'
    },
    native: {
      width: 'w-full',
      height: 'auto',
      title: 'Recommended: Space Documentary',
      description: 'Watch "Journey to the Edge of the Universe" - Now streaming',
      cta: 'Watch Now',
      gradient: 'from-green-600 to-teal-600'
    },
    floating: {
      width: 'w-80',
      height: 'h-96',
      title: 'Special Offer!',
      description: 'Premium membership - Get unlimited access to all content',
      cta: 'Get Premium',
      gradient: 'from-yellow-600 to-orange-600'
    }
  };

  const currentAd = adContent[type];

  if (!isVisible) return null;

  const AdContent = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`relative ${currentAd.width} ${currentAd.height} ${className}`}
    >
      <div className="relative h-full glass-card overflow-hidden group">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className={`absolute inset-0 bg-gradient-to-br ${currentAd.gradient} opacity-20`}></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          
          {/* Animated Stars */}
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Ad Label */}
        <div className="absolute top-2 left-2 z-10">
          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-black/50 text-xs text-gray-400">
            <FaAd />
            <span>Advertisement</span>
          </div>
        </div>

        {/* Close Button */}
        {closeable && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsVisible(false)}
            className="absolute top-2 right-2 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
          >
            <FaTimes />
          </motion.button>
        )}

        {/* Auto-close Timer */}
        {autoClose > 0 && timeLeft > 0 && (
          <div className="absolute top-2 right-12 z-10">
            <div className="px-2 py-1 rounded-full bg-black/50 text-xs text-gray-400">
              Closes in {timeLeft}s
            </div>
          </div>
        )}

        {/* Content */}
        <div className="relative h-full flex flex-col justify-center items-center text-center p-8 z-10">
          {/* Sparkle Icon */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="mb-4"
          >
            <HiSparkles className="text-4xl text-yellow-400" />
          </motion.div>

          {/* Title */}
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
            {currentAd.title}
          </h3>

          {/* Description */}
          <p className="text-gray-300 mb-6 max-w-md">
            {currentAd.description}
          </p>

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-3 rounded-full bg-gradient-to-r ${currentAd.gradient} text-white font-semibold flex items-center gap-2 shadow-lg hover:shadow-2xl transition-all duration-300`}
          >
            {currentAd.cta}
            <FaExternalLinkAlt className="text-sm" />
          </motion.button>

          {/* Hover Effect */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute bottom-4 left-4 right-4"
              >
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-black/60 text-xs text-gray-400">
                  <FaInfoCircle />
                  <span>Sponsored content to support free education</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-2xl"></div>
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-2xl"></div>
      </div>
    </motion.div>
  );

  // Render based on position
  if (position === 'floating') {
    return (
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="fixed bottom-20 right-4 z-30"
          >
            <AdContent />
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  if (position === 'modal') {
    return (
      <AnimatePresence>
        {isVisible && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
              onClick={() => closeable && setIsVisible(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
            >
              <AdContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  }

  return <AdContent />;
};

export default AdSlot;
