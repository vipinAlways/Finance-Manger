import React from "react";

interface CircularProgressProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
}
const CircularProgress: React.FC<CircularProgressProps>  = ({ percentage, size = 100, strokeWidth = 8, color = "blue" }) => {
  const radius = (size - strokeWidth) / 2; // Adjust radius based on stroke width
  const circumference = 2 * Math.PI * radius; // Full circumference of the circle
  const offset = circumference * (1 - percentage / 100); // Calculate stroke offset

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Background Circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#ddd"
        strokeWidth={strokeWidth}
      />
      {/* Progress Circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 0.5s ease-in-out" }}
      />
    </svg>
  );
};

export default CircularProgress;
