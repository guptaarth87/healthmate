import React, { useState } from 'react';
import axios from 'axios';
import API_URL from '../_helper';
import Cookies from 'universal-cookie';

function AddData({ aadhaarNumber }) {
  const cookies = new Cookies();
  const [formData, setFormData] = useState({
    diseaseName: '',
    medicineName: '',
    doctorName: '',
    city: '',
    pincode:cookies.get('pinCode'),
    nextAppointment: '',
    refillDate: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/data/adddata`, { ...formData, aadhaarNumber });
      alert('Data added successfully');
      window.location.href = '/viewdata'; // Redirect to view data page after adding data
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <div className="row">
      <div className="col-md-6 offset-md-3">
        <h2>Add Data</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="diseaseName" className="form-label">Disease Name</label>
            <input type="text" className="form-control" id="diseaseName" name="diseaseName" value={formData.diseaseName} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="medicineName" className="form-label">Medicine Name</label>
            <input type="text" className="form-control" id="medicineName" name="medicineName" value={formData.medicineName} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="doctorName" className="form-label">Doctor Name</label>
            <input type="text" className="form-control" id="doctorName" name="doctorName" value={formData.doctorName} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="city" className="form-label">City</label>
            <input type="text" className="form-control" id="city" name="city" value={formData.city} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="nextAppointment" className="form-label">Next Appointment</label>
            <input type="date" className="form-control" id="nextAppointment" name="nextAppointment" value={formData.nextAppointment} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="refillDate" className="form-label">Refill Date</label>
            <input type="date" className="form-control" id="refillDate" name="refillDate" value={formData.refillDate} onChange={handleChange} />
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          <button type="submit" className="btn btn-primary">Add Data</button>
        </form>
      </div>
    </div>
  );
}

export default AddData;
