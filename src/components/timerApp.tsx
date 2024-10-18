"use client"; // Enables client-side rendering for this component

// Import necessary hooks from React
import { useState, useEffect, useMemo } from "react";

// Import custom UI components from the UI directory
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Default export of the TimerApp function
export default function TimerApp() {
  // State hooks for managing current time, time format (24-hour or 12-hour), and component mount status
  const [time, setTime] = useState<Date>(new Date());
  const [is24Hour, setIs24Hour] = useState<boolean>(true);
  const [mounted, setMounted] = useState<boolean>(false);

  // Effect hook to run on component mount
  useEffect(() => {
    setMounted(true); // Set mounted status to true
    const interval = setInterval(() => {
      setTime(new Date()); // Update the time every second
    }, 1000);
    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);

  // Memoized computation of formatted time to avoid unnecessary recalculations
  const formattedTime = useMemo<string>(() => {
    if (!mounted) return ""; // Don't render time on the server
    const hours = is24Hour
      ? time.getHours().toString().padStart(2, "0") // Format hours in 24-hour format
      : (time.getHours() % 12 || 12).toString().padStart(2, "0"); // Format hours in 12-hour format
    const minutes = time.getMinutes().toString().padStart(2, "0"); // Format minutes
    const seconds = time.getSeconds().toString().padStart(2, "0"); // Format seconds
    return `${hours}:${minutes}:${seconds}`; // Return formatted time string
  }, [time, is24Hour, mounted]); // Dependencies to re-run the memoized function

  // JSX return statement rendering the digital clock UI
  return (
   <div>
     {/* Main heading */}
     <h1 className="text-4xl font-bold text-center mt-0" style={{ color: "#ffd60a", textShadow: "2px 2px #003566", backgroundColor: "#000814" }}>
        Day 06 challenge Digital Clock 
      </h1>
     {/* Author heading */}
      <h2 className="text-3xl font-semibold text-center mt-0" style={{ color: "#ffc300", backgroundColor: "#000814" }}>
        Author: Mudasser Haryani
      </h2>
   
    <div
      className="flex items-start justify-center h-screen pt-10"
      style={{ background: 'linear-gradient(135deg, #000814, #001d3d)', color: '#ffc300' }}
    >
      {/* Center the digital clock within the screen */}
      <Card className="p-8 shadow-lg rounded-2xl" style={{ backgroundColor: '#003566' }}>
        <div className="flex flex-col items-center justify-center">
          {/* Header with title */}
          <div className="text-2xl font-bold tracking-tight" style={{ color: '#ffd60a' }}>
            Digital Clock
          </div>
          {/* Description */}
          <div className="text-sm text-gray-300 mb-4">
            Display current time in hours, minutes, and seconds.
          </div>
          {/* Display the formatted time */}
          <div className="text-6xl font-bold tracking-tight" style={{ color: '#ffc300' }}>
            {formattedTime}
          </div>
          {/* Buttons to switch between 24-hour and 12-hour formats */}
          <div className="mt-4 flex items-center">
            <Button
              variant={is24Hour ? "default" : "outline"}
              onClick={() => setIs24Hour(true)}
              className="mr-2 font-bold"
              style={{ backgroundColor: '#003566', color: '#ffd60a' }} // Button color for 24-hour
            >
              24-Hour Format
            </Button>
            <Button
              variant={!is24Hour ? "default" : "outline"}
              onClick={() => setIs24Hour(false)}
              className="mr-2 font-bold"
              style={{ backgroundColor: '#003566', color: '#ffd60a' }} // Button color for 12-hour
            >
              12-Hour Format
            </Button>
          </div>
        </div>
      </Card>
    </div>
    </div>
  );
}
