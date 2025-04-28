const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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

adminSchema.pre('save', async function (next) {
  //IF PASSWORD IS NOT MODIFIED RETURN DON NOT EXECUTE THIS MIDDLEWARE
  if (!this.isModified('password')) return;

  //HAS THE PASSWORD BEFORE SAVING TO THE DB
  this.password = await bcrypt.hash(this.password, 12);

  next();
});

const admin = mongoose.model('admin', adminSchema);
module.exports = admin;
