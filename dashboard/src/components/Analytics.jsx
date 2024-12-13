import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import API_URL from '../_helpers';
import AnalyticsTwo from './AnalyticsTwo';

Chart.register(...registerables);

function Analytics() {
  const [diseaseTrends, setDiseaseTrends] = useState([]);
  const [topDiseases, setTopDiseases] = useState([]);
  const [topMedicines, setTopMedicines] = useState([]);
  const [city, setCity] = useState('');
  const [cityDiseases, setCityDiseases] = useState([]);
  const [cityMedicines, setCityMedicines] = useState([]);

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const fetchAnalyticsData = async () => {
    try {
      const response = await axios.get(`${API_URL}/data/getalldata`);
      const fetchedData = response.data.data;

      const diseaseCount = {};
      const medicineCount = {};

      fetchedData.forEach((item) => {
        const disease = item.diseaseName;
        const medicine = item.medicineName;

        diseaseCount[disease] = (diseaseCount[disease] || 0) + 1;
        medicineCount[medicine] = (medicineCount[medicine] || 0) + 1;
      });

      setTopDiseases(
        Object.entries(diseaseCount)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 5)
          .map(([key, value]) => ({ name: key, count: value }))
      );

      setTopMedicines(
        Object.entries(medicineCount)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 5)
          .map(([key, value]) => ({ name: key, count: value }))
      );

      setDiseaseTrends(fetchedData);
    } catch (error) {
      console.error('Error fetching analytics data', error);
    }
  };

  const fetchCityData = async () => {
    try {
      const response = await axios.get(`${API_URL}/data/getcitydata?city=${city}`);
      const cityData = response.data.data;

      const cityDiseaseCount = {};
      const cityMedicineCount = {};

      cityData.forEach((item) => {
        const disease = item.diseaseName;
        const medicine = item.medicineName;

        cityDiseaseCount[disease] = (cityDiseaseCount[disease] || 0) + 1;
        cityMedicineCount[medicine] = (cityMedicineCount[medicine] || 0) + 1;
      });

      setCityDiseases(
        Object.entries(cityDiseaseCount)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 10)
          .map(([key, value]) => ({ name: key, count: value }))
      );

      setCityMedicines(
        Object.entries(cityMedicineCount)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 10)
          .map(([key, value]) => ({ name: key, count: value }))
      );
    } catch (error) {
      console.error('Error fetching city data', error);
    }
  };

  const handleCitySubmit = (e) => {
    e.preventDefault();
    fetchCityData();
  };

  const topDiseasesData = {
    labels: topDiseases.map((disease) => disease.name),
    datasets: [
      {
        label: 'Top 5 Diseases',
        data: topDiseases.map((disease) => disease.count),
        backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc', '#f6c23e', '#e74a3b'],
      },
    ],
  };

  const topMedicinesData = {
    labels: topMedicines.map((medicine) => medicine.name),
    datasets: [
      {
        label: 'Top 5 Medicines',
        data: topMedicines.map((medicine) => medicine.count),
        backgroundColor: ['#e74a3b', '#f6c23e', '#4e73df', '#1cc88a', '#36b9cc'],
      },
    ],
  };

  const diseaseTrendsData = {
    labels: diseaseTrends.map((item) => item.date),
    datasets: [
      {
        label: 'Disease Trends Over Time',
        data: diseaseTrends.map((item) => item.diseaseName),
        borderColor: '#36b9cc',
        fill: false,
      },
    ],
  };

  const cityDiseasesData = {
    labels: cityDiseases.map((disease) => disease.name),
    datasets: [
      {
        label: 'Top 10 Diseases in City',
        data: cityDiseases.map((disease) => disease.count),
        backgroundColor: '#4e73df',
      },
    ],
  };

  const cityMedicinesData = {
    labels: cityMedicines.map((medicine) => medicine.name),
    datasets: [
      {
        label: 'Top 10 Medicines in City',
        data: cityMedicines.map((medicine) => medicine.count),
        backgroundColor: '#1cc88a',
      },
    ],
  };

  return (
    <div className="container mt-4">
      <h2>Healthcare Analytics</h2>
      <div className="row">
        <div className="mt-5 col-lg-5 col-md-5 col-sm-10">
          <h4>Disease Trends Over Time</h4>
          <Line data={diseaseTrendsData} />
        </div>
        <div className="mt-5 col-lg-3 col-md-5 col-sm-10">
          <h4>Top 5 Diseases</h4>
          <Pie data={topDiseasesData} />
        </div>
        <div className="mt-5 col-lg-5 col-md-5 col-sm-10">
          <h4>Top 5 Medicines</h4>
          <Bar data={topMedicinesData} />
        </div>
      </div>

      <form onSubmit={handleCitySubmit} className="mt-5">
        <div className="form-group">
          <label>Enter City Name:</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary mt-2">Get City Data</button>
      </form>

      <div className="row mt-5">
        <div className="col-lg-5 col-md-6 col-sm-10 mt-3">
          <h4>Top 10 Diseases in {city}</h4>
          <Bar data={cityDiseasesData} />
        </div>
        <div className="col-lg-5 col-md-6 col-sm-10 mt-3">
          <h4>Top 10 Medicines in {city}</h4>
          <Bar data={cityMedicinesData} />
        </div>
      </div>
      <div className="row mt-5">
        <AnalyticsTwo/>  
      </div>
    </div>
  );
}

export default Analytics;
