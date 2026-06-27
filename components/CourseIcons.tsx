import React from "react";

export function GraphDpSVG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Faint DP Grid */}
      <path d="M50 0V200M150 0V200M250 0V200M350 0V200M0 50H400M0 150H400" stroke="var(--border-subtle)" strokeWidth="1" strokeDasharray="4 6" />
      {/* Graph Connections */}
      <path d="M120 70 L200 40 L280 80 L200 150 L120 70 Z M200 40 L200 150 M120 70 L280 80" stroke="currentColor" strokeWidth="1.5" />
      {/* Glowing Nodes */}
      <circle cx="200" cy="40" r="6" fill="var(--bg-surface)" stroke="currentColor" strokeWidth="2" />
      <circle cx="120" cy="70" r="6" fill="var(--bg-surface)" stroke="currentColor" strokeWidth="2" />
      <circle cx="280" cy="80" r="6" fill="var(--bg-surface)" stroke="currentColor" strokeWidth="2" />
      <circle cx="200" cy="150" r="6" fill="var(--bg-surface)" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function AdvancedTreeSVG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Background Math Coordinates */}
      <path d="M200 10V190 M10 100H390" stroke="var(--border-subtle)" strokeWidth="0.75" strokeDasharray="2 4" />
      {/* Tree Edges */}
      <path d="M200 30 L100 80 M200 30 L300 80 M100 80 L60 140 M100 80 L140 140 M300 80 L260 140 M300 80 L340 140" stroke="var(--text-secondary)" strokeWidth="1.5" />
      {/* Highlighted active LCA Path */}
      <path d="M200 30 L300 80 L260 140" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      {/* Tree Nodes */}
      <circle cx="200" cy="30" r="7" fill="var(--bg-surface)" stroke="currentColor" strokeWidth="2" />
      <circle cx="100" cy="80" r="5" fill="var(--bg-surface)" stroke="var(--text-secondary)" strokeWidth="1.5" />
      <circle cx="300" cy="80" r="5" fill="var(--bg-surface)" stroke="currentColor" strokeWidth="2" />
      <circle cx="60" cy="140" r="4" fill="var(--bg-surface)" stroke="var(--text-secondary)" strokeWidth="1.5" />
      <circle cx="140" cy="140" r="4" fill="var(--bg-surface)" stroke="var(--text-secondary)" strokeWidth="1.5" />
      <circle cx="260" cy="140" r="4" fill="var(--bg-surface)" stroke="currentColor" strokeWidth="2" />
      <circle cx="340" cy="140" r="4" fill="var(--bg-surface)" stroke="var(--text-secondary)" strokeWidth="1.5" />
    </svg>
  );
}

export function DataWranglingSVG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Isometric Data Block */}
      <g opacity="0.6">
        <path d="M70 120 L130 90 L190 120 L130 150 Z" stroke="var(--text-secondary)" strokeWidth="1.5" />
        <path d="M70 100 L130 70 L190 100 L130 130 Z" stroke="var(--text-secondary)" strokeWidth="1.5" />
        <path d="M70 80 L130 50 L190 80 L130 110 Z" stroke="var(--text-secondary)" strokeWidth="1.5" />
        <path d="M70 120 V80 M130 150 V110 M190 120 V80" stroke="var(--text-secondary)" strokeWidth="1.5" />
      </g>
      {/* Clean Data Stream Pipelines */}
      <path d="M220 70 H350 M220 100 H350 M220 130 H350" stroke="var(--border-subtle)" strokeWidth="1.5" />
      {/* Processing Data Flow (Dotted Arrow) */}
      <path d="M190 100 Q220 100 250 85 T310 115 T350 80" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="1 4" />
      <circle cx="350" cy="80" r="4" fill="currentColor" />
    </svg>
  );
}

export function MachineLearningSVG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Regression Line */}
      <path d="M50 160 L350 50" stroke="var(--border-subtle)" strokeWidth="2" strokeDasharray="6 4" />
      {/* Classification Boundary Curve */}
      <path d="M100 200 Q 180 120 230 90 T 300 0" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      {/* Cluster A (Hollow Circles) */}
      <circle cx="80" cy="60" r="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="130" cy="40" r="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="160" cy="80" r="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="110" cy="100" r="4" stroke="currentColor" strokeWidth="1.5" />
      {/* Cluster B (Solid Circles) */}
      <circle cx="270" cy="140" r="4" fill="currentColor" />
      <circle cx="310" cy="110" r="4" fill="currentColor" />
      <circle cx="330" cy="160" r="4" fill="currentColor" />
      <circle cx="250" cy="170" r="4" fill="currentColor" />
    </svg>
  );
}

export function DerivativesRiskSVG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Volatility Surface Grid */}
      <path d="M50 150 Q120 90 200 130 T350 70" stroke="var(--border-subtle)" strokeWidth="1.5" />
      <path d="M50 170 Q120 110 200 150 T350 90" stroke="var(--border-subtle)" strokeWidth="1" />
      <path d="M50 130 Q120 70 200 110 T350 50" stroke="var(--border-subtle)" strokeWidth="1" />
      {/* Normal Distribution Curve (Bell Curve) */}
      <path d="M80 150 C 140 150, 160 30, 200 30 C 240 30, 260 150, 320 150" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      {/* Mean & Standard Deviation Slices */}
      <line x1="200" y1="30" x2="200" y2="150" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
      <line x1="165" y1="90" x2="235" y2="90" stroke="var(--text-secondary)" strokeWidth="1.5" />
      <circle cx="200" cy="90" r="3" fill="currentColor" />
    </svg>
  );
}

