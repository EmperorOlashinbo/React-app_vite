const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/dist')));

// Routes
app.use('/api', require('./routes/api'));

// Connect to MongoDB using Mongoose
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB')) // Log successful connection
  .catch((error) => console.error('MongoDB connection error:', error)); // Log connection errors

let server;

// Start the server
server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})