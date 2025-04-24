import { useState } from 'react';

function EstimateForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    vehicle: '',
    damage: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/estimates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const result = await response.json();
      if (response.ok) {
        setMessage('Estimate request submitted! We will contact you soon.');
        setFormData({ name: '', email: '', phone: '', vehicle: '', damage: '' });
      } else {
        setMessage('Failed to submit estimate. Please try again.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <section id="estimate" className="py-20 px-6 bg-gray-100">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
          Get a Free Estimate
        </h2>
        <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Vehicle Make & Model</label>
              <input
                type="text"
                name="vehicle"
                value={formData.vehicle}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Damage Description</label>
              <textarea
                name="damage"
                value={formData.damage}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="5"
                required
              ></textarea>
            </div>
            {message && (
              <p className={`text-center mb-6 ${message.includes('Failed') || message.includes('error') ? 'text-red-600' : 'text-green-600'}`}>
                {message}
              </p>
            )}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white text-lg font-semibold py-3 rounded-md hover:bg-blue-700 transition-transform transform hover:scale-105"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default EstimateForm;