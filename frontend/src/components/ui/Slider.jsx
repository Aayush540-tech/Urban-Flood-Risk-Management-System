// src/components/ui/Slider.jsx
import React from 'react';

const Slider = ({ label, value, onChange, min = 1, max = 10, description }) => {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="flex flex-col space-y-2 w-full group">
      <div className="flex justify-between items-center">
        <label className="text-[13px] font-semibold text-slate-300 tracking-wide uppercase group-hover:text-climate-accent transition-colors duration-300">{label}</label>
        <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-climate-accent/10 border border-climate-accent/30 text-climate-accent shadow-[0_0_10px_rgba(6,182,212,0.2)]">
          {value} / {max}
        </span>
      </div>
      
      {description && <p className="text-xs text-climate-muted">{description}</p>}
      
      <div className="relative pt-2 pb-2">
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="w-full h-2.5 appearance-none rounded-full outline-none bg-black/50 cursor-pointer shadow-inner border border-white/5 transition-all duration-300 hover:border-white/20"
          style={{
             backgroundImage: `linear-gradient(to right, #06b6d4 ${percentage}%, transparent ${percentage}%)`
          }}
        />
      </div>
    </div>
  );
};

export default Slider;
