// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// function AdminDashboard() {
//   const [testimonials, setTestimonials] = useState([]);
//   const navigate = useNavigate();

//   const fetchTestimonials = async () => {
//     try {
//       const token = localStorage.getItem('adminToken');
//       const res = await axios.get('http://localhost:5000/api/testimonials', {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setTestimonials(res.data);
//     } catch (err) {
//       console.error(err);
//       navigate('/admin-login');
//     }
//   };

//   const approveTestimonial = async (id) => {
//     try {
//       const token = localStorage.getItem('adminToken');
//       await axios.patch(`http://localhost:5000/api/testimonials/${id}/approve`, {}, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       fetchTestimonials();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const deleteTestimonial = async (id) => {
//     try {
//       const token = localStorage.getItem('adminToken');
//       await axios.delete(`/api/testimonials/${id}`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       fetchTestimonials();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchTestimonials();
//   }, []);

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>
//       <div className="grid gap-4">
//         {testimonials.map((testimonial) => (
//           <div key={testimonial._id} className="p-4 border rounded shadow">
//             <h3 className="text-xl font-semibold">{testimonial.name}</h3>
//             <p className="text-gray-700 mb-4">{testimonial.message}</p>
//             <p>Status: {testimonial.approved ? 'Approved' : 'Pending'}</p>
//             <div className="flex gap-4 mt-4">
//               {!testimonial.approved && (
//                 <button
//                   onClick={() => approveTestimonial(testimonial._id)}
//                   className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//                 >
//                   Approve
//                 </button>
//               )}
//               <button
//                 onClick={() => deleteTestimonial(testimonial._id)}
//                 className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default AdminDashboard;


import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import app from '../firebaseConfig';
import { ref, uploadBytes, getDownloadURL, getStorage } from 'firebase/storage';
import { io } from 'socket.io-client';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const AdminDashboard = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [beforeImages, setBeforeImages] = useState([]);
  const [afterImages, setAfterImages] = useState([]);
  const [title, setTitle] = useState('');
  const [beforePreviews, setBeforePreviews] = useState([]);
  const [afterPreviews, setAfterPreviews] = useState([]);
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [showTestimonials, setShowTestimonials] = useState(true);  // To toggle between sections
  const [notifications, setNotifications] = useState([]);
  const [pendingEstimates, setPendingEstimates] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPendingEstimates();
  }, []);

  const fetchPendingEstimates = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/estimates/pending');
      setPendingEstimates(response.data);
    } catch (error) {
      console.error('Error fetching pending estimates', error);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/estimates/${id}/status`, { status: newStatus });
      fetchPendingEstimates(); // Refresh the list
    } catch (error) {
      console.error('Error updating estimate status', error);
    }
  };

  // useEffect(() => {
  //   const socket = io('http://localhost:5000');  // your server address
  //   const notificationSound = new Audio('/notification.mp3');

  //   socket.on('connect', () => {
  //     console.log('Connected to Socket.IO server');
  //   });

  //   socket.on('newEstimate', (data) => {
  //     console.log('New estimate received:', data);
      
  //     // Play sound
  //     notificationSound.play();

  //     // Show popup
  //     toast.info('New Estimate Request Received!', {
  //       position: "top-right",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //     });
  //   });

  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);
  

  const handleBeforeAfter = () => {
    navigate('/admin-beforeAfter')
  }

  // Fetch Testimonials
  const fetchTestimonials = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.get('http://localhost:5000/api/testimonials', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTestimonials(res.data);
    } catch (err) {
      console.error(err);
      navigate('/admin-login');
    }
  };

  const approveTestimonial = async (id) => {
    try {
      const token = localStorage.getItem('adminToken');
      await axios.patch(`http://localhost:5000/api/testimonials/${id}/approve`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchTestimonials();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTestimonial = async (id) => {
    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`/api/testimonials/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchTestimonials();
    } catch (err) {
      console.error(err);
    }
  };

  
  useEffect(() => {
    fetchTestimonials();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>

      {/* {notifications.length > 0 && (
        <div style={{ background: 'yellow', padding: '10px', marginBottom: '20px' }}>
          🔔 You have {notifications.length} new estimate request(s)!
        </div>
      )} */}

      {/* Show new notifications */}
      {/* {notifications.map((note, idx) => (
        <div key={idx} style={{ border: '1px solid black', marginBottom: '10px', padding: '5px' }}>
          <strong>{note.name}</strong> requested estimate for <strong>{note.vehicle}</strong> at {new Date(note.createdAt).toLocaleTimeString()}
        </div>
      ))} */}

    <h2>Pending Estimates ({pendingEstimates.length})</h2>

    {pendingEstimates.map((estimate) => (
      <div key={estimate._id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
        <p><strong>Name:</strong> {estimate.name}</p>
        <p><strong>Vehicle:</strong> {estimate.vehicle}</p>
        <p><strong>Damage:</strong> {estimate.damage}</p>
    
        <button onClick={() => handleStatusChange(estimate._id, 'reviewed')}>Mark as Reviewed</button>
        <button onClick={() => handleStatusChange(estimate._id, 'completed')}>Mark as Completed</button>
      </div>
    ))}
      
      {/* Toggle Buttons */}
      <div className="mb-4">
        <button
          onClick={() => setShowTestimonials(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-4"
        >
          Manage Testimonials
        </button>
        <button
          onClick={handleBeforeAfter}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Upload Before & After Images
        </button>
      </div>

      
  </div>  
  ) 
};

export default AdminDashboard;
