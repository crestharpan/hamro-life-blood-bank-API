const bloodBank = require('../models/bloodBankModel');
exports.add = async (req, res) => {
  const newBloodBank = await bloodBank.create({
    bloodBankName: req.body.bloodBankName,
    contact: Number(req.body.contact),
    address: {
      province: req.body.province,
      city: req.body.city,
      street: req.body.street,
    },
    status: req.body.status,
  });
  res.status(200).json({
    status: 'Success',
    newBloodBank,
  });
};
