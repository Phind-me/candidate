import React from 'react';
import { NavLink } from 'react-router-dom';
import { X, Home, User, Briefcase, Users, Settings, Mail } from 'lucide-react';
import { useMessages } from '../../contexts/MessagesContext';

interface SidebarProps {
  isOpen: boolean;
  closeSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, closeSidebar }) => {
  const { unreadCount } = useMessages();

  return (
    <>
      {/* Mobile overlay - only shown on small screens */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-800 bg-opacity-50 z-20 md:hidden"
          onClick={closeSidebar}
        ></div>
      )}
      
      {/* Sidebar */}
      <aside 
        className={`fixed md:fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-white shadow-lg z-20 transition-transform duration-300 
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="p-4 md:hidden">
          <button
            onClick={closeSidebar}
            className="p-2 rounded-md text-gray-500 hover:bg-gray-100 focus:outline-none"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>
        
        <nav className="mt-4">
          <ul>
            <SidebarLink to="/" icon={<Home size={20} />} label="Dashboard" />
            <SidebarLink to="/profile" icon={<User size={20} />} label="My Profile" />
            <SidebarLink to="/applications" icon={<Briefcase size={20} />} label="Applications" />
            <SidebarLink to="/recruiters" icon={<Users size={20} />} label="Recruiters" />
            <SidebarLink 
              to="/messages" 
              icon={<Mail size={20} />} 
              label="Messages" 
              badge={unreadCount > 0 ? unreadCount : undefined}
            />
            <li className="mt-8">
              <SidebarLink to="/settings" icon={<Settings size={20} />} label="Settings" />
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
};

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  badge?: number;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ to, icon, label, badge }) => {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) => `
          flex items-center px-4 py-3 text-gray-700 hover:bg-amber-50 hover:text-amber-700 transition-colors duration-200
          ${isActive ? 'bg-amber-50 text-amber-700 border-r-4 border-amber-700' : ''}
        `}
      >
        <span className="mr-3">{icon}</span>
        <span>{label}</span>
        {badge !== undefined && (
          <span className="ml-auto bg-red-500 text-white text-xs font-medium px-2 py-0.5 rounded-full">
            {badge}
          </span>
        )}
      </NavLink>
    </li>
  );
};

export default Sidebar;