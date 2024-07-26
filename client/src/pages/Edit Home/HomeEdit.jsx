import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const EditPage = () => {
  const [header, setHeader] = useState('');
  const [paragraph, setParagraph] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [descriptions, setDescriptions] = useState([]);

  useEffect(() => {
    fetchDescriptions();
  }, []);

  const fetchDescriptions = async () => {
    try {
      const response = await axios.get('http://localhost:5000/home/getDescriptions');
      setDescriptions(response.data);
    } catch (error) {
      console.error('Error fetching descriptions:', error);
      alert('Error fetching descriptions');
    }
  };

  const deleteDescription = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this description!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      });

      if (result.isConfirmed) {
        await axios.delete(`http://localhost:5000/home/deleteDescription/${id}`);
        Swal.fire('Deleted!', 'Your description has been deleted.', 'success');
        fetchDescriptions();
      }
    } catch (error) {
      console.error('Error deleting description:', error);
      Swal.fire('Error!', 'Failed to delete description.', 'error');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('header', header);
    formData.append('paragraph', paragraph);
    formData.append('description', description);
    formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:5000/home/createDescription', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Saved:', response.data);
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Data saved successfully!',
      });
      setHeader('');
      setParagraph('');
      setDescription('');
      setImage(null);
      fetchDescriptions();
    } catch (error) {
      console.error('Error saving data:', error.response ? error.response.data : error.message);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to save data.',
      });
    }
  };

  const handleSaveCoverImage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('coverImage', coverImage);

    try {
      const response = await axios.post('http://localhost:5000/home/uploadCoverImage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Cover Image Saved:', response.data);
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Cover image saved successfully!',
      });
      setCoverImage(null);
    } catch (error) {
      console.error('Error saving cover image:', error.response ? error.response.data : error.message);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to save cover image.',
      });
    }
  };

  return (
    <div className="flex flex-col flex-grow p-8 ml-20">
      <div className="bg-lightblue-50 min-h-screen flex-grow">
        <div className="p-8 max-w-4xl mx-auto mt-8 shadow-lg rounded-lg bg-blue-100">
          <h1 className="text-[#52B14A] font-bold text-3xl text-center mb-8">Edit Page</h1>
          <form className="space-y-4 bg-lightblue-100 rounded-lg p-8" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold text-[#52B14A] mb-10">Update Description</h2>
            <div>
              <label className="block text-lg font-semibold mb-2 text-blue-900">Header:</label>
              <input
                type="text"
                className="border rounded-lg p-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter header..."
                value={header}
                onChange={(e) => setHeader(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-lg font-semibold mb-2 text-blue-900">Paragraph Text:</label>
              <textarea
                className="border rounded-lg p-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="5"
                placeholder="Enter paragraph text..."
                value={paragraph}
                onChange={(e) => setParagraph(e.target.value)}
              ></textarea>
            </div>
            <div>
              <label className="block text-lg font-semibold mb-2 text-blue-900">Description:</label>
              <textarea
                className="border rounded-lg p-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="5"
                placeholder="Enter description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div>
              <label className="block text-lg font-semibold mb-2 text-blue-900">Image:</label>
              <div className="flex items-center">
                <input
                  type="file"
                  id="image"
                  name="image"
                  className="hidden"
                  onChange={(e) => setImage(e.target.files[0])}
                />
                <label
                  htmlFor="image"
                  className="cursor-pointer bg-lightblue hover:bg-lightblue-600 text-white px-4 py-2 rounded-lg text-lg"
                >
                  Choose File
                </label>
                <span className="ml-4 text-blue-900">{image ? image.name : 'No file chosen'}</span>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-lightblue hover:bg-lightblue-600 text-white px-8 py-2 rounded-lg text-lg"
                style={{ minWidth: '150px' }}
              >
                Save
              </button>
            </div>
          </form>

          <form className="space-y-4 bg-lightblue-100 rounded-lg p-8 mt-8" onSubmit={handleSaveCoverImage}>
            <h2 className="text-2xl font-bold text-[#589b52] mb-10">Upload Cover Image</h2>
            <div>
              <label className="block text-lg font-semibold mb-2 text-blue-900">Cover Image:</label>
              <div className="flex items-center">
                <input
                  type="file"
                  id="coverImage"
                  name="coverImage"
                  className="hidden"
                  onChange={(e) => setCoverImage(e.target.files[0])}
                />
                <label
                  htmlFor="coverImage"
                  className="cursor-pointer bg-lightblue hover:bg-lightblue-600 text-white px-4 py-2 rounded-lg text-lg"
                >
                  Choose File
                </label>
                <span className="ml-4 text-blue-900">{coverImage ? coverImage.name : 'No file chosen'}</span>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-lightblue hover:bg-lightblue-600 text-white px-8 py-2 rounded-lg text-lg"
                style={{ minWidth: '150px' }}
              >
                Save Cover Image
              </button>
            </div>
          </form>
        </div>

        <div className="mt-8 p-8 max-w-4xl mx-auto shadow-lg rounded-lg bg-blue-100">
          <h2 className="text-2xl font-bold text-[#52B14A] mb-10">Manage Descriptions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {descriptions.map((item) => (
              <div key={item._id} className="text-center max-w-xs mx-auto relative">
                <img
                  src={`http://localhost:5000/${item.imageUrl}`}
                  alt={item.description}
                  className="h-32 mb-4 mx-auto cursor-pointer"
                />
                <h2 className="text-xl font-bold">{item.header}</h2>
                <p className="mt-2 text-gray-600">{item.description}</p>
                <button
                  onClick={() => deleteDescription(item._id)}
                  className="absolute top-0 right-0 mt-2 mr-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center"
                >
                  &minus;
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPage;
