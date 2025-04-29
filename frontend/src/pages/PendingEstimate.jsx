import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './pendigEstimate.css'

const PendingEstimate = () => {
  const [pendingEstimates, setPendingEstimates] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedEstimateImages, setSelectedEstimateImages] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalEstimates, setTotalEstimates] = useState(0);
  const estimatesPerPage = 3;

  useEffect(() => {
    fetchPendingEstimates(currentPage);
  }, [currentPage]);

  const fetchPendingEstimates = async (page) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/estimates/pending?page=${page}&limit=${estimatesPerPage}`);
      const { estimates, totalCount } = response.data;

      
      setPendingEstimates(
        estimates.map(est => ({
          ...est,
          imageUrls: est.imageUrls || []
        }))
      );
      setTotalEstimates(totalCount);
      console.log("total count pending estimate", totalCount)
    } catch (error) {
      console.error('Error fetching pending estimates', error);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/estimates/${id}/status`, { status: newStatus });
      fetchPendingEstimates(currentPage); // Refresh current page
    } catch (error) {
      console.error('Error updating estimate status', error);
    }
  };

  const totalPages = Math.ceil(totalEstimates / estimatesPerPage);

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Pending Estimates ({totalEstimates})</h2>

      {pendingEstimates.map((estimate) => (
        <div key={estimate._id} className="border p-2 mb-2 rounded shadow">
          <p><strong>Name:</strong> {estimate.name}</p>
          <p><strong>Email:</strong> {estimate.email}</p>
          <p><strong>Vehicle:</strong> {estimate.vehicle}</p>
          <p><strong>Damage:</strong> {estimate.damage}</p>

          <div className="flex gap-3 flex-wrap mt-2">
            {Array.isArray(estimate.imageUrls) &&
            estimate.imageUrls.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Estimate ${index + 1}`}
                className="w-[150px] rounded cursor-pointer hover:opacity-80"
                onDoubleClick={() => {
                    setSelectedEstimateImages(estimate.imageUrls);
                    setSelectedImageIndex(index);
                }}
              />
            ))}
          </div>

          <div className="mt-3 flex gap-2">
            {/* <button
              onClick={() => handleStatusChange(estimate._id, 'reviewed')}
              className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
              Mark as Reviewed
            </button> */}
            <button
              onClick={() => handleStatusChange(estimate._id, 'completed')}
              className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Mark as Completed
            </button>
          </div>
        </div>
      ))}

{selectedImageIndex !== null && (
  <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
    <div className="relative">
      {/* Close button */}
      <button
        onClick={() => setSelectedImageIndex(null)}
        className="absolute top-[-30px] right-[-30px] text-white text-3xl font-bold"
      >
        ×
      </button>

      {/* Left arrow */}
      <button
        onClick={() =>
          setSelectedImageIndex((prev) =>
            prev === 0 ? selectedEstimateImages.length - 1 : prev - 1
          )
        }
        className="absolute left-[-50px] top-1/2 transform -translate-y-1/2 text-white text-4xl font-bold"
      >
        ‹
      </button>

      {/* Image */}
      <img
        src={selectedEstimateImages[selectedImageIndex]}
        alt="Full size"
        className="max-w-[90vw] max-h-[90vh] rounded shadow-lg"
        style={{ transform: `scale(${zoomLevel})`, transition: 'transform 0.2s ease' }}
        onWheel={(e) => {
            if (e.deltaY > 0 && zoomLevel > 0.5) {
              setZoomLevel(zoomLevel - 0.1); // Zoom out
            } else if (e.deltaY < 0 && zoomLevel < 3) {
              setZoomLevel(zoomLevel + 0.1); // Zoom in
            }
        }}
      />

      {/* Right arrow */}
      <button
        onClick={() =>
          setSelectedImageIndex((prev) =>
            prev === selectedEstimateImages.length - 1 ? 0 : prev + 1
          )
        }
        className="absolute right-[-50px] top-1/2 transform -translate-y-1/2 text-white text-4xl font-bold"
      >
        ›
      </button>
    </div>
  </div>
)}


      
      <div className="pagination">
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          onClick={() => setCurrentPage(index + 1)}
          disabled={currentPage === index + 1}
        >
          {index + 1}
        </button>
      ))}
    </div>
    </div>
  );
};

export default PendingEstimate;
