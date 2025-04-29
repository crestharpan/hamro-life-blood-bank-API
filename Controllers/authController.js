const Admin = require('../models/adminModel');
const jwt = require('jsonwebtoken');
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
  user.password = undefined;

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
  createNewToken(admin, statusCode, res);
};
