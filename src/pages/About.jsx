import React from 'react';

const About = () => {
  const features = [
    { emoji: '🪐', title: 'Interactive Tools', desc: 'ग्रहों के बारे में जानने के लिए amazing tools' },
    { emoji: '📚', title: 'Hindi Content', desc: 'सभी content हिंदी और English दोनों में' },
    { emoji: '🎯', title: 'Daily Quiz', desc: 'रोज़ नए quiz से अपना ज्ञान बढ़ाएं' },
    { emoji: '🌌', title: 'HD Wallpapers', desc: 'Free space wallpapers for your devices' },
    { emoji: '🚀', title: 'Latest Updates', desc: 'Space missions और discoveries की latest news' },
    { emoji: '💫', title: 'Amazing Facts', desc: 'ब्रह्मांड के बारे में mind-blowing facts' }
  ];

  return (
    <div className="about-page px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 glow-effect bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">
            About ScienceHindi
          </h1>
          <p className="text-xl opacity-90">
            अंतरिक्ष की अद्भुत दुनिया को हिंदी में explore करें 🌠
          </p>
        </div>

        {/* Mission Statement */}
        <div className="mission-section glass-effect p-8 rounded-lg mb-12">
          <h2 className="text-2xl font-bold mb-4 glow-effect" style={{color: 'var(--neon-green)'}}>
            हमारा Mission 🎯
          </h2>
          <p className="mb-4 leading-relaxed">
            ScienceHindi का लक्ष्य है कि हर भारतीय को अंतरिक्ष और विज्ञान की जानकारी उनकी अपनी भाषा में मिले। 
            हम complex scientific concepts को simple और interesting तरीके से present करते हैं।
          </p>
          <p className="leading-relaxed">
            Our mission is to make space science accessible to everyone in India by providing 
            content in Hindi and English, with interactive tools and engaging visuals.
          </p>
        </div>

        {/* Features Grid */}
        <div className="features-section mb-12">
          <h2 className="text-2xl font-bold mb-8 text-center glow-effect" style={{color: 'var(--neon-blue)'}}>
            What We Offer
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="feature-card glass-effect p-6 rounded-lg hover:scale-105 transition-transform"
              >
                <div className="text-4xl mb-3">{feature.emoji}</div>
                <h3 className="text-lg font-semibold mb-2" style={{color: 'var(--neon-green)'}}>
                  {feature.title}
                </h3>
                <p className="text-sm opacity-80">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="contact-section glass-effect p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 glow-effect" style={{color: 'var(--neon-pink)'}}>
            Get In Touch 📧
          </h2>
          <p className="mb-4">
            Have suggestions or want to collaborate? We'd love to hear from you!
          </p>
          <div className="contact-info space-y-3">
            <div className="flex items-center space-x-3">
              <span>📧</span>
              <a href="mailto:contact@sciencehindi.com" className="text-blue-400 hover:text-blue-300">
                contact@sciencehindi.com
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <span>🐦</span>
              <a href="https://twitter.com/sciencehindi" className="text-blue-400 hover:text-blue-300">
                @sciencehindi
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <span>📘</span>
              <a href="https://facebook.com/sciencehindi" className="text-blue-400 hover:text-blue-300">
                /sciencehindi
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
