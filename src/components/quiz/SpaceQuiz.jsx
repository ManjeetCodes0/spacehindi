import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaRocket, FaStar, FaTrophy, FaClock, FaCheckCircle,
  FaTimesCircle, FaLightbulb, FaGamepad, FaChartBar
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';
import confetti from 'canvas-confetti';

const SpaceQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [quizStarted, setQuizStarted] = useState(false);
  const [difficulty, setDifficulty] = useState('medium');
  const [category, setCategory] = useState('all');
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [fiftyFiftyUsed, setFiftyFiftyUsed] = useState(false);

  const questions = [
    {
      id: 1,
      category: 'planets',
      difficulty: 'easy',
      question: 'सौर मंडल का सबसे बड़ा ग्रह कौन सा है?',
      questionEn: 'Which is the largest planet in our solar system?',
      options: ['बृहस्पति', 'शनि', 'पृथ्वी', 'मंगल'],
      optionsEn: ['Jupiter', 'Saturn', 'Earth', 'Mars'],
      correct: 0,
      hint: 'यह एक गैस दानव है',
      explanation: 'बृहस्पति सौर मंडल का सबसे बड़ा ग्रह है।'
    },
    {
      id: 2,
      category: 'stars',
      difficulty: 'medium',
      question: 'सूर्य से निकटतम तारा कौन सा है?',
      questionEn: 'Which star is closest to the Sun?',
      options: ['प्रॉक्सिमा सेंटॉरी', 'सीरियस', 'वेगा', 'बेटलजूस'],
      optionsEn: ['Proxima Centauri', 'Sirius', 'Vega', 'Betelgeuse'],
      correct: 0,
      hint: 'यह अल्फा सेंटॉरी प्रणाली का हिस्सा है',
      explanation: 'प्रॉक्सिमा सेंटॉरी सूर्य से लगभग 4.24 प्रकाश वर्ष दूर है।'
    }
  ];

  useEffect(() => {
    if (quizStarted && timeLeft > 0 && !isAnswered) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isAnswered) {
      handleTimeout();
    }
  }, [timeLeft, quizStarted, isAnswered]);

  const startQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setTimeLeft(30);
    setStreak(0);
    setHintsUsed(0);
    setFiftyFiftyUsed(false);
  };

  const handleAnswer = (answerIndex) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answerIndex);
    setIsAnswered(true);
    
    const correct = questions[currentQuestion].correct === answerIndex;
    
    if (correct) {
      const timeBonus = Math.floor(timeLeft / 3);
      const streakBonus = streak * 5;
      const totalPoints = 10 + timeBonus + streakBonus;
      
      setScore(score + totalPoints);
      setStreak(streak + 1);
      
      if (streak + 1 > bestStreak) {
        setBestStreak(streak + 1);
      }
      
      // Celebration
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
    } else {
      setStreak(0);
    }
  };

  const handleTimeout = () => {
    setIsAnswered(true);
    setSelectedAnswer(-1);
    setStreak(0);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setTimeLeft(30);
    } else {
      setShowResult(true);
    }
  };

  const useHint = () => {
    if (hintsUsed >= 3 || isAnswered) return;
    setHintsUsed(hintsUsed + 1);
    setScore(Math.max(0, score - 5));
    // Show hint
  };

  const useFiftyFifty = () => {
    if (fiftyFiftyUsed || isAnswered) return;
    setFiftyFiftyUsed(true);
    setScore(Math.max(0, score - 10));
    // Remove two wrong answers
  };

  const getGrade = () => {
    const percentage = (score / (questions.length * 20)) * 100;
    if (percentage >= 90) return { grade: 'S', color: 'text-purple-400', message: 'शानदार!' };
    if (percentage >= 80) return { grade: 'A', color: 'text-green-400', message: 'बहुत अच्छा!' };
    if (percentage >= 70) return { grade: 'B', color: 'text-blue-400', message: 'अच्छा!' };
    if (percentage >= 60) return { grade: 'C', color: 'text-yellow-400', message: 'ठीक है!' };
    return { grade: 'D', color: 'text-red-400', message: 'फिर प्रयास करें!' };
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto"
    >
      {/* Quiz Header */}
      <div className="glass-card p-8 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <FaGamepad className="text-5xl text-purple-400" />
            </motion.div>
            <div>
              <h2 className="text-3xl font-bold gradient-text-animated">
                Space Quiz Challenge
              </h2>
              <p className="text-gray-400 mt-1">Test your space knowledge!</p>
            </div>
          </div>
          
          {quizStarted && (
            <div className="flex items-center gap-4">
              <div className="glass-card px-4 py-2 flex items-center gap-2">
                <FaStar className="text-yellow-400" />
                <span className="font-bold">{score}</span>
              </div>
              <div className="glass-card px-4 py-2 flex items-center gap-2">
                <FaClock className="text-blue-400" />
                <span className={`font-bold ${timeLeft < 10 ? 'text-red-400' : ''}`}>
                  {timeLeft}s
                </span>
              </div>
              <div className="glass-card px-4 py-2 flex items-center gap-2">
                <HiSparkles className="text-purple-400" />
                <span className="font-bold">{streak}x</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quiz Content */}
      {!quizStarted && !showResult && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="glass-card p-12 text-center"
        >
          <FaRocket className="text-8xl text-purple-400 mx-auto mb-6 float-animation" />
          <h3 className="text-2xl font-bold text-white mb-4">
            Ready for Space Challenge?
          </h3>
          <p className="text-gray-400 mb-8">
            Answer questions about space and earn points!
          </p>
          
          <div className="grid grid-cols-2 gap-4 mb-8 max-w-md mx-auto">
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Difficulty</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 text-white"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
            
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 text-white"
              >
                <option value="all">All</option>
                <option value="planets">Planets</option>
                <option value="stars">Stars</option>
                <option value="galaxies">Galaxies</option>
              </select>
            </div>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startQuiz}
            className="btn-cosmic text-xl px-8 py-4"
          >
            Start Quiz
          </motion.button>
        </motion.div>
      )}

      {/* Quiz Question */}
      {quizStarted && !showResult && (
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="space-card"
          >
            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span>Question {currentQuestion + 1} of {questions.length}</span>
                <span>{Math.round((currentQuestion / questions.length) * 100)}% Complete</span>
              </div>
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            {/* Question */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">
                {questions[currentQuestion].question}
              </h3>
              <p className="text-lg text-gray-400 italic">
                {questions[currentQuestion].questionEn}
              </p>
            </div>

// ... continuing from previous code

            {/* Power-ups */}
            <div className="flex gap-4 mb-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={useHint}
                disabled={hintsUsed >= 3 || isAnswered}
                className="flex-1 px-4 py-2 bg-yellow-500/20 rounded-lg border border-yellow-500/30 text-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed transition-smooth flex items-center justify-center gap-2"
              >
                <FaLightbulb />
                Hint ({3 - hintsUsed}/3)
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={useFiftyFifty}
                disabled={fiftyFiftyUsed || isAnswered}
                className="flex-1 px-4 py-2 bg-purple-500/20 rounded-lg border border-purple-500/30 text-purple-400 disabled:opacity-50 disabled:cursor-not-allowed transition-smooth flex items-center justify-center gap-2"
              >
                50/50 {fiftyFiftyUsed ? '✓' : ''}
              </motion.button>
            </div>

            {/* Options */}
            <div className="grid grid-cols-2 gap-4">
              {questions[currentQuestion].options.map((option, index) => {
                const isCorrect = isAnswered && index === questions[currentQuestion].correct;
                const isWrong = isAnswered && index === selectedAnswer && index !== questions[currentQuestion].correct;
                const isSelected = index === selectedAnswer;
                
                return (
                  <motion.button
                    key={index}
                    whileHover={!isAnswered ? { scale: 1.05 } : {}}
                    whileTap={!isAnswered ? { scale: 0.95 } : {}}
                    onClick={() => handleAnswer(index)}
                    disabled={isAnswered}
                    className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                      isCorrect
                        ? 'bg-green-500/20 border-green-500 text-green-400'
                        : isWrong
                        ? 'bg-red-500/20 border-red-500 text-red-400'
                        : isSelected
                        ? 'bg-blue-500/20 border-blue-500 text-blue-400'
                        : 'bg-gray-800/50 border-gray-700 hover:border-purple-500 text-gray-300'
                    } ${isAnswered ? 'cursor-default' : 'cursor-pointer'}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{option}</span>
                      {isCorrect && <FaCheckCircle className="ml-2" />}
                      {isWrong && <FaTimesCircle className="ml-2" />}
                    </div>
                    <span className="text-xs text-gray-500 block mt-1">
                      {questions[currentQuestion].optionsEn[index]}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            {/* Explanation */}
            {isAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-blue-500/10 rounded-lg border border-blue-500/30"
              >
                <p className="text-blue-300">{questions[currentQuestion].explanation}</p>
              </motion.div>
            )}

            {/* Next Button */}
            {isAnswered && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={nextQuestion}
                className="btn-cosmic w-full mt-6"
              >
                {currentQuestion < questions.length - 1 ? 'Next Question' : 'View Results'}
              </motion.button>
            )}
          </motion.div>
        </AnimatePresence>
      )}

      {/* Results */}
      {showResult && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="glass-card p-8 text-center"
        >
          <FaTrophy className="text-8xl text-yellow-400 mx-auto mb-6" />
          
          <h3 className="text-3xl font-bold text-white mb-2">Quiz Complete!</h3>
          
          <div className="text-6xl font-bold mb-4">
            <span className={getGrade().color}>{getGrade().grade}</span>
          </div>
          
          <p className="text-2xl text-gray-300 mb-6">{getGrade().message}</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="glass-card p-4">
              <FaStar className="text-2xl text-yellow-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{score}</p>
              <p className="text-sm text-gray-400">Total Score</p>
            </div>
            
            <div className="glass-card p-4">
              <FaCheckCircle className="text-2xl text-green-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">
                {questions.filter((_, i) => i <= currentQuestion).filter((q, i) => selectedAnswer === q.correct).length}
              </p>
              <p className="text-sm text-gray-400">Correct</p>
            </div>
            
            <div className="glass-card p-4">
              <HiSparkles className="text-2xl text-purple-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{bestStreak}</p>
              <p className="text-sm text-gray-400">Best Streak</p>
            </div>
            
            <div className="glass-card p-4">
              <FaChartBar className="text-2xl text-blue-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">
                {Math.round((score / (questions.length * 20)) * 100)}%
              </p>
              <p className="text-sm text-gray-400">Accuracy</p>
            </div>
          </div>
          
          <div className="flex gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startQuiz}
              className="btn-cosmic px-6 py-3"
            >
              Play Again
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gray-800/50 rounded-lg border border-gray-700 text-gray-300 hover:border-purple-500 transition-smooth"
            >
              View Leaderboard
            </motion.button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SpaceQuiz;
