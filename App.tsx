import React from 'react';
import { QuoteOfTheDay } from './components/QuoteOfTheDay';
export function App() {
  return <div className="min-h-screen w-full bg-gradient-to-br from-indigo-50 to-blue-100 flex flex-col items-center justify-center p-4">
      <QuoteOfTheDay />
    </div>;
}