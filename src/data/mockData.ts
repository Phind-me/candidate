import { User, Recruiter, Application } from '../types';

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