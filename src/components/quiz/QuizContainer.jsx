import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaPlay, FaPause, FaClock, FaTrophy, FaStar, 
  FaCheckCircle, FaTimesCircle, FaRedo, FaShare,
  FaLightbulb, FaGraduationCap
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';
import { BiRocket } from 'react-icons/bi';
import confetti from 'canvas-confetti';
import QuizQuestion from './QuizQuestion';

const QuizContainer = ({ quizData, category = 'space' }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(300); // 5 minutes
  const [isPaused, setIsPaused] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [streakCount, setStreakCount] = useState(0);
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    let timer;
    if (isQuizActive && !isPaused && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            handleQuizComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isQuizActive, isPaused, timeRemaining]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartQuiz = () => {
    setIsQuizActive(true);
    setCurrentQuestion(0);
    setScore(0);
    setAnswers([]);
    setTimeRemaining(300);
    setIsQuizComplete(false);
    setStreakCount(0);
    setAchievements([]);
  };

  const handleAnswer = (answer, isCorrect) => {
    const newAnswers = [...answers, { question: currentQuestion, answer, isCorrect }];
    setAnswers(newAnswers);
    
    if (isCorrect) {
      setScore(prev => prev + 10);
      setStreakCount(prev => prev + 1);
      
      // Check for achievements
      if (streakCount >= 2) {
        const newAchievement = `${streakCount + 1} in a row!`;
        setAchievements(prev => [...prev, newAchievement]);
        
        // Trigger mini confetti for streak
        confetti({
          particleCount: 30,
          spread: 50,
          origin: { y: 0.8 }
        });
      }
    } else {
      setStreakCount(0);
    }

    if (currentQuestion < quizData.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(prev => prev + 1);
        setShowHint(false);
      }, 1500);
    } else {
      setTimeout(() => {
        handleQuizComplete();
      }, 1500);
    }
  };

  const handleQuizComplete = () => {
    setIsQuizActive(false);
    setIsQuizComplete(true);
    
    const percentage = (score / (quizData.length * 10)) * 100;
    if (percentage >= 80) {
      // Celebration for high score
      confetti({
        particleCount: 200,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#4ECDC4', '#95E1D3', '#FFD93D', '#C77DFF']
      });
    }
  };

  const getGrade = () => {
    const percentage = (score / (quizData.length * 10)) * 100;
    if (percentage >= 90) return { grade: 'A+', color: 'text-green-400', message: 'Outstanding! 🌟' };
    if (percentage >= 80) return { grade: 'A', color: 'text-green-400', message: 'Excellent! 🎯' };
    if (percentage >= 70) return { grade: 'B', color: 'text-blue-400', message: 'Great Job! 🚀' };
    if (percentage >= 60) return { grade: 'C', color: 'text-yellow-400', message: 'Good Effort! 👍' };
    return { grade: 'D', color: 'text-red-400', message: 'Keep Practicing! 💪' };
  };

  return (
    <div className="max-w-4xl mx-auto">
      <AnimatePresence mode="wait">
        {/* Start Screen */}
        {!isQuizActive && !isQuizComplete && (
          <motion.div
            key="start"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center"
          >
            <div className="glass-card p-12">
              {/* Animated Icon */}
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="mb-8"
              >
                <BiRocket className="text-8xl text-cyan-400 mx-auto" />
              </motion.div>

              <h2 className="text-4xl font-bold gradient-text mb-4">
                Space Knowledge Challenge
              </h2>
              
              <p className="text-gray-400 mb-8 max-w-md mx-auto">
                Test your knowledge about the cosmos! Answer {quizData.length} questions 
                about {category} and earn your space explorer badge!
              </p>

              {/* Quiz Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8 max-w-md mx-auto">
                <div className="glass-card p-4">
                  <FaGraduationCap className="text-2xl text-purple-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-400">Questions</p>
                  <p className="text-xl font-bold text-white">{quizData.length}</p>
                </div>
                
                <div className="glass-card p-4">
                  <FaClock className="text-2xl text-yellow-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-400">Time Limit</p>
                  <p className="text-xl font-bold text-white">5 min</p>
                </div>
                
                <div className="glass-card p-4">
                  <FaTrophy className="text-2xl text-orange-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-400">Max Score</p>
                  <p className="text-xl font-bold text-white">{quizData.length * 10}</p>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleStartQuiz}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold text-lg shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 flex items-center gap-3 mx-auto"
              >
                <FaPlay />
                Start Quiz
                <HiSparkles className="animate-pulse" />
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Quiz Screen */}
        {isQuizActive && !isQuizComplete && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
          >
            {/* Quiz Header */}
            <div className="glass-card p-4 mb-6">
              <div className="flex justify-between items-center">
                {/* Progress Bar */}
                <div className="flex-1 mr-4">
                  <div className="flex justify-between text-sm text-gray-400 mb-2">
                    <span>Question {currentQuestion + 1} of {quizData.length}</span>
                    <span>{Math.round(((currentQuestion) / quizData.length) * 100)}% Complete</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${((currentQuestion) / quizData.length) * 100}%` }}
                      className="h-full bg-gradient-to-r from-cyan-500 to-purple-500"
                    />
                  </div>
                </div>

                {/* Timer */}
                <div className="flex items-center gap-4">
                  <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
                    timeRemaining < 60 ? 'bg-red-500/20 text-red-400' : 'bg-white/10 text-gray-300'
                  }`}>
                    <FaClock className={timeRemaining < 60 ? 'animate-pulse' : ''} />
                    <span className="font-mono font-bold">{formatTime(timeRemaining)}</span>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsPaused(!isPaused)}
                    className="p-2 rounded-lg bg-white/10 text-gray-300 hover:bg-white/20 transition-colors"
                  >
                    {isPaused ? <FaPlay /> : <FaPause />}
                  </motion.button>
                </div>
              </div>

              {/* Score and Streak */}
              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <FaTrophy className="text-yellow-400" />
                  <span className="text-white font-bold">Score: {score}</span>
                </div>
                
                {streakCount > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-orange-500 to-red-500"
                  >
                    <FaStar className="text-yellow-300" />
                    <span className="text-white font-bold text-sm">{streakCount} Streak!</span>
                  </motion.div>
                )}

                {achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className="px-3 py-1 rounded-full bg-gradient-to-r from-green-500 to-teal-500 text-white text-sm font-bold"
                  >
                    {achievement}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Question */}
            {!isPaused ? (
              <QuizQuestion
                question={quizData[currentQuestion]}
                questionNumber={currentQuestion + 1}
                onAnswer={handleAnswer}
                showHint={showHint}
                onHintRequest={() => setShowHint(true)}
              />
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass-card p-12 text-center"
              >
                <FaPause className="text-6xl text-yellow-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Quiz Paused</h3>
                <p className="text-gray-400">Click play to continue</p>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Results Screen */}
        {isQuizComplete && (
          <motion.div
            key="results"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-8"
          >
            <div className="text-center mb-8">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2 }}
                className="inline-block mb-4"
              >
                <FaTrophy className="text-8xl text-yellow-400" />
              </motion.div>
              
              <h2 className="text-4xl font-bold text-white mb-2">Quiz Complete!</h2>
              
              <div className="mt-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className={`text-6xl font-bold ${getGrade().color} mb-2`}
                >
                  {getGrade().grade}
                </motion.div>
                <p className="text-xl text-gray-300">{getGrade().message}</p>
              </div>
            </div>

            {/* Score Breakdown */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="glass-card p-4 text-center"
              >
                <FaCheckCircle className="text-green-400 text-2xl mx-auto mb-2" />
                <p className="text-sm text-gray-400">Correct</p>
                <p className="text-2xl font-bold text-white">
                  {answers.filter(a => a.isCorrect).length}
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="glass-card p-4 text-center"
              >
                <FaTimesCircle className="text-red-400 text-2xl mx-auto mb-2" />
                <p className="text-sm text-gray-400">Incorrect</p>
                <p className="text-2xl font-bold text-white">
                  {answers.filter(a => !a.isCorrect).length}
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="glass-card p-4 text-center"
              >
                <FaTrophy className="text-yellow-400 text-2xl mx-auto mb-2" />
                <p className="text-sm text-gray-400">Score</p>
                <p className="text-2xl font-bold text-white">{score}</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="glass-card p-4 text-center"
              >
                <FaClock className="text-purple-400 text-2xl mx-auto mb-2" />
                <p className="text-sm text-gray-400">Time</p>
                <p className="text-2xl font-bold text-white">
                  {formatTime(300 - timeRemaining)}
                </p>
              </motion.div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleStartQuiz}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold flex items-center gap-2"
              >
                <FaRedo />
                Try Again
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-full bg-white/10 text-white font-semibold flex items-center gap-2 hover:bg-white/20"
              >
                <FaShare />
                Share Results
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QuizContainer;
