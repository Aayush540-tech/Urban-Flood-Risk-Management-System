import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';

const getSeverityDetails = (prob) => {
  if (prob > 0.7) return { label: 'High Risk', color: '#ef4444' }; // red-500
  if (prob > 0.3) return { label: 'Moderate Risk', color: '#eab308' }; // yellow-500
  return { label: 'Low Risk', color: '#22c55e' }; // green-500
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
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Prediction Results</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center flex-1 justify-between">
        <div className="relative w-full h-[220px] mt-4 flex justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="100%"
                startAngle={180}
                endAngle={0}
                innerRadius={110}
                outerRadius={150}
                paddingAngle={0}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          
          <div className="absolute bottom-0 flex flex-col items-center pb-2">
            <span className="text-5xl font-bold mb-1" style={{ color }}>
              {percent}%
            </span>
            <span className="text-sm font-semibold uppercase tracking-wider text-climate-text bg-climate-dark/80 px-3 py-1 rounded-full border border-climate-border shadow-sm">
              {label}
            </span>
          </div>
        </div>

        <div className="mt-8 bg-climate-dark/50 p-4 rounded-lg border border-climate-border w-full flex-1">
          <h4 className="text-sm font-medium text-climate-primary mb-2 uppercase tracking-wide">
            Detailed Insights
          </h4>
          <p className="text-sm text-climate-muted leading-relaxed">
            {insights}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskGaugeChart;
