import React, { useState } from 'react';
import { Search, Filter, Calendar, List, ChevronDown, Clock } from 'lucide-react';
import { mockApplications, mockRecruiters } from '../data/mockData';
import { Application, ApplicationStatus } from '../types';
import ApplicationStatusBadge from '../components/applications/ApplicationStatusBadge';
import ApplicationDetail from '../components/applications/ApplicationDetail';

const Applications: React.FC = () => {
  const [view, setView] = useState<'list' | 'calendar'>('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | 'All'>('All');
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  
  // Filter applications based on search term and status filter
  const filteredApplications = mockApplications.filter(app => {
    const matchesSearch = 
      app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || app.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Job Applications</h1>
        <p className="text-gray-600">Track and manage your active applications</p>
      </div>
      
      {/* Controls */}
      <div className="flex flex-col md:flex-row justify-between mb-6 space-y-4 md:space-y-0">
        <div className="flex w-full md:w-auto">
          {/* Search */}
          <div className="relative flex-grow md:w-64">
            <input
              type="text"
              placeholder="Search applications..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute left-3 top-2.5 text-gray-400">
              <Search size={18} />
            </div>
          </div>
          
          {/* Status Filter */}
          <div className="relative ml-2">
            <select
              className="appearance-none pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as ApplicationStatus | 'All')}
            >
              <option value="All">All Statuses</option>
              <option value="Applied">Applied</option>
              <option value="Screening">Screening</option>
              <option value="Interview">Interview</option>
              <option value="Technical">Technical</option>
              <option value="Offer">Offer</option>
              <option value="Accepted">Accepted</option>
              <option value="Rejected">Rejected</option>
            </select>
            <div className="absolute left-3 top-2.5 text-gray-400">
              <Filter size={18} />
            </div>
            <div className="absolute right-3 top-2.5 text-gray-400 pointer-events-none">
              <ChevronDown size={18} />
            </div>
          </div>
        </div>
        
        {/* View Toggle */}
        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
          <button
            className={`px-4 py-2 flex items-center ${view === 'list' ? 'bg-blue-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
            onClick={() => setView('list')}
          >
            <List size={18} className="mr-1" />
            <span>List</span>
          </button>
          <button
            className={`px-4 py-2 flex items-center ${view === 'calendar' ? 'bg-blue-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
            onClick={() => setView('calendar')}
          >
            <Calendar size={18} className="mr-1" />
            <span>Calendar</span>
          </button>
        </div>
      </div>
      
      {view === 'list' ? (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {filteredApplications.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recruiter</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredApplications.map(application => (
                    <ApplicationRow 
                      key={application.id} 
                      application={application} 
                      onClick={() => setSelectedApplication(application)}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8">
              <Clock className="mx-auto text-gray-400" size={32} />
              <p className="mt-2 text-gray-500">No applications found</p>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-center text-gray-500">Calendar view coming soon</p>
        </div>
      )}
      
      {/* Application Detail Modal */}
      {selectedApplication && (
        <ApplicationDetail 
          application={selectedApplication} 
          onClose={() => setSelectedApplication(null)} 
        />
      )}
    </div>
  );
};

interface ApplicationRowProps {
  application: Application;
  onClick: () => void;
}

const ApplicationRow: React.FC<ApplicationRowProps> = ({ application, onClick }) => {
  const recruiter = mockRecruiters.find(r => r.id === application.recruiter);
  const lastUpdatedDate = new Date(application.lastUpdated);
  const formattedDate = lastUpdatedDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });
  
  return (
    <tr 
      className="hover:bg-blue-50 cursor-pointer transition-colors duration-150"
      onClick={onClick}
    >
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{application.jobTitle}</div>
        <div className="text-xs text-gray-500">{application.location}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{application.company}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
            <img 
              src={recruiter?.avatar || ''} 
              alt={recruiter?.name || 'Recruiter'} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-sm text-gray-900">{recruiter?.name}</div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <ApplicationStatusBadge status={application.status} />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{formattedDate}</div>
      </td>
    </tr>
  );
};

export default Applications;