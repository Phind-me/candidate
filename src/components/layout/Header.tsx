import React, { useEffect, useRef } from 'react';
import { Menu, User, Bell, X, Check } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';
import { useMessages } from '../../contexts/MessagesContext';
import { Link, useNavigate } from 'react-router-dom';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const { user } = useUser();
  const { messages, unreadCount, isOpen, setIsOpen, markAsRead, markAllAsRead } = useMessages();
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, setIsOpen]);
  
  const handleMessageClick = (link: string | undefined, id: string) => {
    markAsRead(id);
    setIsOpen(false);
    if (link) {
      navigate(link);
    }
  };
  
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
            <span className="ml-1 text-xl font-semibold text-gray-800">Job Seeker</span>
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative" ref={dropdownRef}>
            <button 
              className="p-1 rounded-full text-gray-500 hover:bg-gray-100 focus:outline-none relative"
              onClick={() => setIsOpen(!isOpen)}
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
            
            {/* Messages Popup */}
            {isOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="p-4 border-b flex justify-between items-center">
                  <h3 className="font-semibold text-gray-900">Notifications</h3>
                  {unreadCount > 0 && (
                    <button 
                      onClick={markAllAsRead}
                      className="text-sm text-amber-600 hover:text-amber-700"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {messages.length > 0 ? (
                    messages.map(message => (
                      <div
                        key={message.id}
                        onClick={() => handleMessageClick(message.link, message.id)}
                        className={`p-4 border-b cursor-pointer transition-colors duration-150 ${
                          message.read ? 'bg-white' : 'bg-amber-50'
                        } hover:bg-amber-100`}
                      >
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-medium text-gray-900">{message.title}</h4>
                          {!message.read && (
                            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{message.content}</p>
                        <div className="text-xs text-gray-500">
                          {new Date(message.date).toLocaleString()}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-500">
                      No notifications
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          
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