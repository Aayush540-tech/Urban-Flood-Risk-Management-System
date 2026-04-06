import React, { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import BasicPredictionForm from '../components/forms/BasicPredictionForm';
import AdvancedPredictionForm from '../components/forms/AdvancedPredictionForm';
import RiskGaugeChart from '../components/charts/RiskGaugeChart';
import LiveRiskMap from '../components/map/LiveRiskMap';
import BatchUploadModal from '../components/modals/BatchUploadModal';
import { api } from '../services/api';
import { Upload } from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('basic');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [isBatchModalOpen, setIsBatchModalOpen] = useState(false);

  const handleBasicSubmit = async (data) => {
    setIsLoading(true);
    setResult(null); 
    try {
      const res = await api.predictBasic(data);
      setResult(res);
    } catch (error) {
      console.error("Prediction Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdvancedSubmit = async (data) => {
    setIsLoading(true);
    setResult(null); 
    try {
      const res = await api.predictAdvanced(data);
      setResult(res);
    } catch (error) {
      console.error("Prediction Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div className="flex space-x-1 bg-climate-card p-1 rounded-lg border border-climate-border shadow-sm">
          <button
            onClick={() => setActiveTab('basic')}
            className={`px-5 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === 'basic' 
                ? 'bg-climate-primary text-white shadow' 
                : 'text-climate-muted hover:text-climate-text hover:bg-climate-dark/50'
            }`}
          >
            Basic Mode
          </button>
          <button
            onClick={() => setActiveTab('advanced')}
            className={`px-5 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === 'advanced' 
                ? 'bg-climate-accent text-climate-dark shadow' 
                : 'text-climate-muted hover:text-climate-text hover:bg-climate-dark/50'
            }`}
          >
            Advanced Mode
          </button>
          <button
            onClick={() => setActiveTab('map')}
            className={`px-5 py-2 rounded-md text-sm font-medium transition-all flex items-center space-x-2 ${
              activeTab === 'map' 
                ? 'bg-red-500/20 text-red-400 border border-red-500/50 shadow' 
                : 'text-climate-muted hover:text-climate-text hover:bg-climate-dark/50 border border-transparent'
            }`}
          >
            <span className="relative flex h-2 w-2 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            Live Map
          </button>
        </div>

        <button 
          onClick={() => setIsBatchModalOpen(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-climate-card hover:bg-climate-border text-climate-text border border-climate-border rounded-lg transition-colors text-sm font-medium shadow-sm">
          <Upload className="w-4 h-4 text-climate-primary" />
          <span>Batch Upload CSV</span>
        </button>
      </div>

      {activeTab === 'map' ? (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 w-full">
          <LiveRiskMap />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          <div className="h-full">
            {activeTab === 'basic' && (
              <BasicPredictionForm onSubmit={handleBasicSubmit} isLoading={isLoading} />
            )}
            {activeTab === 'advanced' && (
              <AdvancedPredictionForm onSubmit={handleAdvancedSubmit} isLoading={isLoading} />
            )}
          </div>

          <div className="h-full">
            <RiskGaugeChart result={result} />
          </div>
        </div>
      )}

      {/* Batch Upload Modal */}
      <BatchUploadModal 
        isOpen={isBatchModalOpen} 
        onClose={() => setIsBatchModalOpen(false)} 
      />
    </DashboardLayout>
  );
};

export default Dashboard;
