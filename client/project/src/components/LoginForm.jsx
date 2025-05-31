import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./LoginForm.css";

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        'http://localhost:5000/api/login',
        {
          username: username.trim(),
          password: password.trim(),
        },
        { withCredentials: true }
      );

      const userData = response.data;

      localStorage.setItem("userInfo", JSON.stringify(userData));

      navigate('/dashboard');
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed: " + (error?.response?.data?.message || "Server error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login Page</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="extra-links">
          <a
            href="#"
            className="forgot-link"
            onClick={(e) => {
              e.preventDefault();
              navigate('/forgot-password');
            }}
          >
            Forgot Password?
          </a>

          <button
            type="button"
            className="signin-btn"
            onClick={() => navigate('/signin')}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
