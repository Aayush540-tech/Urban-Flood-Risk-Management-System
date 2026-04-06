// src/components/ui/Card.jsx
import React from 'react';
import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const Card = ({ className, children, ...props }) => {
  return (
    <div
      className={cn(
        "bg-climate-card backdrop-blur-3xl text-climate-text rounded-3xl border border-climate-border shadow-[0_8px_30px_rgb(0,0,0,0.4)] overflow-hidden transition-all duration-500 hover:shadow-[0_8px_40px_rgba(6,182,212,0.15)] hover:border-white/20 relative group",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export const CardHeader = ({ className, children, ...props }) => {
  return (
    <div
      className={cn("px-8 py-6 border-b border-white/5 bg-white/5 flex flex-col space-y-1.5", className)}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardTitle = ({ className, children, ...props }) => {
  return (
    <h3
      className={cn("text-2xl font-bold tracking-tight text-white drop-shadow-sm flex items-center", className)}
      {...props}
    >
      {children}
    </h3>
  );
};

export const CardContent = ({ className, children, ...props }) => {
  return (
    <div className={cn("p-8", className)} {...props}>
      {children}
    </div>
  );
};
