'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// Import the FinlandMap component with no SSR
const FinlandMap = dynamic(() => import('../components/FinlandMap'), {
  ssr: false,
});

const cityMatches = [
  { name: 'Oulu', score: 85 },
  { name: 'Tampere', score: 75 },
  { name: 'Rovaniemi', score: 70 },
  { name: 'Kuopio', score: 68 },
  { name: 'Ivalo', score: 62 },
];

export default function Results() {
  return (
    <div className="min-h-screen bg-[#121212] text-[#D6DFEA] p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-black">Top matches</h1>
          <button 
            className="text-[#7B7B7B] text-2xl font-medium hover:text-[#D6DFEA] transition-colors"
            onClick={() => window.location.reload()}
          >
            Bad results? Try again
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FinlandMap cityMatches={cityMatches} />

          <div className="space-y-4">
            {cityMatches.map((city) => (
              <div 
                key={city.name}
                className="bg-gradient-to-r from-[#1E1E1E] to-[#3A3A3A] rounded-2xl p-6 flex justify-between items-center"
              >
                <div>
                  <h2 className="text-2xl font-bold">{city.name}</h2>
                  <p className="text-xl text-[#C5BFBF]">{city.score}% match</p>
                </div>
                <Link
                  href={`/${city.name.toLowerCase()}`}
                  className="px-6 py-2 bg-[#3A3A3A] rounded-lg hover:bg-[#4A4A4A] transition-colors"
                >
                  Visit
                </Link>
              </div>
            ))}
          </div>
        </div>

        <footer className="mt-12 flex justify-between items-center">
          <Link href="/about" className="text-2xl font-bold hover:text-white transition-colors">
            About
          </Link>
          <Link href="/privacy" className="text-2xl font-bold hover:text-white transition-colors">
            Privacy policy
          </Link>
        </footer>
      </div>
    </div>
  );
} 