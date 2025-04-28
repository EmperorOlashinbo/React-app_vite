require('dotenv').config(); // Load environment variables

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB using Mongoose
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Middleware to parse JSON requests and serve static files
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/dist')));

// Routes
app.use('/api', require('./routes/api'));

let server;

// Start the server
server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})

// Function to handle graceful shutdown of the server and database connection
function shutdown() {
  console.log('Shutting down server...');
  server.close(async () => { // Close the HTTP server
    console.log('HTTP server closed.');
    try {
      await mongoose.connection.close(); // Close the MongoDB connection
      console.log('MongoDB connection closed.');
      process.exit(0); // Exit the process with success code
    } catch (error) {
      console.error('Error closing MongoDB connection:', error); // Log any errors during shutdown
      process.exit(1); // Exit the process with error code
    }
  });
}

// Handle termination signals (e.g., Ctrl+C or system termination)
process.on('SIGINT', shutdown); // Handle Ctrl+C
process.on('SIGTERM', shutdown); // Handle termination signals from the system