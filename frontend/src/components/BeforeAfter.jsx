import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function BeforeAfter() {
  const [imagePairs, setImagePairs] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(null); // Track index of selected image/video
  const [zoomLevel, setZoomLevel] = useState(1);


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

  // Helper to decide if a URL is a video
  const isVideo = (url) => {
    return url.includes('.mp4') || url.includes('.webm') || url.includes('.ogg') || url.includes('.mov') || url.includes('.avi');
  };

  const handleMediaClick = (media) => {
    setSelectedMedia(media);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedMedia(null);
    setSelectedMediaIndex(null);
  };

  const handleNext = () => {
    const nextIndex = (selectedMediaIndex + 1) % imagePairs.length;
    setSelectedMedia(imagePairs[nextIndex].beforeMedia[0]); // Or change this to the next media URL
    setSelectedMediaIndex(nextIndex);
  };

  const handlePrevious = () => {
    const prevIndex = (selectedMediaIndex - 1 + imagePairs.length) % imagePairs.length;
    setSelectedMedia(imagePairs[prevIndex].beforeMedia[0]); // Or change this to the previous media URL
    setSelectedMediaIndex(prevIndex);
  };

  return (
    <section id="before-after" data-aos="zoom-in" className="py-20 px-6 bg-white">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
          Before & After
        </h2>
        {error && <p className="text-center text-red-600 mb-8">{error}</p>}
        <div className="space-y-10">
          {imagePairs.slice(0, 3).map((pair) => (
            <div
              key={pair._id}
              className="bg-gray-50 rounded-lg shadow-md p-4 flex flex-col gap-4"
            >
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 flex-wrap">
                {/* Before Images */}
                <div className="flex flex-col items-center w-full sm:w-1/3">
                  <h4 className="text-lg font-medium mb-2">Before</h4>
                  <div className="flex flex-wrap gap-2 justify-center">
                  {pair.beforeMedia.map((url, index) => {
                    if (isVideo(url)) {
                      console.log('Video URL:', url);
                      return (
                        <video
                          key={index}
                          controls
                          width="600"
                          height="400"
                          className="object-cover rounded-md"
                          onClick={() => handleMediaClick(url)}
                        >
                          <source src={url} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      );
                    } else {
                      return (
                        <div
                          key={index}
                          className="w-70 h-70 cursor-pointer"
                          onClick={() => handleMediaClick(url)}
                        >
                          <img
                            src={url}
                            alt={`Before ${pair.description}`}
                            className="w-full h-full object-cover rounded-md"
                          />
                        </div>
                      );
                    }
                  })}
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
                  {pair.afterMedia.map((url, index) => {
                    if (isVideo(url)) {
                      return (
                        <video
                          key={index}
                          controls
                          width="600"
                          height="400"
                          className="object-cover rounded-md"
                          onClick={() => handleMediaClick(url)}
                        >
                          <source src={url} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      );
                    } else {
                      return (
                        <div
                            key={index}
                            className="w-70 h-70 cursor-pointer"
                            onClick={() => handleMediaClick(url)}
                          >
                            <img
                              src={url}
                              alt={`After ${pair.description}`}
                              className="w-full h-full object-cover rounded-md"
                            />
                          </div>
                      );
                    }
                  })}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="w-full mt-4 text-center text-gray-600 font-medium">
                {pair.title} - {pair.description}
              </div>
            </div>
          ))}

      <div className="text-center mt-8">
        <button
          onClick={() => navigate('/gallery')}
          className="inline-block bg-blue-600 text-white text-lg font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
        >
          See More
        </button>
      </div>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative bg-white p-4 rounded-lg">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-white text-2xl bg-red-500 rounded-full p-2"
            >
              ×
            </button>
            {isVideo(selectedMedia) ? (
              <video
                controls
                width="600"
                height="400"
                className="object-cover"
                autoPlay
              >
                <source src={selectedMedia} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <img
                src={selectedMedia}
                alt="Selected media"
                className="w-full h-auto object-contain"
                style={{ transform: `scale(${zoomLevel})`, transition: 'transform 0.2s ease' }}
                onWheel={(e) => {
                  if (e.deltaY > 0 && zoomLevel > 0.5) {
                    setZoomLevel(zoomLevel - 0.1); // Zoom out
                  } else if (e.deltaY < 0 && zoomLevel < 3) {
                    setZoomLevel(zoomLevel + 0.1); // Zoom in
                  }
                }}
              />
            )}
          </div>
        </div>
      )}

      
   
    </section>
  );
}

export default BeforeAfter;
