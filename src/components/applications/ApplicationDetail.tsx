import React from 'react';
import { X, Building, MapPin, DollarSign, User, CalendarDays, Clock, FileText, CheckCircle, XCircle } from 'lucide-react';
import { Application } from '../../types';
import { mockRecruiters } from '../../data/mockData';
import ApplicationStatusBadge from './ApplicationStatusBadge';

interface ApplicationDetailProps {
  application: Application;
  onClose: () => void;
}

const ApplicationDetail: React.FC<ApplicationDetailProps> = ({ application, onClose }) => {
  const recruiter = mockRecruiters.find(r => r.id === application.recruiter);
  
  // Format dates
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
        className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-auto animate-slide-up"
        onClick={e => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white z-10 flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">Application Details</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6">
          {/* Job Info */}
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{application.jobTitle}</h3>
            <div className="flex flex-wrap gap-y-2">
              <div className="flex items-center text-gray-600 mr-4">
                <Building size={18} className="mr-1" />
                <span>{application.company}</span>
              </div>
              <div className="flex items-center text-gray-600 mr-4">
                <MapPin size={18} className="mr-1" />
                <span>{application.location}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <DollarSign size={18} className="mr-1" />
                <span>{application.salary}</span>
              </div>
            </div>
          </div>
          
          {/* Status and Dates */}
          <div className="flex flex-wrap justify-between mb-6 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-500 mb-1">Status</div>
              <div>
                <ApplicationStatusBadge status={application.status} />
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-500 mb-1">Applied On</div>
              <div className="flex items-center text-gray-900">
                <CalendarDays size={18} className="mr-1 text-blue-600" />
                <span>{formatDate(application.appliedDate)}</span>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-500 mb-1">Last Updated</div>
              <div className="flex items-center text-gray-900">
                <Clock size={18} className="mr-1 text-blue-600" />
                <span>{formatDate(application.lastUpdated)}</span>
              </div>
            </div>
          </div>
          
          {/* Recruiter Info */}
          {recruiter && (
            <div className="mb-6 p-4 border border-gray-100 rounded-lg">
              <h4 className="text-gray-500 text-sm mb-2">Recruiter</h4>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                  <img 
                    src={recruiter.avatar} 
                    alt={recruiter.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-medium text-gray-900">{recruiter.name}</div>
                  <div className="text-sm text-gray-600">{recruiter.company}</div>
                  <div className="text-sm text-gray-600">{recruiter.email}</div>
                </div>
              </div>
            </div>
          )}
          
          {/* Description */}
          {application.description && (
            <div className="mb-6">
              <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                <FileText size={18} className="mr-2 text-blue-600" />
                Job Description
              </h4>
              <p className="text-gray-700 whitespace-pre-line">
                {application.description}
              </p>
            </div>
          )}
          
          {/* Notes */}
          {application.notes && (
            <div className="mb-6">
              <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                <User size={18} className="mr-2 text-blue-600" />
                Your Notes
              </h4>
              <p className="text-gray-700 whitespace-pre-line bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                {application.notes}
              </p>
            </div>
          )}
          
          {/* Timeline */}
          <div className="mb-6">
            <h4 className="font-medium text-gray-900 mb-4">Application Timeline</h4>
            <div className="relative">
              {application.timeline.map((event, index) => {
                const isCompleted = new Date(event.date) <= new Date();
                const isLast = index === application.timeline.length - 1;
                
                return (
                  <div key={event.id} className="flex mb-6 ml-5 md:ml-0">
                    <div className="hidden md:block md:w-1/4 pr-4 text-right">
                      <div className="text-sm font-medium text-gray-900">
                        {formatDate(event.date)}
                      </div>
                    </div>
                    
                    <div className="relative flex items-start">
                      <div className="absolute left-0 ml-[-15px] mt-1.5">
                        {isCompleted ? (
                          <CheckCircle size={20} className="text-green-500" />
                        ) : (
                          <Clock size={20} className="text-yellow-500" />
                        )}
                      </div>
                      
                      {!isLast && (
                        <div className="absolute left-0 top-0 h-full ml-[-5px] border-l-2 border-gray-200" style={{ height: 'calc(100% + 1.5rem)', marginTop: '0.75rem' }} />
                      )}
                      
                      <div className="pl-6 md:pl-8">
                        <div className="text-sm font-medium text-gray-900 mb-1">
                          {event.title}
                        </div>
                        <div className="md:hidden text-xs text-gray-500 mb-1">
                          {formatDate(event.date)}
                        </div>
                        <div className="text-sm text-gray-700">
                          {event.description}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="flex justify-end space-x-4 mt-8">
            {application.status !== 'Rejected' && (
              <button className="btn flex items-center text-red-600 bg-red-50 hover:bg-red-100">
                <XCircle size={18} className="mr-2" />
                Mark as Rejected
              </button>
            )}
            <button className="btn btn-primary flex items-center">
              <CheckCircle size={18} className="mr-2" />
              Update Status
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetail;