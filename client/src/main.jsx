import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// This is the main entry point for the React application
// It imports React, ReactDOM, and the main App component
// It also imports the global CSS styles
// The ReactDOM.createRoot method is used to create a root for the React application
// The App component is rendered within the root element in the HTML
// The React.StrictMode is used to highlight potential problems in the application

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);