import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { PrivateRoute } from './components/auth/PrivateRoute';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { Profile } from './pages/Profile';
import { Assessment } from './pages/Assessment';
import { AssessmentSelection } from './pages/AssessmentSelection';
import { Media } from './pages/Media';
import { MediaDetail } from './pages/MediaDetail';
import { SocialAnalysis } from './pages/SocialAnalysis';

export function AppRoutes() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/assessment"
          element={
            <PrivateRoute>
              <Assessment />
            </PrivateRoute>
          }
        />
        <Route
          path="/assessment-selection"
          element={
            <PrivateRoute>
              <AssessmentSelection />
            </PrivateRoute>
          }
        />
        <Route path="/media" element={<Media />} />
        <Route path="/media/:id" element={<MediaDetail />} />
        <Route
          path="/social-analysis"
          element={
            <PrivateRoute>
              <SocialAnalysis />
            </PrivateRoute>
          }
        />
      </Routes>
    </Layout>
  );
}