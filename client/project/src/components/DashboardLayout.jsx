// components/DashboardLayout.jsx
import React, { useState, useEffect, useRef } from 'react';
import './Dashboard.css';
import logo from '../assets/school.png';
import userIcon from '../assets/user.jpg';
import Sidebar from './Sidebar';
import { Outlet, useNavigate } from 'react-router-dom';

const DashboardLayout = () => {
  const [userInfo, setUserInfo] = useState({ username: 'Admin', role: 'Administrator', mobile: '' });
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('userInfo');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUserInfo({
          username: parsedUser.useri.username || 'Admin',
          role: parsedUser.role || 'Administrator',
          mobile: parsedUser.useri.mobile_number || '',
        });
      } catch (e) {
        console.error("Invalid user info in localStorage");
      }
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <header className="top-navbar">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
          <h2>QuadSync Technology</h2>
        </div>

        <div className="user-info" onClick={() => setShowDropdown(!showDropdown)} ref={dropdownRef}>
          <span className="online-dot"></span>
          <span className="user-name">
            {userInfo.role} {userInfo.username} ▾
          </span>
          {showDropdown && (
            <div className="user-dropdown">
              <img src={userIcon} alt="User" className="dropdown-user-img" />
              <p><strong>Username:</strong> {userInfo.username}</p>
              <p><strong>Role:</strong> {userInfo.role}</p>
              <p><strong>Mobile:</strong> {userInfo.mobile || 'N/A'}</p>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </header>

      <div className="content-area">
        <Sidebar />
        <div className="main-area">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
