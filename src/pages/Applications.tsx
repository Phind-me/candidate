import React, { useState } from 'react';
import { Search, Filter, Calendar, List, ChevronDown, Clock, Check } from 'lucide-react';
import { Application, ApplicationStatus } from '../types';
import ApplicationStatusBadge from '../components/applications/ApplicationStatusBadge';
import ApplicationDetail from '../components/applications/ApplicationDetail';
import { useApplications } from '../contexts/ApplicationsContext';
import { useRecruiters } from '../contexts/RecruitersContext';

const Applications: React.FC = () => {
  const { 
    filteredApplications,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    isLoading,
    error,
    activeApplication,
    setActiveApplicationId
  } = useApplications();
  
  const [view, setView] = useState<'list' | 'calendar'>('list');

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-700"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-600">Error: {error}</div>;
  }

  // Define the order of stages
  const stages: ApplicationStatus[] = ['Applied', 'Screening', 'Interview', 'Technical', 'Offer', 'Accepted'];
  
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
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
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
              className="appearance-none pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
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
            className={`px-4 py-2 flex items-center ${view === 'list' ? 'bg-amber-700 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
            onClick={() => setView('list')}
          >
            <List size={18} className="mr-1" />
            <span>List</span>
          </button>
          <button
            className={`px-4 py-2 flex items-center ${view === 'calendar' ? 'bg-amber-700 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
            onClick={() => setView('calendar')}
          >
            <Calendar size={18} className="mr-1" />
            <span>Calendar</span>
          </button>
        </div>
      </div>
      
      {view === 'list' ? (
        <div className="space-y-4">
          {filteredApplications.length > 0 ? (
            filteredApplications.map(application => (
              <ApplicationCard 
                key={application.id}
                application={application}
                stages={stages}
                onSelect={() => setActiveApplicationId(application.id)}
              />
            ))
          ) : (
            <div className="text-center py-8 bg-white rounded-xl shadow-sm">
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
      {activeApplication && (
        <ApplicationDetail 
          application={activeApplication} 
          onClose={() => setActiveApplicationId(null)} 
        />
      )}
    </div>
  );
};

interface ApplicationCardProps {
  application: Application;
  stages: ApplicationStatus[];
  onSelect: () => void;
}

const ApplicationCard: React.FC<ApplicationCardProps> = ({ application, stages, onSelect }) => {
  const { recruiters } = useRecruiters();
  const recruiter = recruiters.find(r => r.id === application.recruiter);

  return (
    <div 
      className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-200 cursor-pointer"
      onClick={onSelect}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-1">{application.jobTitle}</h3>
          <p className="text-gray-600">{application.company} • {application.location}</p>
        </div>
        <div className="mt-2 md:mt-0">
          <ApplicationStatusBadge status={application.status} showIcon={true} />
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative mb-4">
        <div className="h-2 bg-gray-200 rounded-full">
          <div 
            className="h-full bg-amber-600 rounded-full transition-all duration-500"
            style={{ 
              width: `${((stages.indexOf(application.status) + 1) / stages.length) * 100}%`,
              display: application.status === 'Rejected' ? 'none' : 'block'
            }}
          />
        </div>
        <div className="flex justify-between mt-2">
          {stages.map((stage, index) => {
            const isCompleted = stages.indexOf(application.status) >= index;
            const isCurrent = application.status === stage;
            
            return (
              <div 
                key={stage}
                className={`flex flex-col items-center relative ${index === 0 ? 'ml-0' : ''} ${
                  index === stages.length - 1 ? 'mr-0' : ''
                }`}
                style={{ width: '16.66%' }}
              >
                <div 
                  className={`w-4 h-4 rounded-full mb-1 flex items-center justify-center ${
                    isCompleted ? 'bg-amber-600' : 'bg-gray-200'
                  } ${isCurrent ? 'ring-2 ring-amber-200 ring-offset-2' : ''}`}
                >
                  {isCompleted && <Check size={12} className="text-white" />}
                </div>
                <span className={`text-xs ${isCompleted ? 'text-amber-600' : 'text-gray-400'} text-center`}>
                  {stage}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
        <div className="flex items-center">
          <Clock size={16} className="mr-1" />
          Applied {new Date(application.appliedDate).toLocaleDateString()}
        </div>
        <div>
          <span className="font-medium">Salary:</span> {application.salary}
        </div>
        {recruiter && (
          <div className="flex items-center">
            <div className="w-6 h-6 rounded-full overflow-hidden mr-2">
              <img 
                src={recruiter.avatar} 
                alt={recruiter.name}
                className="w-full h-full object-cover"
              />
            </div>
            <span>{recruiter.name}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Applications;