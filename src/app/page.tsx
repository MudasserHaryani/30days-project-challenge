"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
    const [greeting, setGreeting] = useState("");
    const [selectedProject, setSelectedProject] = useState(""); // For dropdown selection

    // Function to dynamically set a greeting based on the time of day
    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) {
            setGreeting("Good Morning!");
        } else if (hour < 18) {
            setGreeting("Good Afternoon!");
        } else {
            setGreeting("Good Evening!");
        }
    }, []);

    // Function to render dropdown options for Day 01 to Day 30
    const renderOptions = () => {
        const options = [];
        for (let i = 1; i <= 30; i++) {
            const day = i < 10 ? `0${i}` : i; // Formats the day as "01", "02", ..., "30"
            options.push(
                <option key={i} value={`/day${day}`}>
                    Day {day}
                </option>
            );
        }
        return options;
    };

    const handleSelectChange = (e) => {
        const selectedValue = e.target.value;
        setSelectedProject(selectedValue);
    };

    const handleNavigate = () => {
        if (selectedProject) {
            window.location.href = selectedProject; // Navigate to the selected project page
        }
    };

    return (
        <div
            className="flex flex-col justify-center items-center h-screen text-center"
            style={{
                background: "linear-gradient(135deg, #000814, #001d3d)",
                color: "#ffc300",
            }}
        >
            {/* Intro Card */}
            <div className="max-w-2xl p-6 rounded-lg shadow-lg" style={{ backgroundColor: "#003566" }}>
                <h1 className="text-4xl font-bold mb-2" style={{ color: "#ffd60a" }}>
                    {greeting}
                </h1>
                <h1 className="text-4xl font-bold mb-2" style={{ color: "#ffd60a" }}>
                    I am Mudasser Haryani
                </h1>
                <p className="text-lg mb-4" style={{ color: "#ffd60a" }}>
                    GIAIC Student, Roll No. 0476210
                </p>
                <p className="text-md mb-6" style={{ color: "#ffd60a" }}>
                    Welcome to my 30 Days of Code Challenge Website! Explore my projects below.
                </p>

                {/* Dropdown for 30 Days Projects */}
                <div className="mb-6">
                    <select
                        onChange={handleSelectChange}
                        value={selectedProject}
                        className="p-3 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-yellow-400 outline-none"
                    >
                        <option value="" disabled>
                            Select a Project Day
                        </option>
                        {renderOptions()}
                    </select>
                </div>

                {/* Navigate Button */}
                <Button
                    onClick={handleNavigate}
                    className="p-3 bg-yellow-500 text-black rounded-md hover:bg-yellow-600 transition-all duration-300"
                    disabled={!selectedProject}
                >
                    Go to Selected Project
                </Button>
            </div>
        </div>
    );
}
