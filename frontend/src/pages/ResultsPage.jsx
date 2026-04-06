// src/pages/ResultsPage.jsx
import React from 'react';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import RiskGaugeChart from '../components/charts/RiskGaugeChart';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';

const categoryMapping = {
  Climate: ['monsoonIntensity', 'climateChange', 'coastalVulnerability', 'landslides'],
  Ecology: ['topographyDrainage', 'riverManagement', 'deforestation', 'siltation', 'wetlandLoss', 'watershedManagement'],
  Infrastructure: ['urbanization', 'damsQuality', 'drainageSystems', 'deterioratingInfrastructure', 'inadequatePlanning'],
  Society: ['agriculturalPractices', 'encroachments', 'populationScore', 'ineffectiveDisasterPrep', 'politicalFactors']
};

const formatKeyName = (key) => {
  return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
};

const ResultsPage = ({ result, formData, onBack }) => {
  if (!result || !formData) return null;

  const isAdvanced = Object.keys(formData).length > 5;

  const barData = Object.entries(formData)
    .map(([key, value]) => ({
      name: formatKeyName(key),
      value: value,
      color: value > 7 ? '#f43f5e' : value > 5 ? '#facc15' : '#10b981'
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  let radarData = [];
  if (isAdvanced) {
    Object.entries(categoryMapping).forEach(([category, keys]) => {
      let sum = 0;
      let count = 0;
      keys.forEach(k => {
        if (formData[k] !== undefined) {
          sum += formData[k];
          count++;
        }
      });
      radarData.push({
        subject: category,
        A: count > 0 ? (sum / count).toFixed(1) : 0,
        fullMark: 10,
      });
    });
  } else {
    radarData = [
      { subject: 'Topography', A: formData.topography || 0, fullMark: 10 },
      { subject: 'Dams Quality', A: formData.dams || 0, fullMark: 10 },
      { subject: 'Population', A: formData.population || 0, fullMark: 10 },
      { subject: 'Climate Baseline', A: 5, fullMark: 10 },
    ];
  }

  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-8 duration-700 pb-12">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <button 
          onClick={onBack}
          className="flex items-center space-x-2 text-climate-accent hover:text-white bg-climate-dark/60 px-5 py-3 rounded-full border border-climate-accent/30 hover:border-climate-accent hover:bg-climate-accent/20 transition-all shadow-[0_0_15px_rgba(6,182,212,0.15)] group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-bold tracking-wider uppercase text-xs">Return to Configuration</span>
        </button>
        <div className="flex items-center space-x-2 bg-red-500/10 px-6 py-2.5 rounded-full border border-red-500/30">
          <AlertTriangle className="w-4 h-4 text-red-500 animate-pulse" />
          <span className="text-red-400 font-bold text-xs uppercase tracking-[0.2em]">Deep Analytics Computed</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        <div className="flex flex-col space-y-8">
          <div className="h-[430px]">
            <RiskGaugeChart result={result} />
          </div>

          <Card className="flex-1 bg-gradient-to-br from-climate-dark to-black/80 border border-climate-primary/20 hover:border-climate-primary/40">
            <CardHeader className="pb-2">
              <CardTitle className="text-climate-primary text-xs uppercase tracking-[0.3em] font-black flex items-center">
                <span className="w-2 h-2 rounded-full bg-climate-primary mr-3 animate-pulse"></span>
                AI Synthetic Diagnosis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-climate-text/90 leading-loose font-mono text-sm bg-black/50 p-6 rounded-xl border border-white/5 shadow-inner">
                <span className="text-climate-muted text-xs">&gt; INITIALIZING PREDICTION MATRIX...</span><br/>
                <span className="text-climate-muted text-xs">&gt; EVALUATING {Object.keys(formData).length} VECTORS...</span><br/>
                <span className="text-emerald-400 text-xs">&gt; SUCCESS</span><br/><br/>
                <p className="border-l-2 border-climate-accent pl-4 py-2 bg-gradient-to-r from-climate-accent/10 to-transparent">
                  {result.insights}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col space-y-8">
          <Card className="h-[400px]">
            <CardHeader className="pb-0">
              <CardTitle className="text-sm text-climate-text font-semibold uppercase tracking-wider">Macro Vulnerability Array</CardTitle>
            </CardHeader>
            <CardContent className="h-[330px] flex justify-center items-center">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData} outerRadius="75%" cx="50%" cy="50%">
                  <PolarGrid stroke="rgba(255,255,255,0.15)" strokeDasharray="3 3" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 'bold' }} />
                  <PolarRadiusAxis angle={30} domain={[0, 10]} tick={false} axisLine={false} />
                  <Radar name="Risk Concentration" dataKey="A" stroke="#06b6d4" strokeWidth={3} fill="url(#colorUv)" fillOpacity={0.6} />
                  <defs>
                    <radialGradient id="colorUv" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                      <stop offset="0%" stopColor="#0ea5e9" stopOpacity={0.8}/>
                      <stop offset="100%" stopColor="#06b6d4" stopOpacity={0.2}/>
                    </radialGradient>
                  </defs>
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', borderColor: '#06b6d4', borderRadius: '12px', backdropFilter: 'blur(10px)' }}
                    itemStyle={{ color: '#06b6d4', fontWeight: 'bold' }}
                    labelStyle={{ color: '#f8fafc', marginBottom: '8px' }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="h-[400px] border-red-500/20 hover:border-red-500/40">
             <CardHeader className="pb-0">
              <CardTitle className="text-sm text-red-500 font-bold uppercase tracking-wider flex items-center">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Critical Threat Vectors (Top 5)
              </CardTitle>
            </CardHeader>
             <CardContent className="h-[320px] pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData} layout="vertical" margin={{ top: 0, right: 30, left: 10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={true} vertical={false} />
                    <XAxis type="number" domain={[0, 10]} tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} />
                    <YAxis dataKey="name" type="category" width={140} tick={{ fill: '#e2e8f0', fontSize: 11, fontWeight: 500 }} axisLine={false} tickLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', borderColor: '#f43f5e', borderRadius: '12px' }} 
                      cursor={{ fill: 'rgba(255,255,255,0.05)' }} 
                      itemStyle={{ color: '#f8fafc', fontWeight: 'bold' }}
                    />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={24}>
                      {barData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
             </CardContent>
          </Card>
        </div>
      </div>

      {result.matplotlib_charts && result.matplotlib_charts.length > 0 && (
        <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
          <div className="flex items-center space-x-3 mb-6">
            <h3 className="text-lg font-black tracking-widest uppercase text-climate-text">Deep Analytics: Core Math</h3>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-climate-border to-transparent"></div>
          </div>
          
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {result.matplotlib_charts.map((imgBase64, index) => (
              <Card key={`mpl-${index}`} className="overflow-hidden border-climate-border hover:border-climate-primary/50 transition-colors group">
                <CardHeader className="bg-black/40 border-b border-climate-border pb-3">
                  <CardTitle className="text-xs text-climate-muted font-bold uppercase tracking-widest flex items-center justify-between">
                    <span>Python Generated Matrix</span>
                    <span className="bg-climate-primary/20 text-climate-primary px-2 py-0.5 rounded text-[10px]">MATPLOTLIB</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0 relative flex justify-center bg-[#030712]">
                  <img 
                    src={imgBase64} 
                    alt={`Matplotlib generated chart ${index + 1}`} 
                    className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                  />
                  <div className="absolute inset-0 border-[2px] border-transparent group-hover:border-climate-primary/20 pointer-events-none transition-colors"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultsPage;
