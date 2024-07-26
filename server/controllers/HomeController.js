const NewDescription = require("../models/Home");
const multer = require("multer");
const fs = require('fs');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Save files to the 'uploads' directory
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const prefix = req.isCoverImage ? 'covercaro-' : 'desc-';
    cb(null, uniqueSuffix + '-' + prefix + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Middleware to handle cover image upload flag
const setCoverImageFlag = (req, res, next) => {
  req.isCoverImage = true;
  next();
};

// Get all descriptions
const getDescriptions = (req, res) => {
  NewDescription.find()
    .then((descriptions) => res.status(200).json(descriptions))
    .catch((err) => {
      console.error("Error getting descriptions:", err);
      res.status(400).json({ message: err });
    });
};

// Get a single description by ID
const getDescriptionById = (req, res) => {
  console.log(`Fetching description with ID: ${req.params.id}`);
  NewDescription.findById(req.params.id)
    .then(description => {
      console.log("Description found:", description);
      res.status(200).json(description);
    })
    .catch(err => {
      console.error("Error getting description:", err);
      res.status(400).json({ message: err });
    });
};

// Store new description
const createDescription = (req, res) => {
  const { header, paragraph, description } = req.body;
  const imageUrl = req.file ? req.file.path : null;
  const newDescription = new NewDescription({
    header,
    paragraph,
    description,
    imageUrl,
  });
  newDescription
    .save()
    .then(() => res.status(200).json("Description, header, and image added successfully"))
    .catch((err) => {
      console.error("Error saving description:", err);
      res.status(400).json({ Error: err });
    });
};

// Store cover image
const uploadCoverImage = (req, res) => {
  if (req.file) {
    res.status(200).json("Cover image uploaded successfully");
  } else {
    res.status(400).json("Error uploading cover image");
  }
};

// Delete description by ID
const deleteDescription = (req, res) => {
  NewDescription.findByIdAndDelete(req.params.id)
    .then(() => res.json("Description deleted successfully"))
    .catch((err) => res.status(400).json("Error: " + err));
};

// Endpoint to get cover images
const getCoverImages = (req, res) => {
  const uploadDir = path.join(__dirname, '../uploads');
  
  fs.readdir(uploadDir, (err, files) => {
    if (err) {
      console.error("Error reading uploads directory:", err);
      return res.status(500).json({ error: "Failed to read directory" });
    }

    // Filter files to get only those containing 'covercaro' in the name
    const coverImages = files
      .filter(file => file.includes('covercaro'))
      .map(file => `/uploads/${file}`); // Return relative paths

    res.status(200).json(coverImages);
  });
};

module.exports = {
  getDescriptions,
  getDescriptionById,
  createDescription,
  deleteDescription,
  upload,
  setCoverImageFlag,
  uploadCoverImage,
  getCoverImages // Export the new function
};
