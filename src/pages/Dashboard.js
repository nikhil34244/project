import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutUser, getCurrentUser } from '../services/authService';
import '../styles/Dashboard.css';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
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

  const isJobSeeker = user?.userType === 'jobseeker';

  return (
    <div className="dashboard-page">
      {/* Navbar */}
      <nav className="dashboard-navbar">
        <div className="nav-container">
          <div className="logo-section">
            <h2 className="logo">JobPortal</h2>
            <span className="tagline">Your Career Starts Here</span>
          </div>
          <div className="nav-actions">
            <button className="profile-menu-btn">
              <span className="user-icon">👤</span>
              <span>{user?.displayName?.split(' ')[0] || 'User'}</span>
            </button>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div className="dashboard-content">
        {/* Header with Stats */}
        <div className="dashboard-header">
          <div className="header-info">
            <h1>Welcome back, <span className="highlight">{user?.displayName || 'User'}</span>!</h1>
            <p className="header-subtitle">Manage your career and opportunities</p>
          </div>
          <div className="quick-stats">
            {isJobSeeker ? (
              <>
                <div className="stat-card">
                  <div className="stat-icon">📊</div>
                  <div className="stat-content">
                    <div className="stat-value">0</div>
                    <div className="stat-label">Applications</div>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">⭐</div>
                  <div className="stat-content">
                    <div className="stat-value">0</div>
                    <div className="stat-label">Saved Jobs</div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="stat-card">
                  <div className="stat-icon">📝</div>
                  <div className="stat-content">
                    <div className="stat-value">0</div>
                    <div className="stat-label">Job Posts</div>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">📋</div>
                  <div className="stat-content">
                    <div className="stat-value">0</div>
                    <div className="stat-label">Applications</div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="tab-navigation">
          <button 
            className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <span className="tab-icon">📊</span> Overview
          </button>
          <button 
            className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <span className="tab-icon">👤</span> Profile
          </button>
          <button 
            className={`tab-btn ${activeTab === 'activity' ? 'active' : ''}`}
            onClick={() => setActiveTab('activity')}
          >
            <span className="tab-icon">🔔</span> Activity
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === 'overview' && (
            <div className="tab-pane active">
              <div className="welcome-section">
                <div className="user-info-card">
                  <div className="card-header">
                    <h3>Account Information</h3>
                    <span className="account-type-badge">
                      {isJobSeeker ? '💼 Job Seeker' : '🏢 Employer'}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="label">📧 Email:</span>
                    <span className="value">{user?.email}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">👤 Name:</span>
                    <span className="value">{user?.displayName || 'Not set'}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">📅 Member Since:</span>
                    <span className="value">
                      {user?.createdAt?.toDate?.().toLocaleDateString() || 'Just now'}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="label">⚙️ Account Status:</span>
                    <span className="value status-badge active">Active</span>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="quick-actions">
                  <h3>Quick Actions</h3>
                  <div className="actions-grid">
                    {isJobSeeker ? (
                      <>
                        <button className="action-btn primary">
                          <span className="action-icon">🔍</span>
                          <span>Browse Jobs</span>
                        </button>
                        <button className="action-btn secondary">
                          <span className="action-icon">⭐</span>
                          <span>Saved Jobs</span>
                        </button>
                        <button className="action-btn secondary">
                          <span className="action-icon">📄</span>
                          <span>My Resume</span>
                        </button>
                        <button className="action-btn secondary">
                          <span className="action-icon">📊</span>
                          <span>Analytics</span>
                        </button>
                      </>
                    ) : (
                      <>
                        <button className="action-btn primary">
                          <span className="action-icon">✍️</span>
                          <span>Post a Job</span>
                        </button>
                        <button className="action-btn secondary">
                          <span className="action-icon">📋</span>
                          <span>My Listings</span>
                        </button>
                        <button className="action-btn secondary">
                          <span className="action-icon">👥</span>
                          <span>Candidates</span>
                        </button>
                        <button className="action-btn secondary">
                          <span className="action-icon">📊</span>
                          <span>Analytics</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="tab-pane active">
              <div className="profile-section">
                <h2>Edit Profile</h2>
                <div className="profile-form-placeholder">
                  <div className="placeholder-card">
                    <span className="placeholder-icon">👤</span>
                    <p>Complete your profile to get better matches</p>
                    <button className="action-btn primary">Edit Profile</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="tab-pane active">
              <div className="activity-section">
                <h2>Recent Activity</h2>
                <div className="activity-placeholder">
                  <div className="placeholder-card">
                    <span className="placeholder-icon">🔔</span>
                    <p>No recent activity</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
