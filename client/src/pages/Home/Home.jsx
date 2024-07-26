import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const HomePage = () => {
  const [descriptions, setDescriptions] = useState([]);
  const [coverImages, setCoverImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDescriptions();
    fetchCoverImages();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % coverImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [coverImages.length]);

  const fetchDescriptions = async () => {
    try {
      const response = await axios.get('http://localhost:5000/home/getDescriptions');
      setDescriptions(response.data);
    } catch (error) {
      console.error('Error fetching descriptions:', error);
      alert('Error fetching descriptions');
    }
  };

  const fetchCoverImages = async () => {
    try {
      const response = await axios.get('http://localhost:5000/home/getCoverImages');
      setCoverImages(response.data);
    } catch (error) {
      console.error('Error fetching cover images:', error);
    }
  };

  return (
    <div>
      <header className="relative flex justify-center mt-4">
        {coverImages.length > 0 ? (
          <img
            src={`http://localhost:5000${coverImages[currentImageIndex]}`}
            alt="Cover"
            className="w-full h-[600px] object-cover rounded-3xl "  // Set fixed height and maintain aspect ratio
            style={{ maxWidth: '90%', marginTop: '2rem' }}
          />
        ) : (
          <p>No cover images available</p>
        )}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {coverImages.map((_, index) => (
            <div
              key={index}
              className={`w-4 h-4 rounded-full ${index === currentImageIndex ? 'bg-blue-500' : 'bg-gray-400'}`}
            ></div>
          ))}
        </div>
      </header>
      <main className="p-8 bg-white">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {descriptions.map((item) => (
            <div key={item._id} className="text-center max-w-xs mx-auto relative">
              <img
                src={`http://localhost:5000/${item.imageUrl}`}
                alt={item.description}
                className="h-32 mb-4 mx-auto cursor-pointer"
                onClick={() => navigate(`/description/${item._id}`)}
              />
              <h2 className="text-xl font-bold">{item.header}</h2>
              <p className="mt-2 text-gray-600">{item.description}</p>
              
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default HomePage;
