const Admin = require('../models/adminModel');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

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
  const { email, password } = req.body;

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

exports.protect = async (req, res) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[0];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) return;
  //Verifying the Token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const currAdmin = await Admin.findOne({ $_id: decoded.id });

  if (!admin) {
    console.log('No admin found');
    return;
  }

  req.user = currAdmin;
};
