const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Job = require('./../../models/jobModel');
const User = require('./../../models/userModel');
dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
   /*  useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false */
  })
  .then(() => console.log('DB connection successful!'));

// READ JSON FILE
const jobs = JSON.parse(
  fs.readFileSync(`${__dirname}/jobs.json`, 'utf-8')
);
// const users = JSON.parse(
//   fs.readFileSync(`${__dirname}/users.json`, 'utf-8')
// );


// IMPORT DATA INTO DB
const importData = async () => {
  try {
     await Job.create(jobs);
    //await User.create(users);
    console.log('Data successfully loaded!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Job.deleteMany();
    //await User.deleteMany();
    console.log('Data successfully deleted!');
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
// node ./dev-data/data/import-dev-data.js --delete
// node ./dev-data/data/import-dev-data.js --import