// Import required dependencies
const express = require('express');
const path = require('path');

// Initialize Express application
const app = express();
const port = 3000;

// Configure static file serving
// This middleware serves all files from the root directory
// Examples: HTML, CSS, JavaScript, images, etc.
app.use(express.static(path.join(__dirname)));

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`Serving static files from: ${__dirname}`);
});
