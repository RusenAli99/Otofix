const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  plate: String,
  model: String,
  fault: String
}, { timestamps: true });

module.exports = mongoose.model('Vehicle', VehicleSchema);
