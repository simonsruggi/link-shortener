const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  longUrl: String,
  shortCode: String,
});

module.exports = mongoose.model('Url', urlSchema);