import React from 'react';
import { Menu, User, Bell } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';
import { Link } from 'react-router-dom';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const { user } = useUser();
  
  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-10">
      <div className="px-4 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="mr-4 md:mr-6 p-1 rounded-md text-gray-500 hover:bg-gray-100 focus:outline-none"
            aria-label="Toggle sidebar"
          >
            <Menu size={24} />
          </button>
          <Link to="/" className="flex items-center">
            <span className="text-xl font-semibold text-amber-700">Phindme</span>
            <span className="ml-1 text-xl font-semibold text-gray-800">Candidates</span>
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="p-1 rounded-full text-gray-500 hover:bg-gray-100 focus:outline-none relative">
            <Bell size={20} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <Link to="/profile" className="flex items-center">
            <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
              <img 
                src={user?.profilePicture || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600'} 
                alt={user?.name || 'User'} 
                className="w-full h-full object-cover"
              />
            </div>
            <span className="hidden md:block text-sm font-medium text-gray-700">{user?.name}</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;