import React from 'react';
import { Search, UserPlus, Mail, Phone, Calendar, X, Check, Shield, ShieldOff } from 'lucide-react';
import { Recruiter } from '../types';
import { useRecruiters } from '../contexts/RecruitersContext';
import { useApplications } from '../contexts/ApplicationsContext';

const Recruiters: React.FC = () => {
  const {
    filteredRecruiters,
    searchTerm,
    setSearchTerm,
    accessFilter,
    setAccessFilter,
    isLoading,
    error,
    activeRecruiter,
    setActiveRecruiterId
  } = useRecruiters();

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
  
  // Group recruiters by company
  const recruitersByCompany: Record<string, Recruiter[]> = {};
  
  filteredRecruiters.forEach(recruiter => {
    if (!recruitersByCompany[recruiter.company]) {
      recruitersByCompany[recruiter.company] = [];
    }
    recruitersByCompany[recruiter.company].push(recruiter);
  });
  
  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Recruiters</h1>
        <p className="text-gray-600">Manage recruiters who have access to your profile</p>
      </div>
      
      {/* Controls */}
      <div className="flex flex-col md:flex-row justify-between mb-6 space-y-4 md:space-y-0">
        <div className="flex w-full md:w-auto">
          {/* Search */}
          <div className="relative flex-grow md:w-64">
            <input
              type="text"
              placeholder="Search recruiters..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute left-3 top-2.5 text-gray-400">
              <Search size={18} />
            </div>
          </div>
          
          {/* Access Filter */}
          <div className="relative ml-2">
            <select
              className="appearance-none pl-3 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              value={accessFilter}
              onChange={(e) => setAccessFilter(e.target.value as 'all' | 'granted' | 'revoked')}
            >
              <option value="all">All Recruiters</option>
              <option value="granted">Access Granted</option>
              <option value="revoked">Access Revoked</option>
            </select>
          </div>
        </div>
        
        {/* Add Recruiter Button */}
        <button className="btn btn-primary flex items-center">
          <UserPlus size={18} className="mr-2" />
          Add Recruiter
        </button>
      </div>
      
      {/* Recruiters List */}
      <div>
        {Object.keys(recruitersByCompany).length > 0 ? (
          Object.keys(recruitersByCompany).map(company => (
            <div key={company} className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <Building className="mr-2" size={18} />
                {company}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recruitersByCompany[company].map(recruiter => (
                  <RecruiterCard 
                    key={recruiter.id} 
                    recruiter={recruiter} 
                    onClick={() => setActiveRecruiterId(recruiter.id)}
                  />
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 bg-white rounded-xl shadow-sm">
            <UserPlus className="mx-auto text-gray-400" size={32} />
            <p className="mt-2 text-gray-500">No recruiters found</p>
          </div>
        )}
      </div>
      
      {/* Recruiter Detail Modal */}
      {activeRecruiter && (
        <RecruiterDetail 
          recruiter={activeRecruiter} 
          onClose={() => setActiveRecruiterId(null)} 
        />
      )}
    </div>
  );
};

interface RecruiterCardProps {
  recruiter: Recruiter;
  onClick: () => void;
}

const RecruiterCard: React.FC<RecruiterCardProps> = ({ recruiter, onClick }) => {
  // Count applications from this recruiter
  const { applications } = useApplications();
  const applicationCount = applications.filter(app => app.recruiter === recruiter.id).length;
  
  return (
    <div 
      className="card card-hover cursor-pointer animate-slide-up"
      onClick={onClick}
    >
      <div className="flex items-start">
        <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
          <img 
            src={recruiter.avatar} 
            alt={recruiter.name} 
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h4 className="font-medium text-gray-900">{recruiter.name}</h4>
          <p className="text-sm text-gray-600">{recruiter.company}</p>
          <div className="flex mt-2">
            {recruiter.accessGranted ? (
              <div className="text-xs flex items-center text-green-600 bg-green-50 px-2 py-1 rounded-full">
                <Shield size={12} className="mr-1" />
                Access Granted
              </div>
            ) : (
              <div className="text-xs flex items-center text-red-600 bg-red-50 px-2 py-1 rounded-full">
                <ShieldOff size={12} className="mr-1" />
                Access Revoked
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mt-4 text-sm text-gray-600">
        <div className="flex items-center mb-1">
          <Mail size={16} className="mr-2" />
          {recruiter.email}
        </div>
        <div className="flex items-center">
          <Phone size={16} className="mr-2" />
          {recruiter.phone}
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
        <div>
          <span className="text-xs text-gray-500">Applications</span>
          <div className="text-lg font-semibold">{applicationCount}</div>
        </div>
        <div>
          <span className="text-xs text-gray-500">Last Access</span>
          <div className="text-sm">
            {new Date(recruiter.accessDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </div>
        </div>
      </div>
    </div>
  );
};

interface RecruiterDetailProps {
  recruiter: Recruiter;
  onClose: () => void;
}

const RecruiterDetail: React.FC<RecruiterDetailProps> = ({ recruiter, onClose }) => {
  const { applications } = useApplications();
  
  // Get applications from this recruiter
  const recruiterApplications = applications.filter(app => app.recruiter === recruiter.id);
  
  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-auto animate-slide-up"
        onClick={e => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white z-10 flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">Recruiter Details</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6">
          {/* Recruiter Info */}
          <div className="flex items-start mb-6">
            <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
              <img 
                src={recruiter.avatar} 
                alt={recruiter.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{recruiter.name}</h3>
              <p className="text-gray-600">{recruiter.company}</p>
              
              <div className="mt-2">
                {recruiter.accessGranted ? (
                  <div className="text-sm flex items-center text-green-600 bg-green-50 px-2 py-1 rounded-full inline-flex">
                    <Shield size={14} className="mr-1" />
                    Access Granted
                  </div>
                ) : (
                  <div className="text-sm flex items-center text-red-600 bg-red-50 px-2 py-1 rounded-full inline-flex">
                    <ShieldOff size={14} className="mr-1" />
                    Access Revoked
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center mb-1">
                <Mail size={16} className="mr-2 text-amber-600" />
                <span className="text-sm text-gray-500">Email</span>
              </div>
              <a href={`mailto:${recruiter.email}`} className="text-amber-600 hover:underline">
                {recruiter.email}
              </a>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center mb-1">
                <Phone size={16} className="mr-2 text-amber-600" />
                <span className="text-sm text-gray-500">Phone</span>
              </div>
              <a href={`tel:${recruiter.phone}`} className="text-amber-600 hover:underline">
                {recruiter.phone}
              </a>
            </div>
          </div>
          
          {/* Access Information */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center mb-1">
              <Calendar size={16} className="mr-2 text-amber-600" />
              <span className="text-sm text-gray-500">Access Status</span>
            </div>
            <p className="text-gray-900">
              {recruiter.accessGranted 
                ? `Access granted on ${formatDate(recruiter.accessDate)}` 
                : `Access revoked. Last active on ${formatDate(recruiter.accessDate)}`}
            </p>
          </div>
          
          {/* Applications */}
          <div className="mb-6">
            <h4 className="font-medium text-gray-900 mb-4">Applications ({recruiterApplications.length})</h4>
            
            {recruiterApplications.length > 0 ? (
              <div className="space-y-3">
                {recruiterApplications.map(app => (
                  <div 
                    key={app.id} 
                    className="p-4 border border-gray-100 rounded-lg hover:bg-amber-50 transition-colors duration-150"
                  >
                    <div className="flex justify-between">
                      <div>
                        <h5 className="font-medium text-gray-900">{app.jobTitle}</h5>
                        <p className="text-sm text-gray-600">{app.company}</p>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1 text-right">Applied on</div>
                        <div className="text-sm text-gray-900">{formatDate(app.appliedDate)}</div>
                      </div>
                    </div>
                    <div className="mt-2 flex justify-between items-center">
                      <ApplicationStatusBadge status={app.status} showIcon={true} />
                      <div className="text-amber-600 text-sm cursor-pointer hover:underline">
                        View details
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 bg-gray-50 rounded-lg">
                <p className="text-gray-500">No applications submitted through this recruiter</p>
              </div>
            )}
          </div>
          
          {/* Actions */}
          <div className="flex justify-end space-x-4 mt-8">
            {recruiter.accessGranted ? (
              <button className="btn flex items-center text-red-600 bg-red-50 hover:bg-red-100">
                <ShieldOff size={18} className="mr-2" />
                Revoke Access
              </button>
            ) : (
              <button className="btn flex items-center text-green-600 bg-green-50 hover:bg-green-100">
                <Shield size={18} className="mr-2" />
                Grant Access
              </button>
            )}
            <button className="btn btn-primary flex items-center">
              <Mail size={18} className="mr-2" />
              Contact Recruiter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Simple Building icon component
const Building = ({ className = '', size = 24 }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
    <line x1="9" y1="22" x2="9" y2="2"></line>
    <line x1="15" y1="22" x2="15" y2="2"></line>
  </svg>
);

export default Recruiters;