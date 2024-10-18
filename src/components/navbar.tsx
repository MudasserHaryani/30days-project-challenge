'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  // Function to close the dropdown
  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest('.dropdown')) {
        closeDropdown();
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('click', handleOutsideClick);
    } else {
      document.removeEventListener('click', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isDropdownOpen]);

  // Function to generate links from Day 1 to Day 30
  const dayLinks = Array.from({ length: 30 }, (_, i) => (
    <Link
      key={i}
      href={`/day${(i + 1).toString().padStart(2, '0')}`}
      className="block px-4 py-2 text-sm hover:bg-[#003566] text-[#ffd60a]"
      onClick={closeDropdown}
    >
      {`Day ${i + 1} Project`}
    </Link>
  ));

  return (
    <nav className="bg-[#000814] text-white"> {/* Background updated to new dark gradient base */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-[#ffd60a]">30 Days Code Challenge</h1> {/* Main title in highlight color */}
            </div>
            <div className="ml-10 flex items-baseline space-x-4">
              <a href="/" className="hover:bg-[#003566] px-3 py-2 rounded-md text-sm font-medium text-[#ffd60a]"> {/* Hover effect with lighter background */}
                Home
              </a>
              <a href="/about" className="hover:bg-[#003566] px-3 py-2 rounded-md text-sm font-medium text-[#ffd60a]">
                About
              </a>
              <div className="relative dropdown">
                <button
                  onClick={toggleDropdown}
                  className="hover:bg-[#003566] px-3 py-2 rounded-md text-sm font-medium text-[#ffd60a]"
                >
                  30 Days Code
                </button>
                {isDropdownOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-48 bg-[#001d3d] text-white shadow-lg rounded-md py-1 z-50"
                    style={{ maxHeight: '200px', overflowY: 'auto' }}  // Set max height and enable scrolling
                  >
                    {dayLinks} {/* Render day links dynamically */}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
