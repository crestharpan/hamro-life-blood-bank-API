const mongoose = require('mongoose');

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

const bloodDonorSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Please enter the Name'],
  },
  contact: {
    type: Number,
    match: /^(97|98)\d{8}$/,
  },
  address: {
    type: locationSchema,
  },
  habits: [String],
  lastDonationDate: {
    type: Date,
  },
  dateOfBirth: {
    type: Date,
    required: [true, 'please specify your birth date'],
  },
  bloodGroup: {
    type: String,
    required: [true, 'Please enter your blood group'],
  },
  donorType: {
    type: String,
    enum: ['paid', 'free'],
    default: 'free',
    required: [true, 'Speify whether paid or not'],
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'others'],
    required: [true, 'Mention your gender'],
  },
  status: {
    type: String,
    enum: ['Active', 'Not Active'],
    default: 'Active',
  },
});
const bloodDonor = mongoose.model('bloodDonor', bloodDonorSchema);
module.exports = bloodDonor;
