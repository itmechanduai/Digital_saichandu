import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import Overview from '../components/dashboard/Overview';
import Projects from '../components/dashboard/Projects';
import Billing from '../components/dashboard/Billing';
import AIWorkflows from '../components/dashboard/AIWorkflows';
import Settings from '../components/dashboard/Settings';
import Profile from '../components/dashboard/Profile';
import Orders from '../components/dashboard/Orders';
import Invoices from '../components/dashboard/Invoices';

const Dashboard: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/invoices" element={<Invoices />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/ai-workflows" element={<AIWorkflows />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </DashboardLayout>
  );
};

export default Dashboard;