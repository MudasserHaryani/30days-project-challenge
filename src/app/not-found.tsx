'use client'
import React from 'react';

const NotFoundPage = () => {
  return (
    <div
      className="flex flex-col items-center justify-center h-screen p-4"
      style={{ background: 'linear-gradient(135deg, #000814, #001d3d)' }}
    >
      {/* Center the not-found message within the screen */}
      <div
        className="rounded-2xl shadow-lg p-8 w-full max-w-md text-center"
        style={{ backgroundColor: '#003566' }}
      >
        {/* Main heading */}
        <h1
          className="text-4xl font-bold mb-4"
          style={{ color: '#ffd60a', textShadow: '2px 2px #003566' }}
        >
          Sorry this project is under process
        </h1>
        {/* Description */}
        <p
          className="text-lg mb-6"
          style={{ color: '#ffc300' }}
        >
          Oops! The page you're looking for will be available soon!
        </p>
        {/* Back to Home button */}
        <div className="flex justify-center">
          <button
            className="font-bold py-2 px-4 rounded-full transition-colors duration-300"
            style={{ backgroundColor: '#ffd60a', color: '#003566' }}
            onClick={() => window.location.href = '/'}
          >
            🔙 Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
