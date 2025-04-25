const mongoose = require('mongoose');
const validator = require('validator');

const locationSchema = mongoose.Schema({
  province: {
    type: String,
    required: [true, 'Enter the Province'],
  },
  city: {
    type: String,
    required: [true, 'Enter the city'],
  },
});

const userRequestSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'A user must have a name'],
  },
  units: {
    type: Number,
    reuqired: [true, 'A user must mention the total units'],
  },
  hospitalName: {
    type: String,
    required: [true],
  },
  hospitalAddress: {
    type: String,
    required: [true],
  },
  location: {
    type: locationSchema,
  },
  contact: {
    type: Number,
    match: /^(97|98)\d{8}$/,
  },
  bloodGroup: {
    type: String,
    required: [true, 'must mention the blood type'],
  },
  email: {
    type: String,
    required: [true, 'A email is required'],
    validate: [validator.isEmail],
  },
  dateOfBirth: {
    type: Date,
    required: [true, 'Must specify the birth date'],
  },
  photo: {
    type: String,
    required: [true, 'Please provide your photo'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  status: {
    type: Boolean,
    default: true,
  },
});
const userRequest = mongoose.model('userRequest', userRequestSchema);

module.exports = userRequest;
