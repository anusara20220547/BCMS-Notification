const express = require('express');
const {
  getDescriptions,
  getDescriptionById,
  createDescription,
  deleteDescription,
  upload,
  setCoverImageFlag,
  uploadCoverImage,
  getCoverImages // Import the new function
} = require('../controllers/HomeController');
const router = express.Router();

// Route to get all descriptions
router.get('/getDescriptions', getDescriptions);

// Route to get a single description by ID
router.get('/getDescriptions/:id', getDescriptionById);

// Route to create a new description with an uploaded image
router.post('/createDescription', upload.single('image'), createDescription);

// Route to upload a cover image
router.post('/uploadCoverImage', setCoverImageFlag, upload.single('coverImage'), uploadCoverImage);

// Route to delete a description by ID
router.delete('/deleteDescription/:id', deleteDescription);

// Route to get cover images
router.get('/getCoverImages', getCoverImages); // Add this route

module.exports = router;
