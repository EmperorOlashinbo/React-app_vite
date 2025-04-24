import AssignmentTable from './components/AssignmentTable';

// This is the main App component that renders the AssignmentTable component
// It serves as the entry point for the React application
// It imports the AssignmentTable component and renders it within a container
// The App component is styled with a container class and a heading
// The heading displays the title "Project Assignments"
// The AssignmentTable component is responsible for displaying the assignment data in a table format
function App() {
  return (
    <div className="container">
      <h1 className="heading">Project Assignments</h1>
      <AssignmentTable />
    </div>
  );
}

export default App;