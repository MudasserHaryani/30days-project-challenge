import React from 'react';

const LoadingPage = () => {
  return (
    <div
      className="flex items-center justify-center h-screen"
      style={{ background: 'linear-gradient(135deg, #000814, #001d3d)' }}
    >
      {/* Animated Circle */}
      <div className="spinner"></div>
    </div>
  );
};

export default LoadingPage;
