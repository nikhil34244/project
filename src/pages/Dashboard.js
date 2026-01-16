import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutUser, getCurrentUser } from '../services/authService';
import '../styles/Dashboard.css';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getCurrentUser();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      {/* Navbar */}
      <nav className="dashboard-navbar">
        <div className="nav-container">
          <h2 className="logo">JobPortal</h2>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div className="dashboard-content">
        <div className="welcome-section">
          <h1>Welcome, {user?.displayName || 'User'}!</h1>

          <div className="user-info-card">
            <div className="info-item">
              <span className="label">Email:</span>
              <span className="value">{user?.email}</span>
            </div>
            <div className="info-item">
              <span className="label">Account Type:</span>
              <span className="value badge">
                {user?.userType === 'jobseeker' ? '💼 Job Seeker' : '🏢 Employer'}
              </span>
            </div>
            <div className="info-item">
              <span className="label">Member Since:</span>
              <span className="value">
                {user?.createdAt?.toDate?.().toLocaleDateString() || 'Just now'}
              </span>
            </div>
          </div>

          {/* User Type Specific Content */}
          {user?.userType === 'jobseeker' ? (
            <div className="dashboard-section">
              <h2>Job Seeker Dashboard</h2>
              <p>Browse job listings, apply for positions, and track your applications.</p>
              <button className="primary-btn">Browse Jobs</button>
            </div>
          ) : (
            <div className="dashboard-section">
              <h2>Employer Dashboard</h2>
              <p>Post job listings, review applications, and manage your company profile.</p>
              <button className="primary-btn">Post a Job</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
