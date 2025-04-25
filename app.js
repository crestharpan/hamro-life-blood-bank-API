const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const userRequestRouter = require('./Routes/userRequestRouter');
const bloodBankRouter = require('./Routes/bloodBankRouter');
const bloodDonorRouter = require('./Routes/bloodDonorRouter');

const cors = require('cors');

app.use(bodyParser.json());
//IT WILL RETURN REQ HEADER
app.use(morgan('dev'));

//ROUTES
app.use('/api/V1/admin/bloodrequests', userRequestRouter);
app.use('/api/V1/admin/bloodBank', bloodBankRouter);
app.use('/api/V1/admin/bloodDonor', bloodDonorRouter);
app.use('/api/V1/admin/getCities', userRequestRouter);

module.exports = app;
