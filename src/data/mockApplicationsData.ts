import { Application } from '../types';

export const mockApplications: Application[] = [
  {
    id: 'a1',
    jobTitle: 'Senior Frontend Engineer',
    company: 'InnoTech Solutions',
    location: 'San Francisco, CA (Remote)',
    salary: '$150,000 - $180,000',
    recruiter: 'r1',
    status: 'Interview',
    appliedDate: '2024-01-15',
    lastUpdated: '2024-03-10',
    description: 'Leading frontend development for a growing SaaS company. Working with React, TypeScript, and GraphQL to build modern web applications.',
    notes: 'Had a great initial call with the hiring manager. Technical interview scheduled for next week.',
    timeline: [
      {
        id: 'e1a1',
        date: '2024-01-15',
        type: 'application',
        title: 'Application Submitted',
        description: 'Resume and cover letter submitted through recruiter Sarah Miller.'
      },
      {
        id: 'e2a1',
        date: '2024-01-25',
        type: 'screening',
        title: 'Initial Screening',
        description: 'Completed 30-minute phone screening with HR representative.'
      },
      {
        id: 'e3a1',
        date: '2024-02-10',
        type: 'interview',
        title: 'Interview with Hiring Manager',
        description: 'Discussed previous experience and team fit with Engineering Manager, Rachel.'
      },
      {
        id: 'e4a1',
        date: '2024-03-10',
        type: 'technical',
        title: 'Technical Interview Scheduled',
        description: 'Technical assessment scheduled for March 17th at 2:00 PM.'
      }
    ]
  },
  {
    id: 'a2',
    jobTitle: 'Lead Software Developer',
    company: 'Global Finance Technologies',
    location: 'New York, NY',
    salary: '$170,000 - $200,000',
    recruiter: 'r2',
    status: 'Technical',
    appliedDate: '2024-01-20',
    lastUpdated: '2024-03-05',
    description: 'Leading a team of developers building high-frequency trading platforms. Stack includes React, Node.js, and specialized financial APIs.',
    notes: 'Completed first two rounds of interviews. Technical assessment coming up.',
    timeline: [
      {
        id: 'e1a2',
        date: '2024-01-20',
        type: 'application',
        title: 'Application Submitted',
        description: 'Resume submitted through Michael Rodriguez from Elite Recruiting.'
      },
      {
        id: 'e2a2',
        date: '2024-02-01',
        type: 'screening',
        title: 'Initial Screening',
        description: 'Completed 45-minute screening call with HR and initial technical questions.'
      },
      {
        id: 'e3a2',
        date: '2024-02-15',
        type: 'interview',
        title: 'First Round Interview',
        description: 'Met with Engineering Director to discuss team structure and expectations.'
      },
      {
        id: 'e4a2',
        date: '2024-03-05',
        type: 'technical',
        title: 'Technical Assessment',
        description: 'Completed 2-hour coding challenge focused on algorithmic problems and system design.'
      }
    ]
  },
  {
    id: 'a3',
    jobTitle: 'Full Stack Developer',
    company: 'EcoTech Innovations',
    location: 'Austin, TX (Hybrid)',
    salary: '$130,000 - $155,000',
    recruiter: 'r1',
    status: 'Applied',
    appliedDate: '2024-02-28',
    lastUpdated: '2024-02-28',
    description: 'Building sustainable technology solutions with React, Node.js, and AWS. Focus on eco-friendly technology initiatives.',
    notes: 'Just applied. Waiting to hear back for initial screening.',
    timeline: [
      {
        id: 'e1a3',
        date: '2024-02-28',
        type: 'application',
        title: 'Application Submitted',
        description: 'Resume and portfolio submitted through Sarah Miller from TechTalent Solutions.'
      }
    ]
  },
  {
    id: 'a4',
    jobTitle: 'Senior Backend Engineer',
    company: 'Cloud Systems Inc.',
    location: 'Seattle, WA (Remote)',
    salary: '$160,000 - $190,000',
    recruiter: 'r4',
    status: 'Offer',
    appliedDate: '2024-01-05',
    lastUpdated: '2024-03-12',
    description: 'Developing scalable backend services using Node.js, TypeScript, and AWS. Working on high-volume data processing systems.',
    notes: 'Received offer! Need to review contract details and negotiate benefits.',
    timeline: [
      {
        id: 'e1a4',
        date: '2024-01-05',
        type: 'application',
        title: 'Application Submitted',
        description: 'Resume submitted through David Thompson from Prime Talent Search.'
      },
      {
        id: 'e2a4',
        date: '2024-01-12',
        type: 'screening',
        title: 'Initial Screening',
        description: 'Completed phone screening with technical recruiter.'
      },
      {
        id: 'e3a4',
        date: '2024-01-25',
        type: 'interview',
        title: 'First Round Interview',
        description: 'Virtual interview with Engineering Manager and Team Lead.'
      },
      {
        id: 'e4a4',
        date: '2024-02-08',
        type: 'technical',
        title: 'Technical Assessment',
        description: 'Completed take-home project and technical presentation to the team.'
      },
      {
        id: 'e5a4',
        date: '2024-02-22',
        type: 'interview',
        title: 'Final Interview',
        description: 'Met with CTO and department leaders to discuss long-term goals.'
      },
      {
        id: 'e6a4',
        date: '2024-03-12',
        type: 'offer',
        title: 'Offer Received',
        description: 'Received official offer letter with compensation package and benefits information.'
      }
    ]
  }
];