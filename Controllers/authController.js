const Admin = require('../models/adminModel');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const Email = require('../utils/email');
const crypto = require('crypto');

const createNewToken = (admin, statusCode, res) => {
  const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  const cookieOptions = {
    expiresIn: new Date(
      Date.now() + process.env.JWT_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
  res.cookie('jwt', token, cookieOptions);

  //REMOVE PASSWORD FROM THE OUTPUT
  admin.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      admin,
    },
  });
};

exports.adminSignup = async (req, res) => {
  const admin = await Admin.create(req.body);
  res.status(200).json({
    status: 'Success',
    admin,
  });
};

exports.login = async (req, res) => {
  //RETRIEVE THE EMAIL AND PASSWORDS
  console.log(req.body);
  const email = req.body.username;
  const password = req.body.password;

  if (!email || !password) return;

  const admin = await Admin.findOne({ email }).select('+password');
  if (!admin || !(await admin.checkPassword(password, admin.password))) {
    return;
  }
  createNewToken(admin, 201, res);
};

exports.logout = async (req, res) => {
  res.cookie('jwt', 'logged out', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({
    status: 'success',
  });
};

exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) return;
  //Verifying the Token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currAdmin = await Admin.findOne({ _id: decoded.id });

  if (!currAdmin) {
    console.log('No admin found');
    return;
  }

  req.user = currAdmin;
  next();
};

//UPDATE PASSWORD OF THE ADMIN BY SELF

exports.updatePassword = async (req, res) => {
  const admin = await Admin.findById(req.user.id).select('+password');

  if (!admin) return;

  //CHECK IF THE PASSWORD MATCHES WITH THE CORRECT PASSWORD OR NOT
  const currentPassword = req.body.currentPassword;
  if (admin.checkPassword(currentPassword, admin.password) === false) {
    console.log("The password didn't match");
    return;
  }
  //IF EVERYTHING IS CORRECT THEN UPDATE THE PASSWORD AND SAVE
  admin.password = req.body.newPassword;
  await admin.save(); //THE SAVE() FUNCTION RETURNS A PROMISE SO HAVE TO AWAIT

  createNewToken(admin, 201, res);
};

exports.forgotPassword = async (req, res) => {
  const admin = await Admin.findOne({ email: req.body.email });
  if (!admin) {
    console.log('admin not found');
    return;
  }
  //CREATE A PASSWORD RESET URL
  const resetToken = admin.createPasswordResetToken();
  await admin.save({ validateBeforeSave: false });

  //3) SEND THE RESETTOKEN TO THE USER
  const resetUrl = `${req.protocol}://${req.get(
    'host'
  )}/api/V1/admin/resetPassword/${resetToken}`;

  //SEND THE URL TO EMAIL
  try {
    await new Email(admin, resetUrl).sendPasswordReset();
    res.status(200).json({
      status: 'Success',
      message: 'Email sent successfully',
    });
  } catch (err) {
    admin.PasswordResetToken = undefined;
    admin.PasswordResetExpires = undefined;
    await admin.save({ validateBeforeSave: false });
    console.log('error while sending the mail', err.message);
  }
};

//RESET THE PASSWORD

exports.resetPassword = async (req, res) => {
  //COMAPRE THE TOKEN
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  //RETURN THE ISER BASED ON THE TOKEN AND CHECK IF TOKEN IS EXPIRED OR NOT
  const admin = await Admin.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!admin) {
    console.log('Something went wrong!! check the token again or retry');
    return;
  }

  admin.password = req.body.newPassword;
  admin.PasswordResetExpires = undefined;
  admin.PasswordResetToken = undefined;
  await admin.save();

  createNewToken(admin, 200, res);
};
