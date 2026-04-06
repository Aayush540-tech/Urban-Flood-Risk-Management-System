import Header from './Header';

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-climate-dark flex flex-col font-sans text-climate-text">
      <Header />
      <main className="flex-1 w-full max-w-7xl mx-auto pt-24 pb-12 px-6">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
