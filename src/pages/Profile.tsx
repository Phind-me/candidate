import React, { useState } from 'react';
import { 
  PencilLine, Briefcase, GraduationCap, Award, Mail, Phone, MapPin, 
  Calendar, Plus, Save, X, Trash2
} from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import { WorkExperience, Education, Skill } from '../types';

const Profile: React.FC = () => {
  const { user } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<'experience' | 'education' | 'skills'>('experience');
  
  if (!user) {
    return <div>Loading profile...</div>;
  }
  
  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your professional information</p>
        </div>
        <button 
          onClick={() => setIsEditing(!isEditing)}
          className={`btn ${isEditing ? 'btn-secondary' : 'btn-primary'} flex items-center`}
        >
          {isEditing ? (
            <>
              <Save size={18} className="mr-2" />
              Save Changes
            </>
          ) : (
            <>
              <PencilLine size={18} className="mr-2" />
              Edit Profile
            </>
          )}
        </button>
      </div>
      
      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-32"></div>
        <div className="px-6 pb-6 relative">
          <div className="absolute top-0 transform -translate-y-1/2 flex space-x-4 items-end">
            <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden">
              <img 
                src={user.profilePicture} 
                alt={user.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="pb-2">
              <h2 className="text-2xl font-bold text-white drop-shadow-md">{user.name}</h2>
              <p className="text-white/90 drop-shadow-sm">{user.title}</p>
            </div>
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center">
              <Mail size={18} className="text-gray-500 mr-2" />
              <span>{user.email}</span>
            </div>
            <div className="flex items-center">
              <Phone size={18} className="text-gray-500 mr-2" />
              <span>{user.phone}</span>
            </div>
            <div className="flex items-center">
              <MapPin size={18} className="text-gray-500 mr-2" />
              <span>{user.location}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Professional Summary */}
      <div className="card mb-6">
        <h3 className="text-xl font-semibold mb-4">Professional Summary</h3>
        <p className="text-gray-700 whitespace-pre-line">{user.summary}</p>
      </div>
      
      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button 
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'experience' 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('experience')}
        >
          <Briefcase size={16} className="inline mr-1" />
          Work Experience
        </button>
        <button 
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'education' 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('education')}
        >
          <GraduationCap size={16} className="inline mr-1" />
          Education
        </button>
        <button 
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'skills' 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('skills')}
        >
          <Award size={16} className="inline mr-1" />
          Skills
        </button>
      </div>
      
      {/* Tab Content */}
      <div className="card">
        {activeTab === 'experience' && (
          <ExperienceSection experiences={user.workExperience} isEditing={isEditing} />
        )}
        
        {activeTab === 'education' && (
          <EducationSection education={user.education} isEditing={isEditing} />
        )}
        
        {activeTab === 'skills' && (
          <SkillsSection skills={user.skills} isEditing={isEditing} />
        )}
      </div>
    </div>
  );
};

interface ExperienceSectionProps {
  experiences: WorkExperience[];
  isEditing: boolean;
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({ experiences, isEditing }) => {
  // Format date for display
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Present';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">Work Experience</h3>
        {isEditing && (
          <button className="btn btn-outline flex items-center text-sm">
            <Plus size={16} className="mr-1" />
            Add Experience
          </button>
        )}
      </div>
      
      <div className="space-y-8">
        {experiences.map((experience) => (
          <div key={experience.id} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
            <div className="flex justify-between">
              <div>
                <h4 className="font-bold text-gray-900">{experience.title}</h4>
                <div className="text-gray-700">{experience.company}</div>
                <div className="text-sm text-gray-500 flex items-center mt-1">
                  <MapPin size={14} className="mr-1" />
                  {experience.location}
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-sm text-gray-600 flex items-center justify-end">
                  <Calendar size={14} className="mr-1" />
                  {formatDate(experience.startDate)} - {formatDate(experience.endDate)}
                </div>
                
                {isEditing && (
                  <div className="flex mt-2 space-x-1">
                    <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                      <PencilLine size={14} />
                    </button>
                    <button className="p-1 text-red-600 hover:bg-red-50 rounded">
                      <Trash2 size={14} />
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            <p className="mt-2 text-gray-700 whitespace-pre-line">{experience.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

interface EducationSectionProps {
  education: Education[];
  isEditing: boolean;
}

const EducationSection: React.FC<EducationSectionProps> = ({ education, isEditing }) => {
  // Format date for display
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Present';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">Education</h3>
        {isEditing && (
          <button className="btn btn-outline flex items-center text-sm">
            <Plus size={16} className="mr-1" />
            Add Education
          </button>
        )}
      </div>
      
      <div className="space-y-8">
        {education.map((edu) => (
          <div key={edu.id} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
            <div className="flex justify-between">
              <div>
                <h4 className="font-bold text-gray-900">{edu.degree} in {edu.field}</h4>
                <div className="text-gray-700">{edu.institution}</div>
              </div>
              
              <div className="text-right">
                <div className="text-sm text-gray-600 flex items-center justify-end">
                  <Calendar size={14} className="mr-1" />
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                </div>
                
                {isEditing && (
                  <div className="flex mt-2 space-x-1">
                    <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                      <PencilLine size={14} />
                    </button>
                    <button className="p-1 text-red-600 hover:bg-red-50 rounded">
                      <Trash2 size={14} />
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            <p className="mt-2 text-gray-700 whitespace-pre-line">{edu.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

interface SkillsSectionProps {
  skills: Skill[];
  isEditing: boolean;
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ skills, isEditing }) => {
  // Group skills by level
  const skillsByLevel: Record<string, Skill[]> = {
    Expert: [],
    Advanced: [],
    Intermediate: [],
    Beginner: []
  };
  
  skills.forEach(skill => {
    if (skillsByLevel[skill.level]) {
      skillsByLevel[skill.level].push(skill);
    }
  });
  
  // Color classes for each level
  const levelColors = {
    Expert: 'bg-blue-100 text-blue-800',
    Advanced: 'bg-green-100 text-green-800',
    Intermediate: 'bg-yellow-100 text-yellow-800',
    Beginner: 'bg-gray-100 text-gray-800'
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">Skills</h3>
        {isEditing && (
          <button className="btn btn-outline flex items-center text-sm">
            <Plus size={16} className="mr-1" />
            Add Skill
          </button>
        )}
      </div>
      
      <div className="space-y-6">
        {Object.entries(skillsByLevel).map(([level, levelSkills]) => (
          levelSkills.length > 0 && (
            <div key={level}>
              <h4 className="font-medium text-gray-700 mb-3">{level}</h4>
              <div className="flex flex-wrap gap-2">
                {levelSkills.map(skill => (
                  <div 
                    key={skill.id} 
                    className={`px-3 py-1.5 rounded-full text-sm ${levelColors[level as keyof typeof levelColors]} ${
                      isEditing ? 'flex items-center' : ''
                    }`}
                  >
                    {skill.name}
                    {isEditing && (
                      <button className="ml-2 text-gray-600 hover:text-red-600">
                        <X size={14} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default Profile;