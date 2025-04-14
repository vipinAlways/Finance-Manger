import React from "react";

interface CircularProgressProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
}
const CircularProgress: React.FC<CircularProgressProps> = ({
  percentage,
  size = 400,
  strokeWidth = 32,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - percentage / 100);

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#ecf0f1"
        strokeWidth={strokeWidth}
        opacity="0.5"
      />

      <defs>
        <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#4ade80" />
          <stop offset="100%" stopColor="#16a34a" />
        </linearGradient>
      </defs>

      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#2ecc71"
        strokeWidth={strokeWidth / 1.1}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{
          transition:
            "stroke-dashoffset 0.6s ease-in-out, stroke 0.3s ease-in-out",
        }}
      />
    </svg>
  );
};

export default CircularProgress;
