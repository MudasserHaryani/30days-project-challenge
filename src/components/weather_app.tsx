"use client";
import { useState, FormEvent } from "react"; // Fixed imports
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CloudIcon, MapPinIcon, ThermometerIcon } from "lucide-react";

interface WeatherData {
    temperature: number;
    description: string;
    location: string;
    unit: string;
}

export default function WeatherWidget() {
    const [location, setLocation] = useState<string>("");
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Fixed typo

        const trimmedLocation = location.trim();
        if (trimmedLocation === "") {
            setError("Please enter a valid location.");
            setWeather(null);
            return;
        }
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(
                `https://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${trimmedLocation}`
            );
            if (!response.ok) {
                throw new Error("City not found.");
            }
            const data = await response.json();
            const weatherData: WeatherData = {
                temperature: data.current.temp_c,
                description: data.current.condition.text, // Fixed to correct field
                location: data.location.name,
                unit: "C"
            };
            setWeather(weatherData);
        } catch (error) {
            setError("City not found! Please try again.");
            setWeather(null);
        } finally {
            setIsLoading(false);
        }
    };

    function getTemperatureMessage(temperature: number, unit: string): string {
        if (unit === "C") {
            if (temperature < 0) {
                return `It's freezing at ${temperature}°C! Bundle up!`;
            } else if (temperature < 10) {
                return `It's quite cold at ${temperature}°C, Wear warm clothes.`;
            } else if (temperature < 20) {
                return `The temperature is ${temperature}°C, Comfortable for light clothes.`;
            } else if (temperature < 30) {
                return `It's a pleasant ${temperature}°C, Enjoy the nice weather!`;
            } else {
                return `It's hot at ${temperature}°C, Stay hydrated!`;
            }
        } else {
            return `${temperature}°${unit}`;
        }
    }

    function getWeatherMessage(description: string): string {
        switch (description.toLowerCase()) {
            case "sunny":
                return "It's a beautiful sunny day!";
            case "partly cloudy":
                return "It's a pleasant partly cloudy day.";
            case "overcast":
                return "It's a bit cloudy today, but it's still beautiful.";
            case "rain":
                return "It's raining today, take your umbrella!";
            case "snow":
                return "It's snowing today, don't forget your coat!";
            default:
                return description;
        }
    }

    function getLocationMessage(location: string): string {
        const currentHour = new Date().getHours();
        const isNight = currentHour >= 18 || currentHour <= 6;
        return `${location} ${isNight ? "at Night" : "During the Day"}`;
    }

    return (
        <div>
             {/* Main heading */}
      <h1 className="text-4xl font-bold text-center mt-0" style={{ color: "#ffd60a", textShadow: "2px 2px #003566", backgroundColor: "#000814" }}>
        Day 02 challenge Weather App
      </h1>
     {/* Author heading */}
      <h2 className="text-3xl font-semibold text-center mt-0" style={{ color: "#ffc300", backgroundColor: "#000814" }}>
        Author: Mudasser Haryani
      </h2>
        <div className="flex justify-center items-start pt-20 h-screen bg-gradient-to-br from-[#000814] to-[#001d3d]">
            <Card className="w-full max-w-md mx-auto text-center bg-[#003566] text-[#e0e1dd] shadow-lg">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold">Weather App</CardTitle>
                    <CardDescription className="text-[#ffc300]">
                        Get weather information for any city.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSearch} className="flex items-center gap-2">
                        <input
                            type="text"
                            className="p-2 rounded-md w-full bg-[#04052e] text-[#e0e1dd] border border-[#ffc300] focus:ring-2 focus:ring-[#ffd60a] outline-none"
                            placeholder="Enter a city name"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="p-2 bg-[#ffd60a] text-[#060706] rounded-md hover:bg-[#003566] transition-all duration-300"
                        >
                            {isLoading ? "Loading..." : "Search"}
                        </Button>
                    </form>
                    {error && <div className="mt-4 text-red-500">{error}</div>}
                    {weather && (
                        <div className="mt-4 grid gap-4 text-[#e0e1dd]">
                            <div className="flex items-center gap-2">
                                <ThermometerIcon className="w-6 h-6 text-[#ffd60a]" />
                                {getTemperatureMessage(weather.temperature, weather.unit)}
                            </div>
                            <div className="flex items-center gap-2">
                                <CloudIcon className="w-6 h-6 text-[#ffd60a]" />
                                {getWeatherMessage(weather.description)}
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPinIcon className="w-6 h-6 text-[#ffd60a]" />
                                {getLocationMessage(weather.location)}
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
        </div>
    );
}
