const { addEmployee } = require('../models/employeeModel');

const createEmployee = async (req, res) => {
  try {
    const employee = await addEmployee(req.body);
    res.status(201).json({ message: 'Employee added successfully', employee });
  } catch (error) {
    console.error('Error adding employee:', error);
    res.status(500).json({ message: 'Server error while adding employee' });
  }
};

module.exports = { createEmployee };
