import { useState } from 'react';

function Admin() {
  const [beforeImage, setBeforeImage] = useState(null);
  const [afterImage, setAfterImage] = useState(null);
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!beforeImage || !afterImage || !description) {
      setMessage('Please provide both images and a description.');
      return;
    }

    const formData = new FormData();
    formData.append('beforeImage', beforeImage);
    formData.append('afterImage', afterImage);
    formData.append('description', description);

    try {
      const response = await fetch('/api/before-after', {
        method: 'POST',
        body: formData
      });
      const result = await response.json();
      if (response.ok) {
        setMessage('Images uploaded successfully!');
        setBeforeImage(null);
        setAfterImage(null);
        setDescription('');
        document.getElementById('beforeImage').value = '';
        document.getElementById('afterImage').value = '';
      } else {
        setMessage(result.message || 'Failed to upload images.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <section className="min-h-screen bg-gray-100 py-20 px-6">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
          Upload Before & After Images
        </h2>
        <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Before Image</label>
              <input
                id="beforeImage"
                type="file"
                accept="image/*"
                onChange={(e) => setBeforeImage(e.target.files[0])}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">After Image</label>
              <input
                id="afterImage"
                type="file"
                accept="image/*"
                onChange={(e) => setAfterImage(e.target.files[0])}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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
              Upload
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Admin;