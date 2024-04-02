import React,{useState} from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation
import Cookies from 'universal-cookie'; 


function Navbar() {
  const cookies = new Cookies();
  const [aadhaarNumber, setAadhaarNumber] = useState(cookies.get('aadhaarNumber'));

  const handleLogout = () => {
    // Remove Aadhaar number from cookies and redirect to login page
    cookies.remove('aadhaarNumber');
    setAadhaarNumber(null);
    window.location.href = '/login';
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light ">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Navbar</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/adddata">Add Data</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/viewdata">View Data</Link>
            </li>
            <li className="nav-item">
            {aadhaarNumber ? (
          <button className="btn btn-danger mb-3" onClick={handleLogout}>Logout</button>
          ):
          <Link className="nav-link" to="/login">Login</Link>
           
          }
             </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
