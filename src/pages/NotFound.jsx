import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import Button from '../components/ui/Button';

const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center p-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="relative mb-8">
        <h1 className="text-[150px] font-black text-slate-100 leading-none select-none">404</h1>
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-2xl font-bold text-slate-800">Page Not Found</p>
        </div>
      </div>
      
      <p className="text-slate-500 max-w-md mb-10 leading-relaxed">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link to="/">
          <Button className="w-full sm:w-auto h-11">
            <Home className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </Link>
        <Button variant="secondary" className="h-11" onClick={() => window.history.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Previous Page
        </Button>
      </div>

      <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-8 opacity-20 select-none grayscale">
         <div className="w-12 h-12 bg-slate-400 rounded-lg"></div>
         <div className="w-12 h-12 bg-slate-400 rounded-full"></div>
         <div className="w-12 h-12 bg-slate-400 rounded-xl"></div>
         <div className="w-12 h-12 bg-slate-400 rounded-md"></div>
      </div>
    </div>
  );
};

export default NotFound;
