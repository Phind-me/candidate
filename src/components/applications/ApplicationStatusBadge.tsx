import React from 'react';
import { ApplicationStatus } from '../../types';

interface ApplicationStatusBadgeProps {
  status: ApplicationStatus;
}

const ApplicationStatusBadge: React.FC<ApplicationStatusBadgeProps> = ({ status }) => {
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
    <span className={`badge ${getStatusClasses()}`}>
      {status}
    </span>
  );
};

export default ApplicationStatusBadge;