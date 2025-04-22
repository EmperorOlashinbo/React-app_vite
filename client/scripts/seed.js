const mongoose = require('mongoose');
const Employee = require('../models/Employee');
const Project = require('../models/Project');
const ProjectAssignment = require('../models/ProjectAssignment');
require('dotenv').config();

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const seedDB = async () => {
    try {
      // Clear existing data
      await Employee.deleteMany({});
      await Project.deleteMany({});
      await ProjectAssignment.deleteMany({});
  
      // Seed Employees
      const employees = [
        { employee_id: 'E001', full_name: 'Sonia Ibrahim', email: 'xoxo@example.com', hashed_password: 'hash1' },
        { employee_id: 'E002', full_name: 'Profesor Darwish', email: 'darwish@example.com', hashed_password: 'hash2' },
        { employee_id: 'E003', full_name: 'Omer Bey', email: 'omer@example.com', hashed_password: 'hash3' },
        { employee_id: 'E004', full_name: 'Ibrahim Olasunbo', email: 'ibrahim@example.com', hashed_password: 'hash4' },
        { employee_id: 'E005', full_name: 'Umar Faruq', email: 'umar@example.com', hashed_password: 'hash5' }
      ];
      await Employee.insertMany(employees);
      console.log('Employees seeded');

      // Seed Projects
    const projects = [
        { project_code: 'P001', project_name: 'Website Redesign', project_description: 'Redesign company website' },
        { project_code: 'P002', project_name: 'Mobile App', project_description: 'Develop mobile application' },
        { project_code: 'P003', project_name: 'Database Migration', project_description: 'Migrate to new DB' },
        { project_code: 'P004', project_name: 'API Integration', project_description: 'Integrate third-party APIs' },
        { project_code: 'P005', project_name: 'Security Audit', project_description: 'Conduct security audit' }
      ];
      await Project.insertMany(projects);
      console.log('Projects seeded');

      // Seed Project Assignments
    const assignments = [
        { employee_id: 'E001', project_code: 'P001', start_date: new Date('2025-01-01') },
        { employee_id: 'E002', project_code: 'P002', start_date: new Date('2025-02-01') },
        { employee_id: 'E003', project_code: 'P003', start_date: new Date('2025-03-01') },
        { employee_id: 'E004', project_code: 'P004', start_date: new Date('2025-04-01') },
        { employee_id: 'E005', project_code: 'P005', start_date: new Date('2025-05-01') }
      ];
      await ProjectAssignment.insertMany(assignments);
      console.log('Project Assignments seeded');

    } catch (err) {
    console.error('Error seeding database:', err);
    } finally {
    mongoose.connection.close();
    }
};
seedDB()