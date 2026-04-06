import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import Slider from '../ui/Slider';
import { Loader2 } from 'lucide-react';

const BasicPredictionForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    topography: 5,
    dams: 5,
    population: 5,
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Basic Mode - Quick Prediction</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <p className="text-sm text-climate-muted mb-4">
            Adjust the top 3 environmental factors to quickly gauge flood probability.
          </p>
          
          <Slider 
            label="Topography Drainage" 
            value={formData.topography} 
            onChange={(val) => handleChange('topography', val)} 
          />
          
          <Slider 
            label="Dams Quality" 
            value={formData.dams} 
            onChange={(val) => handleChange('dams', val)} 
          />
          
          <Slider 
            label="Population Score" 
            value={formData.population} 
            onChange={(val) => handleChange('population', val)} 
          />
          
          <div className="pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-climate-primary to-climate-accent hover:from-climate-accent hover:to-blue-500 text-white font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center h-14 uppercase tracking-wider text-sm border border-white/10"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin mr-3 h-5 w-5" />
                  Analyzing Details...
                </>
              ) : (
                'Predict Flood Risk'
              )}
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default BasicPredictionForm;
