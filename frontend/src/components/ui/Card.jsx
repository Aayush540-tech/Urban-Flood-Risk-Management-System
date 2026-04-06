// src/components/ui/Card.jsx
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const Card = ({ className, children }) => (
  <div className={cn("bg-climate-card border border-climate-border rounded-xl shadow-lg overflow-hidden", className)}>
    {children}
  </div>
);

export const CardHeader = ({ className, children }) => (
  <div className={cn("px-6 py-4 border-b border-climate-border", className)}>
    {children}
  </div>
);

export const CardTitle = ({ className, children }) => (
  <h3 className={cn("text-lg font-semibold text-climate-text", className)}>
    {children}
  </h3>
);

export const CardContent = ({ className, children }) => (
  <div className={cn("p-6", className)}>
    {children}
  </div>
);
