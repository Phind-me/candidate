import React, { createContext, useContext, useState, useEffect } from 'react';
import { Application, Recruiter } from '../types';
import { mockApplications, mockRecruiters } from '../data/mockData';

interface DashboardContextType {
  applications: Application[];
  recruiters: Recruiter[];
  activeApplicationId: string | null;
  activeApplication: Application | null;
  setActiveApplicationId: (id: string | null) => void;
  createApplication: (application: Omit<Application, 'id'>) => void;
  updateApplication: (id: string, application: Partial<Application>) => void;
  deleteApplication: (id: string) => void;
  isLoading: boolean;
  error: string | null;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [recruiters, setRecruiters] = useState<Recruiter[]>([]);
  const [activeApplicationId, setActiveApplicationId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const activeApplication = activeApplicationId 
    ? applications.find(app => app.id === activeApplicationId) || null 
    : null;

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      // Simulate API call
      const applicationsData = mockApplications;
      const recruitersData = mockRecruiters;
      
      setApplications(applicationsData);
      setRecruiters(recruitersData);
      setError(null);
    } catch (err) {
      setError('Failed to fetch dashboard data');
      console.error('Error fetching dashboard data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const createApplication = (newApplication: Omit<Application, 'id'>) => {
    const application: Application = {
      ...newApplication,
      id: `a${Date.now()}`, // Generate a unique ID
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

  const value = {
    applications,
    recruiters,
    activeApplicationId,
    activeApplication,
    setActiveApplicationId,
    createApplication,
    updateApplication,
    deleteApplication,
    isLoading,
    error
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};