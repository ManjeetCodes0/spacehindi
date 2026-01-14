import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <h3 className="gradient-text" style={{fontSize: '20px', marginBottom: '10px'}}>
        ScienceHindi
      </h3>
      <p style={{opacity: 0.7, marginBottom: '20px'}}>
        अंतरिक्ष और विज्ञान की रोमांचक दुनिया
      </p>
      <div style={{marginBottom: '20px'}}>
        <button 
          className="btn btn-primary"
          onClick={() => window.open('https://wa.me/?text=Check out ScienceHindi!', '_blank')}
        >
          Share on WhatsApp 📱
        </button>
      </div>
      <p style={{fontSize: '14px', opacity: 0.5}}>
        © 2024 ScienceHindi | Made with ❤️ for Space Lovers
      </p>
    </footer>
  );
};

export default Footer;
