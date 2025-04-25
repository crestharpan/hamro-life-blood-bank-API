const Donor = require('../models/bloodDonorModel');

exports.add = async (req, res) => {
  const newBloodDonor = await Donor.create({
    fullName: req.body.fullName,
    contact: req.body.contact,
    address: {
      province: req.body.province,
      city: req.body.city,
      street: req.body.street,
    },
    habits: req.body.habits,
    lastDonationDate: req.body.lastDonationDate,
    dateOfBirth: req.body.dateOfBirth,
    bloodGroup: req.body.bloodGroup,
    donorType: req.body.donorType,
    gender: req.body.gender,
    status: req.body.status,
  });

  res.status(200).json({
    status: 'Success',
    newBloodDonor,
  });
};
