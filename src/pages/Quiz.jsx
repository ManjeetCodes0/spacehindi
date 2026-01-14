import React, { useState } from 'react';
import AdSlot from '../components/common/AdSlot';

const Quiz = () => {
  const questions = [
    {
      id: 1,
      question: "सूर्य से सबसे नजदीक ग्रह कौन सा है?",
      options: ["शुक्र", "बुध", "पृथ्वी", "मंगल"],
      correct: 1
    },
    // Add more questions...
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (selectedIndex) => {
    if (selectedIndex === questions[currentQuestion].correct) {
      setScore(score + 1);
    }

    // Show ad between questions
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div className="quiz-container max-w-2xl mx-auto">
      {!showResult ? (
        <>
          <div className="progress-bar mb-6">
            <div 
              className="progress-fill"
              style={{
                width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                height: '4px',
                background: 'linear-gradient(90deg, var(--neon-pink), var(--neon-blue))',
                borderRadius: '2px'
              }}
            />
          </div>

          <div className="question-card glass-effect p-8">
            <h2 className="text-2xl mb-6">
              प्रश्न {currentQuestion + 1}/{questions.length}
            </h2>
            <p className="text-xl mb-6">{questions[currentQuestion].question}</p>
            
            <AdSlot type="quiz-inline" />
            
            <div className="options-grid grid gap-3 mt-4">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className="option-btn p-4 glass-effect hover:scale-102 transition-all"
                  style={{border: '1px solid var(--neon-green)'}}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="result-card glass-effect p-8 text-center">
          <h2 className="text-3xl mb-4 glow-effect" style={{color: 'var(--neon-green)'}}>
            🎉 Quiz Complete!
          </h2>
          <p className="text-xl">
            Your Score: {score}/{questions.length}
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-6 p-4 bg-gradient-to-r from-pink-500 to-blue-500 rounded-lg"
          >
            Retry Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
