import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import API_URL from '../_helper';
import {Link} from 'react-router-dom';

function Login({ setAadhaarNumber }) {
  const cookies = new Cookies();
  const [aadhaarNumber, setAadhaarNumberInput] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { aadhaarNumber, password });
      const { message } = response.data;
      // Store Aadhaar number in cookies
      console.log(response.data.data)
      cookies.set('pinCode', response.data.data.pincode);
      cookies.set('aadhaarNumber', aadhaarNumber, { path: '/' });
      setAadhaarNumber(aadhaarNumber);
      setError('');
      alert(message);
      window.location.href = '/adddata'; // Redirect to add data page after login
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="row">
      <div className="col-md-6 offset-md-3">
        <h2>Login</h2>
        <h6>Don't have an account? <Link to='/signup'>Sign Up</Link></h6>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="aadhaarNumber" className="form-label">Aadhaar Number</label>
            <input type="text" className="form-control" id="aadhaarNumber" value={aadhaarNumber} onChange={(e) => setAadhaarNumberInput(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          <button type="submit" className="btn btn-primary">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
