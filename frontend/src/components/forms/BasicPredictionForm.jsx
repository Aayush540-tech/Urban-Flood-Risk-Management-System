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
              className="w-full bg-climate-primary hover:bg-climate-primaryHover text-white font-medium py-3 rounded-lg shadow-lg shadow-climate-primary/20 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center h-12"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-5 w-5" />
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
