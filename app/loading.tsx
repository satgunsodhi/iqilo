import React from 'react';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/40 backdrop-blur-[2px] transition-opacity">
      <div className="h-24 w-24">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="-16 -16 160 160" width="100%" height="100%">
          <defs>
            <linearGradient id="visorGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
            <radialGradient id="energyGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
            </radialGradient>
          </defs>

          <style dangerouslySetInnerHTML={{ __html: `
            .pet-body { fill: none; stroke: #0f172a; stroke-width: 8; }
            @media (prefers-color-scheme: dark) { .pet-body { stroke: #f8fafc; } }
            .float { animation: hover 4s ease-in-out infinite; }
            @keyframes hover {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-6px); }
            }
          `}} />

          <circle className="pet-body" cx="64" cy="80" r="21" />
          <ellipse cx="64" cy="46" rx="20" ry="6" fill="url(#energyGlow)" />
          
          <g className="float">
            <path d="M 28,28 Q 64,40 100,28 Q 64,16 28,28" fill="none" stroke="#06b6d4" strokeWidth="2" opacity="0.6" />
            <g>
              <path d="M 42,30 C 42,16 50,10 64,10 C 64,18 61,25 53,30 Z" fill="#1e40af" />
              <path d="M 53,30 C 61,25 64,18 64,10 C 64,18 67,25 75,30 Z" fill="#38bdf8" />
              <path d="M 75,30 C 67,25 64,18 64,10 C 78,10 86,16 86,30 Z" fill="#2563eb" />
              <polygon points="64,6 67,9 64,12 61,9" fill="#22d3ee" />
            </g>
            <path d="M 36,30 Q 64,38 92,30 Q 64,28 36,30 Z" fill="url(#visorGradient)" />
          </g>
        </svg>
      </div>
    </div>
  );
}
