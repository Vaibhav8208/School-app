const express = require('express');
const router = express.Router();
const { createEmployee } = require('../controllers/employeeController');

router.post('/employees', createEmployee);

module.exports = router;
