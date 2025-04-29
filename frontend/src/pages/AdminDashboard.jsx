import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Admin from './Admin';
import PendingEstimate from './PendingEstimate';

const AdminDashboard = () => {
  const [activePage, setActivePage] = useState('pending');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch user data when component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        if (!token) {
          navigate('/admin'); // Redirect to login if no token
          return;
        }

        const response = await axios.get('http://localhost:5000/api/admin/admin', {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token in header for authentication
          },
        });

        setUserData(response.data); // Assuming the response contains user data
      } catch (err) {
        console.error(err);
        setError('Failed to load user data');
      }
    };
    fetchUserData();
  }, [navigate]);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('adminToken'); // Clear the token
    navigate('/admin'); // Redirect to login page
  };
  

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white flex flex-col p-4">
        <h2 className="text-xl font-bold mb-6">Admin Menu</h2>
        <button onClick={() => setActivePage('beforeAfter')} className="mb-2 p-2 hover:bg-gray-700 rounded">Upload Before & After</button>
        <button onClick={() => setActivePage('estimates')} className="mb-2 p-2 hover:bg-gray-700 rounded">Pending Estimates</button>
        <button onClick={() => setActivePage('testimonials')} className="mb-2 p-2 hover:bg-gray-700 rounded">Manage Testimonials</button>
        
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100 relative">
        {/* Topbar */}
        <div className="absolute top-0 right-0 p-4 flex items-center gap-4">
          <span className="text-gray-700 font-semibold">{userData?.email}</span>
          {/* <img src={admin.photo} alt="Admin" className="w-10 h-10 rounded-full object-cover" /> */}
          <button
            onClick={handleLogout}
            className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        <div className="pt-16">

          {activePage === 'testimonials' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Manage Testimonials</h2>
            </div>
          )}

          {activePage === 'estimates' && <PendingEstimate />}

          {activePage === 'beforeAfter' &&  <Admin />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
