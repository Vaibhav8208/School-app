import React, { useState } from 'react';
import './Employees.css';
import axios from 'axios';

const Employees = () => {
  const countries = ['India', 'USA', 'Canada'];
  const statesByCountry = {
    India: ['Maharashtra', 'Karnataka', 'Delhi'],
    USA: ['California', 'Texas', 'New York'],
    Canada: ['Ontario', 'Quebec', 'Alberta']
  };
  const districtsByState = {
    Maharashtra: ['Pune', 'Mumbai', 'Nagpur'],
    Karnataka: ['Bangalore', 'Mysore', 'Mangalore'],
    Delhi: ['North Delhi', 'South Delhi'],
    California: ['Los Angeles', 'San Diego'],
    Texas: ['Houston', 'Dallas'],
    NewYork: ['New York City', 'Buffalo'],
    Ontario: ['Toronto', 'Ottawa'],
    Quebec: ['Montreal', 'Quebec City'],
    Alberta: ['Calgary', 'Edmonton']
  };

  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    mobile: '',
    address: '',
    country: '',
    state: '',
    district: '',
    lastYearStatus: '',
    currentYearStatus: '',
    lastYearPercentage: '',
    currentYearPercentage: '',
    lastYearFees: '',
    currentYearFees: ''
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email.includes('@')) newErrors.email = 'Valid email required';
    if (formData.mobile.length < 10) newErrors.mobile = 'Mobile must be at least 10 digits';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.country) newErrors.country = 'Country is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.district) newErrors.district = 'District is required';
    if (!formData.lastYearStatus) newErrors.lastYearStatus = 'Last year status is required';
    if (!formData.currentYearStatus) newErrors.currentYearStatus = 'Current year status is required';
    return newErrors;
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'country' ? { state: '', district: '' } : {}),
      ...(name === 'state' ? { district: '' } : {})
    }));
  };

const handleSubmit = async e => {
  e.preventDefault();
  const validationErrors = validate();
  if (Object.keys(validationErrors).length === 0) {
    try {
      const res = await axios.post('http://localhost:5000/api/students', formData);
      console.log('Server Response:', res.data);
      alert('Student added successfully!');
      setFormData({
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
        mobile: '',
        address: '',
        country: '',
        state: '',
        district: '',
        lastYearStatus: '',
        currentYearStatus: '',
        lastYearPercentage: '',
        currentYearPercentage: '',
        lastYearFees: '',
        currentYearFees: '',
      });
      setErrors({});
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was a problem submitting the form.');
    }
  } else {
    setErrors(validationErrors);
  }
};

  return (
    <div className="employee-form-container">
      <h2>Add Student</h2>
      <form onSubmit={handleSubmit} className="employee-form">

        <div className="form-row first-middle-row">
          <div className="form-group">
            <label>First Name</label>
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
            {errors.firstName && <span className="error">{errors.firstName}</span>}
          </div>
          <div className="form-group">
            <label>Middle Name</label>
            <input type="text" name="middleName" value={formData.middleName} onChange={handleChange} />
          </div>
        </div>

        <div className="form-row last-mobile-row">
          <div className="form-group">
            <label>Last Name</label>
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
            {errors.lastName && <span className="error">{errors.lastName}</span>}
          </div>
          <div className="form-group">
            <label>Mobile</label>
            <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} />
            {errors.mobile && <span className="error">{errors.mobile}</span>}
          </div>
        </div>

        <div className="form-row email-row">
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group full-width">
            <label>Address</label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} />
            {errors.address && <span className="error">{errors.address}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Country</label>
            <select name="country" value={formData.country} onChange={handleChange}>
              <option value="">Select Country</option>
              {countries.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            {errors.country && <span className="error">{errors.country}</span>}
          </div>

          <div className="form-group">
            <label>State</label>
            <select name="state" value={formData.state} onChange={handleChange}>
              <option value="">Select State</option>
              {(statesByCountry[formData.country] || []).map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            {errors.state && <span className="error">{errors.state}</span>}
          </div>

          <div className="form-group">
            <label>District</label>
            <select name="district" value={formData.district} onChange={handleChange}>
              <option value="">Select District</option>
              {(districtsByState[formData.state] || []).map(d => <option key={d} value={d}>{d}</option>)}
            </select>
            {errors.district && <span className="error">{errors.district}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Last Year Status</label>
            <input type="text" name="lastYearStatus" value={formData.lastYearStatus} onChange={handleChange} />
            {errors.lastYearStatus && <span className="error">{errors.lastYearStatus}</span>}
          </div>
          <div className="form-group">
            <label>Current Year Status</label>
            <input type="text" name="currentYearStatus" value={formData.currentYearStatus} onChange={handleChange} />
            {errors.currentYearStatus && <span className="error">{errors.currentYearStatus}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Last Year %</label>
            <input type="text" name="lastYearPercentage" value={formData.lastYearPercentage} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Current Year %</label>
            <input type="text" name="currentYearPercentage" value={formData.currentYearPercentage} onChange={handleChange} />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Last Year Fees</label>
            <input type="text" name="lastYearFees" value={formData.lastYearFees} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Current Year Fees</label>
            <input type="text" name="currentYearFees" value={formData.currentYearFees} onChange={handleChange} />
          </div>
        </div>

        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
};

export default Employees;
