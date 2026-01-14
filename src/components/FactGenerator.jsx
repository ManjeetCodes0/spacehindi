import React, { useState } from 'react';

const FactGenerator = () => {
  const spaceFacts = [
    { hindi: "शनि पानी पर तैर सकता है", english: "Saturn can float on water" },
    { hindi: "एक दिन शुक्र पर एक साल से लंबा होता है", english: "A day on Venus is longer than its year" },
    { hindi: "न्यूट्रॉन तारे इतने घने हैं कि एक चम्मच भर 6 अरब टन वजन होगा", english: "Neutron stars are so dense that a teaspoon would weigh 6 billion tons" },
    { hindi: "चंद्रमा हर साल पृथ्वी से 3.8 cm दूर जा रहा है", english: "The Moon is moving away from Earth by 3.8 cm per year" },
    { hindi: "बृहस्पति पर हीरे की बारिश होती है", english: "It rains diamonds on Jupiter" }
  ];

  const [currentFact, setCurrentFact] = useState(0);

  const getNextFact = () => {
    setCurrentFact((prev) => (prev + 1) % spaceFacts.length);
  };

  return (
    <div className="fact-generator glass-effect p-8 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center glow-effect" style={{color: 'var(--neon-blue)'}}>
        🌌 अंतरिक्ष के जादुई तथ्य
      </h2>

      <div className="fact-display neon-border p-6 mb-6">
        <p className="text-xl mb-3" style={{color: 'var(--neon-green)'}}>
          {spaceFacts[currentFact].hindi}
        </p>
        <p className="text-sm opacity-80">
          {spaceFacts[currentFact].english}
        </p>
      </div>

      <button
        onClick={getNextFact}
        className="w-full p-4 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg font-bold hover:scale-105 transition-transform"
      >
        अगला जादुई सच दिखाएं →
      </button>
    </div>
  );
};

export default FactGenerator;
