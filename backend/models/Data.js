const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  diseaseName: String,
  medicineName: [String],
  date: String,
  doctorName: String,
  city: String,
  pincode:String,
  nextAppointment: String,
  refillDate: String,
  aadhaarNumber: String
});

module.exports = mongoose.model('Data', dataSchema);
