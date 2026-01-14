import React, { useState } from 'react';

const UniverseScale = () => {
  const [scale, setScale] = useState(0);

  const objects = [
    { name: 'Human / इंसान', size: '1.7 m', scale: 0 },
    { name: 'Blue Whale / ब्लू व्हेल', size: '30 m', scale: 10 },
    { name: 'Statue of Unity', size: '182 m', scale: 20 },
    { name: 'Mount Everest', size: '8,848 m', scale: 30 },
    { name: 'ISS Orbit Height', size: '408 km', scale: 40 },
    { name: 'Moon / चंद्रमा', size: '3,474 km', scale: 50 },
    { name: 'Earth / पृथ्वी', size: '12,742 km', scale: 60 },
    { name: 'Jupiter / बृहस्पति', size: '139,820 km', scale: 70 },
    { name: 'Sun / सूर्य', size: '1.39 million km', scale: 80 },
    { name: 'Solar System', size: '287 billion km', scale: 90 },
    { name: 'Milky Way / आकाशगंगा', size: '100,000 light years', scale: 100 }
  ];

  const currentObject = objects.find((obj, idx) => {
    const nextObj = objects[idx + 1];
    if (!nextObj) return scale >= obj.scale;
    return scale >= obj.scale && scale < nextObj.scale;
  });

  return (
    <div className="universe-scale glass-effect p-6 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 glow-effect text-center" style={{color: 'var(--neon-purple)'}}>
        📏 Universe Scale Explorer
      </h2>

      <div className="scale-display text-center mb-8">
        <div className="text-6xl mb-4">{currentObject?.scale === 100 ? '🌌' : '🌍'}</div>
        <h3 className="text-2xl font-bold mb-2" style={{color: 'var(--neon-green)'}}>
          {currentObject?.name}
        </h3>
        <p className="text-xl opacity-80">{currentObject?.size}</p>
      </div>

      <div className="scale-slider mb-8">
        <input
          type="range"
          min="0"
          max="100"
          value={scale}
          onChange={(e) => setScale(Number(e.target.value))}
          className="w-full"
          style={{
            background: `linear-gradient(to right, var(--neon-pink) 0%, var(--neon-blue) ${scale}%, rgba(255,255,255,0.1) ${scale}%, rgba(255,255,255,0.1) 100%)`
          }}
        />
        <div className="scale-labels flex justify-between mt-2 text-xs opacity-60">
          <span>Human</span>
          <span>Earth</span>
          <span>Solar System</span>
          <span>Galaxy</span>
        </div>
      </div>

      <div className="scale-info glass-effect p-4 rounded-lg">
        <p className="text-sm opacity-80">
          Slide to explore the incredible scale of our universe! 
          ब्रह्मांड के अविश्वसनीय आकार को explore करें!
        </p>
      </div>
    </div>
  );
};

export default UniverseScale;
