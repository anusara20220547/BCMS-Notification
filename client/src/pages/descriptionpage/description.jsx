import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import backgroundImage from '../../../public/background.jpg'; // Ensure this path is correct

const DescriptionPage = () => {
  const { id } = useParams();
  const [description, setDescription] = useState(null);

  useEffect(() => {
    fetchDescription();
  }, [id]); // Added id as a dependency to ensure it refetches if the id changes

  const fetchDescription = async () => {
    try {
      console.log(`Fetching description with ID: ${id}`);
      const response = await axios.get(`http://localhost:5000/home/getDescriptions/${id}`);
      console.log("Description fetched:", response.data);
      setDescription(response.data);
    } catch (error) {
      console.error('Error fetching description:', error);
      alert('Error fetching description');
    }
  };

  if (!description) return <div>Loading...</div>;

  return (
    <div 
      className="relative min-h-screen flex flex-col items-start justify-start p-10" 
      style={{ 
        backgroundImage: `url(${backgroundImage})`, 
        backgroundSize: '67%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'bottom center',
        width: '170%'
      }}
    >
      <h1 className="text-7xl font-bold text-black mb-4 ml-10">
        {description.header}
      </h1>
      <p className="text-blue-700 text-xl font-bold ml-10 mt-10 mr-20">
        {description.paragraph}
      </p>
    </div>
  );
};

export default DescriptionPage;
