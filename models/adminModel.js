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
    select: false,
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

//INSTANCE METHOD TO COMPARE THE PASSWORD
adminSchema.methods.checkPassword = async function (
  candidatePassword,
  correctPassword
) {
  //RETURNS EITHER TRUE OR FALSE
  return await bcrypt.compare(candidatePassword, correctPassword);
};

const admin = mongoose.model('admin', adminSchema);
module.exports = admin;
