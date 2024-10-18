// Day 5 30 days challenge 

'use client'  // Enable client-side rendering for this component

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function CalculatorComponent() {
  const [input, setInput] = useState<string>(''); // To handle input display
  const [result, setResult] = useState<string>(''); // To handle result display

  // Update input as user clicks buttons
  const handleButtonClick = (value: string) => {
    setInput((prev) => prev + value);
  };

  // Calculate the result when "=" is pressed
  const calculate = () => {
    try {
      const calculation = eval(input); // Warning: eval is not recommended for production, but OK for simple calculator.
      setResult(calculation.toString());
    } catch (error) {
      setResult("Error");
    }
  };

  // Clear the input and result
  const clearInput = () => {
    setInput('');
    setResult('');
  };

  return (
    <div>
    {/* Main heading */}
    <h1 className="text-4xl font-bold text-center mt-0" style={{ color: "#ffd60a", textShadow: "2px 2px #003566", backgroundColor: "#000814" }}>
       Day 05 Challenge Calculator  
     </h1>
    {/* Author heading */}
     <h2 className="text-3xl font-semibold text-center mt-0" style={{ color: "#ffc300", backgroundColor: "#000814" }}>
       Author: Mudasser Haryani
     </h2>
   
    <div
      className="flex items-center justify-center min-h-screen"
      style={{ background: 'linear-gradient(135deg, #000814, #001d3d)', color: '#ffc300' }}
    >
      <Card className="w-full max-w-sm p-6 rounded-lg shadow-lg" style={{ backgroundColor: '#003566' }}>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center" style={{ color: '#ffd60a' }}>
            CALCULATOR
            <br />
            <span className="text-xl font-semibold">Created by Mudasser Haryani</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Input field to display the calculation */}
          <Input
            className="text-right text-2xl p-4 mb-4 rounded-lg"
            value={result ? result : input}
            readOnly
            style={{ backgroundColor: '#001d3d', color: '#ffc300' }}
          />

          {/* Number and operation buttons */}
          <div className="grid grid-cols-4 gap-2">
            {/* Numbers 1-9 */}
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <Button
                key={num}
                onClick={() => handleButtonClick(num.toString())}
                className="text-xl font-bold p-4 rounded-full shadow-lg"
                style={{ backgroundColor: '#ffd60a', color: '#003566' }} // Button color
              >
                {num}
              </Button>
            ))}

            {/* Special buttons: 0, ., +, -, *, /, = */}
            <Button
              onClick={() => handleButtonClick('0')}
              className="text-xl font-bold p-4 rounded-full shadow-lg col-span-2"
              style={{ backgroundColor: '#ffd60a', color: '#003566' }} // Button color
            >
              0
            </Button>
            <Button
              onClick={() => handleButtonClick('.')}
              className="text-xl font-bold p-4 rounded-full shadow-lg"
              style={{ backgroundColor: '#ffd60a', color: '#003566' }} // Button color
            >
              .
            </Button>
            <Button
              onClick={() => handleButtonClick('+')}
              className="text-xl font-bold p-4 rounded-full shadow-lg"
              style={{ backgroundColor: '#ffd60a', color: '#003566' }} // Button color
            >
              +
            </Button>
            <Button
              onClick={() => handleButtonClick('-')}
              className="text-xl font-bold p-4 rounded-full shadow-lg"
              style={{ backgroundColor: '#ffd60a', color: '#003566' }} // Button color
            >
              -
            </Button>
            <Button
              onClick={() => handleButtonClick('*')}
              className="text-xl font-bold p-4 rounded-full shadow-lg"
              style={{ backgroundColor: '#ffd60a', color: '#003566' }} // Button color
            >
              *
            </Button>
            <Button
              onClick={() => handleButtonClick('/')}
              className="text-xl font-bold p-4 rounded-full shadow-lg"
              style={{ backgroundColor: '#ffd60a', color: '#003566' }} // Button color
            >
              /
            </Button>

            <Button
              onClick={calculate}
              className="text-xl font-bold p-4 rounded-full shadow-lg col-span-2"
              style={{ backgroundColor: '#ffd60a', color: '#003566' }} // Button color
            >
              =
            </Button>

            {/* Clear button */}
            <Button
              onClick={clearInput}
              className="text-xl font-bold p-4 rounded-full shadow-lg col-span-2"
              style={{ backgroundColor: '#ffd60a', color: '#003566' }} // Button color
            >
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
    </div>
  );
}
