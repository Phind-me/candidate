import { Recruiter } from '../types';

export const mockRecruiters: Recruiter[] = [
  {
    id: 'r1',
    name: 'Sarah Miller',
    company: 'TechTalent Solutions',
    email: 'sarah.m@techtalent.com',
    phone: '(555) 123-7890',
    accessGranted: true,
    accessDate: '2023-11-15',
    applications: ['a1', 'a3'],
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 'r2',
    name: 'Michael Rodriguez',
    company: 'Elite Recruiting Group',
    email: 'michael.r@eliterecruiting.com',
    phone: '(555) 234-5678',
    accessGranted: true,
    accessDate: '2023-12-03',
    applications: ['a2'],
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 'r3',
    name: 'Jennifer Lee',
    company: 'NextGen Staffing',
    email: 'jennifer.l@nextgenstaffing.com',
    phone: '(555) 345-6789',
    accessGranted: false,
    accessDate: '2024-01-10',
    applications: [],
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 'r4',
    name: 'David Thompson',
    company: 'Prime Talent Search',
    email: 'david.t@primetalent.com',
    phone: '(555) 456-7890',
    accessGranted: true,
    accessDate: '2024-02-05',
    applications: ['a4'],
    avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=600'
  }
];