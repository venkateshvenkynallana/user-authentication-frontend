import React, { useState, useEffect } from 'react';
import { getUserData, clearAuthData } from '../routes';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Get user data from localStorage
    const user = getUserData();
    if (user) {
      setUserData(user);
      setLoading(false);
    } else {
      // No user data found, redirect to login
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    clearAuthData();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (!userData) {
    return null; // Will redirect to login
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <span className="dashboard-logo">User Dashboard</span>
        <div className="dashboard-nav">
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>

      <div className="user-profile">
        <div className="profile-header">
          <div className="avatar">
            {userData.fullName.charAt(0).toUpperCase()}
          </div>
          <h2>Welcome, {userData.fullName}!</h2>
          <p className="user-email">{userData.email}</p>
        </div>

        <div className="user-details">
          <div className="detail-card">
            <h3>Personal Information</h3>
            <div className="detail-item">
              <span className="label">Full Name:</span>
              <span className="value">{userData.fullName}</span>
            </div>
            <div className="detail-item">
              <span className="label">Email:</span>
              <span className="value">{userData.email}</span>
            </div>
            <div className="detail-item">
              <span className="label">Phone Number:</span>
              <span className="value">{userData.phoneNo}</span>
            </div>
            <div className="detail-item">
              <span className="label">Designation:</span>
              <span className="value">{userData.designation}</span>
            </div>
          </div>

          {userData.bio && (
            <div className="detail-card">
              <h3>About Me</h3>
              <p className="bio">{userData.bio}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard