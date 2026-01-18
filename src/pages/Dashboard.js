import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutUser, getCurrentUser } from '../services/authService';
import { getJobSeekerProfile, getEmployerProfile } from '../services/profileService';
import { getProfileCompletionStatus } from '../services/profileHelperService';
import { auth } from '../services/firebaseConfig';
import JobSeekerProfileForm from '../components/JobSeekerProfileForm';
import EmployerProfileForm from '../components/EmployerProfileForm';
import '../styles/Dashboard.css';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileCompletion, setProfileCompletion] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserAndProfile = async () => {
      try {
        const userData = await getCurrentUser();
        setUser(userData);
        
        if (userData && userData.uid) {
          // Fetch profile based on user type
          try {
            let profile;
            if (userData.userType === 'jobseeker') {
              profile = await getJobSeekerProfile(userData.uid);
            } else if (userData.userType === 'employer') {
              profile = await getEmployerProfile(userData.uid);
            }
            
            if (profile) {
              setProfileData(profile);
              const completion = getProfileCompletionStatus(profile, userData.userType);
              setProfileCompletion(completion.percentage);
            }
          } catch (profileError) {
            console.log('No profile found yet - user can create one');
            setProfileCompletion(0);
          }
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleProfileSave = async (savedProfile) => {
    setProfileData(savedProfile);
    const completion = getProfileCompletionStatus(savedProfile, user.userType);
    setProfileCompletion(completion.percentage);
    setIsEditingProfile(false);
    
    // Refresh user data
    const updatedUser = await getCurrentUser();
    setUser(updatedUser);
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
  const displayName = profileData 
    ? (isJobSeeker ? `${profileData.firstName} ${profileData.lastName}`.trim() : profileData.companyName)
    : user?.displayName || 'User';

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
              <span>{displayName.split(' ')[0] || 'User'}</span>
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
            <h1>Welcome back, <span className="highlight">{displayName.split(' ')[0] || 'User'}</span>!</h1>
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
                <div className="stat-card">
                  <div className="stat-icon">📈</div>
                  <div className="stat-content">
                    <div className="stat-value">{profileCompletion}%</div>
                    <div className="stat-label">Profile</div>
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
                <div className="stat-card">
                  <div className="stat-icon">📈</div>
                  <div className="stat-content">
                    <div className="stat-value">{profileCompletion}%</div>
                    <div className="stat-label">Profile</div>
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
            onClick={() => { setActiveTab('profile'); setIsEditingProfile(false); }}
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
                {/* Profile Summary Card */}
                <div className="overview-summary-card">
                  <div className="summary-header">
                    <div className="summary-avatar">
                      {displayName?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div className="summary-info">
                      <h2>{displayName || 'User'}</h2>
                      <p className="summary-subtitle">
                        {isJobSeeker 
                          ? (profileData?.headline || 'Job Seeker') 
                          : (profileData?.industry || 'Employer')}
                      </p>
                      {isJobSeeker && profileData?.currentCity && (
                        <p className="summary-location">
                          📍 {profileData.currentCity}{profileData.state ? `, ${profileData.state}` : ''}
                        </p>
                      )}
                      {!isJobSeeker && profileData?.city && (
                        <p className="summary-location">
                          📍 {profileData.city}{profileData.state ? `, ${profileData.state}` : ''}
                        </p>
                      )}
                    </div>
                    <div className="summary-completion">
                      <div className="completion-circle">
                        <svg viewBox="0 0 36 36" className="circular-chart">
                          <path
                            className="circle-bg"
                            d="M18 2.0845
                              a 15.9155 15.9155 0 0 1 0 31.831
                              a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                          <path
                            className="circle"
                            strokeDasharray={`${profileCompletion}, 100`}
                            d="M18 2.0845
                              a 15.9155 15.9155 0 0 1 0 31.831
                              a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                          <text x="18" y="20.35" className="percentage">{profileCompletion}%</text>
                        </svg>
                      </div>
                      <p className="completion-label">Profile Complete</p>
                    </div>
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
                        <button 
                          className="action-btn secondary"
                          onClick={() => { setActiveTab('profile'); setIsEditingProfile(true); }}
                        >
                          <span className="action-icon">✏️</span>
                          <span>Edit Profile</span>
                        </button>
                        <button className="action-btn secondary">
                          <span className="action-icon">⭐</span>
                          <span>Saved Jobs</span>
                        </button>
                        <button className="action-btn secondary">
                          <span className="action-icon">📊</span>
                          <span>My Applications</span>
                        </button>
                      </>
                    ) : (
                      <>
                        <button className="action-btn primary">
                          <span className="action-icon">✍️</span>
                          <span>Post a Job</span>
                        </button>
                        <button 
                          className="action-btn secondary"
                          onClick={() => { setActiveTab('profile'); setIsEditingProfile(true); }}
                        >
                          <span className="action-icon">✏️</span>
                          <span>Edit Profile</span>
                        </button>
                        <button className="action-btn secondary">
                          <span className="action-icon">📋</span>
                          <span>My Listings</span>
                        </button>
                        <button className="action-btn secondary">
                          <span className="action-icon">👥</span>
                          <span>View Candidates</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Recent Activity Summary */}
                <div className="overview-activity">
                  <h3>Recent Activity</h3>
                  <div className="activity-cards-grid">
                    <div className="activity-mini-card">
                      <div className="mini-card-icon">📝</div>
                      <div className="mini-card-content">
                        <p className="mini-card-title">Profile Updates</p>
                        <p className="mini-card-value">0</p>
                      </div>
                    </div>
                    <div className="activity-mini-card">
                      <div className="mini-card-icon">👁️</div>
                      <div className="mini-card-content">
                        <p className="mini-card-title">Profile Views</p>
                        <p className="mini-card-value">0</p>
                      </div>
                    </div>
                    <div className="activity-mini-card">
                      <div className="mini-card-icon">🔔</div>
                      <div className="mini-card-content">
                        <p className="mini-card-title">Notifications</p>
                        <p className="mini-card-value">0</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="tab-pane active">
              <div className="profile-section">
                {!isEditingProfile ? (
                  <>
                    {/* Account Details Card */}
                    <div className="user-info-card">
                      <div className="card-header">
                        <h3>Your Account Details</h3>
                        <span className="account-type-badge">
                          {isJobSeeker ? '💼 Job Seeker' : '🏢 Employer'}
                        </span>
                      </div>
                      
                      <div className="info-section">
                        <div className="info-item">
                          <span className="label">📧 Email Address:</span>
                          <span className="value">
                            {user?.email || 'Loading...'}
                          </span>
                        </div>
                      </div>

                      <div className="info-section">
                        <div className="info-item">
                          <span className="label">👤 {isJobSeeker ? 'Full Name:' : 'Company Name:'}</span>
                          <span className="value">
                            {displayName || 'Not provided'}
                          </span>
                        </div>
                      </div>

                      <div className="info-section">
                        <div className="info-item">
                          <span className="label">💼 Account Type:</span>
                          <span className="value type-badge">
                            {user?.userType === 'jobseeker' ? '💼 Job Seeker' : user?.userType === 'employer' ? '🏢 Employer' : 'Unknown'}
                          </span>
                        </div>
                      </div>

                      <div className="info-section">
                        <div className="info-item">
                          <span className="label">📅 Member Since:</span>
                          <span className="value">
                            {user?.createdAt ? 
                              (typeof user.createdAt === 'object' && user.createdAt.toDate 
                                ? user.createdAt.toDate().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
                                : new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
                              ) 
                              : 'Today'
                            }
                          </span>
                        </div>
                      </div>

                      <div className="info-section">
                        <div className="info-item">
                          <span className="label">📈 Profile Completion:</span>
                          <span className="value">
                            <span className={`completion-badge ${profileCompletion === 100 ? 'complete' : profileCompletion >= 50 ? 'in-progress' : 'incomplete'}`}>
                              {profileCompletion}%
                            </span>
                          </span>
                        </div>
                      </div>

                      <div className="info-section">
                        <div className="info-item">
                          <span className="label">⚙️ Account Status:</span>
                          <span className="value status-badge active">✓ Active & Verified</span>
                        </div>
                      </div>

                      <div className="account-actions">
                        <button 
                          className="profile-edit-btn"
                          onClick={() => setIsEditingProfile(true)}
                        >
                          ✏️ Edit Profile
                        </button>
                      </div>
                    </div>

                    {/* Profile View Mode */}
                    {isJobSeeker ? (
                      <div className="profile-content">
                        <div className="profile-card">
                          <h3>📋 Personal Information</h3>
                          <div className="profile-field">
                            <label>Full Name</label>
                            <div className="field-value">
                              {profileData?.firstName && profileData?.lastName 
                                ? `${profileData.firstName} ${profileData.lastName}` 
                                : 'Not provided'}
                            </div>
                          </div>
                          <div className="profile-field">
                            <label>Email Address</label>
                            <div className="field-value">{profileData?.email || user?.email || 'Not provided'}</div>
                          </div>
                          <div className="profile-field">
                            <label>Phone Number</label>
                            <div className="field-value">{profileData?.phoneNumber || 'Not provided'}</div>
                          </div>
                          <div className="profile-field">
                            <label>Location</label>
                            <div className="field-value">
                              {profileData?.currentCity 
                                ? `${profileData.currentCity}${profileData.state ? `, ${profileData.state}` : ''}${profileData.country ? `, ${profileData.country}` : ''}`
                                : 'Not provided'}
                            </div>
                          </div>
                        </div>

                        <div className="profile-card">
                          <h3>💼 Professional Information</h3>
                          <div className="profile-field">
                            <label>Professional Headline</label>
                            <div className={`field-value ${!profileData?.headline ? 'placeholder-text' : ''}`}>
                              {profileData?.headline || 'Add your professional headline'}
                            </div>
                          </div>
                          <div className="profile-field">
                            <label>Professional Summary</label>
                            <div className={`field-value ${!profileData?.professionalSummary ? 'placeholder-text' : ''}`}>
                              {profileData?.professionalSummary || 'Add your professional summary'}
                            </div>
                          </div>
                          <div className="profile-field">
                            <label>Years of Experience</label>
                            <div className="field-value">
                              {profileData?.experience !== undefined ? `${profileData.experience} years` : 'Not specified'}
                            </div>
                          </div>
                          <div className="profile-field">
                            <label>Expected Salary</label>
                            <div className="field-value">
                              {profileData?.salaryExpectation ? `$${profileData.salaryExpectation.toLocaleString()}/year` : 'Not specified'}
                            </div>
                          </div>
                        </div>

                        <div className="profile-card">
                          <h3>🎯 Skills & Preferences</h3>
                          <div className="profile-field">
                            <label>Skills</label>
                            <div className="field-value">
                              {profileData?.skills && profileData.skills.length > 0 ? (
                                <div className="skills-display">
                                  {profileData.skills.map((skill, index) => (
                                    <span key={index} className="skill-badge">{skill}</span>
                                  ))}
                                </div>
                              ) : (
                                <span className="placeholder-text">Add your skills</span>
                              )}
                            </div>
                          </div>
                          <div className="profile-field">
                            <label>Preferred Job Types</label>
                            <div className="field-value">
                              {profileData?.preferredJobTypes && profileData.preferredJobTypes.length > 0 
                                ? profileData.preferredJobTypes.join(', ') 
                                : 'Not specified'}
                            </div>
                          </div>
                          <div className="profile-field">
                            <label>Willing to Relocate</label>
                            <div className="field-value">
                              {profileData?.willingToRelocate ? 'Yes' : 'No'}
                            </div>
                          </div>
                          <div className="profile-field">
                            <label>Open to Work</label>
                            <div className="field-value">
                              {profileData?.openToWork !== false ? 'Yes' : 'No'}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="profile-content">
                        <div className="profile-card">
                          <h3>🏢 Company Information</h3>
                          <div className="profile-field">
                            <label>Company Name</label>
                            <div className="field-value">{profileData?.companyName || 'Not provided'}</div>
                          </div>
                          <div className="profile-field">
                            <label>Industry</label>
                            <div className="field-value">{profileData?.industry || 'Not specified'}</div>
                          </div>
                          <div className="profile-field">
                            <label>Company Size</label>
                            <div className="field-value">{profileData?.companySize || 'Not specified'}</div>
                          </div>
                          <div className="profile-field">
                            <label>Founded Year</label>
                            <div className="field-value">{profileData?.foundedYear || 'Not specified'}</div>
                          </div>
                          <div className="profile-field">
                            <label>Website</label>
                            <div className="field-value">
                              {profileData?.website ? (
                                <a href={profileData.website} target="_blank" rel="noopener noreferrer" className="website-link">
                                  {profileData.website}
                                </a>
                              ) : (
                                'Not provided'
                              )}
                            </div>
                          </div>
                          <div className="profile-field">
                            <label>Description</label>
                            <div className={`field-value ${!profileData?.companyDescription ? 'placeholder-text' : ''}`}>
                              {profileData?.companyDescription || 'Add your company description'}
                            </div>
                          </div>
                        </div>

                        <div className="profile-card">
                          <h3>📍 Contact Information</h3>
                          <div className="profile-field">
                            <label>Email Address</label>
                            <div className="field-value">{profileData?.email || user?.email || 'Not provided'}</div>
                          </div>
                          <div className="profile-field">
                            <label>Phone Number</label>
                            <div className="field-value">{profileData?.phoneNumber || 'Not provided'}</div>
                          </div>
                          <div className="profile-field">
                            <label>Contact Person</label>
                            <div className="field-value">{profileData?.contactPersonName || 'Not provided'}</div>
                          </div>
                          <div className="profile-field">
                            <label>Office Address</label>
                            <div className="field-value">
                              {profileData?.officeAddress 
                                ? `${profileData.officeAddress}, ${profileData.city || ''}${profileData.state ? `, ${profileData.state}` : ''}`
                                : 'Not provided'}
                            </div>
                          </div>
                        </div>

                        <div className="profile-card">
                          <h3>📄 Legal Information</h3>
                          <div className="profile-field">
                            <label>Registration Number</label>
                            <div className="field-value">{profileData?.registrationNumber || 'Not provided'}</div>
                          </div>
                          <div className="profile-field">
                            <label>Tax ID</label>
                            <div className="field-value">{profileData?.taxId || 'Not provided'}</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  // Profile Edit Mode
                  <div className="profile-edit-container">
                    <div className="edit-header">
                      <h2>✏️ Edit Your Profile</h2>
                      <button 
                        className="btn-cancel"
                        onClick={() => setIsEditingProfile(false)}
                      >
                        Cancel
                      </button>
                    </div>
                    {isJobSeeker ? (
                      <JobSeekerProfileForm 
                        userId={auth.currentUser?.uid} 
                        onSave={handleProfileSave}
                      />
                    ) : (
                      <EmployerProfileForm 
                        userId={auth.currentUser?.uid}
                        onSave={handleProfileSave}
                      />
                    )}
                  </div>
                )}
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
                    <p className="placeholder-subtext">Your activities will appear here once you start using the platform</p>
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
