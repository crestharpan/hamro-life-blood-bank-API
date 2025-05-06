const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Bank = require('../../models/bloodBankModel');
const Request = require('../../models/requestModel');
const Donor = require('../../models/bloodDonorModel');

dotenv.config({ path: './config.env' });

const Db = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose.connect(Db).then(() => {
  console.log('DB connection Successful');
});

//READ FILE FORM TOURS-SIMPLE.JSON
const bank = JSON.parse(
  fs.readFileSync('./dev-data/data/bloodBank.json', 'utf-8')
);
const request = JSON.parse(
  fs.readFileSync('./dev-data/data/bloodRequest.json', 'utf-8')
);
const donor = JSON.parse(
  fs.readFileSync('./dev-data/data/bloodDonor.json', 'utf-8')
);

//IMPORTING FILES TO DATABASE
const importData = async () => {
  try {
    await Bank.create(bank);
    await Donor.create(donor, { validateBeforeSave: false });
    await Request.create(request);
    console.log('successfully added all the data');
  } catch (err) {
    console.log(err);
  }
};

//DELETE ALL DATA FROM THE COLLECTION

const deleteData = async () => {
  try {
    await Bank.deleteMany();
    await Donor.deleteMany();
    await Request.deleteMany();
    console.log('Deleted all the data');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
