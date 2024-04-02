const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  pincode: String,
  aadhaarNumber: String,
  phoneNumber: String,
  password: String,
  email: String
});

module.exports = mongoose.model('User', userSchema);
