const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');
const Project = require('../models/Project');

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
// PUT /api/employees/:employee_id - Update employee by employee_id
router.put('/employees/:employee_id', async (req, res) => {
  try {
    const { employee_id } = req.params;
    const { full_name, email, hashed_password } = req.body;
    const employee = await Employee.findByIdAndUpdate(employee_id, { full_name, email, hashed_password }, { new: true });
    if (!employee) {
      return res.status(404).json({ error: `Employee with employee_id ${employee_id} not found` });
    }
    res.json(employee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
// DELETE /api/employees/:employee_id - Delete employee by employee_id
router.delete('/employees/:employee_id', async (req, res) => {
  try {
    const { employee_id } = req.params;
    const employee = await Employee.findByIdAndDelete(employee_id);
    if (!employee) {
      return res.status(404).json({ error: `Employee with employee_id ${employee_id} not found` });
    }
    res.json({ message: `Employee with employee_id ${employee_id} deleted` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// POST /api/projects - Add new project
router.post('/projects', async (req, res) => {
    try {
      const { project_code, project_name, project_description } = req.body;
      const existingProject = await Project.findOne({ project_code });
      if (existingProject) {
        return res.status(400).json({ error: `Project with project_code ${project_code} already exists` });
      }
      const project = new Project({ project_code, project_name, project_description });
      await project.save();
      res.status(201).json(project);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
});

// GET /api/projects - List all projects
router.get('/projects', async (req, res) => {
    try {
      const projects = await Project.find();
      res.json(projects);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});
// GET /api/projects/:project_code - Get project by project_code
router.get('/projects/:project_code', async (req, res) => {
  try {
    const { project_code } = req.params;
    const project = await Project.findById(project_code);
    if (!project) {
      return res.status(404).json({ error: `Project with project_code ${project_code} not found` });
    }
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// PUT /api/projects/:project_code - Update project by project_code
router.put('/projects/:project_code', async (req, res) => {
  try {
    const { project_code } = req.params;
    const { project_name, project_description } = req.body;
    const project = await Project.findByIdAndUpdate(project_code, { project_name, project_description }, { new: true });
    if (!project) {
      return res.status(404).json({ error: `Project with project_code ${project_code} not found` });
    }
    res.json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
// DELETE /api/projects/:project_code - Delete project by project_code
router.delete('/projects/:project_code', async (req, res) => {
  try {
    const { project_code } = req.params;
    const project = await Project.findByIdAndDelete(project_code);
    if (!project) {
      return res.status(404).json({ error: `Project with project_code ${project_code} not found` });
    }
    res.json({ message: `Project with project_code ${project_code} deleted` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});