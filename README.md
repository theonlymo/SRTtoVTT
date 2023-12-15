# Subtitle Converter API

The Subtitle Converter API is a straightforward tool for converting subtitle files into different formats. It functions by accepting a subtitle URL, fetching the file from the provided URL, converting it to VTT format, and returning the converted subtitle. Additionally, it allows users to upload subtitle files for conversion.

## Installationvc
```
# Clone the repo
git clone https://github.com/theonlymo/SRTtoVTT.git

# Install dependencies
npm install

# run 
node index.js

```
## Usage
### Convert from URL
The API offers an endpoint for converting subtitles from a URL:

```
GET /?url=https://example.com/subtitles.srt
```
This endpoint downloads the SRT file from the specified URL, performs the conversion to VTT format, and then provides the converted subtitle text.

To use the URL conversion feature, make a GET request and include the url parameter with the URL of the subtitle file.

The API will return the converted subtitle text with a text/vtt content type header.

### Upload and Convert File
The API also supports uploading and converting subtitle files. Use the following endpoint:

```
POST /upload
```
To upload a subtitle file for conversion, send a POST request with the subtitleFile field containing the subtitle file. The API will convert the uploaded file to VTT format and provide the converted subtitle text in the response.

Example using cURL:

```
curl -X POST -F "subtitleFile=@your_subtitle.srt" http://localhost:5000/upload
```
Note
The API handles both URL-based conversion and file uploads, providing flexibility in how you convert your subtitle files.


# Description
The Subtitle Converter API is built using Express and relies on the subtitle-converter module to handle subtitle format conversions.

Key aspects of the API include:

- Middleware for parsing request bodies using express.json() and express.urlencoded().
- Input validation middleware to validate the url parameter for URL-based conversion.
- Rate limiting middleware to restrict requests per IP address to prevent abuse.
- Use of the Axios module to download subtitle files from the provided URL for URL-based conversion.
- Support for subtitle conversion from uploaded files.
- Error-handling middleware to catch and respond with appropriate HTTP status codes.
- The converted subtitle text is attached to the request object and sent as the response within the route handler.
- The code is structured for clarity and extensibility. Additional features like logging, authentication, caching, or extra endpoints can be added with ease.

In summary, the Subtitle Converter API provides a simple and practical solution for converting subtitle files, making it a valuable tool for handling subtitles effectively.


