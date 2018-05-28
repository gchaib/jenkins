const mongoose = require('mongoose');
const Promise = require('bluebird');

MONGO_URI = process.env.MONGODB_HOST;
mongoose.Promise = Promise;

module.exports = (app) => {
  mongoose.connect(MONGO_URI);
}
