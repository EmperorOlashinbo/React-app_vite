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
    } catch (err) {
    console.error('Error seeding database:', err);
    } finally {
    mongoose.connection.close();
    }
};