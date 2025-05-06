const mongoose = require('mongoose');
// const validator = require('validator');

const locationSchema = mongoose.Schema({
  province: {
    type: String,
    required: [true, 'Enter the province name'],
  },
  city: {
    type: String,
    required: [true, 'Enter the city name'],
  },
  street: {
    type: String,
    required: [true, 'Enter the street name'],
  },
});

const bloodBankSchema = mongoose.Schema({
  bloodBankName: {
    type: String,
    require: [true, 'Provide a name'],
  },
  contact: {
    type: Number,
    match: /^021\d{6}$/,
  },
  location: {
    type: locationSchema,
  },
  status: {
    type: String,
    default: 'Active',
    enum: ['Active', 'Not Active'],
  },
});
const bloodBank = mongoose.model('bloodBank', bloodBankSchema);
module.exports = bloodBank;