export function DeepLearningQuantSVG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Neural Network Layer Connections */}
      <path d="M60 60 L130 40 M60 60 L130 100 M60 60 L130 160 M60 100 L130 40 M60 100 L130 100 M60 100 L130 160 M60 140 L130 40 M60 140 L130 100 M60 140 L130 160" stroke="var(--border-subtle)" strokeWidth="1" />
      <path d="M130 40 L200 100 M130 100 L200 100 M130 160 L200 100" stroke="var(--text-secondary)" strokeWidth="1.5" />
      {/* Portfolio Efficient Frontier Curve */}
      <path d="M200 100 Q 250 80 350 40" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M200 100 Q 250 120 320 160" stroke="var(--border-subtle)" strokeWidth="1.5" strokeLinecap="round" />
      {/* Network Nodes */}
      <circle cx="60" cy="60" r="4" fill="var(--bg-surface)" stroke="var(--text-secondary)" strokeWidth="1.5" />
      <circle cx="60" cy="100" r="4" fill="var(--bg-surface)" stroke="var(--text-secondary)" strokeWidth="1.5" />
      <circle cx="60" cy="140" r="4" fill="var(--bg-surface)" stroke="var(--text-secondary)" strokeWidth="1.5" />
      
      <circle cx="130" cy="40" r="4" fill="var(--bg-surface)" stroke="var(--text-secondary)" strokeWidth="1.5" />
      <circle cx="130" cy="100" r="4" fill="var(--bg-surface)" stroke="var(--text-secondary)" strokeWidth="1.5" />
      <circle cx="130" cy="160" r="4" fill="var(--bg-surface)" stroke="var(--text-secondary)" strokeWidth="1.5" />
      
      <circle cx="200" cy="100" r="5" fill="var(--bg-surface)" stroke="currentColor" strokeWidth="2" />
      {/* Optimal Portfolio Asset Tangency Point */}
      <circle cx="280" cy="65" r="4.5" fill="currentColor" />
    </svg>
  );
}

export function IntroDSASVG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Faint Background Coordinates */}
      <path d="M0 100H400" stroke="var(--border-subtle)" strokeWidth="1" strokeDasharray="3 3" />
      {/* Sequenced Array Cells */}
      <rect x="50" y="75" width="50" height="50" rx="8" stroke="var(--text-secondary)" strokeWidth="1.5" fill="var(--bg-sunken)" />
      <rect x="120" y="75" width="50" height="50" rx="8" stroke="currentColor" strokeWidth="2" fill="var(--bg-surface)" />
      <rect x="190" y="75" width="50" height="50" rx="8" stroke="var(--text-secondary)" strokeWidth="1.5" fill="var(--bg-sunken)" />
      <rect x="260" y="75" width="50" height="50" rx="8" stroke="var(--text-secondary)" strokeWidth="1.5" fill="var(--bg-sunken)" />
      {/* Elements/Data inside cells */}
      <circle cx="75" cy="100" r="4" fill="var(--text-secondary)" />
      <line x1="135" y1="100" x2="155" y2="100" stroke="currentColor" strokeWidth="2" />
      <line x1="145" y1="90" x2="145" y2="110" stroke="currentColor" strokeWidth="2" />
      <circle cx="215" cy="100" r="4" fill="var(--text-secondary)" />
      <circle cx="285" cy="100" r="4" fill="var(--text-secondary)" />
      {/* Search Pointers (i and j) */}
      <path d="M145 50 V65 M145 65 L140 60 M145 65 L150 60" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <text x="142" y="42" fill="currentColor" className="text-[12px] font-black font-mono">i</text>
      <path d="M285 150 V135 M285 135 L280 140 M285 135 L290 140" stroke="var(--text-secondary)" strokeWidth="1.5" strokeLinecap="round" />
      <text x="282" y="165" fill="var(--text-secondary)" className="text-[12px] font-black font-mono">j</text>
    </svg>
  );
}

export function CourseIcon({ courseId, className }: { courseId: string; className?: string }) {
  switch (courseId) {
    case "intro-java-dsa-roadmap":
      return <IntroDSASVG className={className} />;
    case "competitive-programming-roadmap":
      return <GraphDpSVG className={className} />;
    case "advanced-bridge-roadmap":
      return <AdvancedTreeSVG className={className} />;
    case "python-for-quants-data-wrangling":
      return <DataWranglingSVG className={className} />;
    case "python-for-quants-predictive-modeling":
      return <MachineLearningSVG className={className} />;
    case "python-for-quants-derivatives-risk":
      return <DerivativesRiskSVG className={className} />;
    case "python-for-quants-deep-learning-portfolio":
      return <DeepLearningQuantSVG className={className} />;
    default:
      return (
        <svg viewBox="0 0 400 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="200" cy="100" r="20" stroke="currentColor" strokeWidth="2" />
        </svg>
      );
  }
}
