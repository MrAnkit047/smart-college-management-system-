import React, { useEffect, useMemo } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Layout } from './components/Layout.jsx';
import { AuthProvider, useAuth } from './auth/AuthContext.jsx';

import { LoginPage } from './pages/LoginPage.jsx';
import { AdminDashboard } from './pages/AdminDashboard.jsx';
import { StudentDashboard } from './pages/StudentDashboard.jsx';
import { TeacherDashboard } from './pages/TeacherDashboard.jsx';
import { ProtectedRoute } from './components/ProtectedRoute.jsx';

function AppRoutes() {
  const location = useLocation();
  const { user } = useAuth();

  // Default redirect
  const home = useMemo(() => {
    if (!user) return '/login';
    if (user.role === 'admin') return '/admin';
    if (user.role === 'teacher') return '/teacher';
    if (user.role === 'student') return '/student';
    return '/login';
  }, [user]);

  useEffect(() => {
    document.title = 'Smart College Management';
  }, [location]);

  return (
    <Routes>
      <Route path="/" element={<Navigate to={home} replace />} />
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <Layout>
              <AdminDashboard />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/teacher"
        element={
          <ProtectedRoute allowedRoles={['teacher']}>
            <Layout>
              <TeacherDashboard />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/student"
        element={
          <ProtectedRoute allowedRoles={['student']}>
            <Layout>
              <StudentDashboard />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to={home} replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

