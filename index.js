const express = require('express');
const app = express();
const { convert } = require('subtitle-converter');
const axios = require('axios');
const multer = require('multer');
const validator = require('validator');

// Parse request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Validate URL
const validateUrl = (req, res, next) => {
  const url = encodeURI(req.query.url);
  if (!url || !validator.isURL(url)) {
    console.error('Invalid URL:', url);
    return res.status(400).send('Invalid url');
  }

  console.log('Valid URL:', url);
  next();
};

// Convert subtitle
const convertSubtitle = async (req, res, next) => {
  try {
    const url = req.query.url;
    console.log('Converting subtitle from URL:', url);

    const response = await axios.get(encodeURI(url));

    console.log('Subtitle fetched successfully from URL:', url);

    const { subtitle } = convert(response.data, '.vtt');
    if (!subtitle) {
      console.error('Subtitle conversion failed:', url);
      return res.status(400).send('Cannot convert');
    }

    console.log('Subtitle converted successfully:', url);
    req.subtitle = subtitle;
    next();
  } catch (err) {
    console.error('Error fetching or converting subtitle:', err);
    return res.status(500).send('Server error');
  }
};

// Route handler
app.get('/', validateUrl, convertSubtitle, async (req, res) => {
  res.setHeader('Content-Type', 'text/vtt');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');
  res.send(req.subtitle);
  console.log('Response sent');
});

// Define a new storage for uploaded files using Multer
const newStorage = multer.memoryStorage();
const newUpload = multer({ storage: newStorage });

// Middleware to convert uploaded subtitle files
const convertUploadedSubtitle = (req, res, next) => {
  try {
    if (!req.file || !req.file.buffer) {
      console.error('No file uploaded');
      return res.status(400).send('No file uploaded');
    }

    console.log('Converting uploaded subtitle file');
    const { subtitle } = convert(req.file.buffer.toString(), '.vtt');
    if (!subtitle) {
      console.error('Uploaded subtitle conversion failed');
      return res.status(400).send('Cannot convert');
    }

    console.log('Uploaded subtitle converted successfully');
    req.subtitle = subtitle;
    next();
  } catch (err) {
    console.error('Error converting uploaded subtitle:', err);
    return res.status(500).send('Server error');
  }
};

// Route handler for the new upload functionality
app.post('/upload', newUpload.single('subtitleFile'), convertUploadedSubtitle, (req, res) => {
  res.setHeader('Content-Type', 'text/vtt');
  res.send(req.subtitle);
  console.log('Response sent');
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
