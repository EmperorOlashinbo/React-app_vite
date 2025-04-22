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
// GET /api/employees - List all employees
router.get('/employees', async (req, res) => {
    try {
      const employees = await Employee.find();
      res.json(employees);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});
// GET /api/employees/:employee_id - Get employee by employee_id
router.get('/employees/:employee_id', async (req, res) => {
  try {
    const { employee_id } = req.params;
    const employee = await Employee.findById(employee_id);
    if (!employee) {
      return res.status(404).json({ error: `Employee with employee_id ${employee_id} not found` });
    }
    res.json(employee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});