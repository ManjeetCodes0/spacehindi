import React from 'react';
import WeightCalculator from '../components/tools/WeightCalculator';
import SpaceAgeCalculator from '../components/tools/SpaceAgeCalculator';
import UniverseScale from '../components/tools/UniverseScale';
import ISSTracker from '../components/tools/ISSTracker';
// import AdSlot from '../components/common/AdSlot';

const Tools = () => {
  const tools = [
    {
      id: 'weight',
      title: 'Weight on Planets',
      description: 'अलग-अलग ग्रहों पर आपका वजन जानें',
      emoji: '⚖️',
      component: WeightCalculator
    },
    {
      id: 'age',
      title: 'Space Age Calculator',
      description: 'दूसरे ग्रहों पर आपकी उम्र कितनी है?',
      emoji: '📅',
      component: SpaceAgeCalculator
    },
    {
      id: 'scale',
      title: 'Universe Scale',
      description: 'ब्रह्मांड के आकार को समझें',
      emoji: '📏',
      component: UniverseScale
    },
    {
      id: 'iss',
      title: 'ISS Live Tracker',
      description: 'International Space Station की लाइव location',
      emoji: '🛸',
      component: ISSTracker
    }
  ];

  return (
    <div className="tools-page px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4 glow-effect bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
          🛠️ Interactive Space Tools
        </h1>
        <p className="text-center mb-8 opacity-80">
          अंतरिक्ष के बारे में जानने के लिए amazing tools
        </p>

        {/* Tools Grid */}
        <div className="tools-list space-y-8">
          {tools.map((tool, index) => (
            <React.Fragment key={tool.id}>
              {/* {index > 0 && <AdSlot type="between-tools" />} */}
              <div className="tool-section">
                <div className="tool-header text-center mb-6">
                  <span className="text-5xl">{tool.emoji}</span>
                  <h2 className="text-2xl font-bold mt-3">{tool.title}</h2>
                  <p className="text-sm opacity-70">{tool.description}</p>
                </div>
                <tool.component />
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tools;
