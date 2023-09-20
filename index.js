const express = require('express');
const app = express();
const { convert } = require('subtitle-converter');
const axios = require('axios');
const rateLimit = require('express-rate-limit');
const slowDown = require('express-slow-down');

// Limit requests per IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

// Slow down requests
const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000,
  delayAfter: 100,
  delayMs: 500
});

// Parse request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Apply rate limiting
app.use(limiter);
app.use(speedLimiter);

// Validate URL
const validateUrl = (req, res, next) => {
  const url = req.query.url;
  if (!url || !validator.isURL(url)) {
    return res.status(400).send('Invalid url');
  }

  next();
};

// Convert subtitle
const convertSubtitle = async (req, res, next) => {
  try {
    const url = req.query.url;
    const response = await axios.get(encodeURI(url));

    const { subtitle } = convert(response.data, '.vtt');
    if (!subtitle) {
      return res.status(400).send('Cannot convert');
    }

    req.subtitle = subtitle;
    next();
  } catch (err) {
    console.error(err);
    return res.status(500).send('Server error');
  }
};

// Route handler
app.get('/', validateUrl, convertSubtitle, async (req, res) => {
  res.setHeader('Content-Type', 'text/vtt');
  res.send(req.subtitle);
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});