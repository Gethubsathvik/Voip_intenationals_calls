// components/DialPad.tsx
'use client';

import React, { useState } from 'react';
import { Phone, Delete } from 'lucide-react';
import { Button } from './Button';
import { Input } from './Input';

interface DialPadProps {
  onCall: (number: string) => void;
  isLoading?: boolean;
}

export const DialPad: React.FC<DialPadProps> = ({ onCall, isLoading }) => {
  const [number, setNumber] = useState('');

  const dialpadButtons = [
    '1', '2', '3',
    '4', '5', '6',
    '7', '8', '9',
    '*', '0', '#',
  ];

  const handlePress = (digit: string) => {
    setNumber(prev => prev + digit);
  };

  const handleBackspace = () => {
    setNumber(prev => prev.slice(0, -1));
  };

  const handleCall = () => {
    if (number.trim()) {
      onCall(number);
    }
  };

  return (
    <div className="space-y-4">
      <Input
        value={number}
        readOnly
        placeholder="Enter phone number"
        className="text-center text-xl font-semibold"
      />

      <div className="grid grid-cols-3 gap-3">
        {dialpadButtons.map((digit) => (
          <button
            key={digit}
            onClick={() => handlePress(digit)}
            disabled={isLoading}
            className="h-12 rounded-lg bg-gray-800 border border-gray-700 text-white font-semibold hover:bg-gray-700 transition-colors disabled:opacity-50"
          >
            {digit}
          </button>
        ))}
      </div>

      <div className="flex gap-3">
        <Button
          onClick={handleBackspace}
          variant="secondary"
          size="md"
          className="flex-1"
          disabled={isLoading}
        >
          <Delete className="w-5 h-5" />
        </Button>

        <Button
          onClick={handleCall}
          variant="primary"
          size="md"
          className="flex-1"
          isLoading={isLoading}
          disabled={!number.trim()}
        >
          <Phone className="w-5 h-5 mr-2" />
          Call
        </Button>
      </div>
    </div>
  );
};
