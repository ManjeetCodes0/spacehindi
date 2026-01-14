import React from 'react';

const AdSlot = ({ type }) => {
  return (
    <div 
      className={`ad-slot ${type} my-4`}
      style={{
        minHeight: '100px',
        width: '100%',
        margin: '20px auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'rgba(255,255,255,0.02)',
        borderRadius: '8px',
        border: '1px dashed rgba(255,255,255,0.1)'
      }}
    >
      <div className="ad-placeholder text-center opacity-30">
        <p>Ad Space</p>
        <p className="text-xs">{type}</p>
      </div>
    </div>
  );
};

export default AdSlot;
