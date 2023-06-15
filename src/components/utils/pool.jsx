import React from 'react';

function WaterPool(props) {
  const { width, height, color, waterLevel } = props;
  
  const waterPoolStyle = {
    width: '500px',
    height: '500px',
    backgroundColor: color,
    borderRadius: '50%',
    position: 'relative',
    overflow: 'hidden',
  };

  const waterLevelStyle = {
    width: '100%',
    height: `${waterLevel}%`,
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 255, 0.3), rgba(0, 0, 255, 0.1))',
    backgroundPosition: '0 0',
    animation: 'wave 5s linear infinite',
    transformOrigin: 'center top',
  };

  const waveKeyframes = `
    @keyframes wave {
      0% {
        background-position: 0 0;
      }
      100% {
        background-position: 0 -400px;
      }
    }
  `;

  return (
    <>
      <style>{waveKeyframes}</style>
      <div style={waterPoolStyle}>
        <div style={waterLevelStyle}></div>
      </div>
      <h1 className='mt-4'>Percentage of Water: {waterLevel}</h1>
    </>
  );
}

export default WaterPool;
