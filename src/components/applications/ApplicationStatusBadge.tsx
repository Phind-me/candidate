import React from 'react';
import { ApplicationStatus } from '../../types';
import { Check } from 'lucide-react';

interface ApplicationStatusBadgeProps {
  status: ApplicationStatus;
  showIcon?: boolean;
}

const ApplicationStatusBadge: React.FC<ApplicationStatusBadgeProps> = ({ status, showIcon = false }) => {
  const getStatusClasses = () => {
    switch (status) {
      case 'Applied':
        return 'badge-gray';
      case 'Screening':
        return 'badge-blue';
      case 'Interview':
        return 'badge-purple';
      case 'Technical':
        return 'badge-yellow';
      case 'Offer':
        return 'badge-green';
      case 'Accepted':
        return 'badge-green';
      case 'Rejected':
        return 'badge-red';
      default:
        return 'badge-gray';
    }
  };

  return (
    <span className={`badge ${getStatusClasses()} ${showIcon ? 'flex items-center' : ''}`}>
      {showIcon && status !== 'Rejected' && <Check size={12} className="mr-1" />}
      {status}
    </span>
  );
};

export default ApplicationStatusBadge;