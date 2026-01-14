import React from 'react';

const Facts = () => {
  const allFacts = [
    { hindi: "चंद्रमा हर साल 3.8 cm दूर जा रहा है", english: "The Moon moves 3.8 cm away each year", emoji: "🌙" },
    { hindi: "बृहस्पति पर हीरे की बारिश होती है", english: "It rains diamonds on Jupiter", emoji: "💎" },
    { hindi: "सूर्य में 13 लाख पृथ्वी समा सकती हैं", english: "1.3 million Earths could fit inside the Sun", emoji: "☀️" },
    { hindi: "शुक्र पर एक दिन एक साल से लंबा है", english: "A day on Venus is longer than its year", emoji: "🪐" },
    { hindi: "मंगल पर सूर्यास्त नीला होता है", english: "Sunsets on Mars are blue", emoji: "🌅" },
    { hindi: "अंतरिक्ष में आवाज़ नहीं सुनाई देती", english: "There is no sound in space", emoji: "🔇" }
  ];

  return (
    <div className="fade-in">
      <h1 className="gradient-text" style={{fontSize: '40px', marginBottom: '30px', textAlign: 'center'}}>
        🌠 Amazing Space Facts
      </h1>
      
      <div className="grid grid-2">
        {allFacts.map((fact, index) => (
          <div key={index} className="glass-effect" style={{cursor: 'pointer'}}>
            <div style={{fontSize: '48px', marginBottom: '15px', textAlign: 'center'}}>
              {fact.emoji}
            </div>
            <h3 style={{color: '#ff006e', marginBottom: '10px', fontSize: '18px'}}>
              {fact.hindi}
            </h3>
            <p style={{opacity: 0.7, fontSize: '14px'}}>
              {fact.english}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Facts;
