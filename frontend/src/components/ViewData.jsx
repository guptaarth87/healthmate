import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from '../_helper';

function ViewData({ aadhaarNumber }) {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState(null);

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
        const updatedData = data.filter(item => item.id !== recordToDelete);
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
    <div>
      <h2>View Data</h2><br></br>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row row-cols-1 row-cols-md-2 g-4 ">
        {data.map((item, index) => (
          <div key={index} className="col-lg-3 col-md-5 col-sm-12 m-1">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Data {index + 1}</h5>
                <p className="card-text">Disease Name: {item.diseaseName}</p>
                <p className="card-text">Medicine Name: {item.medicineName}</p>
                <p className="card-text">Doctor Name: {item.doctorName}</p>
                <p className="card-text">City: {item.city}</p>
                <p className="card-text">Next Appointment: {item.nextAppointment}</p>
                <p className="card-text">Refill Date: {item.refillDate}</p>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteClick(item._id)}
                >
                  Delete
                </button>
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
            <form onSubmit={confirmDelete}>
              <button type="submit" className="btn btn-danger">Yes</button>
              <button type="button" className="btn btn-secondary" onClick={handleCloseConfirmation}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewData;
