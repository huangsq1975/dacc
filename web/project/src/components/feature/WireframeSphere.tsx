import React from 'react';

interface WireframeSphereProps {
  size?: number;
  className?: string;
}

/**
 * Animated wireframe sphere for use in the language switcher.
 * Uses SVG with a rotating meridian to simulate a 3D globe.
 * Color inherits from `currentColor`.
 */
export const WireframeSphere: React.FC<WireframeSphereProps> = ({ size = 16, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 18 18"
    fill="none"
    className={className}
    aria-hidden="true"
  >
    {/* Outer circle */}
    <circle cx="9" cy="9" r="7.8" stroke="currentColor" strokeWidth="0.9" />
    {/* Equator */}
    <ellipse cx="9" cy="9" rx="7.8" ry="2.6" stroke="currentColor" strokeWidth="0.7" opacity="0.6" />
    {/* Upper tropic */}
    <ellipse cx="9" cy="5.8" rx="6" ry="1.6" stroke="currentColor" strokeWidth="0.55" opacity="0.35" />
    {/* Lower tropic */}
    <ellipse cx="9" cy="12.2" rx="6" ry="1.6" stroke="currentColor" strokeWidth="0.55" opacity="0.35" />
    {/* Animated meridian — rotates to give 3D globe feel */}
    <ellipse
      cx="9" cy="9" rx="2.8" ry="7.8"
      stroke="currentColor" strokeWidth="0.7" opacity="0.65"
      className="wf-sphere-meridian"
    />
  </svg>
);
