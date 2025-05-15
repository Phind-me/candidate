import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 animate-fade-in">
      <div className="text-9xl font-bold text-blue-500 mb-4">404</div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Page Not Found</h1>
      <p className="text-gray-600 mb-8 text-center">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <div className="flex space-x-4">
        <Link to="/" className="btn btn-primary flex items-center">
          <Home size={18} className="mr-2" />
          Go Home
        </Link>
        <button 
          onClick={() => window.history.back()} 
          className="btn btn-outline flex items-center"
        >
          <ArrowLeft size={18} className="mr-2" />
          Go Back
        </button>
      </div>
    </div>
  );
};

export default NotFound;