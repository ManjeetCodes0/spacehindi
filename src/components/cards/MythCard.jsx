import React, { useState } from 'react';

const MythCard = ({ myth, reality }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div 
      className="myth-card cursor-pointer"
      onClick={() => setFlipped(!flipped)}
    >
      <div className={`card-content glass-effect p-6 rounded-lg min-h-[150px] ${flipped ? 'bg-gradient-to-r from-green-500/20 to-blue-500/20' : 'bg-gradient-to-r from-pink-500/20 to-purple-500/20'}`}>
        {!flipped ? (
          <>
            <span className="text-lg mb-2">❌ मिथक / Myth</span>
            <p className="mt-2">{myth}</p>
            <span className="text-sm mt-4 opacity-70">Click to reveal truth →</span>
          </>
        ) : (
          <>
            <span className="text-lg mb-2">✅ सच्चाई / Reality</span>
            <p className="mt-2">{reality}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default MythCard;
