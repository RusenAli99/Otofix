const mongoose = require('mongoose');

const PartSchema = new mongoose.Schema({
  code: { type: String, required: true },
  name: String,
  price: Number
});

module.exports = mongoose.model('Part', PartSchema);

