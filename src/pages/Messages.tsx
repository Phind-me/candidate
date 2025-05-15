import React, { useState } from 'react';
import { useMessages } from '../contexts/MessagesContext';
import { Message } from '../types';
import { Mail, Search, Inbox, Star, AlertCircle, Info, CheckCircle, X } from 'lucide-react';

const Messages: React.FC = () => {
  const { messages, markAsRead, deleteMessage } = useMessages();
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMessages = messages.filter(msg =>
    msg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    msg.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleMessageClick = (message: Message) => {
    setSelectedMessage(message);
    if (!message.read) {
      markAsRead(message.id);
    }
  };

  const getMessageIcon = (type: Message['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle size={16} className="text-green-600" />;
      case 'warning':
        return <AlertCircle size={16} className="text-yellow-600" />;
      case 'error':
        return <AlertCircle size={16} className="text-red-600" />;
      default:
        return <Info size={16} className="text-amber-600" />;
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Messages</h1>
        <p className="text-gray-600">View and manage your notifications</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="flex h-[calc(100vh-12rem)]">
          {/* Messages List */}
          <div className="w-full md:w-1/2 lg:w-2/5 border-r">
            {/* Search */}
            <div className="p-4 border-b">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search messages..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="absolute left-3 top-2.5 text-gray-400">
                  <Search size={18} />
                </div>
              </div>
            </div>

            {/* Messages List */}
            <div className="overflow-y-auto h-[calc(100%-4rem)]">
              {filteredMessages.length > 0 ? (
                filteredMessages.map(message => (
                  <div
                    key={message.id}
                    onClick={() => handleMessageClick(message)}
                    className={`p-4 border-b cursor-pointer transition-colors duration-150 ${
                      selectedMessage?.id === message.id ? 'bg-amber-50' :
                      message.read ? 'bg-white' : 'bg-amber-50'
                    } hover:bg-amber-100`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-1">{getMessageIcon(message.type)}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className={`font-medium ${message.read ? 'text-gray-900' : 'text-gray-900 font-semibold'}`}>
                            {message.title}
                          </h4>
                          <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                            {new Date(message.date).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-2">{message.content}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <Mail size={48} className="text-gray-400 mb-2" />
                  <p>No messages found</p>
                </div>
              )}
            </div>
          </div>

          {/* Message Detail */}
          <div className="hidden md:block w-1/2 lg:w-3/5 bg-gray-50">
            {selectedMessage ? (
              <div className="h-full flex flex-col">
                <div className="p-6 bg-white border-b">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      {getMessageIcon(selectedMessage.type)}
                      <h2 className="text-xl font-semibold text-gray-900">{selectedMessage.title}</h2>
                    </div>
                    <button
                      onClick={() => deleteMessage(selectedMessage.id)}
                      className="text-gray-500 hover:text-red-600 transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>
                  <div className="text-sm text-gray-500 mt-2">
                    {new Date(selectedMessage.date).toLocaleString()}
                  </div>
                </div>
                <div className="p-6 flex-1">
                  <p className="text-gray-700 whitespace-pre-line">{selectedMessage.content}</p>
                  {selectedMessage.link && (
                    <a
                      href={selectedMessage.link}
                      className="mt-4 inline-flex items-center text-amber-600 hover:text-amber-700"
                    >
                      View details →
                    </a>
                  )}
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-gray-500">
                <Inbox size={48} className="text-gray-400 mb-2" />
                <p>Select a message to read</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;