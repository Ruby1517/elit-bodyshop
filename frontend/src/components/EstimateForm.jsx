import { useState } from 'react';
import app  from '../firebaseConfig';
import { ref, uploadBytes, getDownloadURL, getStorage } from 'firebase/storage';
import axios from 'axios';

function EstimateForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    vehicle: '',
    damage: ''
  });
  const [message, setMessage] = useState('');
  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImages(prev => [...prev, ...Array.from(e.target.files)])
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const urls = [];
      for (const file of images) {
        const imageRef = ref(Storage, `estimate/${Date.now()}_${file.name}`);
        const snapshot = await uploadBytes(imageRef, file)
        const downloadURL = await getDownloadURL(snapshot.ref);
        urls.push(downloadURL);
      }

      const payload = {
        ...formData,
        imageUrl: urls
      };

      const response = await axios.post('http://localhost:5000/api/estimates', payload);
      if (response.ok) {
        setMessage('Estimate request submitted successfully!');
        setFormData({ name: '', email: '', phone: '', vehicle: '', damage: '' });
        setImages([]);
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
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            {['name', 'email', 'phone', 'vehicle'].map((field) => (
              <div key={field} className="mb-6">
                <label className="block text-gray-700 font-medium mb-2 capitalize">
                  {field === 'vehicle' ? 'Vehicle Make & Model' : field}
                </label>
                <input
                  type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  required={field !== 'phone'}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Damage Description</label>
              <textarea
                name="damage"
                value={formData.damage}
                onChange={handleChange}
                rows="5"
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Upload Car Images</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="w-full"
              />
              {images.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {Array.from(images).map((img, i) => (
                    <img
                      key={i}
                      src={URL.createObjectURL(img)}
                      alt={`upload-${i}`}
                      className="w-20 h-20 object-cover rounded border"
                    />
                  ))}
                </div>
              )}
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












