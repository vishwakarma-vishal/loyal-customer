// /backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const logsRouter = require('./routes/logs');
const loyalCustomersRouter = require('./routes/loyalCustomers');

require('dotenv').config();

const app = express();
app.use(express.json()); // Parse JSON bodies
app.use(cors()); // Allow cross-origin requests

// MongoDB connection
const DB_URL = process.env.MONGO_URL;
mongoose.connect(DB_URL)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// API routes
app.use('/api', logsRouter);
app.use('/api', loyalCustomersRouter);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
