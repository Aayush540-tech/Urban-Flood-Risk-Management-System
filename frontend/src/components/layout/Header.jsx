import { Droplets } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-climate-card border-b border-climate-border py-4 px-6 fixed top-0 w-full z-10 shadow-sm">
      <div className="flex items-center space-x-3 w-full max-w-7xl mx-auto">
        <div className="bg-climate-primary/20 p-2 rounded-lg">
          <Droplets className="text-climate-primary w-6 h-6" />
        </div>
        <h1 className="text-xl font-semibold text-climate-text tracking-wide">
          Flood Risk Dashboard
        </h1>
      </div>
    </header>
  );
};

export default Header;
