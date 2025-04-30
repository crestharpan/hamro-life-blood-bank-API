const app = require('./app');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config({ path: './config.env' });

const port = process.env.PORT;
const Db = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(Db).then(() => {
  console.log('Database Connection successful');
});
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
