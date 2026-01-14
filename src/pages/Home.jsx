import React, { useState } from 'react';
import FactCard from '../components/cards/FactCard';

const Home = () => {
  const [weight, setWeight] = useState('');
  const [planetWeights, setPlanetWeights] = useState(null);

  const calculateWeight = () => {
    if (!weight || weight <= 0) return;
    
    const weights = {
      'Mercury (बुध)': (weight * 0.378).toFixed(2),
      'Venus (शुक्र)': (weight * 0.907).toFixed(2),
      'Mars (मंगल)': (weight * 0.377).toFixed(2),
      'Jupiter (बृहस्पति)': (weight * 2.36).toFixed(2),
      'Saturn (शनि)': (weight * 0.916).toFixed(2),
      'Moon (चंद्रमा)': (weight * 0.166).toFixed(2)
    };
    setPlanetWeights(weights);
  };

  const spaceFacts = [
    {
      title: "शनि पानी पर तैर सकता है",
      content: "Saturn is less dense than water and would float!",
      emoji: "🪐"
    },
    {
      title: "एक दिन शुक्र पर",
      content: "A day on Venus is longer than its year",
      emoji: "🌟"
    },
    {
      title: "न्यूट्रॉन तारे",
      content: "A teaspoon of neutron star would weigh 6 billion tons",
      emoji: "⭐"
    }
  ];

  return (
    <div className="fade-in">
      {/* Hero Section */}
      <div className="glass-effect" style={{textAlign: 'center', padding: '40px 20px'}}>
        <h1 className="gradient-text" style={{fontSize: '48px', marginBottom: '20px'}}>
          Welcome to ScienceHindi
        </h1>
        <p style={{fontSize: '20px', opacity: 0.9}}>
          अंतरिक्ष की अद्भुत दुनिया में आपका स्वागत है 🚀
        </p>
      </div>

      {/* Weight Calculator */}
      <div className="glass-effect" style={{marginTop: '30px'}}>
        <h2 className="gradient-text" style={{fontSize: '32px', marginBottom: '20px'}}>
          🪐 ग्रहों पर आपका वजन
        </h2>
        <input
          type="number"
          className="weight-input"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="पृथ्वी पर आपका वजन (kg में)"
        />
        <button 
          className="btn btn-primary"
          onClick={calculateWeight}
          style={{width: '100%'}}
        >
          Calculate करें 🚀
        </button>

        {planetWeights && (
          <div style={{marginTop: '30px'}}>
            <h3 style={{marginBottom: '15px'}}>Your Weight on Different Planets:</h3>
            {Object.entries(planetWeights).map(([planet, w]) => (
              <div key={planet} className="planet-weight-card">
                <strong style={{color: '#00ff88'}}>{planet}:</strong> {w} kg
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Space Facts */}
      <div style={{marginTop: '30px'}}>
        <h2 className="gradient-text" style={{fontSize: '32px', marginBottom: '20px'}}>
          ✨ Amazing Space Facts
        </h2>
        <div className="grid grid-2">
          {spaceFacts.map((fact, index) => (
            <FactCard key={index} fact={fact} />
          ))}
        </div>
      </div>

      {/* Daily Space Image */}
      <div className="glass-effect" style={{marginTop: '30px', textAlign: 'center'}}>
        <h2 className="gradient-text" style={{fontSize: '28px', marginBottom: '20px'}}>
          🌌 Space Image of the Day
        </h2>
        <div style={{
          height: '300px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <p style={{fontSize: '60px'}}>🌠</p>
        </div>
        <p style={{marginTop: '15px', opacity: 0.8}}>
          Beautiful Nebula captured by Hubble Telescope
        </p>
      </div>
    </div>
  );
};

export default Home;
