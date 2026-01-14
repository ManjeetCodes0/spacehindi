import React from 'react';

const FactCard = ({ fact }) => {
  return (
    <div className="fact-card">
      <div style={{fontSize: '40px', marginBottom: '15px'}}>
        {fact.emoji}
      </div>
      <h3 style={{color: '#00ff88', marginBottom: '10px'}}>
        {fact.title}
      </h3>
      <p style={{opacity: 0.8}}>
        {fact.content}
      </p>
    </div>
  );
};

export default FactCard;
