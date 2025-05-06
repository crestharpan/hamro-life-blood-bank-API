const Request = require('../models/requestModel');
const factory = require('./handlerFactory');

exports.request = async (req, res) => {
  console.log(req.body);
  const doc = await Request.create({
    fullName: req.body.fullName,
    email: req.body.email,
    photo: req.body.photo,
    contact: req.body.mobile,
    location: {
      province: req.body.province,
      city: req.body.city,
    },
    hospitalName: req.body.hospitalName,
    hospitalAddress: req.body.hospitalAddress,
    bloodGroup: req.body.bloodGroup,
    active: req.body.active,
    dateOfBirth: req.body.dateOfBirth,
  });
  res.status(200).json({
    status: 'Success',
    data: doc,
  });
};

exports.getCities = async (req, res) => {
  const doc = await Request.aggregate([
    {
      $group: {
        _id: {
          city: '$location.city',
          province: '$location.province',
        },
      },
    },
    {
      $project: {
        _id: 0,
        city: '$_id.city',
        province: '$_id.province',
      },
    },
  ]);
  res.status(200).json({
    status: 'Success',
    doc,
  });
};

exports.getAll = factory.getAll(Request);
exports.update = factory.update(Request);
exports.delete = factory.delete(Request);
