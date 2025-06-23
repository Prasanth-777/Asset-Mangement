import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Components/Login';
import Register from './Components/Register';
import Dashboard from './Components/Dashboard';
import AssetForm from './Components/AssetForm';
import EditAssetPage from './Components/EditAsset';
import Navbar from './Components/Navbar';
import { AuthProvider, AuthContext } from './Context/AuthContext';
import Category from './Components/Categories';
import Status from './Components/Status';

// Protected route
const ProtectedRoute = ({ children }) => {
  const { user, authLoading } = React.useContext(AuthContext);
  if (authLoading) return <div>Loading...</div>;
  return user ? children : <Navigate to="/" />;
};

// Public route
const PublicRoute = ({ children }) => {
  const { user, authLoading } = React.useContext(AuthContext);
  if (authLoading) return <div>Loading...</div>;
  return !user ? children : <Navigate to="/dashboard" />;
};
const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* Public routes (only when NOT logged in) */}
          <Route
            path="/"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />

          {/* Protected routes (only when logged in) */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-asset"
            element={
              <ProtectedRoute>
                <AssetForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-asset/:id"
            element={
              <ProtectedRoute>
                <EditAssetPage />
              </ProtectedRoute>
            }
          />
          <Route 
            path='/category'
            element={
              <ProtectedRoute>
                <Category/>
              </ProtectedRoute>
            }
            />
            <Route 
            path='/status'
            element={
              <ProtectedRoute>
                <Status/>
              </ProtectedRoute>
            }
            />

          {/* Catch-all fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    
    </AuthProvider>
  );
};

export default App;
