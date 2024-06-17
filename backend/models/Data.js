const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  diseaseName: String,
  medicineName: String,
  date:  {
    type: String,
    default: function () {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const day = String(currentDate.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
  },
  doctorName: String,
  city: String,
  pincode:String,
  nextAppointment: String,
  refillDate: String,
  aadhaarNumber: Number
});

module.exports = mongoose.model('Data', dataSchema);
