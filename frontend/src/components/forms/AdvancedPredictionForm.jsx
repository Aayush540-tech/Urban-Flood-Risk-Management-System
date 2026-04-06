// src/components/forms/AdvancedPredictionForm.jsx
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import Slider from '../ui/Slider';
import { Loader2 } from 'lucide-react';

const sliderGroups = [
  {
    title: 'Climate & Natural Factors',
    fields: [
      { id: 'monsoonIntensity', label: 'Monsoon Intensity' },
      { id: 'climateChange', label: 'Climate Change Impact' },
      { id: 'coastalVulnerability', label: 'Coastal Vulnerability' },
      { id: 'landslides', label: 'Landslide Probability' },
    ]
  },
  {
    title: 'Ecology & Terrain',
    fields: [
      { id: 'topographyDrainage', label: 'Topography / Drainage' },
      { id: 'riverManagement', label: 'River Management' },
      { id: 'deforestation', label: 'Deforestation Rate' },
      { id: 'siltation', label: 'Siltation' },
      { id: 'wetlandLoss', label: 'Wetland Loss' },
      { id: 'watershedManagement', label: 'Watershed Management' },
    ]
  },
  {
    title: 'Urban Infrastructure',
    fields: [
      { id: 'urbanization', label: 'Urbanization Level' },
      { id: 'damsQuality', label: 'Dams Quality' },
      { id: 'drainageSystems', label: 'Drainage Systems' },
      { id: 'deterioratingInfrastructure', label: 'Aging Infrastructure' },
      { id: 'inadequatePlanning', label: 'Inadequate Planning' },
    ]
  },
  {
    title: 'Human & Socio-Economic',
    fields: [
      { id: 'agriculturalPractices', label: 'Agricultural Practices' },
      { id: 'encroachments', label: 'Encroachments' },
      { id: 'populationScore', label: 'Population Density' },
      { id: 'ineffectiveDisasterPrep', label: 'Ineffective Disaster Prep' },
      { id: 'politicalFactors', label: 'Political Factors' },
    ]
  }
];

const AdvancedPredictionForm = ({ onSubmit, isLoading }) => {
  // Initialize all 20 fields to 5
  const initialData = {};
  sliderGroups.forEach(group => {
    group.fields.forEach(field => {
      initialData[field.id] = 5;
    });
  });

  const [formData, setFormData] = useState(initialData);

  const handleChange = (fieldId, value) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card className="h-[730px] flex flex-col border-climate-border bg-climate-card overflow-hidden">
      <CardHeader className="flex-shrink-0 z-10 shadow-sm border-b border-climate-border">
        <CardTitle>Advanced Mode - All 20 Factors</CardTitle>
        <p className="text-sm text-climate-muted mt-1">
          Adjust comprehensive environmental and socioeconomic features for deep analysis.
        </p>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-y-auto px-6 py-4">
        <form onSubmit={handleSubmit} className="space-y-8 pb-8 relative">
          
          {sliderGroups.map((group, groupIdx) => (
            <div key={groupIdx} className="space-y-4">
              <h3 className="text-sm font-semibold text-climate-primary uppercase tracking-wider mb-2">
                {group.title}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 bg-climate-dark/30 p-4 rounded-xl border border-climate-border/50">
                {group.fields.map(field => (
                  <Slider 
                    key={field.id}
                    label={field.label} 
                    value={formData[field.id]} 
                    onChange={(val) => handleChange(field.id, val)} 
                  />
                ))}
              </div>
            </div>
          ))}

          <div className="pt-4 sticky bottom-0 z-10 w-full mt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-climate-accent hover:bg-teal-400 text-climate-dark font-bold py-3 rounded-lg shadow-xl shadow-climate-accent/10 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center h-12 relative"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-5 w-5" />
                  Running Deep Analysis...
                </>
              ) : (
                'Generate Advanced Prediction'
              )}
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AdvancedPredictionForm;
