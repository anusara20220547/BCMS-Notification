// index.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
require("dotenv").config();
const multer = require('multer');

// Create uploads directory if it doesn't exist
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Create uploads directory if it doesn't exist
const uploadDirCover = path.join(__dirname, 'covers');
if (!fs.existsSync(uploadDirCover)) {
  fs.mkdirSync(uploadDirCover);
}

// HTTP server
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(uploadDir)); // Serve the uploads directory as a static folder
app.use('/covers', express.static(uploadDirCover));

// Database Connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connected"))
  .catch((err) => console.error("DB Connection Error:", err));

// Multer setup for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Save uploaded files to uploads directory
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Keep original file name
  },
});


const upload = multer({ storage: storage });

// Routes
const NewMeetingRoute = require("./routes/NewMeetingRoute.js");
app.use("/meeting", NewMeetingRoute);

const EmployeeRoute = require("./routes/EmployeeRoute.js");
app.use("/employees", EmployeeRoute);

const MeetingEvidenceRoute = require("./routes/MeetingEvidenceRoute.js");
app.use("/meetingEvidence", MeetingEvidenceRoute);

const HomeRoute = require("./routes/HomeRoute.js");
app.use("/home", HomeRoute);



// Example route for handling cover image uploads
app.post('/uploadCoverImage', upload.single('coverImage'), (req, res) => {
  try {
    // Assuming multer saves the file details in req.file
    const { filename, path } = req.file;
    // Handle saving to database or any other logic
    res.status(200).json({ filename, path });
  } catch (error) {
    console.error('Error uploading cover image:', error);
    res.status(500).json({ message: 'Failed to upload cover image' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
