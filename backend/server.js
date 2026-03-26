require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Serve frontend static files
app.use(express.static(path.join(__dirname, '../frontend')));

// DB connection
const connectDB = require('./config/db');
connectDB();

// Routes
const gradeRoutes = require('./routes/grades');
const analyticsRoutes = require('./routes/analytics');
const submissionRoutes = require('./routes/submissions');

app.use('/api', gradeRoutes);
app.use('/api', analyticsRoutes);
app.use('/api', submissionRoutes);

// Serve landing page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "An error occurred",
    error: err.message
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found"
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
