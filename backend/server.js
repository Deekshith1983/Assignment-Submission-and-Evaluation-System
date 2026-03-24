const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

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

// Test route
app.get('/', (req, res) => {
  res.send("Server is running...");
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});