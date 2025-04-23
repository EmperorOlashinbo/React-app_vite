import { useState, useEffect } from 'react';
import axios from 'axios';

const AssignmentTable = () => {
  const [assignments, setAssignments] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'start_date', direction: 'desc' });

  // Fetch assignments from backend
  const fetchAssignments = async () => {
    try {
      const response = await axios.get('/api/project-assignments');
      setAssignments(response.data);
    } catch (err) {
      console.error('Error fetching assignments:', err);
    }
  };
  // Initial fetch and auto-refresh every minute
  useEffect(() => {
    fetchAssignments();
    const interval = setInterval(fetchAssignments, 60000); // Refresh every 60 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  // Handle column sorting
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    // Sort assignments
    const sortedAssignments = [...assignments].sort((a, b) => {
      let aValue = a[key];
      let bValue = b[key];

      if (key === 'employee_id') {
        aValue = a.employee_id.full_name;
        bValue = b.employee_id.full_name;
      } else if (key === 'project_code') {
        aValue = a.project_code.project_name;
        bValue = b.project_code.project_name;
      } else if (key === 'start_date') {
        aValue = new Date(a.start_date);
        bValue = new Date(b.start_date);
      }

      if (aValue < bValue) return direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    setAssignments(sortedAssignments);
  };
  return (
    <table className="assignment-table">
      <thead>
        <tr>
          <th
            className="table-header"
            onClick={() => handleSort('employee_id')}
          >
            Employee ID {sortConfig.key === 'employee_id' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
          </th>
          <th
            className="table-header"
            onClick={() => handleSort('employee_id')}
          >
            Employee Name {sortConfig.key === 'employee_id' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
          </th>
          <th
            className="table-header"
            onClick={() => handleSort('project_code')}
          >
            Project Name {sortConfig.key === 'project_code' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
          </th>
          <th
            className="table-header"
            onClick={() => handleSort('start_date')}
          >
            Start Date {sortConfig.key === 'start_date' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
          </th>
        </tr>
      </thead>
      <tbody>
        {assignments.map((assignment) => (
          <tr key={assignment._id}>
            <td className="table-cell">{assignment.employee_id.employee_id}</td>
            <td className="table-cell">{assignment.employee_id.full_name}</td>
            <td className="table-cell">{assignment.project_code.project_name}</td>
            <td className="table-cell">{new Date(assignment.start_date).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AssignmentTable;