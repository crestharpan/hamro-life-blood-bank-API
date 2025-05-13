const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cors = require('cors');
const adminRouter = require('./Routes/adminRouter');

// 1. Enable CORS first
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// 2. Request logging
app.use(morgan('dev'));

// 3. Body parsing middleware (Express built-in)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 4. Security middleware (AFTER body parsing)
app.use(mongoSanitize());
app.use(xss());

// 5. Routes
app.use('/api/V1/admin', adminRouter);

// 6. Only one app.listen()
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;