// src/components/map/LiveRiskMap.jsx
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';

// India Center Coordinates
const center = [20.5937, 78.9629];
const zoom = 5;

// Mock live hotspot data across India
const initialHotspots = [
  { id: 1, name: 'Mumbai, Maharashtra', location: [19.0760, 72.8777], riskLevel: 0.85 },
  { id: 2, name: 'Guwahati, Assam', location: [26.1158, 91.7086], riskLevel: 0.92 },
  { id: 3, name: 'Kochi, Kerala', location: [9.9312, 76.2673], riskLevel: 0.76 },
  { id: 4, name: 'Chennai, Tamil Nadu', location: [13.0827, 80.2707], riskLevel: 0.65 },
  { id: 5, name: 'Patna, Bihar', location: [25.5941, 85.1376], riskLevel: 0.88 },
  { id: 6, name: 'Ahmedabad, Gujarat', location: [23.0225, 72.5714], riskLevel: 0.45 },
  { id: 7, name: 'Hyderabad, Telangana', location: [17.3850, 78.4867], riskLevel: 0.35 },
  { id: 8, name: 'Srinagar, J&K', location: [34.0837, 74.7973], riskLevel: 0.81 },
];

const getSeverityDetails = (prob) => {
  if (prob > 0.7) return { label: 'High Risk', color: '#ef4444' }; // red-500
  if (prob > 0.3) return { label: 'Moderate Risk', color: '#eab308' }; // yellow-500
  return { label: 'Low Risk', color: '#22c55e' }; // green-500
};

const LiveRiskMap = () => {
  const [hotspots, setHotspots] = useState(initialHotspots);

  // Simulate live data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setHotspots(prev => prev.map(spot => {
        // Randomly adjust risk level by a small amount (+/- 0.05)
        let change = (Math.random() - 0.5) * 0.1;
        let newRisk = Math.max(0, Math.min(1, spot.riskLevel + change));
        return { ...spot, riskLevel: newRisk };
      }));
    }, 3000); // Updated every 3 seconds to feel 'live'

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="h-full bg-climate-card border-climate-border relative">
      <CardHeader>
        <CardTitle>Live Regional Risk Heatmap (India)</CardTitle>
      </CardHeader>
      <CardContent className="h-[600px] w-full p-2 relative z-0">
        <MapContainer 
          center={center} 
          zoom={zoom} 
          scrollWheelZoom={true} 
          className="h-full w-full rounded-lg shadow-inner z-0"
          style={{ background: '#0f172a' }} // climate-dark base
        >
          {/* Using CartoDB Dark style for a cool dashboard aesthetic */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />
          
          {hotspots.map((spot) => {
            const { color, label } = getSeverityDetails(spot.riskLevel);
            // Size circles based on severity as well
            const radius = Math.max(12, spot.riskLevel * 35);
            
            return (
              <CircleMarker
                key={spot.id}
                center={spot.location}
                pathOptions={{
                  color: color,
                  fillColor: color,
                  fillOpacity: 0.6,
                  weight: 2
                }}
                radius={radius}
              >
                <Popup className="bg-climate-card text-climate-text border-slate-700">
                  <div className="font-sans min-w-[150px]">
                    <strong className="block text-lg mb-2 text-climate-dark">{spot.name}</strong>
                    <div className="flex items-center space-x-2">
                       <span className="font-bold text-lg" style={{ color }}>{Math.round(spot.riskLevel * 100)}% Risk</span>
                       <span className={`px-2 py-0.5 text-xs font-semibold rounded-full border bg-slate-100/10 text-slate-700`}>
                         {label}
                       </span>
                    </div>
                  </div>
                </Popup>
              </CircleMarker>
            );
          })}
        </MapContainer>
        
        {/* Map Legend Overlay */}
        <div className="absolute bottom-6 right-6 z-[1000] bg-climate-dark/90 p-4 rounded-lg border border-climate-border backdrop-blur-md shadow-2xl">
           <h4 className="text-sm font-semibold mb-3 text-climate-text uppercase tracking-wider">Risk Zones</h4>
           <div className="space-y-3 text-sm text-climate-muted font-medium">
              <div className="flex items-center"><div className="w-4 h-4 rounded-full bg-[#ef4444] opacity-80 mr-3 border border-red-300"></div> High Risk (&gt;70%)</div>
              <div className="flex items-center"><div className="w-4 h-4 rounded-full bg-[#eab308] opacity-80 mr-3 border border-yellow-300"></div> Moderate (30-70%)</div>
              <div className="flex items-center"><div className="w-4 h-4 rounded-full bg-[#22c55e] opacity-80 mr-3 border border-green-300"></div> Low Risk (&lt;30%)</div>
           </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LiveRiskMap;
