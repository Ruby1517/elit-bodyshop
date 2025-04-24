import { useState, useEffect } from 'react';

function BeforeAfter() {
  const [imagePairs, setImagePairs] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchImagePairs = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/before-after');
        const data = await response.json();
        if (response.ok) {
          setImagePairs(data);
        } else {
          setError('Failed to load before/after images');
        }
      } catch (err) {
        setError('An error occurred while loading images');
      }
    };
    fetchImagePairs();
  }, []);

  return (
    <section id="before-after" className="py-20 px-6 bg-white">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
          Before & After
        </h2>
        {error && <p className="text-center text-red-600 mb-8">{error}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {imagePairs.map((pair) => (
            <div
              key={pair._id}
              className="bg-gray-50 rounded-lg shadow-md overflow-hidden transform transition-transform hover:scale-105"
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">Before</h3>
                <img
                  src={pair.beforeImage}
                  alt={`Before ${pair.description}`}
                  className="w-full h-64 object-cover rounded-md mb-6"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">After</h3>
                <img
                  src={pair.afterImage}
                  alt={`After ${pair.description}`}
                  className="w-full h-64 object-cover rounded-md"
                />
                <p className="mt-6 text-gray-600 text-center">{pair.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BeforeAfter;