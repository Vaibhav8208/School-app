const pool = require('../config/db');

const addEmployee = async (employeeData) => {
  const {
    firstName,
    middleName,
    lastName,
    email,
    mobile,
    address,
    country,
    state,
    district,
    lastYearStatus,
    currentYearStatus,
    lastYearPercentage,
    currentYearPercentage,
    lastYearFees,
    currentYearFees,
    
  } = employeeData;

  const query = `
    INSERT INTO employees (
      first_name, middle_name, last_name, email, mobile, address, country, state, district, 
      last_year_status, current_year_status, last_year_percentage, current_year_percentage, last_year_fees, current_year_fees
    ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15) RETURNING *;
  `;

  const values = [
    firstName, middleName, lastName, email, mobile, address, country, state, district,
    lastYearStatus, currentYearStatus, lastYearPercentage, currentYearPercentage, lastYearFees, currentYearFees
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
};

module.exports = { addEmployee };
