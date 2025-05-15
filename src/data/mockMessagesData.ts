import { Message } from '../types';

export const mockMessages: Message[] = [
  {
    id: 'm1',
    title: 'Interview Scheduled',
    content: 'Your technical interview with InnoTech Solutions has been scheduled for tomorrow at 2:00 PM.',
    type: 'info',
    date: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    read: false,
    link: '/applications'
  },
  {
    id: 'm2',
    title: 'Application Status Update',
    content: 'Your application at Global Finance Technologies has moved to the technical assessment stage.',
    type: 'success',
    date: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    read: false,
    link: '/applications'
  },
  {
    id: 'm3',
    title: 'New Message from Recruiter',
    content: 'Sarah Miller has sent you a message regarding the Senior Frontend Engineer position.',
    type: 'info',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    read: true,
    link: '/recruiters'
  }
];