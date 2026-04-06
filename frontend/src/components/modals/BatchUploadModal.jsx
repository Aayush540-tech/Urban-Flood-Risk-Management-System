// src/components/modals/BatchUploadModal.jsx
import React, { useState, useCallback } from 'react';
import { UploadCloud, FileSpreadsheet, X, CheckCircle2, Loader2 } from 'lucide-react';
import { Card } from '../ui/Card';

const BatchUploadModal = ({ isOpen, onClose }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('idle'); // idle, processing, success, error

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (selectedFile) => {
    if (selectedFile.type !== 'text/csv' && !selectedFile.name.endsWith('.csv')) {
      alert("Please upload a valid CSV file");
      return;
    }
    
    setFile(selectedFile);
    setStatus('processing');
    
    // Simulate backend processing
    setTimeout(() => {
      setStatus('success');
    }, 2500);
  };

  const resetState = () => {
    setFile(null);
    setStatus('idle');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-climate-dark/80 backdrop-blur-sm shadow-2xl">
      <Card className="w-full max-w-lg shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center p-6 border-b border-climate-border bg-climate-card">
          <h2 className="text-xl font-semibold text-climate-text">Batch Upload CSV</h2>
          <button onClick={resetState} className="text-climate-muted hover:text-climate-text transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-8 bg-climate-dark/30">
          {status === 'idle' && (
            <div 
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-xl p-12 text-center transition-all ${
                isDragging 
                  ? 'border-climate-primary bg-climate-primary/10 scale-[1.02]' 
                  : 'border-climate-border hover:border-climate-primary/50 hover:bg-climate-card/50'
              }`}
            >
              <input 
                type="file" 
                accept=".csv"
                onChange={handleFileInput}
                className="hidden" 
                id="file-upload" 
              />
              <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
                <UploadCloud className={`w-16 h-16 mb-4 ${isDragging ? 'text-climate-primary' : 'text-climate-muted'}`} />
                <p className="text-lg font-medium text-climate-text mb-2">
                  Drag and drop your CSV here
                </p>
                <p className="text-sm text-climate-muted mb-6">
                  Ensure headers match the Advanced Mode features (20 columns)
                </p>
                <span className="bg-climate-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-climate-primaryHover transition-colors border border-climate-primaryHover shadow-sm">
                  Browse Files
                </span>
              </label>
            </div>
          )}

          {status === 'processing' && (
            <div className="flex flex-col items-center justify-center py-12 animate-in fade-in zoom-in-95">
              <Loader2 className="w-16 h-16 text-climate-primary animate-spin mb-6" />
              <h3 className="text-xl font-medium text-climate-text mb-2">Processing Batch Data...</h3>
              <p className="text-climate-muted text-sm flex items-center">
                <FileSpreadsheet className="w-4 h-4 mr-2" />
                {file?.name}
              </p>
            </div>
          )}

          {status === 'success' && (
            <div className="flex flex-col items-center justify-center py-12 animate-in slide-in-from-bottom-4 zoom-in-95">
              <CheckCircle2 className="w-16 h-16 text-green-500 mb-6 drop-shadow-md" />
              <h3 className="text-xl font-semibold text-green-400 mb-2">Batch Processed Successfully</h3>
              <p className="text-climate-muted text-sm text-center mb-6 max-w-sm">
                Processed 1,240 rows from {file?.name}. Insights and risk parameters have been updated across your datasets.
              </p>
              <button 
                onClick={resetState}
                className="bg-climate-card border border-climate-border text-climate-text px-8 py-2 rounded-lg font-medium hover:bg-climate-border transition-colors shadow-sm"
              >
                Close & Return
              </button>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default BatchUploadModal;
