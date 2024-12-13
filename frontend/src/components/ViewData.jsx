import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from '../_helper';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function ViewData({ aadhaarNumber }) {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

  // useEffect to check aadhaarNumber in cookies
  useEffect(() => {
    const aadhaarNumber = Cookies.get('aadhaarNumber'); // Retrieve 'aadhaarNumber' from cookies
    if (!aadhaarNumber) {
      navigate('/login'); // If not available, redirect to '/login'
    }
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/data/getdatabyaadhaar/${aadhaarNumber}`);
        setData(response.data);
        setError('');
      } catch (error) {
        setError(error.response.data.error);
      }
    };

    if (aadhaarNumber) {
      fetchData();
    }
  }, [aadhaarNumber]);

  const confirmDelete = async () => {
    if (recordToDelete) {
      try {
        await axios.delete(`${API_URL}/data/deletedata/${recordToDelete}`);
        const updatedData = data.filter(item => item._id !== recordToDelete);
        setData(updatedData);
        setShowConfirmation(false);
      } catch (error) {
        setError('Error deleting record');
      }
    }
  };

  const handleDeleteClick = (id) => {
    setRecordToDelete(id);
    setShowConfirmation(true);
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
    setRecordToDelete(null);
  };

  return (
    <div className="container mt-4">
      <Navbar />
      <h2 className="text-center mb-4">View Data</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {data.map((item, index) => (
          <div key={index} className="col">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">Record {index + 1}</h5>
                <p className="card-text"><strong>Disease Name:</strong> {item.diseaseName}</p>
                <p className="card-text"><strong>Medicine Name:</strong> {item.medicineName}</p>
                <p className="card-text"><strong>Doctor Name:</strong> {item.doctorName}</p>
                <p className="card-text"><strong>City:</strong> {item.city}</p>
                <p className="card-text"><strong>Next Appointment:</strong> {item.nextAppointment}</p>
                <p className="card-text"><strong>Refill Date:</strong> {item.refillDate}</p>
                <button className="btn btn-danger" onClick={() => handleDeleteClick(item._id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Custom Confirmation Modal */}
      {showConfirmation && (
        <div className="confirmation-container">
          <div className="confirmation-modal">
            <h4>Confirm Delete</h4>
            <p>Are you sure you want to delete this record?</p>
            <button className="btn btn-danger" onClick={confirmDelete}>Yes</button>
            <button className="btn btn-secondary" onClick={handleCloseConfirmation}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewData;
