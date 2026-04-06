// src/components/layout/DashboardLayout.jsx
import React from 'react';
import Header from './Header';

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-climate-dark text-climate-text relative overflow-x-hidden font-sans">
      {/* Abstract Glowing Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-600/20 rounded-full mix-blend-screen filter blur-[120px] animate-blob pointer-events-none"></div>
      <div className="absolute top-[20%] right-[-5%] w-[400px] h-[400px] bg-blue-600/10 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000 pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-teal-600/10 rounded-full mix-blend-screen filter blur-[140px] animate-blob animation-delay-4000 pointer-events-none"></div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <div className="pt-8 px-6 sticky top-0 z-50 drop-shadow-2xl">
          <Header />
        </div>
        <main className="flex-1 max-w-[1400px] w-full mx-auto p-6 md:p-8 mt-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
