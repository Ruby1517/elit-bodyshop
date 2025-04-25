import { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import app  from '../firebaseConfig';
import { ref, uploadBytes, getDownloadURL, getStorage } from 'firebase/storage';
import axios from 'axios';

const Admin = () => {
  const [beforeImages, setBeforeImages] = useState([]);
  const [afterImages, setAfterImages] = useState([]);
  const [title, setTitle] = useState('');
  const [beforePreviews, setBeforePreviews] = useState([]);
  const [afterPreviews, setAfterPreviews] = useState([]);
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const storage = getStorage(app)

  const generatePreviews = (files, setPreviewFn) => {
    const previews = files.map(file => ({
      file,
      url: URL.createObjectURL(file)
    }));
    setPreviewFn(previews);
  };

  const onDropBefore = useCallback((acceptedFiles) => {
    setBeforeImages(prev => [...prev, ...acceptedFiles]);
    generatePreviews(acceptedFiles, (newPreviews) => 
        setBeforePreviews(prev => [...prev, ...newPreviews])
    );  
  }, []);

  const onDropAfter = useCallback((acceptedFiles) => {
    setAfterImages(prev => [...prev, ...acceptedFiles]);
    generatePreviews(acceptedFiles, (newPreviews) => 
      setAfterPreviews(prev => [...prev, ...newPreviews])
  );
  }, []);

  const { getRootProps: getRootBeforeProps, getInputProps: getInputBeforeProps } = useDropzone({
    onDrop: onDropBefore,
    accept: { 'image/*': [] },
    multiple: true,
  });

  const { getRootProps: getRootAfterProps, getInputProps: getInputAfterProps } = useDropzone({
    onDrop: onDropAfter,
    accept: { 'image/*': [] },
    multiple: true,
  });

  const uploadImage = async (file) => {
    const imageRef = ref(storage, `photos/${Date.now()}_${file.name}`);
    await uploadBytes(imageRef, file);
    return await getDownloadURL(imageRef);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    setError(null);

    try {
      const beforeImageUrls = await Promise.all(beforeImages.map(file => uploadImage(file)));
      const afterImageUrls = await Promise.all(afterImages.map(file => uploadImage(file)));

      console.log("before image url:", beforeImageUrls)

      await axios.post('http://localhost:5000/api/before-after/upload', {
        title,
        description,
        beforeImages: beforeImageUrls,
        afterImages: afterImageUrls        
      });

      alert('Images uploaded successfully!');
      setBeforeImages([]);
      setAfterImages([]);
      setBeforePreviews([]);
      setAfterPreviews([]);
      setDescription('');
      setTitle('')
    } catch (err) {
      console.error('Upload error:', err);
      setError('Failed to upload images.');
    } finally {
      setUploading(false);
    }
  };

  // Clean up preview URLs when component unmounts or previews change
  useEffect(() => {
    return () => {
      beforePreviews.forEach(preview => URL.revokeObjectURL(preview.url));
      afterPreviews.forEach(preview => URL.revokeObjectURL(preview.url));
    };
  }, [beforePreviews, afterPreviews]);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Upload Before & After Image Sets</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
      <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter title"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter description"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Before Images</label>
          <div
            {...getRootBeforeProps()}
            className="p-4 border-2 border-dashed border-gray-300 rounded-md cursor-pointer text-gray-500 hover:border-blue-400"
          >
            <input {...getInputBeforeProps({ multiple: true})} />
            <p>Drag and drop or click to select before images</p>
          </div>
          <div className="flex flex-wrap gap-4 mt-2">
            {beforePreviews.map((preview, index) => (
              <div key={index} className="w-24 h-24 border rounded overflow-hidden">
                <img src={preview.url} alt={`before-${index}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">After Images</label>
          <div
            {...getRootAfterProps()}
            className="p-4 border-2 border-dashed border-gray-300 rounded-md cursor-pointer text-gray-500 hover:border-blue-400"
          >
            <input {...getInputAfterProps({ multiple: true })} />
            <p>Drag and drop or click to select after images</p>
          </div>
          <div className="flex flex-wrap gap-4 mt-2">
            {afterPreviews.map((preview, index) => (
              <div key={index} className="w-24 h-24 border rounded overflow-hidden">
                <img src={preview.url} alt={`after-${index}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={uploading}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
        >
          {uploading ? 'Uploading...' : 'Upload Set'}
        </button>
      </form>
    </div>
  );
};

export default Admin;
