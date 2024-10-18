"use client"; // Enables client-side rendering for this component

// Import necessary hooks from React
import { useState, useEffect } from "react";

// Import custom Button component from the UI directory
import { Button } from "@/components/ui/button";

// Define a TypeScript interface for the joke response
interface JokeResponse {
  setup: string;
  punchline: string;
}

// Default export of the RandomJokeComponent function
export default function RandomJokeComponent() {
  // State hook for managing the current joke
  const [joke, setJoke] = useState<string>("");

  // Effect hook to fetch a joke when the component mounts
  useEffect(() => {
    fetchJoke();
  }, []); // Empty dependency array ensures this runs once on mount

  // Async function to fetch a random joke from the API
  async function fetchJoke(): Promise<void> {
    try {
      // Make a GET request to the joke API
      const response = await fetch(
        "https://official-joke-api.appspot.com/random_joke"
      );
      const data: JokeResponse = await response.json();
      // Update state with the fetched joke
      setJoke(`${data.setup} - ${data.punchline}`);
    } catch (error) {
      console.error("Error fetching joke:", error); // Log any errors
      // Set an error message if the fetch fails
      setJoke("Failed to fetch joke. Please try again.");
    }
  }

  // JSX return statement rendering the random joke UI
  return (
    <div>
     {/* Main heading */}
     <h1 className="text-4xl font-bold text-center mt-0" style={{ color: "#ffd60a", textShadow: "2px 2px #003566", backgroundColor: "#000814" }}>
        Day 07 challenge Random Joke Generator 
      </h1>
     {/* Author heading */}
      <h2 className="text-3xl font-semibold text-center mt-0" style={{ color: "#ffc300", backgroundColor: "#000814" }}>
        Author: Mudasser Haryani
      </h2>
    <div
      className="flex flex-col items-center justify-items-start h-screen p-4"
      style={{ background: 'linear-gradient(135deg, #000814, #001d3d)' }}
    >
      {/* Center the joke card within the screen */}
      <div
        className="rounded-2xl shadow-lg p-8 w-full max-w-md"
        style={{ backgroundColor: '#003566' }}
      >
        {/* Header with title */}
        <h1
          className="text-3xl font-bold mb-4 text-center"
          style={{ color: '#ffd60a', textShadow: '2px 2px #003566' }}
        >
          😂 Random Joke 👈
        </h1>
        {/* Display the joke or a loading message */}
        <div
          className="rounded-lg p-6 mb-6 text-center"
          style={{ backgroundColor: '#000814', color: '#ffc300' }}
        >
          {joke || 'Loading...'}
        </div>
        {/* Button to fetch a new joke */}
        <div className="flex justify-center">
          <Button
            onClick={fetchJoke}
            className="font-bold py-2 px-4 rounded-full transition-colors duration-300"
            style={{ backgroundColor: '#ffd60a', color: '#003566' }}
          >
            Get New Joke 
          </Button>
        </div>
      </div>
    </div>
    </div>
  );
  
  
}