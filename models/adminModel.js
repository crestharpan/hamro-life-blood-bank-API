const mongoose = require('mongoose');
const validator = require('validator');

const adminSchema = mongoose.Schema({
  fullName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    validate: validator.isEmail,
  },
  password: {
    type: String,
    minlength: 6,
    maxlength: 11,
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
});

const admin = mongoose.model('admin', adminSchema);
module.exports = admin;
