import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function UserRegister() {
  const [user, setUser] = useState({ email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if passwords match
    if (user.password !== user.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email, password: user.password }),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess('Registered successfully! Please login.');
        setError('');
        setUser({ email: '', password: '', confirmPassword: '' });
        setTimeout(() => navigate('/login'), 1500); // Redirect after success
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('Server error. Please try again later.');
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">User Register</h2>

        {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
        {success && <div className="bg-green-100 text-green-700 p-3 rounded mb-4">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-md"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={user.confirmPassword}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-md"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-transform transform hover:scale-105"
          >
            Register
          </button>
        </form>
      </div>
    </section>
  );
}

export default UserRegister;
