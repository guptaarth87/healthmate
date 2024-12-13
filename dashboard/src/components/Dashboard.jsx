import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API_URL from '../_helpers';
import Analytics from './Analytics';

const ITEMS_PER_PAGE = 10;

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [data, setData] = useState([]);
  const [currentTab, setCurrentTab] = useState('users');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalData, setTotalData] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch Users
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/auth/getusers?page=${currentPage}&limit=${ITEMS_PER_PAGE}`);
      setUsers(response.data.users);
      setTotalUsers(response.data.total);
      toast.success('Users loaded successfully');
    } catch (error) {
      toast.error('Error loading users');
    } finally {
      setLoading(false);
    }
  };

  // Fetch Data
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/data/getalldata?page=${currentPage}&limit=${ITEMS_PER_PAGE}`);
      setData(response.data.data);
      setTotalData(response.data.total);
      toast.success('Data loaded successfully');
    } catch (error) {
      toast.error('Error loading data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentTab === 'users') {
      fetchUsers();
    } else {
      fetchData();
    }
  }, [currentTab, currentPage]);

  // Handle Delete User
  const handleDeleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`${API_URL}/auth/deleteuser/${id}`);
        setUsers(users.filter(user => user._id !== id));
        toast.success('User deleted successfully');
      } catch (error) {
        toast.error('Error deleting user');
      }
    }
  };

  // Handle Delete Data
  const handleDeleteData = async (id) => {
    if (window.confirm('Are you sure you want to delete this data?')) {
      try {
        await axios.delete(`${API_URL}/data/deletedata/${id}`);
        setData(data.filter(item => item._id !== id));
        toast.success('Data deleted successfully');
      } catch (error) {
        toast.error('Error deleting data');
      }
    }
  };

  const totalPages = (total, itemsPerPage) => Math.ceil(total / itemsPerPage);

  return (
    <div>
      <ToastContainer />
      <div className="container mt-4">
        <h2>Dashboard</h2>
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <button className={`nav-link ${currentTab === 'users' ? 'active' : ''}`} onClick={() => setCurrentTab('users')}>
              Users
            </button>
          </li>
          <li className="nav-item">
            <button className={`nav-link ${currentTab === 'data' ? 'active' : ''}`} onClick={() => setCurrentTab('data')}>
              Data
            </button>
          </li>
          <li className="nav-item">
            <button className={`nav-link ${currentTab === 'analytics' ? 'active' : ''}`} onClick={() => setCurrentTab('analytics')}>
              view analytics
            </button>
          </li>
        </ul>
        {loading ? (
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            <div className="mt-3">
              {currentTab === 'users' && (
                <div>
                  <h4>Users</h4>
                  <ul className="list-group">
                    {users.map(user => (
                      <li key={user._id} className="list-group-item d-flex justify-content-between align-items-center">
                        {user.name} - {user.email}
                        <button className="btn btn-danger btn-sm" onClick={() => handleDeleteUser(user._id)}>Delete</button>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-2">
                    {Array.from({ length: totalPages(totalUsers, ITEMS_PER_PAGE) }).map((_, index) => (
                      <button key={index} className={`btn btn-secondary ${index + 1 === currentPage ? 'active' : ''}`} onClick={() => setCurrentPage(index + 1)}>
                        {index + 1}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {currentTab === 'data' && (
                <div>
                  <h4>Data</h4>
                  <div className="row">
                    {data.map(item => (
                      <div key={item._id} className="col-md-4 mb-3">
                        <div className="card">
                          <div className="card-body">
                            <h5 className="card-title">{item.diseaseName}</h5>
                            <p className="card-text"><strong>Doctor:</strong> {item.doctorName}</p>
                            <p className="card-text"><strong>Medicine:</strong> {item.medicineName}</p>
                            <p className="card-text"><strong>Date:</strong> {item.date}</p>
                            <p className="card-text"><strong>City:</strong> {item.city}</p>
                            <p className="card-text"><strong>Pincode:</strong> {item.pincode}</p>
                            <p className="card-text"><strong>Next Appointment:</strong> {item.nextAppointment}</p>
                            <p className="card-text"><strong>Refill Date:</strong> {item.refillDate}</p>
                            <button className="btn btn-danger" onClick={() => handleDeleteData(item._id)}>Delete</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-2">
                    {Array.from({ length: totalPages(totalData, ITEMS_PER_PAGE) }).map((_, index) => (
                      <button key={index} className={`btn btn-secondary m-3 ${index + 1 === currentPage ? 'active' : ''}`} onClick={() => setCurrentPage(index + 1)}>
                        {index + 1}
                      </button>
                    ))}
                  </div>
                </div>
              )}
               {currentTab === 'analytics' && (
                <div>
                  <Analytics/>
                </div>
               )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
