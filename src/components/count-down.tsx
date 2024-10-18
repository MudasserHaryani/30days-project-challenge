"use client"; // Ensure this is a Client Component

import { useState, useEffect } from 'react';

function CountdownTimer() {
  const [duration, setDuration] = useState<number>(0); // Duration in seconds
  const [timeLeft, setTimeLeft] = useState<number>(0); // Time left in seconds
  const [isActive, setIsActive] = useState<boolean>(false); // Countdown active status
  const [hasEnded, setHasEnded] = useState<boolean>(false); // Countdown ended status

  // Handle input change for duration
  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDuration(Number(e.target.value));
  };

  // Set duration for the countdown
  const handleSetDuration = () => {
    setTimeLeft(duration);
    setHasEnded(false); // Reset hasEnded when setting duration
  };

  // Start the countdown
  const handleStart = () => {
    if (timeLeft > 0) setIsActive(true);
  };

  // Pause the countdown
  const handlePause = () => {
    setIsActive(false);
  };

  // Reset the countdown
  const handleReset = () => {
    setIsActive(false);
    setTimeLeft(0);
    setHasEnded(false); // Reset hasEnded when resetting
  };

  // Effect to manage countdown timer
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null; // Type for the interval

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      if (interval) {
        clearInterval(interval);
      }
      setIsActive(false);
      setHasEnded(true);

      // Play the audio when the timer ends
      const audio = new Audio('/audio/alarm.mp3');
      audio.play().catch((error) => {
        console.error("Audio playback failed:", error);
      });
    }

    // Cleanup interval on component unmount
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isActive, timeLeft]);

  // Format time as MM:SS
  const formatTime = (time: number): string => { // Explicitly define 'time' as a number
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`; 
  };

  return (
    <div>
      {/* Main heading */}
      <h1 className="text-4xl font-bold text-center mt-0" style={{ color: "#ffd60a", textShadow: "2px 2px #003566", backgroundColor: "#000814" }}>
        Day 01 challenge Countdown Timer App
      </h1>
     {/* Author heading */}
      <h2 className="text-3xl font-semibold text-center mt-0" style={{ color: "#ffc300", backgroundColor: "#000814" }}>
        Author: Mudasser Haryani
      </h2>
      {/* Countdown timer content */}
      <div className="flex flex-col items-center justify-start min-h-screen pt-8" style={{ backgroundColor: "#000814" }}> {/* Updated background */}
        <div className="shadow-2xl rounded-2xl p-8 w-full max-w-md" style={{ backgroundColor: "#001d3d" }}> {/* Updated card background */}
          <h1 className="text-3xl font-extrabold mb-6 text-center" style={{ color: "#ffd60a" }}>Countdown Timer</h1> {/* Title color updated */}

          <div className="mb-4">
            <input
              className="w-full border border-[#ffd60a] p-3 rounded-lg bg-[#003566] text-[#ffd60a] placeholder-[#ffd60a] focus:outline-none focus:ring-2 focus:ring-[#ffc300]" 
              type="number"
              value={duration}
              onChange={handleDurationChange}
              placeholder="Set Duration (seconds)"
            />
          </div>

          <div className="flex justify-between mb-6">
            <button
              onClick={handleSetDuration}
              className="py-3 px-4 w-32 rounded-lg transition transform hover:scale-105 hover:bg-[#ffc300] hover:text-[#000814]"
              style={{ backgroundColor: "#ffd60a", color: "#000814" }} 
            >
              Set Duration
            </button>
            <button
              onClick={handleStart}
              className="py-3 px-4 w-32 rounded-lg transition transform hover:scale-105 hover:bg-[#ffc300] hover:text-[#000814]"
              style={{ backgroundColor: "#ffd60a", color: "#000814" }}
            >
              Start
            </button>
          </div>

          <div className="flex justify-between mb-6">
            <button
              onClick={handlePause}
              className="py-3 px-4 w-32 rounded-lg transition transform hover:scale-105 hover:bg-[#ffc300] hover:text-[#000814]"
              style={{ backgroundColor: "#ffd60a", color: "#000814" }}
            >
              Pause
            </button>
            <button
              onClick={handleReset}
              className="py-3 px-4 w-32 rounded-lg transition transform hover:scale-105 hover:bg-[#ffc300] hover:text-[#000814]"
              style={{ backgroundColor: "#ffd60a", color: "#000814" }}
            >
              Reset
            </button>
          </div>

          <div className="text-center">
            <p className="text-4xl font-bold" style={{ color: "#ffd60a" }}>{`Time Left: ${formatTime(timeLeft)}`}</p> {/* Time left color updated */}
          </div>

          {hasEnded && <p className="text-red-500 text-center font-bold">Times up</p>}
        </div>
      </div>

     
    </div>
  );
}

export default CountdownTimer;
