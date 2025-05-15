import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Users, CheckCircle, Clock, Calendar } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import { mockApplications, mockRecruiters } from '../data/mockData';
import { Application } from '../types';
import ApplicationStatusBadge from '../components/applications/ApplicationStatusBadge';

const Dashboard: React.FC = () => {
  const { user } = useUser();
  
  // Calculate statistics
  const totalApplications = mockApplications.length;
  const activeApplications = mockApplications.filter(app => 
    !['Rejected', 'Accepted'].includes(app.status)
  ).length;
  const acceptedApplications = mockApplications.filter(app => app.status === 'Accepted').length;
  const interviewStage = mockApplications.filter(app => 
    ['Interview', 'Technical'].includes(app.status)
  ).length;
  
  // Get recent applications
  const recentApplications = [...mockApplications]
    .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
    .slice(0, 3);
  
  // Active recruiters
  const activeRecruiters = mockRecruiters.filter(r => r.accessGranted).length;
  
  // Get upcoming events
  const upcomingEvents = getUpcomingEvents(mockApplications);
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user?.name.split(' ')[0]}</h1>
        <p className="text-gray-600">Here's an overview of your job search progress</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          icon={<Briefcase className="text-blue-600" size={24} />}
          title="Total Applications"
          value={totalApplications}
          description="Applications submitted"
          color="blue"
        />
        <StatCard 
          icon={<Clock className="text-yellow-600" size={24} />}
          title="Active Applications"
          value={activeApplications}
          description="In progress"
          color="yellow"
        />
        <StatCard 
          icon={<Users className="text-purple-600" size={24} />}
          title="Active Recruiters"
          value={activeRecruiters}
          description="Working with you"
          color="purple"
        />
        <StatCard 
          icon={<CheckCircle className="text-green-600" size={24} />}
          title="Interview Stage"
          value={interviewStage}
          description="Moving forward"
          color="green"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Applications */}
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Recent Applications</h2>
            <Link to="/applications" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              View all
            </Link>
          </div>
          <div className="space-y-4">
            {recentApplications.map(application => (
              <ApplicationCard key={application.id} application={application} />
            ))}
          </div>
        </div>
        
        {/* Upcoming Events */}
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Upcoming Events</h2>
            <Link to="/applications" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              View calendar
            </Link>
          </div>
          {upcomingEvents.length > 0 ? (
            <div className="space-y-4">
              {upcomingEvents.map(event => (
                <EventCard 
                  key={event.id}
                  title={event.title}
                  company={event.company}
                  date={event.date}
                  type={event.type}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Calendar className="mx-auto text-gray-400" size={32} />
              <p className="mt-2 text-gray-500">No upcoming events scheduled</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: number;
  description: string;
  color: 'blue' | 'green' | 'yellow' | 'purple';
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, value, description, color }) => {
  const colorClasses = {
    blue: 'bg-blue-50',
    green: 'bg-green-50',
    yellow: 'bg-yellow-50',
    purple: 'bg-purple-50'
  };
  
  return (
    <div className={`card card-hover ${colorClasses[color]} border border-gray-100 animate-slide-up`}>
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
        <div>{icon}</div>
      </div>
      <div className="mt-4">
        <span className="text-3xl font-bold">{value}</span>
      </div>
    </div>
  );
};

interface ApplicationCardProps {
  application: Application;
}

const ApplicationCard: React.FC<ApplicationCardProps> = ({ application }) => {
  const recruiter = mockRecruiters.find(r => r.id === application.recruiter);
  
  return (
    <div className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
      <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
        <img 
          src={recruiter?.avatar || 'https://images.pexels.com/photos/1462630/pexels-photo-1462630.jpeg?auto=compress&cs=tinysrgb&w=600'} 
          alt={recruiter?.name || 'Recruiter'} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium text-gray-900 truncate">{application.jobTitle}</h3>
        <p className="text-xs text-gray-500 truncate">{application.company}</p>
      </div>
      <div className="ml-2">
        <ApplicationStatusBadge status={application.status} />
      </div>
    </div>
  );
};

interface EventCardProps {
  title: string;
  company: string;
  date: string;
  type: string;
}

const EventCard: React.FC<EventCardProps> = ({ title, company, date, type }) => {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  
  return (
    <div className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200">
      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
        <Calendar size={20} className="text-blue-600" />
      </div>
      <div className="flex-1">
        <h3 className="text-sm font-medium text-gray-900">{title}</h3>
        <p className="text-xs text-gray-500">{company}</p>
      </div>
      <div className="text-right">
        <span className="text-xs font-medium text-gray-900">{formattedDate}</span>
        <div className="text-xs text-gray-500 capitalize">{type}</div>
      </div>
    </div>
  );
};

// Helper function to extract upcoming events from applications
function getUpcomingEvents(applications: Application[]) {
  const now = new Date();
  const futureEvents: any[] = [];
  
  applications.forEach(app => {
    app.timeline.forEach(event => {
      const eventDate = new Date(event.date);
      if (eventDate > now) {
        futureEvents.push({
          id: event.id,
          title: event.title,
          company: app.company,
          date: event.date,
          type: event.type
        });
      }
    });
  });
  
  return futureEvents
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);
}

export default Dashboard;