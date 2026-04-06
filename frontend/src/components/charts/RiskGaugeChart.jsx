import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';

const getSeverityDetails = (prob) => {
  if (prob > 0.7) return { label: 'CRITICAL RISK', color: '#f43f5e' }; // vivid rose/red
  if (prob > 0.3) return { label: 'MODERATE RISK', color: '#facc15' }; // glowing yellow
  return { label: 'LOW RISK', color: '#10b981' }; // neon emerald
};

const RiskGaugeChart = ({ result }) => {
  if (!result) {
    return (
      <Card className="h-full flex flex-col">
        <CardHeader>
          <CardTitle>Prediction Results</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center flex-1 min-h-[300px]">
          <div className="text-climate-muted flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-climate-border border-t-climate-primary rounded-full animate-spin mb-4 opacity-30"></div>
            <p>Awaiting prediction data...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const { probability, insights } = result;
  const percent = Math.round(probability * 100);
  const { label, color } = getSeverityDetails(probability);

  const data = [
    { name: 'Risk', value: percent, color: color },
    { name: 'Remaining', value: 100 - percent, color: '#334155' } 
  ];

  return (
    <Card className="h-full flex flex-col justify-center items-center shadow-none bg-transparent overflow-visible">
      <CardHeader className="pb-0 pt-2 border-none">
        <CardTitle className="text-xs text-climate-muted uppercase tracking-[0.2em] font-semibold text-center mb-0">Predicted Risk Profile</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center flex-1 justify-center w-full p-0 relative">
        <div className="relative w-full h-[250px] flex justify-center -mt-6">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <defs>
                <filter id="gaugeGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>
              <Pie
                data={data}
                cx="50%"
                cy="100%"
                startAngle={180}
                endAngle={0}
                innerRadius={130}
                outerRadius={160}
                paddingAngle={0}
                dataKey="value"
                stroke="rgba(0,0,0,0.5)"
                strokeWidth={2}
                cornerRadius={5}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color} 
                    style={{ filter: index === 0 ? 'url(#gaugeGlow)' : 'none' }} 
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          
          <div className="absolute bottom-0 flex flex-col items-center pb-2">
            <span className="text-6xl font-black mb-0 tracking-tighter" style={{ color, textShadow: `0 0 20px ${color}80` }}>
              {percent}%
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-climate-text bg-black/60 px-4 py-1.5 rounded-full border shadow-sm" style={{ borderColor: color }}>
              {label}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskGaugeChart;
