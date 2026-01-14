import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaCheckCircle, FaTimesCircle, FaLightbulb, 
  FaQuestionCircle, FaLock 
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';

const QuizQuestion = ({ 
  question, 
  questionNumber, 
  onAnswer, 
  showHint, 
  onShowHint 
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState([]);

  useEffect(() => {
    // Shuffle options when new question loads
    const shuffled = [...question.options].sort(() => Math.random() - 0.5);
    setShuffledOptions(shuffled);
    setSelectedAnswer(null);
    setIsAnswered(false);
  }, [question]);

  const handleAnswerClick = (option, index) => {
    if (isAnswered) return;
    
    setSelectedAnswer(index);
    setIsAnswered(true);
    const isCorrect = option === question.correctAnswer;
    
    setTimeout(() => {
      onAnswer(option, isCorrect);
    }, 1000);
  };

  const getDifficultyColor = () => {
    switch(question.difficulty) {
      case 'easy': return 'from-green-500 to-emerald-500';
      case 'medium': return 'from-yellow-500 to-orange-500';
      case 'hard': return 'from-red-500 to-pink-500';
      default: return 'from-blue-500 to-purple-500';
    }
  };

  const getOptionColor = (option, index) => {
    if (!isAnswered) return 'bg-white/10 hover:bg-white/20';
    if (option === question.correctAnswer) return 'bg-green-500/30 border-green-500';
    if (selectedAnswer === index && option !== question.correctAnswer) return 'bg-red-500/30 border-red-500';
    return 'bg-white/5 opacity-50';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      {/* Question Card */}
      <div className="glass-card p-8">
        {/* Question Header */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center text-white font-bold">
              {questionNumber}
            </div>
            
            {/* Category & Difficulty */}
            <div>
              <span className="text-sm text-gray-400">{question.category}</span>
              <div className={`inline-block ml-2 px-2 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${getDifficultyColor()}`}>
                {question.difficulty}
              </div>
            </div>
          </div>

          {/* Points */}
          <div className="text-right">
            <p className="text-sm text-gray-400">Points</p>
            <p className="text-2xl font-bold text-white">10</p>
          </div>
        </div>

        {/* Question Text */}
        <div className="mb-6">
          <h3 className="text-xl md:text-2xl font-semibold text-white leading-relaxed">
            {question.question}
          </h3>
        </div>

        {/* Question Image (if available) */}
        {question.image && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 rounded-xl overflow-hidden"
          >
            <img 
              src={question.image} 
              alt="Question visual"
              className="w-full h-48 object-cover"
            />
          </motion.div>
        )}

        {/* Hint Section */}
        {!isAnswered && (
          <AnimatePresence>
            {!showHint ? (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onShowHint}
                className="mb-4 px-4 py-2 rounded-lg bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 flex items-center gap-2 hover:bg-yellow-500/30 transition-colors"
              >
                <FaLightbulb />
                <span>Need a hint?</span>
              </motion.button>
            ) : (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-4 p-4 rounded-lg bg-blue-500/20 border border-blue-500/30"
              >
                <div className="flex items-start gap-2">
                  <FaLightbulb className="text-blue-400 mt-1" />
                  <p className="text-blue-300 text-sm">{question.hint}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>

      {/* Answer Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {shuffledOptions.map((option, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={!isAnswered ? { scale: 1.02 } : {}}
            whileTap={!isAnswered ? { scale: 0.98 } : {}}
            onClick={() => handleAnswerClick(option, index)}
            disabled={isAnswered}
            className={`relative p-6 rounded-xl border-2 transition-all duration-300 ${getOptionColor(option, index)} ${
              !isAnswered ? 'cursor-pointer border-white/20' : 'cursor-not-allowed'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-left text-white font-medium">
                {option}
              </span>
              
              {isAnswered && (
                <AnimatePresence>
                  {option === question.correctAnswer ? (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring" }}
                    >
                      <FaCheckCircle className="text-2xl text-green-400" />
                    </motion.div>
                  ) : selectedAnswer === index ? (
                    <motion.div
                      initial={{ scale: 0, rotate: 180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring" }}
                    >
                      <FaTimesCircle className="text-2xl text-red-400" />
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              )}
            </div>

            {/* Selection Indicator */}
            {!isAnswered && (
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 rounded-full border-2 border-white/50">
                <AnimatePresence>
                  {selectedAnswer === index && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="w-full h-full rounded-full bg-cyan-400"
                    />
                  )}
                </AnimatePresence>
              </div>
            )}
          </motion.button>
        ))}
      </div>

      {/* Explanation (shown after answering) */}
      <AnimatePresence>
        {isAnswered && question.explanation && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="glass-card p-6"
          >
            <div className="flex items-start gap-3">
              <FaQuestionCircle className="text-purple-400 text-xl mt-1" />
              <div>
                <h4 className="text-lg font-semibold text-purple-400 mb-2">
                  Did you know?
                </h4>
                <p className="text-gray-300 leading-relaxed">
                  {question.explanation}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default QuizQuestion;
