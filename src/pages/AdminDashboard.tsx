import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import AdminLayout from '../components/admin/AdminLayout'; 
import AdminOverview from '../components/admin/AdminOverview';
import ProductManagement from '../components/admin/ProductManagement'; 
import OrderManagement from '../components/admin/OrderManagement'; 
import CRMPipeline from '../components/admin/CRMPipeline'; 
import InvoiceManagement from '../components/admin/InvoiceManagement'; 
import InvoiceGenerator from '../components/admin/InvoiceGenerator';
import DiscountManagement from '../components/admin/DiscountManagement'; 
import UserManagement from '../components/admin/UserManagement'; 
import CRMManagement from '../components/admin/CRMManagement'; 
import SocialMediaManagement from '../components/admin/SocialMediaManagement'; 
import AIBotAgent from '../components/admin/AIBotAgent'; 
import MediaLibrary from '../components/admin/MediaLibrary';
import AbandonedCarts from '../components/admin/AbandonedCarts'; 
import SupportTickets from '../components/admin/SupportTickets'; 
import SEOAnalytics from '../components/admin/SEOAnalytics'; 
import PaymentGateways from '../components/admin/PaymentGateways'; 
import APIKeys from '../components/admin/APIKeys'; 
import WorkflowAutomation from '../components/admin/WorkflowAutomation'; 
import Settings from '../components/admin/Settings'; 

const AdminDashboard: React.FC = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const location = useLocation();
  
  // Check if user is authenticated and is an admin
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} />;
  }

  if (!isAdmin) {
    return <Navigate to="/dashboard" state={{ from: location.pathname }} />;
  }

  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<AdminOverview />} />
        <Route path="/products" element={<ProductManagement />} />
        <Route path="/orders" element={<OrderManagement />} />
        <Route path="/crm-pipeline" element={<CRMPipeline />} />
        <Route path="/invoices" element={<InvoiceManagement />} />
        <Route path="/invoice-generator" element={<InvoiceGenerator />} />
        <Route path="/discounts" element={<DiscountManagement />} />
        <Route path="/users" element={<UserManagement />} />
        <Route path="/abandoned-carts" element={<AbandonedCarts />} />
        <Route path="/seo" element={<SEOAnalytics />} />
        <Route path="/crm" element={<CRMManagement />} />
        <Route path="/social" element={<SocialMediaManagement />} />
        <Route path="/media" element={<MediaLibrary />} />
        <Route path="/ai-bot" element={<AIBotAgent />} />
        <Route path="/automation" element={<WorkflowAutomation />} />
        <Route path="/support-tickets" element={<SupportTickets />} />
        <Route path="/payment-gateways" element={<PaymentGateways />} />
        <Route path="/api-keys" element={<APIKeys />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminDashboard;