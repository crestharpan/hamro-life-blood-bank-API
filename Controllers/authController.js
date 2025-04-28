const Admin = require('../models/adminModel');
exports.adminSignup = async (req, res) => {
  const admin = await Admin.create(req.body);
  res.status(200).json({
    status: 'Success',
    admin,
  });
};
