import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from '../_helper';
import Cookies from 'js-cookie'; 
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import './AddData.css'; // Link to custom CSS for additional styling

function AddData({ aadhaarNumber }) {
  
  const [formData, setFormData] = useState({
    diseaseName: '',
    medicineName: '',
    doctorName: '',
    city: '',
    pincode: Cookies.get('pinCode'),
    nextAppointment: '',
    refillDate: ''
  });
  const [error, setError] = useState('');

  const navigate = useNavigate();

  // Check aadhaarNumber in cookies on component load
  useEffect(() => {
    const aadhaarNumber = Cookies.get('aadhaarNumber'); 
    if (!aadhaarNumber) {
      navigate('/login'); 
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/data/adddata`, { ...formData, aadhaarNumber });
      alert('Data added successfully');
      window.location.href = '/viewdata'; 
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <div className="add-data-page">
      <Navbar />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow p-4">
              <h2 className="text-center mb-4">Add Patient Data</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="diseaseName" className="form-label">Disease Name</label>
                  <input type="text" className="form-control" id="diseaseName" name="diseaseName" placeholder="Enter disease name" value={formData.diseaseName} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="medicineName" className="form-label">Medicine Name</label>
                  <input type="text" className="form-control" id="medicineName" name="medicineName" placeholder="Enter medicine name" value={formData.medicineName} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="doctorName" className="form-label">Doctor Name</label>
                  <input type="text" className="form-control" id="doctorName" name="doctorName" placeholder="Enter doctor name" value={formData.doctorName} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="city" className="form-label">City</label>
                  <input type="text" className="form-control" id="city" name="city" placeholder="Enter city" value={formData.city} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="nextAppointment" className="form-label">Next Appointment</label>
                  <input type="date" className="form-control" id="nextAppointment" name="nextAppointment" value={formData.nextAppointment} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="refillDate" className="form-label">Refill Date</label>
                  <input type="date" className="form-control" id="refillDate" name="refillDate" value={formData.refillDate} onChange={handleChange} required />
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <button type="submit" className="btn btn-primary w-100">Submit Data</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddData;
