const mongoose = require('mongoose');
const db = require('../models/');
const sp500Data = require('./sp500_returnData.js');

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/sp500", { useNewUrlParser: true, useUnifiedTopology: true });

const seeds = sp500Data;

db.Returns
  .deleteMany({})
  .then(() => db.Returns.collection.insertMany(seeds))
  .then(data => {
    console.log(data.result.n + " items have been inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });