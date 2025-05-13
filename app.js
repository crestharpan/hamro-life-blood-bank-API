const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoSantitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const adminRouter = require('./Routes/adminRouter');

const cors = require('cors');

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true, // if you're using cookies or sessions
  })
);

app.use(bodyParser.json());
//IT WILL RETURN REQ HEADER
app.use(morgan('dev'));

//DATA SANITIZATION AGAINST NOSQL QUERY INJECTION
// app.use(mongoSantitize());

// //DATA SANTIZATION AGAINST CROSS-SITE ATTACK
// app.use(xss());

//ROUTE FOR THE ADMIN
app.use('/api/V1/admin', adminRouter);

module.exports = app;
