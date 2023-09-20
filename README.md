# Subtitle Converter API
This is a simple API for converting subtitle files to different formats. It takes a subtitle URL, downloads the file, converts it to VTT format, and returns the converted subtitle.

## Installation
```
# Clone the repo
git clone https://github.com/example/subtitle-api.git

# Install dependencies
npm install
```
## Usage
The API has a single endpoint:
```
GET /?url=https://example.com/subtitles.srt
```
This will download the SRT file from the provided URL, convert it to VTT format, and return the converted subtitle text.

Simply make a GET request and pass the url parameter with the subtitle file URL.

The API will return the converted subtitle text with a text/vtt content type header.

# Description
The server is built with Express. It uses the subtitle-converter module to handle converting between subtitle formats.

# Some key aspects:

- express.json() and express.urlencoded() middleware is used to parse request bodies
- Input validation middleware validates the url parameter
- Rate limiting middleware limits requests per IP to prevent abuse
- The axios module is used to download the subtitle file from the provided URL
- The subtitle conversion happens in a separate middleware function
- Error handling middleware catches errors and returns appropriate HTTP status codes
- The converted subtitle text is attached to the request object and sent back in the route handler
- The code is structured for clarity and extensibility. Logging, authentication, caching, or additional endpoints could be easily added.

Overall, it provides a simple and useful API for converting subtitle files!

