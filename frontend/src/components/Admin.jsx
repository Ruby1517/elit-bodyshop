import { useState } from 'react';
import { storage } from '../firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import axios from 'axios';

const Admin = () => {
  const [beforeImage, setBeforeImage] = useState(null);
  const [afterImage, setAfterImage] = useState(null);
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    setError(null);

    try {
      // Upload Before Image
      const beforeImageRef = ref(storage, `before-after/before-${Date.now()}-${beforeImage.name}`);
      await uploadBytes(beforeImageRef, beforeImage);
      const beforeImageUrl = await getDownloadURL(beforeImageRef);

      // Upload After Image
      const afterImageRef = ref(storage, `before-after/after-${Date.now()}-${afterImage.name}`);
      await uploadBytes(afterImageRef, afterImage);
      const afterImageUrl = await getDownloadURL(afterImageRef);

      // Send URLs and description to backend
      await axios.post('/api/before-after', {
        beforeImage: beforeImageUrl,
        afterImage: afterImageUrl,
        description
      });

      alert('Images uploaded successfully');
      setBeforeImage(null);
      setAfterImage(null);
      setDescription('');
    } catch (err) {
      console.error('Upload error:', err);
      setError('Failed to upload images');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Upload Before & After Images</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Before Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setBeforeImage(e.target.files[0])}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">After Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setAfterImage(e.target.files[0])}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            placeholder="Enter description"
          />
        </div>
        <button
          type="submit"
          disabled={uploading}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
        >
          {uploading ? 'Uploading...' : 'Upload Images'}
        </button>
      </form>
    </div>
  );
};

export default Admin;