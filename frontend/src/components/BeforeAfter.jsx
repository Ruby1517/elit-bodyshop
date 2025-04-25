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
        <div className="space-y-10">
          {imagePairs.map((pair) => (
            <div
              key={pair._id}
              className="bg-gray-50 rounded-lg shadow-md p-4 flex flex-col gap-4"
            >
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 flex-wrap">
                {/* Before Images */}
                <div className="flex flex-col items-center w-full sm:w-1/3">
                  <h4 className="text-lg font-medium mb-2">Before</h4>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {pair.beforeImages.map((imgUrl, index) => (
                      <img
                        key={index}
                        src={imgUrl}
                        alt={`Before ${pair.description}`}
                        className="w-70 h-70 object-cover rounded-md"
                      />
                    ))}
                  </div>
                </div>

                {/* Arrow */}
                <div className="text-2xl text-gray-500 mx-2 sm:mx-4 flex justify-center items-center">
                  ➜
                </div>

                {/* After Images */}
                <div className="flex flex-col items-center w-full sm:w-1/3">
                  <h4 className="text-lg font-medium mb-2">After</h4>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {pair.afterImages.map((imgUrl, index) => (
                      <img
                        key={index}
                        src={imgUrl}
                        alt={`After ${pair.description}`}
                        className="w-70 h-70 object-cover rounded-md"
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="w-full mt-4 text-center text-gray-600 font-medium">
                {pair.title} - {pair.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BeforeAfter;
