// components/Dashboard.jsx
import React from 'react';

const Dashboard = () => {
  return (
    <>
      <div className="breadcrumb">Dashboard / Admin</div>

      <div className="card-grid">
        <div className="card">
          <p>Book Done Lead Count</p>
          <div className="card-value">0</div>
        </div>
        <div className="card">
          <p>Visit Done Lead Count</p>
          <div className="card-value green">0</div>
        </div>
        <div className="card">
          <p>Project Count</p>
          <div className="card-value">0</div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
