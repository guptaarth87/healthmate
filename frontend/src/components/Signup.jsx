import React, { useState } from 'react';
import axios from 'axios';
import API_URL from '../_helper';
import {Link} from 'react-router-dom';

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    pincode: '',
    aadhaarNumber: '',
    phoneNumber: '',
    password: '',
    email: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/auth/signup`, formData);
      alert('User created successfully');
     
      window.location.href = '/login'; // Redirect to login page after signup
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <div className="row">
      <div className="col-md-6 offset-md-3">
        <h2>Signup</h2>
        <h6>Allready have an account? <Link to='/login'>Login</Link></h6>
       
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="age" className="form-label">Age</label>
            <input type="number" className="form-control" id="age" name="age" value={formData.age} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="gender" className="form-label">Gender</label>
            <input type="text" className="form-control" id="gender" name="gender" value={formData.gender} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="pincode" className="form-label">Pincode</label>
            <input type="text" className="form-control" id="pincode" name="pincode" value={formData.pincode} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="aadhaarNumber" className="form-label">Aadhaar Number</label>
            <input type="text" className="form-control" id="aadhaarNumber" name="aadhaarNumber" value={formData.aadhaarNumber} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
            <input type="text" className="form-control" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} />
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          <button type="submit" className="btn btn-primary">Signup</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
