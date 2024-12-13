import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import API_URL from '../_helpers';

Chart.register(...registerables);

function AnalyticsTwo() {
  const [topCitiesByMedicine, setTopCitiesByMedicine] = useState([]);
  const [topCitiesByDisease, setTopCitiesByDisease] = useState([]);
  const [medicine, setMedicine] = useState('');
  const [disease, setDisease] = useState('');

  // Fetch top cities for a specific medicine
  const fetchTopCitiesByMedicine = async () => {
    try {
      const response = await axios.get(`${API_URL}/data/gettopcitiesbymedicine?medicineName=${medicine}`);
      setTopCitiesByMedicine(response.data.data);
    } catch (error) {
      console.error('Error fetching cities for medicine', error);
    }
  };

  // Fetch top cities for a specific disease
  const fetchTopCitiesByDisease = async () => {
    try {
      const response = await axios.get(`${API_URL}/data/gettopcitiesbydisease?diseaseName=${disease}`);
      setTopCitiesByDisease(response.data.data);
    } catch (error) {
      console.error('Error fetching cities for disease', error);
    }
  };

  const handleMedicineSubmit = (e) => {
    e.preventDefault();
    fetchTopCitiesByMedicine();
  };

  const handleDiseaseSubmit = (e) => {
    e.preventDefault();
    fetchTopCitiesByDisease();
  };

  const topCitiesByMedicineData = {
    labels: topCitiesByMedicine.map((item) => item._id),
    datasets: [
      {
        label: `Top 10 Cities for ${medicine}`,
        data: topCitiesByMedicine.map((item) => item.count),
        backgroundColor: '#1cc88a',
      },
    ],
  };

  const topCitiesByDiseaseData = {
    labels: topCitiesByDisease.map((item) => item._id),
    datasets: [
      {
        label: `Top 10 Cities for ${disease}`,
        data: topCitiesByDisease.map((item) => item.count),
        backgroundColor: '#f6c23e',
      },
    ],
  };

  return (
    <div className="container mt-4">
      <h2>Healthcare Analytics</h2>

      {/* Medicine-based Analytics */}
      <form onSubmit={handleMedicineSubmit} className="mt-5">
        <div className="form-group">
          <label>Enter Medicine Name:</label>
          <input
            type="text"
            value={medicine}
            onChange={(e) => setMedicine(e.target.value)}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary mt-2">Get Top Cities by Medicine</button>
      </form>

      {topCitiesByMedicine.length > 0 && (
        <div className="mt-5">
          <h4>Top 10 Cities for {medicine}</h4>
          <Bar data={topCitiesByMedicineData} />
        </div>
      )}

      {/* Disease-based Analytics */}
      <form onSubmit={handleDiseaseSubmit} className="mt-5">
        <div className="form-group">
          <label>Enter Disease Name:</label>
          <input
            type="text"
            value={disease}
            onChange={(e) => setDisease(e.target.value)}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary mt-2">Get Top Cities by Disease</button>
      </form>

      {topCitiesByDisease.length > 0 && (
        <div className="mt-5">
          <h4>Top 10 Cities for {disease}</h4>
          <Bar data={topCitiesByDiseaseData} />
        </div>
      )}
    </div>
  );
}

export default AnalyticsTwo;
