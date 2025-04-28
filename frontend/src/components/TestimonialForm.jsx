import { useState } from 'react';

function TestimonialForm() {
  const [testimonial, setTestimonial] = useState({ name: '', message: '' });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setTestimonial({ ...testimonial, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testimonial),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess('Thank you for your feedback!');
        setError('');
        setTestimonial({ name: '', message: '' });
      } else {
        setError(data.message || 'Failed to submit testimonial');
      }
    } catch (err) {
      setError('Server error. Please try again later.');
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Leave a Testimonial</h2>

        {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
        {success && <div className="bg-green-100 text-green-700 p-3 rounded mb-4">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Your Name</label>
            <input
              type="text"
              name="name"
              value={testimonial.name}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-md"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2">Your Message</label>
            <textarea
              name="message"
              value={testimonial.message}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-md"
              rows="5"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition-transform transform hover:scale-105"
          >
            Submit Testimonial
          </button>
        </form>
      </div>
    </section>
  );
}

export default TestimonialForm;
