const mongoose = require('mongoose');

const logs = new mongoose.Schema({
  hit_at: { type: Date, default: Date.now },
  type: String,
});

module.exports = () => mongoose.model('Logs', logs);
