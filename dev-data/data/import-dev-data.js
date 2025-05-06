const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bloodBank = require('../../models/bloodBankModel');
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
const tours = JSON.parse(
  fs.readFileSync('./dev-data/data/tours.json', 'utf-8')
);
const users = JSON.parse(
  fs.readFileSync('./dev-data/data/users.json', 'utf-8')
);
const reviews = JSON.parse(
  fs.readFileSync('./dev-data/data/reviews.json', 'utf-8')
);

//IMPORTING FILES TO DATABASE
const importData = async () => {
  try {
    await Tour.create(tours);
    await User.create(users, { validateBeforeSave: false });
    await Review.create(reviews);
    console.log('successfully added all the data');
  } catch (err) {
    console.log(err);
  }
};

//DELETE ALL DATA FROM THE COLLECTION

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();
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
