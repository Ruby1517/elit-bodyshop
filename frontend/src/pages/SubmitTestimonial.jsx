import { useState } from 'react';
import axios from 'axios';

function SubmitTestimonial() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/testimonials', { name, message });
      setSuccess('Thank you for your testimonial!');
      setName('');
      setMessage('');
      setError('');
    } catch (err) {
      console.error(err);
      setError('Something went wrong.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl mb-6 text-center font-bold">Submit Testimonial</h2>
        {success && <p className="text-green-500 mb-4">{success}</p>}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="text"
          placeholder="Your Name"
          className="w-full mb-4 p-2 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          placeholder="Your Message"
          className="w-full mb-4 p-2 border rounded"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        ></textarea>
        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition-colors"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default SubmitTestimonial;
