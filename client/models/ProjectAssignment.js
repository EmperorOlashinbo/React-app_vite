const mongoose = require('mongoose');

// Define ProjectAssignment schema
const projectAssignmentSchema = new mongoose.Schema({
  employee_id: { type: String, required: true }, // Custom string ID, not ObjectId
  project_code: { type: String, required: true }, // Custom string code, not ObjectId
  start_date: { type: Date, required: true }
});

module.exports = mongoose.model('ProjectAssignment', projectAssignmentSchema);