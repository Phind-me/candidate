import { User } from '../types';

export const mockUserData: User = {
  id: '1',
  name: 'Alex Johnson',
  email: 'alex.johnson@example.com',
  phone: '(555) 123-4567',
  location: 'San Francisco, CA',
  profilePicture: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
  title: 'Senior Software Engineer',
  summary: 'Experienced software engineer with 8+ years specializing in full-stack development with React, Node.js, and cloud technologies. Passionate about creating efficient, scalable applications and mentoring junior developers.',
  workExperience: [
    {
      id: 'we1',
      company: 'TechCorp Inc.',
      title: 'Senior Software Engineer',
      location: 'San Francisco, CA',
      startDate: '2020-03-01',
      endDate: null,
      description: 'Led development of cloud-based enterprise applications. Managed a team of 5 developers and implemented CI/CD pipelines that reduced deployment time by 40%.'
    },
    {
      id: 'we2',
      company: 'InnovateSoft',
      title: 'Software Engineer',
      location: 'Austin, TX',
      startDate: '2017-06-15',
      endDate: '2020-02-28',
      description: 'Developed RESTful APIs and frontend components for customer-facing applications. Improved application performance by 30% through code optimization.'
    },
    {
      id: 'we3',
      company: 'Digital Solutions LLC',
      title: 'Junior Developer',
      location: 'Portland, OR',
      startDate: '2015-08-01',
      endDate: '2017-06-01',
      description: 'Assisted in development of web applications using JavaScript, HTML, and CSS. Participated in daily stand-ups and sprint planning.'
    }
  ],
  education: [
    {
      id: 'ed1',
      institution: 'University of California, Berkeley',
      degree: 'Master of Science',
      field: 'Computer Science',
      startDate: '2013-09-01',
      endDate: '2015-05-30',
      description: 'Specialized in Artificial Intelligence and Machine Learning.'
    },
    {
      id: 'ed2',
      institution: 'Oregon State University',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      startDate: '2009-09-01',
      endDate: '2013-06-15',
      description: 'Member of ACM student chapter. Graduated with honors.'
    }
  ],
  skills: [
    { id: 's1', name: 'JavaScript', level: 'Expert' },
    { id: 's2', name: 'React', level: 'Expert' },
    { id: 's3', name: 'Node.js', level: 'Advanced' },
    { id: 's4', name: 'TypeScript', level: 'Advanced' },
    { id: 's5', name: 'AWS', level: 'Intermediate' },
    { id: 's6', name: 'Python', level: 'Intermediate' },
    { id: 's7', name: 'Docker', level: 'Intermediate' },
    { id: 's8', name: 'GraphQL', level: 'Intermediate' }
  ]
};