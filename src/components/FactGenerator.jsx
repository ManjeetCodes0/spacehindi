import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaDice, FaRandom, FaCopy, FaShareAlt, FaDownload,
  FaBookmark, FaFilter, FaHistory, FaLightbulb,
  FaTwitter, FaWhatsapp, FaFacebook, FaRegBookmark,
  FaTimes, FaSearch, FaTag, FaStar, FaRocket
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';
import { BiRefresh } from 'react-icons/bi';
import { MdAutorenew } from 'react-icons/md';
import confetti from 'canvas-confetti';
import { toast, Toaster } from 'react-hot-toast';

const FactGenerator = () => {
  const [currentFact, setCurrentFact] = useState(null);
  const [factHistory, setFactHistory] = useState([]);
  const [savedFacts, setSavedFacts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showSaved, setShowSaved] = useState(false);
  const [factCount, setFactCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [difficulty, setDifficulty] = useState('all');
  const [autoGenerate, setAutoGenerate] = useState(false);
  const [autoGenerateInterval, setAutoGenerateInterval] = useState(5);

  const categories = [
    { id: 'all', name: 'सभी श्रेणियां', icon: '🌌', color: 'from-purple-500 to-pink-500' },
    { id: 'planets', name: 'ग्रह', icon: '🪐', color: 'from-blue-500 to-green-500' },
    { id: 'stars', name: 'तारे', icon: '⭐', color: 'from-yellow-500 to-orange-500' },
    { id: 'galaxies', name: 'आकाशगंगा', icon: '🌠', color: 'from-indigo-500 to-purple-500' },
    { id: 'blackholes', name: 'ब्लैक होल', icon: '⚫', color: 'from-gray-700 to-black' },
    { id: 'missions', name: 'अंतरिक्ष मिशन', icon: '🚀', color: 'from-red-500 to-pink-500' },
    { id: 'astronauts', name: 'अंतरिक्ष यात्री', icon: '👨‍🚀', color: 'from-cyan-500 to-blue-500' },
    { id: 'technology', name: 'अंतरिक्ष तकनीक', icon: '🛸', color: 'from-green-500 to-teal-500' },
    { id: 'universe', name: 'ब्रह्मांड', icon: '💫', color: 'from-purple-600 to-blue-600' },
    { id: 'satellites', name: 'उपग्रह', icon: '🛰️', color: 'from-teal-500 to-cyan-500' }
  ];

  const facts = [
    {
      id: 1,
      category: 'planets',
      fact: 'बृहस्पति का Great Red Spot एक तूफान है जो 350 से अधिक वर्षों से चल रहा है।',
      factEn: 'Jupiter\'s Great Red Spot is a storm that has been raging for over 350 years.',
      difficulty: 'easy',
      source: 'NASA',
      tags: ['jupiter', 'storms', 'gas giants'],
      year: 2023
    },
    {
      id: 2,
      category: 'stars',
      fact: 'न्यूट्रॉन तारे के एक चम्मच पदार्थ का वजन पृथ्वी पर लगभग 6 बिलियन टन होगा।',
      factEn: 'A teaspoon of neutron star material would weigh about 6 billion tons on Earth.',
      difficulty: 'medium',
      source: 'ESA',
      tags: ['neutron stars', 'density', 'gravity'],
      year: 2023
    },
    {
      id: 3,
      category: 'galaxies',
      fact: 'मिल्की वे और एंड्रोमेडा आकाशगंगाएं लगभग 4.5 बिलियन वर्षों में टकराएंगी।',
      factEn: 'The Milky Way and Andromeda galaxies will collide in about 4.5 billion years.',
      difficulty: 'medium',
      source: 'Hubble',
      tags: ['milky way', 'andromeda', 'collision'],
      year: 2023
    },
    {
      id: 4,
      category: 'blackholes',
      fact: 'हमारी आकाशगंगा के केंद्र में स्थित सुपरमैसिव ब्लैक होल को Sagittarius A* कहा जाता है।',
      factEn: 'The supermassive black hole at the center of our galaxy is called Sagittarius A*.',
      difficulty: 'hard',
      source: 'Event Horizon Telescope',
      tags: ['black holes', 'sagittarius a*', 'galactic center'],
      year: 2022
    },
    {
      id: 5,
      category: 'missions',
      fact: 'Voyager 1 सबसे दूर की मानव निर्मित वस्तु है, जो पृथ्वी से 14 बिलियन मील से अधिक दूर है।',
      factEn: 'Voyager 1 is the most distant human-made object, over 14 billion miles from Earth.',
      difficulty: 'easy',
      source: 'NASA JPL',
      tags: ['voyager', 'distance', 'interstellar'],
      year: 2024
    },
    {
      id: 6,
      category: 'astronauts',
      fact: 'अंतरिक्ष यात्री अंतरिक्ष में रीढ़ की हड्डी के विस्तार के कारण 2 इंच तक लंबे हो जाते हैं।',
      factEn: 'Astronauts grow up to 2 inches taller in space due to spine elongation.',
      difficulty: 'easy',
      source: 'NASA',
      tags: ['astronauts', 'microgravity', 'human body'],
      year: 2023
    },
    {
      id: 7,
      category: 'technology',
      fact: 'अंतर्राष्ट्रीय अंतरिक्ष स्टेशन 17,500 mph की गति से यात्रा करता है, हर 90 मिनट में पृथ्वी की परिक्रमा करता है।',
      factEn: 'The International Space Station travels at 17,500 mph, orbiting Earth every 90 minutes.',
      difficulty: 'easy',
      source: 'ISS Program',
      tags: ['ISS', 'orbit', 'velocity'],
      year: 2024
    },
    {
      id: 8,
      category: 'planets',
      fact: 'शुक्र अधिकांश ग्रहों की तुलना में पीछे की ओर घूमता है, और एक दिन उसके वर्ष से लंबा होता है।',
      factEn: 'Venus rotates backwards compared to most planets, and a day is longer than its year.',
      difficulty: 'medium',
      source: 'NASA',
      tags: ['venus', 'rotation', 'retrograde'],
      year: 2023
    },
    {
      id: 9,
      category: 'universe',
      fact: 'ब्रह्मांड लगभग 13.8 बिलियन वर्ष पुराना है।',
      factEn: 'The universe is approximately 13.8 billion years old.',
      difficulty: 'easy',
      source: 'NASA',
      tags: ['universe', 'age', 'cosmology'],
      year: 2023
    },
    {
      id: 10,
      category: 'satellites',
      fact: 'पृथ्वी के चारों ओर 3,000 से अधिक कार्यशील उपग्रह परिक्रमा कर रहे हैं।',
      factEn: 'There are over 3,000 functioning satellites orbiting Earth.',
      difficulty: 'easy',
      source: 'ESA',
      tags: ['satellites', 'orbit', 'technology'],
      year: 2024
    },
    {
      id: 11,
      category: 'stars',
      fact: 'सूर्य पृथ्वी से 1.3 मिलियन गुना बड़ा है।',
      factEn: 'The Sun is 1.3 million times larger than Earth.',
      difficulty: 'easy',
      source: 'NASA',
      tags: ['sun', 'size', 'star'],
      year: 2023
    },
    {
      id: 12,
      category: 'blackholes',
      fact: 'ब्लैक होल में समय धीमा हो जाता है।',
      factEn: 'Time slows down near a black hole.',
      difficulty: 'hard',
      source: 'Physics Today',
      tags: ['black holes', 'time dilation', 'relativity'],
      year: 2023
    }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('savedSpaceFacts');
    if (saved) {
      setSavedFacts(JSON.parse(saved));
    }
    
    const count = localStorage.getItem('factGenerationCount');
    if (count) {
      setFactCount(parseInt(count));
    }
  }, []);

  useEffect(() => {
    let interval;
    if (autoGenerate) {
      interval = setInterval(() => {
        generateFact();
      }, autoGenerateInterval * 1000);
    }
    return () => clearInterval(interval);
  }, [autoGenerate, autoGenerateInterval, selectedCategory, difficulty]);

  const generateFact = () => {
    setIsGenerating(true);
    
    let availableFacts = facts;
    
    // Filter by category
    if (selectedCategory !== 'all') {
      availableFacts = availableFacts.filter(f => f.category === selectedCategory);
    }
    
    // Filter by difficulty
    if (difficulty !== 'all') {
      availableFacts = availableFacts.filter(f => f.difficulty === difficulty);
    }
    
    // Filter by search
    if (searchTerm) {
      availableFacts = availableFacts.filter(f => 
        f.fact.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.factEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    if (availableFacts.length === 0) {
      toast.error('कोई तथ्य उपलब्ध नहीं है!');
      setIsGenerating(false);
      return;
    }
    
    const randomFact = availableFacts[Math.floor(Math.random() * availableFacts.length)];
    
    setTimeout(() => {
      setCurrentFact(randomFact);
      setFactHistory(prev => {
        const newHistory = [randomFact, ...prev.filter(f => f.id !== randomFact.id)];
        return newHistory.slice(0, 20);
      });
      setFactCount(prev => {
        const newCount = prev + 1;
        localStorage.setItem('factGenerationCount', newCount.toString());
        return newCount;
      });
      setIsGenerating(false);
      
      // Celebrations
      if ((factCount + 1) % 10 === 0) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        toast.success(`🎉 ${factCount + 1} तथ्य देखे गए!`);
      }
      
      if ((factCount + 1) === 50) {
        confetti({
          particleCount: 200,
          spread: 100,
          origin: { y: 0.5 }
        });
        toast.success('🏆 Space Explorer Achievement Unlocked!');
      }
    }, 800);
  };

  const saveFact = (fact) => {
    const newSaved = [...savedFacts];
    const index = newSaved.findIndex(f => f.id === fact.id);
    
    if (index === -1) {
      newSaved.push(fact);
      toast.success('तथ्य सहेजा गया!');
    } else {
      newSaved.splice(index, 1);
      toast.success('तथ्य हटाया गया!');
    }
    
    setSavedFacts(newSaved);
    localStorage.setItem('savedSpaceFacts', JSON.stringify(newSaved));
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('कॉपी किया गया!');
  };

  const shareFact = (platform) => {
    if (!currentFact) return;
    
    const text = `🌌 Space Fact:\n${currentFact.fact}\n${currentFact.factEn}\n\n#SpaceScience #ScienceHindi #SpaceFacts`;
    const url = window.location.href;
    
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${url}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + '\n' + url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${encodeURIComponent(text)}`
    };
    
    window.open(shareUrls[platform], '_blank');
    toast.success('Sharing...');
  };

  const downloadFact = () => {
    if (!currentFact) return;
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 1080;
    canvas.height = 1080;
    
    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#0B0E1F');
    gradient.addColorStop(0.5, '#1A1F3A');
    gradient.addColorStop(1, '#2D1B69');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add stars
    ctx.fillStyle = 'white';
    for (let i = 0; i < 100; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const size = Math.random() * 2;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // Title
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 64px Orbitron';
    ctx.textAlign = 'center';
    ctx.fillText('SPACE FACT', canvas.width / 2, 150);
    
    // Category badge
    const category = categories.find(c => c.id === currentFact.category);
    ctx.fillStyle = '#4ECDC4';
    ctx.font = '32px Space Grotesk';
    ctx.fillText(category.icon + ' ' + category.name.toUpperCase(), canvas.width / 2, 220);
    
    // Hindi Fact
    ctx.font = 'bold 36px Arial';
    ctx.fillStyle = '#95E1D3';
    const hindiWords = currentFact.fact.split(' ');
    let hindiLine = '';
    let hindiY = 380;
    const lineHeight = 50;
    const maxWidth = 900;
    
    for (let n = 0; n < hindiWords.length; n++) {
      const testLine = hindiLine + hindiWords[n] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && n > 0) {
        ctx.fillText(hindiLine, canvas.width / 2, hindiY);
        hindiLine = hindiWords[n] + ' ';
        hindiY += lineHeight;
      } else {
        hindiLine = testLine;
      }
    }
    ctx.fillText(hindiLine, canvas.width / 2, hindiY);
    
    // English Fact
    ctx.font = '28px Space Grotesk';
    ctx.fillStyle = '#FFFFFF';
    const englishWords = currentFact.factEn.split(' ');
    let englishLine = '';
    let englishY = hindiY + 100;
    
    for (let n = 0; n < englishWords.length; n++) {
      const testLine = englishLine + englishWords[n] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && n > 0) {
        ctx.fillText(englishLine, canvas.width / 2, englishY);
        englishLine = englishWords[n] + ' ';
        englishY += 40;
      } else {
        englishLine = testLine;
      }
    }
    ctx.fillText(englishLine, canvas.width / 2, englishY);
    
    // Source and Tags
    ctx.font = '24px Space Grotesk';
    ctx.fillStyle = '#667eea';
    ctx.fillText('Source: ' + currentFact.source, canvas.width / 2, englishY + 80);
    
    // Tags
    ctx.fillStyle = '#f093fb';
    ctx.font = '20px Space Grotesk';
    ctx.fillText('#' + currentFact.tags.join(' #'), canvas.width / 2, englishY + 120);
    
    // Branding
    ctx.font = 'bold 36px Orbitron';
    ctx.fillStyle = '#4ECDC4';
    ctx.fillText('SCIENCEHINDI', canvas.width / 2, canvas.height - 80);
    
    ctx.font = '24px Space Grotesk';
    ctx.fillStyle = '#95E1D3';
    ctx.fillText('Learn • Explore • Discover', canvas.width / 2, canvas.height - 40);
    
    // Download
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `space-fact-${Date.now()}.png`;
      a.click();
      toast.success('Image downloaded!');
    });
  };

  const clearHistory = () => {
    setFactHistory([]);
    toast.success('History cleared!');
  };

  const clearSaved = () => {
    setSavedFacts([]);
    localStorage.removeItem('savedSpaceFacts');
    toast.success('Saved facts cleared!');
  };

  const getDifficultyColor = (diff) => {
    switch(diff) {
      case 'easy': return 'text-green-400 border-green-400';
      case 'medium': return 'text-yellow-400 border-yellow-400';
      case 'hard': return 'text-red-400 border-red-400';
      default: return 'text-gray-400 border-gray-400';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container-custom py-8"
    >
      <Toaster position="top-right" />
      
      {/* Header Section */}
      <div className="glass-card p-8 mb-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="text-5xl"
            >
              <FaRocket className="text-purple-400" />
            </motion.div>
            
            <div>
              <h2 className="text-3xl font-bold gradient-text-animated">
                Space Fact Generator
              </h2>
              <p className="text-gray-400 mt-1">
                Discover Amazing Space Facts in Hindi & English
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 flex-wrap">
            <div className="glass-card px-4 py-2 flex items-center gap-2">
              <HiSparkles className="text-yellow-400" />
              <span className="text-sm">Generated: <span className="font-bold text-purple-400">{factCount}</span></span>
            </div>
            
            <div className="glass-card px-4 py-2 flex items-center gap-2">
              <FaBookmark className="text-blue-400" />
              <span className="text-sm">Saved: <span className="font-bold text-blue-400">{savedFacts.length}</span></span>
            </div>
            
            <div className="glass-card px-4 py-2 flex items-center gap-2">
              <FaHistory className="text-green-400" />
              <span className="text-sm">History: <span className="font-bold text-green-400">{factHistory.length}</span></span>
            </div>
          </div>
        </div>
      </div>

      {/* Control Panel */}
      <div className="glass-card p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Category Selector */}
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500 transition-smooth"
            >
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.icon} {cat.name}
                </option>
              ))}
            </select>
          </div>
          
          {/* Difficulty Filter */}
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Difficulty</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500 transition-smooth"
            >
              <option value="all">All Levels</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          
          {/* Search */}
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Search</label>
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search facts..."
                className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 pr-10 text-white focus:outline-none focus:border-purple-500 transition-smooth"
              />
              <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
            </div>
          </div>
        </div>
        
        {/* Auto Generate Controls */}
        <div className="mt-4 flex items-center gap-4 flex-wrap">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={autoGenerate}
              onChange={(e) => setAutoGenerate(e.target.checked)}
              className="w-4 h-4 text-purple-600 rounded"
            />
            <span className="text-sm">Auto Generate</span>
          </label>
          
          {autoGenerate && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">Every</span>
              <input
                type="number"
                min="1"
                max="60"
                value={autoGenerateInterval}
                onChange={(e) => setAutoGenerateInterval(parseInt(e.target.value))}
                className="w-16 bg-gray-800/50 border border-gray-700 rounded px-2 py-1 text-white text-sm"
              />
              <span className="text-sm text-gray-400">seconds</span>
            </div>
          )}
          
          // ... continuing from previous code

          <button
            onClick={() => setShowHistory(!showHistory)}
            className="text-sm text-blue-400 hover:text-blue-300 transition-smooth"
          >
            {showHistory ? 'Hide' : 'Show'} History
          </button>
          
          <button
            onClick={() => setShowSaved(!showSaved)}
            className="text-sm text-green-400 hover:text-green-300 transition-smooth"
          >
            {showSaved ? 'Hide' : 'Show'} Saved
          </button>
        </div>
      </div>

      {/* Main Fact Display */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Generate Button */}
          <motion.button
            onClick={generateFact}
            disabled={isGenerating}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full btn-cosmic mb-6 flex items-center justify-center gap-3 text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <BiRefresh className="text-2xl" />
                </motion.div>
                <span>Generating...</span>
              </>
            ) : (
              <>
                <FaDice className="text-2xl" />
                <span>Generate New Fact</span>
                <HiSparkles className="text-xl text-yellow-300" />
              </>
            )}
          </motion.button>

          {/* Current Fact Card */}
          <AnimatePresence mode="wait">
            {currentFact && (
              <motion.div
                key={currentFact.id}
                initial={{ opacity: 0, y: 20, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                exit={{ opacity: 0, y: -20, rotateX: 90 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="space-card relative overflow-hidden"
              >
                {/* Category Badge */}
                <div className="absolute top-4 right-4">
                  <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${categories.find(c => c.id === currentFact.category)?.color}`}>
                    {categories.find(c => c.id === currentFact.category)?.icon}
                    {categories.find(c => c.id === currentFact.category)?.name}
                  </span>
                </div>

                {/* Difficulty Badge */}
                <div className="absolute top-4 left-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(currentFact.difficulty)}`}>
                    {currentFact.difficulty.toUpperCase()}
                  </span>
                </div>

                {/* Fact Content */}
                <div className="mt-16 mb-8">
                  <motion.h3
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-2xl font-bold text-white mb-4 leading-relaxed"
                  >
                    {currentFact.fact}
                  </motion.h3>
                  
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-lg text-gray-300 leading-relaxed italic"
                  >
                    {currentFact.factEn}
                  </motion.p>
                </div>

                {/* Meta Information */}
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <FaLightbulb className="text-yellow-400" />
                    <span>Source: <span className="text-purple-400 font-medium">{currentFact.source}</span></span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <FaStar className="text-yellow-400" />
                    <span>Year: <span className="text-blue-400 font-medium">{currentFact.year}</span></span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {currentFact.tags.map((tag, index) => (
                    <motion.span
                      key={tag}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="px-3 py-1 bg-gray-800/50 rounded-full text-xs text-gray-300 border border-gray-700"
                    >
                      <FaTag className="inline mr-1 text-gray-500" />
                      {tag}
                    </motion.span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => saveFact(currentFact)}
                    className={`px-4 py-2 rounded-lg border transition-smooth flex items-center gap-2 ${
                      savedFacts.find(f => f.id === currentFact.id)
                        ? 'bg-green-500/20 border-green-500 text-green-400'
                        : 'bg-gray-800/50 border-gray-700 text-gray-400 hover:border-green-500 hover:text-green-400'
                    }`}
                  >
                    {savedFacts.find(f => f.id === currentFact.id) ? <FaBookmark /> : <FaRegBookmark />}
                    {savedFacts.find(f => f.id === currentFact.id) ? 'Saved' : 'Save'}
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => copyToClipboard(`${currentFact.fact}\n\n${currentFact.factEn}`)}
                    className="px-4 py-2 bg-gray-800/50 rounded-lg border border-gray-700 text-gray-400 hover:border-blue-500 hover:text-blue-400 transition-smooth flex items-center gap-2"
                  >
                    <FaCopy />
                    Copy
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={downloadFact}
                    className="px-4 py-2 bg-gray-800/50 rounded-lg border border-gray-700 text-gray-400 hover:border-purple-500 hover:text-purple-400 transition-smooth flex items-center gap-2"
                  >
                    <FaDownload />
                    Download
                  </motion.button>

                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => shareFact('twitter')}
                      className="p-2 bg-blue-500/20 rounded-lg border border-blue-500 text-blue-400 hover:bg-blue-500/30 transition-smooth"
                    >
                      <FaTwitter />
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => shareFact('whatsapp')}
                      className="p-2 bg-green-500/20 rounded-lg border border-green-500 text-green-400 hover:bg-green-500/30 transition-smooth"
                    >
                      <FaWhatsapp />
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => shareFact('facebook')}
                      className="p-2 bg-blue-600/20 rounded-lg border border-blue-600 text-blue-500 hover:bg-blue-600/30 transition-smooth"
                    >
                      <FaFacebook />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {!currentFact && !isGenerating && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-card text-center py-20"
            >
              <FaRocket className="text-6xl text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl text-gray-400 mb-2">Ready to Explore?</h3>
              <p className="text-gray-500">Click the button above to generate your first space fact!</p>
            </motion.div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Statistics Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-6"
          >
            <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <FaLightbulb className="text-yellow-400" />
              Your Stats
            </h4>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Facts Generated</span>
                <span className="text-2xl font-bold gradient-text">{factCount}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Facts Saved</span>
                <span className="text-2xl font-bold text-green-400">{savedFacts.length}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Categories Explored</span>
                <span className="text-2xl font-bold text-blue-400">
                  {new Set(factHistory.map(f => f.category)).size}/{categories.length - 1}
                </span>
              </div>
            </div>

            {factCount >= 50 && (
              <div className="mt-4 p-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg border border-purple-500/30">
                <p className="text-sm text-purple-300 flex items-center gap-2">
                  <FaStar className="text-yellow-400" />
                  Space Explorer Expert!
                </p>
              </div>
            )}
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-6"
          >
            <h4 className="text-lg font-semibold text-white mb-4">Quick Actions</h4>
            
            <div className="space-y-2">
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setDifficulty('all');
                  setSearchTerm('');
                  generateFact();
                }}
                className="w-full px-4 py-2 bg-purple-500/20 rounded-lg border border-purple-500/30 text-purple-300 hover:bg-purple-500/30 transition-smooth text-sm flex items-center gap-2"
              >
                <FaRandom />
                Random Fact
              </button>
              
              <button
                onClick={() => {
                  setDifficulty('hard');
                  generateFact();
                }}
                className="w-full px-4 py-2 bg-red-500/20 rounded-lg border border-red-500/30 text-red-300 hover:bg-red-500/30 transition-smooth text-sm flex items-center gap-2"
              >
                <FaLightbulb />
                Challenge Me
              </button>
              
              <button
                onClick={() => {
                  if (factHistory.length > 0) {
                    setCurrentFact(factHistory[Math.floor(Math.random() * factHistory.length)]);
                  }
                }}
                disabled={factHistory.length === 0}
                className="w-full px-4 py-2 bg-blue-500/20 rounded-lg border border-blue-500/30 text-blue-300 hover:bg-blue-500/30 transition-smooth text-sm flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaHistory />
                From History
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* History Section */}
      <AnimatePresence>
        {showHistory && factHistory.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-8"
          >
            <div className="glass-card p-6">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                  <FaHistory className="text-blue-400" />
                  Recent History
                </h4>
                <button
                  onClick={clearHistory}
                  className="text-sm text-red-400 hover:text-red-300 transition-smooth"
                >
                  Clear All
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                {factHistory.map((fact, index) => (
                  <motion.div
                    key={`${fact.id}-${index}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-4 bg-gray-800/30 rounded-lg border border-gray-700 hover:border-purple-500/50 transition-smooth cursor-pointer"
                    onClick={() => setCurrentFact(fact)}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">
                        {categories.find(c => c.id === fact.category)?.icon}
                      </span>
                      <div className="flex-1">
                        <p className="text-sm text-gray-300 line-clamp-2">{fact.fact}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className={`text-xs px-2 py-0.5 rounded border ${getDifficultyColor(fact.difficulty)}`}>
                            {fact.difficulty}
                          </span>
                          <span className="text-xs text-gray-500">{fact.source}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Saved Facts Section */}
      <AnimatePresence>
        {showSaved && savedFacts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-8"
          >
            <div className="glass-card p-6">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                  <FaBookmark className="text-green-400" />
                  Saved Facts ({savedFacts.length})
                </h4>
                <button
                  onClick={clearSaved}
                  className="text-sm text-red-400 hover:text-red-300 transition-smooth"
                >
                  Clear All
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                {savedFacts.map((fact, index) => (
                  <motion.div
                    key={fact.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-4 bg-gradient-to-r from-green-900/20 to-blue-900/20 rounded-lg border border-green-500/30 hover:border-green-400 transition-smooth"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">
                        {categories.find(c => c.id === fact.category)?.icon}
                      </span>
                      <div className="flex-1">
                        <p className="text-sm text-gray-300 mb-2">{fact.fact}</p>
                        <p className="text-xs text-gray-400 italic mb-2">{fact.factEn}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className={`text-xs px-2 py-0.5 rounded border ${getDifficultyColor(fact.difficulty)}`}>
                              {fact.difficulty}
                            </span>
                            <span className="text-xs text-gray-500">{fact.source}</span>
                          </div>
                          <div className="flex gap-1">
                            <button
                              onClick={() => setCurrentFact(fact)}
                              className="p-1 text-blue-400 hover:text-blue-300 transition-smooth"
                              title="View"
                            >
                              <FaLightbulb size={14} />
                            </button>
                            <button
                              onClick={() => copyToClipboard(`${fact.fact}\n\n${fact.factEn}`)}
                              className="p-1 text-gray-400 hover:text-gray-300 transition-smooth"
                              title="Copy"
                            >
                              <FaCopy size={14} />
                            </button>
                            <button
                              onClick={() => saveFact(fact)}
                              className="p-1 text-red-400 hover:text-red-300 transition-smooth"
                              title="Remove"
                            >
                              <FaTimes size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Particles Effect */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 20,
              opacity: 0
            }}
            animate={{
              y: -20,
              opacity: [0, 1, 1, 0],
              x: Math.random() * window.innerWidth
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              delay: i * 2,
              ease: "linear"
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default FactGenerator;
