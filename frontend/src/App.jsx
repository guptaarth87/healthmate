import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie'; 

import Login from './components/Login';
import Signup from './components/Signup';
import AddData from './components/AddData.jsx';
import ViewData from './components/ViewData';
import Navbar from './components/Navbar.jsx';

function App() {
  const cookies = new Cookies();
  const [aadhaarNumber, setAadhaarNumber] = useState(cookies.get('aadhaarNumber'));

  // useEffect(() => {
  //   // Check if Aadhaar number exists in cookies
  //   if (!aadhaarNumber) {
  //     // Redirect to login page if not logged in
  //     window.location.href = '/login';
  //   }
  // }, [aadhaarNumber]);

  const handleLogout = () => {
    // Remove Aadhaar number from cookies and redirect to login page
    cookies.remove('aadhaarNumber');
    setAadhaarNumber(null);
    window.location.href = '/login';
  };

  return (
    <Router>
      <Navbar/>
      <div className="container mt-5">
        <h1 className="mb-4">Healthcare Management System</h1>
        {aadhaarNumber && (
          <button className="btn btn-danger mb-3" onClick={handleLogout}>Logout</button>
        )}
        
        <Routes>
          <Route path="/" element={<Login setAadhaarNumber={setAadhaarNumber} />} />
          <Route path="/login" element={<Login setAadhaarNumber={setAadhaarNumber} />} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/adddata" element={<AddData aadhaarNumber={aadhaarNumber} />} />
          <Route path="/viewdata" element={<ViewData aadhaarNumber={aadhaarNumber} />} />
        </Routes>
      </div>
      <br></br>
      <br></br>
      <br></br>
    </Router>
  );
}

export default App;
