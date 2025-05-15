import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Recruiters from './pages/Recruiters';
import Applications from './pages/Applications';
import Messages from './pages/Messages';
import NotFound from './pages/NotFound';
import { UserProvider } from './contexts/UserContext';
import { DashboardProvider } from './contexts/DashboardContext';
import { ApplicationsProvider } from './contexts/ApplicationsContext';
import { RecruitersProvider } from './contexts/RecruitersContext';
import { MessagesProvider } from './contexts/MessagesContext';

function App() {
  return (
    <UserProvider>
      <DashboardProvider>
        <ApplicationsProvider>
          <RecruitersProvider>
            <MessagesProvider>
              <Router>
                <Routes>
                  <Route path="/" element={<Layout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="recruiters" element={<Recruiters />} />
                    <Route path="applications" element={<Applications />} />
                    <Route path="messages" element={<Messages />} />
                    <Route path="*" element={<NotFound />} />
                  </Route>
                </Routes>
              </Router>
            </MessagesProvider>
          </RecruitersProvider>
        </ApplicationsProvider>
      </DashboardProvider>
    </UserProvider>
  );
}

export default App;