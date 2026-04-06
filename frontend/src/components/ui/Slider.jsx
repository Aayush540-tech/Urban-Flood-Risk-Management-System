import React from 'react';
import { cn } from './Card';

const Slider = ({ label, value, onChange, min = 1, max = 10, step = 1, className }) => {
  return (
    <div className={cn("w-full space-y-2", className)}>
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-climate-text">{label}</label>
        <span className="text-xs font-semibold px-2 py-1 bg-climate-dark rounded-md text-climate-primary border border-climate-border">
          {value} / {max}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-climate-dark border border-climate-border rounded-lg appearance-none cursor-pointer accent-climate-primary hover:accent-climate-primaryHover focus:outline-none focus:ring-2 focus:ring-climate-primary/50"
      />
      <div className="flex justify-between text-xs text-climate-muted px-1 mt-1">
        <span>Low Impact</span>
        <span>High Impact</span>
      </div>
    </div>
  );
};

export default Slider;
