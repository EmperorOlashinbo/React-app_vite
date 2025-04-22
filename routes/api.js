const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');

// POST /api/employees - Add new employee
router.post('/employees', async (req, res) => {
  try {
    const { employee_id, full_name, email, hashed_password } = req.body;
    const existingEmployee = await Employee.findOne({ employee_id });
    if (existingEmployee) {
      return res.status(400).json({ error: `Employee with employee_id ${employee_id} already exists` });
    }
    const employee = new Employee({ employee_id, full_name, email, hashed_password });
    await employee.save();
    res.status(201).json(employee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});