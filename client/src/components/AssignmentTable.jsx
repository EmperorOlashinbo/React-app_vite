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