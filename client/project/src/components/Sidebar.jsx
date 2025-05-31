import React from 'react';
import './Dashboard.css';
import { FaUser, FaTasks, FaHome, FaFileAlt,FaBook, FaAddressBook} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <h3>Main</h3>
      <ul>
        <li><FaHome /> Dashboard</li>
      </ul>
      <h3>Employees</h3>
      <ul>
         <Link to="/dashboard/employees">
           <FaUser /> Student
        </Link>
        <li><FaTasks /> Leads</li>
        <li><FaBook /> Masters</li>
       <li><FaAddressBook /> 99acres Leads</li>
        <li><FaFileAlt /> Reports</li>
        <li><FaUser /> Customers</li>
        <li><FaFileAlt /> Company Profile</li>
      </ul>
      {/* <h3>Other</h3>
      <ul>
        
      </ul> */}
    </aside>
  );
};

export default Sidebar;