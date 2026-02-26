import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import loginBg from '../assets/login-bg.svg';
import '../styles/Login.css';
import { authAPI, setAuthToken, setUserData } from '../routes';
import { toast } from 'react-toastify';

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await authAPI.login({ email, password });
      
      // Store token and user data
      setAuthToken(response.token);
      setUserData(response.userData);
      
      // Show success toast
      toast.success('Login successful! Welcome back!');
      
      // Navigate to dashboard page
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
      // Show error toast
      toast.error(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-container">
      
      {/* Background */}
      <div className="login-background">
        <img src={loginBg} alt="" className="login-bg-image" />
        <div className="login-background-overlay"></div>
      </div>
      
      {/* Floating Effects */}
      <div className="floating-orb orb-1"></div>
      <div className="floating-orb orb-2"></div>
      <div className="floating-orb orb-3"></div>

      {/* Main Login Card */}
      <div className="login-form-container">
        <div className="login-form-card">

          <div className="login-header">
            <div className="login-logo">
              <svg width="40" height="40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>

            <h2 className="login-title">Welcome Back</h2>
            <p className="login-subtitle">
              Sign in to continue to your account
            </p>
          </div>

          <form onSubmit={onSubmitHandler} className="login-form">

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input 
                type="email"
                className="form-input"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input 
                type="password"
                className="form-input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <div className="error-message" style={{ color: 'red', marginBottom: '15px', textAlign: 'center' }}>{error}</div>}

            <button type="submit" className="login-button" disabled={loading}>
              {loading ? 'Signing In...' : 'Sign In'}
            </button>

          </form>

        </div>
      </div>
    </div>
  )
}

export default Login;