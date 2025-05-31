import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import './SigninForm.css';

const SigninForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    mobileNumber: '',
    age: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/signin', formData);
      alert("User registered successfully!");
      setFormData({
        username: '',
        password: '',
        mobileNumber: '',
        age: ''
      });
    } catch (error) {
      alert("Error: " + (error.response?.data?.message || "Server error"));
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="mobileNumber"
            placeholder="Mobile Number"
            value={formData.mobileNumber}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            required
          />
          <button type="submit">Submit</button>
        </form>

        <button
          className="back-btn"
          onClick={() => navigate('/login')}
          style={{ marginTop: '15px' }}
        >
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default SigninForm;
