import React, { useState } from 'react';
import AdSlot from '../common/AdSlot';

const SpaceAgeCalculator = () => {
  const [age, setAge] = useState('');
  const [results, setResults] = useState(null);

  const planetYears = {
    'बुध (Mercury)': 0.2408467,
    'शुक्र (Venus)': 0.61519726,
    'मंगल (Mars)': 1.8808158,
    'बृहस्पति (Jupiter)': 11.862615,
    'शनि (Saturn)': 29.447498,
    'यूरेनस (Uranus)': 84.016846,
    'नेपच्यून (Neptune)': 164.79132
  };

  const calculateAge = () => {
    if (!age || age <= 0) return;
    
    const planetAges = {};
    Object.entries(planetYears).forEach(([planet, years]) => {
      planetAges[planet] = (age / years).toFixed(2);
    });
    setResults(planetAges);
  };

  return (
    <div className="age-calculator glass-effect p-6 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 glow-effect" style={{color: 'var(--neon-green)'}}>
        📅 Space Age Calculator
      </h2>
      
      <div className="input-section mb-4">
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="पृथ्वी पर आपकी उम्र (years में)"
          className="w-full p-4 rounded-lg bg-black/30 border neon-border text-white"
        />
        
        <AdSlot type="in-tool" />
        
        <button
          onClick={calculateAge}
          className="w-full mt-4 p-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg font-bold hover:scale-105 transition-transform"
        >
          Calculate Space Age 🚀
        </button>
      </div>

      {results && (
        <div className="results-grid grid grid-cols-2 gap-4 mt-6">
          {Object.entries(results).map(([planet, planetAge]) => (
            <div key={planet} className="planet-age-card glass-effect p-4 rounded-lg hover:scale-105 transition-all">
              <h3 className="font-semibold text-lg" style={{color: 'var(--neon-blue)'}}>
                {planet}
              </h3>
              <p className="text-2xl font-bold mt-2">
                {planetAge} years
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SpaceAgeCalculator;
