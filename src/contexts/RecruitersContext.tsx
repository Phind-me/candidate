import React, { createContext, useContext, useState, useEffect } from 'react';
import { Recruiter } from '../types';
import { mockRecruiters } from '../data/mockData';

interface RecruitersContextType {
  recruiters: Recruiter[];
  activeRecruiterId: string | null;
  activeRecruiter: Recruiter | null;
  setActiveRecruiterId: (id: string | null) => void;
  createRecruiter: (recruiter: Omit<Recruiter, 'id'>) => void;
  updateRecruiter: (id: string, recruiter: Partial<Recruiter>) => void;
  deleteRecruiter: (id: string) => void;
  isLoading: boolean;
  error: string | null;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  accessFilter: 'all' | 'granted' | 'revoked';
  setAccessFilter: (filter: 'all' | 'granted' | 'revoked') => void;
  filteredRecruiters: Recruiter[];
}

const RecruitersContext = createContext<RecruitersContextType | undefined>(undefined);

export const RecruitersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [recruiters, setRecruiters] = useState<Recruiter[]>([]);
  const [activeRecruiterId, setActiveRecruiterId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [accessFilter, setAccessFilter] = useState<'all' | 'granted' | 'revoked'>('all');

  const activeRecruiter = activeRecruiterId 
    ? recruiters.find(r => r.id === activeRecruiterId) || null 
    : null;

  useEffect(() => {
    fetchRecruiters();
  }, []);

  const fetchRecruiters = async () => {
    try {
      setIsLoading(true);
      // Simulate API call
      const data = mockRecruiters;
      setRecruiters(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch recruiters');
      console.error('Error fetching recruiters:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const createRecruiter = (newRecruiter: Omit<Recruiter, 'id'>) => {
    const recruiter: Recruiter = {
      ...newRecruiter,
      id: `r${Date.now()}`,
    };
    setRecruiters(prev => [...prev, recruiter]);
  };

  const updateRecruiter = (id: string, updatedFields: Partial<Recruiter>) => {
    setRecruiters(prev => 
      prev.map(r => 
        r.id === id ? { ...r, ...updatedFields } : r
      )
    );
  };

  const deleteRecruiter = (id: string) => {
    setRecruiters(prev => prev.filter(r => r.id !== id));
    if (activeRecruiterId === id) {
      setActiveRecruiterId(null);
    }
  };

  const filteredRecruiters = recruiters.filter(recruiter => {
    const matchesSearch = 
      recruiter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recruiter.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesAccess = 
      accessFilter === 'all' ||
      (accessFilter === 'granted' && recruiter.accessGranted) ||
      (accessFilter === 'revoked' && !recruiter.accessGranted);
    
    return matchesSearch && matchesAccess;
  });

  const value = {
    recruiters,
    activeRecruiterId,
    activeRecruiter,
    setActiveRecruiterId,
    createRecruiter,
    updateRecruiter,
    deleteRecruiter,
    isLoading,
    error,
    searchTerm,
    setSearchTerm,
    accessFilter,
    setAccessFilter,
    filteredRecruiters
  };

  return (
    <RecruitersContext.Provider value={value}>
      {children}
    </RecruitersContext.Provider>
  );
};

export const useRecruiters = () => {
  const context = useContext(RecruitersContext);
  if (context === undefined) {
    throw new Error('useRecruiters must be used within a RecruitersProvider');
  }
  return context;
};