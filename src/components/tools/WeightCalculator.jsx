import React, { useState } from 'react';

const WeightCalculator = () => {
  const [weight, setWeight] = useState('');
  const [results, setResults] = useState(null);

  const planetGravity = {
    'बुध (Mercury)': 0.378,
    'शुक्र (Venus)': 0.907,
    'मंगल (Mars)': 0.377,
    'बृहस्पति (Jupiter)': 2.36,
    'शनि (Saturn)': 0.916,
    'चंद्रमा (Moon)': 0.166
  };

  const calculateWeight = () => {
    if (!weight || weight <= 0) return;
    
    const planetWeights = {};
    Object.entries(planetGravity).forEach(([planet, gravity]) => {
      planetWeights[planet] = (weight * gravity).toFixed(2);
    });
    setResults(planetWeights);
  };

  return (
    <div className="weight-calculator glass-effect p-6 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 glow-effect" style={{color: 'var(--neon-pink)'}}>
        🪐 ग्रहों पर आपका वजन
      </h2>
      
      <div className="input-section mb-4">
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="पृथ्वी पर आपका वजन (kg में)"
          className="w-full p-4 rounded-lg bg-black/30 border-2 border-blue-500/50 text-white"
        />
        
        <button
          onClick={calculateWeight}
          className="w-full mt-4 p-4 bg-gradient-to-r from-pink-500 to-blue-500 rounded-lg font-bold hover:scale-105 transition-transform"
        >
          Calculate करें 🚀
        </button>
      </div>

      {results && (
        <div className="results-grid grid grid-cols-2 gap-4 mt-6">
          {Object.entries(results).map(([planet, planetWeight]) => (
            <div key={planet} className="planet-card glass-effect p-4 rounded-lg">
              <h3 className="font-semibold text-lg" style={{color: 'var(--neon-green)'}}>
                {planet}
              </h3>
              <p className="text-2xl font-bold mt-2">
                {planetWeight} kg
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WeightCalculator;
