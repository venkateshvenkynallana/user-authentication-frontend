import React, { useState } from "react";
import "./Register.css";
import { authAPI, setAuthToken, setUserData } from '../routes';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNo: "",
    designation: "",
    password: "",
    bio: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();

  const validate = () => {
    let newErrors = {};

    if (!formData.fullName.trim())
      newErrors.fullName = "Full Name is required";

    if (!formData.email)
      newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Invalid email format";

   

    if (!formData.designation.trim())
      newErrors.designation = "Designation is required";

    if (!formData.password)
      newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    
    if (validate()) {
      setLoading(true);
      try {
        const response = await authAPI.signUp(formData);
        
        // Show success toast
        toast.success('Registration successful! Please login.');
        
        // Navigate to login page
        navigate('/login');
      } catch (err) {
        setApiError(err.message || 'Registration failed. Please try again.');
        // Show error toast
        toast.error(err.message || 'Registration failed. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Create Account</h2>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              placeholder="Enter full name"
              value={formData.fullName}
              onChange={handleChange}
            />
            {errors.fullName && <p className="error">{errors.fullName}</p>}
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="text"
              name="phoneNo"
              placeholder="Enter phone number"
              value={formData.phoneNo}
              onChange={handleChange}
            />
            {errors.phoneNo && <p className="error">{errors.phoneNo}</p>}
          </div>

          <div className="form-group">
            <label>Designation</label>
            <input
              type="text"
              name="designation"
              placeholder="Enter designation"
              value={formData.designation}
              onChange={handleChange}
            />
            {errors.designation && <p className="error">{errors.designation}</p>}
          </div>

          <div className="form-group password-group">
            <label>Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
              />
              <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>
            {errors.password && <p className="error">{errors.password}</p>}
          </div>

          <div className="form-group">
            <label>Bio (Optional)</label>
            <textarea
              name="bio"
              rows="3"
              placeholder="Tell something about yourself"
              value={formData.bio}
              onChange={handleChange}
            />
          </div>

          {apiError && <div className="error-message" style={{ color: 'red', marginBottom: '15px', textAlign: 'center' }}>{apiError}</div>}

          <button type="submit" className="register-btn" disabled={loading}>
            {loading ? 'Creating Account...' : 'Register'}
          </button>

        </form>
      </div>
    </div>
  );
};

export default Register;