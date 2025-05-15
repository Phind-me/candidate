export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  profilePicture: string;
  title: string;
  summary: string;
  workExperience: WorkExperience[];
  education: Education[];
  skills: Skill[];
}

export interface WorkExperience {
  id: string;
  company: string;
  title: string;
  location: string;
  startDate: string;
  endDate: string | null;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string | null;
  description: string;
}

export interface Skill {
  id: string;
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

export interface Recruiter {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  accessGranted: boolean;
  accessDate: string;
  applications: string[]; // IDs of applications
  avatar: string;
}

export interface Application {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  salary: string;
  recruiter: string; // ID of recruiter
  status: ApplicationStatus;
  appliedDate: string;
  lastUpdated: string;
  description: string;
  notes: string;
  timeline: ApplicationEvent[];
}

export type ApplicationStatus = 
  | 'Applied'
  | 'Screening'
  | 'Interview'
  | 'Technical'
  | 'Offer'
  | 'Rejected'
  | 'Accepted';

export interface ApplicationEvent {
  id: string;
  date: string;
  type: string;
  title: string;
  description: string;
}