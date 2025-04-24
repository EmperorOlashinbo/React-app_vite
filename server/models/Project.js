const mongoose = require('mongoose');

// Define the Employee schema
// The schema defines the structure of the employee data in the database
const projectSchema = new mongoose.Schema({
  project_code: { type: String, required: true, unique: true },
  project_name: { type: String, required: true },
  project_description: { type: String, required: true }
});

module.exports = mongoose.model('Project', projectSchema);