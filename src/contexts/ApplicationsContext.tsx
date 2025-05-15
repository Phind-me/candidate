import React, { createContext, useContext, useState, useEffect } from 'react';
import { Application, ApplicationStatus } from '../types';
import { mockApplications } from '../data/mockData';

interface ApplicationsContextType {
  applications: Application[];
  activeApplicationId: string | null;
  activeApplication: Application | null;
  setActiveApplicationId: (id: string | null) => void;
  createApplication: (application: Omit<Application, 'id'>) => void;
  updateApplication: (id: string, application: Partial<Application>) => void;
  deleteApplication: (id: string) => void;
  isLoading: boolean;
  error: string | null;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: ApplicationStatus | 'All';
  setStatusFilter: (status: ApplicationStatus | 'All') => void;
  filteredApplications: Application[];
}

const ApplicationsContext = createContext<ApplicationsContextType | undefined>(undefined);

export const ApplicationsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [activeApplicationId, setActiveApplicationId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | 'All'>('All');

  const activeApplication = activeApplicationId 
    ? applications.find(app => app.id === activeApplicationId) || null 
    : null;

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setIsLoading(true);
      // Simulate API call
      const data = mockApplications;
      setApplications(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch applications');
      console.error('Error fetching applications:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const createApplication = (newApplication: Omit<Application, 'id'>) => {
    const application: Application = {
      ...newApplication,
      id: `a${Date.now()}`,
    };
    setApplications(prev => [...prev, application]);
  };

  const updateApplication = (id: string, updatedFields: Partial<Application>) => {
    setApplications(prev => 
      prev.map(app => 
        app.id === id ? { ...app, ...updatedFields } : app
      )
    );
  };

  const deleteApplication = (id: string) => {
    setApplications(prev => prev.filter(app => app.id !== id));
    if (activeApplicationId === id) {
      setActiveApplicationId(null);
    }
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = 
      app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || app.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const value = {
    applications,
    activeApplicationId,
    activeApplication,
    setActiveApplicationId,
    createApplication,
    updateApplication,
    deleteApplication,
    isLoading,
    error,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    filteredApplications
  };

  return (
    <ApplicationsContext.Provider value={value}>
      {children}
    </ApplicationsContext.Provider>
  );
};

export const useApplications = () => {
  const context = useContext(ApplicationsContext);
  if (context === undefined) {
    throw new Error('useApplications must be used within an ApplicationsProvider');
  }
  return context;
};